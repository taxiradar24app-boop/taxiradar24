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
  const { goAcademyPro, goTools } = useSmartNavigation();

  const goDemoPath = (path) => {
    // ✅ React Router navigation (respeta HashRouter si lo usas)
    navigate(path);
  };

  return (
    <DemoWrapper>
      <DemoContainer>
        <DemoHeader>
          <div>
            <DemoTagline>
              <span>Academia online para taxistas de Baleares</span>
            </DemoTagline>

            <DemoBread>
              <span>Versión demo</span>
            </DemoBread>

            <DemoTitle>
              Academia TaxiRadar24{" "}
              <DemoHighlight>
                preparación oficial para tu permiso municipal de taxista
              </DemoHighlight>
            </DemoTitle>

            <DemoSubtitle>
              Formación práctica, audios guiados, callejero y simuladores de
              examen diseñados por taxistas profesionales. Estudia a tu ritmo
              desde cualquier dispositivo.
            </DemoSubtitle>

            <StatsRow>
              <StatItem>
                <span className="stat-number">15</span>
                <span className="stat-label">Audios</span>
              </StatItem>
              <StatItem>
                <span className="stat-number">+600</span>
                <span className="stat-label">Preguntas reales</span>
              </StatItem>
              <StatItem>
                <span className="stat-number">24/7</span>
                <span className="stat-label">Acceso móvil</span>
              </StatItem>
            </StatsRow>

            <CTAGroup>
              <PrimaryButton onClick={goAcademyPro}>
                Entrar a la Academia
              </PrimaryButton>
              <SecondaryButton onClick={goTools}>
                Herramientas para taxistas
              </SecondaryButton>
            </CTAGroup>
          </div>

          <HeroRightCard>
            <h3>Próximas convocatorias</h3>
            <h4>Llega al examen con todo el temario controlado</h4>
            <ul>
              <li>Ruta de estudio recomendada por capítulos.</li>
              <li>Audio lectura completa del Reglamento.</li>
              <li>Simuladores por fecha de examen.</li>
              <li>Ejercicios especiales de Callejero de Palma.</li>
            </ul>
            <small>
              En la Academia PRO desbloqueas todas las clases, exámenes
              completos y estadísticas de progreso.
            </small>
          </HeroRightCard>
        </DemoHeader>

        <SectionTitleBlock>
          <h2>Prueba gratuita</h2>
          <p>Explora cómo funciona la Academia antes de registrarte.</p>
        </SectionTitleBlock>

        <ModulesGrid>
          <ModuleCard onClick={() => goDemoPath("/academia/demo/reglamento")}>
            <header>
              <Emoji>📘</Emoji>
              <h3>Reglamento oficial</h3>
            </header>
            <p>
              Texto oficial en PDF explicado en lenguaje de Academia, con
              ejemplos prácticos, preguntas típicas de examen y resumen final.
            </p>
            <Pill>3 bloques accesibles</Pill>
          </ModuleCard>

          <ModuleCard onClick={() => goDemoPath("/academia/demo/audios")}>
            <header>
              <Emoji>🎧</Emoji>
              <h3>Audio lectura del Reglamento</h3>
            </header>
            <p>
              Escucha un ejemplo real de cómo explicamos cada artículo del
              Reglamento.
            </p>
            <Pill>3 audios de ejemplo</Pill>
          </ModuleCard>

          <ModuleCard onClick={() => goDemoPath("/academia/demo/simulador")}>
            <header>
              <Emoji>🧠</Emoji>
              <h3>Simulador de examen</h3>
            </header>
            <p>
              Responde un mini examen DEMO con preguntas reales de convocatorias
              anteriores.
            </p>
            <Pill>1 simulador DEMO</Pill>
          </ModuleCard>

          <ModuleCard onClick={() => goDemoPath("/academia/demo/callejero")}>
            <header>
              <Emoji>🗺️</Emoji>
              <h3>Callejero de Palma</h3>
            </header>
            <p>
              Practica un ejercicio real tipo 10x10 incluido en el examen
              municipal.
            </p>
            <Pill>1 ejercicio</Pill>
          </ModuleCard>
        </ModulesGrid>

        <DemoStrip>
          <strong>En la versión DEMO:</strong>
          <DemoDotList>
            <li>1 audio de ejemplo del Reglamento</li>
            <li>1 mini simulador de examen</li>
            <li>1 ejercicio 10x10 de Callejero</li>
          </DemoDotList>
        </DemoStrip>
      </DemoContainer>
    </DemoWrapper>
  );
}