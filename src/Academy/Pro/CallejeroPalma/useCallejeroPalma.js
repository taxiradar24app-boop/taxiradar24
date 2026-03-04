// src/Academy/Pro/CallejeroPalma/useCallejeroPalma.js

import { useCallback, useEffect, useState } from "react";
import data from "./callejero_respuestas.json";

export default function useCallejeroPalma() {
  const [calles, setCalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCalles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];

      // misma lógica que tenías: barajar y coger 10
      const shuffled = [...items].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);

      setCalles(selected);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCalles();
  }, [fetchCalles]);

  return { calles, loading, error, refetch: fetchCalles };
}
