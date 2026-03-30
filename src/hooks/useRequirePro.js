// src/hooks/useRequirePro.js

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function useRequirePro() {
  const { user, loading, subscription } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const isPro = subscription?.active === true;

    if (!isPro) {
      navigate("/academia/upgrade", { replace: true });
    }
  }, [user, loading, subscription, navigate]);
}