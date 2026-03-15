// ======================================================================
// ✅ SimuladorExamen.js — unificado PRO + DEMO
// PRO  -> 15 / 30 / 60
// DEMO -> misma experiencia visual, pero solo 15 disponible
// + Corrección detallada solo en 15 y 30
// + En 60 solo puntuación final
// + Criterio real: +1 acierto / -0,33 error / blanco 0
// ======================================================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import getExamQuestions from "./logic/getModuleQuestions";
import { saveSimuladorAttempt } from "./logic/saveProgress";

import {
  Page,
  Shell,
  Content,
  HeroTitle,
  HeroSub,
  Card,
  Row,
  Chip,
  CTA,
  Ghost,
  Divider,
  QMeta,
  QIndex,
  QMetaRight,
  QText,
  Options,
  Option,
  Footer,
  Progress,
  ProgressFill,
} from "./SimuladorExamenStyle";

const ALL_PRESETS = [
  {
    value: 15,
    title: "15 preguntas",
    subtitle: "Aprender",
    description:
      "Entrenamiento guiado para empezar a detectar fallos, entender el formato y ganar seguridad.",
  },
  {
    value: 30,
    title: "30 preguntas",
    subtitle: "Consolidar",
    description:
      "Simulación intermedia para comprobar si ya dominas mejor el temario y mantienes el ritmo.",
  },
  {
    value: 60,
    title: "60 preguntas",
    subtitle: "Examen real",
    description:
      "Experiencia completa. Aquí solo verás la puntuación final, como preparación psicológica real.",
  },
];

const PENALTY_PER_FAIL = 0.33;

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatScore(value) {
  return Number(value).toFixed(2);
}

export default function SimuladorExamen({
  mode = "pro",
  attemptsLeft = null,
  totalAttempts = 3,
  isLocked = false,
  onRegisterDemoAttempt = null,
  onRequireLogin = null,
  onUpgrade = null,
}) {
  const isDemo = mode === "demo";

  const [step, setStep] = useState("select");
  const [preset, setPreset] = useState(15);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examLocked, setExamLocked] = useState(false);
  const [remaining, setRemaining] = useState(0);

  const timerRef = useRef(null);
  const savedRef = useRef(false);

  const currentQ = questions[current];

  const availableOptions = isDemo ? [15] : [15, 30, 60];
  const isReviewEnabled = preset === 15 || preset === 30;

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return Math.round((answeredCount / questions.length) * 100);
  }, [answeredCount, questions.length]);

  const activePresetMeta = useMemo(
    () => ALL_PRESETS.find((item) => item.value === preset),
    [preset]
  );

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetAll = () => {
    stopTimer();
    setQuestions([]);
    setCurrent(0);
    setAnswers({});
    setExamLocked(false);
    setRemaining(0);
    setStep("select");
    savedRef.current = false;
  };

  const buildExam = () => {
    if (isDemo && typeof onRequireLogin === "function") {
      const mustStop = onRequireLogin();
      if (mustStop) return;
    }

    if (isDemo && (isLocked || (typeof attemptsLeft === "number" && attemptsLeft <= 0))) {
      setStep("locked");
      return;
    }

    const qs = getExamQuestions(preset);

    setQuestions(qs);
    setCurrent(0);
    setAnswers({});
    setExamLocked(false);
    savedRef.current = false;

    stopTimer();
    setRemaining(preset * 60);

    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          stopTimer();
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setStep("exam");
  };

  const choose = (qid, optionLetter) => {
    if (examLocked) return;
    setAnswers((prev) => ({
      ...prev,
      [qid]: optionLetter,
    }));
  };

  const goNext = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const score = useMemo(() => {
    if (!questions.length) {
      return {
        ok: 0,
        fail: 0,
        blank: 0,
        total: 0,
        finalScore: 0,
      };
    }

    let ok = 0;
    let fail = 0;
    let blank = 0;

    questions.forEach((q) => {
      const selected = answers[q.id];

      if (!selected) {
        blank += 1;
        return;
      }

      if (selected === q.correcta) ok += 1;
      else fail += 1;
    });

    const finalScore = Math.max(0, ok - fail * PENALTY_PER_FAIL);

    return {
      ok,
      fail,
      blank,
      total: questions.length,
      finalScore,
    };
  }, [answers, questions]);

  const wrongItems = useMemo(() => {
    if (!questions.length || !isReviewEnabled) return [];

    const list = [];

    questions.forEach((q, idx) => {
      const chosen = answers[q.id];

      if (chosen && chosen !== q.correcta) {
        list.push({
          index: idx + 1,
          id: q.id,
          pregunta: q.pregunta,
          chosen,
          correct: q.correcta,
          opciones: q.opciones,
        });
      }
    });

    return list;
  }, [answers, questions, isReviewEnabled]);

  const blankItems = useMemo(() => {
    if (!questions.length || !isReviewEnabled) return [];

    const list = [];

    questions.forEach((q, idx) => {
      const chosen = answers[q.id];

      if (!chosen) {
        list.push({
          index: idx + 1,
          id: q.id,
          pregunta: q.pregunta,
          correct: q.correcta,
          opciones: q.opciones,
        });
      }
    });

    return list;
  }, [answers, questions, isReviewEnabled]);

  const finishExam = async () => {
    setExamLocked(true);
    stopTimer();
    setStep("result");

    if (savedRef.current) return;
    savedRef.current = true;

    try {
      await saveSimuladorAttempt({
        ok: score.ok,
        total: score.total,
        fail: score.fail,
        blank: score.blank,
        finalScore: score.finalScore,
        mode: preset,
      });
    } catch {}

    if (isDemo && typeof onRegisterDemoAttempt === "function") {
      try {
        await onRegisterDemoAttempt();
      } catch {}
    }
  };

  useEffect(() => {
    return () => stopTimer();
  }, []);

  return (
    <Page>
      <Shell>
        {/* <TopBar>
        

          <TimerPill>{step === "exam" ? formatTime(remaining) : ""}</TimerPill>
        </TopBar> */}

        <Content>
          {step === "locked" && (
            <>
              <HeroTitle>Simulador de examen</HeroTitle>

              <HeroSub>
                Ya has completado los intentos disponibles del simulador DEMO.
                Puedes mantener el mismo formato de práctica desbloqueando la
                versión completa.
              </HeroSub>

              <Card>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    lineHeight: 1.35,
                    marginBottom: 10,
                  }}
                >
                  Tu experiencia DEMO ha terminado
                </div>

                <div
                  style={{
                    color: "rgba(255,255,255,0.82)",
                    fontSize: "0.98rem",
                    lineHeight: 1.7,
                    maxWidth: 900,
                  }}
                >
                  Con Academia PRO podrás continuar con simuladores de 15, 30 y
                  60 preguntas, acceder a corrección detallada, practicar con una
                  experiencia más completa y seguir tu progreso con más profundidad.
                </div>

                <Divider />

                <Row>
                  <CTA onClick={() => onUpgrade && onUpgrade()}>
                    Desbloquear PRO
                  </CTA>
                  <Ghost onClick={resetAll}>Volver</Ghost>
                </Row>
              </Card>
            </>
          )}

          {step === "select" && (
            <>
              <HeroTitle>📝 Simulador de examen</HeroTitle>

              <HeroSub>
                Entrena con el mismo enfoque mental del examen municipal de taxi.
                Elige el tipo de simulación según tu momento de estudio: aprender,
                consolidar o vivir una experiencia completa de examen real.
              </HeroSub>

              <Card style={{ marginBottom: 18 }}>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.04rem",
                    lineHeight: 1.3,
                    marginBottom: 10,
                  }}
                >
                  Cómo funciona este simulador
                </div>

                <div
                  style={{
                    color: "rgba(255,255,255,0.82)",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    maxWidth: 980,
                  }}
                >
                  El examen se basa en preguntas tipo test con una única respuesta
                  correcta. En este entrenamiento aplicamos el criterio de corrección
                  real:
                </div>

                <div
                  style={{
                    marginTop: 14,
                    display: "grid",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: 14,
                      background: "rgba(16,163,127,0.10)",
                      border: "1px solid rgba(16,163,127,0.22)",
                      color: "rgba(255,255,255,0.92)",
                      fontWeight: 600,
                      lineHeight: 1.55,
                    }}
                  >
                    ✔ Cada acierto suma <strong>1 punto</strong>
                  </div>

                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: 14,
                      background: "rgba(255,200,61,0.08)",
                      border: "1px solid rgba(255,200,61,0.18)",
                      color: "rgba(255,255,255,0.92)",
                      fontWeight: 600,
                      lineHeight: 1.55,
                    }}
                  >
                    ✔ Cada error resta <strong>0,33 puntos</strong>
                  </div>

                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.88)",
                      fontWeight: 600,
                      lineHeight: 1.55,
                    }}
                  >
                    ✔ Las respuestas en blanco <strong>no puntúan</strong>
                  </div>
                </div>

                <Divider />

                <div
                  style={{
                    color: "rgba(255,255,255,0.84)",
                    fontSize: "0.98rem",
                    lineHeight: 1.7,
                    maxWidth: 980,
                  }}
                >
                  En los modos de <strong>15</strong> y <strong>30 preguntas</strong>{" "}
                  recibirás corrección detallada para aprender. En el modo de{" "}
                  <strong>60 preguntas</strong> vivirás una simulación más fiel al
                  examen real: al finalizar verás solo tu puntuación final.
                </div>

                {isDemo && (
                  <>
                    <Divider />
                    <div
                      style={{
                        color: "rgba(255,255,255,0.84)",
                        fontSize: "0.98rem",
                        lineHeight: 1.7,
                        maxWidth: 980,
                      }}
                    >
                      En la versión DEMO puedes realizar el simulador de{" "}
                      <strong>15 preguntas</strong>. Los modos de{" "}
                      <strong>30</strong> y <strong>60 preguntas</strong> aparecen
                      visibles para que conozcas el sistema completo, pero están
                      bloqueados.
                    </div>
                  </>
                )}
              </Card>

              <Card>
                <Row>
                  {ALL_PRESETS.map((item) => {
                    const isAvailable = availableOptions.includes(item.value);
                    const isActive = preset === item.value;

                    return (
                      <Chip
                        key={item.value}
                        active={isActive}
                        disabled={!isAvailable}
                        onClick={() => {
                          if (isAvailable) {
                            setPreset(item.value);
                          } else if (isDemo && onUpgrade) {
                            onUpgrade();
                          }
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: 4,
                          minWidth: 190,
                          opacity: isAvailable ? 1 : 0.55,
                          cursor: isAvailable ? "pointer" : "not-allowed",
                        }}
                      >
                        <span style={{ fontWeight: 800, fontSize: "1rem" }}>
                          {item.title}
                          {!isAvailable ? " 🔒" : ""}
                        </span>

                        <span
                          style={{
                            fontSize: "0.84rem",
                            lineHeight: 1.2,
                            opacity: isActive ? 0.92 : 0.82,
                            fontWeight: 700,
                          }}
                        >
                          {item.subtitle}
                        </span>
                      </Chip>
                    );
                  })}
                </Row>

                {activePresetMeta && (
                  <>
                    <Divider />

                    <div
                      style={{
                        padding: 14,
                        borderRadius: 16,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "1rem",
                          marginBottom: 6,
                          lineHeight: 1.3,
                        }}
                      >
                        {activePresetMeta.title} · {activePresetMeta.subtitle}
                      </div>

                      <div
                        style={{
                          color: "rgba(255,255,255,0.80)",
                          fontSize: "0.98rem",
                          lineHeight: 1.65,
                          maxWidth: 860,
                        }}
                      >
                        {activePresetMeta.description}
                      </div>
                    </div>
                  </>
                )}

                <Divider />

                {isDemo ? (
                  <>
                    <Row>
                      <CTA
                        onClick={buildExam}
                        disabled={isLocked || attemptsLeft <= 0}
                      >
                        {isLocked || attemptsLeft <= 0
                          ? "Intentos DEMO agotados"
                          : "Comenzar simulador DEMO"}
                      </CTA>

                      <Ghost onClick={resetAll}>Volver</Ghost>
                    </Row>

                    <div
                      style={{
                        marginTop: 18,
                        color: "rgba(255,255,255,0.86)",
                        fontSize: "0.98rem",
                        lineHeight: 1.6,
                      }}
                    >
                      Intentos disponibles: <strong>{attemptsLeft}</strong> de{" "}
                      <strong>{totalAttempts}</strong>
                    </div>

                    <div
                      style={{
                        marginTop: 8,
                        color: "rgba(255,255,255,0.68)",
                        fontSize: "0.9rem",
                        lineHeight: 1.55,
                      }}
                    >
                      Tu progreso quedará guardado en tu cuenta gratuita.
                    </div>
                  </>
                ) : (
                  <Row>
                    <CTA onClick={buildExam}>Comenzar examen</CTA>
                    <Ghost onClick={resetAll}>Volver</Ghost>
                  </Row>
                )}
              </Card>
            </>
          )}

          {step === "exam" && currentQ && (
            <>
              <Card>
                {isDemo && (
                  <div
                    style={{
                      marginBottom: 8,
                      color: "#10a37f",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    Te quedan {attemptsLeft} intentos DEMO
                  </div>
                )}

                <QMeta>
                  <QIndex>
                    Pregunta {current + 1} / {questions.length}
                  </QIndex>

                  <QMetaRight>
                    Respondidas: {answeredCount}/{questions.length}
                  </QMetaRight>
                </QMeta>

                <QText>{currentQ.pregunta}</QText>

                <Divider />

                <Options>
                  {["A", "B", "C"].map((letter) => (
                    <Option
                      key={`${currentQ.id}_${letter}`}
                      selected={answers[currentQ.id] === letter}
                      onClick={() => choose(currentQ.id, letter)}
                    >
                      <strong style={{ marginRight: 10 }}>{letter}.</strong>
                      {currentQ.opciones[letter]}
                    </Option>
                  ))}
                </Options>

                <Progress aria-label="progress">
                  <ProgressFill value={progress} />
                </Progress>

                <Footer>
                  <Ghost onClick={goPrev} disabled={current === 0}>
                    ← Anterior
                  </Ghost>

                  {current < questions.length - 1 ? (
                    <Ghost onClick={goNext}>Siguiente →</Ghost>
                  ) : (
                    <CTA onClick={finishExam}>Finalizar examen</CTA>
                  )}
                </Footer>
              </Card>

              <Row style={{ marginTop: 16, justifyContent: "flex-end" }}>
                <Ghost onClick={resetAll}>Reiniciar</Ghost>
                <CTA onClick={finishExam}>Finalizar examen</CTA>
              </Row>
            </>
          )}

          {step === "result" && (
            <>
              <HeroTitle>
                {preset === 60 ? "Resultado del examen real" : "Corrección final"}
              </HeroTitle>

              <HeroSub>
                {preset === 60
                  ? "Has completado la simulación completa. Aquí solo verás tu resultado final, como referencia real de examen."
                  : "Has completado el simulador. Revisa tu puntuación y analiza los errores para seguir mejorando."}
              </HeroSub>

              <Card>
                <Row style={{ alignItems: "stretch" }}>
                  <div
                    style={{
                      flex: "1 1 220px",
                      minWidth: 220,
                      padding: 16,
                      borderRadius: 16,
                      background: "rgba(16,163,127,0.10)",
                      border: "1px solid rgba(16,163,127,0.20)",
                    }}
                  >
                    <div
                      style={{
                        color: "rgba(255,255,255,0.74)",
                        fontWeight: 600,
                        fontSize: "0.92rem",
                        marginBottom: 6,
                      }}
                    >
                      Aciertos
                    </div>

                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "1.5rem",
                        lineHeight: 1.1,
                      }}
                    >
                      {score.ok}
                    </div>
                  </div>

                  <div
                    style={{
                      flex: "1 1 220px",
                      minWidth: 220,
                      padding: 16,
                      borderRadius: 16,
                      background: "rgba(255,91,91,0.08)",
                      border: "1px solid rgba(255,91,91,0.16)",
                    }}
                  >
                    <div
                      style={{
                        color: "rgba(255,255,255,0.74)",
                        fontWeight: 600,
                        fontSize: "0.92rem",
                        marginBottom: 6,
                      }}
                    >
                      Fallos
                    </div>

                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "1.5rem",
                        lineHeight: 1.1,
                      }}
                    >
                      {score.fail}
                    </div>
                  </div>

                  <div
                    style={{
                      flex: "1 1 220px",
                      minWidth: 220,
                      padding: 16,
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        color: "rgba(255,255,255,0.74)",
                        fontWeight: 600,
                        fontSize: "0.92rem",
                        marginBottom: 6,
                      }}
                    >
                      En blanco
                    </div>

                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "1.5rem",
                        lineHeight: 1.1,
                      }}
                    >
                      {score.blank}
                    </div>
                  </div>

                  <div
                    style={{
                      flex: "1 1 260px",
                      minWidth: 240,
                      padding: 16,
                      borderRadius: 16,
                      background: "rgba(255,200,61,0.08)",
                      border: "1px solid rgba(255,200,61,0.18)",
                    }}
                  >
                    <div
                      style={{
                        color: "rgba(255,255,255,0.74)",
                        fontWeight: 600,
                        fontSize: "0.92rem",
                        marginBottom: 6,
                      }}
                    >
                      Puntuación final
                    </div>

                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "1.5rem",
                        lineHeight: 1.1,
                      }}
                    >
                      {formatScore(score.finalScore)}
                    </div>

                    <div
                      style={{
                        marginTop: 8,
                        color: "rgba(255,255,255,0.72)",
                        fontSize: "0.88rem",
                        lineHeight: 1.45,
                      }}
                    >
                      Cálculo: {score.ok} - ({score.fail} × 0,33)
                    </div>
                  </div>
                </Row>

                {isReviewEnabled && (wrongItems.length > 0 || blankItems.length > 0) && (
                  <>
                    <Divider />

                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "1.04rem",
                        marginBottom: 12,
                        lineHeight: 1.35,
                      }}
                    >
                      Repaso de preguntas no acertadas
                    </div>

                    {wrongItems.length > 0 && (
                      <div style={{ display: "grid", gap: 12 }}>
                        {wrongItems.map((item) => (
                          <div
                            key={`wrong_${item.id}`}
                            style={{
                              border: "1px solid rgba(255,255,255,0.10)",
                              borderRadius: 14,
                              padding: 14,
                              background: "rgba(0,0,0,0.12)",
                            }}
                          >
                            <div
                              style={{
                                color: "rgba(255,255,255,0.70)",
                                fontWeight: 700,
                                fontSize: "0.92rem",
                              }}
                            >
                              Pregunta {item.index}
                            </div>

                            <div
                              style={{
                                color: "#fff",
                                fontWeight: 650,
                                marginTop: 8,
                                lineHeight: 1.6,
                                fontSize: "1rem",
                              }}
                            >
                              {item.pregunta}
                            </div>

                            <div
                              style={{
                                marginTop: 12,
                                color: "rgba(255,255,255,0.80)",
                                fontWeight: 600,
                                lineHeight: 1.65,
                                fontSize: "0.96rem",
                              }}
                            >
                              Tu respuesta:{" "}
                              <span style={{ color: "#fff" }}>
                                {item.chosen}. {item.opciones?.[item.chosen]}
                              </span>
                            </div>

                            <div
                              style={{
                                marginTop: 6,
                                color: "rgba(255,255,255,0.80)",
                                fontWeight: 600,
                                lineHeight: 1.65,
                                fontSize: "0.96rem",
                              }}
                            >
                              Correcta:{" "}
                              <span style={{ color: "#FFC83D", fontWeight: 700 }}>
                                {item.correct}. {item.opciones?.[item.correct]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {blankItems.length > 0 && (
                      <>
                        <div
                          style={{
                            marginTop: 18,
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "1rem",
                            lineHeight: 1.35,
                          }}
                        >
                          Preguntas dejadas en blanco
                        </div>

                        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                          {blankItems.map((item) => (
                            <div
                              key={`blank_${item.id}`}
                              style={{
                                border: "1px solid rgba(255,255,255,0.10)",
                                borderRadius: 14,
                                padding: 14,
                                background: "rgba(255,255,255,0.03)",
                              }}
                            >
                              <div
                                style={{
                                  color: "rgba(255,255,255,0.70)",
                                  fontWeight: 700,
                                  fontSize: "0.92rem",
                                }}
                              >
                                Pregunta {item.index}
                              </div>

                              <div
                                style={{
                                  color: "#fff",
                                  fontWeight: 650,
                                  marginTop: 8,
                                  lineHeight: 1.6,
                                  fontSize: "1rem",
                                }}
                              >
                                {item.pregunta}
                              </div>

                              <div
                                style={{
                                  marginTop: 12,
                                  color: "rgba(255,255,255,0.80)",
                                  fontWeight: 600,
                                  lineHeight: 1.65,
                                  fontSize: "0.96rem",
                                }}
                              >
                                Respuesta correcta:{" "}
                                <span style={{ color: "#FFC83D", fontWeight: 700 }}>
                                  {item.correct}. {item.opciones?.[item.correct]}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}

                {preset === 60 && !isDemo && (
                  <>
                    <Divider />

                    <div
                      style={{
                        padding: 16,
                        borderRadius: 16,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "1rem",
                          marginBottom: 6,
                        }}
                      >
                        Modo examen real completado
                      </div>

                      <div
                        style={{
                          color: "rgba(255,255,255,0.80)",
                          fontSize: "0.98rem",
                          lineHeight: 1.65,
                          maxWidth: 880,
                        }}
                      >
                        En esta modalidad no se muestran las respuestas falladas
                        ni la corrección pregunta a pregunta. El objetivo es que
                        vivas una experiencia más cercana al examen real y evalúes
                        tu rendimiento final con mayor exigencia.
                      </div>
                    </div>
                  </>
                )}

                {isDemo && (
                  <>
                    <Divider />

                    <div
                      style={{
                        padding: 16,
                        borderRadius: 16,
                        background: "rgba(16,163,127,0.08)",
                        border: "1px solid rgba(16,163,127,0.18)",
                      }}
                    >
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "1rem",
                          marginBottom: 6,
                        }}
                      >
                        Has completado el simulador DEMO
                      </div>

                      <div
                        style={{
                          color: "rgba(255,255,255,0.82)",
                          fontSize: "0.98rem",
                          lineHeight: 1.65,
                          maxWidth: 880,
                        }}
                      >
                        Ya conoces el formato real del simulador. Desbloquea PRO
                        para acceder a 30 preguntas, 60 preguntas y una experiencia
                        completa de entrenamiento.
                      </div>
                    </div>
                  </>
                )}

                <Divider />

                <Row>
                  {isDemo ? (
                    <>
                      <CTA onClick={() => onUpgrade && onUpgrade()}>
                        Desbloquear PRO
                      </CTA>
                      <Ghost onClick={resetAll}>Volver a intentar DEMO</Ghost>
                    </>
                  ) : (
                    <>
                      <CTA onClick={resetAll}>Nuevo examen</CTA>
                      <Ghost onClick={resetAll}>Volver a selección</Ghost>
                    </>
                  )}
                </Row>
              </Card>
            </>
          )}
        </Content>
      </Shell>
    </Page>
  );
}