// ======================================================================
// 📘 ReglamentoArticuloStyle.js — PRO | TAXIRADAR24 ENTERPRISE (UX tuned)
// ✅ SOLO UX: tipografía + jerarquía + legibilidad (sin tocar lógica)
// ======================================================================

import styled from "styled-components";

/* ============================================================
   🟦 ENVOLTORIO GLOBAL DE LA PÁGINA
   ============================================================ */
export const Page = styled.div`
  width: 100%;
  min-height: 100vh;

  background: ${({ theme }) => theme.pro.background};

  display: flex;
  justify-content: center;

  padding: 40px 0 80px 0;

  @media (max-width: 992px) {
    padding: 20px 0 40px 0;
  }
`;

/* ============================================================
   🟦 LAYOUT PRINCIPAL (COLUMNA IZQUIERDA + SIDEBAR)
   ============================================================ */
export const Layout = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;

  gap: 48px;
  align-items: flex-start;
  padding: 0 24px;
  box-sizing: border-box;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 32px;
  }
`;

/* ============================================================
   🟦 COLUMNA IZQUIERDA — CONTENIDO PRINCIPAL
   ============================================================ */
export const MainColumn = styled.div`
  flex: 1;

  background: ${({ theme }) => theme.pro.pageBg};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.pro.border};

  padding: 24px 18px;
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: 768px) {
    padding: 26px 20px;
  }
`;

/* ============================================================
   🟦 CONTENIDO (UX legible)
   ============================================================ */
export const Title = styled.h1`
  color: ${({ theme }) => theme.pro.green || theme.colors.green};
  font-size: 1.6rem; /* UX: menos agresivo */
  font-weight: 600; /* UX: menos pesado */
  margin-bottom: 18px;
  line-height: 1.25;
`;

export const Section = styled.div`
  margin-bottom: 34px;
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.pro.text};
  font-size: 1.1rem; /* UX: jerarquía clara */
  margin-bottom: 12px;
  font-weight: 600;
  line-height: 1.35;
`;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.pro.textSoft};
  font-size: 1.05rem; /* UX: lectura continua */
  line-height: 1.75; /* UX: aire */
  margin-bottom: 14px;

  strong {
    color: ${({ theme }) => theme.pro.text};
    font-weight: 650;
  }

  .official-text {
    color: ${({ theme }) => theme.pro.blueSoftText || "#0a7d9cff"};
    font-weight: 550;
  }

  .academy-text {
    color: ${({ theme }) => theme.pro.success || "#10a37f"};
    font-weight: 550;
  }

  .exam-key-text {
    color: ${({ theme }) => theme.pro.accentKey || "#FFC83D"};
    font-weight: 650;
  }
`;

export const List = styled.ul`
  margin-left: 20px;
  padding-left: 10px;

  li {
    color: ${({ theme }) => theme.pro.textSoft};
    margin-bottom: 10px;
    line-height: 1.65;
    font-size: 1rem;
  }
`;
export const Paragraph01 = styled.p`
  color: ${({ theme }) => theme.pro.accentKey || "#FFC83D"};
  font-size: 0.9rem;
  font-weight: 400;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.pro.border};
  margin: 32px 0;
`;

export const ExampleBox = styled.div`
  background: ${({ theme }) => theme.pro.cardAlt};
  padding: 18px 22px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.pro.border};

  font-size: 0.98rem; /* UX: menos carga */
  color: ${({ theme }) => theme.pro.text};
  margin-bottom: 16px;
  line-height: 1.65;

  strong {
    color: ${({ theme }) => theme.pro.text};
    font-weight: 650;
  }

  p {
    margin: 8px 0 0 0;
    color: ${({ theme }) => theme.pro.textSoft};
  }
`;

export const FAQItem = styled.div`
  background: ${({ theme }) => theme.pro.card};
  padding: 20px 22px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.pro.border};
  margin-bottom: 14px;

  h4 {
    margin: 0 0 8px 0;
    color: ${({ theme }) => theme.pro.text};
    font-weight: 650;
    font-size: 1rem;
    line-height: 1.45;
  }

  p {
    color: ${({ theme }) => theme.pro.textSoft};
    margin: 0;
    font-size: 1rem;
    line-height: 1.7;
  }
`;

/* ============================================================
   🟦 TOP BAR DEL ARTÍCULO
   ============================================================ */
export const TopBar = styled.div`
  background: ${({ theme }) => theme.pro.topbar};
  border: 1px solid ${({ theme }) => theme.pro.border};
  padding: 16px 22px;

  border-radius: 16px;
  margin-bottom: 32px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopBarCenter = styled.div`
  font-size: 1.05rem; /* UX: menos pesado */
  color: ${({ theme }) => theme.pro.text};
  opacity: 0.9;
  font-weight: 600;
`;

// ============================================================
// 🎨 SEMANTIC TEXT COLORS (compatibilidad)
// ============================================================

export const OfficialText = styled.span`
  color: ${({ theme }) => theme.pro.blueSoftText || "#0a7d9cff"};
  font-weight: 550;
`;

export const AcademyText = styled.span`
  color: ${({ theme }) => theme.pro.success || "#10a37f"};
  font-weight: 550;
`;

export const ExamKeyText = styled.span`
  color: ${({ theme }) => theme.pro.accentKey || "#FFC83D"};
  font-weight: 650;
`;