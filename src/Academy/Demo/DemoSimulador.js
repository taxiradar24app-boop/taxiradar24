// ======================================================
// 📘 DemoSimulador.js
// Simulador DEMO – 15 preguntas reales con límite de intentos
// ======================================================

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import useDemoSimulador from "./../../hooks/UseDemoSimulador";
import getExamQuestions from "./../Pro/SimuladorExamen/logic/getModuleQuestions";
import DemoUnlockBar from "./DemoUnlockBar";
import {
  Page,
  Shell,
  Content,
  Title,
  Subtitle,
  Card,
  Row,
  Chip,
  QuestionBox,
  QuestionIndex,
  QuestionText,
  Options,
  Option,
  Footer,
  CTABox,
  CTAButton,
} from "./DemoSimuladorStyle";

const DEMO_LIMIT = 15;

export default function DemoSimulador() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const uid = user?.uid || null;

  const {
    remainingAttempts,
    maxAttempts,
    loadingDemo,
    isLocked,
    registerAttempt,
  } = useDemoSimulador(uid);

  const [step, setStep] = useState("select"); // select | exam | result | locked
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const score = useMemo(() => {
    let ok = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correcta) ok++;
    });
    return ok;
  }, [answers, questions]);

  const startDemo = () => {
    if (!user) {
      navigate("/login", {
        state: {
          from: "/academia/demo/simulador",
          reason: "demo",
        },
      });
      return;
    }

    if (isLocked || remainingAttempts <= 0) {
      setStep("locked");
      return;
    }

    const qs = getExamQuestions(DEMO_LIMIT);
    setQuestions(qs);
    setAnswers({});
    setCurrent(0);
    setStep("exam");
  };

  const choose = (qid, letter) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: letter,
    }));
  };

  const finishDemo = async () => {
    await registerAttempt();
    setStep("result");
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((p) => p + 1);
    } else {
      finishDemo();
    }
  };

  const resetDemo = () => {
    setQuestions([]);
    setAnswers({});
    setCurrent(0);
    setStep("select");
  };

  const currentQ = questions[current];

  if (loadingDemo) return null;

  return (
    <Page>
      <Shell>
        <Content>
          {step === "locked" && (
            <>
              <Title>Simulador DEMO</Title>

              <Subtitle>
                Ya has completado los intentos disponibles del simulador DEMO.
              </Subtitle>

              <CTABox>
                <p>
                  Accede a <strong>Academia PRO</strong> para entrenar sin
                  límites, con corrección completa y cronómetro real.
                </p>

                <CTAButton onClick={() => navigate("/academia/upgrade")}>
                  Desbloquear Academia PRO
                </CTAButton>
              </CTABox>
            </>
          )}

          {step === "select" && (
            <>
              <Title>📝 Simulador de examen</Title>

              <Subtitle>
                Entrena con un simulador real basado en preguntas oficiales del
                examen de taxi.
              </Subtitle>

              <Card>
                <p style={{ lineHeight: 1.6 }}>
                  🔹 Practicar con simuladores es una de las formas más eficaces
                  de preparar el examen municipal de taxi.
                  <br />
                  <br />
                  🔹 En esta versión DEMO podrás realizar un simulador de{" "}
                  <strong>15 preguntas reales</strong> basadas en convocatorias
                  anteriores.
                  <br />
                  <br />
                  🔹 Para ofrecerte una experiencia completa, te pediremos{" "}
                  <strong>crear una cuenta gratuita</strong>.
                  <br />
                  <br />
                  Esto nos permite:
                  <br />
                  • Guardar tus resultados
                  <br />
                  • Ofrecerte hasta <strong>{maxAttempts} intentos</strong> de
                  práctica
                  <br />
                  • Mostrar tu progreso de aprendizaje
                  <br />
                  <br />
                  Así podrás ver cómo mejoras antes de presentarte al examen
                  real.
                </p>
              </Card>

              <Card>
                <Row>
                  <Chip active>15 preguntas (DEMO)</Chip>
                  <Chip disabled>30 preguntas 🔒</Chip>
                  <Chip disabled>45 preguntas 🔒</Chip>
                  <Chip disabled>60 preguntas 🔒</Chip>
                </Row>

                <Footer>
                  <DemoUnlockBar
                    attemptsLeft={remainingAttempts}
                    totalAttempts={maxAttempts}
                    onStart={startDemo}
                    buttonText="Empezar simulador gratuito"
                    infoText="Tu progreso quedará guardado en tu cuenta gratuita."
                  />
                </Footer>
              </Card>
            </>
          )}

          {step === "exam" && currentQ && (
            <QuestionBox>
              {!isLocked && (
                <div
                  style={{
                    marginBottom: "6px",
                    fontSize: "0.85rem",
                    fontWeight: 900,
                    color: "#10a37f",
                  }}
                >
                  Te quedan {remainingAttempts} intentos DEMO
                </div>
              )}

              <QuestionIndex>
                Pregunta {current + 1} / {questions.length}
              </QuestionIndex>

              <QuestionText>{currentQ.pregunta}</QuestionText>

              <Options>
                {["A", "B", "C"].map((l) => (
                  <Option
                    key={l}
                    selected={answers[currentQ.id] === l}
                    onClick={() => choose(currentQ.id, l)}
                  >
                    <strong>{l}.</strong> {currentQ.opciones[l]}
                  </Option>
                ))}
              </Options>

              <Footer>
                <CTAButton onClick={next}>
                  {current < questions.length - 1
                    ? "Siguiente"
                    : "Finalizar examen"}
                </CTAButton>
              </Footer>
            </QuestionBox>
          )}

          {step === "result" && (
            <>
              <Title>Resultado DEMO</Title>

              <Subtitle>
                Has acertado <strong>{score}</strong> de{" "}
                <strong>{questions.length}</strong> preguntas.
              </Subtitle>

              <CTABox>
                <p>
                  En la versión <strong>Academia PRO</strong> podrás:
                </p>

                <ul>
                  <li>✔ Exámenes de 30, 45 y 60 preguntas</li>
                  <li>✔ Corrección completa pregunta a pregunta</li>
                  <li>✔ Cronómetro real de examen</li>
                  <li>✔ Seguimiento de progreso</li>
                </ul>

                {remainingAttempts > 0 && (
                  <DemoUnlockBar
                    attemptsLeft={remainingAttempts}
                    totalAttempts={maxAttempts}
                    onStart={startDemo}
                    buttonText="Volver a intentar simulador DEMO"
                    infoText="Aún te quedan intentos para seguir practicando."
                  />
                )}

                <CTAButton onClick={() => navigate("/academia/upgrade")}>
                  Desbloquear Academia PRO
                </CTAButton>

                <CTAButton secondary onClick={resetDemo}>
                  Volver al inicio
                </CTAButton>
              </CTABox>
            </>
          )}
        </Content>
      </Shell>
    </Page>
  );
}