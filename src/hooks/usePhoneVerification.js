import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";
import { markPhoneAsVerified, normalizePhoneNumber } from "./userIDService";
import { usePhoneAuth } from "./usePhoneAuth";

import AuthLayout from "@/components/UI/Auth/AuthLayout";
import AuthCard from "@/components/UI/Auth/AuthCard";
import AuthInput from "@/components/UI/Auth/AuthInput";
import AuthButton from "@/components/UI/Auth/AuthButton";
import AuthMessage from "@/components/UI/Auth/AuthMessage";

import { validatePhone } from "@/utils/utilsForm";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import logoTaxiRadar from "./../../assets/Logo_taxiredar24_optimizado.svg";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const LogoWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
`;

const LogoImage = styled.img`
  display: block;
  width: clamp(110px, 14vw, 160px);
  height: auto;
  object-fit: contain;

  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.25));
`;

export default function PhoneVerification() {
  const navigate = useNavigate();

  const {
    user,
    userData,
    phoneVerified,
    hasIdentityConflict,
    markPhoneSaved,
    refreshUserDocs,
  } = useAuth();

  const { sendVerificationCode, confirmVerificationCode, loading, error } =
    usePhoneAuth();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [uiError, setUiError] = useState("");
  const [uiSuccess, setUiSuccess] = useState("");

  useEffect(() => {
    if (phoneVerified === true && !hasIdentityConflict) {
      navigate("/academia/demo", { replace: true });
    }
  }, [phoneVerified, hasIdentityConflict, navigate]);

  useEffect(() => {
    if (hasIdentityConflict) {
      setUiError(
        "Este número ya está asociado a otra cuenta.\nInicia sesión con la cuenta original o contacta soporte."
      );
    }
  }, [hasIdentityConflict]);

  if (!user?.uid) {
    return (
      <AuthLayout>
        <AuthCard>
          <p>Cargando usuario...</p>
        </AuthCard>
      </AuthLayout>
    );
  }

  if (phoneVerified === undefined) {
    return (
      <AuthLayout>
        <AuthCard>
          <p>Cargando verificación del teléfono...</p>
        </AuthCard>
      </AuthLayout>
    );
  }

  if (phoneVerified === true && !hasIdentityConflict) return null;

  const buildConflictMessage = () =>
    "Este número ya está asociado a otra cuenta.\nInicia sesión con la cuenta original o contacta soporte.";

  const clearMessages = () => {
    setUiError("");
    setUiSuccess("");
  };

  const handlePhoneClaimResult = async (result, formattedPhone) => {
    if (!result) {
      setUiError("No se pudo validar el teléfono. Inténtalo de nuevo.");
      return false;
    }

    if (result.ok && !result.conflict) {
      markPhoneSaved(formattedPhone);
      await refreshUserDocs?.();
      setUiSuccess("Teléfono verificado correctamente.");
      navigate("/academia/demo", { replace: true });
      return true;
    }

    if (result.conflict) {
      await refreshUserDocs?.();
      setUiError(buildConflictMessage());
      return false;
    }

    setUiError("No se pudo validar el teléfono. Inténtalo de nuevo.");
    return false;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    clearMessages();

    const authUser = getAuth().currentUser;

    if (!authUser?.uid || !user?.uid) {
      setUiError("No hay sesión activa. Vuelve a iniciar sesión.");
      navigate("/login", { replace: true });
      return;
    }

    const formatted = normalizePhoneNumber(phone.trim());

    if (!validatePhone(formatted)) {
      setUiError("Introduce un teléfono válido (+34...)");
      return;
    }

    setBusy(true);

    const result = await sendVerificationCode(formatted);

    if (result?.ok && result?.alreadyLinked) {
      const claimResult = await markPhoneAsVerified(user.uid, formatted, {
        email: authUser.email || userData?.email || null,
        displayName: authUser.displayName || userData?.displayName || null,
        provider:
          authUser.providerData?.map((p) => p.providerId).filter(Boolean) || [],
      });

      setBusy(false);
      await handlePhoneClaimResult(claimResult, formatted);
      return;
    }

    if (result?.ok) {
      setPhone(formatted);
      setStep(2);
      setUiSuccess("Código SMS enviado correctamente.");
    }

    setBusy(false);
  };

  const handleConfirmCode = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!code || code.length < 6) {
      setUiError("Código SMS de 6 dígitos.");
      return;
    }

    const authUserBefore = getAuth().currentUser;

    if (!authUserBefore?.uid || !user?.uid) {
      setUiError("No hay sesión activa. Vuelve a iniciar sesión.");
      navigate("/login", { replace: true });
      return;
    }

    setBusy(true);

    const verifiedUser = await confirmVerificationCode(code);
    const authUserAfter = getAuth().currentUser;

    if (!verifiedUser || !authUserAfter?.uid) {
      setBusy(false);
      return;
    }

    const claimResult = await markPhoneAsVerified(user.uid, phone, {
      email: authUserAfter.email || userData?.email || null,
      displayName: authUserAfter.displayName || userData?.displayName || null,
      provider:
        authUserAfter.providerData?.map((p) => p.providerId).filter(Boolean) || [],
    });

    setBusy(false);
    await handlePhoneClaimResult(claimResult, phone);
  };

  const handleRestart = async () => {
    try {
      await signOut(getAuth());
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login", { replace: true });
    } catch (e) {
      console.error("Error al reiniciar:", e);
      navigate("/login", { replace: true });
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <LogoWrap>
          <LogoImage src={logoTaxiRadar} alt="Logo TaxiRadar24" />
        </LogoWrap>

        <Form>
          <p style={{ marginBottom: 12 }}>
            {step === 1
              ? "Completa tu número de teléfono para continuar"
              : "Introduce el código SMS que recibiste"}
          </p>

          {step === 1 ? (
            <>
              <AuthInput
                type="tel"
                placeholder="Ej: +34612345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <AuthButton onClick={handleSendCode} disabled={busy || loading}>
                {busy || loading ? "Enviando…" : "Enviar código SMS"}
              </AuthButton>
            </>
          ) : (
            <>
              <AuthInput
                type="text"
                placeholder="Código de 6 dígitos"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <AuthButton onClick={handleConfirmCode} disabled={busy || loading}>
                {busy || loading ? "Verificando…" : "Confirmar código"}
              </AuthButton>
            </>
          )}

          <AuthButton onClick={handleRestart} $variant="danger">
            Volver y reiniciar
          </AuthButton>

          {!!uiSuccess && <AuthMessage type="success">{uiSuccess}</AuthMessage>}
          {!!uiError && (
            <AuthMessage type="error" style={{ whiteSpace: "pre-line" }}>
              {uiError}
            </AuthMessage>
          )}
          {error && <AuthMessage type="error">{error}</AuthMessage>}
        </Form>

        <div id="recaptcha-container"></div>
      </AuthCard>
    </AuthLayout>
  );
}