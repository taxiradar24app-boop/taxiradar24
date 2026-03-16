import styled from "styled-components";

export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #061224;
  padding: clamp(10px, 4vw, 24px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const Shell = styled.div`
  width: 92%;
  max-width: 1180px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.28);
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Content = styled.div`
  padding: 22px;

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

/* ============================================================
   HERO
============================================================ */

export const HeroTitle = styled.h1`
  margin: 0 0 8px;
  color: #ffc83d;
  font-size: clamp(1.9rem, 3vw, 2.75rem);
  letter-spacing: -0.03em;
  font-weight: 800;
  line-height: 1.08;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const HeroSub = styled.p`
  margin: 0 0 18px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.65;
  letter-spacing: -0.01em;
  max-width: 980px;
`;

export const Card = styled.div`
  background:
    radial-gradient(circle at top left, rgba(20, 184, 166, 0.10), transparent 34%),
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.08), transparent 30%),
    #0c1930;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.24);

  @media (max-width: 768px) {
    padding: 12px;
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
  border: 1px solid
    ${({ active }) =>
      active ? "rgba(16,163,127,0.30)" : "rgba(255,255,255,0.08)"};

  background: ${({ active }) =>
    active
      ? "linear-gradient(135deg, #10a37f, #58e63d)"
      : "rgba(255,255,255,0.04)"};

  color: ${({ active }) => (active ? "#081325" : "#f5f7fb")};
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }
`;

export const CTA = styled.button`
  padding: 14px 18px;
  border-radius: 14px;
  border: 0;
  background: linear-gradient(135deg, #10a37f, #58e63d);
  color: #081325;
  font-weight: 800;
  font-size: 1rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: 0.2s ease;
  box-shadow:
    0 0 14px rgba(34, 197, 94, 0.18),
    0 8px 20px rgba(34, 197, 94, 0.18);

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
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.92);
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
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
  color: #ffc83d;
  font-weight: 700;
  font-size: 0.94rem;
  letter-spacing: 0.02em;
  line-height: 1.3;
  opacity: 0.95;
`;

export const QMetaRight = styled.div`
  font-size: 0.94rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1.35;
  opacity: 0.82;
  color: rgba(255, 255, 255, 0.68);
`;

export const QText = styled.div`
  color: #f5f7fb;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.65;
  letter-spacing: -0.02em;
  max-width: 720px;

  @media (max-width: 720px) {
    font-size: 1.12rem;
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
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #f5f7fb;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.65;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: 0.2s ease;

  strong {
    font-weight: 800;
  }

  ${({ selected }) =>
    selected &&
    `
      border-color: #10a37f;
      box-shadow: 0 0 0 3px rgba(16,163,127,0.15);
    `}

  ${({ state }) =>
    state === "correct" &&
    `
      border-color: #10a37f;
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
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${({ value }) => `${value}%`};
  background: linear-gradient(90deg, #10a37f, #58e63d);
  transition: width 0.25s ease;
`;