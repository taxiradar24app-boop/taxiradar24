import React from "react";
import styled from "styled-components";

export default function DemoUnlockBar({ attemptsLeft, onStart }) {
  const disabled = attemptsLeft <= 0;

  return (
    <Wrapper>
      <StartButton onClick={onStart} disabled={disabled}>
        {disabled
          ? "Intentos DEMO agotados"
          : "Comenzar ejercicio de callejero"}
      </StartButton>

      <AttemptsText>
        Intentos disponibles: <strong>{attemptsLeft}</strong> de 3
      </AttemptsText>

      {!disabled && (
        <InfoText>
          Tu progreso quedará guardado en tu cuenta gratuita.
        </InfoText>
      )}
    </Wrapper>
  );
}

/* =========================
   STYLES
========================= */

const Wrapper = styled.div`
  width: 100%;
  max-width: 420px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StartButton = styled.button`
  width: 100%;
  padding: 16px 20px;

  border-radius: 16px;
  border: none;

  font-weight: 900;
  font-size: 1rem;

  background: linear-gradient(135deg, #10a37f, #0ea98a);
  color: #081325;

  cursor: pointer;
  transition: all 0.2s ease;

  box-shadow: 0 12px 28px rgba(16, 163, 127, 0.35);

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.6);
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const AttemptsText = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);

  strong {
    color: #ffffff;
  }
`;

const InfoText = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.65);
  text-align: center;
  max-width: 340px;
`;