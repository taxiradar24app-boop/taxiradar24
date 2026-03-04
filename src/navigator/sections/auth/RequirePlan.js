// src/navigator/sections/auth/RequirePlan.js

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function RequirePlan({ plan }) {
  const {
    user,
    userData,
    loading,
    subscription,
    subscriptionLoading,
    emailVerified,
    phoneVerified,
    hasIdentityConflict,
  } = useAuth();

  if (loading || subscriptionLoading) return null;

  // 🧨 Bloqueo inmediato si hay conflicto
  if (user && hasIdentityConflict) {
    return <Navigate to="/identity-merge" replace />;
  }

  // No autenticado
  if (!user) {
      return <Navigate to="/" replace />;
    }

  // Solo aplicamos esta lógica “enterprise” al plan PRO
  if (plan === "ACADEMIA_PRO") {
    const isActive = subscription?.status === "active";

    // No tiene PRO real
    if (!isActive) {
      return <Navigate to="/academia/upgrade" replace />;
    }

    // Tiene PRO, pero falta seguridad (onboarding)
    if (!emailVerified || !phoneVerified) {
      return <Navigate to="/perfil/pro-check" replace />;
    }

    return <Outlet />;
  }

  // Fallback por si usas otros planes (no rompe nada)
  if (userData?.subscription !== plan) {
    return <Navigate to="/academia/upgrade" replace />;
  }

  return <Outlet />;
}