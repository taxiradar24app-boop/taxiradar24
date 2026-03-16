import styled from "styled-components";

/* ======================================================
   PAGE WRAPPER — MISMO MODELO QUE REGLAMENTO
====================================================== */

export const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};

  display: flex;
  flex-direction: column;

  background: radial-gradient(
    ellipse at top,
    #0f1c33 0%,
    #081325 45%,
    #050b18 100%
  );

  color: #e5e7eb;

  @media (max-width: 520px) {
    padding-left: 12px;
    padding-right: 12px;
    overflow-x: hidden;
  }
`;

/* ======================================================
   HEADER
====================================================== */

export const SectionHeader = styled.div`
  text-align: center;
  margin: 24px 0 36px;
`;

export const SectionTitle = styled.h1`
  font-size: 2.1rem;
  font-weight: 800;
  color: #ffc83d;
  margin-bottom: 6px;
`;

export const Timer = styled.div`
  font-size: 0.95rem;
  color: #10a37f;
  font-weight: 600;
  margin-top: 8px;
`;

export const StartButton = styled.button`
  margin-top: 14px;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 200, 61, 0.32);

  background: linear-gradient(
    135deg,
    rgba(255, 200, 61, 0.16),
    rgba(255, 200, 61, 0.08)
  );

  color: #ffc83d;
  font-size: 0.96rem;
  font-weight: 800;
  cursor: pointer;

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(255, 200, 61, 0.14);
    border-color: rgba(255, 200, 61, 0.52);
  }

  &:disabled {
    opacity: 0.58;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

/* ======================================================
   GRID PRINCIPAL
====================================================== */

export const MainGrid = styled.div`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* ======================================================
   COLUMNA EXAMEN
====================================================== */

export const ExamColumn = styled.div`
  width: 100%;
  max-width: 480px;

  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  @media (max-width: 900px) {
    max-width: 400px;
  }
`;

/* ======================================================
   TARJETA CALLE
====================================================== */

export const CalleCard = styled.div`
  width: 100%;
  max-width: 480px;
  box-sizing: border-box;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.02)
  );

  border-radius: 18px;
  padding: 18px 20px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);

  @media (max-width: 420px) {
    padding: 16px 14px;
  }
`;

/* ======================================================
   TITULO CALLE
====================================================== */

export const CalleTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
`;

/* ======================================================
   INPUTS
====================================================== */

export const InputsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  box-sizing: border-box;

  @media (max-width: 420px) {
    gap: 0.5rem;
  }
`;

export const CalleInput = styled.input`
  box-sizing: border-box;

  width: 100%;
  max-width: 140px;

  padding: 0.75rem;
  border-radius: 12px;
  font-size: 1rem;
  text-align: center;

  background: #d3d0d0;
  color: #081325;
  border: 2px solid #10a37f;

  &:focus {
    border-color: #ffc83d;
    box-shadow: 0 0 0 3px rgba(255, 200, 61, 0.35);
    outline: none;
  }

  @media (max-width: 420px) {
    max-width: 120px;
    padding: 0.6rem;
    font-size: 0.95rem;
  }
`;

/* ======================================================
   BOTÓN ENVIAR
====================================================== */

export const SubmitButton = styled.button`
  margin-top: 32px;
  align-self: stretch;

  padding: 16px;
  border-radius: 18px;

  background: linear-gradient(135deg, #10a37f, #0ea98a);
  color: #081325;

  font-size: 1.05rem;
  font-weight: 700;
  border: none;

  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(16, 163, 127, 0.4);
  }
`;

/* ======================================================
   SIDEBAR
====================================================== */

export const Sidebar = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.02)
  );

  border-radius: 20px;
  padding: 24px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);

  @media (max-width: 900px) {
    max-width: 640px;
    margin: 24px auto 0;
  }
`;

export const SidebarTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #10a37f;
  margin-bottom: 12px;
`;

export const SidebarText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #cbd5e1;
`;

/* ======================================================
   RESULTADOS
====================================================== */

export const ResultBox = styled.div`
  margin-top: 30px;
  padding: 20px;
  border-radius: 16px;

  background: rgba(16, 163, 127, 0.12);
  border: 1px solid rgba(16, 163, 127, 0.4);
`;

export const ResultTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #10a37f;
`;

export const ResultText = styled.p`
  margin-top: 6px;
  font-size: 0.95rem;
  color: #e5e7eb;
`;

export const RetryButton = styled.button`
  margin-top: 14px;
  background: transparent;
  border: 1px solid #ffc83d;
  color: #ffc83d;

  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;

  font-weight: 600;

  &:hover {
    background: rgba(255, 200, 61, 0.1);
  }
`;

export const MobileCenter = styled.div`
  width: 100%;

  @media (max-width: 900px) {
    max-width: 720px;
    margin: 0 auto;
  }
`;