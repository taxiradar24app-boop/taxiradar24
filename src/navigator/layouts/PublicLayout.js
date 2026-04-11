import React from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function PublicLayout() {
  const { pathname } = useLocation();

  const noHeaderRoutes = ["/"];
  const minimalHeaderRoutes = ["/login", "/register", "/reset-password"];

  const noHeader = noHeaderRoutes.includes(pathname);
  const minimalHeader = minimalHeaderRoutes.includes(pathname);

  if (noHeader) {
    return (
      <main style={{ paddingTop: 0 }}>
        <Outlet />
      </main>
    );
  }

  if (minimalHeader) {
    return (
      <main style={{ paddingTop: "64px" }}>
        <Outlet />
      </main>
    );
  }

  return (
    <main style={{ paddingTop: "64px" }}>
      <Outlet />
    </main>
  );
}