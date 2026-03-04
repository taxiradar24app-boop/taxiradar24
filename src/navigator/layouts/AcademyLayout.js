import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAcademia from "@/components/HeaderBox/HeaderAcademia";

export default function AcademyLayout() {
  return (
    <>
      <HeaderAcademia />

      <main
        style={{
          minHeight: "100vh",
          width: "100%",
          paddingBottom: "40px",
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
