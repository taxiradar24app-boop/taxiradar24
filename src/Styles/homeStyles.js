// src/Styles/homeStyles.js
import styled from "styled-components";

/* ======================================================
   CONTENEDOR PRINCIPAL
====================================================== */
export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(rgba(10, 15, 30, 0.28), rgba(10, 15, 30, 0.28)),
    url(${(props) => props.bg}) no-repeat center center;
  background-size: cover;
  margin: 0;
  padding: 0 0 3rem 0;
  border: none;
  position: relative;
  overflow-x: hidden;
`;

/* ======================================================
   HERO PRINCIPAL
====================================================== */
export const HeroSection = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 2rem 1.5rem 1rem;
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1.05fr);
  gap: 2.25rem;
  position: relative;
  z-index: 1;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 1.5rem 1.25rem 0.5rem;
    gap: 1.5rem;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeroTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.grey};
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.55);
  margin-bottom: 0.95rem;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 2.5vw + 1.4rem, 3.15rem);
  line-height: 1.04;
  font-weight: ${({ theme }) => theme.fontWeights.heavy};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tighter};
  color: ${({ theme }) => theme.colors.yellow};
  margin-bottom: 0.3rem;
  max-width: 30ch;
`;

export const SubTitle = styled.span`
  display: block;
  font-size: clamp(1.15rem, 1vw + 1rem, 2rem);
  line-height: 1.08;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  color: ${({ theme }) => theme.colors.grey};
  max-width: 24ch;
  margin-top: 0.15rem;
`;

export const Title2 = styled.h2`
  font-size: clamp(1.65rem, 1.2vw + 1rem, 2.6rem);
  line-height: 1.08;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  color: ${({ theme }) => theme.colors.yellow};
  max-width: 20ch;
  margin: 0.8rem 0 0.5rem 0;

  @media (max-width: 768px) {
    margin: 0.95rem 0 0.4rem 0;
    max-width: 18ch;
  }

  @media (max-width: 480px) {
    margin: 0.8rem 0 0.2rem 0;
    font-size: clamp(1.5rem, 5.8vw, 2.15rem);
    max-width: 18ch;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  color: ${({ theme }) => theme.colors.grey};
  max-width: 34rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 1.6;
    max-width: 30rem;
  }
`;

export const HeroCTA = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-bottom: 1.55rem;
`;

/* ======================================================
   STATS
====================================================== */
export const HeroStatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const HeroStat = styled.div`
  min-width: 7rem;
`;

export const HeroStatNumber = styled.div`
  font-size: clamp(1.45rem, 1vw + 1rem, 2rem);
  font-weight: ${({ theme }) => theme.fontWeights.heavy};
  line-height: 1;
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 0.2rem;
`;

export const HeroStatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.35;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  color: ${({ theme }) => theme.colors.grey};
  max-width: 9rem;
`;

/* ======================================================
   HERO SIDE CARD
====================================================== */
export const HeroSideCard = styled.aside`
  align-self: center;
  background: ${({ theme }) => theme.colors.sideCardBg};
  border-radius: 1.45rem;
  padding: 1.6rem;
  border: 1px solid rgba(148, 163, 184, 0.32);
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.72);
  max-width: 26rem;

  @media (max-width: 960px) {
    max-width: 100%;
  }
`;

export const HeroSideBadge = styled.div`
  display: inline-flex;
  width: fit-content;
  padding: 0.28rem 0.8rem;
  border-radius: 999px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(22, 163, 74, 0.18);
  color: #bbf7d0;
  border: 1px solid rgba(34, 197, 94, 0.5);
  margin-bottom: 0.9rem;
`;

export const HeroSideTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  color: #e5e7eb;
  margin-bottom: 0.65rem;
`;

export const HeroSideText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  color: #d1fae5;
  margin-bottom: 0.75rem;
`;

export const HeroSideList = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0.2rem 0 0 0;
`;

export const HeroSideItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.55;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  color: #c7d2fe;
  margin-bottom: 0.4rem;
`;

/* ======================================================
   SECCIONES GENERALES
====================================================== */
export const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 2.65rem 1.5rem 0;

  ${({ background }) =>
    background === "alt" &&
    `
    background: radial-gradient(circle at top, rgba(15,23,42,0.9), rgba(2,6,23,0.9));
    border-radius: 24px;
    margin-top: 1.2rem;
  `}

  @media (max-width: 960px) {
    padding: 2.2rem 1.25rem 0;
  }
`;

export const SectionHeader = styled.div`
  max-width: 46rem;
  margin-bottom: 1.9rem;
`;

export const SectionTag = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #a5b4fc;
  margin-bottom: 0.42rem;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.55rem, 1vw + 1.2rem, 2.15rem);
  line-height: 1.18;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  margin-bottom: 0.65rem;
  color: #f9fafb;
`;

export const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  color: #9ca3af;
`;

/* =========================
   GRID FEATURES
========================= */
export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.35rem;
  padding-bottom: 2.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: rgba(15, 23, 42, 0.95);
  border-radius: 1.3rem;
  padding: 1.2rem 1.25rem 1.25rem;
  border: 1px solid rgba(55, 65, 81, 0.9);
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.74);
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    border-color 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 26px 40px rgba(15, 23, 42, 0.9);
    border-color: rgba(129, 140, 248, 0.7);
    background: radial-gradient(
      circle at top,
      rgba(30, 64, 175, 0.7),
      rgba(15, 23, 42, 0.98)
    );
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: ${({ theme }) => theme.lineHeights.title};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
    color: #e5e7eb;
    margin-bottom: 0.45rem;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.body};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
    color: #9ca3af;
    margin-bottom: 0.8rem;
  }
`;

export const FeatureIcon = styled.div`
  font-size: 1.55rem;
  margin-bottom: 0.7rem;
`;

export const PillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

export const Pill = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  padding: 0.16rem 0.62rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.7);
  color: #e5e7eb;
`;

/* =========================
   STEPS / RUTA
========================= */
export const StepsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.35rem;
  padding-bottom: 2.45rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const StepItem = styled.div`
  background: rgba(15, 23, 42, 0.95);
  border-radius: 1.1rem;
  padding: 1.2rem 1.25rem;
  border: 1px solid rgba(55, 65, 81, 0.9);
`;

export const StepNumber = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: rgba(34, 197, 94, 0.15);
  color: #bbf7d0;
  border: 1px solid rgba(34, 197, 94, 0.7);
  margin-bottom: 0.55rem;
`;

export const StepTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  color: #e5e7eb;
  margin-bottom: 0.42rem;
`;

export const StepText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  color: #9ca3af;
`;

/* =========================
   TESTIMONIOS
========================= */
export const TestimonialsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.3rem;
  padding-bottom: 2.65rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const TestimonialCard = styled.div`
  background: rgba(15, 23, 42, 0.95);
  border-radius: 1.1rem;
  padding: 1.3rem 1.35rem;
  border: 1px solid rgba(55, 65, 81, 0.9);
`;

export const TestimonialQuote = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  color: #e5e7eb;
  margin-bottom: 0.82rem;
`;

export const TestimonialName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: #d1fae5;
`;

export const TestimonialRole = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: #9ca3af;
`;

/* =========================
   SEO CARD
========================= */
export const SeoCard = styled.section`
  color: #f1f1f1;
  padding: 2rem;
  max-width: 900px;
  margin: 3rem auto 0;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  text-align: left;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 12px;

  h1 {
    color: #f4d35e;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: clamp(1.7rem, 1vw + 1.2rem, 2.3rem);
    font-weight: ${({ theme }) => theme.fontWeights.heavy};
    line-height: ${({ theme }) => theme.lineHeights.heading};
    letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  }

  h2 {
    color: #f4d35e;
    margin-top: 2rem;
    margin-bottom: 0.6rem;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.heading};
  }

  h3 {
    margin-top: 1.8rem;
    color: #2ce3b5;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.title};
  }

  p {
    margin-bottom: 1.3rem;
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.body};
    letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
    opacity: 0.95;
  }

  strong {
    color: #f1f1f1;
  }
`;

/* =========================
   ANIMACIÓN ENTRADA
========================= */
export const FadeInSection = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  will-change: opacity, transform;

  &.is-visible {
    opacity: 1;
    transform: none;
  }
`;

/* =========================
   CTA FINAL
========================= */
export const FinalCTASection = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 3rem 1.5rem 0;
`;

export const FinalCTATitle = styled.h2`
  font-size: clamp(1.55rem, 1vw + 1.2rem, 2rem);
  line-height: 1.18;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  margin-bottom: 0.55rem;
  color: #f9fafb;
`;

export const FinalCTAText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  color: #9ca3af;
  max-width: 42rem;
  margin-bottom: 1.55rem;
`;