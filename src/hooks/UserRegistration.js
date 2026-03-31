import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  registerWithEmail,
  loginWithEmail,
  resetPassword,
  normalizePhoneNumber,
  sendEmailVerificationToUser,
} from "./../hooks/userIDService";

import {
  validateLoginForm,
  validateRegisterForm,
  validatePhone,
  getFriendlyAuthError,
} from "./../utils/utilsForm";

import {
  Form,
  Input,
  Button,
  TextLink,
  PhoneField,
  PhonePrefix,
  PhoneInput,
} from "./../Styles/FormStyles";

export default function UserRegistration({ mode = "login" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    location.state?.redirectTo ||
    (location.state?.from === "demo-simulador"
      ? "/academia/demo/simulador"
      : "/academia/demo");

  const handleRegister = async (e) => {
    e.preventDefault();

    const error = validateRegisterForm(
      name,
      email,
      confirmEmail,
      password,
      confirmPassword
    );

    if (error) {
      alert(error);
      return;
    }

    const formattedPhone = normalizePhoneNumber(`+34${phone.trim()}`);

    if (!validatePhone(formattedPhone)) {
      alert("Introduce un teléfono válido de España.");
      return;
    }

    try {
      setBusy(true);

      const user = await registerWithEmail(
        name.trim(),
        email.trim().toLowerCase(),
        password,
        formattedPhone
      );

      await sendEmailVerificationToUser(user);

      navigate("/check-email", {
        replace: true,
        state: {
          redirectTo,
          email: email.trim().toLowerCase(),
        },
      });
    } catch (error) {
      console.error("Error en registro:", error);
      alert(getFriendlyAuthError(error.code));
    } finally {
      setBusy(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const error = validateLoginForm(email, password);

    if (error) {
      alert(error);
      return;
    }

    try {
      setBusy(true);
      await loginWithEmail(email.trim().toLowerCase(), password);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Error en login:", error);
      alert(getFriendlyAuthError(error.code));
    } finally {
      setBusy(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      alert("Introduce tu correo");
      return;
    }

    try {
      await resetPassword(email.trim().toLowerCase());
      alert("📩 Te enviamos un correo para restablecer la contraseña");
    } catch (error) {
      console.error("Error reset password:", error);
      alert("No se pudo enviar el correo");
    }
  };

  return (
    <Form onSubmit={mode === "login" ? handleLogin : handleRegister}>
      {mode === "register" && (
        <Input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <Input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {mode === "register" && (
        <Input
          type="email"
          placeholder="Confirmar correo electrónico"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />
      )}

      {mode === "register" && (
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
      )}

      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {mode === "register" && (
        <Input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}

      {mode === "login" ? (
        <>
          <Button type="submit" disabled={busy}>
            {busy ? "Entrando…" : "Iniciar sesión"}
          </Button>

          <TextLink onClick={handleResetPassword}>
            ¿Olvidaste tu contraseña?
          </TextLink>

          <TextLink as={Link} to="/register">
            ¿No tienes cuenta? Regístrate
          </TextLink>
        </>
      ) : (
        <>
          <Button type="submit" disabled={busy}>
            {busy ? "Creando cuenta…" : "Registrarse"}
          </Button>

          <TextLink as={Link} to="/login">
            ¿Ya tienes cuenta? Inicia sesión
          </TextLink>
        </>
      )}
    </Form>
  );
}