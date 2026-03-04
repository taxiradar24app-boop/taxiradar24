// src/Tools/Flight/TableAdboxScreen.js
// (llegadas programadas — AerodataBox)

import React from "react";
import { useAdboxFlights } from "@/Drivers/hooksDrivers/useAdboxFlights";
import {
  TableContainer,
  TableTitle,
  UpdateText,
  Table,
  StatusBadge,
} from "@/Tools/Flights/TableAdboxStyle";
import BotonBackTools from "@/Drivers/componentsDrivers/BotonBackTools";
import { useThemeMode } from "@/context/ThemeContext";
import { useSmartNavigation } from "@/utils/SmartNavigation";

export default function TableAdboxScreen() {
  const { flights, loading, updatedAt, error } = useAdboxFlights();
  const { mode } = useThemeMode();
  const { goTools } = useSmartNavigation();

  if (loading) return <TableContainer>Cargando vuelos…</TableContainer>;

  // 🧮 Determina estado visual del vuelo
  const getDisplayStatus = (f) => {
    try {
      const now = new Date();
      const eta = new Date(f.estimated_arrival);
      const diffMin = (now - eta) / 60000;

      if (diffMin > 0 && diffMin <= 15) return "landed"; // hasta 15 min después
      if (diffMin > 15) return "expired"; // fuera de rango visible
      return f.status;
    } catch {
      return f.status;
    }
  };

  // ✈️ Ordena y filtra vuelos
  const processedFlights = [...flights]
    .map((f) => ({
      ...f,
      display_status: getDisplayStatus(f),
    }))
    .filter((f) => f.display_status !== "expired")
    .sort(
      (a, b) =>
        new Date(a.estimated_arrival) - new Date(b.estimated_arrival)
    );

  return (
    <TableContainer data-theme={mode}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {/* 🔙 Volver a /tools usando navegación enterprise */}
        <div onClick={goTools} style={{ cursor: "pointer" }}>
          <BotonBackTools to="/tools" title="Volver a herramientas" />
        </div>
      </div>

      <TableTitle>
        ✈️ Llegadas <span>/ Próximas horas</span>
      </TableTitle>

      <UpdateText>
        Última actualización:{" "}
        {new Date(updatedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </UpdateText>

      {error && (
        <p
          style={{
            textAlign: "center",
            color: "#ff9b9b",
            marginBottom: 12,
          }}
        >
          {error}
        </p>
      )}

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
              <td colSpan="6">Sin vuelos en las próximas horas</td>
            </tr>
          ) : (
            processedFlights.map((f) => (
              <tr key={f.id}>
                <td>{f.flight_number}</td>
                <td>{f.airline}</td>
                <td>{f.origin_name}</td>
                <td>{f.scheduled_arrival?.slice(11, 16)}</td>
                <td>{f.estimated_arrival?.slice(11, 16)}</td>
                <td>
                  <StatusBadge status={f.display_status}>
                    {f.display_status === "Expected" && "🟢 On Time"}
                    {f.display_status === "Delayed" && "🟠 Delayed"}
                    {f.display_status === "Canceled" && "🔴 Canceled"}
                    {f.display_status === "landed" && "💜 Landed"}
                    {!["Expected", "Delayed", "Canceled", "landed"].includes(
                      f.display_status
                    ) && f.display_status}
                  </StatusBadge>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
