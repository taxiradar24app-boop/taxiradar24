import React, { useMemo } from "react";
import BackButtonTools from "@/Tools/componentsTools/Buttons/BackButtonTools";

import {
  PageWrapper,
  HeroSection,
  TopBar,
  HeroContent,
  HeroEyebrow,
  HeroTitle,
  HeroSubtitle,
  ContentGrid,
  MainCard,
  SideCard,
  SectionTitle,
  HighlightBox,
  HighlightLabel,
  HighlightTime,
  HighlightMeta,
  ArrivalsList,
  ArrivalRow,
  ArrivalTime,
  ArrivalMeta,
  RouteCard,
  RouteHeader,
  RouteLabel,
  RouteLine,
  RouteStation,
  Arrow,
  TableWrap,
  BoatsTable,
  EmptyText,
} from "./BoatsScreenStyles";

const BOATS_SCHEDULE = [
  {
    company: "Baleària",
    from: "Dénia",
    departure: "17:00",
    arrival: "22:15",
    duration: "5h 15m",
  },
  {
    company: "Baleària",
    from: "Formentera",
    departure: "18:01",
    arrival: "22:15",
    duration: "4h 14m",
  },
  {
    company: "Baleària",
    from: "Ibiza",
    departure: "20:00",
    arrival: "22:15",
    duration: "2h 15m",
  },
  {
    company: "GNV",
    from: "Barcelona",
    departure: "21:30",
    arrival: "06:00",
    duration: "8h 30m",
  },
  {
    company: "Baleària",
    from: "Barcelona",
    departure: "21:30",
    arrival: "04:30",
    duration: "7h",
  },
  {
    company: "Baleària",
    from: "Valencia",
    departure: "21:45",
    arrival: "05:00",
    duration: "7h 15m",
  },
  {
    company: "Trasmed",
    from: "Valencia",
    departure: "22:30",
    arrival: "06:30",
    duration: "8h",
  },
  {
    company: "GNV",
    from: "Valencia",
    departure: "22:30",
    arrival: "06:00",
    duration: "7h 30m",
  },
];

function timeToMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function normalizeArrivalMinutes(arrival, currentMinutes) {
  const arrivalMinutes = timeToMinutes(arrival);
  return arrivalMinutes < currentMinutes
    ? arrivalMinutes + 24 * 60
    : arrivalMinutes;
}

export default function BoatsScreen() {
  const currentMinutes = getCurrentMinutes();

  const arrivalsToPalma = useMemo(() => {
    return [...BOATS_SCHEDULE].sort((a, b) => {
      return (
        normalizeArrivalMinutes(a.arrival, currentMinutes) -
        normalizeArrivalMinutes(b.arrival, currentMinutes)
      );
    });
  }, [currentMinutes]);

  const nextArrival = useMemo(() => {
    return (
      arrivalsToPalma.find(
        (item) =>
          normalizeArrivalMinutes(item.arrival, currentMinutes) >= currentMinutes
      ) || arrivalsToPalma[0]
    );
  }, [arrivalsToPalma, currentMinutes]);

  return (
    <PageWrapper>
      <HeroSection>
        <TopBar>
          <BackButtonTools to="/herramientas" />
        </TopBar>

        <HeroContent>
          <HeroEyebrow>Herramientas para conductores</HeroEyebrow>
          <HeroTitle>Puerto de Palma → Próximas llegadas</HeroTitle>
          <HeroSubtitle>
            Consulta rápida de ferries con llegada a Palma. Vista centrada solo
            en horarios de entrada al puerto.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentGrid>
        <MainCard>
          <SectionTitle>Próximas llegadas a Palma</SectionTitle>

          {nextArrival ? (
            <HighlightBox>
              <div>
                <HighlightLabel>Próxima llegada estimada</HighlightLabel>
                <HighlightTime>{nextArrival.arrival}</HighlightTime>
                <HighlightMeta>
                  {nextArrival.company} · {nextArrival.from} · Salida{" "}
                  {nextArrival.departure} · {nextArrival.duration}
                </HighlightMeta>
              </div>
            </HighlightBox>
          ) : (
            <HighlightBox>
              <div>
                <HighlightLabel>Sin llegadas activas</HighlightLabel>
                <HighlightTime>--:--</HighlightTime>
                <HighlightMeta>
                  No hay datos configurados en este momento.
                </HighlightMeta>
              </div>
            </HighlightBox>
          )}

          <ArrivalsList>
            {arrivalsToPalma.length > 0 ? (
              arrivalsToPalma.map((item) => (
                <ArrivalRow
                  key={`${item.company}-${item.from}-${item.departure}-${item.arrival}`}
                >
                  <ArrivalTime>{item.arrival}</ArrivalTime>

                  <ArrivalMeta>
                    <strong>{item.company}</strong> · {item.from}
                    <br />
                    Sale {item.departure} · {item.duration}
                  </ArrivalMeta>
                </ArrivalRow>
              ))
            ) : (
              <EmptyText>No hay llegadas configuradas a Palma.</EmptyText>
            )}
          </ArrivalsList>
        </MainCard>

        <SideCard>
          <SectionTitle>Resumen operativo</SectionTitle>

          <RouteCard>
            <RouteHeader>
              <RouteLabel>Origen</RouteLabel>
              <RouteLabel>Destino</RouteLabel>
            </RouteHeader>

            <RouteLine>
              <RouteStation>PUERTO ORIGEN</RouteStation>
              <Arrow>→</Arrow>
              <RouteStation>PALMA</RouteStation>
            </RouteLine>

            <TableWrap>
              <BoatsTable>
                <thead>
                  <tr>
                    <th>Compañía</th>
                    <th>Origen</th>
                    <th>Salida</th>
                    <th>Llegada</th>
                    <th>Duración</th>
                  </tr>
                </thead>

                <tbody>
                  {arrivalsToPalma.map((item) => (
                    <tr
                      key={`${item.company}-${item.from}-${item.departure}-${item.arrival}-table`}
                    >
                      <td>{item.company}</td>
                      <td>{item.from}</td>
                      <td>{item.departure}</td>
                      <td>{item.arrival}</td>
                      <td>{item.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </BoatsTable>
            </TableWrap>
          </RouteCard>
        </SideCard>
      </ContentGrid>
    </PageWrapper>
  );
}