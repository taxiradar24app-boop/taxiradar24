// src/navigator/navigator.js
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import ToolsLayout from "./layouts/ToolsLayout";
import RequirePlan from "@/navigator/sections/auth/RequirePlan";

// Shell ligero
import HomeScreen from "@/Screens/HomeScreen";
import LoginScreen from "@/Screens/LoginScreen";
import RegisterScreen from "@/Screens/RegisterScreen";
import ResetPasswordScreen from "@/Screens/ResetPasswordScreen";

// Lazy screens
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
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        color: "#ffffff",
      }}
    >
      <div style={{ opacity: 0.82, fontWeight: 650 }}>{text}</div>
    </div>
  );
}

function AppErrorState({
  title = "No se pudo cargar la página",
  message = "Recarga la web e inténtalo de nuevo.",
}) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        color: "#ffffff",
        textAlign: "center",
      }}
    >
      <div>
        <div style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: 8 }}>
          {title}
        </div>
        <div style={{ opacity: 0.8 }}>{message}</div>
      </div>
    </div>
  );
}

function renderRoutes(routes = []) {
  return routes.map((route, i) => {
    if (route.index) {
      return <Route key={`idx-${i}`} index element={route.element} />;
    }

    if (route.children?.length) {
      return (
        <Route
          key={`${route.path}-${i}`}
          path={route.path}
          element={route.element}
        >
          {renderRoutes(route.children)}
        </Route>
      );
    }

    return (
      <Route
        key={`${route.path}-${i}`}
        path={route.path}
        element={route.element}
      />
    );
  });
}

export default function Navigator() {
  const [academyRoutes, setAcademyRoutes] = useState([]);
  const [academyRoutesReady, setAcademyRoutesReady] = useState(false);
  const [academyRoutesError, setAcademyRoutesError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadAcademyRoutes() {
      try {
        setAcademyRoutesError(null);

        const mod = await import("@/navigator/sections/academy/academyRoutes");
        const routes = mod?.default || mod?.academyRoutes || mod || [];

        if (!mounted) return;

        setAcademyRoutes(Array.isArray(routes) ? routes : []);
        setAcademyRoutesReady(true);
      } catch (err) {
        console.error("Error cargando academyRoutes:", err);

        if (!mounted) return;

        setAcademyRoutes([]);
        setAcademyRoutesError(err);
        setAcademyRoutesReady(true);
      }
    }

    loadAcademyRoutes();

    return () => {
      mounted = false;
    };
  }, []);

  const demoRoutes = useMemo(() => {
    return academyRoutes.filter((r) => !r.protected);
  }, [academyRoutes]);

  const proRoutes = useMemo(() => {
    return academyRoutes.filter((r) => r.protected);
  }, [academyRoutes]);

  if (!academyRoutesReady) {
    return <AppLoader text="Cargando academia…" />;
  }

  if (academyRoutesError) {
    return (
      <AppErrorState
        title="Error cargando rutas de la academia"
        message="La navegación principal no pudo inicializarse correctamente."
      />
    );
  }

  return (
    <Suspense fallback={<AppLoader text="Cargando vista…" />}>
      <Routes>
        {/* Identity / seguridad */}
        <Route path="identity-merge" element={<IdentityMergeScreen />} />
        <Route path="verify" element={<ProfileProCheck />} />

        {/* Stripe callbacks */}
        <Route path="success" element={<SuccessPage />} />
        <Route
          path="cancel"
          element={<div style={{ padding: 24 }}>Pago cancelado</div>}
        />

        {/* Perfil / progreso */}
        <Route path="perfil/pro-check" element={<ProfileProCheck />} />
        <Route path="perfil" element={<ProfileLayout />} />
        <Route path="progreso" element={<ProgressLayout />} />

        {/* Públicas */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="reset-password" element={<ResetPasswordScreen />} />
        </Route>

        {/* Academia DEMO + rutas públicas de academia */}
        {renderRoutes(demoRoutes)}

        {/* Academia PRO protegida */}
        <Route element={<RequirePlan plan="ACADEMIA_PRO" />}>
          {renderRoutes(proRoutes)}
        </Route>

        {/* Tools */}
        <Route element={<ToolsLayout />}>
          <Route path="herramientas" element={<ToolsLanding />} />
          <Route path="tools/flights" element={<FlightAeroDataBoxScreen />} />
          <Route
            path="tools/flights/scheduled"
            element={<TableAdboxScreen />}
          />
        </Route>

        {/* Fallback final */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}