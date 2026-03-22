// ==================================================
// 🚖 TOOLS LANDING — TaxiRadar24 (versión operativa)
// ==================================================
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PageWrapper,
  HeroSection,
  HeroContent,
  HeroTag,
  HeroTitle,
  HeroSubtitle,
  HeroCTA,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeader,
  SectionTag,
  SectionTitle,
  SectionSubtitle,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureText,
  CTASection,
  CTAHeader,
  CTAButton,
} from "./../Styles/toolsLandingStyles";

import BackHomeButton from "@/components/BackHomeButton";

export default function ToolsLanding() {
  const navigate = useNavigate();

  // 👉 Rutas reales del proyecto
  const goFlights = () => navigate("/tools/flights");
  const goScheduled = () => navigate("/tools/flights/scheduled");
  const goHome = () => navigate("/");

  return (
    <PageWrapper>
      <HeroSection>
        <BackHomeButton />

        <HeroContent>
          <HeroTag>Herramientas para conductores</HeroTag>

          <HeroTitle>¿Dónde hay trabajo ahora mismo?</HeroTitle>

          <HeroSubtitle>
            Consulta vuelos en aproximación, próximas llegadas y puntos de
            movimiento para decidir rápido y posicionarte mejor.
          </HeroSubtitle>

          <HeroCTA>
            <PrimaryButton onClick={goFlights}>
              🟢 Ver vuelos ahora
            </PrimaryButton>

            <SecondaryButton onClick={goScheduled}>
              📅 Programadas Próximas 24hs
            </SecondaryButton>
          </HeroCTA>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionHeader>
          <SectionTag>Acceso rápido</SectionTag>
          <SectionTitle>Elige una herramienta y actúa</SectionTitle>
          <SectionSubtitle>
            Información directa, clara y útil para trabajar sin distracciones.
          </SectionSubtitle>
        </SectionHeader>

        <FeatureGrid>
          <FeatureCard onClick={goFlights} $clickable>
            <FeatureIcon>🛬</FeatureIcon>
            <FeatureTitle>Aeropuerto ahora</FeatureTitle>
            <FeatureText>
              Mira los vuelos que están llegando o aproximándose a Palma.
            </FeatureText>
          </FeatureCard>

          <FeatureCard onClick={goScheduled} $clickable>
            <FeatureIcon>📋</FeatureIcon>
            <FeatureTitle>Próximas llegadas</FeatureTitle>
            <FeatureText>
              Revisa la previsión de vuelos y anticípate a los próximos picos.
            </FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>⚓</FeatureIcon>
            <FeatureTitle>Puerto</FeatureTitle>
            <FeatureText>
              Cruceros y ferries previstos para hoy. Próxima actualización.
            </FeatureText>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🚆</FeatureIcon>
            <FeatureTitle>Estación</FeatureTitle>
            <FeatureText>
              Llegadas clave y movimiento en estaciones centrales. Próxima
              actualización.
            </FeatureText>
          </FeatureCard>
        </FeatureGrid>
      </Section>

      <CTASection>
        <CTAHeader>Entra y consulta la demanda</CTAHeader>
        <CTAButton onClick={goHome}>Entrar en herramientas</CTAButton>
      </CTASection>
    </PageWrapper>
  );
}