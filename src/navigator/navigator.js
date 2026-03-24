// src/navigator/navigator.js
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import ToolsLayout from "./layouts/ToolsLayout";
import RequirePlan from "@/navigator/sections/auth/RequirePlan";

// 🔥 Lazy también para Home
const HomeScreen = React.lazy(() => import("@/Screens/HomeScreen"));

import LoginScreen from "@/Screens/LoginScreen";
import RegisterScreen from "@/Screens/RegisterScreen";
import ResetPasswordScreen from "@/Screens/ResetPasswordScreen";

const SuccessPage = React.lazy(() => import("@/Academy/upgrade/SuccessPage"));
const ProfileProCheck = React.lazy(() => import("@/Profile/ProfileProCheck"));
const ProfileLayout = React.lazy(() => import("@/Profile/ProfileLayout"));
const ProgressLayout = React.lazy(() => import("@/Profile/ProgressLayout"));
const IdentityMergeScreen = React.lazy(() =>
  import("@/Screens/IdentityMergeScreen")
);

const ToolsLanding = React.lazy(() => import("@/Screens/ToolsLanding"));
const FlightAeroDataBoxScreen = React.lazy(() =>
  import("@/Tools/Flights/AeroBoxDataRadarScreen")
);
const TableAdboxScreen = React.lazy(() =>
  import("@/Tools/Flights/TableAdboxScreen")
);

function AppLoader({ text = "Cargando…" }) {
  return (
    <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      {text}
    </div>
  );
}

export default function Navigator() {
  const [academyRoutes, setAcademyRoutes] = useState([]);
  const [academyRoutesReady, setAcademyRoutesReady] = useState(true);

  const demoRoutes = useMemo(
    () => academyRoutes.filter((r) => !r.protected),
    [academyRoutes]
  );

  const proRoutes = useMemo(
    () => academyRoutes.filter((r) => r.protected),
    [academyRoutes]
  );

  return (
    <Suspense fallback={<AppLoader text="Cargando vista…" />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="reset-password" element={<ResetPasswordScreen />} />
        </Route>

        {demoRoutes}

        <Route element={<RequirePlan plan="ACADEMIA_PRO" />}>
          {proRoutes}
        </Route>

        <Route element={<ToolsLayout />}>
          <Route path="herramientas" element={<ToolsLanding />} />
          <Route path="tools/flights" element={<FlightAeroDataBoxScreen />} />
          <Route
            path="tools/flights/scheduled"
            element={<TableAdboxScreen />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}