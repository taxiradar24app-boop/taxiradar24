// src/Tools/Flight/AeroBoxDataRadarScreen.js
// (o la ruta donde lo tengas ubicado)

import React, { useEffect, useState, useRef } from "react";
import useAeroBoxArrivals from "@/Drivers/hooksDrivers/useAeroBoxArrival";
import {
  Container,
  Title,
  Table,
  Status,
  LastUpdated,
} from "@/Tools/Flights/AeroBoxDataRadarStyle"; // ✅ ruta nueva de estilos enterprise

/* 🎯 Clasificación visual y orden lógico */
function classifyFlight(f) {
  if (!f.estimated_arrival) return null;

  const now = Date.now();
  const eta = new Date(f.estimated_arrival).getTime();
  const diffMin = (eta - now) / 60000; // positivo = falta, negativo = ya aterrizó

  // ❌ Fuera del rango útil
  if (diffMin < -15 || diffMin > 30) return null;

  // 🚖✨ Tubo: entre -15 y -7 min
  if (diffMin >= -15 && diffMin < -7) {
    return { icon: "🚖✨", label: "Tubo.", color: "#f4d35e", diffMin };
  }

  // 🔵 Landed: entre 0 y -7 min
  if (diffMin >= -7 && diffMin < 0) {
    return { icon: "🔵", label: "Landed", color: "#7ca7cdff", diffMin };
  }

  // 🟠 Delayed
  if (f.status === "Delayed" && diffMin >= 0 && diffMin <= 30) {
    return { icon: "🟠", label: "Delayed", color: "#f59e0b", diffMin };
  }

  // 🟢 On Time
  if (diffMin >= 0 && diffMin <= 30) {
    return { icon: "🟢", label: "On Time", color: "#10a37f", diffMin };
  }

  return null;
}

export default function FlightAeroDataBoxScreen() {
  const { items, updatedAt, loading } = useAeroBoxArrivals();
  const [processed, setProcessed] = useState([]);
  const wakeLockRef = useRef(null);

  // ⚡ Mantener pantalla activa mientras se muestra el radar
  useEffect(() => {
    let wakeLock = null;

    async function requestWakeLock() {
      try {
        if ("wakeLock" in navigator) {
          wakeLock = await navigator.wakeLock.request("screen");
          wakeLockRef.current = wakeLock;
          console.log("✅ Wake Lock activo");
          wakeLock.addEventListener("release", () =>
            console.log("⚠️ Wake Lock liberado")
          );
        }
      } catch (err) {
        console.warn("No se pudo activar el Wake Lock:", err.message);
      }
    }

    requestWakeLock();

    document.addEventListener("visibilitychange", async () => {
      if (document.visibilityState === "visible" && !wakeLockRef.current) {
        await requestWakeLock();
      }
    });

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    };
  }, []);

  // 🔁 Clasificar vuelos al recibir datos
  useEffect(() => {
    if (items.length > 0) {
      const classified = items
        .map((f) => {
          const status = classifyFlight(f);
          return status ? { ...f, ...status } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.diffMin - b.diffMin);
      setProcessed(classified);
    }
  }, [items]);

  // ⏱️ Recalcular localmente cada 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessed((prev) =>
        prev
          .map((f) => {
            const status = classifyFlight(f);
            return status ? { ...f, ...status } : null;
          })
          .filter(Boolean)
          .sort((a, b) => a.diffMin - b.diffMin)
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Title>✈️ Radar de Llegadas</Title>
      <LastUpdated>
        {loading
          ? "Cargando..."
          : `Actualizado: ${new Date(updatedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
      </LastUpdated>

      <Table>
        <thead>
          <tr>
            <th>Vuelo</th>
            <th>Aerolínea</th>
            <th className="hide-mobile">Origen</th>
            <th>ETA</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {processed.length > 0 ? (
            processed.map((f, i) => (
              <tr key={i}>
                <td>{f.flight_number || "—"}</td>
                <td>{f.airline || "—"}</td>
                <td className="hide-mobile">
                  {f.origin_iata || f.origin_name || "—"}
                </td>
                <td>
                  {f.estimated_arrival
                    ? new Date(f.estimated_arrival).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </td>
                <td>
                  <Status style={{ color: f.color }}>
                    {f.icon} {f.label}
                  </Status>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", opacity: 0.7 }}>
                No hay vuelos en el rango de tiempo actual.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
