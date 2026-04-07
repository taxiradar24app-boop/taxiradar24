import React, { useEffect, useRef, useState } from "react";
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
    profileReady,
    emailVerified,
    phoneVerified,
    hasIdentityConflict,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const { getDefaultEntryPoint } = useSmartNavigation();
  const hasNavigatedRef = useRef(false);

  const [googleFlowActive, setGoogleFlowActive] = useState(false);

  const redirectTo =
    location.state?.redirectTo || getDefaultEntryPoint() || "/";

  useEffect(() => {
    const handleStorageState = () => {
      const inProgress =
        sessionStorage.getItem("googleAuthInProgress") === "1";
      setGoogleFlowActive(inProgress);
    };

    handleStorageState();
    window.addEventListener("focus", handleStorageState);
    document.addEventListener("visibilitychange", handleStorageState);

    return () => {
      window.removeEventListener("focus", handleStorageState);
      document.removeEventListener("visibilitychange", handleStorageState);
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!profileReady) return;

    if (!user) {
      hasNavigatedRef.current = false;
      return;
    }

    sessionStorage.removeItem("googleAuthInProgress");
    setGoogleFlowActive(false);

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
    profileReady,
    emailVerified,
    phoneVerified,
    hasIdentityConflict,
    navigate,
    redirectTo,
    location.state,
  ]);

  const title = loading
    ? "Comprobando sesión..."
    : googleFlowActive
      ? "Completando acceso..."
      : "Iniciar sesión";

  const subtitle = loading
    ? "Estamos verificando tu sesión. Un momento..."
    : googleFlowActive
      ? "Si Google te redirige o abre una ventana, completa el acceso y volverás aquí automáticamente."
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