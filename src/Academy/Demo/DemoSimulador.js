// ======================================================
// 📘 DemoSimulador.js
// Simulador DEMO – 15 preguntas reales con límite de intentos
// ======================================================

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import useDemoSimulador from "./../../hooks/UseDemoSimulador";
import getExamQuestions from "./../Pro/SimuladorExamen/logic/getModuleQuestions";

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

  // 🔑 Hook DEMO con uid (CLAVE)
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

  // ======================================================
  // 📊 Score
  // ======================================================
  const score = useMemo(() => {
    let ok = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correcta) ok++;
    });
    return ok;
  }, [answers, questions]);

  // ======================================================
  // ▶️ Iniciar DEMO
  // ======================================================
  const startDemo = () => {
  // 🔐 1. Si NO hay usuario → pedir registro/login
  if (!user) {
    navigate("/login", {
      state: {
        from: "/academia/demo/simulador",
        reason: "demo",
      },
    });
    return;
  }

  // 🔒 2. Si alcanzó el límite DEMO
  if (isLocked) {
    setStep("locked");
    return;
  }

  // ▶️ 3. Usuario FREE (o PRO) → iniciar DEMO
  const qs = getExamQuestions(DEMO_LIMIT);

  setQuestions(qs);
  setAnswers({});
  setCurrent(0);
  setStep("exam");
};


  // ======================================================
  // 📝 Responder
  // ======================================================
  const currentQ = questions[current];

  const choose = (qid, letter) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: letter,
    }));
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((p) => p + 1);
    } else {
      finishDemo();
    }
  };

  // ======================================================
  // 🏁 Finalizar DEMO (AQUÍ se cuenta el intento)
  // ======================================================
  const finishDemo = async () => {
    await registerAttempt();
    setStep("result");
  };

  const resetDemo = () => {
    setQuestions([]);
    setAnswers({});
    setCurrent(0);
    setStep("select");
  };

  if (loadingDemo) return null;

  return (
    <Page>
      <Shell>
        <Content>

          {/* ================= BLOQUEADO ================= */}
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

          {/* ================= SELECT ================= */}
          {step === "select" && (
            <>
              <Title>Simulador de examen (DEMO)</Title>

              <Subtitle>
                Entrena con un simulador real basado en preguntas oficiales del
                examen de taxi.
              </Subtitle>

              <Card>
                <p style={{ lineHeight: 1.6 }}>
                  🔹 Practicar exámenes <strong>por bloques de preguntas</strong>{" "}
                  es una de las mejores formas de afianzar conceptos y detectar
                  errores habituales.
                  <br /><br />
                  🔹 En la <strong>Academia PRO</strong> podrás realizar exámenes
                  completos con <strong>tiempo limitado</strong>, como en el
                  examen oficial.
                  <br /><br />
                  🔹 Preguntas basadas en{" "}
                  <strong>exámenes reales de convocatorias anteriores</strong>,
                  revisadas y actualizadas.
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
                  <CTAButton onClick={startDemo}>
                    Comenzar simulador DEMO
                  </CTAButton>
                </Footer>
              </Card>
            </>
          )}

{/* ================= EXAM ================= */}
{step === "exam" && currentQ && (
  <QuestionBox>

    {!isLocked && (
      <div
        style={{
          marginBottom: "6px",
          fontSize: "0.85rem",
          fontWeight: 1000,
          color: "blueDeep",
        }}
      >
        Te quedan - {remainingAttempts} - intentos DEMO
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


          {/* ================= RESULT ================= */}
          {step === "result" && (
            <>
              <Title>Resultado DEMO</Title>

              <Subtitle>
                Has acertado <strong>{score}</strong> de{" "}
                <strong>{questions.length}</strong> preguntas.
              </Subtitle>

              <CTABox>
                <p>En la versión <strong>Academia PRO</strong> podrás:</p>

                <ul>
                  <li>✔ Exámenes de 30, 45 y 60 preguntas</li>
                  <li>✔ Corrección completa pregunta a pregunta</li>
                  <li>✔ Cronómetro real de examen</li>
                  <li>✔ Seguimiento de progreso</li>
                </ul>

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

