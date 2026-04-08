// src/navigator/sections/auth/RequirePlan.js

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { resolvePostAuthRoute } from "@/navigator/postAuthResolver";

export default function RequirePlan({ plan, children }) {
  const {
    user,
    userData,
    loading,
    subscription,
    subscriptionLoading,
  } = useAuth();

  const location = useLocation();
  const redirectTo = location.pathname + location.search;

  if (loading || subscriptionLoading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          color: "#fff",
        }}
      >
        Cargando acceso…
      </div>
    );
  }

  const result = resolvePostAuthRoute({
    user,
    userData,
    subscription,
    intent: { redirectTo },
  });

  if (result.path !== redirectTo) {
    const needsRedirectState =
      result.path === "/check-email" ||
      result.path === "/verify" ||
      result.path === "/identity-merge";

    return (
      <Navigate
        to={result.path}
        replace
        state={needsRedirectState ? { redirectTo } : undefined}
      />
    );
  }

  if (plan === "ACADEMIA_PRO") {
    const isPro = subscription?.active === true;

    if (!isPro) {
      return <Navigate to="/academia/upgrade" replace />;
    }

    return children ? children : <Outlet />;
  }

  if (userData?.subscription !== plan) {
    return <Navigate to="/academia/upgrade" replace />;
  }

  return children ? children : <Outlet />;
}