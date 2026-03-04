// ======================================================================
// 🧠 calculateSimuladorMetrics.js — TaxiRadar24 Academy (Simulador)
// Capa matemática central para valorar progreso del alumno en exámenes.
// - Normaliza intentos (compatibles con {ok,total} o {correct,total})
// - Calcula % último, mejor, PROMEDIO PONDERADO (por nº de preguntas),
//   racha y estado
// - Determina APTO / NO APTO y "Listo para examen" según reglas
// ======================================================================

export const DEFAULT_SIMULADOR_RULES = {
  passPercent: 50,
  examLevelPercent: 65,

  ready: {
    streakMinPercent: 60,
    streakCount: 3,
    avgLastN: 5,
    avgMinPercent: 65,
  },

  bands: [
    { key: "dominado", label: "Nivel Dominado", min: 80 },
    { key: "buen_nivel", label: "Buen nivel", min: 65 },
    { key: "apto_ajustado", label: "Apto ajustado", min: 50 },
    { key: "riesgo", label: "Riesgo", min: 40 },
    { key: "deficiente", label: "Deficiente", min: 0 },
  ],
};

function round(num, decimals = 0) {
  const n = Number(num);
  if (!Number.isFinite(n)) return 0;
  const p = Math.pow(10, decimals);
  return Math.round(n * p) / p;
}

function toNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function attemptTimeMs(attempt) {
  if (!attempt || typeof attempt !== "object") return 0;

  if (typeof attempt.ts === "number") return attempt.ts;

  if (typeof attempt.createdAt === "number") return attempt.createdAt;

  if (typeof attempt.createdAt === "string") {
    const t = Date.parse(attempt.createdAt);
    return Number.isFinite(t) ? t : 0;
  }

  if (typeof attempt.date === "string") {
    const t = Date.parse(attempt.date);
    return Number.isFinite(t) ? t : 0;
  }

  return 0;
}

export function normalizeSimuladorAttempt(rawAttempt) {
  const a = rawAttempt && typeof rawAttempt === "object" ? rawAttempt : {};

  const total =
    toNumber(a.total, 0) ||
    toNumber(a.questionsTotal, 0) ||
    toNumber(a.n, 0) ||
    0;

  const ok =
    toNumber(a.ok, NaN) ??
    toNumber(a.correct, NaN) ??
    toNumber(a.score, NaN);

  const okFixed = Number.isFinite(ok) ? ok : 0;

  const fail = toNumber(a.fail, 0);
  const blank = toNumber(a.blank, 0);

  const percent = total > 0 ? (okFixed / total) * 100 : 0;

  const passed = typeof a.passed === "boolean" ? a.passed : undefined;

  return {
    ok: okFixed,
    fail,
    blank,
    total,
    percent,

    date: typeof a.date === "string" ? a.date : undefined,
    createdAt:
      typeof a.createdAt === "string" || typeof a.createdAt === "number"
        ? a.createdAt
        : undefined,
    ts: typeof a.ts === "number" ? a.ts : attemptTimeMs(a),

    passed,
    raw: a,
  };
}

export function getSimuladorBand(percent, rules = DEFAULT_SIMULADOR_RULES) {
  const p = Math.max(0, Math.min(100, toNumber(percent, 0)));

  const bands = Array.isArray(rules?.bands) ? rules.bands.slice() : [];
  bands.sort((x, y) => toNumber(y.min, 0) - toNumber(x.min, 0));

  for (const b of bands) {
    if (p >= toNumber(b.min, 0)) {
      return { key: b.key, label: b.label, min: toNumber(b.min, 0) };
    }
  }

  return { key: "deficiente", label: "Deficiente", min: 0 };
}

export function getStreak(attemptsSortedNewestFirst, minPercent = 60) {
  if (!Array.isArray(attemptsSortedNewestFirst)) return 0;

  let streak = 0;
  for (const a of attemptsSortedNewestFirst) {
    const p = toNumber(a?.percent, 0);
    if (p >= minPercent) streak += 1;
    else break;
  }
  return streak;
}

export function averageLastN(attemptsSortedNewestFirst, n = 5) {
  if (
    !Array.isArray(attemptsSortedNewestFirst) ||
    attemptsSortedNewestFirst.length === 0
  ) {
    return 0;
  }

  const take = Math.max(1, Math.min(n, attemptsSortedNewestFirst.length));
  let sum = 0;

  for (let i = 0; i < take; i++) {
    sum += toNumber(attemptsSortedNewestFirst[i]?.percent, 0);
  }

  return sum / take;
}

export function calculateSimuladorMetrics(
  rawAttempts = [],
  rules = DEFAULT_SIMULADOR_RULES
) {
  const attempts = Array.isArray(rawAttempts) ? rawAttempts : [];

  const normalized = attempts
    .map(normalizeSimuladorAttempt)
    .filter((a) => a.total > 0)
    .sort((a, b) => attemptTimeMs(b) - attemptTimeMs(a));

  const attemptsCount = normalized.length;
  const last = attemptsCount > 0 ? normalized[0] : null;

  const lastPercent = last ? last.percent : 0;
  const lastOk = last ? last.ok : 0;
  const lastTotal = last ? last.total : 0;

  const bestPercent =
    attemptsCount > 0
      ? Math.max(...normalized.map((a) => toNumber(a.percent, 0)))
      : 0;

  // =====================================================
  // ✅ PROMEDIO PONDERADO POR Nº DE PREGUNTAS (GLOBAL)
  // avgWeighted = (Σ ok / Σ total) * 100
  // =====================================================
  let totalOk = 0;
  let totalQuestions = 0;

  normalized.forEach((a) => {
    totalOk += toNumber(a.ok, 0);
    totalQuestions += toNumber(a.total, 0);
  });

  const avgWeighted =
    totalQuestions > 0 ? (totalOk / totalQuestions) * 100 : 0;

  // Últimos N (solo para readiness / tendencia)
  const avgN = toNumber(rules?.ready?.avgLastN, 5);
  const avgLast = attemptsCount > 0 ? averageLastN(normalized, avgN) : 0;

  const passPercent = toNumber(rules?.passPercent, 50);
  const examLevelPercent = toNumber(rules?.examLevelPercent, 65);

  const passedNow = last ? lastPercent >= passPercent : false;

  const band = getSimuladorBand(lastPercent, rules);

  const streakMin = toNumber(rules?.ready?.streakMinPercent, 60);
  const streakCount = toNumber(rules?.ready?.streakCount, 3);
  const avgMin = toNumber(rules?.ready?.avgMinPercent, 65);

  const streak = attemptsCount > 0 ? getStreak(normalized, streakMin) : 0;

  const readyByStreak = streak >= streakCount;
  const readyByAverage = avgLast >= avgMin;

  const readyForOfficialExam =
    attemptsCount > 0 && (readyByStreak || readyByAverage);

  const examLevel =
    attemptsCount === 0
      ? "Explorando"
      : readyForOfficialExam
      ? "Nivel examen"
      : avgLast >= passPercent
      ? "En progreso"
      : "Riesgo";

  const compact = {
    attempts: attemptsCount,
    lastPercent: round(lastPercent, 0),
    bestPercent: round(bestPercent, 0),

    // ✅ aquí ya usamos ponderado global
    avgPercent: round(avgWeighted, 0),

    lastOk: lastOk,
    lastTotal: lastTotal,

    passed: passedNow,
    bandKey: band.key,
    bandLabel: band.label,

    streak: streak,
    readyForOfficialExam: readyForOfficialExam,
    examLevel: examLevel,

    lastAttemptAt: last
      ? last.date || (typeof last.createdAt === "string" ? last.createdAt : undefined)
      : undefined,
    lastAttemptTs: last ? attemptTimeMs(last) : undefined,
  };

  return {
    ...compact,
    rules: {
      passPercent,
      examLevelPercent,
      ready: {
        streakMinPercent: streakMin,
        streakCount,
        avgLastN: avgN,
        avgMinPercent: avgMin,
      },
    },
    lastAttempt: last
      ? {
          ok: last.ok,
          fail: last.fail,
          blank: last.blank,
          total: last.total,
          percent: round(last.percent, 2),
        }
      : null,
  };
}

export default calculateSimuladorMetrics;