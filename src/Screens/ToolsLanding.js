// ==================================================
// 🚖 TOOLS LANDING — TaxiRadar24 (versión enterprise)
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
  StepsWrapper,
  StepItem,
  StepNumber,
  StepTitle,
  StepText,
  CTASection,
  CTAHeader,
  CTAButton
} from "./../Styles/toolsLandingStyles";

import BackHomeButton from "@/components/BackHomeButton";

export default function ToolsLanding() {
  const navigate = useNavigate();

  // 👉 Rutas reales del proyecto
  const goFlights = () => navigate("/tools/flights");
  const goScheduled = () => navigate("/tools/flights/scheduled");
  const goLogin = () => navigate("/login"); // solo si añadimos la ruta en navigator
  // const goWorkspace = () => navigate("/workspace"); // futuro

  return (
    <PageWrapper>
      <HeroSection>
        <BackHomeButton />

        <HeroContent>
          <HeroTag>Herramientas Profesionales</HeroTag>

          <HeroTitle>
            Anticípate a la demanda y trabaja con más precisión y seguridad
          </HeroTitle>

          <HeroSubtitle>
            Radar en tiempo real, llegadas programadas, puertos,
            trenes y más herramientas creadas para planificar tu jornada.
          </HeroSubtitle>

          <HeroCTA>
            <PrimaryButton onClick={goFlights}>
              Ver Radar de Vuelos
            </PrimaryButton>

            <SecondaryButton onClick={goScheduled}>
              Llegadas Programadas
            </SecondaryButton>
          </HeroCTA>
        </HeroContent>
      </HeroSection>

      {/* 👇 BENEFICIOS PRINCIPALES */}
      <Section>
        <SectionHeader>
          <SectionTag>Qué puedes hacer</SectionTag>
          <SectionTitle>
            Herramientas diseñadas con el taxi real en mente
          </SectionTitle>
          <SectionSubtitle>
            Funciones para planificar mejor tu día y aprovechar oportunidades.
          </SectionSubtitle>
        </SectionHeader>

        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>🛬</FeatureIcon>
            <h3>Radar aeropuerto</h3>
            <p>
              Llega a la zona de espera en el momento correcto. 
              Visualiza vuelos en aproximación, aterrizados y en ruta a PMI.
            </p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>📋</FeatureIcon>
            <h3>Llegadas programadas</h3>
            <p>
              Consulta vuelos confirmados, retrasos y picos de demanda
              con anticipación.
            </p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>⚓</FeatureIcon>
            <h3>Puerto de Palma</h3>
            <p>
              Próximos cruceros, ferries y horas clave para planificar
              tu jornada (próxima actualización).
            </p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🚆</FeatureIcon>
            <h3>Llegadas de tren</h3>
            <p>
              Información de horarios y demanda en estaciones centrales
              (próxima actualización).
            </p>
          </FeatureCard>
        </FeatureGrid>
      </Section>


      {/* 🧭 CÓMO FUNCIONA */}
      <Section background="alt">
        <SectionHeader>
          <SectionTag>Cómo funciona</SectionTag>
          <SectionTitle>
            Una herramienta simple, precisa y pensada para el día a día
          </SectionTitle>
        </SectionHeader>

        <StepsWrapper>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepTitle>Inicia sesión</StepTitle>
            <StepText>
              Accede a las herramientas exclusivas para profesionales del taxi.
            </StepText>
          </StepItem>

          <StepItem>
            <StepNumber>2</StepNumber>
            <StepTitle>Consulta demanda</StepTitle>
            <StepText>
              Revisa vuelos, cruceros y trenes para anticiparte a los momentos
              de mayor actividad.
            </StepText>
          </StepItem>

          <StepItem>
            <StepNumber>3</StepNumber>
            <StepTitle>Actúa con ventaja</StepTitle>
            <StepText>
              Decide mejor dónde posicionarte para optimizar tu jornada.
            </StepText>
          </StepItem>
        </StepsWrapper>
      </Section>


      {/* CTA FINAL */}
      <CTASection>
        <CTAHeader>
          ¿Listo para trabajar con ventaja?
        </CTAHeader>

        <CTAButton onClick={goLogin}>Entrar en Herramientas</CTAButton>
      </CTASection>
    </PageWrapper>
  );
}
