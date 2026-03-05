// src/components/BotonGoogle.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginWithGoogle } from "./../hooks/userIDService";

const GoogleButton = styled.button`
  width: min(520px, 92vw);
  background-color: #82e4dcff;
  color: #202123;
  border: none;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
  transition: background 0.25s ease, transform 0.12s ease, opacity 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #f4d35e;
    color: #162c66;
  }

  &:active {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }
`;

const MiniText = styled.div`
  margin-top: 10px;
  font-size: 0.92rem;
  opacity: 0.75;
`;

export default function BotonGoogle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const { user, needsPhone } = await loginWithGoogle();
      console.log("✅ Google login:", user?.uid);

      // ✅ NO usamos /verify (compat), vamos directo a flujo real
      navigate(needsPhone ? "/perfil/pro-check" : "/", { replace: true });
    } catch (error) {
      console.error("❌ Error en autenticación:", error?.message || error);
      alert("No se pudo iniciar sesión con Google. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
      <GoogleButton onClick={handleGoogleLogin} disabled={loading}>
        {loading ? "Conectando…" : "Continuar con Google"}
        <span aria-hidden>🌐</span>
      </GoogleButton>
      <MiniText>Acceso rápido y seguro</MiniText>
    </div>
  );
}