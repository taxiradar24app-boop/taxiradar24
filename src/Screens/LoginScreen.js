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
  const { user, subscription } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { getDefaultEntryPoint } = useSmartNavigation();

  const redirectTo =
    location.state?.redirectTo || getDefaultEntryPoint() || "/";

  useEffect(() => {
    if (!user) return;

    const isPro = subscription?.status === "active";

    if (isPro) {
      navigate("/academia/pro", { replace: true });
      return;
    }

    navigate(redirectTo, { replace: true });
  }, [user, subscription, navigate, redirectTo]);

  return (
    <AuthContainer>
      <AuthCard>
        <BackHomeButton /> {/* colocar a la derecha */}
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