// ======================================================
// 🗺️ useDemoCallejero.js
// Control de DEMO Callejero (registro + límite)
// ======================================================

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

import { getDb } from "@/services/firebaseConfig";

const db = getDb();

// ✅ Máximo de intentos DEMO permitidos
const DEMO_MAX_ATTEMPTS = 3;

export default function useDemoCallejero(uid) {
  const [loadingDemo, setLoadingDemo] = useState(true);
  const [demoAttempts, setDemoAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // ======================================================
  // 🔄 Cargar estado DEMO desde Firestore
  // ======================================================
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        // 🔓 Usuario NO logueado → DEMO visual, sin tracking
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
          attempts = data?.callejero?.demoAttempts || 0;
        } else {
          // Crear documento mínimo si no existe
          await setDoc(
            ref,
            {
              userId: uid,
              createdAt: serverTimestamp(),
              callejero: {
                demoAttempts: 0,
                attempts: 0,
                avgScore: 0,
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
      } catch (err) {
        console.error("useDemoCallejero load error:", err);
        if (!mounted) return;
        setLoadingDemo(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [uid]);

  // ======================================================
  // 🏁 Registrar intento DEMO (al finalizar ejercicio)
  // ======================================================
  const registerAttempt = async () => {
    if (!uid) return { ok: false, reason: "NO_UID" };

    const ref = doc(db, "progress", uid);
    const snap = await getDoc(ref);

    let currentAttempts = 0;

    if (snap.exists()) {
      currentAttempts = snap.data()?.callejero?.demoAttempts || 0;
    } else {
      await setDoc(
        ref,
        {
          userId: uid,
          createdAt: serverTimestamp(),
          callejero: { demoAttempts: 0 },
        },
        { merge: true }
      );
      currentAttempts = 0;
    }

    // 🚫 Límite alcanzado
    if (currentAttempts >= DEMO_MAX_ATTEMPTS) {
      setDemoAttempts(currentAttempts);
      setIsLocked(true);
      return { ok: false, reason: "LOCKED" };
    }

    // ✅ Incrementar intento
    await updateDoc(ref, {
      "callejero.demoAttempts": increment(1),
      "callejero.lastDemoAt": serverTimestamp(),
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
