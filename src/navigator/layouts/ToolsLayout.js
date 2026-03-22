// ======================================================================
// 🛠️ TOOLS LAYOUT — Versión Enterprise
// ======================================================================

import React from "react";
import { Outlet } from "react-router-dom";
import HeaderShell from "@/components/HeaderBox/shared/HeaderShell";
import styled from "styled-components";

const MainContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bg};

  padding-top: calc(env(safe-area-inset-top, 0px) + 24px);
  padding-right: env(safe-area-inset-right, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  padding-left: env(safe-area-inset-left, 0px);

  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    padding-top: calc(env(safe-area-inset-top, 0px) + 18px);
  }
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