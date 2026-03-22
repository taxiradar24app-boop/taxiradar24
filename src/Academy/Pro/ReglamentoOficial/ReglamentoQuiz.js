// src/Academy/Pro/ReglamentoOficial/ReglamentoQuiz.js
// ======================================================
// 📘 ReglamentoQuiz.js
// Lógica del quiz (PRO / DEMO)
// ======================================================

import React, { useState } from "react";

import {
  QuizWrapper,
  QuizTitle,
  QuizSubTitle,
  QuestionBox,
  QuestionText,
  Option,
  ResultBox,
  FinishButton,
  RetryButton,
} from "./ReglamentoQuizStyle";

/**
 * ReglamentoQuiz
 * @param quiz       → datos del quiz
 * @param onFinish   → callback al finalizar
 * @param onGoTop    → callback opcional para subir al bloque superior
 * @param mode       → "pro" | "demo"
 */
export default function ReglamentoQuiz({
  quiz,
  onFinish,
  onGoTop,
  mode = "pro",
}) {
  const isDemo = mode === "demo";

  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  if (!quiz) return null;

  const handleSelect = (qIndex, optionIndex) => {
    if (finished) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const correctCount = quiz.questions.reduce((acc, q, i) => {
    if (answers[i] === undefined) return acc;
    return acc + (Number(answers[i]) === Number(q.correct) ? 1 : 0);
  }, 0);

  const total = quiz.questions.length;
  const wrongCount = total - correctCount;
  const passed = correctCount >= quiz.minToPass;
  const allAnswered = Object.keys(answers).length === quiz.questions.length;

  const fallbackScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFinish = () => {
    if (!allAnswered) return;

    setFinished(true);

    const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    const result = {
      total,
      correct: correctCount,
      wrong: wrongCount,
      score,
      passed,
      minToPass: quiz.minToPass,
      mode,
      finishedAt: new Date().toISOString(),
      isDemo,
    };

    onFinish?.(result);

    setTimeout(() => {
      if (typeof onGoTop === "function") {
        onGoTop();
      } else {
        fallbackScrollTop();
      }
    }, 450);
  };

  const resetQuiz = () => {
    setAnswers({});
    setFinished(false);

    setTimeout(() => {
      if (typeof onGoTop === "function") {
        onGoTop();
      } else {
        fallbackScrollTop();
      }
    }, 120);
  };

  const handleGoTop = () => {
    if (typeof onGoTop === "function") {
      onGoTop();
    } else {
      fallbackScrollTop();
    }
  };

  return (
    <QuizWrapper>
      <QuizTitle>📝 Preguntas de comprobación</QuizTitle>

      {quiz.questions.map((q, qIndex) => (
        <QuestionBox key={q.id || qIndex}>
          <QuestionText>
            {qIndex + 1}. {q.question}
          </QuestionText>

          {q.options.map((opt, oIndex) => (
            <Option
              key={oIndex}
              type="button"
              selected={answers[qIndex] === oIndex}
              onClick={() => handleSelect(qIndex, oIndex)}
            >
              {opt}
            </Option>
          ))}
        </QuestionBox>
      ))}

      {!finished && (
        <>
          <QuizSubTitle>
            Responde a todas las preguntas del cuestionario para completar la
            evaluación.
          </QuizSubTitle>

          <FinishButton
            type="button"
            onClick={handleFinish}
            disabled={!allAnswered}
          >
            Finalizar evaluación
          </FinishButton>
        </>
      )}

      {finished && (
        <ResultBox success={passed}>
          Resultado: {correctCount}/{quiz.questions.length} —{" "}
          {passed ? "✅ Bloque superado" : "⚠️ Recomendado repetir el bloque"}

          {passed && (
            <div style={{ marginTop: "16px" }}>
              <FinishButton type="button" onClick={handleGoTop}>
                Finalizar y volver al bloque
              </FinishButton>
            </div>
          )}

          {!passed && (
            <div style={{ marginTop: "12px" }}>
              <RetryButton type="button" onClick={resetQuiz}>
                🔁 Rehacer el examen
              </RetryButton>
            </div>
          )}
        </ResultBox>
      )}
    </QuizWrapper>
  );
}