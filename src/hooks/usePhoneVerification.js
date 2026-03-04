// src/hooks/usePhoneVerification.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "./../context/AuthContext";
import { markPhoneAsVerified } from "./userIDService";
import { usePhoneAuth } from "./usePhoneAuth";
import {
  PhoneContainer,
  PhoneCard,
  Input,
  Button,
} from "./../Styles/PhoneVerificationStyled";
import { validatePhone } from "./../utils/utilsForm";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default function PhoneVerification() {
  const navigate = useNavigate();
  const { user, markPhoneSaved } = useAuth();
  const { sendVerificationCode, confirmVerificationCode, loading, error } =
    usePhoneAuth();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);

  // ---------------------------------------------------
  // ✅ Anti-flicker (pantallazo):
  // - mientras phoneVerified aún no está cargado => no renderizamos
  // - si ya está verificado => redirigimos y no mostramos nada
  // ---------------------------------------------------
  const phoneVerified = user?.phoneVerified;

  useEffect(() => {
    if (phoneVerified === true) {
      navigate("/", { replace: true });
    }
  }, [phoneVerified, navigate]);

  // Si no hay sesión aún o está cargando el campo => NO mostramos el card
  if (!user?.uid) return null;
  if (phoneVerified === undefined) return null;
  if (phoneVerified === true) return null;

  const normalizePhone = (raw) => {
    let formatted = (raw || "").trim();
    if (!formatted) return "";
    if (!formatted.startsWith("+")) formatted = `+34${formatted}`;
    return formatted;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();

    const authUser = getAuth().currentUser;
    if (!authUser?.uid || !user?.uid) {
      alert("No hay sesión activa. Vuelve a iniciar sesión.");
      navigate("/login", { replace: true });
      return;
    }

    const formatted = normalizePhone(phone);
    if (!validatePhone(formatted)) {
      alert("Introduce un teléfono válido (+34...)");
      return;
    }

    setBusy(true);

    const result = await sendVerificationCode(formatted);

    // ✅ Si ya estaba linkeado (provider-already-linked) => cerramos flujo aquí
    if (result?.ok && result?.alreadyLinked) {
      const canonicalUid = user?.uid || authUser.uid;

      await markPhoneAsVerified(canonicalUid, formatted);
      markPhoneSaved(formatted);

      setBusy(false);
      navigate("/", { replace: true });
      return;
    }

    // ✅ Flujo normal: SMS enviado, vamos al paso 2
    if (result?.ok) {
      setPhone(formatted);
      setStep(2);
    }

    setBusy(false);
  };

  const handleConfirmCode = async (e) => {
    e.preventDefault();

    if (!code || code.length < 6) {
      alert("Código SMS de 6 dígitos.");
      return;
    }

    const authUserBefore = getAuth().currentUser;
    if (!authUserBefore?.uid || !user?.uid) {
      alert("No hay sesión activa. Vuelve a iniciar sesión.");
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

    const canonicalUid = user?.uid || authUserAfter.uid;

    await markPhoneAsVerified(canonicalUid, phone);
    markPhoneSaved(phone);

    setBusy(false);
    navigate("/", { replace: true });
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
    <PhoneContainer>
      <PhoneCard>
        <Form>
          <p style={{ color: "#cbd5e1", marginBottom: 12 }}>
            {step === 1
              ? "Falta completar tu teléfono para continuar"
              : "Introduce el código SMS que recibiste"}
          </p>

          {step === 1 ? (
            <>
              <Input
                type="tel"
                placeholder="Ej: +34612345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button onClick={handleSendCode} disabled={busy || loading}>
                {busy || loading ? "Enviando…" : "Enviar código SMS"}
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
              <Button onClick={handleConfirmCode} disabled={busy || loading}>
                {busy || loading ? "Verificando…" : "Confirmar código"}
              </Button>
            </>
          )}

          <Button
            onClick={handleRestart}
            style={{ marginTop: 12, background: "#f45b69" }}
          >
            Volver y reiniciar
          </Button>

          {error && (
            <p style={{ color: "red", marginTop: 12, fontSize: "14px" }}>
              {error}
            </p>
          )}
        </Form>

        <div id="recaptcha-container"></div>
      </PhoneCard>
    </PhoneContainer>
  );
}