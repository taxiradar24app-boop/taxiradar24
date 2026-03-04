// ======================================================
// 🎨 ReglamentoQuizStyle.js — PRO (UX tuned)
// ✅ SOLO UX: tamaños y pesos más equilibrados para lectura
// ======================================================

import styled from "styled-components";

export const QuizWrapper = styled.div`
  margin-top: 48px;
  padding: 24px;
  border-radius: 16px;

  background: ${({ theme }) =>
    theme.mode === "light" ? "#ffffff" : theme.pro?.card || "#0f1b2d"};

  border: 1px solid
    ${({ theme }) =>
      theme.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)"};
`;

export const QuizTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 18px;
  font-weight: 650;

  color: ${({ theme }) => theme.pro?.green || "#10a37f"};
`;

export const QuizSubTitle = styled.h4`
  font-size: 0.95rem;
  margin-bottom: 16px;
  font-weight: 400;
  line-height: 1.6;

  color: ${({ theme }) => theme.pro?.green || "#10a37f"};
`;

export const QuestionBox = styled.div`
  margin-bottom: 20px;
`;

export const QuestionText = styled.p`
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.6;

  color: ${({ theme }) =>
    theme.mode === "light" ? "#0f172a" : "rgba(255,255,255,0.92)"};
`;

export const Option = styled.button`
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  margin-bottom: 8px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem; /* UX: explícito para coherencia */

  border: 1px solid
    ${({ selected, theme }) =>
      selected
        ? theme.pro?.green
        : theme.mode === "light"
        ? "rgba(0,0,0,0.12)"
        : "rgba(255,255,255,0.19)"};

  background: ${({ selected, theme }) =>
    selected
      ? "rgba(16,163,127,0.15)"
      : theme.mode === "light"
      ? "#f8fafc"
      : "rgba(255,255,255,0.04)"};

  color: ${({ theme }) =>
    theme.mode === "light" ? "#0f172a" : "rgba(255,255,255,0.92)"};

  &:hover {
    background: rgba(16, 163, 127, 0.12);
  }
`;

export const ResultBox = styled.div`
  margin-top: 24px;
  padding: 16px;
  border-radius: 12px;
  font-weight: 500;
  line-height: 1.65;

  background: ${({ success, theme }) =>
    success
      ? theme.mode === "light"
        ? "#e6f7f2"
        : "rgba(16,163,127,0.18)"
      : theme.mode === "light"
      ? "#fff3cd"
      : "rgba(245,158,11,0.18)"};

  color: ${({ success, theme }) =>
    success
      ? theme.mode === "light"
        ? "#065f46"
        : "#6ee7b7"
      : theme.mode === "light"
      ? "#92400e"
      : "#fcd34d"};
`;

export const FinishButton = styled.button`
  margin-top: 16px;
  padding: 12px 18px;
  border-radius: 10px;
  border: none;
  background: #10a37f;
  color: #fff;
  font-weight: 750;
  cursor: pointer;

  &:hover {
    filter: brightness(1.06);
  }
`;

export const RetryButton = styled(FinishButton)`
  background: #f59e0b;
`;