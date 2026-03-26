// src/navigator/navigator.js
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import RequirePlan from "@/navigator/sections/auth/RequirePlan";
import academyRoutes from "@/navigator/sections/academy/academyRoutes";

// Home
const HomeScreen = React.lazy(() => import("@/Screens/HomeScreen"));

// Auth
const LoginScreen = React.lazy(() => import("@/Screens/LoginScreen"));
const RegisterScreen = React.lazy(() => import("@/Screens/RegisterScreen"));
const ResetPasswordScreen = React.lazy(() =>
  import("@/Screens/ResetPasswordScreen")
);

// Otros módulos
const SuccessPage = React.lazy(() => import("@/Academy/upgrade/SuccessPage"));
const ProfileProCheck = React.lazy(() => import("@/Profile/ProfileProCheck"));
const ProfileLayout = React.lazy(() => import("@/Profile/ProfileLayout"));
const ProgressLayout = React.lazy(() => import("@/Profile/ProgressLayout"));
const IdentityMergeScreen = React.lazy(() =>
  import("@/Screens/IdentityMergeScreen")
);

// Tools lazy
const ToolsModule = React.lazy(() => import("@/Tools/ToolsModule"));

function AppLoader({ text = "Cargando…" }) {
  return (
    <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      {text}
    </div>
  );
}

function renderRouteTree(routes = []) {
  return routes.map((route, index) => {
    const key = `${route.path || "index"}-${index}`;

    const routeElement = route.protected ? (
      <RequirePlan plan="ACADEMIA_PRO" />
    ) : (
      route.element
    );

    if (route.children?.length) {
      return (
        <Route key={key} path={route.path} element={routeElement}>
          {renderRouteTree(route.children)}
        </Route>
      );
    }

    if (route.index) {
      return <Route key={key} index element={route.element} />;
    }

    if (route.protected) {
      return (
        <Route
          key={key}
          path={route.path}
          element={<RequirePlan plan="ACADEMIA_PRO" />}
        >
          {route.element ? <Route index element={route.element} /> : null}
        </Route>
      );
    }

    return <Route key={key} path={route.path} element={route.element} />;
  });
}

export default function Navigator() {
  return (
    <Suspense fallback={<AppLoader text="Cargando vista…" />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="reset-password" element={<ResetPasswordScreen />} />
          <Route path="success" element={<SuccessPage />} />
          <Route path="perfil" element={<ProfileLayout />} />
          <Route path="progreso" element={<ProgressLayout />} />
          <Route path="profile/pro-check" element={<ProfileProCheck />} />
          <Route path="identity-merge" element={<IdentityMergeScreen />} />
        </Route>

        {renderRouteTree(academyRoutes)}

        <Route path="herramientas/*" element={<ToolsModule />} />
        <Route path="tools/*" element={<Navigate to="/herramientas" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}