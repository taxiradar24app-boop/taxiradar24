import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function AppLayout() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}
