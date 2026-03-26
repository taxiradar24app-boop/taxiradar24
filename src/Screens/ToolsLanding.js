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
  ModuleCTA,
} from "./";

import BackHomeButton from "@/Tools/componentsTools/Buttons/BackHomeButton";

export default function ToolsLanding() {
  const navigate = useNavigate();

  // 👉 Rutas reales del proyecto
  const goFlights = () => navigate("/tools/flights");
  const goScheduled = () => navigate("/tools/flights/scheduled");
  const goHome = () => navigate("/");

  return (
    <PageWrapper>
      <HeroSection>
        <BackHomeButton /> {/* colocar a la derecha */}
        <HeroContent>
          <HeroTag>Herramientas para conductores</HeroTag>
        </HeroContent>
      </HeroSection>

      <Section>

        <FeatureGrid>
          <FeatureCard onClick={goFlights} $clickable>
            <FeatureIcon>🛬</FeatureIcon>
            <FeatureTitle>Aeropuerto ahora</FeatureTitle>
            <FeatureText>
              Mira los vuelos que están llegando o aproximándose a Palma.
            </FeatureText>
            <ModuleCTA>next: 30 minutos →</ModuleCTA>
          </FeatureCard>

          <FeatureCard onClick={goScheduled} $clickable>
            <FeatureIcon>📋</FeatureIcon>
            <FeatureTitle>Próximas llegadas</FeatureTitle>
            <FeatureText>
              Revisa la previsión de vuelos y anticípate a los próximos picos.
            </FeatureText>
            <ModuleCTA>next: 12 horas →</ModuleCTA>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>⚓</FeatureIcon>
            <FeatureTitle>Puerto</FeatureTitle>
            <FeatureText>
              Cruceros y ferries previstos para hoy. Próxima actualización.
            </FeatureText>
            <ModuleCTA>next: 24 horas →</ModuleCTA>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🚆</FeatureIcon>
            <FeatureTitle>Tren Soller</FeatureTitle>
            <ModuleCTA>next: 24 horas →</ModuleCTA>
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
