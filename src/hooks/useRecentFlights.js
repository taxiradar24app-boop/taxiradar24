// src/hooks/useRecentFlights.js
import { useState, useEffect } from "react";

export function useRecentFlights() {
  const [flights, setFlights] = useState([]);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    async function fetchFlights() {
      try {
        const apiBase = process.env.API_BASE;
const res = await fetch(`${apiBase}/vuelos/recent-confirmed`);

        const data = await res.json();

        console.log("🔎 Flights data:", data);

        // Siempre devolvemos un updatedAt válido
        const safeUpdatedAt = data.updatedAt ? data.updatedAt : Date.now();

        setFlights(data.items || []);
        setUpdatedAt(safeUpdatedAt);
      } catch (err) {
        console.error("❌ Error fetching flights:", err);

        // En caso de error también dejamos updatedAt para evitar null
        setUpdatedAt(Date.now());
      }
    }

    fetchFlights();
    const interval = setInterval(fetchFlights, 30000); // refresco cada 30s
    return () => clearInterval(interval);
  }, []);

  return { flights, updatedAt };
}
