import React, { lazy, Suspense } from "react";
import {
  PageWrapper,
  PageFrame,
  IntroSection,
  IntroBadge,
  IntroTitle,
  IntroSubtitle,
  IntroStepsBox,
  IntroStepsTitle,
  IntroStepsList,
  IntroStepItem,
  StepNumber,
  BenefitText,
  MapWrapper,
  ContentGrid,
  ListColumn,
  SidebarColumn,
  SectionTitle,
  DirectionsList,
  DirectionItem,
  SidebarTitle,
  SidebarItem,
} from "./ViasPrincipalesStyle";
import useViasMap from "./hooks/useViasMap";
import { getCategoryData } from "./utils/mapHelpers";

const MapView = lazy(() => import("./components/MapView"));

const CATEGORIES = [
  { id: "oficiales", label: "Centros oficiales" },
  { id: "culturales", label: "Centros culturales" },
  { id: "salud", label: "Centros de salud" },
  { id: "educativos", label: "Centros educativos" },
  { id: "hoteles", label: "Hoteles" },
  { id: "deportivos", label: "Centros deportivos" },
  { id: "hosteleria", label: "Hostelería" },
  { id: "monumentos", label: "Monumentos y lugares clave" },
];

const ViasPrincipalesScreen = () => {
  const {
    activeCategory,
    setActiveCategory,
    activeItem,
    mapCenter,
    mapZoom,
    focusOnItem,
  } = useViasMap();

  const data = getCategoryData(activeCategory);

  return (
    <PageWrapper>
      <PageFrame>
        <IntroSection>
          <IntroBadge>Mapa interactivo de estudio</IntroBadge>

          <IntroTitle>Domina los puntos clave de Palma en el mapa</IntroTitle>

          <IntroSubtitle>
            Aprende a ubicar centros oficiales, hospitales, hoteles y zonas
            importantes como te lo pedirán en el examen del permiso municipal.
          </IntroSubtitle>

          <IntroStepsBox>
            <IntroStepsTitle>Cómo funciona</IntroStepsTitle>

            <IntroStepsList>
              <IntroStepItem>
                <StepNumber>1</StepNumber>
                <span>Selecciona una categoría en el panel derecho</span>
              </IntroStepItem>

              <IntroStepItem>
                <StepNumber>2</StepNumber>
                <span>Explora los puntos directamente en el mapa</span>
              </IntroStepItem>

              <IntroStepItem>
                <StepNumber>3</StepNumber>
                <span>
                  Haz clic en cualquier lugar para centrarlo y memorizar su
                  ubicación
                </span>
              </IntroStepItem>
            </IntroStepsList>
          </IntroStepsBox>

          <BenefitText>
            Este entrenamiento te ayudará a responder preguntas reales del
            examen y a orientarte rápidamente en la ciudad como un taxista
            profesional.
          </BenefitText>
        </IntroSection>

        <MapWrapper>
          <Suspense fallback={<div style={{ color: "#fff" }}>Cargando mapa…</div>}>
            <MapView
              center={mapCenter}
              zoom={mapZoom}
              category={activeCategory}
              activeItem={activeItem}
              onMarkerClick={focusOnItem}
            />
          </Suspense>
        </MapWrapper>

        <ContentGrid>
          <ListColumn>
            <SectionTitle>
              {CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </SectionTitle>

            <DirectionsList>
              {data.map((item) => (
                <DirectionItem
                  key={item.id}
                  onClick={() => focusOnItem(item, activeCategory)}
                >
                  {item.label}
                </DirectionItem>
              ))}
            </DirectionsList>
          </ListColumn>

          <SidebarColumn>
            <SidebarTitle>Contenidos</SidebarTitle>

            {CATEGORIES.map((cat) => (
              <SidebarItem
                key={cat.id}
                $active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </SidebarItem>
            ))}
          </SidebarColumn>
        </ContentGrid>
      </PageFrame>
    </PageWrapper>
  );
};

export default ViasPrincipalesScreen;