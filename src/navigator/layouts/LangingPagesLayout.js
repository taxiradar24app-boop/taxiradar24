import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function LangingPagesLayout() {
  return (
    <LayoutShell>
      <Outlet />
    </LayoutShell>
  );
}

const LayoutShell = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;