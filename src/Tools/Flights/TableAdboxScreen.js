import React, { useMemo } from "react";
import { useAdboxFlights } from "@/Drivers/hooksDrivers/useAdboxFlights";
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
  const { flights = [], loading, updatedAt, error } = useAdboxFlights();
  const { mode } = useThemeMode();
  const { goTools } = useSmartNavigation();

  const getDisplayStatus = (flight) => {
    try {
      const now = new Date();
      const eta = new Date(flight.estimated_arrival);
      const diffMin = (now - eta) / 60000;

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
      .sort(
        (a, b) =>
          new Date(a.estimated_arrival).getTime() -
          new Date(b.estimated_arrival).getTime()
      );
  }, [flights]);

  const hourlyForecast = useMemo(() => {
    const bucket = {};

    processedFlights.forEach((flight) => {
      const baseDate = flight.estimated_arrival || flight.scheduled_arrival;
      if (!baseDate) return;

      const date = new Date(baseDate);
      if (Number.isNaN(date.getTime())) return;

      const hour = date.getHours();
      bucket[hour] = (bucket[hour] || 0) + 1;
    });

    return Object.entries(bucket)
      .map(([hour, count]) => ({
        hour: Number(hour),
        count,
      }))
      .sort((a, b) => a.hour - b.hour);
  }, [processedFlights]);

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
            hourlyForecast.map((item) => (
              <HourForecastItem key={item.hour}>
                <HourForecastHour>
                  Hora {String(item.hour).padStart(2, "0")}
                </HourForecastHour>
                <HourForecastCount>
                  {item.count} {item.count === 1 ? "vuelo" : "vuelos"}
                </HourForecastCount>
              </HourForecastItem>
            ))
          )}
        </HourForecastWrap>
      </HeaderBlock>

      <MetaRow>
        <UpdatePill>
          🕒 Última actualización:{" "}
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
      <tr key={flight.id}>
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
          <TimeText>{flight.scheduled_arrival?.slice(11, 16) || "—"}</TimeText>
        </td>
        <td>
          <TimeText>{flight.estimated_arrival?.slice(11, 16) || "—"}</TimeText>
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