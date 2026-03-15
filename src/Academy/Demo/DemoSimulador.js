// ======================================================
// 📘 DemoSimulador.js
// Wrapper DEMO del simulador unificado
// ======================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import useDemoSimulador from "./../../hooks/UseDemoSimulador";

import SimuladorExamen from "./../Pro/SimuladorExamen/SimuladorExamen";

export default function DemoSimulador() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const uid = user?.uid || null;

  const {
    remainingAttempts,
    maxAttempts,
    loadingDemo,
    isLocked,
    registerAttempt,
  } = useDemoSimulador(uid);

  const handleRequireLogin = () => {
    if (!user) {
      navigate("/login", {
        state: {
          from: "/academia/demo/simulador",
          reason: "demo",
        },
      });
      return true;
    }

    return false;
  };

  const handleUpgrade = () => {
    navigate("/academia/upgrade");
  };

  if (loadingDemo) return null;

  return (
    <SimuladorExamen
      mode="demo"
      attemptsLeft={remainingAttempts}
      totalAttempts={maxAttempts}
      isLocked={isLocked}
      onRegisterDemoAttempt={registerAttempt}
      onRequireLogin={handleRequireLogin}
      onUpgrade={handleUpgrade}
    />
  );
}