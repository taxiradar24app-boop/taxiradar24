// src/Styles/academiaShopStyles.js
import styled from "styled-components";

/* ======================================================
   WRAPPER GENERAL
====================================================== */
export const PageWrapper = styled.div`
  padding: 2rem 1.5rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

/* ======================================================
   HERO
====================================================== */
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
  font-size: clamp(1.6rem, 4vw, 3.4rem);
  line-height: 1.2;
  color: #f9fafb;
  margin-bottom: 1rem;

  span {
    color: #10a37f;
    font-weight: 700;
  }
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

/* ======================================================
   FEATURE SECTION
====================================================== */
export const FeaturesSection = styled.section`
  margin-top: 3rem;
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
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 28px rgba(0, 0, 0, 0.35);
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #a3e635;
  }

  h3 {
    color: white;
  }

  p {
    color: #c3d1f3;
  }
`;

export const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.4rem;
`;

/* ======================================================
   CTA FINAL
====================================================== */
export const CTASection = styled.section`
  margin-top: 3rem;
  text-align: center;
`;

export const CTAHeader = styled.h2`
  color: white;
  margin-bottom: 1rem;
`;

/* ======================================================
   GARANTÍA
====================================================== */
export const GuaranteeBox = styled.div`
  margin-top: 4rem;
  padding: 2rem;
  border-radius: 1.2rem;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 18px rgba(0, 0, 0, 0.35);
  text-align: center;
`;
export const GuaranteeTitle = styled.h3`
  color: #10a37f;
  margin-bottom: 0.6rem;
`;

export const GuaranteeText = styled.p`
  color: #cbd5f5;
`;