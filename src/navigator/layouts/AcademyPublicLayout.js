// src/navigator/layouts/AcademyPublicLayout.js

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderAcademia from "@/components/HeaderBox/HeaderAcademia";

export default function AcademyPublicLayout() {

  const { pathname } = useLocation();

  const showHeader =
    pathname.startsWith("/academia/demo") ||
    pathname.startsWith("/academia/pro");

  return (
    <>
      {showHeader && <HeaderAcademia />}

      <main style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
    </>
  );
}