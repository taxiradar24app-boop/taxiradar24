// src/Tools/Flight/AeroBoxDataRadarScreen.js

import React, { useEffect, useState, useRef } from "react";
import useAeroBoxArrivals from "@/Drivers/hooksDrivers/useAeroBoxArrival";
import { useSmartNavigation } from "@/utils/SmartNavigation";
import {
  Container,
  TopBar,
  BackSlot,
  BackIcon,
  BackText,
  HeaderBlock,
  Kicker,
  Title,
  HeaderSubtitle,
  MetaRow,
  LastUpdated,
  TableWrap,
  Table,
  FlightCode,
  AirlineText,
  OriginText,
  TimeText,
  Status,
  EmptyState,
} from "@/Tools/Flights/AeroBoxDataRadarStyle";

function classifyFlight(f) {
  if (!f.estimated_arrival) return null;

  const now = Date.now();
  const eta = new Date(f.estimated_arrival).getTime();
  const diffMin = (eta - now) / 60000;

  if (diffMin < -15 || diffMin > 30) return null;

  if (diffMin >= -15 && diffMin < -7) {
    return {
      icon: "🚖✨",
      label: "Tubo",
      color: "#f4d35e",
      background: "rgba(244, 211, 94, 0.12)",
      border: "rgba(244, 211, 94, 0.24)",
      diffMin,
    };
  }

  if (diffMin >= -7 && diffMin < 0) {
    return {
      icon: "🔵",
      label: "Landed",
      color: "#9dc6ff",
      background: "rgba(59, 130, 246, 0.12)",
      border: "rgba(59, 130, 246, 0.22)",
      diffMin,
    };
  }

  if (f.status === "Delayed" && diffMin >= 0 && diffMin <= 30) {
    return {
      icon: "🟠",
      label: "Delayed",
      color: "#ffd08b",
      background: "rgba(245, 158, 11, 0.12)",
      border: "rgba(245, 158, 11, 0.22)",
      diffMin,
    };
  }

  if (diffMin >= 0 && diffMin <= 30) {
    return {
      icon: "🟢",
      label: "On Time",
      color: "#9ff0da",
      background: "rgba(16, 163, 127, 0.14)",
      border: "rgba(16, 163, 127, 0.24)",
      diffMin,
    };
  }

  return null;
}

export default function FlightAeroDataBoxScreen() {
  const { items, updatedAt, loading } = useAeroBoxArrivals();
  const { goTools } = useSmartNavigation();
  const [processed, setProcessed] = useState([]);
  const wakeLockRef = useRef(null);

  useEffect(() => {
    let wakeLock = null;
    let visibilityHandler = null;

    async function requestWakeLock() {
      try {
        if ("wakeLock" in navigator) {
          wakeLock = await navigator.wakeLock.request("screen");
          wakeLockRef.current = wakeLock;
          wakeLock.addEventListener("release", () => {});
        }
      } catch (err) {
        console.warn("No se pudo activar el Wake Lock:", err.message);
      }
    }

    requestWakeLock();

    visibilityHandler = async () => {
      if (document.visibilityState === "visible" && !wakeLockRef.current) {
        await requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", visibilityHandler);

    return () => {
      document.removeEventListener("visibilitychange", visibilityHandler);
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    };
  }, []);

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
    } else {
      setProcessed([]);
    }
  }, [items]);

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
      <TopBar>
        <BackSlot type="button" onClick={goTools} aria-label="Volver a herramientas">
          <BackIcon>←</BackIcon>
          <BackText>Herramientas</BackText>
        </BackSlot>
      </TopBar>

      <HeaderBlock>
        <Kicker>Radar operativo</Kicker>
        <Title>
          ✈️ Radar <span>/ Llegadas</span>
        </Title>
        <HeaderSubtitle>
          Vista rápida de vuelos en aproximación y aterrizajes recientes para
          ayudarte a decidir mejor tu posición.
        </HeaderSubtitle>
      </HeaderBlock>

      <MetaRow>
        <LastUpdated>
          {loading
            ? "⏳ Cargando radar…"
            : `🕒 Actualizado: ${new Date(updatedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
        </LastUpdated>
      </MetaRow>

      <TableWrap>
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
                <tr key={`${f.flight_number || "flight"}-${i}`}>
                  <td>
                    <FlightCode>{f.flight_number || "—"}</FlightCode>
                  </td>
                  <td>
                    <AirlineText>{f.airline || "—"}</AirlineText>
                  </td>
                  <td className="hide-mobile">
                    <OriginText>{f.origin_iata || f.origin_name || "—"}</OriginText>
                  </td>
                  <td>
                    <TimeText>
                      {f.estimated_arrival
                        ? new Date(f.estimated_arrival).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </TimeText>
                  </td>
                  <td>
                    <Status
                      style={{
                        color: f.color,
                        background: f.background,
                        border: `1px solid ${f.border}`,
                      }}
                    >
                      {f.icon} {f.label}
                    </Status>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <EmptyState>
                    No hay vuelos en el rango de tiempo actual.
                  </EmptyState>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableWrap>
    </Container>
  );
}