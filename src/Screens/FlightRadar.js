import React from "react";
import {
  Container, Title, SubTitle, ListContainer, FlightCard, FlightText,
  Bar, Muted, LoadingSpinner
} from "./../Styles/FlightRadarStyle";
import { PrimaryButton } from "./../Styles/Buttons";
import useFlights from "./../hooks/useFlights";

const kmh = (ms) => (ms ? `${(ms * 3.6).toFixed(0)} km/h` : "—");
const m = (v) => (v != null ? `${Math.round(v)} m` : "—");

export default function FlightRadar() {
  const { time, states, loading, error, refetch } = useFlights();

  return (
    <Container>
      <Title>✈️ Radar de Vuelos — Palma (LEPA)</Title>
      <SubTitle>Tráfico en tiempo (casi) real {time ? `(t=${time})` : ""}</SubTitle>

      <Bar>
        <PrimaryButton onClick={refetch} disabled={loading}>
          {loading ? "Actualizando…" : "Actualizar"}
        </PrimaryButton>
        <Muted>{error ? `Error: ${error.message}` : ''}</Muted>
      </Bar>

      {loading && !states.length && <LoadingSpinner />}

      {!loading && !states.length && !error && (
        <Muted>No hay tráfico visible en el área ahora mismo.</Muted>
      )}

      <ListContainer>
        {states.map((f) => (
          <FlightCard key={f.icao24}>
            <FlightText><b>{f.callsign || f.icao24}</b> · {f.country}</FlightText>
            <FlightText>Lat/Lon: {f.lat?.toFixed?.(4)}, {f.lon?.toFixed?.(4)}</FlightText>
            <FlightText>Velocidad: {kmh(f.velocity)} · Altitud: {m(f.geoAltitude)}</FlightText>
            <FlightText>Rumbo: {f.trueTrack != null ? `${Math.round(f.trueTrack)}°` : "—"} · En tierra: {f.onGround ? "Sí" : "No"}</FlightText>
          </FlightCard>
        ))}
      </ListContainer>
    </Container>
  );
}
