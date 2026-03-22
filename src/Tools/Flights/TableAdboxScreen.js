// src/Tools/Flight/TableAdboxScreen.js
// (llegadas programadas — AerodataBox)

import React from "react";
import { useAdboxFlights } from "@/Drivers/hooksDrivers/useAdboxFlights";
import {
  TableContainer,
  TopBar,
  BackSlot,
  BackIcon,
  BackText,
  HeaderBlock,
  Kicker,
  TableTitle,
  HeaderSubtitle,
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
} from "@/Tools/Flights/TableAdboxStyle";
import { useThemeMode } from "@/context/ThemeContext";
import { useSmartNavigation } from "@/utils/SmartNavigation";

export default function TableAdboxScreen() {
  const { flights, loading, updatedAt, error } = useAdboxFlights();
  const { mode } = useThemeMode();
  const { goTools } = useSmartNavigation();

  if (loading) {
    return (
      <TableContainer data-theme={mode}>
        <TopBar>
          <BackSlot type="button" onClick={goTools} aria-label="Volver a herramientas">
            <BackIcon>←</BackIcon>
            <BackText>Herramientas</BackText>
          </BackSlot>
        </TopBar>

        <HeaderBlock>
          <Kicker>Herramienta operativa</Kicker>
          <TableTitle>
            ✈️ Llegadas <span>/ Próximas horas</span>
          </TableTitle>
          <HeaderSubtitle>
            Cargando previsión de vuelos para ayudarte a anticipar la demanda.
          </HeaderSubtitle>
        </HeaderBlock>

        <UpdatePill>⏳ Cargando vuelos…</UpdatePill>
      </TableContainer>
    );
  }

  const getDisplayStatus = (f) => {
    try {
      const now = new Date();
      const eta = new Date(f.estimated_arrival);
      const diffMin = (now - eta) / 60000;

      if (diffMin > 0 && diffMin <= 15) return "landed";
      if (diffMin > 15) return "expired";
      return f.status;
    } catch {
      return f.status;
    }
  };

  const processedFlights = [...flights]
    .map((f) => ({
      ...f,
      display_status: getDisplayStatus(f),
    }))
    .filter((f) => f.display_status !== "expired")
    .sort(
      (a, b) =>
        new Date(a.estimated_arrival).getTime() -
        new Date(b.estimated_arrival).getTime()
    );

  const renderStatus = (status) => {
    if (status === "Expected") return "🟢 On Time";
    if (status === "Delayed") return "🟠 Delayed";
    if (status === "Canceled") return "🔴 Canceled";
    if (status === "landed") return "💜 Landed";
    return status || "—";
  };

  return (
    <TableContainer data-theme={mode}>
      <TopBar>
        <BackSlot type="button" onClick={goTools} aria-label="Volver a herramientas">
          <BackIcon>←</BackIcon>
          <BackText>Herramientas</BackText>
        </BackSlot>
      </TopBar>

      <HeaderBlock>
        <Kicker>Herramienta operativa</Kicker>
        <TableTitle>
          ✈️ Llegadas <span>/ Próximas 12 horas</span>
        </TableTitle>
        <HeaderSubtitle>
          Revisa la previsión del aeropuerto y detecta con más claridad las
          próximas ventanas de movimiento.
        </HeaderSubtitle>
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
              <th>Vuelo</th>
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
              processedFlights.map((f) => (
                <tr key={f.id}>
                  <td>
                    <FlightCode>{f.flight_number || "—"}</FlightCode>
                  </td>
                  <td>
                    <AirlineText>{f.airline || "—"}</AirlineText>
                  </td>
                  <td>
                    <OriginText>{f.origin_name || "—"}</OriginText>
                  </td>
                  <td>
                    <TimeText>{f.scheduled_arrival?.slice(11, 16) || "—"}</TimeText>
                  </td>
                  <td>
                    <TimeText>{f.estimated_arrival?.slice(11, 16) || "—"}</TimeText>
                  </td>
                  <td>
                    <StatusBadge status={f.display_status}>
                      {renderStatus(f.display_status)}
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