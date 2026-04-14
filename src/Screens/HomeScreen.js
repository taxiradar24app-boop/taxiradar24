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
    navigate("/contacto");
  };

  return (
    <Container>
      <MobileUserDrawerLite />

      <HeroSection>
        <HeroContent>
          <HeroTag>Curso para ser taxista en Palma de Mallorca</HeroTag>

          <HeroTitle>
            Cómo obtener la licencia de taxi en Palma de Mallorca
            <SubTitle>
              Prepárate para el examen municipal y empieza a trabajar como
              taxista.
            </SubTitle>
          </HeroTitle>

          <Title2>Academia especializada en licencia taxi Palma</Title2>

          <HeroSubtitle>
            Aprende los requisitos para ser taxista en Palma, estudia el
            reglamento oficial, practica con simuladores reales y prepárate
            para aprobar el examen municipal con una metodología clara y
            directa.
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
            ¿Quieres sacarte la licencia de taxi en Palma?
          </HeroSideTitle>

          <HeroSideText>
            Te ayudamos paso a paso a entender el proceso, preparar el examen y
            empezar a trabajar como taxista en Palma de Mallorca.
          </HeroSideText>

          <HeroSideList>
            <HeroSideItem>
              ✔ Requisitos para obtener la licencia de taxi
            </HeroSideItem>
            <HeroSideItem>
              ✔ Cómo es el examen municipal de Palma
            </HeroSideItem>
            <HeroSideItem>
              ✔ Cuánto cuesta la licencia de taxi
            </HeroSideItem>
            <HeroSideItem>
              ✔ Cuánto gana un taxista en Palma
            </HeroSideItem>
          </HeroSideList>

          <HeroCTAContact onClick={handleContact}>
            💬 Resolver dudas ahora
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
                Consulta llegadas al aeropuerto, planifica mejor tu jornada y
                trabaja con información en tiempo real.
              </SectionSubtitle>

              <HeroCTA>
                <ToolsPrimaryButton onClick={handleGoTools}>
                  🔧 Herramientas para taxistas
                </ToolsPrimaryButton>
              </HeroCTA>
            </SectionHeader>
          </HeroSideCardTools>

          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>✈️</FeatureIcon>
              <h3>Llegadas aeropuerto Palma en tiempo real</h3>
              <p>
                Consulta vuelos que llegan a Palma y anticípate a la demanda de
                clientes en aeropuerto.
              </p>
              <PillList>
                <Pill>Llegadas Palma</Pill>
                <Pill>Radar vuelos</Pill>
                <Pill>Uso desde móvil</Pill>
              </PillList>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📘</FeatureIcon>
              <h3>Curso orientado al examen municipal</h3>
              <p>
                Estudia el reglamento, entiende qué entra en la prueba y
                practica con una preparación pensada para aprobar.
              </p>
              <PillList>
                <Pill>Temario guiado</Pill>
                <Pill>Examen municipal</Pill>
                <Pill>Preguntas reales</Pill>
              </PillList>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📱</FeatureIcon>
              <h3>Estudia desde móvil o PWA</h3>
              <p>
                Accede a la academia desde casa, el taxi o cualquier dispositivo
                y mantén tu preparación activa cada día.
              </p>
              <PillList>
                <Pill>PWA</Pill>
                <Pill>Móvil</Pill>
                <Pill>24/7</Pill>
              </PillList>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🎓</FeatureIcon>
              <h3>Preparación para licencia taxi Palma</h3>
              <p>
                Sigue una ruta clara con reglamento, audios, simuladores y
                callejero para avanzar con seguridad hacia tu objetivo.
              </p>
              <PillList>
                <Pill>Reglamento</Pill>
                <Pill>Audios</Pill>
                <Pill>Simuladores</Pill>
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
              Cómo sacarte la licencia de taxi en Palma paso a paso
            </SectionTitle>
            <SectionSubtitle>
              Sigue una ruta clara para entender el examen municipal, estudiar
              el contenido y prepararte para trabajar como taxista.
            </SectionSubtitle>
          </SectionHeader>

          <StepsWrapper>
            <StepItem>
              <StepNumber>1</StepNumber>
              <StepTitle>Infórmate sobre la licencia</StepTitle>
              <StepText>
                Descubre los requisitos para ser taxista en Palma y cómo
                funciona el proceso municipal.
              </StepText>
            </StepItem>

            <StepItem>
              <StepNumber>2</StepNumber>
              <StepTitle>Prepárate para el examen</StepTitle>
              <StepText>
                Estudia el reglamento, practica con simuladores y entrena con
                preguntas reales.
              </StepText>
            </StepItem>

            <StepItem>
              <StepNumber>3</StepNumber>
              <StepTitle>Empieza a trabajar</StepTitle>
              <StepText>
                Una vez aprobado el examen, estarás listo para trabajar como
                taxista en Palma de Mallorca.
              </StepText>
            </StepItem>
          </StepsWrapper>
        </Section>
      </FadeInSection>

      <FinalCTASection ref={testimonialsRef}>
        <FinalCTATitle>
          Empieza hoy a prepararte para la licencia de taxi en Palma
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