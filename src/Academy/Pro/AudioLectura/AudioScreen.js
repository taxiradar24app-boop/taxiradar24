// src/Academy/Pro/AudioLectura/AudioScreen.js

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PageWrapper,
  PageContainer,
  AudioGrid,
  AudioCard,
  AudioTitle,
  AudioDescription,
  AudioPlayer,
} from "./AudioStyle";

import { useAuth } from "./../../../context/AuthContext";
import { saveAudioProgress } from "./logic/saveAudioProgress";

import { getDb } from "./../../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";


/* ===============================
   🔐 PRO Signed URLs (Worker)
================================ */

const WORKER_BASE = "https://taxiradar24-academy-api.taxiradar24audio.workers.dev";

// ✅ endpoint que devuelve { url } (firmada 60s)
const SIGN_ENDPOINT = `${WORKER_BASE}/audio/sign`;

// Key (nombre del mp3 en R2). IMPORTANTE: esto debe coincidir con el key real.
const AUDIO_KEYS = [
  { id: 0, title: "Curso Oficial del Reglamento del Taxi de Palma", key: "0-curso-oficial-reglamento-taxi-palma.mp3" },
  { id: 1, title: "1: Artículos 1 al 3 – Introducción, Objeto y Ámbito", key: "1-articulos-1-al-3-introduccion-reglamento-objeto-obligacion-ambito.mp3" },
  { id: 2, title: "2: Artículos 4 al 9 – Número de Licencias, Aumentos y Tasas", key: "2-articulos-4-al-9-numero-licencias-aumentos-disminuciones-tasas.mp3" },
  { id: 3, title: "3: Artículos 10 al 15 – Creación y Otorgamiento de Licencias", key: "3-articulos-10-al-15-creacion-otorgamiento-nuevas-licencias.mp3" },
  { id: 4, title: "4: Artículo 16 – Rescate de Licencias", key: "4-articulo-16-rescate-licencias-procedimiento-completo.mp3" },
  { id: 5, title: "5: Artículos 17 al 20 – Listas de Conductores y Transmisiones", key: "5-articulos-17-al-20-listas-conductores-adjudicaciones-transmisiones.mp3" },
  { id: 6, title: "6: Artículos 21 al 25 – Titulares, Requisitos y Honorabilidad", key: "6-articulos-21-al-25-titulares-requisitos-honorabilidad-altas-bajas-conductores.mp3" },
  { id: 7, title: "7: Artículos 26 al 27 – Conductores y Permiso Municipal", key: "7-articulos-26-al-27-conductores-permiso-municipal-taxista.mp3" },
  { id: 8, title: "8: Artículos 28 al 32 – Permiso Municipal, Revisión y Suspensión", key: "8-articulos-28-al-32-permiso-municipal-taxista-revision-caducidad-suspension.mp3" },
  { id: 9, title: "9: Artículos 33 al 45 – Vehículos, Señalización y Sustitución", key: "9-articulos-33-al-45-vehiculos-senalizacion-revision-antiguedad-sustitucion.mp3" },
  { id: 10, title: "10: Artículo 46 – Tarifas Oficiales del Taxi", key: "10-articulo-46-tarifas-oficiales-servicio-taxi-palma.mp3" },
  { id: 11, title: "11: Artículos 47 al 65 – Prestación del Servicio y Zonas Especiales", key: "11-articulos-47-al-65-prestacion-servicio-turnos-conductores-usuarios-zonas-especiales.mp3" },
  { id: 12, title: "12: Artículos 66 al 68 – Revocación de Licencias", key: "12-articulos-66-al-68-revocacion-licencias-permiso-municipal-taxista.mp3" },
  { id: 13, title: "13: Artículos 69 al 74 – Medidas Correctoras e Inmovilizaciones", key: "13-articulos-69-al-74-medidas-correctoras-inmovilizaciones-prohibiciones.mp3" },
  { id: 14, title: "14: Artículos 77 al 81 – Infracciones Muy Graves, Graves y Leves", key: "14-articulos-77-al-81-infracciones-muy-graves-graves-leves.mp3" },
  { id: 15, title: "15: Artículo 82 – Régimen Sancionador e Importes", key: "15-articulo-82-regimen-sancionador-importes-gravedad-infracciones.mp3" },
];

const RATE_STORAGE_KEY = "TR24_AUDIO_PLAYBACK_RATE";

const clampNum = (n, min, max) => Math.max(min, Math.min(max, n));
const safeNum = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

async function fetchSignedUrl({ firebaseUser, key }) {
  const idToken = await firebaseUser.getIdToken();
  const res = await fetch(`${SIGN_ENDPOINT}?key=${encodeURIComponent(key)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SIGN_URL_FAILED: ${res.status} ${txt}`);
  }

  const data = await res.json();
  if (!data?.url) throw new Error("SIGN_URL_NO_URL");
  return data.url;
}

export default function AudioScreen() {
  const auth = useAuth();
  const firebaseUser = auth?.user || null;
  const userId = firebaseUser?.uid || null;

  // ✅ URLs firmadas por audioId (expiran ~60s, las pedimos al dar play)
  const [signedUrls, setSignedUrls] = useState({}); // { [audioId]: url }
  const [signing, setSigning] = useState({}); // { [audioId]: boolean }
  const [signError, setSignError] = useState({}); // { [audioId]: string }

  // ✅ Progreso guardado (para reanudar)
  const [savedMap, setSavedMap] = useState({}); // { audio_1: { listenedSeconds, percent, completed, ... } }
  const savedMapRef = useRef({});
  useEffect(() => {
    savedMapRef.current = savedMap;
  }, [savedMap]);

  // ✅ Playback rate persistente
  const [playbackRate, setPlaybackRate] = useState(() => {
    const raw = localStorage.getItem(RATE_STORAGE_KEY);
    const r = safeNum(raw, 1);
    return [1, 1.25, 1.5].includes(r) ? r : 1;
  });

  useEffect(() => {
    localStorage.setItem(RATE_STORAGE_KEY, String(playbackRate));
  }, [playbackRate]);

  // ✅ refs a elementos <audio> para controlar currentTime / rate
  const audioElsRef = useRef({}); // { [audioId]: HTMLAudioElement }

  // ✅ marca “ya reanudé este audio” (para no saltar cada vez que hace metadata/timeupdate)
  const resumedOnceRef = useRef({}); // { [audioId]: true }

  const audios = useMemo(() => AUDIO_KEYS, []);

  // ==========================================
  // 1) Cargar progreso al entrar (reanudar)
  // ==========================================
 useEffect(() => {
  if (!userId) return;

  (async () => {
    try {
      const db = await getDb();

      const ref = doc(db, "progress", userId);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setSavedMap({});
        return;
      }

      const data = snap.data() || {};
      const audio = data.audio || {};
      const map = audio.audios || {};

      const savedRate = safeNum(audio?.settings?.playbackRate, 0);
      if ([1, 1.25, 1.5].includes(savedRate)) {
        setPlaybackRate(savedRate);
        localStorage.setItem(RATE_STORAGE_KEY, String(savedRate));
      }

      setSavedMap(map);
    } catch (e) {
      console.error("AudioScreen load progress error:", e);
    }
  })();
}, [userId]);

  // ==========================================
  // 2) Guardar progreso (suave)
  // ==========================================
  const lastSavedTimeRef = useRef({}); // { [audioId]: seconds }
  const lastSavedAtRef = useRef({}); // { [audioId]: timestampMs }
  const durationRef = useRef({}); // { [audioId]: durationSeconds }

  const safeSave = useCallback(
    async ({ audioId, title, listenedSeconds, durationSeconds }) => {
      if (!userId) return;
      if (!durationSeconds || durationSeconds <= 0) return;

      try {
        await saveAudioProgress({
          userId,
          audioId,
          title,
          listenedSeconds,
          durationSeconds,
          totalAudios: audios.length,
          playbackRate,
        });

        // ✅ mantenemos un map local actualizado para reanudar sin recargar página
        const audioKey = `audio_${audioId}`;
        const prev = savedMapRef.current || {};
        const prevEntry = prev[audioKey] || {};
        const merged = Math.max(safeNum(prevEntry.listenedSeconds, 0), safeNum(listenedSeconds, 0));

        const percent = Math.round((merged / durationSeconds) * 100);
        const completed = percent >= 90;

        const next = {
          ...prev,
          [audioKey]: {
            ...prevEntry,
            audioId: Number(audioId),
            title: title || prevEntry.title || "",
            listenedSeconds: merged,
            durationSeconds,
            percent,
            completed,
            lastListenAt: new Date().toISOString(),
            completedAt: completed ? (prevEntry.completedAt || new Date().toISOString()) : (prevEntry.completedAt || null),
          },
        };

        setSavedMap(next);
      } catch (e) {
        console.error("AudioScreen save progress error:", e);
      }
    },
    [userId, audios.length, playbackRate]
  );

  // ==========================================
  // 3) Pedir URL firmada SOLO cuando haga play
  // ==========================================
  const ensureSignedUrl = useCallback(
    async (audio) => {
      if (!firebaseUser) return null;

      // si ya hay url, la reutilizamos (si expiró, el audio fallará y volveremos a pedir otra)
      if (signedUrls[audio.id]) return signedUrls[audio.id];

      setSigning((s) => ({ ...s, [audio.id]: true }));
      setSignError((e) => ({ ...e, [audio.id]: "" }));

      try {
        const url = await fetchSignedUrl({ firebaseUser, key: audio.key });
        setSignedUrls((m) => ({ ...m, [audio.id]: url }));
        return url;
      } catch (err) {
        const msg = err?.message || "SIGN_ERROR";
        setSignError((e) => ({ ...e, [audio.id]: msg }));
        return null;
      } finally {
        setSigning((s) => ({ ...s, [audio.id]: false }));
      }
    },
    [firebaseUser, signedUrls]
  );

  // ==========================================
  // 4) Eventos del <audio>
  // ==========================================
  const handleLoadedMetadata = useCallback(
    (audio, e) => {
      const el = e.currentTarget;
      audioElsRef.current[audio.id] = el;

      // ✅ aplicar playback rate al cargar
      try {
        el.playbackRate = playbackRate;
      } catch {}

      const duration = safeNum(el?.duration, 0);
      if (duration > 0) durationRef.current[audio.id] = duration;

      // ✅ reanudar solo 1 vez
      if (resumedOnceRef.current[audio.id]) return;

      const audioKey = `audio_${audio.id}`;
      const entry = (savedMapRef.current || {})[audioKey] || {};
      const listened = safeNum(entry.listenedSeconds, 0);
      const percent = safeNum(entry.percent, 0);

      // si ya está prácticamente terminado, empieza desde 0
      if (percent >= 98) {
        resumedOnceRef.current[audio.id] = true;
        return;
      }

      // reanuda con margen (para contexto)
      const resumeAt = clampNum(listened - 2, 0, Math.max(0, duration - 1));
      if (resumeAt > 0) {
        try {
          el.currentTime = resumeAt;
        } catch {}
      }

      resumedOnceRef.current[audio.id] = true;
    },
    [playbackRate]
  );

  const handlePlay = useCallback(
    async (audio, e) => {
      // si no hay url firmada aún, la pedimos al primer play
      if (!signedUrls[audio.id]) {
        e.preventDefault?.();

        const url = await ensureSignedUrl(audio);
        if (!url) return;

        // forzar reload del source
        const el = audioElsRef.current[audio.id];
        if (el) {
          // pausa y recarga
          try {
            el.pause();
          } catch {}

          // reset de reanudación para que aplique al cargar nuevo source
          resumedOnceRef.current[audio.id] = false;

          // Cambiamos el <source> por state => re-render y load()
          // y luego play (ligero delay)
          setTimeout(() => {
            try {
              el.load();
              el.play().catch(() => {});
            } catch {}
          }, 50);
        }
      } else {
        // aplicar rate en cada play por si el navegador lo reseteó
        const el = audioElsRef.current[audio.id];
        if (el) {
          try {
            el.playbackRate = playbackRate;
          } catch {}
        }
      }
    },
    [signedUrls, ensureSignedUrl, playbackRate]
  );

  const handleTimeUpdate = useCallback(
    (audio, e) => {
      if (!userId) return;

      const el = e.currentTarget;
      const currentTime = safeNum(el?.currentTime, 0);
      const duration = safeNum(el?.duration || durationRef.current[audio.id], 0);

      if (currentTime < 0 || duration <= 0) return;

      const now = Date.now();
      const lastAt = safeNum(lastSavedAtRef.current[audio.id], 0);

      // ✅ guardado “suave” cada 15s
      if (now - lastAt < 15000) return;

      const lastTime = safeNum(lastSavedTimeRef.current[audio.id], 0);
      if (currentTime < lastTime + 5) return;

      lastSavedAtRef.current[audio.id] = now;
      lastSavedTimeRef.current[audio.id] = currentTime;

      safeSave({
        audioId: audio.id,
        title: audio.title,
        listenedSeconds: currentTime,
        durationSeconds: duration,
      });
    },
    [userId, safeSave]
  );

  const handlePause = useCallback(
    (audio, e) => {
      if (!userId) return;

      const el = e.currentTarget;
      const currentTime = safeNum(el?.currentTime, 0);
      const duration = safeNum(el?.duration || durationRef.current[audio.id], 0);

      if (currentTime < 0 || duration <= 0) return;

      lastSavedAtRef.current[audio.id] = Date.now();
      lastSavedTimeRef.current[audio.id] = Math.max(
        safeNum(lastSavedTimeRef.current[audio.id], 0),
        currentTime
      );

      safeSave({
        audioId: audio.id,
        title: audio.title,
        listenedSeconds: currentTime,
        durationSeconds: duration,
      });
    },
    [userId, safeSave]
  );

  const handleEnded = useCallback(
    (audio, e) => {
      if (!userId) return;

      const el = e.currentTarget;
      const duration = safeNum(el?.duration || durationRef.current[audio.id], 0);
      if (duration <= 0) return;

      lastSavedAtRef.current[audio.id] = Date.now();
      lastSavedTimeRef.current[audio.id] = duration;

      safeSave({
        audioId: audio.id,
        title: audio.title,
        listenedSeconds: duration,
        durationSeconds: duration,
      });
    },
    [userId, safeSave]
  );

  // ==========================================
  // 5) Control velocidad (UI simple)
  // ==========================================
  const setRate = useCallback((r) => {
    setPlaybackRate(r);

    // aplicar rate a todos los audios ya montados
    for (const el of Object.values(audioElsRef.current || {})) {
      try {
        el.playbackRate = r;
      } catch {}
    }
  }, []);

  return (
    <PageWrapper>
      <PageContainer>
        <h1 style={{ color: "#ffc83d", marginBottom: "0.6rem" }}>
          🎧 Audio-lectura del Reglamento Oficial (PRO)
        </h1>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: "1.2rem" }}>
          <span style={{ color: "#cbd5e1" }}>Velocidad:</span>

          {[1, 1.25, 1.5].map((r) => (
            <button
              key={r}
              onClick={() => setRate(r)}
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                background: playbackRate === r ? "rgba(255,200,61,0.18)" : "rgba(255,255,255,0.06)",
                color: "#ffffff",
                padding: "8px 10px",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 650,
              }}
            >
              {r}x
            </button>
          ))}
        </div>

        <p style={{ marginBottom: "2.2rem", color: "#cbd5e1" }}>
          Reanuda automáticamente donde lo dejaste. Los audios se sirven con URL firmadas (60s).
        </p>

        <AudioGrid>
          {audios.map((audio) => {
            const audioKey = `audio_${audio.id}`;
            const entry = savedMap[audioKey] || {};
            const percent = safeNum(entry.percent, 0);
            const listened = safeNum(entry.listenedSeconds, 0);

            const src = signedUrls[audio.id] || ""; // se pide al dar play

            return (
              <AudioCard key={audio.id}>
                <AudioTitle>{audio.title}</AudioTitle>
                <AudioDescription>
                  Progreso: <strong style={{ color: "#ffc83d" }}>{percent}%</strong>
                  {listened > 0 ? (
                    <span style={{ marginLeft: 8, color: "#9aa4b2" }}>
                      (último punto: {Math.floor(listened)}s)
                    </span>
                  ) : null}
                </AudioDescription>

                {signError[audio.id] ? (
                  <div style={{ color: "#ff6b6b", marginBottom: 10, fontSize: 13 }}>
                    Error firmando audio: {signError[audio.id]}
                  </div>
                ) : null}

                {signing[audio.id] ? (
                  <div style={{ color: "#cbd5e1", marginBottom: 10, fontSize: 13 }}>
                    Firmando audio...
                  </div>
                ) : null}

              <AudioPlayer
                controls
                preload="metadata"
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                onLoadedMetadata={(e) => handleLoadedMetadata(audio, e)}
                onPlay={(e) => handlePlay(audio, e)}
                onTimeUpdate={(e) => handleTimeUpdate(audio, e)}
                onPause={(e) => handlePause(audio, e)}
                onEnded={(e) => handleEnded(audio, e)}
              >
                {src ? <source src={src} type="audio/mpeg" /> : null}
                Tu navegador no soporta audio HTML5.
              </AudioPlayer>

                {/* UX: botón manual por si quiere firmar antes */}
                {!src ? (
                  <button
                    onClick={() => ensureSignedUrl(audio)}
                    style={{
                      marginTop: 10,
                      border: "1px solid rgba(255,255,255,0.18)",
                      background: "rgba(255,255,255,0.06)",
                      color: "#ffffff",
                      padding: "8px 10px",
                      borderRadius: 10,
                      cursor: "pointer",
                      fontWeight: 650,
                    }}
                  >
                    Cargar audio
                  </button>
                ) : null}
              </AudioCard>
            );
          })}
        </AudioGrid>
      </PageContainer>
    </PageWrapper>
  );
}