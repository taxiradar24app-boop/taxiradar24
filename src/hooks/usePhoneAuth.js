// src/hooks/usePhoneAuth.js
import { useState } from "react";
import { getFirebaseAuth } from "./../utils/lazyFirebase"; // ✅ lazy auth

export const usePhoneAuth = () => {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ensureContainer = (id) => {
    if (!document.getElementById(id)) {
      const div = document.createElement("div");
      div.id = id;
      div.style.display = "none"; // invisible
      document.body.appendChild(div);
    }
  };

  const setUpRecaptcha = async (containerId = "recaptcha-container") => {
    ensureContainer(containerId);

    // 🔥 limpia instancias viejas (evita recaptcha roto en reintentos)
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch {}
      window.recaptchaVerifier = null;
    }

    const { getAuth, RecaptchaVerifier } = await getFirebaseAuth();
    const auth = getAuth();

    const verifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
    });
    await verifier.render();

    window.recaptchaVerifier = verifier;
    return verifier;
  };

  // ✅ helper: ¿ya tiene provider phone linkeado este usuario?
  const userAlreadyHasPhoneProvider = (u) => {
    if (!u?.providerData?.length) return false;
    return u.providerData.some((p) => p?.providerId === "phone");
  };

  // =========================================================
  // ✅ Enviar SMS (LINK si hay user logueado)
  // Devuelve: { ok: boolean, alreadyLinked: boolean }
  // =========================================================
  const sendVerificationCode = async (phoneNumber) => {
    setError("");
    setLoading(true);

    try {
      const { getAuth, signInWithPhoneNumber, linkWithPhoneNumber } =
        await getFirebaseAuth();
      const auth = getAuth();
      const currentUser = auth.currentUser;

      // ✅ Si ya está linkeado, NO intentamos enviar SMS (Firebase lo rechaza)
      if (currentUser && userAlreadyHasPhoneProvider(currentUser)) {
        return { ok: true, alreadyLinked: true };
      }

      const appVerifier = await setUpRecaptcha();

      const result = currentUser
        ? await linkWithPhoneNumber(currentUser, phoneNumber, appVerifier)
        : await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      setConfirmationResult(result);
      return { ok: true, alreadyLinked: false };
    } catch (err) {
      console.error("❌ Error enviando SMS:", err);

      // 🔥 Caso enterprise: provider ya linkeado (tratamos como OK)
      if (err?.code === "auth/provider-already-linked") {
        return { ok: true, alreadyLinked: true };
      }

      // reset recaptcha para reintentar
      try {
        window.recaptchaVerifier?.clear();
      } catch {}
      window.recaptchaVerifier = null;

      setError(`No se pudo enviar el SMS (${err?.code || "unknown"}).`);
      return { ok: false, alreadyLinked: false };
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // ✅ Confirmar código (solo cuando SÍ hubo SMS)
  // Devuelve: user | null
  // =========================================================
  const confirmVerificationCode = async (code) => {
    setError("");
    setLoading(true);

    try {
      if (!confirmationResult) throw new Error("No hay verificación iniciada");
      const res = await confirmationResult.confirm(code);
      return res.user;
    } catch (err) {
      console.error("❌ Error verificando código:", err);

      try {
        window.recaptchaVerifier?.clear();
      } catch {}
      window.recaptchaVerifier = null;

      setError(
        `El código no es válido o ha expirado (${err?.code || "unknown"}).`
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendVerificationCode,
    confirmVerificationCode,
    loading,
    error,
  };
};