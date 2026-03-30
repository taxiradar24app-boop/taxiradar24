import React, { useMemo } from "react";
import BackButtonTools from "@/Tools/componentsTools/Buttons/BackButtonTools";
import boatsData from "./passengerBoats/currentPassengerBoats.json";

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
    return [...boatsData].sort((a, b) => {
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
                  {nextArrival.company} · {nextArrival.from}
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
                <ArrivalRow key={item.id}>
                  <ArrivalTime>{item.arrival}</ArrivalTime>

                  <ArrivalMeta>
                    <strong>{item.company}</strong> · {item.from}
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
                    <th>Llegada</th>
                  </tr>
                </thead>

                <tbody>
                  {arrivalsToPalma.map((item) => (
                    <tr key={`${item.id}-table`}>
                      <td>{item.company}</td>
                      <td>{item.from}</td>
                      <td>{item.arrival}</td>
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