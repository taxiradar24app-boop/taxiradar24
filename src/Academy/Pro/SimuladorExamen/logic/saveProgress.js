// ======================================================================
// 📘 saveProgress.js — Simulador + módulos (estructura: progress/{uid})
// ✅ Respeta lógica y compatibilidad existente
// ✅ Optimiza espacio y rendimiento:
//    - Mantiene attemptsHistory pero limitado (MAX_HISTORY = 20) (igual que ahora)
//    - Guarda intento compacto (sin campos redundantes)
//    - Añade contadores agregados (sumOk / sumTotal) para calcular media global
//      sin depender de historial (rentable a largo plazo)
//    - Guarda bestPercent incremental (sin recorrer siempre todo)
//    - Mantiene campos compat (avgScore/bestScore/passedNum)
// ======================================================================

import { getDb, getAuth } from "@/services/firebaseConfig";

const db = getDb();
const auth = getAuth();

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

// ✅ compacta números (evita NaN, reduce ruido)
function n(v, fallback = 0) {
  const x = Number(v);
  return Number.isFinite(x) ? x : fallback;
}

// ==========================================================
// ✅ REGLAMENTO / MÓDULOS (mantén tu uso actual si lo necesitas)
// Guarda dentro de progress/{uid} como campo [moduleId]
// ==========================================================
export async function saveModuleProgress(moduleId, result) {
  try {
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

          // agregados habituales
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
// 🧠 SIMULADOR PRO (estructura: progress/{uid}.simulador)
// 🔥 OPTIMIZACIÓN REAL (sin romper UI):
// - attemptsHistory sigue existiendo, pero limitado (20)
// - añadimos agregados: sumOk / sumTotal
//   => avgPercent global sin depender de historial (barato)
// - bestPercent incremental (barato)
// - mantiene calculateSimuladorMetrics para bandas/racha/readiness con últimos 20
// ==========================================================
export async function saveSimuladorAttempt(result) {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "progress", user.uid);
    const snap = await getDoc(ref);

    const existingSimulador = snap.exists() ? snap.data()?.simulador : null;

    // ----------------------------
    // Historial existente (limitado)
    // ----------------------------
    const existingHistory = Array.isArray(existingSimulador?.attemptsHistory)
      ? existingSimulador.attemptsHistory
      : [];

    // ----------------------------
    // ✅ Nuevo intento COMPACTO
    // (solo lo mínimo, evita crecer de más)
    // ----------------------------
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

    // Historial: últimos 20 (igual que tu lógica actual)
    const MAX_HISTORY = 20;
    const updatedHistory = [newAttempt, ...existingHistory].slice(0, MAX_HISTORY);

    // ----------------------------
    // ✅ Agregados globales (rentable)
    // ----------------------------
    const prevSumOk = n(existingSimulador?.sumOk ?? 0);
    const prevSumTotal = n(existingSimulador?.sumTotal ?? 0);

    const nextSumOk = prevSumOk + ok;
    const nextSumTotal = prevSumTotal + total;

    const avgPercentGlobal =
      nextSumTotal > 0 ? clampNum((nextSumOk / nextSumTotal) * 100) : 0;

    // ✅ bestPercent incremental (no recorrer todo siempre)
    const lastPercent = total > 0 ? clampNum((ok / total) * 100) : 0;
    const prevBest = n(existingSimulador?.bestPercent ?? existingSimulador?.bestScore ?? 0);
    const nextBest = Math.max(prevBest, lastPercent);

    // ----------------------------
    // 🔁 Métricas con motor existente (últimos 20)
    // - Esto se usa para bandas/racha/readiness
    // - avgPercent del motor es ponderado por nº preguntas en esos 20
    //   (pero nosotros guardamos también avgPercent GLOBAL con sumOk/sumTotal)
    // ----------------------------
    const metrics = calculateSimuladorMetrics(updatedHistory);

    // Compatibilidad UI antigua:
    const avgScoreCompat = Math.round(avgPercentGlobal); // ✅ ahora viene del global rentable
    const bestScoreCompat = Math.round(nextBest);

    await setDoc(
      ref,
      {
        simulador: {
          // historial (limitado)
          attemptsHistory: updatedHistory,

          // NUEVOS (Profile PRO)
          attempts: n(existingSimulador?.attempts ?? 0) + 1,

          // ✅ avgPercent global (rentable, estable)
          avgPercent: Math.round(avgPercentGlobal),

          // ✅ bestPercent incremental
          bestPercent: Math.round(nextBest),

          // último
          lastPercent: Math.round(lastPercent),

          // bandas/readiness/racha se basan en motor existente (últimos 20)
          bandKey: metrics.bandKey,
          bandLabel: metrics.bandLabel,
          readyForOfficialExam: metrics.readyForOfficialExam,
          examLevel: metrics.examLevel,
          streak: metrics.streak,
          lastAttemptAt: metrics.lastAttemptAt || toISO(),
          lastAttemptTs: metrics.lastAttemptTs || Date.now(),

          // COMPAT (para no romper nada existente)
          avgScore: avgScoreCompat,
          bestScore: bestScoreCompat,
          passed: metrics.passed,
          passedNum: metrics.passed ? 1 : 0,
          demoAttempts: existingSimulador?.demoAttempts ?? 0,

          // ✅ agregados persistentes
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