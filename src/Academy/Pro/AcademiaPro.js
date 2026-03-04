// ======================================================================
// 🎓 ACADEMIA PRO — Dark Mode Fijo
// ======================================================================

import React, { useMemo } from "react";

// Control acceso PRO (activaremos permisos más adelante)
import useAccessControl from "./hooks/useAccessControl";

// Navegación central
import { useSmartNavigation } from "@/utils/SmartNavigation";
import { useAuth } from "@/context/AuthContext";

// Estilos PRO (ya en dark mode fijo)
import {
  PageWrapper,
  InnerWrapper,
  TopBar,
  TopBarLeft,
  Badge,
  TopTitle,
  TopRight,
  GreetingSection,
  GreetingText,
  GreetingTitle,
  Highlight,
  GreetingSubtitle,
  GreetingPillRow,
  GreetingPill,
  GreetingPillAccent,
  ActionsRow,
  ActionButton,
  GhostButton,
  StatsRow,
  StatCard,
  StatNumber,
  StatLabel,
  StatHint,
  ModulesSection,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  ModulesGrid,
  ModuleCard,
  ModuleBadge,
  ModuleTitle,
  ModuleDescription,
  ModuleFooter,
  ModuleCTA,
  ProgressSection,
  ProgressHeader,
  ProgressText,
  ProgressBarTrack,
  ProgressBarFill,
} from "./AcademiaProStyle";

// =====================================================
// 📦 DEFINICIÓN DE MÓDULOS
// =====================================================
const MODULES = [
  {
    id: "reglamento",
    badge: "Reglamento oficial",
    title: "Artículos 1–82 explicados",
    description:
      "Lecturas guiadas, resúmenes aplicados y ejemplos reales para cada artículo.",
    path: "/academia/pro/reglamento",
    cta: "Ir al Reglamento",
  },
  {
    id: "audios",
    badge: "AudioLectura",
    title: "Audios guiados completos",
    description:
      "Escucha el Reglamento mientras conduces o descansas. Ideal para memorizar.",
    path: "/academia/pro/audios",
    cta: "Escuchar audios",
  },
  {
    id: "simulador",
    badge: "Simulador examen",
    title: "Simuladores oficiales",
    description:
      "Simulaciones reales de examen con cronómetro y corrección inmediata.",
    path: "/academia/pro/simulador",
    cta: "Entrar al simulador",
  },
  {
    id: "callejero",
    badge: "Callejero Palma",
    title: "Ejercicios: 10 calles en 10 minutos",
    description:
      "Rutas, zonas y ejercicios interactivos para dominar el callejero de Palma.",
    path: "/academia/pro/callejero",
    cta: "Practicar callejero",
  },
  {
    id: "vias-principales",
    badge: "Sitios claves de Palma",
    title: "Vías principales y Sitios claves de Palma",
    description:
      "Aprende a identificar, ubicar y relacionar las principales avenidas y calles clave del municipio.",
    path: "/academia/pro/vias-principales",
    cta: "Estudiar vías principales →",
  },
  {
    id: "tarifas",
    badge: "Tarifas oficiales",
    title:
      "Tarifas del servicio de transporte urbano de viajeros en taxi, de Palma.",
    description:
      "Aprende a aplicar tarifas, suplementos y casos especiales sin dudas.",
    path: "/academia/pro/tarifas",
    cta: "Revisar tarifas",
  },
];

// =====================================================
// Helpers progreso (mismo criterio que Perfil, pero ligero)
// =====================================================
function clamp(n, min = 0, max = 100) {
  const v = Number.isFinite(Number(n)) ? Number(n) : 0;
  return Math.max(min, Math.min(max, v));
}

function computeOverall(progress) {
  // Normalizamos inputs (0-100)
  const reglamento = clamp(progress?.reglamento?.progress ?? 0);

  const simulador = clamp(
    progress?.simulador?.avgPercent ?? progress?.simulador?.avgScore ?? 0
  );

  // Callejero está en /10 -> lo pasamos a %
  const callejeroRaw = Number(progress?.callejero?.avgScore ?? 0);
  const callejero = clamp(Math.round((Number.isFinite(callejeroRaw) ? callejeroRaw : 0) * 10));

  const audioProgress =
    progress?.audio?.progress !== undefined
      ? clamp(progress?.audio?.progress)
      : clamp((progress?.audio?.minutes ?? 0) * 2); // 50 min -> 100%

  const tarifas = progress?.tarifas?.completed ? 100 : 0;

  // Pesos (ajustables)
  const weights = {
    reglamento: 0.35,
    simulador: 0.35,
    callejero: 0.2,
    tarifas: 0.05,
    audio: 0.05,
  };

  const overall =
    reglamento * weights.reglamento +
    simulador * weights.simulador +
    callejero * weights.callejero +
    tarifas * weights.tarifas +
    audioProgress * weights.audio;

  const score = clamp(Math.round(overall));

  let level = "Explorando";
  if (score >= 75) level = "Nivel examen";
  else if (score >= 40) level = "En progreso";

  return { score, level };
}

// ======================================================================
// 🎓 ACADEMIA PRO — UI PRINCIPAL
// ======================================================================
export default function AcademiaPro() {
  // 🔐 Modo desarrollador — ignoramos restricciones por ahora
  // const { userData } = useAccessControl(true);

  // Navegación
  const { goTools } = useSmartNavigation();

  // Usuario + progreso (desde AuthContext)
  const auth = useAuth();
  const user = auth?.user || null;
  const progressData = auth?.progressData || null;

  const displayName =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "taxista PRO");

  // ✅ Progreso real (no placeholder)
  const overall = useMemo(() => computeOverall(progressData || {}), [progressData]);
  const overallProgress = overall.score;

  return (
    <PageWrapper>
      <InnerWrapper>
        {/* =====================================================
            TOP BAR
        ====================================================== */}
        <TopBar>
          <TopBarLeft>
            <Badge>Academia TaxiRadar24 PRO</Badge>
            <TopTitle> - Tu panel de estudio oficial</TopTitle>
          </TopBarLeft>
          <TopRight />
        </TopBar>

        {/* =====================================================
            GREETING SECTION
        ====================================================== */}
        <GreetingSection>
          <GreetingText>
            <GreetingTitle>
              Hola, <Highlight>{displayName}</Highlight> 👋
            </GreetingTitle>

            <GreetingSubtitle>
              Bienvenido a tu espacio de estudio. Aquí tienes todo lo necesario
              para preparar el <Highlight>Permiso Municipal de Taxista</Highlight>{" "}
              con un método claro, práctico y totalmente optimizado.
            </GreetingSubtitle>

            <GreetingPillRow>
              <GreetingPill>🎧 Audios completos del Reglamento</GreetingPill>
              <GreetingPill>📝 Simuladores de examen oficiales</GreetingPill>
              <GreetingPillAccent>
                🗺️ Callejero Palma + Ejercicios reales
              </GreetingPillAccent>
            </GreetingPillRow>

            <ActionsRow>
              <ActionButton
                onClick={() =>
                  (window.location.href = "/academia/pro/reglamento")
                }
              >
                Continuar con el Reglamento
              </ActionButton>

              <GhostButton
                onClick={() => (window.location.href = "/academia/pro/audios")}
              >
                Ver todos los audios que incluye la Academia
              </GhostButton>

              <GhostButton onClick={goTools}>Herramientas para taxistas</GhostButton>
            </ActionsRow>
          </GreetingText>

          {/* =====================================================
              STATS
          ====================================================== */}
          <StatsRow>
            <StatCard>
              <StatNumber>15</StatNumber>
              <StatLabel>Audios del Reglamento</StatLabel>
              <StatHint>Escúchalos las veces que quieras.</StatHint>
            </StatCard>

            <StatCard>
              <StatNumber>+600</StatNumber>
              <StatLabel>Preguntas de examen</StatLabel>
              <StatHint>Basadas en convocatorias reales.</StatHint>
            </StatCard>

            <StatCard>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Acceso total desde móvil y PWA</StatLabel>
              <StatHint>Estudia cuando quieras.</StatHint>
            </StatCard>
          </StatsRow>
        </GreetingSection>

        {/* =====================================================
            PROGRESS SECTION
        ====================================================== */}
        <ProgressSection>
          <ProgressHeader>
            <SectionTitle>Tu progreso general</SectionTitle>

            <ProgressText>
              Preparación global: <strong>{overall.level}</strong> ·{" "}
              <strong>{overallProgress}%</strong>
              <br />
              Ver estadísticas reales: aciertos por bloque,
              módulos completados y seguimiento semanal.
            </ProgressText>
          </ProgressHeader>

          <ProgressBarTrack>
            <ProgressBarFill style={{ width: `${overallProgress}%` }} />
          </ProgressBarTrack>
        </ProgressSection>

        {/* =====================================================
            MODULES GRID
        ====================================================== */}
        <ModulesSection>
          <SectionHeader>
            <SectionTitle>Elige por dónde quieres continuar hoy</SectionTitle>
            <SectionSubtitle>
              Refuerza lo que necesitas: Reglamento, simuladores, callejero o
              tarifas.
            </SectionSubtitle>
          </SectionHeader>

          <ModulesGrid>
            {MODULES.map((m) => (
              <ModuleCard
                key={m.id}
                onClick={() => (window.location.href = m.path)}
              >
                <ModuleBadge>{m.badge}</ModuleBadge>
                <ModuleTitle>{m.title}</ModuleTitle>
                <ModuleDescription>{m.description}</ModuleDescription>

                <ModuleFooter>
                  <ModuleCTA>{m.cta} →</ModuleCTA>
                </ModuleFooter>
              </ModuleCard>
            ))}
          </ModulesGrid>
        </ModulesSection>
      </InnerWrapper>
    </PageWrapper>
  );
}