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
  PlanSection,
  PlanGrid,
  PlanCard,
  PlanPrice,
  PlanTitle,
  PlanList,
  PlanItem,
  CTASection,
  CTAHeader,
  GuaranteeBox,
  GuaranteeTitle,
  GuaranteeText,
} from "./academiaShopStyles";

import {
  PrimaryButton,
  SecondaryButton,
  CardButton,
} from "@/components/Buttons/ButtonsAcademia";

import { useSmartNavigation } from "@/utils/SmartNavigation";

export default function AcademiaShop() {
  const { goAcademyPro, goDemo } = useSmartNavigation();

  return (
    <PageWrapper>

      {/* =====================================================
          HERO PRINCIPAL
      ====================================================== */}

      <HeroSection>
        <HeroContent>

          <HeroTag>Academia TaxiRadar24</HeroTag>

          <HeroTitle>
            La plataforma para preparar el{" "}
            <span>Permiso Municipal de Taxista</span>
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
          PLANES
      ====================================================== */}

      <PlanSection>

        <SectionHeader>

          <SectionTag>Planes de estudio</SectionTag>

          <SectionTitle>
            Empieza gratis o accede a la formación completa
          </SectionTitle>

          <SectionSubtitle>
            Puedes probar primero la versión DEMO o entrar
            directamente en la Academia PRO.
          </SectionSubtitle>

        </SectionHeader>

        <PlanGrid>

          {/* DEMO */}

          <PlanCard>

            <PlanTitle>DEMO</PlanTitle>

            <PlanPrice>0€</PlanPrice>

            <PlanList>
              <PlanItem>• Audios 1 y 2</PlanItem>
              <PlanItem>• 1 simulador de examen</PlanItem>
              <PlanItem>• Ejercicios básicos de callejero</PlanItem>
              <PlanItem>• Acceso inmediato</PlanItem>
            </PlanList>

            <CardButton onClick={goDemo}>
              Entrar a DEMO
            </CardButton>

          </PlanCard>


          {/* PRO MENSUAL */}

          <PlanCard pro>

            <PlanTitle>PRO</PlanTitle>

            <PlanPrice>9,99€ / mes</PlanPrice>

            <PlanList>
              <PlanItem>✔ Audios 1–15 completos</PlanItem>
              <PlanItem>✔ Simuladores ilimitados</PlanItem>
              <PlanItem>✔ Callejero completo</PlanItem>
              <PlanItem>✔ Seguimiento de progreso</PlanItem>
              <PlanItem>✔ Acceso 24/7 desde móvil o PWA</PlanItem>
            </PlanList>

            <SecondaryButton onClick={goAcademyPro}>
              Acceder
            </SecondaryButton>

          </PlanCard>


          {/* PRO 3 MESES */}

          <PlanCard pro>

            <PlanTitle>PRO 3 meses</PlanTitle>

            <PlanPrice>24,99€</PlanPrice>

            <PlanList>
              <PlanItem>✔ Contenido completo</PlanItem>
              <PlanItem>✔ Ahorra 20%</PlanItem>
            </PlanList>

            <PrimaryButton onClick={goAcademyPro}>
              Comprar
            </PrimaryButton>

          </PlanCard>


          {/* PRO 6 MESES */}

          <PlanCard pro>

            <PlanTitle>PRO 6 meses</PlanTitle>

            <PlanPrice>39,99€</PlanPrice>

            <PlanList>
              <PlanItem>✔ Contenido completo</PlanItem>
              <PlanItem>✔ Ahorra 33%</PlanItem>
            </PlanList>

            <PrimaryButton onClick={goAcademyPro}>
              Comprar
            </PrimaryButton>

          </PlanCard>

        </PlanGrid>

      </PlanSection>


      {/* =====================================================
          GARANTÍA
      ====================================================== */}

      <GuaranteeBox>

        <GuaranteeTitle>
          Garantía TaxiRadar24
        </GuaranteeTitle>

        <GuaranteeText>
          Si completas los audios, realizas simuladores
          y practicas el callejero, llegarás al examen
          con una preparación sólida.
        </GuaranteeText>

      </GuaranteeBox>


      {/* =====================================================
          CTA FINAL
      ====================================================== */}

      <CTASection>

        <CTAHeader>
          Empieza hoy tu preparación
        </CTAHeader>

        <SecondaryButton onClick={goAcademyPro}>
          Entrar a la Academia PRO
        </SecondaryButton>

      </CTASection>

    </PageWrapper>
  );
}