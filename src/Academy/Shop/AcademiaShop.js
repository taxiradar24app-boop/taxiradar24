// ======================================================================
// 🎓 ACADEMIA SHOP — UX optimizada
// Respeta SmartNavigation, rutas y arquitectura existente
// ======================================================================

import React from "react";
import {
  PageWrapper,
  HeroSection,
  HeroContent,
  HeroTag,
  HeroTitle,
  HeroSubtitle,
  HeroCTA,
  FeaturesSection,
  SectionHeader,
  SectionTag,
  SectionTitle,
  SectionSubtitle,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  CTASection,
  CTAHeader,
  GuaranteeBox,
  GuaranteeTitle,
  GuaranteeText,
} from "./academiaShopStyles";

import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/Buttons/ButtonsAcademia";

import { useSmartNavigation } from "@/utils/SmartNavigation";

export default function AcademiaShop() {
  const { goAcademyPro, goDemo ,goHome } = useSmartNavigation();

  return (
    <PageWrapper>
      {/* =====================================================
          HERO PRINCIPAL
      ====================================================== */}

      <HeroSection>
        <HeroContent>
          <HeroTag>Academia TaxiRadar24</HeroTag>

          <HeroTitle>
            La plataforma para preparar{" "}
            <span>el permiso municipal de Taxista</span>
          </HeroTitle>

          <HeroSubtitle>
            Estudia con un sistema claro: reglamento explicado,
            audios guiados, simuladores reales y ejercicios
            de callejero de Palma.
          </HeroSubtitle>

          <HeroCTA>
            <PrimaryButton onClick={goDemo}>
              Probar DEMO Gratis
            </PrimaryButton>

            <SecondaryButton onClick={goAcademyPro}>
              Acceder a versión PRO
            </SecondaryButton>
          </HeroCTA>
        </HeroContent>
      </HeroSection>

      {/* =====================================================
          QUÉ INCLUYE LA ACADEMIA
      ====================================================== */}

      <FeaturesSection>
        <SectionHeader>
          <SectionTag>Contenido de la Academia</SectionTag>

          <SectionTitle>
            Todo lo necesario para preparar el examen municipal
          </SectionTitle>

          <SectionSubtitle>
            El contenido está organizado para que avances paso a paso
            con lo que realmente aparece en la prueba.
          </SectionSubtitle>
        </SectionHeader>

        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>📘</FeatureIcon>

            <h3>Reglamento completo</h3>

            <p>
              Artículos explicados en lenguaje claro con ejemplos
              aplicados al trabajo real del taxi.
            </p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🎧</FeatureIcon>

            <h3>Audios del Reglamento</h3>

            <p>
              Escucha la explicación de los artículos importantes
              mientras conduces o estudias.
            </p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>📝</FeatureIcon>

            <h3>Simuladores de examen</h3>

            <p>
              Practica con preguntas reales y revisa tus resultados
              inmediatamente.
            </p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🗺️</FeatureIcon>

            <h3>Callejero de Palma</h3>

            <p>
              Ejercicios de memoria, zonas clave y práctica
              para el bloque más exigente del examen.
            </p>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      {/* =====================================================
          GARANTÍA
      ====================================================== */}

      <GuaranteeBox>
        <CTAHeader>
          Empieza hoy tu preparación
        </CTAHeader>

        <GuaranteeText>
          Si completas los audios, realizas simuladores
          y practicas el callejero, llegarás al examen
          con una preparación sólida.
        </GuaranteeText>

         <SecondaryButton onClick={goHome}>
           ← Volver al inicio
        </SecondaryButton>

         <GuaranteeTitle>
          Garantía TaxiRadar24
        </GuaranteeTitle>

      </GuaranteeBox>

      {/* =====================================================
          CTA FINAL
      ====================================================== */}

      <CTASection>
        

      </CTASection>
    </PageWrapper>
  );
}