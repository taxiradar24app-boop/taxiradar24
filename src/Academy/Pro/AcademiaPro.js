// ======================================================================
// 🎓 ACADEMIA PRO — Panel de estudio
// ======================================================================

import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

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
  StatsRow,
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
// 📦 MÓDULOS ACADEMIA
// =====================================================

const MODULES = [
  {
    id: "reglamento",
    badge: "Reglamento oficial",
    title: "📚 Artículos 1–82 explicados",
    description:
      "Lecturas guiadas, resúmenes aplicados y ejemplos reales para cada artículo.",
    path: "/academia/pro/reglamento",
    cta: "Ir al Reglamento →",
  },
  {
    id: "audios",
    badge: " AudioLectura",
    title: "🎧 Audios guiados completos",
    description:
      "Escucha el Reglamento mientras conduces o descansas. Ideal para memorizar.",
    path: "/academia/pro/audios",
    cta: "Escuchar audios →",
  },
  {
    id: "simulador",
    badge: "Simulador examen",
    title: "📝 Simuladores oficiales",
    description:
      "Simulaciones reales de examen con cronómetro y corrección inmediata.",
    path: "/academia/pro/simulador",
    cta: "Entrar al simulador →",
  },
  {
    id: "callejero",
    badge: " Callejero Palma",
    title: "🗺️ Ejercicios: 10 calles en 10 minutos",
    description:
      "Rutas, zonas y ejercicios interactivos para dominar el callejero de Palma.",
    path: "/academia/pro/callejero",
    cta: "Practicar callejero →",
  },
  {
    id: "vias-principales",
    badge: "Sitios claves de Palma",
    title: "🧭 Vías principales y Sitios claves de Palma",
    description:
      "Aprende a identificar, ubicar y relacionar las principales avenidas y calles clave del municipio.",
    path: "/academia/pro/vias-principales",
    cta: "Estudiar vías principales →",
  },
  {
    id: "tarifas",
    badge: "Tarifas oficiales",
    title:
      "💶 Tarifas del servicio de transporte urbano de viajeros.",
    description:
      "Aprende a aplicar tarifas, suplementos y casos especiales sin dudas.",
    path: "/academia/pro/tarifas",
    cta: "Revisar tarifas →",
  },
];

// =====================================================
// Helpers progreso
// =====================================================

function clamp(n, min = 0, max = 100) {
  const v = Number.isFinite(Number(n)) ? Number(n) : 0;
  return Math.max(min, Math.min(max, v));
}

function computeOverall(progress) {
  const reglamento = clamp(progress?.reglamento?.progress ?? 0);

  const simulador = clamp(
    progress?.simulador?.avgPercent ?? progress?.simulador?.avgScore ?? 0
  );

  const callejeroRaw = Number(progress?.callejero?.avgScore ?? 0);

  const callejero = clamp(
    Math.round((Number.isFinite(callejeroRaw) ? callejeroRaw : 0) * 10)
  );

  const audioProgress =
    progress?.audio?.progress !== undefined
      ? clamp(progress?.audio?.progress)
      : clamp((progress?.audio?.minutes ?? 0) * 2);

  const tarifas = progress?.tarifas?.completed ? 100 : 0;

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
// 🎓 UI PRINCIPAL
// ======================================================================

export default function AcademiaPro() {
  const navigate = useNavigate();
  const auth = useAuth();

  const user = auth?.user || null;
  const progressData = auth?.progressData || null;

  const displayName =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "taxista PRO");

  const overall = useMemo(
    () => computeOverall(progressData || {}),
    [progressData]
  );

  const overallProgress = overall.score;

  const handleModuleNavigation = (path) => {
    navigate(path);
  };

  return (
    <PageWrapper>
      <InnerWrapper>
        {/* TOP BAR */}
        <TopBar>
          <TopBarLeft>
            <Badge>Academia TaxiRadar24 PRO</Badge>
            <TopTitle>Tu panel de estudio oficial</TopTitle>
          </TopBarLeft>

          <TopRight />
        </TopBar>

        {/* GREETING */}
        <GreetingSection>
          <GreetingText>
            <GreetingTitle>
              Hola, <Highlight>{displayName}</Highlight> 👋
            </GreetingTitle>
          </GreetingText>

          <StatsRow />
        </GreetingSection>

        {/* PROGRESS */}
        <ProgressSection>
          <ProgressHeader>
            <SectionTitle>Tu progreso general</SectionTitle>

            <ProgressText>
              Preparación global:
              <strong> {overall.level}</strong> ·{" "}
              <strong>{overallProgress}%</strong>
            </ProgressText>
          </ProgressHeader>

          <ProgressBarTrack>
            <ProgressBarFill style={{ width: `${overallProgress}%` }} />
          </ProgressBarTrack>
        </ProgressSection>

        {/* MODULES */}
        <ModulesSection>
          <SectionHeader>
            <SectionTitle>
              Elige por dónde quieres continuar hoy
            </SectionTitle>

            <SectionSubtitle>
              Reglamento, simuladores, callejero o tarifas.
            </SectionSubtitle>
          </SectionHeader>

          <ModulesGrid>
            {MODULES.map((m) => (
              <ModuleCard
                key={m.id}
                type="button"
                onClick={() => handleModuleNavigation(m.path)}
                aria-label={`Abrir ${m.title}`}
              >
                <ModuleBadge>{m.badge}</ModuleBadge>

                <ModuleTitle>{m.title}</ModuleTitle>

                <ModuleDescription>{m.description}</ModuleDescription>

                <ModuleFooter>
                  <ModuleCTA>{m.cta}</ModuleCTA>
                </ModuleFooter>
              </ModuleCard>
            ))}
          </ModulesGrid>
        </ModulesSection>
      </InnerWrapper>
    </PageWrapper>
  );
}