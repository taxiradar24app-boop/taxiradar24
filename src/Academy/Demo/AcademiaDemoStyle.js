// ======================================================================
// 🎨 ACADEMIA DEMO — ESTILOS OFICIALES TAXIRADAR24
// Unificados, sin botones locales, preparados para el sistema global PRO.
// ======================================================================

import styled from "styled-components";

/* =====================================================
   🎯 BANNER SUPERIOR DEMO
===================================================== */
export const DemoTopBanner = styled.div`
  width: 100%;
  background: rgba(15, 23, 42, 0.85);
  border-bottom: 1px solid rgba(148, 163, 184, 0.25);
  padding: 0.85rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  top: 0;
  z-index: 50;

  strong {
    color: #a3e635;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

export const DemoTopBannerCTA = styled.button`
  padding: 0.55rem 1rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.headerActiveBg || "#10b981"};
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  transition: 0.16s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
  }
`;

/* =====================================================
   🎯 WRAPPER PRINCIPAL DEMO
===================================================== */
export const DemoWrapper = styled.div`
background: ${({ theme }) => theme.pro?.blueDeep || "#081325"};
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
`;

export const DemoContainer = styled.div`
background: ${({ theme }) => theme.pro?.blueDeep || "rgba(15, 23, 42, 0.85)"};
  width: 100%;
  max-width: 1200px;
  padding: 0 1.5rem;
`;

/* =====================================================
   🎯 HERO DEMO
===================================================== */
export const DemoHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2.5rem;
  margin-bottom: 3rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 1.8rem;
  }
`;

export const DemoTagline = styled.div`
  display: inline-flex;
  background: rgba(15, 23, 42, 0.9);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  color: #bbf7d0;
  font-size: 0.75rem;
  margin-bottom: 0.6rem;
  letter-spacing: 0.04em;
  border: 1px solid rgba(34, 197, 94, 0.35);
`;

export const DemoBread = styled.div`
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.7rem;

  background: rgba(30, 64, 175, 0.26);
  border: 1px solid rgba(59, 130, 246, 0.4);
  color: #93c5fd;
`;

export const DemoTitle = styled.h1`
  font-size: clamp(1.8rem, 3vw + 1rem, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: white;
  margin-bottom: 0.9rem;
`;

export const DemoHighlight = styled.span`
  color: #a3e635;
`;

export const DemoSubtitle = styled.p`
  font-size: 1.05rem;
  color: #d1d9e6;
  max-width: 34rem;
  margin-bottom: 1.4rem;
  line-height: 1.55;
`;

/* =====================================================
   📊 ESTADÍSTICAS DEMO
===================================================== */
export const StatsRow = styled.div`
  display: flex;
  gap: 2.2rem;
  flex-wrap: wrap;
  margin-bottom: 1.8rem;

  @media (max-width: 480px) {
    gap: 1.4rem;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;

  .stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: #a3e635;
  }

  .stat-label {
    font-size: 0.85rem;
    color: #d1d9e6;
  }
`;

/* =====================================================
   🚀 CTA GROUP
   (Aquí van solo contenedores, los BOTONES son globales)
===================================================== */
export const CTAGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.8rem;
`;

/* =====================================================
   🟦 CARD DERECHA — CONVOCATORIAS
===================================================== */
export const HeroRightCard = styled.section`
  background: linear-gradient(
    145deg,
    rgba(15, 23, 42, 0.96),
    rgba(6, 78, 59, 0.98)
  );
  border-radius: 1.4rem;
  padding: 1.6rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.7);

  h3 {
    font-size: 0.88rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #93c5fd;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.9rem;
  }

  ul {
    margin-bottom: 0.8rem;
    padding-left: 1.2rem;
    color: #d1fae5;
    line-height: 1.55;
  }

  small {
    color: #cbd5f5;
    opacity: 0.85;
  }
`;

/* =====================================================
   🟩 SECCIÓN DEMO
===================================================== */
export const SectionTitleBlock = styled.div`
  margin-bottom: 2rem;

  h2 {
    color: white;
    margin-bottom: 0.6rem;
  }

  p {
    color: #cbd5f5;
    font-size: 1rem;
    max-width: 32rem;
  }
`;

/* =====================================================
   🟨 GRID DE MÓDULOS DEMO
===================================================== */
export const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.4rem;
  margin-bottom: 3rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

export const ModuleCard = styled.div`
  background: rgba(15, 23, 42, 0.92);
  padding: 1.3rem 1.4rem;
  border-radius: 1.2rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: #a3e635;
  }

  header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.6rem;

    h3 {
      color: white;
      font-size: 1.05rem;
    }
  }

  p {
    color: #cfd8ee;
    line-height: 1.45;
    margin-bottom: 0.8rem;
  }
`;

export const Emoji = styled.span`
  font-size: 1.4rem;
`;

export const Pill = styled.div`
  display: inline-block;
  font-size: 0.78rem;
  padding: 0.28rem 0.8rem;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.18);
  border: 1px solid rgba(34, 197, 94, 0.45);
  color: #bbf7d0;
`;

/* =====================================================
   🟦 STRIP FINAL
===================================================== */
export const DemoStrip = styled.div`
  margin-top: 2rem;
  padding: 1.4rem 1.6rem;
  border-radius: 1.2rem;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.25);
  color: #e5e7eb;
`;

export const DemoDotList = styled.ul`
  padding-left: 1.2rem;
  margin-top: 0.8rem;

  li {
    margin-bottom: 0.4rem;
    color: #cbd5f5;
  }
`;
