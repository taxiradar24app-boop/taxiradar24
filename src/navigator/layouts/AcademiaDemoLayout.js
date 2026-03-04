import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import HeaderAcademia from "@/components/HeaderBox/HeaderAcademia";
import { DemoTopBanner } from "@/Academy/Demo/AcademiaDemoStyle";

/* 🔑 CONTENEDOR GLOBAL DEMO */
const DemoContent = styled.main`

  min-height: 100vh;
  background: ${({ theme }) => theme.pro?.bl || "#081325"};
`;

export default function AcademiaDemoLayout() {
  return (
    <>
      <DemoTopBanner>
        <strong>ESTÁS EN LA VERSIÓN DEMO</strong>
      </DemoTopBanner>

      <HeaderAcademia />

      <DemoContent>
        <Outlet />
      </DemoContent>
    </>
  );
}
