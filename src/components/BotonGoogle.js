import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { loginWithGoogle } from "./../hooks/userIDService";

import AuthButton from "@/components/UI/Auth/AuthButton";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MiniText = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  opacity: 0.75;
`;

export default function BotonGoogle() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.redirectTo || "/";

  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const { user, needsPhone } = await loginWithGoogle();

      console.log("✅ Google login:", user?.uid);

      if (needsPhone) {
        return navigate("/verify", {
          state: { redirectTo },
          replace: true,
        });
      }

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("❌ Error en autenticación:", error?.message || error);
      alert("No se pudo iniciar sesión con Google. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <AuthButton onClick={handleGoogleLogin} disabled={loading}>
        {loading ? "Conectando…" : "Continuar con Google"} 🌐
      </AuthButton>

      <MiniText>Acceso rápido y seguro</MiniText>
    </Wrapper>
  );
}