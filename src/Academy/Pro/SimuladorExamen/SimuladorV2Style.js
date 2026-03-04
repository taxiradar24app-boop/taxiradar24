// ======================================================================
// 🎨 SimuladorV2Style.js — TAXIRADAR24 PRO (ENTERPRISE LOOK) — UX REFINED
// ✅ SOLO UX: tipografía + pesos + ritmo visual (sin tocar lógica)
// ✅ Mantiene estructura, tokens y componentes ya usados en SimuladorExamen.js
// ======================================================================

import styled from "styled-components";

export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.pro.pageBg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Shell = styled.div`
  width: 92%;
  max-width: 1180px;
  background: ${({ theme }) => theme.pro.pageBg};
  border: 1px solid ${({ theme }) => theme.pro.border};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  overflow: hidden;
`;

export const TopBar = styled.div`
  padding: 16px 18px;
  background: ${({ theme }) => theme.pro.topbar};
  border-bottom: 1px solid ${({ theme }) => theme.pro.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

export const BrandTitle = styled.div`
  color: ${({ theme }) => theme.pro.text};
  font-weight: 600;
  font-size: 1.02rem;
  letter-spacing: -0.1px;
`;

export const TimerPill = styled.div`
  padding: 10px 16px;
  border-radius: 999px;
  background: ${({ theme }) => theme.pro.cardAlt};
  border: 1px solid ${({ theme }) => theme.pro.border};
  color: ${({ theme }) => theme.pro.text};
  font-weight: 700;
  letter-spacing: 0.4px;
  min-width: 110px;
  text-align: center;
  font-size: 0.98rem;
`;

export const Content = styled.div`
  padding: 22px;

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

/* ============================================================
   HERO (Selección / Corrección)
============================================================ */

export const HeroTitle = styled.h1`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.pro.text};
  font-size: 2.05rem;
  letter-spacing: -0.35px;
  font-weight: 700;
  line-height: 1.15;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

export const HeroSub = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.pro.textSoft};
  font-size: 1rem;
  line-height: 1.65;
  max-width: 980px;

  @media (max-width: 768px) {
    font-size: 0.98rem;
    line-height: 1.6;
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.pro.card};
  border: 1px solid ${({ theme }) => theme.pro.border};
  border-radius: 18px;
  padding: 18px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
`;

export const Chip = styled.button`
  padding: 12px 16px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.pro.border};
  background: ${({ active, theme }) =>
    active ? theme.colors.green : theme.pro.cardAlt};
  color: ${({ active, theme }) => (active ? "#0a1528" : theme.pro.text)};
  font-weight: 700;
  font-size: 0.98rem;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }
`;

export const CTA = styled.button`
  padding: 14px 18px;
  border-radius: 14px;
  border: 0;
  background: ${({ theme }) => theme.colors.green};
  color: #0a1528;
  font-weight: 800;
  font-size: 0.98rem;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Ghost = styled.button`
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.pro.border};
  background: ${({ theme }) => theme.pro.cardAlt};
  color: ${({ theme }) => theme.pro.text};
  font-weight: 700;
  font-size: 0.98rem;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.pro.border};
  margin: 18px 0;
`;

/* ============================================================
   EXAM QUESTION
============================================================ */

export const QMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: baseline;
  margin-bottom: 10px;

  @media (max-width: 620px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`;

export const QIndex = styled.div`
  color: ${({ theme }) => theme.colors.yellow};
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
  opacity: 0.9;
`;

export const QMetaRight = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  opacity: 0.75;
  color: ${({ theme }) => theme.pro.textSoft};
`;

export const QText = styled.div`
  color: ${({ theme }) => theme.pro.text};
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.1px;

  @media (max-width: 768px) {
    font-size: 1.05rem;
    line-height: 1.6;
  }
`;

export const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const Option = styled.button`
  text-align: left;
  padding: 13px 14px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.pro.border};
  background: ${({ theme }) => theme.pro.cardAlt};
  color: ${({ theme }) => theme.pro.text};
  font-weight: 600;
  font-size: 0.96rem;
  line-height: 1.6;
  cursor: pointer;
  transition: 0.2s ease;

  strong {
    font-weight: 800;
  }

  ${({ selected, theme }) =>
    selected &&
    `
      border-color: ${theme.colors.green};
      box-shadow: 0 0 0 3px rgba(16,163,127,0.15);
    `}

  ${({ state, theme }) =>
    state === "correct" &&
    `
      border-color: ${theme.colors.green};
      background: rgba(16,163,127,0.15);
    `}

  ${({ state }) =>
    state === "wrong" &&
    `
      border-color: #ff5b5b;
      background: rgba(255,91,91,0.12);
    `}

  &:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

export const Progress = styled.div`
  margin-top: 14px;
  height: 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.pro.cardAlt};
  border: 1px solid ${({ theme }) => theme.pro.border};
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${({ value }) => `${value}%`};
  background: ${({ theme }) => theme.colors.green};
  transition: width 0.25s ease;
`;