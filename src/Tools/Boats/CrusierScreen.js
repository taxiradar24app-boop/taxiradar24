import React, { useEffect, useMemo, useState } from "react";
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

const MONTH_FILE_MAP = {
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

function getDateTimeValue(date, arrival) {
  return new Date(`${date}T${arrival}:00`).getTime();
}

function formatDateEs(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
  });
}

function demandLevel(count = 0) {
  if (count >= 4) return "high";
  if (count >= 2) return "medium";
  return "low";
}

function demandLabel(level) {
  if (level === "high") return "🔥 Alta demanda";
  if (level === "medium") return "⚠️ Media";
  return "🟢 Baja";
}

export default function CrusierScreen() {
  const [cruisesData, setCruisesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const nowTime = now.getTime();
  const month = now.getMonth() + 1;

  useEffect(() => {
    let isMounted = true;

    async function loadMonthData() {
      setIsLoading(true);

      const availableMonths = Object.keys(MONTH_FILE_MAP).map(Number);

      let selectedMonth = availableMonths.find((m) => m >= month);

      if (!selectedMonth) {
        selectedMonth = availableMonths[0];
      }

      const monthName = MONTH_FILE_MAP[selectedMonth];

      if (!monthName) {
        if (isMounted) {
          setCruisesData([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        const module = await import(`./cruises/cruceros_${monthName}.json`);

        if (isMounted) {
          setCruisesData(module.default || []);
        }
      } catch (error) {
        if (isMounted) {
          setCruisesData([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMonthData();

    return () => {
      isMounted = false;
    };
  }, [month]);

  const sortedCruises = useMemo(() => {
    return [...cruisesData].sort((a, b) => {
      return (
        getDateTimeValue(a.date, a.arrival) -
        getDateTimeValue(b.date, b.arrival)
      );
    });
  }, [cruisesData]);

  const demandByDay = useMemo(() => {
    const map = {};

    sortedCruises.forEach((item) => {
      if (!map[item.date]) {
        map[item.date] = 0;
      }
      map[item.date] += 1;
    });

    return map;
  }, [sortedCruises]);

  const cruisesToday = useMemo(() => {
    return sortedCruises.filter((item) => item.date === today);
  }, [sortedCruises, today]);

  const nextCruiseInMonth = useMemo(() => {
    return (
      sortedCruises.find(
        (item) => getDateTimeValue(item.date, item.arrival) >= nowTime
      ) || sortedCruises[0]
    );
  }, [sortedCruises, nowTime]);

  const hasCruisesToday = cruisesToday.length > 0;
  const featuredCruise = hasCruisesToday ? cruisesToday[0] : nextCruiseInMonth;
  const visibleCruises = hasCruisesToday ? cruisesToday : sortedCruises;

  const featuredDemand = featuredCruise
    ? demandLevel(demandByDay[featuredCruise.date] || 0)
    : "low";

  return (
    <PageWrapper>
      <HeroSection>
        <TopBar>
          <BackButtonTools to="/herramientas" />
        </TopBar>

        <HeroContent>
          <HeroEyebrow>Herramientas para conductores</HeroEyebrow>
          <HeroTitle>Puerto de Palma → Cruceros</HeroTitle>
          <HeroSubtitle>
            Vista inteligente de cruceros con detección automática del siguiente
            movimiento del mes.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentGrid>
        <MainCard>
          <SectionTitle>
            {hasCruisesToday ? "Cruceros de hoy" : "Próximo crucero del mes"}
          </SectionTitle>

          {isLoading ? (
            <HighlightBox>
              <div>
                <HighlightLabel>Cargando datos</HighlightLabel>
                <HighlightTime>...</HighlightTime>
                <HighlightMeta>
                  Preparando cruceros del mes actual.
                </HighlightMeta>
              </div>
            </HighlightBox>
          ) : featuredCruise ? (
            <HighlightBox>
              <div>
                <HighlightLabel>
                  {hasCruisesToday
                    ? "Próximo crucero de hoy"
                    : "Siguiente crucero programado"}
                </HighlightLabel>

                <HighlightTime>{featuredCruise.arrival}</HighlightTime>

                <HighlightMeta>
                  {formatDateEs(featuredCruise.date)} ·{" "}
                  <strong>{featuredCruise.ship}</strong> ·{" "}
                  {featuredCruise.company} · {demandLabel(featuredDemand)}
                </HighlightMeta>
              </div>
            </HighlightBox>
          ) : (
            <HighlightBox>
              <div>
                <HighlightLabel>Sin datos</HighlightLabel>
                <HighlightTime>--:--</HighlightTime>
                <HighlightMeta>No hay cruceros en este mes.</HighlightMeta>
              </div>
            </HighlightBox>
          )}

          <ArrivalsList>
            {isLoading ? null : visibleCruises.length > 0 ? (
              visibleCruises.map((item) => {
                const itemDemand = demandLevel(demandByDay[item.date] || 0);

                return (
                  <ArrivalRow key={item.id}>
                    <ArrivalTime>{item.arrival}</ArrivalTime>

                    <ArrivalMeta>
                      <strong>{item.ship}</strong> · {item.company}
                      <br />
                      {formatDateEs(item.date)} · {demandLabel(itemDemand)}
                    </ArrivalMeta>
                  </ArrivalRow>
                );
              })
            ) : (
              <EmptyText>No hay cruceros disponibles en este mes.</EmptyText>
            )}
          </ArrivalsList>
        </MainCard>

        <SideCard>
          <SectionTitle>Resumen</SectionTitle>

          <RouteCard>
            <RouteHeader>
              <RouteLabel>Tipo</RouteLabel>
              <RouteLabel>Destino</RouteLabel>
            </RouteHeader>

            <RouteLine>
              <RouteStation>CRUCEROS</RouteStation>
              <Arrow>→</Arrow>
              <RouteStation>PALMA</RouteStation>
            </RouteLine>

            <TableWrap>
              <BoatsTable>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Barco</th>
                    <th>Llegada</th>
                  </tr>
                </thead>

                <tbody>
                  {!isLoading &&
                    visibleCruises.map((item) => (
                      <tr key={item.id}>
                        <td>{formatDateEs(item.date)}</td>
                        <td>{item.ship}</td>
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