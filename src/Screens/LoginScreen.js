// src/Screens/LoginScreen.js
import React, { useEffect } from "react";
import UserRegistration from "./../hooks/UserRegistration";
import BotonGoogle from "./../components/BotonGoogle";
import styled from "styled-components";
import { useAuth } from "./../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useSmartNavigation } from "@/utils/SmartNavigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0b1f3b;
  color: #f4d35e;
  text-align: center;
`;

export default function LoginScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { getDefaultEntryPoint } = useSmartNavigation();

  const fromDemo = location.state?.from === "demo-simulador";
  const redirectTo = location.state?.redirectTo || getDefaultEntryPoint() || "/";

  // ✅ Si el usuario ya está logueado, volver al destino correcto (no siempre "/")
  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, redirectTo]);

  return (
    <Container>
      <h1>Iniciar sesión</h1>
      <p>Accede con tu cuenta o utiliza tu cuenta de Google.</p>

      <BotonGoogle />
      <UserRegistration mode="login" />
    </Container>
  );
}