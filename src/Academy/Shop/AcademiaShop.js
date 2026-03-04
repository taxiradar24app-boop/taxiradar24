// ======================================================================
// 🎓 ACADEMIA SHOP — Versión Enterprise con SmartNavigation
// (navegación centralizada, diseño intacto)
// ======================================================================

import React from "react";
import { HeadphonesIcon } from "@/components/icons";
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
} from "./academiaShopStyles"; // estilos intactos

import {
  PrimaryButton,
  SecondaryButton,
  CardButton,
} from "@/components/Buttons/ButtonsAcademia";

import { useSmartNavigation } from "@/utils/SmartNavigation";

export default function AcademiaShop() {
  const {
    goAcademyPro,
    goDemo,
    goUpgrade,
  } = useSmartNavigation();
  

  return (
    <PageWrapper>

      {/* =====================================================
          HERO PRINCIPAL
      ====================================================== */}
      <HeroSection>
        <HeroContent>
          <HeroTag>Academia Online de TaxiRadar24</HeroTag>

          <HeroTitle>
            Prepárate para el Permiso Municipal de Taxista  
            <br />  
            con un método claro y práctico
          </HeroTitle>

          <HeroSubtitle>
            Audios guiados, simuladores reales, ejercicios de Callejero  
            y todo el Reglamento explicado paso a paso.  
            Estudia desde tu móvil o computadora, descargarte de la App/PWA.
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
          SECCIÓN QUÉ INCLUYE
      ====================================================== */}
      <FeaturesSection>
        <SectionHeader>
          <SectionTag>Qué incluye</SectionTag>
          <SectionTitle>
            La formación más completa para aprobar el examen municipal
          </SectionTitle>
          <SectionSubtitle>
            Diseñada con el contenido que realmente aparece en la prueba.
          </SectionSubtitle>
        </SectionHeader>

        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>📘</FeatureIcon>
            <h3>Reglamento completo</h3>
            <p>Artículos 1-88 explicados con ejemplos y resúmenes aplicados.</p>
          </FeatureCard>

          <FeatureCard>
             <FeatureIcon>🎧</FeatureIcon>
            <h3>Audios 1–15 del Reglamento</h3>
            <p>Explicación clara y guiada de todos los artículos importantes.</p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>📝</FeatureIcon>
            <h3>Simuladores con preguntas reales</h3>
            <p>Test por convocatoria, revisión inmediata y estadísticas.</p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🗺️</FeatureIcon>
            <h3>Callejero de Palma</h3>
            <p>Ejercicios de memoria, mapas 10x10 y zonas clave del examen.</p>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      {/* =====================================================
          PLANES
      ====================================================== */}
      <PlanSection>
        <SectionHeader>
          <SectionTag>Planes</SectionTag>
          <SectionTitle>Elige cómo quieres estudiar</SectionTitle>
          <SectionSubtitle>
            La versión DEMO es gratis y la PRO incluye todo.
          </SectionSubtitle>
        </SectionHeader>

        <PlanGrid>
          {/* PLAN DEMO */}
          <PlanCard>
            <PlanTitle>DEMO</PlanTitle>
            <PlanPrice>0€</PlanPrice>

            <PlanList>
              <PlanItem>• Audios 1 y 2</PlanItem>
              <PlanItem>• 1 simulador de examen</PlanItem>
              <PlanItem>• 10 ejercicios de callejero</PlanItem>
              <PlanItem>• Sin registro obligatorio</PlanItem>
            </PlanList>

            <CardButton onClick={goDemo}>Entrar a DEMO</CardButton>
          </PlanCard>

          {/* PLAN PRO */}
          <PlanCard pro>
            <PlanTitle>PRO</PlanTitle>
            <PlanPrice>9,99€ / mes</PlanPrice>

            <PlanList>
              <PlanItem>✔ Audios 1–15 completos</PlanItem>
              <PlanItem>✔ Simuladores ilimitados</PlanItem>
              <PlanItem>✔ Callejero completo</PlanItem>
              <PlanItem>✔ Estadísticas y progreso</PlanItem>
              <PlanItem>✔ Acceso 24/7 desde móvil y PWA</PlanItem>
            </PlanList>

            <SecondaryButton onClick={goAcademyPro}>Acceder</SecondaryButton>
          </PlanCard>

          {/* PLAN 3 MESES */}
          <PlanCard pro>
            <PlanTitle>PRO 3 meses</PlanTitle>
            <PlanPrice>24,99€</PlanPrice>

            <PlanList>
              <PlanItem>✔ Contenido completo</PlanItem>
              <PlanItem>✔ Ahorra 20%</PlanItem>
            </PlanList>

            <PrimaryButton onClick={goAcademyPro}>Comprar</PrimaryButton>
          </PlanCard>

          {/* PLAN 6 MESES */}
          <PlanCard pro>
            <PlanTitle>PRO 6 meses</PlanTitle>
            <PlanPrice>39,99€</PlanPrice>

            <PlanList>
              <PlanItem>✔ Contenido completo</PlanItem>
              <PlanItem>✔ Ahorra 33%</PlanItem>
            </PlanList>

            <PrimaryButton onClick={goAcademyPro}>Comprar</PrimaryButton>
          </PlanCard>
        </PlanGrid>
      </PlanSection>

      {/* =====================================================
          GARANTÍA
      ====================================================== */}
      <GuaranteeBox>
        <GuaranteeTitle>Garantía TaxiRadar24</GuaranteeTitle>
        <GuaranteeText>
          Si estudias con nuestros audios, realizas los simuladores y completas
          los ejercicios, llegarás al examen con seguridad real.
        </GuaranteeText>
      </GuaranteeBox>

      {/* =====================================================
          CTA FINAL
      ====================================================== */}
      <CTASection>
        <CTAHeader>¿Listo para empezar a estudiar?</CTAHeader>

        <SecondaryButton onClick={goAcademyPro}>
          Entrar a la Academia PRO
        </SecondaryButton>
      </CTASection>

    </PageWrapper>
  );
}
