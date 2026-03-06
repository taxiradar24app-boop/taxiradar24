// src/Academy/upgrade/SuccessPage.js

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { getAuth } from "./../../services/firebaseConfig";

// ✅ Worker actual desplegado
const WORKER_URL =
  "https://taxiradar24-academy-api.taxiradar24audio.workers.dev";

export default function SuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Verificando pago...");
  const [error, setError] = useState("");

  useEffect(() => {
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("❌ No se pudo verificar el pago");
      setError("Falta session_id en la URL.");
      return;
    }

    let timeoutRef = null;
    let didVerify = false;
    let unsubscribe = null;
    const controller = new AbortController();

    async function initAuthListener() {
      try {
        const auth = await getAuth();

        unsubscribe = onAuthStateChanged(auth, async (user) => {
          try {
            if (didVerify) return;
            didVerify = true;

            setError("");

            if (!user) {
              setStatus("❌ No se pudo verificar el pago");
              setError("Usuario no autenticado");
              return;
            }

            setStatus("Verificando sesión con Stripe...");

            const token = await user.getIdToken(true);

            const url = `${WORKER_URL}/stripe/verify-session?session_id=${encodeURIComponent(
              sessionId
            )}`;

            console.log("[Stripe Verify] URL:", url);
            console.log("[Stripe Verify] UID:", user.uid);

            const response = await fetch(url, {
              method: "GET",
              mode: "cors",
              cache: "no-store",
              signal: controller.signal,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            let data = {};
            try {
              data = await response.json();
            } catch (e) {
              data = {};
            }

            if (!response.ok) {
              const msg =
                data?.message ||
                data?.error ||
                `Error verificando sesión (HTTP ${response.status})`;
              throw new Error(msg);
            }

            console.log("[Stripe Verify] OK:", data);

            setStatus("✅ Pago verificado. Activando PRO...");

            timeoutRef = setTimeout(() => {
              navigate("/perfil/pro-check", { replace: true });
            }, 900);
          } catch (err) {
            console.error("[Stripe Verify] ERROR:", err);
            setStatus("❌ No se pudo verificar el pago");
            setError(err?.message || "Error inesperado");
          }
        });
      } catch (err) {
        console.error("[SuccessPage] ERROR initAuthListener:", err);
        setStatus("❌ No se pudo verificar el pago");
        setError("No se pudo inicializar la autenticación.");
      }
    }

    initAuthListener();

    return () => {
      if (unsubscribe) unsubscribe();
      controller.abort();
      if (timeoutRef) clearTimeout(timeoutRef);
    };
  }, [params, navigate]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Resultado del pago</h2>
      <p>{status}</p>
      {error && <p style={{ marginTop: 12, color: "#ff6b6b" }}>{error}</p>}
    </div>
  );
}