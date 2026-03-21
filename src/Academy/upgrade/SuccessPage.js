import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "./../../context/AuthContext";

const WORKER_URL =
  "https://taxiradar24-academy-api.taxiradar24audio.workers.dev";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { refreshSubscription } = useAuth();

  const [status, setStatus] = useState("Validando tu acceso PRO...");
  const [error, setError] = useState("");

  useEffect(() => {
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("❌ No se pudo verificar el pago");
      setError("Falta session_id en la URL.");
      return;
    }

    const auth = getAuth();
    const controller = new AbortController();
    let timeoutRef = null;
    let handled = false;

    async function verifyNow(user) {
      if (handled) return;
      handled = true;

      try {
        setError("");
        setStatus("Confirmando el pago con Stripe...");

        const token = await user.getIdToken(true);

        const response = await fetch(
          `${WORKER_URL}/stripe/verify-session?session_id=${encodeURIComponent(
            sessionId
          )}`,
          {
            method: "GET",
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${token}`,
              "Cache-Control": "no-store",
            },
          }
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          const msg =
            data?.error ||
            data?.message ||
            `Error verificando sesión (HTTP ${response.status})`;
          throw new Error(msg);
        }

        if (data?.active || data?.status === "active") {
          setStatus("✅ Pago confirmado. Activando Academia PRO...");

          await user.getIdToken(true);
          await refreshSubscription();

          timeoutRef = setTimeout(() => {
            navigate("/academia/pro", { replace: true });
          }, 700);

          return;
        }

        throw new Error("La suscripción no quedó activa.");
      } catch (err) {
        if (err?.name === "AbortError") return;

        console.error("[SuccessPage] verify-session error:", err);
        setStatus("❌ No se pudo activar la suscripción");
        setError(err?.message || "Error inesperado al verificar el pago.");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("Recuperando tu sesión...");
        return;
      }

      await verifyNow(user);
    });

    return () => {
      unsubscribe();
      controller.abort();
      if (timeoutRef) clearTimeout(timeoutRef);
    };
  }, [navigate, params, refreshSubscription]);

  return (
    <div style={{ padding: 24, color: "#ffffff" }}>
      <h2>Resultado del pago de la Academia PRO</h2>
      <p>{status}</p>
      {error ? (
        <p style={{ marginTop: 12, color: "#ff6b6b" }}>{error}</p>
      ) : null}
    </div>
  );
}