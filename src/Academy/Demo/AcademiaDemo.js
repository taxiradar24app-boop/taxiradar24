import React from "react";
import { useNavigate } from "react-router-dom";

import {
  DemoWrapper,
  DemoContainer,
  DemoHeader,
  DemoTagline,
  DemoTitle,
  DemoHighlight,
  DemoSubtitle,
  StatsRow,
  StatItem,
  CTAGroup,
  HeroRightCard,
  SectionTitleBlock,
  ModulesGrid,
  ModuleCard,
  Pill,
  ModuleCTA,
  ModuleFooter,
  Emoji,
  DemoStrip,
  DemoDotList,
  DemoBread,
} from "./AcademiaDemoStyle";

import {
  PrimaryButton,
  SecondaryButton,
} from "@/components/Buttons/ButtonsAcademia";

import { useSmartNavigation } from "@/utils/SmartNavigation";

export default function AcademiaDemo() {
  const navigate = useNavigate();
  const { goHome } = useSmartNavigation();

  const goDemoPath = (path) => {
    navigate(path);
  };

  const handleUpgradeClick = () => {
    navigate("/academia/upgrade");
  };

  return (
    <DemoWrapper>
      <DemoContainer>
        {/* =====================================================
            MÓDULOS DEMO
        ====================================================== */}

        <ModulesGrid>
          <ModuleCard onClick={() => goDemoPath("/academia/demo/reglamento")}>
            <header>
              <Emoji>📘</Emoji>
              <h3>Reglamento oficial</h3>
            </header>

            <p>
              Lectura guiada del reglamento con explicación clara
              y ejemplos prácticos.
            </p>

            <ModuleFooter>
              <Pill>3 Bloques</Pill>
              <ModuleCTA>Ir al Reglamento →</ModuleCTA>
            </ModuleFooter>
          </ModuleCard>

          <ModuleCard onClick={() => goDemoPath("/academia/demo/audios")}>
            <header>
              <Emoji>🎧</Emoji>
              <h3>Audios del Reglamento</h3>
            </header>

            <p>
              Escucha un ejemplo de cómo se explican los artículos
              más importantes.
            </p>

            <ModuleFooter>
              <Pill>3 Audios</Pill>
              <ModuleCTA>Escuchar audios →</ModuleCTA>
            </ModuleFooter>
          </ModuleCard>

          <ModuleCard onClick={() => goDemoPath("/academia/demo/simulador")}>
            <header>
              <Emoji>🧠</Emoji>
              <h3>Simulador DEMO</h3>
            </header>

            <p>
              Responde un mini examen basado en preguntas reales.
            </p>

            <ModuleFooter>
              <Pill>3 Exámenes</Pill>
              <ModuleCTA>Ir al simulador →</ModuleCTA>
            </ModuleFooter>
          </ModuleCard>

          <ModuleCard onClick={() => goDemoPath("/academia/demo/callejero")}>
            <header>
              <Emoji>🗺️</Emoji>
              <h3>Callejero de Palma</h3>
            </header>

            <p>
              Practica un ejercicio tipo 10x10 del examen municipal.
            </p>

            <ModuleFooter>
              <Pill>3 ejercicios </Pill>
              <ModuleCTA>Ir al callejero →</ModuleCTA>
            </ModuleFooter>
          </ModuleCard>
        </ModulesGrid>

        {/* =====================================================
            HERO DEMO
        ====================================================== */}

        <DemoHeader>
          <div>
            <DemoTagline>
              Academia online para taxistas de Baleares
            </DemoTagline>

            <DemoBread>Versión DEMO</DemoBread>

            <DemoTitle>
              Prueba la <DemoHighlight>Academia TaxiRadar24</DemoHighlight>
            </DemoTitle>

            <DemoSubtitle>
              Esta es una versión gratuita para que puedas explorar
              cómo funciona la plataforma antes de acceder a la
              formación completa.
            </DemoSubtitle>

            <StatsRow>
              <StatItem>
                <span className="stat-number">15</span>
                <span className="stat-label">Audios</span>
              </StatItem>

              <StatItem>
                <span className="stat-number">+600</span>
                <span className="stat-label">Preguntas</span>
              </StatItem>

              <StatItem>
                <span className="stat-number">24/7</span>
                <span className="stat-label">Acceso móvil</span>
              </StatItem>
            </StatsRow>

            <CTAGroup>
              <PrimaryButton onClick={handleUpgradeClick}>
                Ver planes PRO
              </PrimaryButton>

              <SecondaryButton onClick={goHome}>
                ← Volver al inicio
              </SecondaryButton>
            </CTAGroup>
          </div>

          {/* CARD DERECHA */}

          <HeroRightCard>
            <h3>Cómo funciona la academia</h3>

            <h4>Estudia con una ruta clara</h4>

            <ul>
              <li>Lectura guiada del Reglamento.</li>
              <li>Audio explicación de los artículos.</li>
              <li>Simuladores basados en exámenes reales.</li>
              <li>Ejercicios prácticos de callejero.</li>
            </ul>

            <small>
              En la versión PRO desbloqueas todo el contenido,
              estadísticas de progreso y simuladores completos.
            </small>
          </HeroRightCard>
        </DemoHeader>

        {/* =====================================================
            SECCIÓN DEMO
        ====================================================== */}

        <SectionTitleBlock>
          <h2>Explora la versión DEMO</h2>

          <p>
            Estos módulos te permiten probar cómo funciona la
            academia antes de acceder a todo el contenido.
          </p>
        </SectionTitleBlock>

        {/* =====================================================
            LIMITACIÓN DEMO
        ====================================================== */}

        <DemoStrip>
          <strong>La DEMO incluye:</strong>

          <DemoDotList>
            <li>Audios de ejemplo del Reglamento</li>
            <li>Mini simulador de examen</li>
            <li>Ejercicio básico de callejero</li>
          </DemoDotList>
        </DemoStrip>
      </DemoContainer>
    </DemoWrapper>
  );
}