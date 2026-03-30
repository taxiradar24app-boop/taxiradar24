import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

export default function SuccessPage() {
  const navigate = useNavigate();
  const { user, subscription, refreshSubscription } = useAuth();

  const intervalRef = useRef(null);
  const softMessageTimeoutRef = useRef(null);
  const redirectTimeoutRef = useRef(null);
  const stopPollingTimeoutRef = useRef(null);

  const [status, setStatus] = useState("Activando tu acceso PRO...");
  const [error, setError] = useState("");

 const isActive = useMemo(() => {
  return subscription?.active === true;
}, [subscription]);

  useEffect(() => {
    function clearTimers() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (softMessageTimeoutRef.current) {
        clearTimeout(softMessageTimeoutRef.current);
        softMessageTimeoutRef.current = null;
      }

      if (stopPollingTimeoutRef.current) {
        clearTimeout(stopPollingTimeoutRef.current);
        stopPollingTimeoutRef.current = null;
      }
    }

    async function startFlow() {
      if (!user) {
        setStatus("Recuperando sesión...");
        return;
      }

      if (isActive) {
        clearTimers();
        return;
      }

      try {
        setError("");
        setStatus("Confirmando acceso PRO...");

        await refreshSubscription();

        intervalRef.current = setInterval(() => {
          refreshSubscription().catch((err) => {
            console.error("[SuccessPage] refreshSubscription interval:", err);
          });
        }, 2500);

        softMessageTimeoutRef.current = setTimeout(() => {
          setStatus("Estamos finalizando la activación...");
        }, 6000);

        stopPollingTimeoutRef.current = setTimeout(() => {
          clearTimers();
          setStatus(
            "Tu pago fue recibido. Estamos terminando de sincronizar tu acceso PRO..."
          );
        }, 20000);
      } catch (err) {
        console.error("[SuccessPage] startFlow:", err);
        setError("Error activando la suscripción.");
      }
    }

    startFlow();

    return () => {
      clearTimers();
    };
  }, [user, isActive, refreshSubscription]);

  useEffect(() => {
    if (!isActive) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (softMessageTimeoutRef.current) {
      clearTimeout(softMessageTimeoutRef.current);
      softMessageTimeoutRef.current = null;
    }

    if (stopPollingTimeoutRef.current) {
      clearTimeout(stopPollingTimeoutRef.current);
      stopPollingTimeoutRef.current = null;
    }

    setStatus("✅ Academia PRO activada");

    redirectTimeoutRef.current = setTimeout(() => {
      navigate("/academia/pro", { replace: true });
    }, 800);

    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
        redirectTimeoutRef.current = null;
      }
    };
  }, [isActive, navigate]);

  return (
    <div style={{ padding: 24, color: "#ffffff" }}>
      <h2>Activando tu acceso PRO</h2>
      <p>{status}</p>
      {error ? <p style={{ color: "#ff6b6b" }}>{error}</p> : null}
    </div>
  );
}