// src/Screens/FlightRadar.js
import React from 'react';
import { useFlights } from './../hooks/useHookRadar';
import {
  Container,
  Title,
  FlightCard,
  FlightText,
  RefreshButton
} from './../Styles/FlightRadarStyle';

export default function FlightRadar() {
  const { arrival, loading, refetch } = useFlights();

  return (
    <Container>
      <Title>Radar de vuelos</Title>

      {arrival?.hour === 'Error' ? (
        <FlightText>Error al obtener los datos. Intenta más tarde.</FlightText>
      ) : (
        <>
          <FlightText>
            {arrival?.hour}: {arrival?.flights} vuelos detectados
          </FlightText>
          {(arrival?.data || []).map((f, i) => (
            <FlightCard key={i}>
              <FlightText>{f[1] || 'Sin número'} - Altitud: {Math.round(f[13])} m</FlightText>
            </FlightCard>
          ))}
        </>
      )}

      <RefreshButton onClick={refetch} disabled={loading}>
        <FlightText>🔄 Actualizar</FlightText>
      </RefreshButton>
    </Container>
  );
}
