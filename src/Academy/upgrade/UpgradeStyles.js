// src/Academy/upgrade/UpgradeStyles.js

import styled from "styled-components";

/* ================================
   WRAPPER GENERAL
================================ */

export const UpgradeWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;

  @media (max-width: 720px) {
    padding: 2rem 1rem 3rem;
  }
`;

/* ================================
   HERO
================================ */

export const HeroTag = styled.div`
  color: #a3e635;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.06em;
  margin-bottom: 0.85rem;
  text-transform: uppercase;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 2.5vw + 1.4rem, 3.15rem);
  line-height: 1.04;
  font-weight: ${({ theme }) => theme.fontWeights.heavy};
  color: #f8fafc;
  max-width: 980px;
  margin: 0 0 1rem;
  letter-spacing: ${({ theme }) => theme.letterSpacings.tighter};

  @media (max-width: 720px) {
    font-size: clamp(2rem, 8vw, 3rem);
    line-height: 1.08;
  }
`;

export const HeroSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.body};
  max-width: 760px;
  margin: 0 0 2.4rem;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

/* ================================
   PLANES
================================ */

export const PlansSection = styled.section`
  width: 100%;
  margin-top: 1.2rem;
`;

export const PlansContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 280px;
  gap: 1rem;
  width: 100%;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const PlanCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;


  background: ${({ pro }) =>
    pro ? "rgba(16, 163, 127, 0.2)" : "rgba(15, 23, 42, 0.8)"};

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.6rem;
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.35);

  @media (max-width: 600px) {
    height: auto;
  }
`;

export const PlanTitle = styled.h3`
  color: #e2e8f0;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const PlanPrice = styled.div`
  color: #a3e635;
  font-size: clamp(1.6rem, 2vw, 2rem);
  margin: 0.75rem 0 1.1rem;
  font-weight: ${({ theme }) => theme.fontWeights.heavy};
  line-height: 1;
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const PlanList = styled.div`
  width: 100%;
  flex: 1;
  margin-bottom: 1rem;
  padding-right: 0.15rem;

  @media (min-width: 961px) {
    min-height: 250px;
  }

  @media (max-width: 960px) {
    min-height: 220px;
  }

  @media (max-width: 600px) {
    min-height: auto;
  }
`;

export const PlanItem = styled.div`
  color: #cfd8ee;
  margin-bottom: 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

export const PlanButtonWrap = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  display: flex;
  align-items: flex-end;

  & > * {
    width: 100%;
    justify-content: center;
  }
`;

/* ================================
   CIERRE FINAL
================================ */

export const ClosingBox = styled.div`
  margin-top: 2.8rem;
  padding: 2.3rem 1.6rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 23, 42, 0.82);
  text-align: center;
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.28);

  @media (max-width: 720px) {
    padding: 1.8rem 1rem;
    border-radius: 20px;
  }
`;

export const ClosingTag = styled.div`
  color: #10a37f;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const ClosingTitle = styled.h3`
  color: #f8fafc;
  font-size: clamp(1.6rem, 3vw, 2rem);
  font-weight: ${({ theme }) => theme.fontWeights.heavy};
  margin: 0 0 0.85rem;
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const ClosingText = styled.p`
  max-width: 760px;
  margin: 0 auto 1.5rem;
  color: rgba(255, 255, 255, 0.76);
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

export const ClosingButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  & > * {
    min-width: 240px;
    justify-content: center;
  }
`;