// ======================================================================
// 🛠️ TOOLS LAYOUT — Versión Enterprise
// ======================================================================

import React from "react";
import { Outlet } from "react-router-dom";
import HeaderShell from "@/components/HeaderBox/shared/HeaderShell";
import styled from "styled-components";

const MainContainer = styled.main`
  padding-top: 64px; /* altura del header */
  min-height: 100vh;

  /* iPhone / Android safe-area */
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);

  /* Scroll suave */
  -webkit-overflow-scrolling: touch;

  /* Fondo de Tools (coherente con diseño TaxiRadar24) */
  background: ${({ theme }) => theme.colors.bg};

  display: flex;
  flex-direction: column;
`;

export default function ToolsLayout() {
  return (
    <>
      <HeaderShell />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}
