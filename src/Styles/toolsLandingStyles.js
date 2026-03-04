import styled from "styled-components";

/* WRAPPER GENERAL */
export const PageWrapper = styled.div`
  padding: 2rem 1.5rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

/* HERO */
export const HeroSection = styled.section`
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

export const HeroContent = styled.div`
  max-width: 700px;
`;

export const HeroTag = styled.div`
  font-size: 0.85rem;
  text-transform: uppercase;
  color: #a3e635;
  margin-bottom: 0.7rem;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 2.8rem);
  line-height: 1.2;
  color: #f9fafb;
  margin-bottom: 1rem;
`;

export const HeroSubtitle = styled.p`
  color: #cbd5f5;
  margin-bottom: 1.4rem;
  font-size: 1.05rem;
  max-width: 520px;
`;

export const HeroCTA = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  background: linear-gradient(135deg, #10a37f, #a3e635);
  color: #022c22;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  border: 1px solid #94a3b8;
  color: #e2e8f0;
  background: transparent;
  cursor: pointer;
`;

/* SECCIONES */
export const Section = styled.section`
  margin-top: 3rem;

  ${({ background }) =>
    background === "alt" &&
    `
      background: radial-gradient(circle at top, rgba(15,23,42,0.9), rgba(2,6,23,0.9));
      padding: 2.5rem 1.5rem;
      border-radius: 24px;
  `}
`;

export const SectionHeader = styled.div`
  margin-bottom: 2rem;
  max-width: 600px;
`;

export const SectionTag = styled.div`
  color: #a3e635;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
`;

export const SectionTitle = styled.h2`
  color: #f9fafb;
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
`;

export const SectionSubtitle = styled.p`
  color: #9ca3af;
`;

/* FEATURES */
export const FeatureGrid = styled.div`
  display: grid;
  gap: 1.4rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: rgba(15, 23, 42, 0.9);
  border-radius: 1rem;
  padding: 1.4rem;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 20px 28px rgba(0,0,0,0.35);

  h3 {
    color: white;
    margin-bottom: 0.4rem;
  }

  p {
    color: #cfd8ee;
  }
`;

export const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.4rem;
`;

/* STEPS */
export const StepsWrapper = styled.div`
  display: grid;
  gap: 1.3rem;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const StepItem = styled.div`
  background: rgba(15, 23, 42, 0.95);
  border-radius: 1rem;
  padding: 1.4rem;
  border: 1px solid rgba(255,255,255,0.08);
`;

export const StepNumber = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.6);
  color: #bbf7d0;
  margin-bottom: 0.5rem;
`;

export const StepTitle = styled.h3`
  color: #e5e7eb;
  margin-bottom: 0.4rem;
`;

export const StepText = styled.p`
  color: #cbd5f5;
`;

/* CTA FINAL */
export const CTASection = styled.section`
  margin-top: 4rem;
  text-align: center;
`;

export const CTAHeader = styled.h2`
  color: #f9fafb;
  margin-bottom: 1rem;
`;

export const CTAButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #10a37f, #a3e635);
  color: #022c22;
  font-weight: 600;
  cursor: pointer;
`;
