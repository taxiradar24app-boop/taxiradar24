// src/components/BotonGoogle.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "./../hooks/userIDService"; // ✅ ruta corregida
import styled from "styled-components";

const GoogleButton = styled.button`
  background-color: #82e4dcff;
  color: #202123;
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.25);
  transition: background 0.3s, transform 0.1s;
  margin-top: 50px;
  &:hover { background-color: #f4d35e; color: #162c66; }
  &:active { transform: scale(0.97); }
`;

export default function BotonGoogle() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const { user, needsPhone } = await loginWithGoogle();
      console.log("✅ Google login:", user.uid);
      navigate(needsPhone ? "/verify" : "/");
    } catch (error) {
      console.error("❌ Error en autenticación:", error?.message || error);
      alert("No se pudo iniciar sesión con Google. Inténtalo de nuevo.");
    }
  };

  return <GoogleButton onClick={handleGoogleLogin}>Continuar con Google 🌐</GoogleButton>;
}

