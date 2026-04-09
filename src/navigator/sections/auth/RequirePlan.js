import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function persistPostLoginIntent(path) {
  try {
    const normalizedPath = path || "/";

    localStorage.setItem(
      "postLoginIntent",
      JSON.stringify({
        redirectTo: normalizedPath,
        source: "require_plan_guard",
        createdAt: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.warn("⚠️ No se pudo persistir postLoginIntent:", error?.message);
  }
}

export default function RequirePlan({ plan, children }) {
  const {
    user,
    userData,
    loading,
    subscription,
    subscriptionLoading,
  } = useAuth();

  const location = useLocation();
  const redirectTo = `${location.pathname}${location.search || ""}`;

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

  if (!user) {
    persistPostLoginIntent(redirectTo);
    return <Navigate to="/login" replace />;
  }

  if (!user.emailVerified) {
    return <Navigate to="/check-email" replace />;
  }

  if (!userData?.phoneVerified) {
    return <Navigate to="/verify" replace />;
  }

  if (plan === "ACADEMIA_PRO" && !subscription?.active) {
    persistPostLoginIntent(redirectTo);
    return <Navigate to="/academia/upgrade" replace />;
  }

  return children ? children : <Outlet />;
}