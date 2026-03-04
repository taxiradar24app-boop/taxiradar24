import React, { useEffect, useMemo, useState } from "react";
import { useFlights } from "./../hooks/useFlights";
// import {
//   Container,
//   Title,
//   SubTitle,
//   Table,
//   Status,
//   Muted,
//   LastUpdated,
//   TitleWrapper,
// } from "./../Styles/FlightRadarStyle";

import { useThemeMode } from "./../context/ThemeContext";

export default function FlightArrivalsScreen() {
  const { flights, updatedAt, loading, notice } = useFlights();
  const { mode, toggleTheme } = useThemeMode();
  const [ready, setReady] = useState(false);

  function getDisplayStatus(f) {
    if (!f.eta_time) return "landed";
    const eta = new Date(f.eta_time).getTime();
    const now = Date.now();
    return eta < now ? "landed" : "approach";
  }

  const rows = useMemo(() => {
    const enriched = (flights || []).map((f) => ({
      ...f,
      display_status: getDisplayStatus(f),
    }));

    const approaching = enriched
      .filter((f) => f.display_status === "approach")
      .sort((a, b) => new Date(a.eta_time) - new Date(b.eta_time));

    const landed = enriched
      .filter((f) => f.display_status === "landed")
      .sort((a, b) => new Date(b.eta_time) - new Date(a.eta_time));

    return [...approaching, ...landed];
  }, [flights]);

  useEffect(() => {
    if (!loading) setReady(true);
  }, [loading]);

  return (
    <Container>
      <TitleWrapper>
        <Title>✈️ Radar de Llegadas — Palma (PMI)</Title>
        <div style={{ position: "absolute", right: 16 }}>
        </div>
      </TitleWrapper>

      {updatedAt && (
        <LastUpdated>
          Última actualización: {formatTimeFull(new Date(updatedAt))}
          {notice ? <span style={{ marginLeft: 8 }}>{notice}</span> : null}
        </LastUpdated>
      )}

      <SubTitle>
        <span className="label-prefix">Vuelos en </span>
        <span style={{ color: "#f4d35e", fontWeight: 600 }}>Aproximación</span>{" "}
        🟡 /{" "}
        <span style={{ color: "#7bf186", fontWeight: 600 }}>Aterrizados</span>{" "}
        🟢
      </SubTitle>

      {!ready ? (
        <p>Cargando vuelos...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Vuelo</th>
              <th>País</th>
              <th className="hide-mobile">Altitud</th>
              <th className="hide-mobile">Velocidad</th>
              <th>ETA</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f, idx) => (
              <tr key={f.id || `${f.callsign || "UNK"}-${idx}`}>
                <td>{f.callsign || <Muted>—</Muted>}</td>
                <td>{f.origin_country || <Muted>—</Muted>}</td>
                <td className="hide-mobile">
                  {f.display_status === "landed" ? (
                    <Muted>—</Muted>
                  ) : typeof f.alt_m === "number" ? (
                    `${Math.round(f.alt_m)} m`
                  ) : (
                    <Muted>—</Muted>
                  )}
                </td>
                <td className="hide-mobile">
                  {f.display_status === "landed" ? (
                    <Muted>—</Muted>
                  ) : typeof f.vel_kmh === "number" ? (
                    `${Math.round(f.vel_kmh)} km/h`
                  ) : (
                    <Muted>—</Muted>
                  )}
                </td>
                <td>
                  {f.eta_time ? formatTimeShort(new Date(f.eta_time)) : (
                    <Muted>—</Muted>
                  )}
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
                    <Status status={f.display_status}>
                      {f.display_status === "landed" ? (
                        <span>Aterr.</span>
                      ) : (
                        <span>Aprox.</span>
                      )}
                    </Status>
                    {f.display_status === "landed" && getPostLandedIcon(f)}
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
        </Table>
      )}
    </Container>
  );
}

/* 🔧 Helpers */
function formatTimeShort(d) {
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

function formatTimeFull(d) {
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  const dd = d.getDate().toString().padStart(2, "0");
  const MM = (d.getMonth() + 1).toString().padStart(2, "0");
  const yy = d.getFullYear().toString().slice(-2);
  return `${hh}:${mm} ${dd}/${MM}/${yy}`;
}

/* 🧳 Indicadores post-aterrizaje */
// 🎯 Clasificación visual por rango de tiempo
function getPostLandedIcon(f) {
  if (!f.estimated_arrival) return { icon: "", label: "", color: "" };

  const eta = new Date(f.estimated_arrival).getTime();
  const diffMin = (Date.now() - eta) / 60000;

  // 💜 Aterrizados (−15 a −7 min)
  if (diffMin >= -15 && diffMin < -7)
    return { icon: "🛬", label: "Aterriz.", color: "#8b5cf6" };

  // 🟠 Maletas (−7 a 0 min)
  if (diffMin >= -7 && diffMin <= 0)
    return { icon: "🧳", label: "Maletas", color: "#f59e0b" };

  // 🟢 Aproximándose (0 a 30 min)
  if (diffMin > 0 && diffMin <= 30)
    return { icon: "🛫", label: "Aproxi.", color: "#10b981" };

  return { icon: "", label: "", color: "" };
}
