import React, { useEffect, useRef, useState } from "react";
import useAeroBoxArrivals from "@/Tools/Flights/hooksToolsFlights/useAeroBoxArrivals";
import { useSmartNavigation } from "@/utils/SmartNavigation";
import ButtonBackSlot from "@/components/Buttons/ButtonBackSlot";
import {
  Container,
  TopBar,
  HeaderBlock,
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

function classifyFlight(flight) {
  if (!flight?.estimated_arrival) return null;

  const now = Date.now();
  const eta = new Date(flight.estimated_arrival).getTime();
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

  if (flight.status === "Delayed" && diffMin >= 0 && diffMin <= 30) {
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
  const { items = [], updatedAt, loading } = useAeroBoxArrivals();
  const { goTools } = useSmartNavigation();
  const [processed, setProcessed] = useState([]);
  const wakeLockRef = useRef(null);

  useEffect(() => {
    let visibilityHandler = null;

    async function requestWakeLock() {
      try {
        if ("wakeLock" in navigator && document.visibilityState === "visible") {
          const wakeLock = await navigator.wakeLock.request("screen");
          wakeLockRef.current = wakeLock;

          wakeLock.addEventListener("release", () => {
            wakeLockRef.current = null;
          });
        }
      } catch (err) {
        console.warn("No se pudo activar el Wake Lock:", err?.message);
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
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!items.length) {
      setProcessed([]);
      return;
    }

    const classified = items
      .map((flight) => {
        const status = classifyFlight(flight);
        return status ? { ...flight, ...status } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.diffMin - b.diffMin);

    setProcessed(classified);
  }, [items]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessed((prev) =>
        prev
          .map((flight) => {
            const status = classifyFlight(flight);
            return status ? { ...flight, ...status } : null;
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
        <ButtonBackSlot
          onClick={goTools}
          label="Herramientas"
          ariaLabel="Volver a herramientas"
        />
      </TopBar>

      <HeaderBlock>
        <Title>
          ✈️ VUELOS: <span>{processed.length}</span>
        </Title>

        <HeaderSubtitle>
          {processed.length === 0
            ? "Sin actividad en este momento"
            : "Vuelos activos en ventana operativa"}
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
              <th className="hide-flight-mobile">Vuelo</th>
              <th>Aerolínea</th>
              <th>Origen</th>
              <th>ETA</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {processed.length > 0 ? (
              processed.map((flight, index) => (
                <tr key={`${flight.flight_number || "flight"}-${index}`}>
                  <td className="hide-flight-mobile">
                    <FlightCode>{flight.flight_number || "—"}</FlightCode>
                  </td>

                  <td>
                    <AirlineText>{flight.airline || "—"}</AirlineText>
                  </td>

                  <td>
                    <OriginText>
                      {flight.origin_iata || flight.origin_name || "—"}
                    </OriginText>
                  </td>

                  <td>
                    <TimeText>
                      {flight.estimated_arrival
                        ? new Date(flight.estimated_arrival).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "—"}
                    </TimeText>
                  </td>

                  <td>
                    <Status
                      style={{
                        color: flight.color,
                        background: flight.background,
                        border: `1px solid ${flight.border}`,
                      }}
                    >
                      {flight.icon} {flight.label}
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