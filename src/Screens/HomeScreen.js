import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSmartNavigation } from "@/utils/SmartNavigation";
import { useAuth } from "@/context/AuthContext";

import LoginId, { LoginIdText } from "@/components/Buttons/LoginId";
import { PrimaryButton } from "@/components/Buttons/ButtonsAcademia";
import { ToolsPrimaryButton } from "@/Tools/componentsTools/Buttons/BotonGoTools";
import MobileUserDrawerLite from "@/components/HeaderBox/MobileUserDrawerLite";
import SEOFooterSection from "@/components/Footer/SEOFooterSection";

import {
  Container,
  HeroSection,
  HeroContent,
  HeroTag,
  HeroTitle,
  Title2,
  HeroSubtitle,
  SubTitle,
  HeroCTA,
  HeroStatsRow,
  HeroStat,
  HeroStatNumber,
  HeroStatLabel,
  HeroSideCard,
  HeroSideCardTools,
  HeroSideBadge,
  HeroSideTitle,
  HeroSideText,
  HeroSideList,
  HeroCTAContact,
  HeroSideItem,
  Section,
  SectionHeader,
  SectionTag,
  SectionTitle,
  SectionSubtitle,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  PillList,
  Pill,
  StepsWrapper,
  StepItem,
  StepNumber,
  StepTitle,
  StepText,
  FinalCTASection,
  FinalCTATitle,
  FinalCTAText,
  FadeInSection,
} from "./../Styles/homeStyles";

function useScrollFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const { goAcademy, goTools } = useSmartNavigation();
  const { user, loading } = useAuth();

  const overviewRef = useScrollFadeIn();
  const stepsRef = useScrollFadeIn();
  const testimonialsRef = useScrollFadeIn();

  const goLogin = () => {
    navigate("/login");
  };

  const handleGoTools = () => {
    if (!user) {
      navigate("/login", {
        state: {
          redirectTo: "/herramientas",
          source: "tools_home_cta_gate",
        },
      });
      return;
    }

    goTools();
  };

const handleContact = () => {
  try {
    window.open("https://w.app/taxiradar24", "_blank", "noopener,noreferrer");
  } catch (e) {
    const phone = process.env.REACT_APP_WHATSAPP_PHONE;
    const text = encodeURIComponent("Hola 👋, quiero información.");
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  }
};
  
  return (
    <Container>
      <MobileUserDrawerLite />

      <HeroSection>
        <HeroContent>
<HeroTitle>
  Curso carnet de taxista en Palma de Mallorca
</HeroTitle>
<SubTitle>
  Guía completa para aprobar el examen municipal en 2026
</SubTitle>


<HeroSubtitle>
  Prepárate con simulador real, test oficiales y callejero de Palma.
  Todo lo que necesitas para aprobar a la primera.
</HeroSubtitle>

          <HeroCTA>
            <PrimaryButton onClick={goAcademy}>
              Entrar a la Academia
            </PrimaryButton>
          </HeroCTA>

          {!loading && !user && (
            <HeroCTA>
              <LoginId onClick={goLogin}>
                <LoginIdText>Login / Registro</LoginIdText>
              </LoginId>
            </HeroCTA>
          )}

          <HeroStatsRow>
            <HeroStat>
              <HeroStatNumber>15</HeroStatNumber>
              <HeroStatLabel>audios del reglamento</HeroStatLabel>
            </HeroStat>

            <HeroStat>
              <HeroStatNumber>+600</HeroStatNumber>
              <HeroStatLabel>preguntas de examen</HeroStatLabel>
            </HeroStat>

            <HeroStat>
              <HeroStatNumber>24/7</HeroStatNumber>
              <HeroStatLabel>acceso desde móvil y PWA</HeroStatLabel>
            </HeroStat>
          </HeroStatsRow>
        </HeroContent>

        <HeroSideCard>
          <HeroSideBadge>Próximas convocatorias "Noviembre 2026"</HeroSideBadge>

        <HeroSideTitle>
          ¿Quieres trabajar de taxista en Palma de Mallorca?
        </HeroSideTitle>

        <HeroSideText>
          Te guiamos paso a paso para conseguir el carnet de taxista, superar el
          examen municipal y empezar a trabajar en Palma.
        </HeroSideText>

        <HeroSideList>
          <HeroSideItem>
            ✔ Requisitos para ser taxista en Palma
          </HeroSideItem>
          <HeroSideItem>
            ✔ Cómo es el examen taxi Palma
          </HeroSideItem>
          <HeroSideItem>
            ✔ Precio de la licencia de taxi en Mallorca
          </HeroSideItem>
          <HeroSideItem>
            ✔ Cuánto gana un taxista en Palma
          </HeroSideItem>
        </HeroSideList>

          <HeroCTAContact onClick={handleContact}>
            💬 Resolver dudas por WhatsApp
          </HeroCTAContact>
        </HeroSideCard>
      </HeroSection>

<FadeInSection ref={overviewRef}>
  <Section>
    <HeroSideCardTools>
      <SectionHeader>
        <HeroCTA>
          <SectionTag>TaxiRadar24 para taxistas</SectionTag>
        </HeroCTA>

        <SectionTitle>
          Herramientas para taxistas en Palma de Mallorca
        </SectionTitle>

        <SectionSubtitle>
          Anticípate a la demanda, consulta llegadas al aeropuerto y trabaja con
          información en tiempo real para maximizar cada jornada.
        </SectionSubtitle>

        <HeroCTA>
          <ToolsPrimaryButton onClick={handleGoTools}>
            🔧 Acceder a herramientas
          </ToolsPrimaryButton>
        </HeroCTA>
      </SectionHeader>
    </HeroSideCardTools>

    <FeatureGrid>
      <FeatureCard>
        <FeatureIcon>✈️</FeatureIcon>
        <h3>Llegadas a Palma en tiempo real</h3>
        <p>
          Visualiza los vuelos que llegan a Palma y colócate antes que otros
          conductores en zonas de alta demanda.
        </p>
        <PillList>
          <Pill>Llegadas aeropuerto</Pill>
          <Pill>Radar vuelos</Pill>
          <Pill>Tiempo real</Pill>
        </PillList>
      </FeatureCard>

      <FeatureCard>
        <FeatureIcon>📘</FeatureIcon>
        <h3>Curso para aprobar el examen de taxista</h3>
        <p>
          Aprende exactamente lo que entra en el examen municipal y practica con
          un sistema diseñado para aprobar a la primera.
        </p>
        <PillList>
          <Pill>Examen oficial</Pill>
          <Pill>Temario guiado</Pill>
          <Pill>Preguntas reales</Pill>
        </PillList>
      </FeatureCard>

      <FeatureCard>
        <FeatureIcon>📱</FeatureIcon>
        <h3>Estudia desde el móvil, donde quieras</h3>
        <p>
          Accede desde casa, el taxi o cualquier dispositivo y mantén tu progreso
          activo todos los días sin perder ritmo.
        </p>
        <PillList>
          <Pill>PWA</Pill>
          <Pill>Móvil</Pill>
          <Pill>24/7</Pill>
        </PillList>
      </FeatureCard>

      <FeatureCard>
        <FeatureIcon>🎓</FeatureIcon>
        <h3>Preparación completa para ser taxista en Palma</h3>
        <p>
          Sigue un sistema claro con reglamento, audios, simulador y callejero
          para avanzar con seguridad hasta conseguir tu carnet.
        </p>
        <PillList>
          <Pill>Reglamento</Pill>
          <Pill>Audios</Pill>
          <Pill>Simulador</Pill>
          <Pill>Callejero</Pill>
        </PillList>
      </FeatureCard>
    </FeatureGrid>
  </Section>
</FadeInSection>

<FadeInSection ref={stepsRef}>
  <Section background="alt">
    <SectionHeader>
      <SectionTag>Cómo funciona</SectionTag>

      <SectionTitle>
        Cómo conseguir el carnet de taxista en Palma paso a paso
      </SectionTitle>

      <SectionSubtitle>
        Desde los requisitos hasta aprobar el examen municipal y empezar a trabajar como conductor en Palma de Mallorca.
      </SectionSubtitle>
    </SectionHeader>

    <StepsWrapper>
      <StepItem>
        <StepNumber>1</StepNumber>
        <StepTitle>Requisitos para ser taxista en Palma</StepTitle>
        <StepText>
          Comprueba que cumples con el permiso de conducir, documentación y condiciones necesarias para presentarte al examen municipal.
        </StepText>
      </StepItem>

      <StepItem>
        <StepNumber>2</StepNumber>
        <StepTitle>Prepárate para el examen municipal</StepTitle>
        <StepText>
          Estudia el reglamento, domina el callejero de Palma y practica con test reales y simulador para llegar preparado al examen.
        </StepText>
      </StepItem>

      <StepItem>
        <StepNumber>3</StepNumber>
        <StepTitle>Obtén el carnet y empieza a trabajar</StepTitle>
        <StepText>
          Tras aprobar el examen y entregar la documentación, podrás trabajar como conductor de taxi en Palma sin necesidad de tener licencia propia.
        </StepText>
      </StepItem>
    </StepsWrapper>
  </Section>
</FadeInSection>

      <FinalCTASection ref={testimonialsRef}>
        <FinalCTATitle>
          Empieza hoy a prepararte para obtener el carnet de taxi en Palma
        </FinalCTATitle>

        <FinalCTAText>
          Accede a la academia y sigue una preparación completa para aprobar el
          examen municipal y trabajar como taxista en Mallorca.
        </FinalCTAText>

        <HeroCTA>
          <PrimaryButton onClick={goAcademy}>
            Entrar a la Academia
          </PrimaryButton>

          <ToolsPrimaryButton onClick={handleGoTools}>
            🔧 Herramientas para taxistas
          </ToolsPrimaryButton>
        </HeroCTA>
      </FinalCTASection>

      <SEOFooterSection />
    </Container>
  );
}