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

const GoogleButton = styled(AuthButton)`
  width: 100%;
  max-width: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  font-weight: 800;
  font-size: 1.08rem;
  line-height: 1;
  background: linear-gradient(135deg, #10a37f 0%, #6bcf57 100%);
  color: #07111f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 16px 32px rgba(16, 163, 127, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    filter: brightness(1.02);
    box-shadow:
      0 20px 36px rgba(16, 163, 127, 0.28),
      inset 0 1px 0 rgba(255, 255, 255, 0.18);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
    padding: 0.95rem 1rem;
    border-radius: 1.15rem;
    gap: 0.75rem;
  }
`;

const GoogleLogo = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  flex: 0 0 22px;
  display: block;

  @media (max-width: 640px) {
    width: 20px;
    height: 20px;
    flex-basis: 20px;
  }
`;

const ButtonText = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
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

      const result = await loginWithGoogle();

      if (!result || result.redirecting) {
        return;
      }

      const { user, needsPhone } = result;

      console.log("✅ Google login:", user?.uid);

      if (needsPhone) {
        navigate("/verify", {
          state: { redirectTo },
          replace: true,
        });
        return;
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
      <GoogleButton onClick={handleGoogleLogin} disabled={loading}>
        {loading ? (
          "Conectando…"
        ) : (
          <>
            <ButtonText>Continuar con Google</ButtonText>
            <GoogleLogo
              src="/assets/google-Taxiradar24.webp"
              alt="Google TaxiRadar24"
            />
          </>
        )}
      </GoogleButton>

      <MiniText>Acceso rápido y seguro</MiniText>
    </Wrapper>
  );
}