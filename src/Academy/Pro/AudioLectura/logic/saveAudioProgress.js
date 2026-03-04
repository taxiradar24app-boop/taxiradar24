// src/Academy/Pro/AudioLectura/logic/saveAudioProgress.js
// ============================================================
// 🎧 saveAudioProgress.js — TaxiRadar24 Academia (OPTIMIZADO & RENTABLE)
// Guarda resumen ligero en Firestore (progress/{uid}.audio)
// Guarda detalle por evento en subcolección (opcional) para evitar crecer infinito:
//
// ✅ Resumen (siempre pequeño):
//   progress/{uid}.audio => minutes, progress, completed, totalAudios, lastActivityAt,
//                           audios (map) LIMITADO (TOP N recientes / relevantes)
//
// ✅ Detalle escalable (paginable):
//   progress/{uid}/audioEvents/{autoId} => eventos de escucha (opcional)
//
// Objetivo con 1000+ usuarios:
// - Documento progress/{uid} pequeño y rápido
// - Coste estable (no crece infinito)
// - Mantener lo necesario para progreso real del alumno
// - Limitar lo menos relevante (map de audios y eventos)
//
// ============================================================

import { getDb } from "./../../../../services/firebaseConfig";

const db = getDb();

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

// ==============================
// Helpers
// ==============================
const clamp = (n, min = 0, max = 100) =>
  Math.max(min, Math.min(max, Number(n) || 0));

const safeNum = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const nowISO = () => new Date().toISOString();

// Mantiene TOP N audios por "relevancia":
// 1) incompletos primero (porque son los que importan para mejorar)
// 2) luego por lastListenAt más reciente
// 3) si empate: mayor listenedSeconds
const compactAudiosMap = (audiosMap, limit = 24) => {
  const entries = Object.entries(audiosMap || {}).map(([k, v]) => [k, v || {}]);

  entries.sort((a, b) => {
    const A = a[1];
    const B = b[1];

    const aCompleted = !!A.completed;
    const bCompleted = !!B.completed;
    if (aCompleted !== bCompleted) return aCompleted ? 1 : -1; // incompletos arriba

    const aT = Date.parse(A.lastListenAt || 0) || 0;
    const bT = Date.parse(B.lastListenAt || 0) || 0;
    if (aT !== bT) return bT - aT; // reciente arriba

    const aL = safeNum(A.listenedSeconds, 0);
    const bL = safeNum(B.listenedSeconds, 0);
    return bL - aL;
  });

  const out = {};
  for (const [k, v] of entries.slice(0, limit)) out[k] = v;
  return out;
};

// ✅ Recalcula global SOLO con el map compactado (consistente y estable)
// - coverage: completedCount/totalAudios
// - minutesScore: listened/duration
const computeGlobal = (audiosMap, totalAudios) => {
  const entries = Object.values(audiosMap || {});

  const totalListened = entries.reduce(
    (acc, e) => acc + safeNum(e.listenedSeconds, 0),
    0
  );
  const totalDuration = entries.reduce(
    (acc, e) => acc + safeNum(e.durationSeconds, 0),
    0
  );
  const completedCount = entries.reduce((acc, e) => acc + (e.completed ? 1 : 0), 0);

  const safeTotalAudios = Math.max(1, safeNum(totalAudios, 1));

  const coverage = clamp(Math.round((completedCount / safeTotalAudios) * 100));
  const minutesScore =
    totalDuration > 0 ? clamp(Math.round((totalListened / totalDuration) * 100)) : 0;

  const progress = clamp(Math.round(0.8 * coverage + 0.2 * minutesScore));

  return {
    totalListened,
    totalDuration,
    completedCount,
    coverage,
    minutesScore,
    progress,
  };
};

/**
 * ✅ OPTIMIZADO:
 * - Mantiene audio.audios map LIMITADO (por defecto 24)
 * - (Opcional) guarda eventos en subcolección progress/{uid}/audioEvents
 *
 * @param {Object} params
 * @param {string} params.userId
 * @param {number|string} params.audioId
 * @param {string} params.title
 * @param {number} params.listenedSeconds
 * @param {number} params.durationSeconds
 * @param {number} params.totalAudios
 * @param {number} params.completeThreshold
 * @param {boolean} params.trackEvents - si true, guarda evento en subcolección
 * @param {number} params.maxAudiosStored - límite del map audio.audios
 */
export async function saveAudioProgress({
  userId,
  audioId,
  title = "",
  listenedSeconds,
  durationSeconds,
  totalAudios = 16,
  completeThreshold = 90,
  trackEvents = false,
  maxAudiosStored = 24,
}) {
  try {
    if (!userId) throw new Error("saveAudioProgress: userId requerido");
    if (audioId === undefined || audioId === null)
      throw new Error("saveAudioProgress: audioId requerido");

    const safeListened = safeNum(listenedSeconds, 0);
    const safeDuration = safeNum(durationSeconds, 0);
    if (!Number.isFinite(safeListened) || safeListened < 0) {
      throw new Error("saveAudioProgress: listenedSeconds inválido");
    }
    if (!Number.isFinite(safeDuration) || safeDuration <= 0) return;

    const audioKey = `audio_${audioId}`;
    const progressRef = doc(db, "progress", userId);
    const snap = await getDoc(progressRef);

    const prev = snap.exists() ? snap.data() : {};
    const prevAudio = prev.audio || {};
    const prevAudiosMap = prevAudio.audios || {};
    const prevEntry = prevAudiosMap[audioKey] || {};

    // ✅ no retroceder: guardamos el máximo escuchado
    const mergedListenedSeconds = Math.max(
      safeNum(prevEntry.listenedSeconds, 0),
      safeListened
    );

    const percent = clamp(Math.round((mergedListenedSeconds / safeDuration) * 100));
    const completed = percent >= completeThreshold;

    const iso = nowISO();

    const newEntry = {
      id: audioKey,
      audioId: Number(audioId),
      title: title || prevEntry.title || "",
      listenedSeconds: mergedListenedSeconds,
      durationSeconds: safeDuration,
      percent,
      completed,
      lastListenAt: iso,
      completedAt:
        completed && !prevEntry.completed ? iso : (prevEntry.completedAt || null),
    };

    // 1) Actualizamos map
    const nextFullMap = {
      ...prevAudiosMap,
      [audioKey]: newEntry,
    };

    // ✅ Compactamos para que NO crezca infinito
    const nextAudiosMap = compactAudiosMap(nextFullMap, maxAudiosStored);

    // 2) Recalculamos global con map compactado
    const g = computeGlobal(nextAudiosMap, totalAudios);

    const totalMinutes = Math.round(g.totalListened / 60);

    // 3) Payload resumen (ligero)
    const payload = {
      audio: {
        minutes: totalMinutes,
        progress: g.progress,
        totalAudios: Math.max(1, safeNum(totalAudios, 1)),
        completed: g.completedCount,
        lastActivityAt: iso,

        // ✅ map compacto (máximo N)
        audios: nextAudiosMap,
      },
      updatedAt: iso,
    };

    if (!snap.exists()) {
      await setDoc(progressRef, payload, { merge: true });
    } else {
      await updateDoc(progressRef, payload);
    }

    // 4) (Opcional) evento detallado en subcolección (paginable)
    if (trackEvents) {
      const eventsCol = collection(db, "progress", userId, "audioEvents");
      await addDoc(eventsCol, {
        createdAt: iso,
        audioId: Number(audioId),
        audioKey,
        listenedSeconds: mergedListenedSeconds,
        durationSeconds: safeDuration,
        percent,
        completed,
        title: title || "",
      });
    }
  } catch (err) {
    console.error("saveAudioProgress error:", err);
    throw err;
  }
}