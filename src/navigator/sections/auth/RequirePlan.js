import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { isSubscriptionActive } from "@/services/subscriptionService";

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

  if (loading || subscriptionLoading) {
    return null;
  }

  if (user && hasIdentityConflict) {
    return <Navigate to="/identity-merge" replace />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (plan === "ACADEMIA_PRO") {
    const hasRequestedPlan = subscription?.plan === "ACADEMIA_PRO";
    const isActive = isSubscriptionActive(subscription);

    if (!hasRequestedPlan || !isActive) {
      return <Navigate to="/academia/upgrade" replace />;
    }

    if (!emailVerified || !phoneVerified) {
      return <Navigate to="/perfil/pro-check" replace />;
    }

    return <Outlet />;
  }

  if (userData?.subscription !== plan) {
    return <Navigate to="/academia/upgrade" replace />;
  }

  return <Outlet />;
}