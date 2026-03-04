// src/Academy/upgrade/UpgradeStyles.js
import styled from "styled-components";

/* ============================================
   WRAPPER GENERAL
============================================ */
export const UpgradeWrapper = styled.div`
  padding: 3rem 1.5rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

/* ============================================
   HERO SUPERIOR (TAG + TITULO + SUBTITULO)
============================================ */
export const HeroTag = styled.div`
  font-size: 0.85rem;
  text-transform: uppercase;
  color: #a3e635;
  margin-bottom: 0.7rem;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.2;
  font-weight: 800;
  color: #f9fafb;
  margin-bottom: 1rem;
`;

export const HeroSubtitle = styled.p`
  color: #cbd5f5;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  max-width: 680px;
`;

/* ============================================
   GRID DE PLANES
============================================ */
export const PlansGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const PlanCard = styled.div`
  background: rgba(15, 23, 42, 0.9);
  border-radius: 1rem;
  padding: 1.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 32px rgba(0, 0, 0, 0.4);
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #a3e635;
  }
`;

export const PlanTitle = styled.h3`
  color: #e2e8f0;
  font-size: 1.35rem;
  margin-bottom: 0.6rem;
`;

export const PlanPrice = styled.div`
  color: #a3e635;
  font-size: 2rem;
  margin: 0.8rem 0 1.4rem;
  font-weight: bold;
`;

/* ============================================
   BOTÓN UNIVERSAL TAXIRADAR24
============================================ */
export const PlanButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  margin-top: 1.2rem;
  font-size: 1.1rem;
  border-radius: 14px;
  cursor: pointer;
  border: none;

  background: linear-gradient(90deg, #22c55e, #a3e635);
  color: #0f172a;
  font-weight: 600;

  box-shadow: 0 0 18px rgba(34, 197, 94, 0.35);
  transition: 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 24px rgba(163, 230, 53, 0.45);
  }
`;

/* ============================================
   FRASE FINAL MOTIVACIONAL
============================================ */
export const GuaranteeBox = styled.div`
  margin-top: 4rem;
  padding: 2rem;
  border-radius: 1.2rem;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 12px 18px rgba(0,0,0,0.35);
  text-align: center;
`;

export const GuaranteeTitle = styled.h3`
  color: #f9fafb;
  margin-bottom: 0.6rem;
  font-size: 1.4rem;
`;

export const GuaranteeText = styled.p`
  color: #cbd5f5;
  max-width: 680px;
  margin: 0 auto;
  font-size: 1.05rem;
`;
