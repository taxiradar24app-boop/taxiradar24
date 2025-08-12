import { useEffect, useRef, useState } from "react";

const PROXY_BASE = "https://taxitip-proxy.onrender.com"; // 👈 tu proxy Render
const PROXY_SECRET = process.env.EXPO_PUBLIC_PROXY_SECRET; // secreto desde env frontend

// BBox Palma/LEPA
const BBOX_LEPA = { lamin: 39.48, lomin: 2.60, lamax: 39.78, lomax: 2.90 };

export default function useFlights(bbox = BBOX_LEPA, extended = true) {
  const [time, setTime] = useState(null);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const mapRow = (r) => ({
    icao24: r[0],
    callsign: (r[1] || "").trim(),
    country: r[2],
    timePosition: r[3],
    lastContact: r[4],
    lon: r[5],
    lat: r[6],
    baroAltitude: r[7],
    onGround: r[8],
    velocity: r[9],
    trueTrack: r[10],
    verticalRate: r[11],
    sensors: r[12],
    geoAltitude: r[13],
    squawk: r[14],
    spi: r[15],
    positionSource: r[16],
    category: r[17],
  });

  async function fetchFlights() {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      lamin: String(bbox.lamin),
      lomin: String(bbox.lomin),
      lamax: String(bbox.lamax),
      lomax: String(bbox.lomax),
      ...(extended ? { extended: "1" } : {}),
    });

    const url = `${PROXY_BASE}/opensky/states?${params.toString()}`;

    try {
      abortRef.current?.abort?.();
      abortRef.current = new AbortController();
      const res = await fetch(url, {
        signal: abortRef.current.signal,
        headers: {
          'x-proxy-secret': PROXY_SECRET || ''
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setTime(json.time || null);
      setStates((json.states || []).map(mapRow));
    } catch (e) {
      if (e.name !== "AbortError") setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFlights();
    return () => abortRef.current?.abort?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bbox.lamin, bbox.lomin, bbox.lamax, bbox.lomax, extended]);

  return { time, states, loading, error, refetch: fetchFlights };
}
