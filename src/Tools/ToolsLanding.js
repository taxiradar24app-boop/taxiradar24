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
  const goCruisers = () => navigate("/herramientas/cruises");
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
            alt="Icono ferries"
            $type="port"
          />
          <FeatureTitle $type="port">Ferries</FeatureTitle>
          <FeatureText>
            Consulta rápida de ferries con llegada a Palma y horarios de entrada al puerto.
          </FeatureText>

          <ModuleFooter>
            <span />
            <ModuleCTA>Ver ferries →</ModuleCTA>
          </ModuleFooter>
        </FeatureCard>

        <FeatureCard onClick={goCruisers} $clickable>
          <FeatureIcon
            src="/assets/icono/icono_boat_navegando.webp"
            alt="Icono cruceros"
            $type="port"
          />
          <FeatureTitle $type="port">Cruceros</FeatureTitle>
          <FeatureText>
            Consulta los cruceros previstos en Palma y detecta los horarios de mayor movimiento.
          </FeatureText>

          <ModuleFooter>
            <span />
            <ModuleCTA>Ver cruceros →</ModuleCTA>
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