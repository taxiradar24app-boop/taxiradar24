import { useEffect, useRef, useState } from "react";

const ENDPOINT =
  "https://taxitip-worker.taxitip.workers.dev/vuelos/adbox/next12h";

export default function useAeroBoxArrivals() {
  const [data, setData] = useState({ items: [], updatedAt: null });
  const [loading, setLoading] = useState(true);

  const abortRef = useRef(null);
  const isMountedRef = useRef(true);

  function normalizeFlight(flight) {
    if (!flight?.scheduled_arrival || !flight?.estimated_arrival) return flight;

    const sta = new Date(flight.scheduled_arrival).getTime();
    const eta = new Date(flight.estimated_arrival).getTime();
    const diffMin = Math.round((eta - sta) / 60000);

    let derivedStatus = "On time";
    if (diffMin > 5) derivedStatus = `Delayed +${diffMin} min`;
    else if (diffMin < -5) derivedStatus = `Early ${Math.abs(diffMin)} min`;

    return { ...flight, derivedStatus, diffMin };
  }

  useEffect(() => {
    isMountedRef.current = true;

    async function fetchArrivals() {
      try {
        if (abortRef.current) {
          abortRef.current.abort();
        }

        const controller = new AbortController();
        abortRef.current = controller;

        const res = await fetch(ENDPOINT, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,

        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();

        if (!isMountedRef.current) return;

        const items = (json.items || []).map(normalizeFlight);

        setData({
          items,
          updatedAt: json.updatedAt || Date.now(),
        });
      } catch (err) {
        if (err?.name === "AbortError") return;
        if (!isMountedRef.current) return;

        console.error("❌ Error fetching AeroDataBox:", err);
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    }

    function handleVisibilityOrFocus() {
      if (document.visibilityState === "visible") {
        fetchArrivals();
      }
    }

    fetchArrivals();

    const intervalId = setInterval(fetchArrivals, 30000);

    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);
    window.addEventListener("online", fetchArrivals);

    return () => {
      isMountedRef.current = false;

      clearInterval(intervalId);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityOrFocus
      );
      window.removeEventListener("focus", handleVisibilityOrFocus);
      window.removeEventListener("online", fetchArrivals);

      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  return { ...data, loading };
}