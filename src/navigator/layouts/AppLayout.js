import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  /* SAFE AREA PARA IPHONE / PWA */
  padding-top: calc(env(safe-area-inset-top, 0px) + 8px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
`;

export default function AppLayout() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}