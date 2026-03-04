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
   HEADER
====================================================== */
export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    padding-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const LogoImage = styled.img`
  width: 18vw;
  max-width: 130px;
  min-width: 70px;
  margin-top: 10px;
  margin-bottom: 20px;
  aspect-ratio: 1/1;
  object-fit: contain;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Title = styled.h1`
  color: #f4d35e;
  text-align: center;
  margin: 0;
  font-weight: bold;
  font-size: 2.4rem;

  @media (max-width: 480px) {
    display: none;
  }

  @media (min-width: 768px) {
    font-size: 2.6rem;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

/* ======================================================
   HERO PRINCIPAL
====================================================== */

export const HeroSection = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 2rem 1.5rem 1rem;
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1.1fr);
  gap: 2.5rem;
  position: relative;
  z-index: 1;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 1.5rem 1.25rem 0.5rem;
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
  padding: 0.25rem 0.9rem;
  border-radius: 999px;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.grey};
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.6);
  margin-bottom: 0.9rem;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.1rem, 3vw + 1.4rem, 3.1rem);
  line-height: 1.1;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.yellow};
  margin-bottom: 0.9rem;
`;

export const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.grey};
  max-width: 32rem;
  margin-bottom: 1.6rem;
`;

/* ==========================================
   HERO CTA — AHORA SIN ESTILOS DE BOTONES
   Porque usamos los BOTONES GLOBALES PRO
========================================== */
export const HeroCTA = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-bottom: 1.6rem;
`;

/* ======================================================
   STATS
====================================================== */
export const HeroStatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
`;

export const HeroStat = styled.div`
  min-width: 7rem;
`;

export const HeroStatNumber = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.grey};
`;

export const HeroStatLabel = styled.div`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.grey};
`;

/* ======================================================
   HERO SIDE CARD
====================================================== */

export const HeroSideCard = styled.aside`
  align-self: center;
  background: ${({ theme }) => theme.colors.sideCardBg};
  border-radius: 1.4rem;
  padding: 1.6rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.7);
  max-width: 26rem;

  @media (max-width: 960px) {
    max-width: 100%;
  }
`;

export const HeroSideBadge = styled.div`
  padding: 0.25rem 0.8rem;
  border-radius: 999px;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(22, 163, 74, 0.18);
  color: #bbf7d0;
  border: 1px solid rgba(34, 197, 94, 0.5);
  margin-bottom: 0.9rem;
`;

export const HeroSideTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #e5e7eb;
`;

export const HeroSideText = styled.p`
  font-size: 0.9rem;
  color: #d1fae5;
`;

export const HeroSideList = styled.ul`
  padding: 0;
  list-style: none;
  margin-top: 0.4rem;
`;

export const HeroSideItem = styled.li`
  font-size: 0.88rem;
  color: #c7d2fe;
  margin-bottom: 0.35rem;
`;

/* ======================================================
   TODAS LAS SECCIONES SIGUEN IGUAL (NO BOTONES)
====================================================== */

export const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 2.7rem 1.5rem 0;

  ${({ background }) =>
    background === "alt" &&
    `
    background: radial-gradient(circle at top, rgba(15,23,42,0.9), rgba(2,6,23,0.9));
    border-radius: 24px;
    margin-top: 1.2rem;
  `}

  @media (max-width: 960px) {
    padding: 2.3rem 1.25rem 0;
  }
`;

export const SectionHeader = styled.div`
  max-width: 44rem;
  margin-bottom: 2rem;
`;

export const SectionTag = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #a5b4fc;
  margin-bottom: 0.4rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: #f9fafb;
`;

export const SectionSubtitle = styled.p`
  font-size: 0.95rem;
  color: #9ca3af;
`;

/* (EL RESTO DEL ARCHIVO SIGUE IGUAL – NO HAY BOTONES A MODIFICAR)
   FeatureCard, Steps, Testimonials, FinalCTASection… 
   ya están correctos y no contienen botones propios.
*/


/* =========================
   GRID FEATURES
   ========================= */

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
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
  padding: 1.2rem 1.3rem 1.3rem;
  border: 1px solid rgba(55, 65, 81, 0.9);
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.75);
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
    font-size: 1rem;
    font-weight: 600;
    color: #e5e7eb;
    margin-bottom: 0.4rem;
  }

  p {
    font-size: 0.88rem;
    color: #9ca3af;
    margin-bottom: 0.8rem;
  }
`;

export const FeatureIcon = styled.div`
  font-size: 1.6rem;
  margin-bottom: 0.7rem;
`;

export const PillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

export const Pill = styled.span`
  font-size: 0.75rem;
  padding: 0.15rem 0.6rem;
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
  gap: 1.4rem;
  padding-bottom: 2.5rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const StepItem = styled.div`
  background: rgba(15, 23, 42, 0.95);
  border-radius: 1.1rem;
  padding: 1.2rem 1.3rem;
  border: 1px solid rgba(55, 65, 81, 0.9);
`;

export const StepNumber = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  background: rgba(34, 197, 94, 0.15);
  color: #bbf7d0;
  border: 1px solid rgba(34, 197, 94, 0.7);
  margin-bottom: 0.5rem;
`;

export const StepTitle = styled.h3`
  font-size: 0.98rem;
  font-weight: 600;
  color: #e5e7eb;
  margin-bottom: 0.4rem;
`;

export const StepText = styled.p`
  font-size: 0.86rem;
  color: #9ca3af;
`;

/* =========================
   TESTIMONIOS
   ========================= */

export const TestimonialsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.3rem;
  padding-bottom: 2.7rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const TestimonialCard = styled.div`
  background: rgba(15, 23, 42, 0.95);
  border-radius: 1.1rem;
  padding: 1.3rem 1.4rem;
  border: 1px solid rgba(55, 65, 81, 0.9);
`;

export const TestimonialQuote = styled.p`
  font-size: 0.9rem;
  color: #e5e7eb;
  margin-bottom: 0.8rem;
`;

export const TestimonialName = styled.div`
  font-size: 0.86rem;
  font-weight: 600;
  color: #d1fae5;
`;

export const TestimonialRole = styled.div`
  font-size: 0.78rem;
  color: #9ca3af;
`;

/* =========================
   SEO CARD (ya existente)
   ========================= */

export const SeoCard = styled.section`
  color: #f1f1f1;
  padding: 2rem;
  max-width: 900px;
  margin: 3rem auto 0;
  line-height: 1.7;
  text-align: left;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 12px;

  h1 {
    color: #f4d35e;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  h2 {
    color: #f4d35e;
    margin-top: 2rem;
    margin-bottom: 0.6rem;
  }

  h3 {
    margin-top: 1.8rem;
    color: #2ce3b5;
  }

  p {
    margin-bottom: 1.3rem;
    font-size: 1rem;
    opacity: 0.95;
  }

  strong {
    color: #f1f1f1f1;
  }
`;

/* 🌟 Animaciones de entrada suave */
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
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #f9fafb;
`;

export const FinalCTAText = styled.p`
  font-size: 0.95rem;
  color: #9ca3af;
  max-width: 40rem;
  margin-bottom: 1.6rem;
`;
