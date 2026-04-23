import React, { useEffect, useMemo, useRef } from "react";
import { useAdboxFlights } from "@/Tools/Flights/hooksToolsFlights/useAdboxFlights";
import ButtonBackSlot from "@/components/Buttons/ButtonBackSlot";
import {
  TableContainer,
  TopBar,
  HeaderBlock,
  Kicker,
  TableTitle,
  HourForecastWrap,
  HourForecastItem,
  HourForecastHour,
  HourForecastCount,
  MetaRow,
  UpdatePill,
  ErrorText,
  TableScroll,
  Table,
  FlightCode,
  AirlineText,
  OriginText,
  TimeText,
  StatusBadge,
  EmptyState,
} from "@/Tools/Flights/AeroBoxDataRadarStyle";
import { useThemeMode } from "@/context/ThemeContext";
import { useSmartNavigation } from "@/utils/SmartNavigation";

export default function TableAdboxScreen() {
  const { flights = [], loading, updatedAt, error, stale } = useAdboxFlights();
  const { mode } = useThemeMode();
  const { goTools } = useSmartNavigation();
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

  const nowTs = Date.now();

  const getDisplayStatus = (flight) => {
    try {
      const etaMs = new Date(
        flight.estimated_arrival || flight.scheduled_arrival
      ).getTime();

      if (Number.isNaN(etaMs)) return flight.status;

      const diffMin = (nowTs - etaMs) / 60000;

      if (diffMin > 0 && diffMin <= 15) return "landed";
      if (diffMin > 15) return "expired";
      return flight.status;
    } catch {
      return flight.status;
    }
  };

  const processedFlights = useMemo(() => {
    return [...flights]
      .map((flight) => ({
        ...flight,
        display_status: getDisplayStatus(flight),
      }))
      .filter((flight) => flight.display_status !== "expired")
      .sort((a, b) => {
        const aTime = new Date(
          a.estimated_arrival || a.scheduled_arrival || 0
        ).getTime();
        const bTime = new Date(
          b.estimated_arrival || b.scheduled_arrival || 0
        ).getTime();
        return aTime - bTime;
      });
  }, [flights, nowTs]);

  const hourlyForecast = useMemo(() => {
    const bucket = {};

    processedFlights.forEach((flight) => {
      const baseDate = flight.estimated_arrival || flight.scheduled_arrival;
      if (!baseDate) return;

      const date = new Date(baseDate);
      if (Number.isNaN(date.getTime())) return;

      const bucketDate = new Date(date);
      bucketDate.setMinutes(0, 0, 0);

      const key = bucketDate.toISOString();

      if (!bucket[key]) {
        bucket[key] = {
          key,
          date: bucketDate,
          hour: bucketDate.getHours(),
          count: 0,
        };
      }

      bucket[key].count += 1;
    });

    return Object.values(bucket).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [processedFlights]);

  const currentHourStart = useMemo(() => {
    const d = new Date();
    d.setMinutes(0, 0, 0);
    return d.getTime();
  }, [nowTs]);

  const getRange = (count) => {
    if (count <= 9) return "orangeSoft";
    if (count <= 19) return "orangeMedium";
    if (count <= 29) return "orangeStrong";
    if (count <= 39) return "green";
    return "gold";
  };

  const renderStatus = (status) => {
    if (status === "Expected") return "🟢 On Time";
    if (status === "Delayed") return "🟠 Delayed";
    if (status === "Canceled") return "🔴 Canceled";
    if (status === "landed") return "💜 Landed";
    return status || "—";
  };

  if (loading) {
    return (
      <TableContainer data-theme={mode}>
        <TopBar>
          <ButtonBackSlot
            onClick={goTools}
            label="Herramientas"
            ariaLabel="Volver a herramientas"
          />
        </TopBar>

        <HeaderBlock>
          <Kicker>Herramienta operativa</Kicker>
          <TableTitle>
            ✈️ Llegadas <span>/ Próximas 12 horas</span>
          </TableTitle>
        </HeaderBlock>

        <UpdatePill>⏳ Cargando vuelos…</UpdatePill>
      </TableContainer>
    );
  }

  return (
    <TableContainer data-theme={mode}>
      <TopBar>
        <ButtonBackSlot
          onClick={goTools}
          label="Herramientas"
          ariaLabel="Volver a herramientas"
        />
      </TopBar>

      <HeaderBlock>
        <Kicker>Herramienta operativa</Kicker>
        <TableTitle>
          ✈️ Llegadas <span>/ Próximas 12 horas</span>
        </TableTitle>

        <HourForecastWrap>
          {hourlyForecast.length === 0 ? (
            <HourForecastItem>
              <HourForecastHour>Sin datos</HourForecastHour>
              <HourForecastCount>0 vuelos</HourForecastCount>
            </HourForecastItem>
          ) : (
            hourlyForecast.map((item) => {
              const bucketTs = item.date.getTime();
              const isCurrentHour = bucketTs === currentHourStart;
              const isPastHour = bucketTs < currentHourStart;
              const range = getRange(item.count);
              const label = isPastHour && !isCurrentHour ? "landed" : item.count === 1 ? "vuelo" : "vuelos";

              return (
                <HourForecastItem
                  key={item.key}
                  $isCurrentHour={isCurrentHour}
                  $range={range}
                  $isPastHour={isPastHour}
                >
                  <HourForecastHour $isCurrentHour={isCurrentHour}>
                    {String(item.hour).padStart(2, "0")}:00
                  </HourForecastHour>

                  <HourForecastCount
                    $isCurrentHour={isCurrentHour}
                    $range={range}
                    $isPastHour={isPastHour}
                  >
                    {item.count} {label}
                  </HourForecastCount>
                </HourForecastItem>
              );
            })
          )}
        </HourForecastWrap>
      </HeaderBlock>

      <MetaRow>
        <UpdatePill>
          {stale ? "⚠️ Datos desactualizados · " : "🕒 Última actualización: "}
          {updatedAt
            ? new Date(updatedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—"}
        </UpdatePill>
      </MetaRow>

      {error && <ErrorText>{error}</ErrorText>}

      <TableScroll>
        <Table>
          <thead>
            <tr>
              <th className="hide-flight-mobile">Vuelo</th>
              <th>Aerolínea</th>
              <th>Origen</th>
              <th>Programado</th>
              <th>Estimado</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {processedFlights.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <EmptyState>Sin vuelos en las próximas horas.</EmptyState>
                </td>
              </tr>
            ) : (
              processedFlights.map((flight) => (
                <tr
                  key={flight.id || `${flight.flight_number}-${flight.estimated_arrival}`}
                >
                  <td className="hide-flight-mobile">
                    <FlightCode>{flight.flight_number || "—"}</FlightCode>
                  </td>
                  <td>
                    <AirlineText>{flight.airline || "—"}</AirlineText>
                  </td>
                  <td>
                    <OriginText>{flight.origin_name || "—"}</OriginText>
                  </td>
                  <td>
                    <TimeText>
                      {flight.scheduled_arrival?.slice(11, 16) || "—"}
                    </TimeText>
                  </td>
                  <td>
                    <TimeText>
                      {flight.estimated_arrival?.slice(11, 16) || "—"}
                    </TimeText>
                  </td>
                  <td>
                    <StatusBadge status={flight.display_status}>
                      {renderStatus(flight.display_status)}
                    </StatusBadge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableScroll>
    </TableContainer>
  );
}