import { useEffect, useRef, useState } from "react";

const ENDPOINT =
  "https://taxitip-worker.taxitip.workers.dev/vuelos/adbox/next12h";

export function useAdboxFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [error, setError] = useState(null);
  const [stale, setStale] = useState(false);

  const abortRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    async function fetchFlights() {
      try {
        if (abortRef.current) {
          abortRef.current.abort();
        }

        const controller = new AbortController();
        abortRef.current = controller;

        setError(null);

        const res = await fetch(ENDPOINT, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
    
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        if (!isMountedRef.current) return;

        const nextFlights = Array.isArray(data.items) ? data.items : [];
        const nextUpdatedAt = data.updatedAt || Date.now();
        const ageMs = Date.now() - new Date(nextUpdatedAt).getTime();

        setFlights(nextFlights);
        setUpdatedAt(nextUpdatedAt);
        setStale(ageMs > 15 * 60 * 1000);
      } catch (e) {
        if (e?.name === "AbortError") return;
        if (!isMountedRef.current) return;

        console.error("❌ useAdboxFlights error:", e);
        setError("No se pudieron cargar los vuelos.");
        setStale(true);
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    }

    function handleVisibilityOrFocus() {
      if (document.visibilityState === "visible") {
        fetchFlights();
      }
    }

    fetchFlights();

    const intervalId = setInterval(fetchFlights, 30000);

    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);
    window.addEventListener("online", fetchFlights);

    return () => {
      isMountedRef.current = false;

      clearInterval(intervalId);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityOrFocus
      );
      window.removeEventListener("focus", handleVisibilityOrFocus);
      window.removeEventListener("online", fetchFlights);

      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  return { flights, loading, updatedAt, error, stale };
}