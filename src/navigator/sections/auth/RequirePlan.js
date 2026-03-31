// src/navigator/sections/auth/RequirePlan.js

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function RequirePlan({ plan, children }) {
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

  const location = useLocation();

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
        Cargando acceso PRO…
      </div>
    );
  }

  if (user && hasIdentityConflict) {
    return (
      <Navigate
        to="/identity-merge"
        replace
        state={{ redirectTo: location.pathname }}
      />
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!emailVerified) {
    return (
      <Navigate
        to="/check-email"
        replace
        state={{ redirectTo: location.pathname }}
      />
    );
  }

  if (!phoneVerified) {
    return (
      <Navigate
        to="/verify"
        replace
        state={{ redirectTo: location.pathname }}
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