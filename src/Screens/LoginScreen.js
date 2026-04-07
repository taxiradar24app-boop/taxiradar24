import React, { useEffect, useRef } from "react";
import UserRegistration from "./../hooks/UserRegistration";
import BotonGoogle from "./../components/BotonGoogle";

import AuthDivider from "@/components/UI/Auth/AuthDivider";

import { useAuth } from "./../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useSmartNavigation } from "@/utils/SmartNavigation";
import BackHomeButton from "@/Tools/componentsTools/Buttons/BackButtonTools";

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
    emailVerified,
    phoneVerified,
    hasIdentityConflict,
    pendingGoogleLink,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const { getDefaultEntryPoint } = useSmartNavigation();
  const hasNavigatedRef = useRef(false);

  const redirectTo =
    location.state?.redirectTo || getDefaultEntryPoint() || "/";

  useEffect(() => {
    if (loading) return;

    if (!user) {
      hasNavigatedRef.current = false;
      return;
    }

    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;

    const isPro = subscription?.active === true;

    const isDriver =
      userData?.isDriver ||
      userData?.role === "driver" ||
      (Array.isArray(userData?.roles) && userData.roles.includes("driver"));

    const cameFromTools =
      typeof location.state?.redirectTo === "string" &&
      location.state.redirectTo.startsWith("/herramientas");

    if (hasIdentityConflict) {
      navigate("/identity-merge", {
        replace: true,
        state: { redirectTo },
      });
      return;
    }

    if (!emailVerified) {
      navigate("/check-email", {
        replace: true,
        state: { redirectTo },
      });
      return;
    }

    if (!phoneVerified) {
      navigate("/verify", {
        replace: true,
        state: { redirectTo },
      });
      return;
    }

    if (cameFromTools || isDriver) {
      navigate("/herramientas", { replace: true });
      return;
    }

    if (isPro) {
      navigate("/academia/pro", { replace: true });
      return;
    }

    navigate(redirectTo, { replace: true });
  }, [
    user,
    userData,
    subscription,
    loading,
    emailVerified,
    phoneVerified,
    hasIdentityConflict,
    navigate,
    redirectTo,
    location.state,
  ]);

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