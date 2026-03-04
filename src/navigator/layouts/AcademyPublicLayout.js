// src/navigator/layouts/AcademyPublicLayout.js

import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAcademia from "@/components/HeaderBox/HeaderAcademia";

export default function AcademyPublicLayout() {
  return (
    <>
      <HeaderAcademia />
      <Outlet />
    </>
  );
}