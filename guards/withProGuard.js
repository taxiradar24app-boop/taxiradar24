import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function withProGuard(Component) {
  return function ProtectedRoute(props) {
    const { user, subscription, loading, subscriptionLoading } = useAuth();

    // ⏳ Espera a que AuthContext resuelva TODO
    if (loading || subscriptionLoading) {
      return (
        <p style={{ textAlign: "center", marginTop: 50 }}>
          Verificando acceso…
        </p>
      );
    }

    // 🔐 No logueado
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    // 💎 No tiene PRO
    if (!subscription?.active) {
      return <Navigate to="/academia/upgrade" replace />;
    }

    return <Component {...props} />;
  };
}