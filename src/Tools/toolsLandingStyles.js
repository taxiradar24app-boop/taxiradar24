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
  margin-top: -16px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex?.sticky || 100};

  background: rgba(7, 17, 31, 0.85);
  backdrop-filter: blur(10px);

  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

export const HeroContent = styled.div`
  max-width: 760px;
`;

export const HeroTag = styled.div`
  color: #00f5ff;
  margin-bottom: 0.7rem;
  text-transform: uppercase;

  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  letter-spacing: 0.08em;
`;

/* =========================
   MODULE CTA (NO CAMBIADO)
========================= */
export const ModuleCTA = styled.span`
  font-size: 0.9rem;
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
  background: rgba(15, 23, 42, 0.9);
  border-radius: 18px;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow: 0 20px 28px rgba(0, 0, 0, 0.35);

  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};

  transition: 0.18s ease;

  &:hover {
    transform: ${({ $clickable }) =>
      $clickable ? "translateY(-2px)" : "none"};
  }
`;

export const FeatureIcon = styled.div`
  font-size: 1.95rem;
  margin-bottom: 0.55rem;
`;

export const FeatureTitle = styled.h3`
  color: #0094da;
  margin-bottom: 0.35rem;

  font-size: ${({ theme }) => theme.fontSizes?.lg || "1.125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
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