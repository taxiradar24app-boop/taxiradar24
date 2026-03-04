// ======================================================================
// ✅ SimuladorExamen.js — v2 (Selección → Examen → Corrección)
// + Review de fallos SOLO en 15 y 30 preguntas
// ======================================================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import BotonSolLuna from "@/components/BotonSolLuna";
import BackButton from "@/components/Buttons/BackButton";

import getExamQuestions from "./logic/getModuleQuestions";
import { saveSimuladorAttempt } from "./logic/saveProgress";

import {
  Page,
  Shell,
  TopBar,
  BrandTitle,
  TimerPill,
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
} from "./SimuladorV2Style";

const PRESETS = [15, 30, 45, 60];

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function SimuladorExamen() {
  const [step, setStep] = useState("select");

  const [preset, setPreset] = useState(15);

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);

  const [remaining, setRemaining] = useState(0);
  const timerRef = useRef(null);

  const savedRef = useRef(false);

  // ✅ Review solo en 15/30
  const isReviewEnabled = preset === 15 || preset === 30;

  const currentQ = questions[current];

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return Math.round((answeredCount / questions.length) * 100);
  }, [answeredCount, questions.length]);

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startTimer = (seconds) => {
    stopTimer();
    setRemaining(seconds);

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
  };

  const resetAll = () => {
    stopTimer();
    setQuestions([]);
    setCurrent(0);
    setAnswers({});
    setLocked(false);
    setRemaining(0);
    setStep("select");
    savedRef.current = false;
  };

  const buildExam = () => {
    const qs = getExamQuestions(preset);
    setQuestions(qs);
    setCurrent(0);
    setAnswers({});
    setLocked(false);
    savedRef.current = false;

    startTimer(preset * 60);
    setStep("exam");
  };

  const choose = (qid, optionLetter) => {
    if (locked) return;
    setAnswers((prev) => ({ ...prev, [qid]: optionLetter }));
  };

  const goNext = () => {
    if (current < questions.length - 1) setCurrent((p) => p + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent((p) => p - 1);
  };

  const score = useMemo(() => {
    if (!questions.length) return { ok: 0, fail: 0, blank: 0, total: 0 };
    let ok = 0;
    let fail = 0;
    let blank = 0;

    questions.forEach((q) => {
      const a = answers[q.id];
      if (!a) blank += 1;
      else if (a === q.correcta) ok += 1;
      else fail += 1;
    });

    return { ok, fail, blank, total: questions.length };
  }, [answers, questions]);

  // ✅ Lista de fallos (para review 15/30)
  const wrongItems = useMemo(() => {
    if (!questions.length) return [];
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
  }, [answers, questions]);

  const finishExam = () => {
    if (locked) return;

    setLocked(true);
    stopTimer();
    setStep("result");

    if (savedRef.current) return;
    savedRef.current = true;

    saveSimuladorAttempt({
      ok: score.ok,
      total: score.total,
      fail: score.fail,
      blank: score.blank,
    });
  };

  useEffect(() => {
    return () => stopTimer();
  }, []);

  return (
    <Page>
      <Shell>
        <TopBar>
          <BackButton
            onClick={() => (step === "select" ? window.history.back() : resetAll())}
          />
          <BrandTitle>Simulador de Examen · Palma</BrandTitle>
          <Row style={{ justifyContent: "flex-end" }}>
            <TimerPill>{step === "exam" ? formatTime(remaining) : "—:—"}</TimerPill>
            <BotonSolLuna />
          </Row>
        </TopBar>

        <Content>
          {/* 1) SELECCIÓN */}
          {step === "select" && (
            <>
              <HeroTitle>Simulador de Examen</HeroTitle>
              <HeroSub>
                Entrena como en el examen real: elige el número de preguntas, inicia el
                temporizador y corrige al final. Las preguntas se seleccionan aleatoriamente del
                banco completo.
              </HeroSub>

              <Card>
                <Row>
                  {PRESETS.map((n) => (
                    <Chip key={n} active={preset === n} onClick={() => setPreset(n)}>
                      {n} preguntas
                    </Chip>
                  ))}
                </Row>

                <Divider />

                <Row>
                  <CTA onClick={buildExam}>Comenzar examen</CTA>
                  <Ghost onClick={() => window.history.back()}>Volver</Ghost>
                </Row>
              </Card>
            </>
          )}

          {/* 2) EXAMEN */}
          {step === "exam" && currentQ && (
            <>
              <Card>
                <QMeta>
                  <QIndex>
                    Pregunta {current + 1} / {questions.length}
                  </QIndex>

                  {/* ✅ UX: respeta estilos existentes */}
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
                      <strong style={{ marginRight: 10 }}>{letter}.</strong>{" "}
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

          {/* 3) CORRECCIÓN FINAL */}
          {step === "result" && (
            <>
              <HeroTitle>Corrección final</HeroTitle>
              <HeroSub>
                Resultado del examen. Puedes repetir con nuevas preguntas aleatorias o volver al
                inicio.
              </HeroSub>

              <Card>
                <Row>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: "1.05rem" }}>
                    Aciertos: {score.ok} / {score.total}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
                    Fallos: {score.fail} · En blanco: {score.blank}
                  </div>
                </Row>

                {/* ✅ Review de fallos SOLO para 15/30 */}
                {isReviewEnabled && wrongItems.length > 0 && (
                  <>
                    <Divider />
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: "1.02rem" }}>
                      Errores para repasar ({wrongItems.length})
                    </div>

                    <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                      {wrongItems.map((w) => (
                        <div
                          key={w.id}
                          style={{
                            border: "1px solid rgba(255,255,255,0.10)",
                            borderRadius: 14,
                            padding: 14,
                            background: "rgba(0,0,0,0.12)",
                          }}
                        >
                          <div style={{ color: "rgba(255,255,255,0.70)", fontWeight: 600 }}>
                            Pregunta {w.index}
                          </div>

                          <div
                            style={{
                              color: "#fff",
                              fontWeight: 650,
                              marginTop: 6,
                              lineHeight: 1.55,
                            }}
                          >
                            {w.pregunta}
                          </div>

                          <div
                            style={{
                              marginTop: 10,
                              color: "rgba(255,255,255,0.80)",
                              fontWeight: 600,
                              lineHeight: 1.6,
                            }}
                          >
                            Tu respuesta:{" "}
                            <span style={{ color: "#fff" }}>
                              {w.chosen}. {w.opciones?.[w.chosen]}
                            </span>
                          </div>

                          <div
                            style={{
                              marginTop: 6,
                              color: "rgba(255,255,255,0.80)",
                              fontWeight: 600,
                              lineHeight: 1.6,
                            }}
                          >
                            Correcta:{" "}
                            <span style={{ color: "#FFC83D", fontWeight: 650 }}>
                              {w.correct}. {w.opciones?.[w.correct]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <Divider />

                <Row>
                  <CTA onClick={resetAll}>Nuevo examen</CTA>
                  <Ghost onClick={resetAll}>Volver a selección</Ghost>
                </Row>
              </Card>
            </>
          )}
        </Content>
      </Shell>
    </Page>
  );
}