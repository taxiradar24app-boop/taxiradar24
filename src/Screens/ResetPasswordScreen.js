// src/Screens/ResetPasswordScreen.js
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getFirebaseAuth } from "./../utils/lazyFirebase"; // ✅ lazy auth
import { Form, Input, Button } from "./../Styles/FormStyles";

export default function ResetPasswordScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [oobCode, setOobCode] = useState(null);

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (code) {
      setOobCode(code);
      (async () => {
        const { getAuth, verifyPasswordResetCode } = await getFirebaseAuth();
        try {
          await verifyPasswordResetCode(getAuth(), code);
          setStatus("ok");
        } catch {
          setStatus("invalid");
        }
      })();
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      const { getAuth, confirmPasswordReset } = await getFirebaseAuth();
      await confirmPasswordReset(getAuth(), oobCode, newPassword);
      alert("✅ Contraseña cambiada con éxito");
      navigate(redirectTo);

    } catch (error) {
      alert("❌ Error al cambiar contraseña");
    }
  };

  if (status === "invalid") {
    return <p style={{ color: "red" }}>El enlace no es válido o ha expirado.</p>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2 style={{ color: "#f4d35e" }}>Restablecer contraseña</h2>
      <Input
        type="password"
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirmar nueva contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button type="submit">Cambiar contraseña</Button>
    </Form>
  );
}