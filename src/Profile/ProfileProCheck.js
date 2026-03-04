// src/Profile/ProfileProCheck.js

import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "./../navigator/sections/auth/useAuth";
import PhoneVerification from "@/hooks/usePhoneVerification";
import { sendEmailVerification } from "firebase/auth";

const Container = styled.div`
  max-width: 600px;
  margin: 80px auto;
  padding: 32px;
  background: #0f172a;
  border-radius: 16px;
  color: white;
`;

const Section = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #1e293b;
  border-radius: 12px;
`;

const Button = styled.button`
  padding: 10px 16px;
  background: #10a37f;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Status = styled.p`
  margin-top: 8px;
  font-size: 14px;
  opacity: 0.85;
`;

export default function ProfileProCheck() {
  const navigate = useNavigate();
  const {
    user,
    subscription,
    emailVerified,
    phoneVerified,
    refreshSubscription,
    loading, // ✅ añadimos loading
  } = useAuth();

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  // ✅ Anti-flicker durante logout / transición
  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  const isActive = subscription?.status === "active";

  if (!isActive) {
    return <Navigate to="/academia/upgrade" replace />;
  }

  const handleEmailVerification = async () => {
    try {
      setLoadingEmail(true);
      setEmailMessage("");
      await sendEmailVerification(user);
      setEmailMessage("Te hemos enviado un email de verificación.");
    } catch (err) {
      setEmailMessage("No se pudo enviar el email.");
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleRefresh = async () => {
    try {
      await user.reload();
      await refreshSubscription?.();
    } catch (err) {
      console.error("Error refrescando usuario:", err);
    }
  };

  const ready = emailVerified && phoneVerified;

  return (
    <Container>
      <h2>Activación Academia PRO</h2>

      <Section>
        <strong>Suscripción:</strong>{" "}
        {isActive ? "Activa ✅" : "No activa ❌"}
      </Section>

      <Section>
        <strong>Email verificado:</strong>{" "}
        {emailVerified ? "Sí ✅" : "No ❌"}

        {!emailVerified && (
          <>
            <div style={{ marginTop: 12 }}>
              <Button
                onClick={handleEmailVerification}
                disabled={loadingEmail}
              >
                {loadingEmail
                  ? "Enviando..."
                  : "Enviar email de verificación"}
              </Button>
            </div>

            <div style={{ marginTop: 8 }}>
              <Button onClick={handleRefresh}>
                Ya verifiqué mi email
              </Button>
            </div>

            {emailMessage && <Status>{emailMessage}</Status>}
          </>
        )}
      </Section>

      <Section>
        <strong>Teléfono verificado:</strong>{" "}
        {phoneVerified ? "Sí ✅" : "No ❌"}

        {!phoneVerified && (
          <div style={{ marginTop: 12 }}>
            <PhoneVerification />
          </div>
        )}
      </Section>

      {ready && (
        <Button
          onClick={() =>
            navigate("/academia/pro", { replace: true })
          }
          style={{ marginTop: 24 }}
        >
          Entrar a Academia PRO
        </Button>
      )}
    </Container>
  );
}