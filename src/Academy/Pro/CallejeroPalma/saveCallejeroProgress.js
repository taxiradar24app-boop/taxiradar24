// ============================================================
// ✅ saveCallejeroProgress.js (OPTIMIZADO & RENTABLE)
// Guarda progreso resumen en: progress/{uid}.callejero
// Guarda cada intento (detalle) en: progress/{uid}/callejeroAttempts/{autoId}
//
// Objetivo:
// - Documento resumen SIEMPRE pequeño (rápido y barato de leer para Profile)
// - Historial detallado en subcolección (paginable, sin límite 1MB)
// - Limitar/compactar lo menos relevante:
//    - attemptsHist dentro del doc resumen: máximo N (por defecto 10)
//    - weakStreets: map de conteos + mantener TOP 30
//
// ✅ Compatible con tu esquema actual: attempts, avgScore, overall, bestScore,
// lastScore, lastAttemptAt, demoAttempts (se mantienen)
// ============================================================

import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

import { getDb } from "./../../../services/firebaseConfig";

const db = getDb();

// ==============================
// Helpers
// ==============================
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const round1 = (n) => Math.round(n * 10) / 10;

const normalizeStreetName = (s) =>
  String(s || "")
    .trim()
    .replace(/\s+/g, " ");

const topNMapByValue = (obj = {}, n = 30) => {
  const entries = Object.entries(obj)
    .filter(([k, v]) => k && Number(v) > 0)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, n);

  const out = {};
  for (const [k, v] of entries) out[k] = Number(v);
  return out;
};

// ==============================
// MAIN
// ==============================

/**
 * Guarda un intento de Callejero y actualiza métricas agregadas.
 *
 * - Resumen (pequeño): progress/{uid}.callejero
 * - Detalle (por intento): progress/{uid}/callejeroAttempts/{autoId}
 *
 * @param {Object} params
 * @param {string} params.uid
 * @param {number} params.correct
 * @param {number} params.total
 * @param {number} params.timeUsedSec
 * @param {Array<string>} params.failedStreets
 * @param {boolean} params.isDemo
 *
 * @returns {Promise<{ok:boolean, attemptId?:string, error?:string}>}
 */
export default async function saveCallejeroProgress({
  uid,
  correct,
  total = 10,
  timeUsedSec = 0,
  failedStreets = [],
  isDemo = false,
}) {
  try {
    if (!uid) return { ok: false, error: "Missing uid" };

    const t = Number(total || 10);
    const c = clamp(Number(correct || 0), 0, t);
    const score10 = round1((c / t) * 10); // 0..10
    const percent = clamp(Math.round((score10 / 10) * 100), 0, 100);

    const failed = Array.isArray(failedStreets)
      ? failedStreets.map(normalizeStreetName).filter(Boolean)
      : [];

    // --------------------------------------------
    // 1) Guardamos detalle del intento en subcolección (barato y escalable)
    // --------------------------------------------
    const attemptsColRef = collection(db, "progress", uid, "callejeroAttempts");

    const attemptDoc = {
      createdAt: serverTimestamp(),
      clientAt: Date.now(),
      correct: c,
      total: t,
      score: score10,
      percent,
      timeUsedSec: Number(timeUsedSec || 0),
      failedStreets: failed, // detalle útil para "repasar fallos"
      isDemo: !!isDemo,
    };

    const attemptRef = await addDoc(attemptsColRef, attemptDoc);

    // --------------------------------------------
    // 2) Actualizamos resumen en progress/{uid}.callejero (siempre pequeño)
    // --------------------------------------------
    const progressRef = doc(db, "progress", uid);

    // límites para mantener doc ligero
    const MAX_RECENT_ATTEMPTS = 10; // solo últimos 10 en el doc resumen
    const WEAK_TOP_N = 30; // top 30 calles problemáticas

    await runTransaction(db, async (tx) => {
      const snap = await tx.get(progressRef);
      const data = snap.exists() ? snap.data() : {};
      const callejero = data?.callejero && typeof data.callejero === "object" ? data.callejero : {};

      const prevAttempts = Number(callejero.attempts || 0);
      const prevAvg = Number(callejero.avgScore || 0);
      const prevBest = Number(callejero.bestScore || 0);
      const prevDemoAttempts = Number(callejero.demoAttempts || 0);

      const nextAttempts = prevAttempts + 1;

      // media incremental (no depende de historial) => escalable
      const nextAvg =
        prevAttempts === 0
          ? score10
          : round1((prevAvg * prevAttempts + score10) / nextAttempts);

      const nextBest = round1(Math.max(prevBest, score10));

      // overall: mantenemos tu concepto actual (basado en avgScore)
      const nextOverall = clamp(Math.round((nextAvg / 10) * 100), 0, 100);

      const nextDemoAttempts = isDemo ? prevDemoAttempts + 1 : prevDemoAttempts;

      // recentAttempts: mini historial limitado (solo para mostrar en Profile si quieres)
      const recent = Array.isArray(callejero.recentAttempts) ? callejero.recentAttempts : [];
      const nextRecent = [
        ...recent,
        {
          attemptId: attemptRef.id,
          at: serverTimestamp(),
          score: score10,
          percent,
          correct: c,
          total: t,
          timeUsedSec: Number(timeUsedSec || 0),
        },
      ].slice(-MAX_RECENT_ATTEMPTS);

      // weakStreetsCount: map acumulado + top N
      const weakCount =
        callejero.weakStreetsCount && typeof callejero.weakStreetsCount === "object"
          ? { ...callejero.weakStreetsCount }
          : {};

      failed.forEach((street) => {
        weakCount[street] = Number(weakCount[street] || 0) + 1;
      });

      const weakTop = topNMapByValue(weakCount, WEAK_TOP_N);

      // Opcional: para evitar que weakCount crezca infinito, guardamos SOLO topN como count
      // (más que suficiente para "repasar fallos" y muy rentable)
      // Si quieres conservar weakCount entero, coméntalo.
      const weakCountCompacted = weakTop;

      const update = {
        lastActivityAt: serverTimestamp(),
        callejero: {
          attempts: nextAttempts,
          avgScore: nextAvg,
          overall: nextOverall,

          bestScore: nextBest,
          lastScore: score10,
          lastAttemptAt: serverTimestamp(),

          demoAttempts: nextDemoAttempts,

          // 👇 datos ligeros
          recentAttempts: nextRecent,
          weakStreetsCount: weakCountCompacted,
          weakStreetsTop: Object.keys(weakTop), // solo nombres top (rápido para UI)

          updatedAt: serverTimestamp(),
        },
      };

      tx.set(progressRef, update, { merge: true });
    });

    return { ok: true, attemptId: attemptRef.id };
  } catch (e) {
    console.error("Error saving Callejero progress:", e);
    return { ok: false, error: e?.message || "Unknown error" };
  }
}