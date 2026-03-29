import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAuth } from "@/services/firebaseConfig";
import { markPhoneAsVerified, normalizePhoneNumber } from "./userIDService";
import { usePhoneAuth } from "./usePhoneAuth";
import { validatePhone } from "@/utils/utilsForm";
import { useNavigate } from "react-router-dom";

const logoTaxiRadar = "/assets/LOGO_ORIGINAL.webp";

import {
  AuthContainer,
  AuthCard,
  LogoWrap,
  LogoImage,
  AuthSubtitle,
  Form,
  Input,
  Button,
  AuthMessage,
  RecaptchaWrap,
  PhoneField,
  PhonePrefix,
  PhoneInput,
} from "./../Styles/FormStyles";

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

  // 🔥 NUEVO: cooldown anti-spam
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

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
      <AuthContainer>
        <AuthCard>
          <AuthSubtitle>Cargando usuario...</AuthSubtitle>
        </AuthCard>
      </AuthContainer>
    );
  }

  if (phoneVerified === undefined) {
    return (
      <AuthContainer>
        <AuthCard>
          <AuthSubtitle>Cargando verificación del teléfono...</AuthSubtitle>
        </AuthCard>
      </AuthContainer>
    );
  }

  if (phoneVerified === true && !hasIdentityConflict) return null;

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
      setUiError(
        "Este número ya está asociado a otra cuenta.\nInicia sesión con la cuenta original o contacta soporte."
      );
      return false;
    }

    setUiError("No se pudo validar el teléfono. Inténtalo de nuevo.");
    return false;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    clearMessages();

    // 🚫 BLOQUEO POR COOLDOWN
    if (cooldown > 0) {
      setUiError(`Espera ${cooldown}s antes de reenviar.`);
      return;
    }

    const auth = await getAuth();
    const authUser = auth.currentUser;

    if (!authUser?.uid || !user?.uid) {
      setUiError("No hay sesión activa.");
      navigate("/login", { replace: true });
      return;
    }

    const formatted = normalizePhoneNumber(`+34${phone.trim()}`);

    if (!validatePhone(formatted)) {
      setUiError("Introduce un teléfono válido (+34...)");
      return;
    }

    setBusy(true);

    const result = await sendVerificationCode(formatted);

    // 🔥 ACTIVAMOS COOLDOWN
    setCooldown(60);

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

    setBusy(true);

    const verifiedUser = await confirmVerificationCode(code);
    const auth = await getAuth();
    const authUserAfter = auth.currentUser;

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
    const auth = await getAuth();
    const { signOut } = await import("firebase/auth");

    await signOut(auth);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <AuthContainer>
      <AuthCard>
        <LogoWrap>
          <LogoImage src={logoTaxiRadar} alt="Logo TaxiRadar24" />
        </LogoWrap>

        <Form onSubmit={step === 1 ? handleSendCode : handleConfirmCode}>
          <AuthSubtitle>
            {step === 1
              ? "Completa tu número de teléfono para continuar"
              : "Introduce el código SMS"}
          </AuthSubtitle>

          {step === 1 ? (
            <>
              <PhoneField>
                <PhonePrefix>+34</PhonePrefix>
                <PhoneInput
                  type="tel"
                  placeholder="612345678"
                  value={phone}
                  onChange={(e) => {
                    const onlyNumbers = e.target.value.replace(/\D/g, "");
                    if (onlyNumbers.length <= 9) {
                      setPhone(onlyNumbers);
                    }
                  }}
                />
              </PhoneField>

              <Button disabled={busy || loading || cooldown > 0}>
                {cooldown > 0
                  ? `Espera ${cooldown}s`
                  : busy || loading
                  ? "Enviando…"
                  : "Enviar código SMS"}
              </Button>
            </>
          ) : (
            <>
              <Input
                type="text"
                placeholder="Código de 6 dígitos"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <Button disabled={busy || loading}>
                {busy || loading ? "Verificando…" : "Confirmar código"}
              </Button>
            </>
          )}

          <Button type="button" onClick={handleRestart} $variant="danger">
            ← Volver y reiniciar
          </Button>

          {!!uiSuccess && <AuthMessage type="success">{uiSuccess}</AuthMessage>}
          {!!uiError && <AuthMessage type="error">{uiError}</AuthMessage>}
          {error && <AuthMessage type="error">{error}</AuthMessage>}
        </Form>

        <RecaptchaWrap>
          <div id="recaptcha-container"></div>
        </RecaptchaWrap>
      </AuthCard>
    </AuthContainer>
  );
}