import React from "react";
import { Outlet } from "react-router-dom";
import AcademyHeader from "@/components/AcademyHeader";

export default function AcademiaDemoLayout() {
  return (
    <>
      <AcademyHeader />

      <main>
        <Outlet />
      </main>
    </>
  );
}