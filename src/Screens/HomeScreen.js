// ======================================================================
// 🏠 HOME SCREEN — Versión Enterprise limpia
// (Solo SmartNavigation, sin lógica manual)
// ======================================================================

import React, { useEffect, useRef } from "react";
import { useSmartNavigation } from "@/utils/SmartNavigation";

import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/Buttons/ButtonsAcademia";

import {
  Container,
  HeroSection,
  HeroContent,
  HeroTag,
  HeroTitle,
  HeroSubtitle,
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
  TestimonialsWrapper,
  TestimonialCard,
  TestimonialQuote,
  TestimonialName,
  TestimonialRole,
  FinalCTASection,
  FinalCTATitle,
  FinalCTAText,
  FadeInSection,
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
      { threshold: 0.2 }
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

  // Animaciones
  const learnRef = useScrollFadeIn();
  const stepsRef = useScrollFadeIn();
  const testimonialsRef = useScrollFadeIn();

  return (
    <Container>
      {/* HERO PRINCIPAL FULL HEIGHT */}
      <HeroSection>
        <HeroContent>
          <HeroTag>Academia online para taxistas de Baleares</HeroTag>

          <HeroTitle>
            Academia TaxiRadar24:
            <br />
            Formación Oficial para
            <br />
            tu Permiso Municipal de Taxista
          </HeroTitle>

          <HeroSubtitle>
            Formación práctica, audios guiados y simuladores de examen diseñados
            por y para taxistas de Palma. Estudia a tu ritmo, desde cualquier
            dispositivo.
          </HeroSubtitle>

          <HeroCTA>
            <PrimaryButton onClick={goAcademy}>
              Entrar a la Academia
            </PrimaryButton>

            <SecondaryButton onClick={goTools}>
              Ver herramientas para taxistas
            </SecondaryButton>
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
            Llega al examen con todo el temario controlado
          </HeroSideTitle>
          <HeroSideText>
            Sigue la ruta de estudio recomendada, escucha los audios, responde
            los test y repasa las preguntas clave que ya han salido en
            convocatorias anteriores.
          </HeroSideText>

          <HeroSideList>
            <HeroSideItem>✔ Audios 1–15 del Reglamento</HeroSideItem>
            <HeroSideItem>✔ Simuladores oficiales de examen</HeroSideItem>
            <HeroSideItem>✔ Ejercicios callejero 10 calles en 10 minutos</HeroSideItem>
            <HeroSideItem>✔ Acceso desde taxi, casa o academia</HeroSideItem>
          </HeroSideList>
        </HeroSideCard>
      </HeroSection>

      {/* LO QUE APRENDERÁS */}
      <FadeInSection ref={learnRef}>
        <Section>
          <SectionHeader>
            <SectionTag>Lo que aprenderás</SectionTag>
            <SectionTitle>
              Todo lo que necesitas para aprobar el permiso municipal de Palma
            </SectionTitle>
            <SectionSubtitle>
              La Academia TaxiRadar24 reúne el Reglamento, el Callejero, los
              exámenes oficiales y ejercicios guiados para que estudies con
              foco en lo que realmente cae en la prueba.
            </SectionSubtitle>
          </SectionHeader>

          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>📘</FeatureIcon>
              <h3>Texto oficial del Reglamento del Taxi, explicado para aprobar.</h3>

              <p>
                Cada artículo en versión oficial y en lenguaje claro de academia, con puntos clave,
                ejemplos reales y preguntas típicas de examen.
                            </p>
                            <p>
                <strong>Aquí no memorizas:</strong> entiendes, practicas y avanzas con seguridad
                hasta tu carnet de taxista.
              </p>

              <PillList>
                <Pill>Art. 1 a 88</Pill>
                <Pill>Resúmenes activos</Pill>
              </PillList>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🎧</FeatureIcon>
              <h3>Audios para estudiar donde quieras</h3>
              <p>
                Escucha las lecciones mientras conduces, entrenas o descansas.
                Tú eliges el momento, la Academia se adapta a tu ritmo.
              </p>
              <p>
                  <strong>Tú marcas el ritmo</strong>, la Academia te acompaña.
              </p>
              <p>
                 <strong>Estudias a tu ritmo,</strong> sin parar tu vida.
              </p>
                <PillList>
                <Pill>Modo audio</Pill>
                <Pill>Repetición ilimitada</Pill>
              </PillList>
            </FeatureCard>

            <FeatureCard>

              <FeatureIcon>📝</FeatureIcon>
              <h3>Simuladores con preguntas reales</h3>

              <p>
                Practica como en el examen: eliges el número de preguntas, trabajas con
                temporizador y revisas los resultados al final. 
                
              </p>
              <p>
                <strong>Cada simulacro se genera </strong>con preguntas reales de exámenes oficiales anteriores.
              </p>
              <p>
                <strong>Te entrenas con mentalidad de examen</strong>, con preguntas reales.
              </p>
              <PillList>
                <Pill>Exámenes</Pill>
                <Pill>Corrección inmediata</Pill>
              </PillList>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🗺️</FeatureIcon>
              <h3>Callejero de Palma</h3>

              <p>
                Ejercicios y mini-retos para dominar planos, cuadrículas y calles clave
                que aparecen en el examen municipal.
              </p>

              <p>
                <strong>El callejero puntúa hasta 10 puntos</strong> y exige precisión total:
                plano, letra y número correctos.
              </p>

              <p>
                <strong>Aprendes a responder en formato oficial</strong>, como en el examen,
                sin perder puntos por errores incompletos.
              </p>

              <PillList>
                <Pill>Planos oficiales</Pill>
                <Pill>Ejercicios 10x10</Pill>
              </PillList>
            </FeatureCard>
          </FeatureGrid>
        </Section>
      </FadeInSection>

      {/* CÓMO FUNCIONA TU RUTA */}
      <FadeInSection ref={stepsRef}>
        <Section background="alt">
          <SectionHeader>
            <SectionTag>Tu camino dentro de la Academia</SectionTag>
            <SectionTitle>Así es la ruta para aprobar con seguridad</SectionTitle>
            <SectionSubtitle>
              La plataforma está pensada para acompañarte desde el primer
              contacto con el temario hasta el día del examen.
            </SectionSubtitle>
          </SectionHeader>

          <StepsWrapper>
            <StepItem>
              <StepNumber>1</StepNumber>
              <StepTitle>Escucha y entiende</StepTitle>
              <StepText>
                Empieza por los audios del Reglamento, capítulo a capítulo.
                Tienes explicaciones claras, ejemplos y resúmenes para fijar las
                ideas clave.
              </StepText>
            </StepItem>

            <StepItem>
              <StepNumber>2</StepNumber>
              <StepTitle>Practica con test reales</StepTitle>
              <StepText>
                Realiza simuladores de exámenes oficiales, detecta tus puntos
                débiles y repasa justo los artículos que más fallas.
              </StepText>
            </StepItem>

            <StepItem>
              <StepNumber>3</StepNumber>
              <StepTitle>Llega preparado al examen</StepTitle>
              <StepText>
                Repasa los bloques finales, afina el Callejero y llega al día de
                la prueba con confianza, sabiendo qué tipo de preguntas te vas a
                encontrar.
              </StepText>
            </StepItem>
          </StepsWrapper>
        </Section>
      </FadeInSection>

      {/* TESTIMONIOS */}
      <FadeInSection ref={testimonialsRef}>
        <Section>
          <SectionHeader>
            <SectionTag>Experiencias de alumnos</SectionTag>
            <SectionTitle>
              Una academia creada con la realidad del taxi en mente
            </SectionTitle>
            <SectionSubtitle>
              Comentarios de personas que, como tú, querían aprobar el permiso
              municipal y contar con una herramienta útil para su trabajo.
            </SectionSubtitle>
          </SectionHeader>

          <TestimonialsWrapper>
            <TestimonialCard>
              <TestimonialQuote>
                “Con los audios pude estudiar mientras trabajaba. Llegué al
                examen con el Reglamento muy fresco.”
              </TestimonialQuote>
              <TestimonialName>María R.</TestimonialName>
              <TestimonialRole>Aspirante a taxista en Palma</TestimonialRole>
            </TestimonialCard>

            <TestimonialCard>
              <TestimonialQuote>
                “Los simuladores con preguntas reales me ayudaron a perder el
                miedo. Muchas cayeron casi iguales.”
              </TestimonialQuote>
              <TestimonialName>Carlos M.</TestimonialName>
              <TestimonialRole>Taxista novel</TestimonialRole>
            </TestimonialCard>

            <TestimonialCard>
              <TestimonialQuote>
                “Me gusta que en una misma web tenga academia y radar de vuelos.
                Es una herramienta completa para el taxi.”
              </TestimonialQuote>
              <TestimonialName>Laura G.</TestimonialName>
              <TestimonialRole>Futura conductora de taxi</TestimonialRole>
            </TestimonialCard>
          </TestimonialsWrapper>
        </Section>
      </FadeInSection>

      {/* CTA FINAL */}
      <FinalCTASection>
        <FinalCTATitle>
          ¿Listo para empezar tu camino en TaxiRadar24?
        </FinalCTATitle>
        <FinalCTAText>
          Crea tu rutina, escucha los audios, practica los test y usa las
          herramientas de radar para vivir el taxi con más seguridad y
          confianza.
        </FinalCTAText>

        <HeroCTA>
          <PrimaryButton onClick={goAcademy}>
            Empezar ahora con la Academia
          </PrimaryButton>

          <SecondaryButton onClick={goTools}>
            Ver herramientas para taxistas
          </SecondaryButton>
        </HeroCTA>
      </FinalCTASection>
    </Container>
  );
}
