// src/Academy/Demo/DemoSimuladorStyle.js
import styled from "styled-components";

export const Page = styled.div`
  width: 100%;
`;

export const Shell = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
`;

export const Title = styled.h1`
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  font-weight: 800;
  color: ${({ theme }) => theme.pro?.yellow || "#f4d35e"};
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.86);
  font-size: 1.05rem;
  margin-bottom: 22px;
  line-height: 1.5;
`;

export const Card = styled.div`
  border-radius: 18px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.86);
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const Chip = styled.div`
  padding: 10px 14px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.88);

  ${({ active, theme }) =>
    active &&
    `
    background: ${theme?.pro?.green || "#10a37f"};
    color: #081321;
  `}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.55;
    cursor: not-allowed;
  `}
`;

export const Content = styled.div`
  margin-top: 18px;
`;

export const QuestionBox = styled.div`
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 26px;
  color: #0b1220;
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

export const QuestionIndex = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.pro?.green|| "#f4d35e"};
  margin-bottom: 8px;
`;



export const QuestionText = styled.h2`
  font-size: 1.2rem;
  line-height: 1.35;
  font-weight: 600;
  margin-bottom: 18px;
`;

export const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const Option = styled.button`
  width: 100%;
  text-align: left;
  padding: 14px 16px;
  border-radius: 14px;
  cursor: pointer;
  font-size: 0.95rem;

  background: rgba(15, 23, 42, 0.9);

  border: 1.5px solid
    ${({ selected }) =>
      selected ? "rgba(74,222,128,0.85)" : "rgba(148,163,184,0.35)"};

  color: ${({ selected }) => (selected ? "#eafff3" : "#e5e7eb")};

  box-shadow: ${({ selected }) =>
    selected
      ? `
        0 0 0 1px rgba(74,222,128,0.35),
        0 0 22px rgba(34,197,94,0.45)
      `
      : "0 8px 24px rgba(15,23,42,0.7)"};

  transition: 
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.15s ease;

  &:hover {
    border-color: rgba(74,222,128,0.6);
    transform: translateY(-1px);
  }
`;


export const Footer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

export const CTABox = styled.div`
  margin-top: 22px;
  padding: 20px;
  border-radius: 18px;
  background: rgba(16, 163, 127, 0.12);
  border: 1px solid rgba(16, 163, 127, 0.25);
  color: rgba(255, 255, 255, 0.88);
`;

export const CTAButton = styled.button`
  border: 0;
  border-radius: 14px;
  padding: 14px 18px;
  font-weight: 900;
  cursor: pointer;
  transition: 0.18s ease;
  min-width: 220px;

  background: ${({ secondary, theme }) =>
    secondary ? "rgba(255,255,255,0.92)" : theme.pro?.green || "#10a37f"};
  color: ${({ secondary }) => (secondary ? "#0b1220" : "#081321")};

  box-shadow: ${({ secondary }) =>
    secondary ? "none" : "0 10px 30px rgba(16,163,127,0.18)"};

  &:hover {
    transform: translateY(-1px);
  }

  /* ✅ DESHABILITADO */
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    filter: grayscale(0.25);
  }

  &:disabled:hover {
    transform: none;
  }
      & + & {
    margin-left: 14px;
  }

  @media (max-width: 520px) {
    & + & {
      margin-left: 0;
      margin-top: 12px;
    }
  }
`;

export const AttemptInfo = styled.div`
  margin-top: 10px;
  font-weight: 800;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.82);
`;

export const LockInfo = styled.div`
  margin-top: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(244, 211, 94, 0.12);
  border: 1px solid rgba(244, 211, 94, 0.25);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  line-height: 1.35;
`;
