// src/Academy/componentsAcademy/SidebarProAcademiaStyle.js
// ======================================================================
// 📚 SidebarProAcademiaStyle.js — PRO | TAXIRADAR24 ENTERPRISE
// ✅ Sidebar arriba en móvil
// ✅ Tipografía afinada
// ✅ Sin bloque de progreso
// ======================================================================

import styled from "styled-components";

/* ============================================================
   🟦 WRAPPER PRINCIPAL
============================================================ */
export const SidebarWrapper = styled.aside`
  width: 28%;
  max-width: 340px;
  background: ${({ theme }) => theme.pro.sidebarBg || theme.pro.card};
  border: 1px solid ${({ theme }) => theme.pro.sidebarBorder || theme.pro.border};
  border-radius: 20px;
  padding: 24px 18px;
  position: sticky;
  top: 24px;
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: 992px) {
    width: 100%;
    max-width: 100%;
    position: relative;
    top: 0;
    order: -1;
    padding: 18px 14px;
    border-radius: 18px;
  }
`;

/* ============================================================
   🟦 SECCIONES
============================================================ */
export const SidebarSection = styled.div`
  margin-bottom: 26px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SidebarTitle = styled.h3`
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.pro.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const SidebarText = styled.p`
  margin: 0 0 14px 0;
  color: ${({ theme }) => theme.pro.textSoft};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;

/* ============================================================
   🟦 CHIPS
============================================================ */
export const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.button`
  padding: 9px 14px;
  background: ${({ theme }) => theme.pro.card};
  border: 1px solid ${({ theme }) => theme.pro.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.pro.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: ${({ theme }) => theme.pro.cardAlt};
  }
`;

export const ChipActive = styled(Chip)`
  background: ${({ theme }) => theme.colors.green};
  border-color: ${({ theme }) => theme.colors.green};
  color: #ffffff;
`;

export const ChipActiveDone = styled(ChipActive)`
  position: relative;
  padding-right: 30px;

  &::after {
    content: "✓";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.95);
    font-weight: 900;
  }
`;

export const ChipDone = styled(Chip)`
  border: 1px solid ${({ theme }) => theme.colors.green};
  background: ${({ theme }) => theme.pro.cardAlt};
  position: relative;
  padding-right: 30px;

  &::after {
    content: "✓";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.green};
    font-weight: 900;
  }
`;

export const ChipRetry = styled(Chip)`
  border: 1px solid rgba(255, 196, 87, 0.55);
  background: ${({ theme }) => theme.pro.cardAlt};
  position: relative;
  padding-right: 30px;

  &::after {
    content: "!";
    position: absolute;
    right: 11px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 196, 87, 0.95);
    font-weight: 900;
  }
`;

/* ============================================================
   🟦 MENÚ DE MÓDULOS
============================================================ */
export const ModulesList = styled.div`
  margin-top: 10px;
`;

export const ModuleItem = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.pro.card};
  border: 1px solid ${({ theme }) => theme.pro.border};
  padding: 12px 14px;
  border-radius: 12px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.pro.text};
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: ${({ theme }) => theme.pro.cardAlt};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ModuleIcon = styled.div`
  width: 30px;
  height: 30px;
  background: ${({ theme }) => theme.pro.cardAlt};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.green};
  font-size: 1.05rem;
  flex-shrink: 0;
`;

export const ModuleLabel = styled.span`
  color: ${({ theme }) => theme.pro.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;