// ======================================================================
// 🛠️ TOOLSCREEN — Versión ENTERPRISE con SmartNavigation
// (Diseño intacto, navegación profesional /tools/*)
// ======================================================================

import React from "react";
import {
  Wrapper,
  HeroSection,
  HeroBackground,
  HeroOverlay,
  HeroContent,
  ButtonsRow,
  HeroButtonSecondary,
  BackButtonWrapper,
  SectionInfo,
  InfoTitle,
  InfoGrid,
  InfoCard,
  LegendText,
} from "@/Styles/toolStyle"; // 🎨 estilos reales, intactos

import radarBg from "/assets/taxiRadar24_front-optimized.webp";
import BotonFlightRadar from "@/components/Tools/BotonFlightRadar";

import { useSmartNavigation } from "@/utils/SmartNavigation";

export default function ToolScreen() {
  const {
    goTools,
    goFlights,
    goCruises,
    goTariffs,
  } = useSmartNavigation();

  return (
    <Wrapper>

      {/* =====================================================
          BOTÓN VOLVER
      ====================================================== */}
      <BackButtonWrapper>
        <HeroButtonSecondary onClick={goTools}>
          ⬅️ Volver
        </HeroButtonSecondary>
      </BackButtonWrapper>

      {/* =====================================================
          HERO PRINCIPAL
      ====================================================== */}
      <HeroSection>
        <HeroBackground src={radarBg} alt="Radar background" />
        <HeroOverlay />

        <HeroContent>
          <h1>
            Herramientas del <span>Taxista</span>
          </h1>
          <p>
            Accede a las herramientas profesionales de TaxiRadar24 para{" "}
            <b>mejorar tu jornada</b> y tomar decisiones con información en
            tiempo real.
          </p>
        </HeroContent>
      </HeroSection>

      {/* =====================================================
          BOTONES PRINCIPALES
      ====================================================== */}
      <ButtonsRow>
        <BotonFlightRadar onClick={goFlights} />
      </ButtonsRow>

      {/* =====================================================
          SECCIÓN DE INFORMACIÓN
      ====================================================== */}
      <SectionInfo>
        <InfoTitle>Centro de Herramientas</InfoTitle>

        <InfoGrid>
          <InfoCard onClick={goFlights}>
            <h3>✈️ Radar Aéreo</h3>
            <p>Consulta vuelos llegando a Palma (PMI) en tiempo real.</p>
          </InfoCard>

          <InfoCard onClick={goCruises}>
            <h3>🛳️ Llegadas Marítimas</h3>
            <p>Horarios, estado y previsiones de barcos.</p>
          </InfoCard>

          <InfoCard onClick={goTariffs}>
            <h3>💶 Tarifas Oficiales</h3>
            <p>Suplementos, tarifas vigentes y tabla oficial.</p>
          </InfoCard>
        </InfoGrid>

        <LegendText>
          Esta sección se actualizará pronto con nuevas herramientas para
          taxistas de Palma.
        </LegendText>
      </SectionInfo>
    </Wrapper>
  );
}
