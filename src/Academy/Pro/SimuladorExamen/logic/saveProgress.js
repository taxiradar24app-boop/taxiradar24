// ======================================================================
// 📘 saveProgress.js — Simulador + módulos (estructura: progress/{uid})
// ======================================================================

import { getDb, getAuth } from "@/services/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import calculateSimuladorMetrics from "./calculateSimuladorMetrics";

// ----------------------------------------------------------
// Helpers
// ----------------------------------------------------------
function clampNum(v, min = 0, max = 100) {
  const n = Number(v);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function toISO() {
  return new Date().toISOString();
}

function n(v, fallback = 0) {
  const x = Number(v);
  return Number.isFinite(x) ? x : fallback;
}

// ==========================================================
// ✅ REGLAMENTO / MÓDULOS
// ==========================================================
export async function saveModuleProgress(moduleId, result) {
  try {
    const db = await getDb(); // ✅ CORREGIDO
    const auth = await getAuth(); // ✅ CORREGIDO

    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "progress", user.uid);

    await setDoc(
      ref,
      {
        [moduleId]: {
          lastAttemptAt: toISO(),
          lastScore: clampNum((result?.correct / (result?.total || 1)) * 100),
          total: result?.total ?? 0,
          wrong: result?.wrong ?? 0,
          minToPass: result?.minToPass ?? 0,
          passed: !!result?.passed,
          attempts: result?.attempts ?? 0,
          avgScore: result?.avgScore ?? undefined,
          completed: result?.completed ?? undefined,
          progress: result?.progress ?? undefined,
          rango: result?.rango ?? undefined,
          title: result?.title ?? undefined,
        },
        updatedAt: toISO(),
        userId: user.uid,
      },
      { merge: true }
    );

    console.log(`✅ Progreso guardado: ${moduleId}`);
  } catch (error) {
    console.error("❌ Error guardando progreso:", error);
  }
}

// ==========================================================
// 🧠 SIMULADOR PRO
// ==========================================================
export async function saveSimuladorAttempt(result) {
  try {
    const db = await getDb(); // ✅ CORREGIDO
    const auth = await getAuth(); // ✅ CORREGIDO

    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "progress", user.uid);
    const snap = await getDoc(ref);

    const existingSimulador = snap.exists() ? snap.data()?.simulador : null;

    const existingHistory = Array.isArray(existingSimulador?.attemptsHistory)
      ? existingSimulador.attemptsHistory
      : [];

    const ok = n(result?.ok ?? 0);
    const fail = n(result?.fail ?? 0);
    const blank = n(result?.blank ?? 0);
    const total = n(result?.total ?? 0);

    const newAttempt = {
      ok,
      fail,
      blank,
      total,
      date: toISO(),
    };

    const MAX_HISTORY = 20;
    const updatedHistory = [newAttempt, ...existingHistory].slice(0, MAX_HISTORY);

    const prevSumOk = n(existingSimulador?.sumOk ?? 0);
    const prevSumTotal = n(existingSimulador?.sumTotal ?? 0);

    const nextSumOk = prevSumOk + ok;
    const nextSumTotal = prevSumTotal + total;

    const avgPercentGlobal =
      nextSumTotal > 0 ? clampNum((nextSumOk / nextSumTotal) * 100) : 0;

    const lastPercent = total > 0 ? clampNum((ok / total) * 100) : 0;
    const prevBest = n(
      existingSimulador?.bestPercent ?? existingSimulador?.bestScore ?? 0
    );
    const nextBest = Math.max(prevBest, lastPercent);

    const metrics = calculateSimuladorMetrics(updatedHistory);

    const avgScoreCompat = Math.round(avgPercentGlobal);
    const bestScoreCompat = Math.round(nextBest);

    await setDoc(
      ref,
      {
        simulador: {
          attemptsHistory: updatedHistory,
          attempts: n(existingSimulador?.attempts ?? 0) + 1,
          avgPercent: Math.round(avgPercentGlobal),
          bestPercent: Math.round(nextBest),
          lastPercent: Math.round(lastPercent),
          bandKey: metrics.bandKey,
          bandLabel: metrics.bandLabel,
          readyForOfficialExam: metrics.readyForOfficialExam,
          examLevel: metrics.examLevel,
          streak: metrics.streak,
          lastAttemptAt: metrics.lastAttemptAt || toISO(),
          lastAttemptTs: metrics.lastAttemptTs || Date.now(),
          avgScore: avgScoreCompat,
          bestScore: bestScoreCompat,
          passed: metrics.passed,
          passedNum: metrics.passed ? 1 : 0,
          demoAttempts: existingSimulador?.demoAttempts ?? 0,
          sumOk: nextSumOk,
          sumTotal: nextSumTotal,
        },
        updatedAt: toISO(),
        userId: user.uid,
      },
      { merge: true }
    );

    console.log("✅ Simulador guardado + métricas optimizadas");
  } catch (error) {
    console.error("❌ Error guardando simulador:", error);
  }
}