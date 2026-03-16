// ======================================================================
// 📘 ReglamentoArticuloStyle.js — PRO | TAXIRADAR24 ENTERPRISE
// ✅ Tipografía mejorada
// ✅ Sin topbar
// ✅ Sidebar arriba en móvil desde layout + sidebar
// ======================================================================

import styled from "styled-components";

/* ============================================================
   🟦 ENVOLTORIO GLOBAL
============================================================ */
export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.pro.background};
  display: flex;
  justify-content: center;
  padding: 40px 0 80px 0;

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
  gap: 40px;
  align-items: flex-start;
  padding: 0 24px;
  box-sizing: border-box;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 20px;
    padding: 0 14px;
  }
`;

/* ============================================================
   🟦 COLUMNA PRINCIPAL
============================================================ */
export const MainColumn = styled.div`
  flex: 1;
  min-width: 0;

  background: ${({ theme }) => theme.pro.pageBg};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.pro.border};
  padding: 26px 22px;
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: 768px) {
    padding: 22px 16px;
    border-radius: 18px;
  }
`;

/* ============================================================
   🟦 TIPOGRAFÍA
============================================================ */
export const Title = styled.h1`
  color: ${({ theme }) => theme.pro.green || theme.colors.green};
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
  color: ${({ theme }) => theme.pro.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  margin: 0 0 12px 0;
`;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.pro.textSoft};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  margin-bottom: 14px;

  strong {
    color: ${({ theme }) => theme.pro.text};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  .official-text {
    color: ${({ theme }) => theme.pro.blueSoftText || "#0a7d9cff"};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  .academy-text {
    color: ${({ theme }) => theme.pro.success || "#10a37f"};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  .exam-key-text {
    color: ${({ theme }) => theme.pro.accentKey || "#FFC83D"};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

export const List = styled.ul`
  margin-left: 20px;
  padding-left: 10px;

  li {
    color: ${({ theme }) => theme.pro.textSoft};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.body};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
    margin-bottom: 10px;
  }
`;

export const Paragraph01 = styled.p`
  color: ${({ theme }) => theme.pro.accentKey || "#FFC83D"};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.pro.border};
  margin: 30px 0;
`;

export const ExampleBox = styled.div`
  background: ${({ theme }) => theme.pro.cardAlt};
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.pro.border};
  color: ${({ theme }) => theme.pro.text};
  margin-bottom: 14px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  strong {
    color: ${({ theme }) => theme.pro.text};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  p {
    margin: 8px 0 0 0;
    color: ${({ theme }) => theme.pro.textSoft};
  }
`;

export const FAQItem = styled.div`
  background: ${({ theme }) => theme.pro.card};
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.pro.border};
  margin-bottom: 14px;

  h4 {
    margin: 0 0 8px 0;
    color: ${({ theme }) => theme.pro.text};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: ${({ theme }) => theme.lineHeights.title};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.pro.textSoft};
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
  color: ${({ theme }) => theme.pro.blueSoftText || "#0a7d9cff"};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const AcademyText = styled.span`
  color: ${({ theme }) => theme.pro.success || "#10a37f"};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const ExamKeyText = styled.span`
  color: ${({ theme }) => theme.pro.accentKey || "#FFC83D"};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;