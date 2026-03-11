// ======================================================================
// 📘 DemoReglamentoStyle.js — DEMO
// ======================================================================

import styled from "styled-components";

// ======================================================
// PAGE
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
// HEADER
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
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  line-height: 1.08;
  font-weight: 900;
  color: #f4c44e;
  margin: 0 0 22px;
`;

export const Subtitle = styled.p`
  margin-top: 0.4rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: 0.85;
  color: ${({ theme }) => theme.pro.textSoft};
  max-width: 800px;
`;

export const SubInfo = styled.p`
  margin-top: 0.4rem;
  opacity: 0.7;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.pro.textSoft};
`;

// ======================================================
// GRID
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

export const LeftColumn = styled.div`
  width: 100%;
  max-width: 850px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

export const RightColumn = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 950px) {
    max-width: 100%;
  }
`;

// ======================================================
// ARTICLE CARD
// ======================================================

export const ArticleCard = styled.div`
  position: relative;
  width: 100%;
  border-radius: 18px;
  padding: ${({ theme }) => theme.spacing.lg};
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

  cursor: pointer;
  user-select: none;

  /* 🔥 Solo oscurecer si está bloqueada */
  filter: ${({ $locked }) => ($locked ? "brightness(0.65)" : "none")};

  transition: transform 0.12s ease, filter 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    transform: translateY(-2px);
    filter: ${({ $locked }) => ($locked ? "brightness(0.7)" : "none")};
    box-shadow: 0 22px 55px rgba(0, 0, 0, 0.45);
  }
`;

// Overlay DEMO (solo en bloqueados)
export const LockOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.78);
  backdrop-filter: blur(2px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  text-align: center;
  color: ${({ theme }) => theme.pro.white};
  font-weight: 700;
`;

export const LockIcon = styled.div`
  font-size: 1.6rem;
`;

export const UnlockCTA = styled.button`
  margin-top: 0.4rem;
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;

  background: ${({ theme }) => theme.colors.green};
  color: #02130a;
  font-weight: 800;
`;

// ======================================================
// CARD CONTENT
// ======================================================

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

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArticleTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: #ffc83d;
`;

export const ArticleDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.pro.white};
  opacity: 0.8;
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
// SIDEBAR
// ======================================================

export const SidebarBox = styled.div`
  background: ${({ theme }) => theme.pro.card};
  border: 1px solid ${({ theme }) => theme.pro.border};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

export const SidebarTitle = styled.h3`
  color: ${({ theme }) => theme.colors.greenLight};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
`;

export const SidebarText = styled.p`
  color: ${({ theme }) => theme.pro.textSoft};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const SidebarList = styled.ul`
  padding-left: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.pro.textSoft};

  li {
    margin-bottom: 4px;
  }
`;
