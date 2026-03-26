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
  StopsGrid,
  StopColumn,
  StopLabel,
  StopTime,
  EmptyText,
} from "./trainScreenStyle";

const TRAIN_SCHEDULE = [
  {
    departureSoller: "09:00",
    bunyola: "09:25",
    arrivalPalma: "10:00",
  },
  {
    departureSoller: "10:50",
    bunyola: "11:15",
    arrivalPalma: "11:50",
  },
  {
    departureSoller: "12:15",
    bunyola: "12:40",
    arrivalPalma: "13:15",
  },
  {
    departureSoller: "14:00",
    bunyola: "14:25",
    arrivalPalma: "15:00",
  },
  {
    departureSoller: "17:15",
    bunyola: "17:40",
    arrivalPalma: "18:15",
    note: "*",
  },
  {
    departureSoller: "18:00",
    bunyola: "18:25",
    arrivalPalma: "19:00",
  },
  {
    departureSoller: "18:30",
    bunyola: "18:55",
    arrivalPalma: "19:30",
  },
  {
    departureSoller: "19:30",
    bunyola: "19:55",
    arrivalPalma: "20:30",
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

export default function TreinScreen() {
  const currentMinutes = getCurrentMinutes();

  const nextArrival = useMemo(() => {
    return (
      TRAIN_SCHEDULE.find((item) => timeToMinutes(item.arrivalPalma) >= currentMinutes) ||
      null
    );
  }, [currentMinutes]);

  const remainingArrivals = useMemo(() => {
    return TRAIN_SCHEDULE.filter(
      (item) => timeToMinutes(item.arrivalPalma) >= currentMinutes
    );
  }, [currentMinutes]);

  return (
    <PageWrapper>
      <HeroSection>
        <TopBar>
          <BackButtonTools to="/herramientas" />
        </TopBar>

        <HeroContent>
          <HeroEyebrow>Herramientas para conductores</HeroEyebrow>
          <HeroTitle>Tren de Sóller → Llegadas a Palma</HeroTitle>
          <HeroSubtitle>
            Consulta de forma rápida las próximas llegadas del Tren de Sóller a
            Palma, con referencia intermedia en Bunyola.
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
                <HighlightTime>
                  {nextArrival.arrivalPalma}
                  {nextArrival.note ? nextArrival.note : ""}
                </HighlightTime>
                <HighlightMeta>
                  Salida Sóller {nextArrival.departureSoller} · Paso por Bunyola{" "}
                  {nextArrival.bunyola}
                </HighlightMeta>
              </div>
            </HighlightBox>
          ) : (
            <HighlightBox>
              <div>
                <HighlightLabel>Servicio finalizado por hoy</HighlightLabel>
                <HighlightTime>Sin más llegadas hoy</HighlightTime>
                <HighlightMeta>
                  Revisa el primer servicio de mañana para planificarte.
                </HighlightMeta>
              </div>
            </HighlightBox>
          )}

          <ArrivalsList>
            {remainingArrivals.length > 0 ? (
              remainingArrivals.map((item) => (
                <ArrivalRow key={`${item.departureSoller}-${item.arrivalPalma}`}>
                  <ArrivalTime>
                    {item.arrivalPalma}
                    {item.note ? item.note : ""}
                  </ArrivalTime>
                  <ArrivalMeta>
                    Sóller {item.departureSoller} · Bunyola {item.bunyola}
                  </ArrivalMeta>
                </ArrivalRow>
              ))
            ) : (
              <EmptyText>
                No quedan más llegadas disponibles hoy en este horario.
              </EmptyText>
            )}
          </ArrivalsList>
        </MainCard>

        <SideCard>
          <SectionTitle>Ruta operativa</SectionTitle>

          <RouteCard>
            <RouteHeader>
              <RouteLabel>Salida</RouteLabel>
              <RouteLabel>Llegada</RouteLabel>
            </RouteHeader>

            <RouteLine>
              <RouteStation>Sóller</RouteStation>
              <Arrow>→</Arrow>
              <RouteStation>Bunyola</RouteStation>
              <Arrow>→</Arrow>
              <RouteStation>Palma</RouteStation>
            </RouteLine>

            <StopsGrid>
              <StopColumn>
                <StopLabel>Salida Sóller</StopLabel>
                <StopTime>
                  {TRAIN_SCHEDULE.map((item) => (
                    <span key={`s-${item.departureSoller}`}>
                      {item.departureSoller}
                      {item.note ? item.note : ""}
                    </span>
                  ))}
                </StopTime>
              </StopColumn>

              <StopColumn>
                <StopLabel>Paso Bunyola</StopLabel>
                <StopTime>
                  {TRAIN_SCHEDULE.map((item) => (
                    <span key={`b-${item.bunyola}`}>{item.bunyola}</span>
                  ))}
                </StopTime>
              </StopColumn>

              <StopColumn>
                <StopLabel>Llegada Palma</StopLabel>
                <StopTime>
                  {TRAIN_SCHEDULE.map((item) => (
                    <span key={`p-${item.arrivalPalma}`}>
                      {item.arrivalPalma}
                      {item.note ? item.note : ""}
                    </span>
                  ))}
                </StopTime>
              </StopColumn>
            </StopsGrid>
          </RouteCard>
        </SideCard>
      </ContentGrid>

    </PageWrapper>
  );
}