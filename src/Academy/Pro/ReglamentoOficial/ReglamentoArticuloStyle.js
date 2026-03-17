// ======================================================================
// 📘 ReglamentoArticuloStyle.js — PRO | TAXIRADAR24 ENTERPRISE
// ✅ Fijo en línea darkTheme
// ✅ Sidebar a la derecha en web / arriba en móvil
// ✅ Colores alineados con baseColors + academy palette
// ✅ Sin botón Sol/Luna
// ======================================================================

import styled from "styled-components";

/* ============================================================
   🟦 ENVOLTORIO GLOBAL
============================================================ */
export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors?.blueDeep || "#0A1528"};
  display: flex;
  justify-content: center;
  padding: 20px 0 80px 0;

  @media (max-width: 992px) {
    padding: 16px 0 40px 0;
  }
`;

/* ============================================================
   🟦 LAYOUT
============================================================ */
export const Layout = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;
  gap: 28px;
  align-items: flex-start;
  padding: 0 24px;
  box-sizing: border-box;

  @media (min-width: 993px) {
    flex-direction: row-reverse;
  }

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 18px;
    padding: 0 14px;
  }
`;
/* ============================================================
   🟦 COLUMNA PRINCIPAL
============================================================ */
export const MainColumn = styled.div`
  flex: 1;
  min-width: 0;
  max-width: 820px;

  background: ${({ theme }) =>
    theme.colors?.academy?.surface || "#0e1a33"};
  border-radius: 20px;
  border: 1px solid
    ${({ theme }) => theme.pro.border || "rgba(255,255,255,0.07)"};
  padding: 28px 24px;
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: 992px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    padding: 22px 16px;
    border-radius: 18px;
  }
`;
/* ============================================================
   🟦 TIPOGRAFÍA
============================================================ */
export const Title = styled.h1`
  color: ${({ theme }) => theme.colors?.green || "#10a37f"};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  margin: 0 0 18px 0;

  @media (max-width: 768px) {
    font-size: 1.55rem;
    margin-bottom: 16px;
  }
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) =>
    theme.colors?.academy?.textMain || "#e6edf7"};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  margin: 0 0 12px 0;
`;

export const Paragraph = styled.p`
  color: ${({ theme }) =>
    theme.colors?.academy?.textSoft || "#b9c3d6"};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  margin-bottom: 14px;

  strong {
    color: ${({ theme }) =>
      theme.colors?.academy?.textMain || "#e6edf7"};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  .official-text {
    color: ${({ theme }) => theme.colors?.blueSoftText || "#0a7d9c"};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  .academy-text {
    color: ${({ theme }) =>
      theme.colors?.academy?.accentAcademy || theme.colors?.green || "#10a37f"};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  .exam-key-text {
    color: ${({ theme }) =>
      theme.colors?.academy?.accentKey || theme.colors?.yellow || "#FFC83D"};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

export const List = styled.ul`
  margin: 0 0 0 20px;
  padding-left: 10px;

  li {
    color: ${({ theme }) =>
      theme.colors?.academy?.textSoft || "#b9c3d6"};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.body};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
    margin-bottom: 10px;
  }

  li::marker {
    color: ${({ theme }) => theme.colors?.green || "#10a37f"};
  }
`;

export const Paragraph01 = styled.p`
  color: ${({ theme }) =>
    theme.colors?.academy?.accentKey || theme.colors?.yellow || "#FFC83D"};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

/* ============================================================
   🟦 DIVIDER
============================================================ */
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.pro.border || "rgba(255,255,255,0.07)"};
  margin: 30px 0;
`;

/* ============================================================
   🟦 BLOQUES DESTACADOS
============================================================ */
export const ExampleBox = styled.div`
  background: ${({ theme }) =>
    theme.colors?.academy?.surfaceSoft || "#132447"};
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.pro.border || "rgba(255,255,255,0.07)"};
  color: ${({ theme }) =>
    theme.colors?.academy?.textMain || "#e6edf7"};
  margin-bottom: 14px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  strong {
    color: ${({ theme }) =>
      theme.colors?.academy?.textMain || "#e6edf7"};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  p {
    margin: 8px 0 0 0;
    color: ${({ theme }) =>
      theme.colors?.academy?.textSoft || "#b9c3d6"};
  }
`;

export const FAQItem = styled.div`
  background: ${({ theme }) =>
    theme.colors?.academy?.surfaceSoft || "#132447"};
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.pro.border || "rgba(255,255,255,0.07)"};
  margin-bottom: 14px;

  h4 {
    margin: 0 0 8px 0;
    color: ${({ theme }) =>
      theme.colors?.academy?.textMain || "#e6edf7"};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: ${({ theme }) => theme.lineHeights.title};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  }

  p {
    margin: 0;
    color: ${({ theme }) =>
      theme.colors?.academy?.textSoft || "#b9c3d6"};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.body};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  }
`;

/* ============================================================
   🎨 SEMANTIC TEXT COLORS
============================================================ */
export const OfficialText = styled.span`
  color: ${({ theme }) => theme.colors?.blueSoftText || "#0a7d9c"};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const AcademyText = styled.span`
  color: ${({ theme }) =>
    theme.colors?.academy?.accentAcademy || theme.colors?.green || "#10a37f"};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const ExamKeyText = styled.span`
  color: ${({ theme }) =>
    theme.colors?.academy?.accentKey || theme.colors?.yellow || "#FFC83D"};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;