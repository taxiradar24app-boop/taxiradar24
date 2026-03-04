// src/hooks/UseDemoSimulador.js
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

import { getDb } from "./../services/firebaseConfig";

const db = getDb();

// ✅ DEMO: máximo de intentos permitidos
const DEMO_MAX_ATTEMPTS = 3;

export default function useDemoSimulador(uid) {
  const [loadingDemo, setLoadingDemo] = useState(true);
  const [demoAttempts, setDemoAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (!uid) {
          if (!mounted) return;
          setDemoAttempts(0);
          setIsLocked(false);
          setLoadingDemo(false);
          return;
        }

        const ref = doc(db, "progress", uid);
        const snap = await getDoc(ref);

        let attempts = 0;

        if (snap.exists()) {
          const data = snap.data() || {};
          attempts = data?.simulador?.demoAttempts || 0;
        } else {
          // Si no existe progress/{uid}, lo creamos mínimo para DEMO
          await setDoc(
            ref,
            {
              userId: uid,
              createdAt: serverTimestamp(),
              simulador: {
                demoAttempts: 0,
                attempts: 0,
                avgScore: 0,
                passed: 0,
              },
            },
            { merge: true }
          );
          attempts = 0;
        }

        if (!mounted) return;
        setDemoAttempts(attempts);
        setIsLocked(attempts >= DEMO_MAX_ATTEMPTS);
        setLoadingDemo(false);
      } catch (e) {
        console.error("useDemoSimulador load error:", e);
        if (!mounted) return;
        setLoadingDemo(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [uid]);

  // ✅ Suma +1 intento DEMO (solo cuando se inicia un simulacro)
  const registerAttempt = async () => {
    if (!uid) return { ok: false, reason: "NO_UID" };

    const ref = doc(db, "progress", uid);
    const snap = await getDoc(ref);

    let currentAttempts = 0;

    if (snap.exists()) {
      currentAttempts = snap.data()?.simulador?.demoAttempts || 0;
    } else {
      await setDoc(
        ref,
        {
          userId: uid,
          createdAt: serverTimestamp(),
          simulador: { demoAttempts: 0 },
        },
        { merge: true }
      );
      currentAttempts = 0;
    }

    // 🚫 Bloqueado
    if (currentAttempts >= DEMO_MAX_ATTEMPTS) {
      setDemoAttempts(currentAttempts);
      setIsLocked(true);
      return { ok: false, reason: "LOCKED" };
    }

    // ✅ Incremento
    await updateDoc(ref, {
      "simulador.demoAttempts": increment(1),
      "simulador.lastDemoAt": serverTimestamp(),
    });

    const newAttempts = currentAttempts + 1;
    setDemoAttempts(newAttempts);
    setIsLocked(newAttempts >= DEMO_MAX_ATTEMPTS);

    return { ok: true, attempts: newAttempts };
  };

  return {
    loadingDemo,
    demoAttempts,
    maxAttempts: DEMO_MAX_ATTEMPTS,
    remainingAttempts: Math.max(0, DEMO_MAX_ATTEMPTS - demoAttempts),
    isLocked,
    registerAttempt,
  };
}
