// ✅ useAdboxFlights.js
import { useState, useEffect } from "react";

export function useAdboxFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState(Date.now());
  const [error, setError] = useState(null);
  const [stale, setStale] = useState(false); // ⚠️ aviso de datos viejos

  useEffect(() => {
    let alive = true;
    const cleanup = {};

    async function fetchFlights() {
      try {
        setError(null);
        const res = await fetch(
          "https://taxitip-worker.taxitip.workers.dev/vuelos/adbox/next12h",
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!alive) return;

        setFlights(Array.isArray(data.items) ? data.items : []);
        setUpdatedAt(data.updatedAt || Date.now());

        // 🕒 control de obsolescencia
        const ageMs = Date.now() - (data.updatedAt || Date.now());
        setStale(ageMs > 15 * 60 * 1000); // 15 min sin actualizar
      } catch (e) {
        if (!alive) return;
        console.error("❌ useAdboxFlights error:", e);
        setError("No se pudieron cargar los vuelos.");
        setFlights([]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    // 🚀 Llamada inicial inmediata
    fetchFlights();

    // ⏳ Desfase inicial 2 min para no coincidir con CRON del Worker
    const initialOffset = 2 * 60 * 1000;

    const timeout = setTimeout(() => {
      fetchFlights();
      // 🔁 Frecuencia cada 1 hora (plan gratis AeroDataBox)
      const id = setInterval(fetchFlights, 60 * 60 * 1000);
      cleanup.id = id;
    }, initialOffset);

    // 🧹 Limpieza al desmontar
    return () => {
      alive = false;
      clearTimeout(timeout);
      if (cleanup.id) clearInterval(cleanup.id);
    };
  }, []);

  return { flights, loading, updatedAt, error, stale };
}
