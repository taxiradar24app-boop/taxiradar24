// src/Academy/componentsAcademy/SidebarProAcademiaStyle.js
// ======================================================================
// 📚 SidebarProAcademiaStyle.js — PRO | TAXIRADAR24 ENTERPRISE
// Estilo final para Sidebar con proporción del 28%
// ======================================================================

import styled from "styled-components";

/* ============================================================
   🟦 WRAPPER PRINCIPAL DEL SIDEBAR
   ============================================================ */
export const SidebarWrapper = styled.aside`
  width: 28%;
  max-width: 340px;

  background: ${({ theme }) => theme.pro.sidebarBg};
  border: 1px solid ${({ theme }) => theme.pro.sidebarBorder};
  border-radius: 20px;

  padding: 28px 22px;

  position: sticky;
  top: 24px;

  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: 992px) {
    width: 100%;
    max-width: 100%;
    position: relative;
    top: 0;
  }
`;

/* ============================================================
   🟦 SECCIONES
   ============================================================ */
export const SidebarSection = styled.div`
  margin-bottom: 28px;
`;

export const SidebarTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.pro.text};
  margin-bottom: 8px;
`;

export const SidebarText = styled.p`
  color: ${({ theme }) => theme.pro.textSoft};
  font-size: 0.95rem;
  line-height: 1.45;
  margin-bottom: 14px;
`;

/* ============================================================
   🟩 PROGRESS BAR
   ============================================================ */
export const ProgressBarTrack = styled.div`
  background: ${({ theme }) => theme.pro.card};
  height: 8px;
  border-radius: 20px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div`
  background: ${({ theme }) => theme.colors.green};
  height: 8px;
  width: 0%;
  transition: 0.3s ease;
`;

/* ============================================================
   🟦 CHIPS DE BLOQUES
   ============================================================ */
export const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.button`
  padding: 8px 14px;

  background: ${({ theme }) => theme.pro.card};
  border: 1px solid ${({ theme }) => theme.pro.border};

  border-radius: 10px;
  color: ${({ theme }) => theme.pro.text};
  font-size: 0.9rem;

  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: ${({ theme }) => theme.pro.cardAlt};
  }
`;

export const ChipActive = styled(Chip)`
  background: ${({ theme }) => theme.colors.green};
  color: white;
`;

/* ✅ NUEVO: Activo + Done (verde + check) */
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

/* ✅ NUEVO: Done 100% (no activo) */
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

/* 🟧 NUEVO: Hecho pero no 100% (repetir / mejorar) */
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
  font-size: 1.1rem;
`;

export const ModuleLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.pro.text};
`;