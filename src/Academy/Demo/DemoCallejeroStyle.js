import styled from "styled-components";

/* ======================================================
   PAGE WRAPPER
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
  margin: 24px auto 36px;

  /* 🔥 CLAVE: igual que PRO */
  width: 100%;
  max-width: 720px;

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

export const SectionTitle = styled.h1`
  font-size: 2.1rem;
  font-weight: 800;
  color: #ffc83d;
  margin-bottom: 6px;
`;

export const DemoBadge = styled.span`
  display: inline-block;
  margin-bottom: 8px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 200, 61, 0.15);
  color: #ffc83d;
  font-weight: 700;
  font-size: 0.75rem;
`;

export const AttemptsInfo = styled.div`
  font-size: 0.9rem;
  color: #cbd5e1;
  margin-bottom: 6px;
`;

export const Timer = styled.div`
  font-size: 0.95rem;
  color: #10a37f;
  font-weight: 600;
`;

/* ======================================================
   GRID PRINCIPAL (WEB IGUAL A PRO)
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

  margin: 0 ;

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center; /* ✅ une visualmente las columnas */
  @media (max-width: 900px) {
    max-width: 400px;
  }
`;


/* ======================================================
   TARJETA CALLE
====================================================== */

export const CalleCard = styled.div`
  width: 100%;
  max-width: 480px;   /* ✅ IGUAL QUE PRO */
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
   BOTÓN
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
   SIDEBAR (SIN EMPUJAR)
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

  /* 🔥 CLAVE: mismo comportamiento visual que PRO */
  width: 100%;
  max-width: 360px;
  justify-self: center;

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

export const LockBox = styled.div`
  margin-top: 24px;
  padding: 18px;
  border-radius: 16px;

  background: rgba(255, 200, 61, 0.08);
  border: 1px solid rgba(255, 200, 61, 0.35);

  text-align: center;
  color: #ffc83d;

  font-size: 0.95rem;
  font-weight: 600;
`;
