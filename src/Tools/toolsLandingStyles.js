import styled from "styled-components";

/* =========================
   WRAPPER GENERAL
========================= */
export const PageWrapper = styled.div`
  padding: 2rem 1.5rem 4rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.25rem 1rem 3.5rem;
  }
`;

/* =========================
   HERO
========================= */
export const HeroSection = styled.section`
  margin-top: 0;              /* 🔥 eliminar hack */
  margin-bottom: 1.2rem;      /* 🔥 menos espacio */
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex?.sticky || 100};
  background: rgba(7, 17, 31, 0.85);
  backdrop-filter: blur(10px);
  padding: 6px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

export const HeroContent = styled.div`
  max-width: 760px;
  margin-top: 0.25rem;   /* 🔥 antes estaba muy separado */
`;

export const HeroTag = styled.div`
  color: #00f5ff;

  margin: 0.25rem 0 0.4rem; /* 🔥 compacta arriba y abajo */
  
  text-transform: uppercase;

  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  letter-spacing: 0.08em;
`;

/* =========================
   MODULE CTA (NO CAMBIADO)
========================= */
export const ModuleCTA = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: #00f5ff;
  white-space: nowrap;
`;

/* =========================
   FOOTER DEL CARD (nuevo uso)
========================= */
export const ModuleFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  gap: 0.6rem;
`;

/* =========================
   BOTONES
========================= */
export const SecondaryButton = styled.button`
  padding: 0.95rem 1.6rem;
  min-height: 52px;
  border-radius: 999px;
  border: 1px solid #94a3b8;
  background: transparent;
  color: #e2e8f0;
  cursor: pointer;

  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};

  transition: 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: #cbd5e1;
    background: rgba(255, 255, 255, 0.03);
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

/* =========================
   SECCIÓN
========================= */
export const Section = styled.section`
  margin-top: 2.75rem;
`;

/* =========================
   GRID
========================= */
export const FeatureGrid = styled.div`

  display: grid;
  gap: 1.15rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/* =========================
   CARD
========================= */
export const FeatureCard = styled.div`
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  background: ${({ $toolsSection, theme }) =>
    $toolsSection
      ? theme.tools?.colors?.bgCard || "rgba(10,22,40,0.92)"
      : "rgba(15, 23, 42, 0.95)"};

  border-radius: 1.3rem;
  padding: 1.2rem 1.25rem 1.25rem;

  border: 1px solid
    ${({ $toolsSection, theme }) =>
      $toolsSection
        ? theme.border || "rgba(255,255,255,0.08)"
        : "rgba(55, 65, 81, 0.9)"};

  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.74);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 26px 40px rgba(15, 23, 42, 0.9);
    border-color: ${({ $toolsSection, theme }) =>
      $toolsSection
        ? theme.tools?.colors?.brandSoft || "rgba(0,168,243,0.16)"
        : "rgba(129, 140, 248, 0.7)"};

    background: ${({ $toolsSection, theme }) =>
      $toolsSection
        ? "linear-gradient(180deg, rgba(0,168,243,0.08) 0%, rgba(10,22,40,0.96) 100%)"
        : "radial-gradient(circle at top, rgba(30, 64, 175, 0.7), rgba(15, 23, 42, 0.98))"};
  }

  h3 {
    margin-bottom: 0.45rem;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.body};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
    color: ${({ $toolsSection, theme }) =>
      $toolsSection ? theme.text || "#e8edf3" : "#9ca3af"};
    margin-bottom: 0.8rem;
  }
`;

export const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.tools?.colors?.brand || "#00A8F3"};
  margin-bottom: 0.35rem;

  font-size: ${({ theme }) => theme.fontSizes?.xl || "1.25rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: ${({ theme }) => theme.lineHeights?.title || "1.3"};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tight || "-0.01em"};
`;
/* =========================
   ICON
========================= */

export const FeatureIcon = styled.div`
  font-size: 1.95rem;
  margin-bottom: 0.55rem;
`;

export const FeatureText = styled.p`
  color: #cfd8ee;
  margin: 0;

  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
`;

/* =========================
   CTA FINAL
========================= */
export const CTASection = styled.section`
  margin-top: 3.5rem;
  text-align: center;
`;