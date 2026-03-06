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
  const [googleUser, setGoogleUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Ruta por defecto coherente para usuario nuevo o normal:
  // entra en DEMO, no vuelve al Home
  const redirectTo =
    location.state?.from === "demo-simulador"
      ? "/academia/demo/simulador"
      : "/academia/demo";

  // Guardar teléfono si falta
  const handleSavePhone = async (e) => {
    e.preventDefault();

    if (!phone || phone.trim().length < 7) {
      alert("Introduce un teléfono válido");
      return;
    }

    if (!googleUser?.uid) {
      alert("No se pudo identificar al usuario");
      return;
    }

    try {
      await savePhoneNumber(googleUser.uid, phone.trim());
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Error guardando teléfono:", error);
      alert("Error guardando teléfono");
    }
  };

  // Registro con email/pass
  const handleRegister = async (e) => {
    e.preventDefault();

    const error = validateRegisterForm(name, email, password, phone);
    if (error) {
      alert(error);
      return;
    }

    try {
      await registerWithEmail(
        name.trim(),
        email.trim(),
        password,
        phone.trim()
      );

      // ✅ Tras crear cuenta, mandamos a DEMO
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Error en registro:", error);
      alert(getFriendlyAuthError(error.code));
    }
  };

  // Login con email/pass
  const handleLogin = async (e) => {
    e.preventDefault();

    const error = validateLoginForm(email, password);
    if (error) {
      alert(error);
      return;
    }

    try {
      await loginWithEmail(email.trim(), password);

      // ✅ Usuario no PRO / flujo normal -> DEMO
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("Error en login:", error);
      alert(getFriendlyAuthError(error.code));
    }
  };

  // Reset pass
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
    <Form>
      {needsPhone ? (
        <>
          <Input
            type="tel"
            placeholder="Número de teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {mode === "register" && (
            <Input
              type="tel"
              placeholder="Número de teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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