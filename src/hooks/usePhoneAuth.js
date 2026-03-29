import { useState } from "react";
import { getAuth } from "@/services/firebaseConfig";

export const usePhoneAuth = () => {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ensureContainer = (id) => {
    let node = document.getElementById(id);

    if (!node) {
      node = document.createElement("div");
      node.id = id;
      document.body.appendChild(node);
    }

    return node;
  };

  const clearRecaptcha = () => {
    try {
      window.recaptchaVerifier?.clear();
    } catch {}

    window.recaptchaVerifier = null;

    const container = document.getElementById("recaptcha-container");
    if (container) {
      container.innerHTML = "";
    }
  };

  const setUpRecaptcha = async (containerId = "recaptcha-container") => {
    const container = ensureContainer(containerId);
    clearRecaptcha();

    const auth = await getAuth();
    const { RecaptchaVerifier } = await import("firebase/auth");

    const verifier = new RecaptchaVerifier(auth, container, {
      size: "invisible",
      callback: () => {},
      "expired-callback": () => {
        clearRecaptcha();
      },
    });

    await verifier.render();

    window.recaptchaVerifier = verifier;
    return verifier;
  };

  const userAlreadyHasPhoneProvider = (user) => {
    if (!user?.providerData?.length) return false;
    return user.providerData.some((provider) => provider?.providerId === "phone");
  };

  const sendVerificationCode = async (phoneNumber) => {
    setError("");
    setLoading(true);

    try {
      const auth = await getAuth();
      const { signInWithPhoneNumber, linkWithPhoneNumber } = await import(
        "firebase/auth"
      );

      const currentUser = auth.currentUser;

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
      clearRecaptcha();

      if (err?.code === "auth/provider-already-linked") {
        return { ok: true, alreadyLinked: true };
      }

      setError(`No se pudo enviar el SMS (${err?.code || "unknown"}).`);
      return { ok: false, alreadyLinked: false };
    } finally {
      setLoading(false);
    }
  };

  const confirmVerificationCode = async (code) => {
    setError("");
    setLoading(true);

    try {
      if (!confirmationResult) {
        throw new Error("No hay verificación iniciada");
      }

      const result = await confirmationResult.confirm(code);
      return result.user;
    } catch (err) {
      console.error("❌ Error verificando código:", err);
      clearRecaptcha();
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