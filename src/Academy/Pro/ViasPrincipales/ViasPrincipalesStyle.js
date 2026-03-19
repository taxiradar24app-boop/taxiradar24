import styled from "styled-components";

/* ================= PAGE ================= */

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors?.background || "#0a1528"};
  padding: ${({ theme }) => theme.spacing.lg};

  display: flex;
  flex-direction: column;
  align-items: center;

  /* 🔥 MOBILE FIX */
  @media (max-width: 768px) {
    padding: 12px;
  }
`;
/* ================= FRAME (IGUAL QUE REGLAMENTO) ================= */

export const PageFrame = styled.div`
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  padding: 0 40px 24px;

  @media (max-width: 950px) {
    padding: 0 16px 20px;
  }
`;

/* ================= INTRO EDUCATIVA ================= */

export const IntroSection = styled.section`
  width: 100%;
  margin-bottom: 20px;
  padding: 22px 24px;
  border-radius: 18px;
  background:
    linear-gradient(
      180deg,
      rgba(7, 18, 38, 0.96) 0%,
      rgba(8, 16, 31, 0.96) 100%
    );
  border: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    padding: 18px 16px;
    margin-bottom: 16px;
  }
`;

export const IntroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 7px 12px;
  border-radius: 999px;
  margin-bottom: 14px;
  background: rgba(16, 163, 127, 0.12);
  border: 1px solid rgba(16, 163, 127, 0.28);
  color: ${({ theme }) => theme.colors?.greenLight || "#10a37f"};
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const IntroTitle = styled.h1`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors?.yellow || "#FFC83D"};
  font-size: ${({ theme }) => theme.fontSizes?.xl || "1.75rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  line-height: ${({ theme }) => theme.lineHeights?.heading || 1.22};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tight || "-0.02em"};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes?.lg || "1.125rem"};
  }
`;

export const IntroSubtitle = styled.p`
  max-width: 920px;
  margin: 0 0 16px;
  color: rgba(229, 231, 235, 0.86);
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
    margin-bottom: 14px;
  }
`;

export const IntroStepsBox = styled.div`
  width: 100%;
  max-width: 920px;
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 14px;

  @media (max-width: 768px) {
    padding: 14px;
  }
`;

export const IntroStepsTitle = styled.h2`
  margin: 0 0 10px;
  color: #f9fafb;
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
`;

export const IntroStepsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
`;

export const IntroStepItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #e5e7eb;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  }
`;

export const StepNumber = styled.span`
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  margin-top: 1px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 200, 61, 0.12);
  border: 1px solid rgba(255, 200, 61, 0.24);
  color: ${({ theme }) => theme.colors?.yellow || "#FFC83D"};
  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  line-height: 1;
`;

export const BenefitText = styled.p`
  max-width: 920px;
  margin: 0;
  color: ${({ theme }) => theme.colors?.greenLight || "#10a37f"};
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  }
`;

/* ================= MAP ================= */

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 420px;
  position: sticky;
  top: 64px;
  z-index: 5;
  background: #08101f;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    min-height: 320px;
  }
`;

/* ================= GRID ================= */

export const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 16px;
  overflow: hidden;
  background: #0a1528;

  /* ✅ TABLET */
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  /* ✅ MOBILE PEQUEÑO (opcional pero PRO) */
  @media (max-width: 520px) {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

/* ================= LIST COLUMN ================= */

export const ListColumn = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px 12px 20px 20px;
  gap: 16px;

  @media (max-width: 900px) {
    padding: 20px 0 8px;
  }
`;

/* ================= SIDEBAR COLUMN ================= */

export const SidebarColumn = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px 20px 20px 12px;
  gap: 12px;

  @media (max-width: 900px) {
    padding: 8px 0 20px;
  }
`;

/* ================= TITLES ================= */

export const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.yellow || "#FFC83D"};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const SidebarTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.greenLight || "#10a37f"};
  margin-bottom: 6px;
`;

/* ================= LIST ================= */

export const DirectionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const DirectionItem = styled.li`
  padding: 14px 16px;
  border-radius: 12px;
  cursor: pointer;
  color: #e5e7eb;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: 0.2s ease;

  &:hover {
    background: rgba(255, 200, 61, 0.08);
    border-color: ${({ theme }) => theme.colors?.yellow || "#FFC83D"};
  }
`;

/* ================= SIDEBAR ITEM ================= */

export const SidebarItem = styled.button`
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(16,163,127,0.6)" : "rgba(255,255,255,0.08)"};
  background: ${({ $active }) =>
    $active ? "rgba(16,163,127,0.15)" : "transparent"};
  color: ${({ $active }) => ($active ? "#10a37f" : "#e5e7eb")};
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: rgba(16, 163, 127, 0.15);
  }
`;