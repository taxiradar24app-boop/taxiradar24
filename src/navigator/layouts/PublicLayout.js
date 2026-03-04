import React from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function PublicLayout() {
  const { pathname } = useLocation();

  const noHeaderRoutes = ["/", "/academia", "/academia/demo", "/herramientas"];
  const minimalHeaderRoutes = ["/login", "/register", "/reset-password"];

  const noHeader = noHeaderRoutes.some((r) => pathname.startsWith(r));
  const minimalHeader = minimalHeaderRoutes.includes(pathname);

  if (noHeader) {
    return (
      <main style={{ paddingTop: 0 }}>
        <Outlet />
      </main>
    );
  }

  return (
    <>
      {/* Aquí luego colocaremos un HeaderMinimal PRO */}
      <main style={{ paddingTop: "64px" }}>
        <Outlet />
      </main>
    </>
  );
}
