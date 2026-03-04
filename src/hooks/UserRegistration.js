// src/components/.js
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  registerWithEmail,
  loginWithEmail,
  savePhoneNumber,
  resetPassword,
} from "./../hooks/userIDService";
import {
  validateLoginForm,
  validateRegisterForm,
  getFriendlyAuthError,
} from "./../utils/utilsForm";
import { Form, Input, Button, TextLink } from "./../Styles/FormStyles";

export default function UserRegistration({ mode = "login" }) {
  const [needsPhone, setNeedsPhone] = useState(false);
  const [googleUser, setGoogleUser] = useState(null); // solo por consistencia
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
const redirectTo = location.state?.from === "demo-simulador"
  ? "/academia/demo/simulador"
  : "/";


  // Guardar teléfono si falta
  const handleSavePhone = async e => {
    e.preventDefault();
    if (!phone || phone.length < 7)
      return alert("Introduce un teléfono válido");
    try {
      await savePhoneNumber(googleUser.uid, phone);
      navigate(redirectTo);
    } catch {
      alert("Error guardando teléfono");
    }
  };

  // Registro con email/pass
  const handleRegister = async e => {
    e.preventDefault();
    const error = validateRegisterForm(name, email, password, phone);
    if (error) return alert(error);
    try {
      await registerWithEmail(name, email, password, phone);
      navigate(redirectTo);
    } catch (error) {
      alert(getFriendlyAuthError(error.code));
    }
  };

  // Login con email/pass
  const handleLogin = async e => {
    e.preventDefault();
    const error = validateLoginForm(email, password);
    if (error) return alert(error);
    try {
      await loginWithEmail(email, password);
      navigate(redirectTo);
    } catch (error) {
      alert(getFriendlyAuthError(error.code));
    }
  };

  // Reset pass
  const handleResetPassword = async () => {
    if (!email) return alert("Introduce tu correo");
    try {
      await resetPassword(email);
      alert("📩 Te enviamos un correo para restablecer la contraseña");
    } catch {
      alert("No se pudo enviar el correo");
    }
  };

  return (
    <Form>
      {needsPhone ? (
        <>
          <Input
            type="tel"
            placeholder="Número de teléfono"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <Button onClick={handleSavePhone}>Confirmar teléfono</Button>
        </>
      ) : (
        <>
          {mode === "register" && (
            <Input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )}
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {mode === "register" && (
            <Input
              type="tel"
              placeholder="Número de teléfono"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          )}

          {mode === "login" ? (
            <>
              <Button onClick={handleLogin}>Iniciar sesión</Button>
              <TextLink onClick={handleResetPassword}>
                ¿Olvidaste tu contraseña?
              </TextLink>
              <TextLink as={Link} to="/register">
                ¿No tienes cuenta? Regístrate
              </TextLink>
            </>
          ) : (
            <>
              <Button onClick={handleRegister}>Registrarse</Button>
              <TextLink as={Link} to="/login">
                ¿Ya tienes cuenta? Inicia sesión
              </TextLink>
            </>
          )}
        </>
      )}
    </Form>
  );
}
