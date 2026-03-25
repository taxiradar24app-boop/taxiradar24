// ======================================================================
// 🏠 HOME SCREEN — UX optimizada
// Portal principal del ecosistema TaxiRadar24
// - Mantiene SmartNavigation
// - Reduce repetición de mensaje
// - Refuerza Academia + Herramientas
// ======================================================================

import React, { useEffect, useRef } from "react";
import { useSmartNavigation } from "@/utils/SmartNavigation";

import {
  PrimaryButton,
} from "@/components/Buttons/ButtonsAcademia";
import { ToolsPrimaryButton } from "@/Tools/componentsTools/Buttons/BotonGoTools";

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
  HeroSideBadge,
  HeroSideTitle,
  HeroSideText,
  HeroSideList,
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
  FadeInSection
} from "./../Styles/homeStyles";

/* =========================
   Hook para animación FadeIn
========================= */
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

/* =========================
   HOME SCREEN
========================= */
export default function HomeScreen() {
  const { goAcademy, goTools } = useSmartNavigation();

  const overviewRef = useScrollFadeIn();
  const stepsRef = useScrollFadeIn();
  const testimonialsRef = useScrollFadeIn();

  return (
    <Container>
      {/* HERO PRINCIPAL */}
      <HeroSection>
        <HeroContent>
          <HeroTag>Academia online para taxistas de Baleares</HeroTag>

          <HeroTitle>
            Academia TaxiRadar24:
            <SubTitle>Formación con PDF oficial del reglamento en vigor.</SubTitle>
          </HeroTitle>

          <Title2>Permiso Municipal de Taxista</Title2>

          <HeroSubtitle>
            Estudia con una ruta clara: Reglamento explicado, audios guiados,
            simuladores y callejero de Palma en una sola plataforma, desde móvil o PWA.
          </HeroSubtitle>

          <HeroCTA>
            <PrimaryButton onClick={goAcademy}>
              Entrar a la Academia
            </PrimaryButton>

           
          </HeroCTA>

          <HeroStatsRow>
            <HeroStat>
              <HeroStatNumber>15</HeroStatNumber>
              <HeroStatLabel>audios del Reglamento</HeroStatLabel>
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
          <HeroSideBadge>Próximas convocatorias</HeroSideBadge>

          <HeroSideTitle>
            Una academia pensada para estudiar con foco real
          </HeroSideTitle>

          <HeroSideText>
            Entra, sigue la ruta recomendada y practica con contenido orientado
            al examen municipal de Palma.
          </HeroSideText>

          <HeroSideList>
            <HeroSideItem>✔ Reglamento explicado en lenguaje claro</HeroSideItem>
            <HeroSideItem>✔ Audios para estudiar en cualquier momento</HeroSideItem>
            <HeroSideItem>✔ Simuladores con preguntas reales</HeroSideItem>
            <HeroSideItem>✔ Callejero y práctica oficial de Palma</HeroSideItem>
          </HeroSideList>
        </HeroSideCard>
      </HeroSection>

      {/* HERRAMIENTAS TAXISTAS */}
      <FadeInSection ref={overviewRef}>
        <Section>
        
          {/*  */}
          <SectionHeader>
            
            <SectionTag>TaxiRadar24 para taxistas</SectionTag>
            <SectionTitle>
              👉 Herramientas profesional para taxistas
            </SectionTitle>
            
            {/* <SectionSubtitle>
              Accede a herramientas diseñadas para tu día a día: radar de vuelos,
              información en tiempo real y recursos para trabajar con ventaja.
            </SectionSubtitle> */}
                      
           <ToolsPrimaryButton onClick={goTools}>
              🔧 Herramientas para taxistas
            </ToolsPrimaryButton>
            
          </SectionHeader>

          <FeatureGrid>
 

            <FeatureCard>
              <FeatureIcon>✈️</FeatureIcon>
              <h3>Herramientas para taxistas</h3>
              <p>
                Radar de llegadas y utilidades profesionales para trabajar con
                más contexto y mejor preparación.
              </p>
              <PillList>
                <Pill>Radar vuelos</Pill>
                <Pill>Panel profesional</Pill>
                <Pill>Uso desde móvil</Pill>
              </PillList>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📘</FeatureIcon>
              <h3>Contenido orientado al examen real</h3>
              <p>
                Estudia con bloques pensados para entender qué cae en la prueba
                y cómo responder con seguridad.
              </p>
              <PillList>
                <Pill>Temario guiado</Pill>
                <Pill>Ejemplos</Pill>
                <Pill>Preguntas reales</Pill>
              </PillList>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📱</FeatureIcon>
              <h3>Acceso flexible</h3>
              <p>
                Puedes estudiar y consultar la plataforma desde casa, academia,
                taxi o cualquier dispositivo.
              </p>
              <PillList>
                <Pill>PWA</Pill>
                <Pill>Móvil</Pill>
                <Pill>24/7</Pill>
              </PillList>
            </FeatureCard>
                       <FeatureCard>
              <FeatureIcon>🎓</FeatureIcon>
              <h3>Academia TaxiRadar24</h3>
              <p>
                Preparación guiada para el permiso municipal de taxista con una
                metodología clara y práctica.
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

      {/* TEXTO EXTRA */}
      <FadeInSection ref={stepsRef}>
        <Section background="alt">
          <SectionHeader>
            <SectionTag>Cómo funciona</SectionTag>
            <SectionTitle>Una ruta simple para avanzar con seguridad</SectionTitle>
            <SectionSubtitle>
              TaxiRadar24 está pensado para que entiendas rápido qué hacer
              primero, cómo practicar y cómo continuar después.
            </SectionSubtitle>
          </SectionHeader>

          <StepsWrapper>
            <StepItem>
              <StepNumber>1</StepNumber>
              <StepTitle>Entra y ubica tu camino</StepTitle>
              <StepText>
                Accede a la Academia si te preparas para el examen o entra en
                Herramientas si ya trabajas como taxista.
              </StepText>
            </StepItem>

            <StepItem>
              <StepNumber>2</StepNumber>
              <StepTitle>Estudia o practica con foco</StepTitle>
              <StepText>
                Sigue el contenido principal, escucha audios, haz simuladores y
                entrena el callejero con una estructura clara.
              </StepText>
            </StepItem>

            <StepItem>
              <StepNumber>3</StepNumber>
              <StepTitle>Avanza con continuidad</StepTitle>
              <StepText>
                Mantén una rutina, repasa lo importante y utiliza la plataforma
                como espacio central de preparación y trabajo.
              </StepText>
            </StepItem>
          </StepsWrapper>
        </Section>
      </FadeInSection>

      {/* CTA FINAL */}
      <FinalCTASection>
        <FinalCTATitle>
          Empieza por el camino que necesitas hoy
        </FinalCTATitle>

        <FinalCTAText>
          Accede a la Academia para prepararte para el examen o entra en
          Herramientas si buscas utilidades profesionales para tu trabajo diario.
        </FinalCTAText>

        <HeroCTA>
            <PrimaryButton onClick={goAcademy}>
              Entrar a la Academia
            </PrimaryButton>

           <ToolsPrimaryButton onClick={goTools}>
              🔧 Herramientas para taxistas
            </ToolsPrimaryButton>
        </HeroCTA>
      </FinalCTASection>
    </Container>
  );
}