// src/navigator/navigator.js
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import PublicLayout from "./layouts/PublicLayout";
import ToolsLayout from "./layouts/ToolsLayout";
import RequirePlan from "@/navigator/sections/auth/RequirePlan";

// ✅ Shell (ligero)
import HomeScreen from "@/Screens/HomeScreen";
import LoginScreen from "@/Screens/LoginScreen";

// ✅ Firebase
import { getAuth } from "@/services/firebaseConfig";

// ✅ Lazy screens (pesados / verticales)
const SuccessPage = React.lazy(() => import("@/Academy/upgrade/SuccessPage"));
const ProfileProCheck = React.lazy(() => import("@/Profile/ProfileProCheck"));
const ProfileLayout = React.lazy(() => import("@/Profile/ProfileLayout"));
const ProgressLayout = React.lazy(() => import("@/Profile/ProgressLayout"));
const IdentityMergeScreen = React.lazy(() => import("@/Screens/IdentityMergeScreen"));

const ToolsLanding = React.lazy(() => import("@/Screens/ToolsLanding"));
const FlightAeroDataBoxScreen = React.lazy(() =>
  import("@/Tools/Flights/AeroBoxDataRadarScreen")
);
const TableAdboxScreen = React.lazy(() =>
  import("@/Tools/Flights/TableAdboxScreen")
);

const auth = getAuth();

// -------------------------------------------------------
// Loader mínimo (puedes sustituir por tu Loader corporativo)
// -------------------------------------------------------
function AppLoader({ text = "Cargando…" }) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div style={{ opacity: 0.75, fontWeight: 650 }}>{text}</div>
    </div>
  );
}

// -------------------------------------------------------
// ✅ /verify robusto (evita pantalla en blanco)
// - si NO hay usuario -> /login
// - si hay usuario -> /perfil/pro-check (flujo teléfono/email)
// -------------------------------------------------------
function VerifyScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const unsub = onAuthStateChanged(auth, (user) => {
      if (!mounted) return;

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      // Siempre mandamos a onboarding PRO-check (ahí decides qué falta)
      navigate("/perfil/pro-check", { replace: true });
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, [navigate]);

  return <AppLoader text="Verificando sesión…" />;
}

// -------------------------------------------------------
// Renderizador de rutas (igual lógica que ya tenías)
// -------------------------------------------------------
function renderRoutes(routes) {
  return routes.map((route, i) => {
    if (route.index) {
      return <Route key={i} index element={route.element} />;
    }

    if (route.children) {
      return (
        <Route key={i} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }

    return <Route key={i} path={route.path} element={route.element} />;
  });
}

export default function Navigator() {
  // ✅ Cargamos academyRoutes de forma dinámica para que NO entre en el bundle inicial
  const [academyRoutes, setAcademyRoutes] = useState(null);

  useEffect(() => {
    let mounted = true;

    import("@/navigator/sections/academy/academyRoutes")
      .then((mod) => {
        const routes = mod?.default || mod?.academyRoutes || mod;
        if (mounted) setAcademyRoutes(routes);
      })
      .catch((err) => {
        console.error("Error cargando academyRoutes:", err);
        if (mounted) setAcademyRoutes([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const demoRoutes = useMemo(() => {
    if (!academyRoutes) return null;
    return academyRoutes.filter((r) => !r.protected);
  }, [academyRoutes]);

  const proRoutes = useMemo(() => {
    if (!academyRoutes) return null;
    return academyRoutes.filter((r) => r.protected);
  }, [academyRoutes]);

  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        {/* ✅ Identity Merge (Enterprise) */}
        <Route path="identity-merge" element={<IdentityMergeScreen />} />

        {/* STRIPE CALLBACKS */}
        <Route path="success" element={<SuccessPage />} />
        <Route
          path="cancel"
          element={<div style={{ padding: 24 }}>Pago cancelado</div>}
        />

        {/* ✅ /verify ya NO queda en blanco */}
        <Route path="verify" element={<VerifyScreen />} />

        {/* 🔐 PERFIL PRO ONBOARDING */}
        <Route path="perfil/pro-check" element={<ProfileProCheck />} />

        {/* PERFIL / PROGRESO */}
        <Route path="perfil" element={<ProfileLayout />} />
        <Route path="progreso" element={<ProgressLayout />} />

        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="login" element={<LoginScreen />} />
        </Route>

        {/* DEMO (Academia) */}
        {demoRoutes ? renderRoutes(demoRoutes) : null}

        {/* PRO protegido (Academia) */}
        <Route element={<RequirePlan plan="ACADEMIA_PRO" />}>
          {proRoutes ? renderRoutes(proRoutes) : null}
        </Route>

        {/* TOOLS */}
        <Route element={<ToolsLayout />}>
          <Route path="herramientas" element={<ToolsLanding />} />
          <Route path="tools/flights" element={<FlightAeroDataBoxScreen />} />
          <Route
            path="tools/flights/scheduled"
            element={<TableAdboxScreen />}
          />
        </Route>

        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </Suspense>
  );
}