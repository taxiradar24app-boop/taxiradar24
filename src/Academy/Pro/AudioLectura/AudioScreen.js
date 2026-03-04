// src/Academy/Pro/AudioLectura/AudioScreen.js

import React, { useCallback, useRef } from "react";
import {
  PageWrapper,
  PageContainer,
  AudioGrid,
  AudioCard,
  AudioTitle,
  AudioDescription,
  AudioPlayer,
} from "./AudioStyle";

// ✅ Auth (sin alias "@", para evitar errores de resolución)
import { useAuth } from "./../../../context/AuthContext";

// ✅ Guardado de progreso en Firestore
import { saveAudioProgress } from "./logic/saveAudioProgress";

/* ================= DATA ================= */

const audios = [
  {
    id: 0,
    title: "Curso Oficial del Reglamento del Taxi de Palma",
    file: "/audios/0-curso-oficial-reglamento-taxi-palma.mp3",
  },
  {
    id: 1,
    title: "1: Artículos 1 al 3 – Introducción, Objeto y Ámbito",
    file: "/audios/1-articulos-1-al-3-introduccion-reglamento-objeto-obligacion-ambito.mp3",
  },
  {
    id: 2,
    title: "2: Artículos 4 al 9 – Número de Licencias, Aumentos y Tasas",
    file: "/audios/2-articulos-4-al-9-numero-licencias-aumentos-disminuciones-tasas.mp3",
  },
  {
    id: 3,
    title: "3: Artículos 10 al 15 – Creación y Otorgamiento de Licencias",
    file: "/audios/3-articulos-10-al-15-creacion-otorgamiento-nuevas-licencias.mp3",
  },
  {
    id: 4,
    title: "4: Artículo 16 – Rescate de Licencias",
    file: "/audios/4-articulo-16-rescate-licencias-procedimiento-completo.mp3",
  },
  {
    id: 5,
    title: "5: Artículos 17 al 20 – Listas de Conductores y Transmisiones",
    file: "/audios/5-articulos-17-al-20-listas-conductores-adjudicaciones-transmisiones.mp3",
  },
  {
    id: 6,
    title: "6: Artículos 21 al 25 – Titulares, Requisitos y Honorabilidad",
    file: "/audios/6-articulos-21-al-25-titulares-requisitos-honorabilidad-altas-bajas-conductores.mp3",
  },
  {
    id: 7,
    title: "7: Artículos 26 al 27 – Conductores y Permiso Municipal",
    file: "/audios/7-articulos-26-al-27-conductores-permiso-municipal-taxista.mp3",
  },
  {
    id: 8,
    title: "8: Artículos 28 al 32 – Permiso Municipal, Revisión y Suspensión",
    file: "/audios/8-articulos-28-al-32-permiso-municipal-taxista-revision-caducidad-suspension.mp3",
  },
  {
    id: 9,
    title: "9: Artículos 33 al 45 – Vehículos, Señalización y Sustitución",
    file: "/audios/9-articulos-33-al-45-vehiculos-senalizacion-revision-antiguedad-sustitucion.mp3",
  },
  {
    id: 10,
    title: "10: Artículo 46 – Tarifas Oficiales del Taxi",
    file: "/audios/10-articulo-46-tarifas-oficiales-servicio-taxi-palma.mp3",
  },
  {
    id: 11,
    title: "11: Artículos 47 al 65 – Prestación del Servicio y Zonas Especiales",
    file: "/audios/11-articulos-47-al-65-prestacion-servicio-turnos-conductores-usuarios-zonas-especiales.mp3",
  },
  {
    id: 12,
    title: "12: Artículos 66 al 68 – Revocación de Licencias",
    file: "/audios/12-articulos-66-al-68-revocacion-licencias-permiso-municipal-taxista.mp3",
  },
  {
    id: 13,
    title: "13: Artículos 69 al 74 – Medidas Correctoras e Inmovilizaciones",
    file: "/audios/13-articulos-69-al-74-medidas-correctoras-inmovilizaciones-prohibiciones.mp3",
  },
  {
    id: 14,
    title: "14: Artículos 77 al 81 – Infracciones Muy Graves, Graves y Leves",
    file: "/audios/14-articulos-77-al-81-infracciones-muy-graves-graves-leves.mp3",
  },
  {
    id: 15,
    title: "15: Artículo 82 – Régimen Sancionador e Importes",
    file: "/audios/15-articulo-82-regimen-sancionador-importes-gravedad-infracciones.mp3",
  },
];

/* ================= SCREEN ================= */

export default function AudioScreen() {
  const auth = useAuth();
  const userId = auth?.user?.uid || null;

  // ============================================================
  // ✅ Control de guardado (sin afectar UI)
  // - Guardamos en eventos: pause / ended
  // - Y también “a intervalos” mientras escucha (cada ~15s)
  // ============================================================

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
        });
      } catch (e) {
        // No rompemos la UI por un guardado fallido
        console.error("AudioScreen save progress error:", e);
      }
    },
    [userId]
  );

  const handleLoadedMetadata = useCallback((audio, e) => {
    const el = e.currentTarget;
    const d = Number(el?.duration || 0);
    if (Number.isFinite(d) && d > 0) {
      durationRef.current[audio.id] = d;
    }
  }, []);

  const handleTimeUpdate = useCallback(
    (audio, e) => {
      if (!userId) return;

      const el = e.currentTarget;
      const currentTime = Number(el?.currentTime || 0);
      const duration = Number(el?.duration || durationRef.current[audio.id] || 0);

      if (!Number.isFinite(currentTime) || currentTime < 0) return;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const now = Date.now();
      const lastAt = Number(lastSavedAtRef.current[audio.id] || 0);

      // Guardado “suave” cada 15s como máximo
      if (now - lastAt < 15000) return;

      // Evitar spam: solo si avanzó un poco desde el último guardado
      const lastTime = Number(lastSavedTimeRef.current[audio.id] || 0);
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
      const currentTime = Number(el?.currentTime || 0);
      const duration = Number(el?.duration || durationRef.current[audio.id] || 0);

      if (!Number.isFinite(currentTime) || currentTime < 0) return;
      if (!Number.isFinite(duration) || duration <= 0) return;

      lastSavedAtRef.current[audio.id] = Date.now();
      lastSavedTimeRef.current[audio.id] = Math.max(
        Number(lastSavedTimeRef.current[audio.id] || 0),
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
      const duration = Number(el?.duration || durationRef.current[audio.id] || 0);

      if (!Number.isFinite(duration) || duration <= 0) return;

      // Al terminar: lo marcamos al 100% (escuchado = duración)
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

  return (
    <PageWrapper>
      <PageContainer>
        <h1 style={{ color: "#ffc83d", marginBottom: "0.6rem" }}>
          🎧 Audio-lectura del Reglamento Oficial
        </h1>

        <p style={{ marginBottom: "2.2rem", color: "#cbd5e1" }}>
          Escucha cada artículo del Reglamento Municipal. Ideal para estudiar
          mientras conduces o descansas.
        </p>

        <AudioGrid>
          {audios.map((audio) => (
            <AudioCard key={audio.id}>
              <AudioTitle>{audio.title}</AudioTitle>
              <AudioDescription>
                Audio oficial del Reglamento Municipal
              </AudioDescription>

              <AudioPlayer
                controls
                onLoadedMetadata={(e) => handleLoadedMetadata(audio, e)}
                onTimeUpdate={(e) => handleTimeUpdate(audio, e)}
                onPause={(e) => handlePause(audio, e)}
                onEnded={(e) => handleEnded(audio, e)}
              >
                <source src={audio.file} type="audio/mpeg" />
                Tu navegador no soporta audio HTML5.
              </AudioPlayer>
            </AudioCard>
          ))}
        </AudioGrid>
      </PageContainer>
    </PageWrapper>
  );
}