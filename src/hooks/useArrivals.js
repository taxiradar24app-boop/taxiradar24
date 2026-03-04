// src/hooks/useRecentFlights.js
import { useEffect, useRef, useState } from "react";

const DEFAULT_URL =
  "https://taxitip-worker.taxitip.workers.dev/vuelos/view_recent_confirmed";

/**
 * Lee la vista `view_recent_confirmed`.
 * Devuelve { flights, updatedAt, loading, error, notice }.
 * - Acepta array directo o {items|rows|data, updatedAt, meta.cacheAgeSec}
 * - Polling cada refreshMs (30s por defecto)
 * - Limpieza con AbortController
 */
export function useRecentFlights({ url = DEFAULT_URL, refreshMs = 30000 } = {}) {
  const [flights, setFlights] = useState([]);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true); // solo primera carga
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const mountedRef = useRef(false);
  const intervalRef = useRef(null);

  const fetchOnce = async (signal) => {
    try {
      setError(null);
      const res = await fetch(url, { signal, cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (!mountedRef.current) return;

      const rows =
        (Array.isArray(data) && data) ||
        data.items ||
        data.rows ||
        data.data ||
        [];

      setFlights(rows);
      setUpdatedAt(data?.updatedAt || null);

      const age = data?.meta?.cacheAgeSec;
      if (typeof age === "number" && age > 900) {
        setNotice(`⚠️ Datos desactualizados (hace ${Math.round(age / 60)} min)`);
      } else {
        setNotice(null);
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("useRecentFlights error:", err);
      if (!mountedRef.current) return;
      setError(err.message || "Error de red");
      setNotice("⚠️ Error al cargar datos");
    } finally {
      if (mountedRef.current && loading) setLoading(false);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    const controller = new AbortController();

    // primera carga
    fetchOnce(controller.signal);

    // polling
    if (refreshMs > 0) {
      intervalRef.current = setInterval(() => {
        const c = new AbortController();
        fetchOnce(c.signal);
      }, refreshMs);
    }

    // cleanup
    return () => {
      mountedRef.current = false;
      controller.abort();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, refreshMs]);

  return { flights, updatedAt, loading, error, notice };
}
