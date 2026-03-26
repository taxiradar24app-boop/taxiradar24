import React from "react";
import { useNavigate } from "react-router-dom";

import {
  PageWrapper,
  HeroSection,
  HeroContent,
  HeroTag,
  Section,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureText,
  CTASection,
  SecondaryButton,
  ModuleCTA,
  ModuleFooter,
  TopBar,
} from "./toolsLandingStyles";

import BackButtonTools from "@/Tools/componentsTools/Buttons/BackButtonTools";

export default function ToolsLanding() {
  const navigate = useNavigate();

  const goFlights = () => navigate("/herramientas/flights");
  const goScheduled = () => navigate("/herramientas/flights/scheduled");
  const goHome = () => navigate("/");

  return (
    <PageWrapper>
      <HeroSection>
        <TopBar>
          <BackButtonTools to="/" />
        </TopBar>

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
              Vuelos llegando y en aproximación a Palma.
            </FeatureText>

            <ModuleFooter>
              <span />
              <ModuleCTA>Ver: 30 minutos →</ModuleCTA>
            </ModuleFooter>
          </FeatureCard>

          <FeatureCard onClick={goScheduled} $clickable>
            <FeatureIcon>📋</FeatureIcon>
            <FeatureTitle>Próximas llegadas</FeatureTitle>
            <FeatureText>
              Revisa la previsión de vuelos y anticípate a los próximos picos.
            </FeatureText>

            <ModuleFooter>
              <span />
              <ModuleCTA>Ver: 12 Horas →</ModuleCTA>
            </ModuleFooter>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>⚓</FeatureIcon>
            <FeatureTitle>Puerto</FeatureTitle>
            <FeatureText>
              Cruceros y ferries previstos para hoy. Próxima actualización.
            </FeatureText>

            <ModuleFooter>
              <span />
              <ModuleCTA>Próximamente →</ModuleCTA>
            </ModuleFooter>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🚆</FeatureIcon>
            <FeatureTitle>Tren Soller</FeatureTitle>
            <FeatureText>
              Llegadas clave y movimiento en estaciones centrales. Próxima
              actualización.
            </FeatureText>

            <ModuleFooter>
              <span />
              <ModuleCTA>Próximamente →</ModuleCTA>
            </ModuleFooter>
          </FeatureCard>
        </FeatureGrid>
      </Section>

      <CTASection>
        <div
          style={{
            display: "grid",
            gap: "0.9rem",
            maxWidth: "520px",
            margin: "0 auto",
          }}
        >
          <SecondaryButton onClick={goHome}>
            ← Volver al inicio
          </SecondaryButton>

          <FeatureText>@TaxiRadar24.com</FeatureText>
        </div>
      </CTASection>
    </PageWrapper>
  );
}