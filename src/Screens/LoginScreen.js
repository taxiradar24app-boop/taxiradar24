import React, { useEffect } from "react";
import styled from "styled-components";
import UserRegistration from "./../hooks/UserRegistration";
import BotonGoogle from "./../components/BotonGoogle";

import AuthLayout from "@/components/UI/Auth/AuthLayout";
import AuthCard from "@/components/UI/Auth/AuthCard";
import AuthDivider from "@/components/UI/Auth/AuthDivider";

import { useAuth } from "./../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useSmartNavigation } from "@/utils/SmartNavigation";

import logoTaxiRadar from "./../../assets/Logo_taxiredar24_optimizado.svg";

const LogoWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
`;

const LogoImage = styled.img`
  display: block;
  width: clamp(110px, 14vw, 160px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.22));
`;

const Subtitle = styled.p`
  max-width: 440px;
  margin: 0 auto 18px;
  color: #d7e3f4;
`;

export default function LoginScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { getDefaultEntryPoint } = useSmartNavigation();

  const redirectTo =
    location.state?.redirectTo || getDefaultEntryPoint() || "/";

  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, redirectTo]);

  return (
    <AuthLayout>
      <AuthCard>
        <LogoWrap>
          <LogoImage src={logoTaxiRadar} alt="Logo TaxiRadar24" />
        </LogoWrap>

        <h1>Iniciar sesión</h1>

        <Subtitle>
          Accede con tu cuenta o utiliza tu cuenta de Google.
        </Subtitle>

        <BotonGoogle />

        <AuthDivider>o</AuthDivider>

        <UserRegistration mode="login" />
      </AuthCard>
    </AuthLayout>
  );
}