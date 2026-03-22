import styled from "styled-components";

/* WRAPPER GENERAL */
export const PageWrapper = styled.div`
  padding: 2rem 1.5rem 4rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.25rem 1rem 3.5rem;
  }
`;

/* HERO */
export const HeroSection = styled.section`
  margin-top: 1.25rem;
  margin-bottom: 2.5rem;
`;

export const HeroContent = styled.div`
  max-width: 760px;
`;

export const HeroTag = styled.div`
  color: #a3e635;
  margin-bottom: 0.7rem;
  text-transform: uppercase;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  line-height: 1.2;
  letter-spacing: 0.08em;
`;

export const HeroTitle = styled.h1`
  color: #f9fafb;
  margin-bottom: 1rem;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes?.hero || "2.75rem"});
  font-weight: ${({ theme }) => theme.fontWeights?.heavy || 800};
  line-height: 1.04;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tighter || "-0.03em"};
  text-wrap: balance;
`;

export const HeroSubtitle = styled.p`
  color: #cbd5f5;
  margin-bottom: 1.4rem;
  max-width: 620px;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.lg || "1.125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  }
`;

export const HeroCTA = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const PrimaryButton = styled.button`
  padding: 0.95rem 1.6rem;
  min-height: 52px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #10a37f, #a3e635);
  color: #022c22;
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease;
  box-shadow:
    0 10px 24px rgba(16, 163, 127, 0.24),
    0 4px 12px rgba(0, 0, 0, 0.18);

  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const SecondaryButton = styled.button`
  padding: 0.95rem 1.6rem;
  min-height: 52px;
  border-radius: 999px;
  border: 1px solid #94a3b8;
  background: transparent;
  color: #e2e8f0;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;

  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  &:hover {
    transform: translateY(-1px);
    border-color: #cbd5e1;
    background: rgba(255, 255, 255, 0.03);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

/* SECCIONES */
export const Section = styled.section`
  margin-top: 2.75rem;

  ${({ background }) =>
    background === "alt" &&
    `
      background: radial-gradient(circle at top, rgba(15,23,42,0.9), rgba(2,6,23,0.9));
      padding: 2.5rem 1.5rem;
      border-radius: 24px;
    `}
`;

export const SectionHeader = styled.div`
  margin-bottom: 1.8rem;
  max-width: 680px;
`;

export const SectionTag = styled.div`
  color: #a3e635;
  margin-bottom: 0.45rem;
  text-transform: uppercase;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.8125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  line-height: 1.2;
  letter-spacing: 0.08em;
`;

export const SectionTitle = styled.h2`
  color: #f9fafb;
  margin-bottom: 0.6rem;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.xl || "1.75rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  line-height: ${({ theme }) => theme.lineHeights?.heading || 1.22};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tight || "-0.02em"};

  @media (max-width: 768px) {
    font-size: 1.45rem;
  }
`;

export const SectionSubtitle = styled.p`
  color: #9ca3af;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
`;

/* FEATURES */
export const FeatureGrid = styled.div`
  display: grid;
  gap: 1.15rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: rgba(15, 23, 42, 0.9);
  border-radius: 18px;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 28px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};

  &:hover {
    transform: ${({ $clickable }) => ($clickable ? "translateY(-2px)" : "none")};
    border-color: ${({ $clickable }) =>
      $clickable ? "rgba(163, 230, 53, 0.42)" : "rgba(255,255,255,0.08)"};
    box-shadow: ${({ $clickable }) =>
      $clickable
        ? "0 22px 32px rgba(0, 0, 0, 0.42)"
        : "0 20px 28px rgba(0, 0, 0, 0.35)"};
  }
`;

export const FeatureIcon = styled.div`
  font-size: 1.95rem;
  margin-bottom: 0.55rem;
`;

export const FeatureTitle = styled.h3`
  color: #ffffff;
  margin-bottom: 0.35rem;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.lg || "1.125rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: ${({ theme }) => theme.lineHeights?.title || 1.28};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tight || "-0.02em"};
`;

export const FeatureText = styled.p`
  color: #cfd8ee;
  margin: 0;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.65};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
`;

/* CTA FINAL */
export const CTASection = styled.section`
  margin-top: 3.5rem;
  text-align: center;
  padding-top: 0.5rem;
`;

export const CTAHeader = styled.h2`
  color: #f9fafb;
  margin-bottom: 1rem;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.xl || "1.75rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  line-height: ${({ theme }) => theme.lineHeights?.heading || 1.22};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.tight || "-0.02em"};

  @media (max-width: 768px) {
    font-size: 1.45rem;
  }
`;

export const CTAButton = styled.button`
  padding: 1rem 2rem;
  min-height: 54px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #10a37f, #a3e635);
  color: #022c22;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease;
  box-shadow:
    0 10px 24px rgba(16, 163, 127, 0.24),
    0 4px 12px rgba(0, 0, 0, 0.18);

  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.03);
  }

  &:active {
    transform: translateY(0);
  }
`;