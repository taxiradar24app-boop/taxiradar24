// ======================================================
// 🟡 DemoUnlockBar
// Barra previa al ejercicio DEMO
// NO descuenta intento
// Activa el ejercicio solo al confirmar
// ======================================================

import React from "react";
import styled from "styled-components";

// ================== STYLES ==================

const BarWrapper = styled.div`
  width: 100%;
  max-width: 760px;
  margin: 0 auto 32px;
  padding: 20px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(244, 211, 94, 0.15),
    rgba(16, 163, 127, 0.12)
  );

  border: 1px solid rgba(244, 211, 94, 0.35);
  backdrop-filter: blur(6px);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Badge = styled.span`
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;

  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;

  background: ${({ theme }) => theme.pro?.yellow || "#f4d35e"};
  color: #111;
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.grey || "#e8edf3"};
`;

const Subtitle = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.muted || "rgba(232,237,243,0.7)"};
  line-height: 1.4;
`;

const StartButton = styled.button`
  flex-shrink: 0;
  padding: 12px 20px;
  border-radius: 999px;

  background: ${({ theme }) => theme.pro?.green || "#10a37f"};
  color: #0b1c16;

  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;

  border: none;
  box-shadow: 0 0 0 rgba(16, 163, 127, 0);

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(16, 163, 127, 0.35);
  }
`;

// ================== COMPONENT ==================

export default function DemoUnlockBar({
  attemptsLeft = 3,
  onStart,
}) {
  return (
    <BarWrapper>
      <Info>
        <Badge>DEMO GRATUITO</Badge>

        <Title>
          Ejercicio oficial · {attemptsLeft} intentos disponibles
        </Title>

        <Subtitle>
          Este ejercicio replica el formato del examen oficial.
          El intento solo se contará cuando empieces.
        </Subtitle>
      </Info>

      <StartButton onClick={onStart}>
        Empezar ejercicio DEMO
      </StartButton>
    </BarWrapper>
  );
}
