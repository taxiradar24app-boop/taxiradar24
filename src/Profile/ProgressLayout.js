// src/Profile/ProgressLayout.js

import React, { useMemo } from "react";
import { useAuth } from "@/navigator/sections/auth/useAuth";
import HeaderAcademia from "@/components/HeaderBox/HeaderAcademia";
import {
  PageWrapper,
  HeaderSection,
  UserInfo,
  Avatar,
  UserName,
  UserEmail,
  PlanBadge,
  DatesRow,
  Section,
  SectionTitle,
  CardsGrid,
  UpgradeHint,
  GeneralProgressCard,
  GeneralProgressTop,
  GeneralProgressTitle,
  GeneralProgressValue,
  GeneralProgressSub,
  ProgressBarTrack,
  ProgressBarFill,
  MiniStatsRow,
  MiniStat,
  MiniStatLabel,
  MiniStatValue,
  ModuleProgressPanel,
  ModuleProgressRow,
  ModuleProgressInfo,
  ModuleProgressName,
  ModuleProgressMeta,
  ModuleProgressPercent,
  ModuleProgressTrack,
  ModuleProgressFill,
} from "./ProgressLayoutStyle";
import UserProgressCard from "./UserProgressCard";

function clamp(n, min = 0, max = 100) {
  const v = Number.isFinite(Number(n)) ? Number(n) : 0;
  return Math.max(min, Math.min(max, v));
}

function computeOverall(progress) {
  const reglamento = clamp(progress?.reglamento?.progress ?? 0);

  const simulador = clamp(
    progress?.simulador?.avgPercent ?? progress?.simulador?.avgScore ?? 0
  );

  // Callejero puede venir en porcentaje o en nota /10
  const callejeroRaw = Number(progress?.callejero?.avgScore ?? 0);
  const callejero = clamp(
    callejeroRaw <= 10 ? Math.round(callejeroRaw * 10) : callejeroRaw
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

  const attemptsTotal =
    (progress?.simulador?.attempts ?? 0) +
    (progress?.callejero?.attempts ?? 0) +
    (progress?.tarifas?.attempts ?? 0);

  const avgCore = Math.round((reglamento + simulador + callejero) / 3);

  return {
    score,
    level,
    attemptsTotal,
    avgCore,
    module: {
      reglamento,
      simulador,
      callejero,
      audioProgress,
      tarifas,
    },
  };
}

function toJSDate(v) {
  if (!v) return null;
  if (v instanceof Date) return v;

  if (typeof v === "object" && typeof v.seconds === "number") {
    return new Date(v.seconds * 1000);
  }

  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function toDateLabel(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString();
}

export default function ProgressLayout({ user = {}, progress = {} }) {
  const auth = useAuth();

  const userData = auth?.userData || null;
  const progressFromContext = auth?.progressData || null;

  const subscription = auth?.subscription || null;
  const plan = subscription?.plan || null;
  const status = subscription?.status || "none";
  const expiresAt = subscription?.expires_at || null;

  const now = new Date();
  const expiresDate = expiresAt ? new Date(expiresAt) : null;

  const isActive =
    status === "active" &&
    (!expiresDate || expiresDate.getTime() > now.getTime());

  const planKey = String(plan || "").toUpperCase();
  const isPro =
    isActive &&
    (planKey === "ACADEMIA_PRO" || planKey === "BASIC_MONTHLY");

  const effectiveProgress = progressFromContext || progress;

  const displayName = userData?.displayName || user?.displayName || "Alumno";
  const email = userData?.email || user?.email || "";
  const createdAt = userData?.createdAt || user?.createdAt;

  const overall = useMemo(
    () => computeOverall(effectiveProgress),
    [effectiveProgress]
  );

  const moduleRows = [
    {
      name: "Reglamento",
      percent: overall.module.reglamento,
      meta: `${effectiveProgress?.reglamento?.completed ?? 0}/${
        effectiveProgress?.reglamento?.total ?? 0
      } artículos`,
    },
    {
      name: "Simulador",
      percent: overall.module.simulador,
      meta: `${effectiveProgress?.simulador?.attempts ?? 0} intentos`,
    },
    {
      name: "Callejero",
      percent: overall.module.callejero,
      meta: `Mejor: ${effectiveProgress?.callejero?.bestScore ?? 0}/10`,
    },
    {
      name: "Audios",
      percent: overall.module.audioProgress,
      meta: `${effectiveProgress?.audio?.minutes ?? 0} min escuchados`,
    },
    {
      name: "Tarifas",
      percent: overall.module.tarifas,
      meta: effectiveProgress?.tarifas?.completed
        ? "Completado"
        : "Pendiente",
    },
  ];

  return (
    <>
      <HeaderAcademia />

      <PageWrapper>
        <HeaderSection>
          <UserInfo>
            <Avatar>{String(displayName || "A").charAt(0).toUpperCase()}</Avatar>
            <div>
              <UserName>{displayName}</UserName>
              <UserEmail>{email}</UserEmail>
            </div>
          </UserInfo>

          <PlanBadge $pro={isPro}>{isPro ? "PRO" : "DEMO"}</PlanBadge>
        </HeaderSection>

        <DatesRow>
          {createdAt && <span>Alta: {toDateLabel(createdAt)}</span>}
          {isPro && expiresAt && (
            <span>Activo hasta: {toDateLabel(expiresAt)}</span>
          )}
        </DatesRow>

        <Section>
          <SectionTitle>Tu progreso general</SectionTitle>

          <GeneralProgressCard>
            <GeneralProgressTop>
              <div>
                <GeneralProgressTitle>
                  Preparación global: <strong>{overall.level}</strong>
                </GeneralProgressTitle>

                <GeneralProgressSub>
                  Aquí verás tu evolución real: aciertos, intentos y progreso por módulos.
                </GeneralProgressSub>
              </div>

              <GeneralProgressValue>{overall.score}%</GeneralProgressValue>
            </GeneralProgressTop>

            <ProgressBarTrack>
              <ProgressBarFill style={{ width: `${overall.score}%` }} />
            </ProgressBarTrack>

            <MiniStatsRow>
              <MiniStat>
                <MiniStatLabel>Media global</MiniStatLabel>
                <MiniStatValue>{overall.avgCore}%</MiniStatValue>
              </MiniStat>

              <MiniStat>
                <MiniStatLabel>Intentos totales</MiniStatLabel>
                <MiniStatValue>{overall.attemptsTotal}</MiniStatValue>
              </MiniStat>

              <MiniStat>
                <MiniStatLabel>Plan</MiniStatLabel>
                <MiniStatValue>{isPro ? "PRO" : "DEMO"}</MiniStatValue>
              </MiniStat>
            </MiniStatsRow>
          </GeneralProgressCard>
        </Section>

        <Section>
          <SectionTitle>Progreso por módulo</SectionTitle>

          <ModuleProgressPanel>
            {moduleRows.map((item) => (
              <ModuleProgressRow key={item.name}>
                <ModuleProgressInfo>
                  <ModuleProgressName>{item.name}</ModuleProgressName>
                  <ModuleProgressMeta>{item.meta}</ModuleProgressMeta>
                </ModuleProgressInfo>

                <ModuleProgressPercent>{item.percent}%</ModuleProgressPercent>

                <ModuleProgressTrack>
                  <ModuleProgressFill style={{ width: `${item.percent}%` }} />
                </ModuleProgressTrack>
              </ModuleProgressRow>
            ))}
          </ModuleProgressPanel>

          {!isPro && (
            <UpgradeHint>
              En DEMO el panel muestra una vista limitada. El seguimiento completo
              se activa al pasar a <strong>Academia PRO</strong>.
            </UpgradeHint>
          )}
        </Section>

        <Section>
          <SectionTitle>Seguimiento académico</SectionTitle>

          <CardsGrid>
            <UserProgressCard
              title="Reglamento"
              value={isPro ? `${effectiveProgress?.reglamento?.progress ?? 0}%` : "—"}
              subtitle={`Artículos: ${effectiveProgress?.reglamento?.completed ?? 0}/${
                effectiveProgress?.reglamento?.total ?? 0
              }`}
              meta={`Última actividad: ${
                effectiveProgress?.reglamento?.lastAttemptAt
                  ? new Date(
                      effectiveProgress.reglamento.lastAttemptAt
                    ).toLocaleDateString()
                  : "—"
              }`}
              enabled={isPro}
            />

            <UserProgressCard
              title="Audios"
              value={isPro ? `${effectiveProgress?.audio?.minutes ?? 0} min` : "—"}
              subtitle={`Progreso: ${effectiveProgress?.audio?.progress ?? 0}%`}
              meta={`Último: ${
                effectiveProgress?.audio?.lastListenAt
                  ? new Date(
                      effectiveProgress.audio.lastListenAt
                    ).toLocaleDateString()
                  : "—"
              }`}
              enabled={isPro}
            />

            <UserProgressCard
              title="Simulador"
              value={isPro ? `${effectiveProgress?.simulador?.avgPercent ?? 0}%` : "—"}
              subtitle={`Intentos: ${effectiveProgress?.simulador?.attempts ?? 0} · Mejor: ${
                effectiveProgress?.simulador?.bestPercent ?? 0
              }% · Promedio: ${effectiveProgress?.simulador?.avgPercent ?? 0}%`}
              meta={`Apto: ${
                effectiveProgress?.simulador?.passed ? "Sí" : "No"
              } · Estado: ${
                effectiveProgress?.simulador?.bandLabel ?? "—"
              } · Preparación: ${
                effectiveProgress?.simulador?.readyForOfficialExam
                  ? "Nivel examen 🟢"
                  : "En progreso"
              }`}
              enabled={isPro}
            />

            <UserProgressCard
              title="Callejero"
              value={isPro ? `${effectiveProgress?.callejero?.avgScore ?? 0} / 10` : "—"}
              subtitle={`Intentos: ${effectiveProgress?.callejero?.attempts ?? 0} · Mejor: ${
                effectiveProgress?.callejero?.bestScore ?? 0
              } / 10`}
              meta={`Último: ${
                toJSDate(effectiveProgress?.callejero?.lastAttemptAt)
                  ? toJSDate(
                      effectiveProgress?.callejero?.lastAttemptAt
                    ).toLocaleDateString()
                  : "—"
              }`}
              enabled={isPro}
            />
          </CardsGrid>
        </Section>
      </PageWrapper>
    </>
  );
}