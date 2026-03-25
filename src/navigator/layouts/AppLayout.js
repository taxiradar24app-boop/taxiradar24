import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;

  /* El top safe-area lo debe gestionar el header correspondiente */
  padding-top: env(safe-area-inset-top, 0px);

  /* Safe areas útiles para el resto de la app */
  padding-bottom: env(safe-area-inset-bottom, 0px);
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
`;

export default function AppLayout() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}