import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getAuth } from "@/services/firebaseConfig";
import {
  resendEmailVerification,
  syncEmailVerificationStatus,
} from "./../hooks/userIDService";

import {
  AuthContainer,
  AuthCard,
  LogoWrap,
  LogoImage,
  AuthTitle,
  AuthSubtitle,
  Button,
  TextLink,
  AuthMessage,
} from "./../Styles/FormStyles";

const logoTaxiRadar = "/assets/LOGO_ORIGINAL.webp";

const InfoBox = styled.div`
  margin: 1rem 0 1.25rem;
  padding: 1rem 1rem 1.05rem;
  border-radius: 1rem;
  background: rgba(12, 24, 48, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
`;

const EmailText = styled.p`
  margin: 0.35rem 0 0;
  color: ${({ theme }) => theme.colors?.textPrimary || "#ececf1"};
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.6};
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};
  word-break: break-word;
`;

const StepsList = styled.div`
  display: grid;
  gap: 0.6rem;
  margin: 1rem 0 1.35rem;
`;

const StepItem = styled.div`
  padding: 0.9rem 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme.colors?.textSecondary || "rgba(236,236,241,0.82)"};
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  line-height: ${({ theme }) => theme.lineHeights?.body || 1.6};
`;

const Actions = styled.div`
  display: grid;
  gap: 0.85rem;
`;

export default function CheckEmailScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, refreshUserDocs } = useAuth();

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const redirectTo = location.state?.redirectTo || "/academia/demo";

  const fallbackEmail = useMemo(
    () => location.state?.email || user?.email || "",
    [location.state, user]
  );

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (user.emailVerified) {
      navigate("/verify", {
        replace: true,
        state: { redirectTo },
      });
    }
  }, [user, navigate, redirectTo]);

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
  };

  const handleContinue = async () => {
    try {
      setBusy(true);
      setMessage("");

      const auth = await getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        navigate("/login", { replace: true });
        return;
      }

      const verified = await syncEmailVerificationStatus(currentUser.uid);

      if (!verified) {
        showMessage(
          "error",
          "Tu correo aún no aparece como verificado. Revisa tu bandeja de entrada y vuelve a intentarlo."
        );
        return;
      }

      await refreshUserDocs?.();

      navigate("/verify", {
        replace: true,
        state: { redirectTo },
      });
    } catch (error) {
      console.error("Error comprobando verificación de email:", error);
      showMessage(
        "error",
        "No se pudo comprobar tu correo ahora mismo. Inténtalo de nuevo."
      );
    } finally {
      setBusy(false);
    }
  };

  const handleResend = async () => {
    try {
      setBusy(true);
      setMessage("");

      await resendEmailVerification();

      showMessage(
        "success",
        "Te hemos reenviado el correo de verificación."
      );
    } catch (error) {
      console.error("Error reenviando email:", error);
      showMessage(
        "error",
        "No se pudo reenviar el correo. Inténtalo de nuevo en unos segundos."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <LogoWrap>
          <LogoImage src={logoTaxiRadar} alt="Logo TaxiRadar24" />
        </LogoWrap>

        <AuthTitle>Verifica tu correo</AuthTitle>

        <AuthSubtitle>
          Antes de continuar, necesitamos confirmar que el correo que has escrito
          es realmente tuyo.
        </AuthSubtitle>

        <InfoBox>
          <AuthSubtitle>Hemos enviado un mensaje a:</AuthSubtitle>
          <EmailText>{fallbackEmail || "tu correo electrónico"}</EmailText>
        </InfoBox>

        <StepsList>
          <StepItem>1. Abre tu bandeja de entrada.</StepItem>
          <StepItem>2. Busca el correo de verificación de TaxiRadar24.</StepItem>
          <StepItem>3. Pulsa el enlace y vuelve aquí para continuar.</StepItem>
        </StepsList>

        <Actions>
          <Button type="button" onClick={handleContinue} disabled={busy}>
            {busy ? "Comprobando…" : "Ya he verificado mi correo"}
          </Button>

          <Button type="button" onClick={handleResend} disabled={busy}>
            {busy ? "Enviando…" : "Reenviar correo"}
          </Button>
        </Actions>

        {!!message && <AuthMessage type={messageType}>{message}</AuthMessage>}

        <TextLink as={Link} to="/login">
          Volver a iniciar sesión
        </TextLink>
      </AuthCard>
    </AuthContainer>
  );
}