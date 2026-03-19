// ======================================================================
// 📘 ReglamentoMenuStyle.js — PRO (UX tuned)
// ✅ SOLO UX: tipografía más ligera en cards y sidebar
// ======================================================================

import styled from "styled-components";

// ======================================================
// PAGE WRAPPER
// ======================================================

export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.pro.pageBg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ======================================================
// HEADER SUPERIOR (100% ANCHO)
// ======================================================

export const HeaderDemo = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TagDemo = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.green}33;
  color: ${({ theme }) => theme.colors.greenLight};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const Title = styled.h1`
  margin-top: 0.8rem;
  font-size: ${({ theme }) => theme.fontSizes.hero};
  color: ${({ theme }) => theme.colors.yellow};
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Subtitle = styled.p`
  margin-top: 0.4rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: 0.85;
  color: ${({ theme }) => theme.pro.textSoft};
  max-width: 800px;
  line-height: 1.65;
`;

export const SubInfo = styled.p`
  margin-top: 0.4rem;
  opacity: 0.7;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.pro.textSoft};
`;

// ======================================================
// LEFT COLUMN — CÁPSULAS (70%)
// ======================================================

export const LeftColumn = styled.div`
  width: 100%;
  max-width: 850px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
`;

// ======================================================
// CÁPSULAS DE ARTÍCULOS
// ======================================================

export const ArticleCard = styled.div`
  width: 100%;
  border-radius: 18px;
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  border: 1px solid rgba(148, 163, 184, 0.35);

  background: radial-gradient(
    circle at top left,
    rgba(51, 65, 85, 0.55),
    rgba(15, 23, 42, 0.96)
  );
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.85);

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(74, 222, 128, 0.7);

    background: radial-gradient(
      circle at top left,
      rgba(74, 222, 128, 0.12),
      rgba(15, 23, 42, 0.98)
    );

    box-shadow: 0 26px 60px rgba(15, 23, 42, 0.95);
  }

  &:active {
    transform: translateY(-1px);
    filter: brightness(0.98);
  }
`;

export const ArticleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ArticleNumber = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.green}33;
  color: ${({ theme }) => theme.colors.greenLight};
  font-weight: 700;
  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArticleTitle = styled.h3`
  font-size: 1.05rem; /* UX: menos carga */
  font-weight: 600; /* UX: menos peso */
  color: #ffc83d !important; /* ← AMARILLO FIJO */
  line-height: 1.3;
`;

export const ArticleDescription = styled.p`
  margin-top: 4px;
  font-size: 0.9rem; /* UX: más ligero */
  color: ${({ theme }) => theme.pro.white};
  opacity: 0.88;
  line-height: 1.55;
`;

export const ArticleFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.85;
  color: ${({ theme }) => theme.pro.textSoft};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

// ======================================================
// GRIDLAYOUT
// ======================================================

export const GridLayout = styled.div`
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 70% 30%;
  column-gap: 50px;
  align-items: start;

  padding-left: 20px;
  padding-right: 40px;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
    padding-right: 16px;
    padding-left: 16px;
  }
`;

// ======================================================
// RIGHT COLUMN
// ======================================================

export const RightColumn = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-right: 24px;

  @media (max-width: 950px) {
    padding-right: 0;
  }
`;

export const SidebarBox = styled.div`
  background: ${({ theme }) => theme.pro.card};
  border: 1px solid ${({ theme }) => theme.pro.border};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

export const SidebarTitle = styled.h3`
  color: ${({ theme }) => theme.colors.greenLight};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1.05rem; /* UX: menos pesado */
  font-weight: 650;
`;

export const SidebarText = styled.p`
  color: ${({ theme }) => theme.pro.textSoft};
  font-size: 0.95rem; /* UX: más ligero */
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1.6;
`;

export const SidebarList = styled.ul`
  padding-left: 1rem;
  color: ${({ theme }) => theme.pro.textSoft};
  font-size: 0.95rem; /* UX: más ligero */
  line-height: 1.6;

  li {
    margin-bottom: 6px;
  }
`;

export const DifficultyPill = styled.span`
  padding: 4px 12px;
  border-radius: 40px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.pro.white};
`;

export const TimeText = styled.span`
  color: ${({ theme }) => theme.pro.white};
  font-weight: 500;
  opacity: 0.9;
`;
// ======================================================
// DOCUMENTACIÓN OFICIAL (NEW)
// ======================================================

export const OfficialDocs = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.pro.textSoft};
  opacity: 0.9;
`;

export const DocsLabel = styled.span`
  margin-right: 8px;
  opacity: 0.7;
`;

export const DocLink = styled.a`
  color: ${({ theme }) => theme.colors.green};
  text-decoration: none;
  font-weight: 600;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
    opacity: 0.9;
  }
`;