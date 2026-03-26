// src/hooks/useAeroBoxArrivals.js
import { useState, useEffect } from "react";

export default function useAeroBoxArrivals() {
  const [data, setData] = useState({ items: [], updatedAt: null });
  const [loading, setLoading] = useState(true);

  // 🧭 Función auxiliar para deducir retrasos o adelantos
  function normalizeFlight(f) {
    if (!f.scheduled_arrival || !f.estimated_arrival) return f;

    const sta = new Date(f.scheduled_arrival).getTime();
    const eta = new Date(f.estimated_arrival).getTime();
    const diffMin = Math.round((eta - sta) / 60000); // + → retraso, − → adelanto

    let derivedStatus = "On time";
    if (diffMin > 5) derivedStatus = `Delayed +${diffMin} min`;
    else if (diffMin < -5) derivedStatus = `Early ${Math.abs(diffMin)} min`;

    return { ...f, derivedStatus, diffMin };
  }

  const fetchArrivals = async () => {
    try {
      const res = await fetch(
        "https://taxitip-worker.taxitip.workers.dev/vuelos/adbox/next12h"
      );
      const json = await res.json();

      // 🔁 Aplica el cálculo local de retraso/adelanto a cada vuelo
      const items = (json.items || []).map(normalizeFlight);

      setData({ items, updatedAt: json.updatedAt });
    } catch (err) {
      console.error("❌ Error fetching AeroDataBox:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArrivals();
    const i = setInterval(fetchArrivals, 30000); // 🔄 cada 30 s
    return () => clearInterval(i);
  }, []);

  return { ...data, loading };
}
