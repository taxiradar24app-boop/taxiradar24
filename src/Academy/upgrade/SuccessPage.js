import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

export default function SuccessPage() {
  const navigate = useNavigate();
  const { user, subscription, refreshSubscription } = useAuth();

  const intervalRef = useRef(null);
  const [status, setStatus] = useState("Activando tu acceso PRO...");
  const [error, setError] = useState("");

  const isActive = useMemo(() => {
    return subscription?.active === true;
  }, [subscription]);

  useEffect(() => {
    if (!user) {
      setStatus("Recuperando sesión...");
      return;
    }

    let attempts = 0;

    const startPolling = async () => {
      try {
        setStatus("Confirmando acceso PRO...");
        setError("");

        // 🔥 PRIMER INTENTO
        await safeRefresh();

        intervalRef.current = setInterval(async () => {
          attempts++;

          await safeRefresh();

          if (attempts > 10) {
            clearInterval(intervalRef.current);
            setStatus(
              "Tu pago fue recibido. Activando acceso en segundo plano..."
            );
          }
        }, 2000);
      } catch (err) {
        console.error("Success flow error:", err);
        setError("Error activando suscripción");
      }
    };

    startPolling();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [user]);

  // 🔥 SAFE REFRESH (EVITA FIREBASE ERROR)
  const safeRefresh = async () => {
    try {
      await refreshSubscription();
    } catch (err) {
      console.warn("⚠️ refreshSubscription falló (ignorado):", err?.message);
    }
  };

  useEffect(() => {
    if (!isActive) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    setStatus("✅ Academia PRO activada");

    setTimeout(() => {
      navigate("/academia/pro", { replace: true });
    }, 800);
  }, [isActive]);

  return (
    <div style={{ padding: 24, color: "#fff" }}>
      <h2>Activando tu acceso PRO</h2>
      <p>{status}</p>
      {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
    </div>
  );
}