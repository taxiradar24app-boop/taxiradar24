import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  registerWithEmail,
  loginWithEmail,
  resetPassword,
} from "./../hooks/userIDService";

import {
  validateLoginForm,
  validateRegisterForm,
  getFriendlyAuthError,
} from "./../utils/utilsForm";

import { Form, Input, Button, TextLink } from "./../Styles/FormStyles";

export default function UserRegistration({ mode = "login" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    location.state?.from === "demo-simulador"
      ? "/academia/demo/simulador"
      : "/academia/demo";

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

    try {
      await registerWithEmail(name.trim(), email.trim(), password);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Error en registro:", error);
      alert(getFriendlyAuthError(error.code));
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
      await loginWithEmail(email.trim(), password);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Error en login:", error);
      alert(getFriendlyAuthError(error.code));
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      alert("Introduce tu correo");
      return;
    }

    try {
      await resetPassword(email.trim());
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
          <Button type="submit">Iniciar sesión</Button>

          <TextLink onClick={handleResetPassword}>
            ¿Olvidaste tu contraseña?
          </TextLink>

          <TextLink as={Link} to="/register">
            ¿No tienes cuenta? Regístrate
          </TextLink>
        </>
      ) : (
        <>
          <Button type="submit">Registrarse</Button>

          <TextLink as={Link} to="/login">
            ¿Ya tienes cuenta? Inicia sesión
          </TextLink>
        </>
      )}
    </Form>
  );
}