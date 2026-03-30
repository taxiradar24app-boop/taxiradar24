import React, { useEffect } from "react";
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
  const { user, userData, subscription, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { getDefaultEntryPoint } = useSmartNavigation();

  const redirectTo =
    location.state?.redirectTo || getDefaultEntryPoint() || "/";

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    const isPro = subscription?.active === true;

    const isDriver =
      userData?.isDriver ||
      userData?.role === "driver" ||
      (Array.isArray(userData?.roles) && userData.roles.includes("driver"));

    const cameFromTools =
      typeof location.state?.redirectTo === "string" &&
      location.state.redirectTo.startsWith("/herramientas");

    if (cameFromTools) {
      navigate("/herramientas", { replace: true });
      return;
    }

    if (isDriver) {
      navigate("/herramientas", { replace: true });
      return;
    }

    if (isPro) {
      navigate("/academia/pro", { replace: true });
      return;
    }

    navigate(redirectTo, { replace: true });
  }, [user, userData, subscription, loading, navigate, redirectTo, location.state]);

  return (
    <AuthContainer>
      <AuthCard>
        <BackHomeButton />
        <LogoWrap>
          <LogoImage src={logoTaxiRadar} alt="Logo TaxiRadar24" />
        </LogoWrap>

        <AuthTitle>Iniciar sesión</AuthTitle>

        <AuthSubtitle>
          Accede con tu cuenta o utiliza tu cuenta de Google.
        </AuthSubtitle>

        <BotonGoogle />

        <AuthDivider>o</AuthDivider>

        <UserRegistration mode="login" />
      </AuthCard>
    </AuthContainer>
  );
}