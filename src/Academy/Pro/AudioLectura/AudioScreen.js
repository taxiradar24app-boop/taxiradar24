// src/Academy/Pro/AudioLectura/AudioScreen.js

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PageWrapper,
  PageContainer,
  PageTitle,
  IntroText,
  RateBar,
  RateLabel,
  RateButton,
  AudioGrid,
  AudioCard,
  AudioTitle,
  AudioDescription,
  AudioMeta,
  AudioPlayer,
  StatusText,
} from "./AudioStyle";

import { useAuth } from "./../../../context/AuthContext";
import { saveAudioProgress } from "./logic/saveAudioProgress";
import { getDb } from "./../../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { AUDIO_LIST, AUDIO_SIGN_ENDPOINT } from "./../../share/audioData";

const RATE_STORAGE_KEY = "TR24_AUDIO_PLAYBACK_RATE";

const safeNum = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const clampNum = (n, min, max) => Math.max(min, Math.min(max, n));

const AUDIO_HTML_PROPS = {
  controls: true,
  preload: "metadata",
  controlsList: "nodownload noplaybackrate noremoteplayback",
  disablePictureInPicture: true,
  disableRemotePlayback: true,
};

async function fetchSignedUrl({ firebaseUser, key }) {
  const idToken = await firebaseUser.getIdToken();

  const res = await fetch(
    `${AUDIO_SIGN_ENDPOINT}?key=${encodeURIComponent(key)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );

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

  const audios = useMemo(() => AUDIO_LIST, []);

  const [signedUrls, setSignedUrls] = useState({});
  const [signing, setSigning] = useState({});
  const [signError, setSignError] = useState({});
  const [savedMap, setSavedMap] = useState({});

  const savedMapRef = useRef({});
  const audioElsRef = useRef({});
  const resumedOnceRef = useRef({});
  const loadingByAudioRef = useRef({});
  const lastSavedTimeRef = useRef({});
  const lastSavedAtRef = useRef({});
  const durationRef = useRef({});

  useEffect(() => {
    savedMapRef.current = savedMap;
  }, [savedMap]);

  const [playbackRate, setPlaybackRate] = useState(() => {
    const raw = localStorage.getItem(RATE_STORAGE_KEY);
    const rate = safeNum(raw, 1);
    return [1, 1.25, 1.5].includes(rate) ? rate : 1;
  });

  useEffect(() => {
    localStorage.setItem(RATE_STORAGE_KEY, String(playbackRate));
  }, [playbackRate]);

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
      } catch (error) {
        console.error("AudioScreen load progress error:", error);
      }
    })();
  }, [userId]);

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

        const audioKey = `audio_${audioId}`;
        const prev = savedMapRef.current || {};
        const prevEntry = prev[audioKey] || {};
        const merged = Math.max(
          safeNum(prevEntry.listenedSeconds, 0),
          safeNum(listenedSeconds, 0)
        );

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
            completedAt: completed
              ? prevEntry.completedAt || new Date().toISOString()
              : prevEntry.completedAt || null,
          },
        };

        setSavedMap(next);
      } catch (error) {
        console.error("AudioScreen save progress error:", error);
      }
    },
    [userId, audios.length, playbackRate]
  );

  const ensureSignedUrl = useCallback(
    async (audio) => {
      if (!firebaseUser) return null;

      if (signedUrls[audio.id]) {
        return signedUrls[audio.id];
      }

      if (loadingByAudioRef.current[audio.id]) {
        return null;
      }

      loadingByAudioRef.current[audio.id] = true;
      setSigning((prev) => ({ ...prev, [audio.id]: true }));
      setSignError((prev) => ({ ...prev, [audio.id]: "" }));

      try {
        const url = await fetchSignedUrl({
          firebaseUser,
          key: audio.key,
        });

        setSignedUrls((prev) => ({ ...prev, [audio.id]: url }));
        return url;
      } catch (error) {
        const message = error?.message || "SIGN_ERROR";
        setSignError((prev) => ({ ...prev, [audio.id]: message }));
        return null;
      } finally {
        loadingByAudioRef.current[audio.id] = false;
        setSigning((prev) => ({ ...prev, [audio.id]: false }));
      }
    },
    [firebaseUser, signedUrls]
  );

  useEffect(() => {
    if (!firebaseUser || !audios.length) return;

    let cancelled = false;

    (async () => {
      for (const audio of audios) {
        if (cancelled) return;
        if (signedUrls[audio.id]) continue;
        await ensureSignedUrl(audio);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [firebaseUser, audios, signedUrls, ensureSignedUrl]);

  const handleLoadedMetadata = useCallback(
    (audio, e) => {
      const el = e.currentTarget;
      audioElsRef.current[audio.id] = el;

      try {
        el.playbackRate = playbackRate;
      } catch {}

      const duration = safeNum(el?.duration, 0);
      if (duration > 0) {
        durationRef.current[audio.id] = duration;
      }

      if (resumedOnceRef.current[audio.id]) return;

      const audioKey = `audio_${audio.id}`;
      const entry = (savedMapRef.current || {})[audioKey] || {};
      const listened = safeNum(entry.listenedSeconds, 0);
      const percent = safeNum(entry.percent, 0);

      if (percent >= 98) {
        resumedOnceRef.current[audio.id] = true;
        return;
      }

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

  const handleCanPlay = useCallback(
    (audio) => {
      const el = audioElsRef.current[audio.id];
      if (!el) return;

      try {
        el.playbackRate = playbackRate;
      } catch {}
    },
    [playbackRate]
  );

  const handlePlay = useCallback(
    (audio, e) => {
      const el = e.currentTarget;
      audioElsRef.current[audio.id] = el;

      try {
        el.playbackRate = playbackRate;
      } catch {}
    },
    [playbackRate]
  );

  const handleError = useCallback(
    async (audio) => {
      if (!firebaseUser) return;

      setSignedUrls((prev) => {
        const next = { ...prev };
        delete next[audio.id];
        return next;
      });

      resumedOnceRef.current[audio.id] = false;
      await ensureSignedUrl(audio);
    },
    [firebaseUser, ensureSignedUrl]
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

  const setRate = useCallback((rate) => {
    setPlaybackRate(rate);

    Object.values(audioElsRef.current || {}).forEach((el) => {
      try {
        el.playbackRate = rate;
      } catch {}
    });
  }, []);

  return (
    <PageWrapper>
      <PageContainer>
        <PageTitle>🎧 Audio-lectura del Reglamento Oficial</PageTitle>

        <IntroText>
          Reanuda automáticamente donde lo dejaste, estudia a tu ritmo y escucha
          en segundo plano desde el móvil, manteniendo una experiencia simple,
          fluida y profesional.
        </IntroText>

        <RateBar>
          <RateLabel>Velocidad:</RateLabel>

          {[1, 1.25, 1.5].map((rate) => (
            <RateButton
              key={rate}
              type="button"
              active={playbackRate === rate}
              onClick={() => setRate(rate)}
            >
              {rate}x
            </RateButton>
          ))}
        </RateBar>

        <AudioGrid>
          {audios.map((audio) => {
            const audioKey = `audio_${audio.id}`;
            const entry = savedMap[audioKey] || {};
            const percent = safeNum(entry.percent, 0);
            const listened = safeNum(entry.listenedSeconds, 0);
            const src = signedUrls[audio.id] || "";

            return (
              <AudioCard key={audio.id}>
                <AudioTitle>{audio.title}</AudioTitle>

                <AudioDescription>{audio.description}</AudioDescription>

                <AudioMeta>
                  Progreso: <strong>{percent}%</strong>
                  {listened > 0 ? (
                    <span> · último punto: {Math.floor(listened)}s</span>
                  ) : null}
                </AudioMeta>

                {signError[audio.id] ? (
                  <StatusText error>
                    Error cargando el audio: {signError[audio.id]}
                  </StatusText>
                ) : null}

                {!src && signing[audio.id] ? (
                  <StatusText>Preparando audio seguro...</StatusText>
                ) : null}

                <AudioPlayer
                  {...AUDIO_HTML_PROPS}
                  src={src}
                  onContextMenu={(e) => e.preventDefault()}
                  onLoadedMetadata={(e) => handleLoadedMetadata(audio, e)}
                  onCanPlay={() => handleCanPlay(audio)}
                  onPlay={(e) => handlePlay(audio, e)}
                  onTimeUpdate={(e) => handleTimeUpdate(audio, e)}
                  onPause={(e) => handlePause(audio, e)}
                  onEnded={(e) => handleEnded(audio, e)}
                  onError={() => handleError(audio)}
                >
                  Tu navegador no soporta audio HTML5.
                </AudioPlayer>
              </AudioCard>
            );
          })}
        </AudioGrid>
      </PageContainer>
    </PageWrapper>
  );
}