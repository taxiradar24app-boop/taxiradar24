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
  CTAInner,
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
  const goTrain = () => navigate("/herramientas/train");
  const goBoats = () => navigate("/herramientas/boats");
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
            <FeatureIcon
              src="/assets/icono/icono_avion_aproximandose.webp"
              alt="Icono aeropuerto"
              $type="airport"
            />
            <FeatureTitle $type="airport">Aeropuerto ahora</FeatureTitle>
            <FeatureText>
              Vuelos llegando y en aproximación a 30 minutos de Palma.
            </FeatureText>

            <ModuleFooter>
              <span />
              <ModuleCTA>Ver: 30 minutos →</ModuleCTA>
            </ModuleFooter>
          </FeatureCard>

          <FeatureCard onClick={goScheduled} $clickable>
            <FeatureIcon
              src="/assets/icono/icono_avion_vuelo.webp"
              alt="Icono próximas llegadas"
              $type="arrivals"
            />
            <FeatureTitle $type="arrivals">Próximas llegadas</FeatureTitle>
            <FeatureText>
              Revisa la previsión de vuelos y anticípate a los próximos picos.
            </FeatureText>

            <ModuleFooter>
              <span />
              <ModuleCTA>Ver: 12 Horas →</ModuleCTA>
            </ModuleFooter>
          </FeatureCard>

          <FeatureCard onClick={goBoats} $clickable>
            <FeatureIcon
              src="/assets/icono/icono_boat_navegando.webp"
              alt="Icono puerto"
              $type="port"
            />
            <FeatureTitle $type="port">Puerto</FeatureTitle>
            <FeatureText>
              Cruceros y ferries previstos para hoy. Próxima actualización.
            </FeatureText>

            <ModuleFooter>
              <span />
              <ModuleCTA>Próximamente →</ModuleCTA>
            </ModuleFooter>
          </FeatureCard>

          <FeatureCard onClick={goTrain} $clickable>
            <FeatureIcon
              src="/assets/icono/icono_tren_viajando.webp"
              alt="Icono tren"
              $type="train"
            />
            <FeatureTitle $type="train">Tren Soller</FeatureTitle>
            <FeatureText>
              Consulta las próximas llegadas del Tren de Sóller a Palma.
            </FeatureText>

            <ModuleFooter>
              <span />
              <ModuleCTA>Ver horarios →</ModuleCTA>
            </ModuleFooter>
          </FeatureCard>
        </FeatureGrid>
      </Section>

      <CTASection>
        <CTAInner>
          <SecondaryButton onClick={goHome}>
            ← Volver al inicio
          </SecondaryButton>

          <FeatureText>@TaxiRadar24.com</FeatureText>
        </CTAInner>
      </CTASection>
    </PageWrapper>
  );
}