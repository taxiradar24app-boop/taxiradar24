import React, { Suspense, lazy } from "react";
import UserRegistration from "./../hooks/UserRegistration";

const BotonGoogle = lazy(() => import("./../components/BotonGoogle"));

import AuthDivider from "@/components/UI/Auth/AuthDivider";
import { useAuth } from "./../context/AuthContext";
// import BackHomeButton from "@/Tools/componentsTools/Buttons/BackButtonTools";

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
  const { loading, pendingGoogleLink } = useAuth();

  const title = loading ? "Comprobando sesión..." : "Iniciar sesión";

  const subtitle = loading
    ? "Estamos verificando tu sesión y preparando tu acceso. Un momento..."
    : pendingGoogleLink?.email
      ? `Tu correo ${pendingGoogleLink.email} ya existe con contraseña. Inicia sesión con tu contraseña una vez y Google quedará vinculado automáticamente.`
      : "Accede con tu cuenta o utiliza tu cuenta de Google.";

  return (
    <AuthContainer>
      <AuthCard>
        {/* <BackHomeButton /> */}

        <LogoWrap>
          <LogoImage src={logoTaxiRadar} alt="Logo TaxiRadar24" />
        </LogoWrap>

        <AuthTitle>{title}</AuthTitle>
        <AuthSubtitle>{subtitle}</AuthSubtitle>

        {!loading ? (
          <>
            <Suspense fallback={null}>
              <BotonGoogle />
            </Suspense>

            <AuthDivider>o</AuthDivider>

            <UserRegistration mode="login" />
          </>
        ) : null}
      </AuthCard>
    </AuthContainer>
  );
}