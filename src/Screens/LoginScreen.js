import React, { useEffect, useRef } from "react";
import UserRegistration from "./../hooks/UserRegistration";
import BotonGoogle from "./../components/BotonGoogle";

import AuthDivider from "@/components/UI/Auth/AuthDivider";

import { useAuth } from "./../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import BackHomeButton from "@/Tools/componentsTools/Buttons/BackButtonTools";

import {
  getAuthIntent,
  clearAuthIntent,
} from "@/services/authIntentService";

import { resolvePostAuthRoute } from "@/navigator/postAuthResolver";

const logoTaxiRadar = "/assets/LOGO_ORIGINAL.webp";

import {
  AuthContainer,
  AuthCard,
  LogoWrap,
  LogoImage,
  AuthTitle,
  AuthSubtitle,
} from "./../Styles/FormStyles";

export default function LoginScreen() {
  const {
    user,
    userData,
    subscription,
    loading,
    pendingGoogleLink,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      hasNavigatedRef.current = false;
      return;
    }

    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;

    const intent = getAuthIntent();

    const fallbackIntent = location.state?.redirectTo
      ? {
          redirectTo: location.state.redirectTo,
          source: location.state?.source || "login_location_state",
        }
      : null;

    const finalIntent = intent || fallbackIntent;

    const result = resolvePostAuthRoute({
      user,
      userData,
      subscription,
      intent: finalIntent,
    });

    clearAuthIntent();

    navigate(result.path, {
      replace: true,
      state:
        result.path === "/check-email" ||
        result.path === "/verify" ||
        result.path === "/identity-merge"
          ? { redirectTo: finalIntent?.redirectTo || "/" }
          : undefined,
    });
  }, [user, userData, subscription, loading, navigate, location.state]);

  const title = loading ? "Comprobando sesión..." : "Iniciar sesión";

  const subtitle = loading
    ? "Estamos verificando tu sesión. Un momento..."
    : pendingGoogleLink?.email
      ? `Tu correo ${pendingGoogleLink.email} ya existe con contraseña. Inicia sesión con tu contraseña una vez y Google quedará vinculado automáticamente.`
      : "Accede con tu cuenta o utiliza tu cuenta de Google.";

  return (
    <AuthContainer>
      <AuthCard>
        <BackHomeButton />

        <LogoWrap>
          <LogoImage src={logoTaxiRadar} alt="Logo TaxiRadar24" />
        </LogoWrap>

        <AuthTitle>{title}</AuthTitle>
        <AuthSubtitle>{subtitle}</AuthSubtitle>

        <BotonGoogle />

        <AuthDivider>o</AuthDivider>

        <UserRegistration mode="login" />
      </AuthCard>
    </AuthContainer>
  );
}