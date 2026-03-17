// src/Academy/componentsAcademy/SidebarProAcademiaStyle.js
// ======================================================================
// 📚 SidebarProAcademiaStyle.js — PRO | TAXIRADAR24 ENTERPRISE
// ✅ Fijo en línea darkTheme
// ✅ Sidebar arriba en móvil
// ✅ Chips coherentes con la paleta base global
// ✅ Sin depender del botón Sol/Luna
// ======================================================================

import styled from "styled-components";

/* ============================================================
   🟦 WRAPPER PRINCIPAL
============================================================ */
export const SidebarWrapper = styled.aside`
  width: 28%;
  max-width: 340px;

  background: rgba(14, 26, 51, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border: 1px solid
    ${({ theme }) => theme.pro.border || "rgba(255,255,255,0.07)"};
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

    backdrop-filter: none;
    -webkit-backdrop-filter: none;
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
  margin: 0 0 10px 0;

  color: ${({ theme }) =>
    theme.colors?.green ||
    theme.colors?.academy?.accentAcademy ||
    "#10a37f"};

  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;
export const SidebarText = styled.p`
  margin: 0 0 16px 0;
  color: ${({ theme }) =>
    theme.colors?.academy?.textSoft || theme.pro.textSoft || "#b9c3d6"};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  strong {
    color: ${({ theme }) =>
      theme.colors?.academy?.textMain || theme.pro.text || "#e6edf7"};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
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
  background: ${({ theme }) =>
    theme.colors?.academy?.surfaceSoft || theme.pro.cardAlt || "#132447"};
  border: 1px solid
    ${({ theme }) => theme.pro.border || "rgba(255,255,255,0.07)"};
  border-radius: 10px;
  color: ${({ theme }) =>
    theme.colors?.academy?.textMain || theme.pro.text || "#e6edf7"};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  cursor: pointer;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.18s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.colors?.academy?.surfaceLight || "#1a2f55"};
    border-color: rgba(44, 227, 181, 0.22);
    transform: translateY(-1px);
  }
`;

export const ChipActive = styled(Chip)`
  background: ${({ theme }) => theme.colors?.green || "#10a37f"};
  border-color: ${({ theme }) => theme.colors?.green || "#10a37f"};
  color: ${({ theme }) => theme.colors?.white || "#ffffff"};
  box-shadow: 0 8px 22px rgba(16, 163, 127, 0.22);

  &:hover {
    background: ${({ theme }) => theme.colors?.greenLight || "#2ce3b5"};
    border-color: ${({ theme }) => theme.colors?.greenLight || "#2ce3b5"};
    color: ${({ theme }) => theme.colors?.blueDeep || "#0A1528"};
  }
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
    color: ${({ theme }) => theme.colors?.white || "#ffffff"};
    font-weight: 900;
  }
`;

export const ChipDone = styled(Chip)`
  background: rgba(16, 163, 127, 0.12);
  border-color: rgba(44, 227, 181, 0.4);
  color: ${({ theme }) => theme.colors?.greenLight || "#2ce3b5"};
  position: relative;
  padding-right: 30px;

  &::after {
    content: "✓";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors?.greenLight || "#2ce3b5"};
    font-weight: 900;
  }

  &:hover {
    background: rgba(16, 163, 127, 0.18);
    border-color: rgba(44, 227, 181, 0.58);
    color: ${({ theme }) => theme.colors?.white || "#ffffff"};
  }
`;

export const ChipRetry = styled(Chip)`
  background: rgba(255, 200, 61, 0.08);
  border-color: rgba(255, 200, 61, 0.34);
  color: ${({ theme }) => theme.colors?.yellow || "#FFC83D"};
  position: relative;
  padding-right: 30px;

  &::after {
    content: "!";
    position: absolute;
    right: 11px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors?.yellow || "#FFC83D"};
    font-weight: 900;
  }

  &:hover {
    background: rgba(255, 200, 61, 0.14);
    border-color: rgba(255, 200, 61, 0.52);
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
  background: ${({ theme }) =>
    theme.colors?.academy?.surfaceSoft || theme.pro.cardAlt || "#132447"};
  border: 1px solid
    ${({ theme }) => theme.pro.border || "rgba(255,255,255,0.07)"};
  padding: 12px 14px;
  border-radius: 12px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) =>
    theme.colors?.academy?.textMain || theme.pro.text || "#e6edf7"};
  cursor: pointer;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.18s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.colors?.academy?.surfaceLight || "#1a2f55"};
    border-color: rgba(44, 227, 181, 0.18);
    transform: translateY(-1px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ModuleIcon = styled.div`
  width: 30px;
  height: 30px;
  background: rgba(16, 163, 127, 0.12);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors?.greenLight || "#2ce3b5"};
  font-size: 1.05rem;
  flex-shrink: 0;
`;

export const ModuleLabel = styled.span`
  color: ${({ theme }) =>
    theme.colors?.academy?.textMain || theme.pro.text || "#e6edf7"};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.title};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
`;