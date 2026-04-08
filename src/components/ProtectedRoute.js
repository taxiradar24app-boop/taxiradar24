// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const {
    user,
    loading,
    emailVerified,
    phoneVerified,
    hasIdentityConflict,
  } = useAuth();

  const location = useLocation();
  const redirectTo = location.pathname + location.search;

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          color: "#fff",
          textAlign: "center",
          padding: "24px",
        }}
      >
        Comprobando sesión…
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          redirectTo,
          source: "protected_route",
        }}
      />
    );
  }

  if (hasIdentityConflict) {
    return (
      <Navigate
        to="/identity-merge"
        replace
        state={{ redirectTo }}
      />
    );
  }

  if (!emailVerified) {
    return (
      <Navigate
        to="/check-email"
        replace
        state={{ redirectTo }}
      />
    );
  }

  if (!phoneVerified) {
    return (
      <Navigate
        to="/verify"
        replace
        state={{ redirectTo }}
      />
    );
  }

  return children;
}