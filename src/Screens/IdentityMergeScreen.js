import React from "react";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: radial-gradient(
    1200px 600px at 20% 0%,
    rgba(16, 163, 127, 0.10),
    rgba(10, 15, 30, 0.98)
  );
`;

const Card = styled.div`
  width: 100%;
  max-width: 520px;
  border-radius: 18px;
  padding: 22px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
`;

const Title = styled.h1`
  margin: 0 0 10px 0;
  font-size: 1.25rem;
  color: #e2e8f0;
  letter-spacing: 0.2px;
`;

const Text = styled.p`
  margin: 0 0 16px 0;
  color: rgba(226, 232, 240, 0.85);
  font-size: 0.95rem;
  line-height: 1.45;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(244, 91, 105, 0.14);
  border: 1px solid rgba(244, 91, 105, 0.28);
  color: rgba(244, 91, 105, 0.95);
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 14px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const Btn = styled.button`
  border: 0;
  cursor: pointer;
  border-radius: 12px;
  padding: 12px 14px;
  font-weight: 800;
  letter-spacing: 0.2px;
  transition: transform 0.08s ease, opacity 0.12s ease;
  &:active {
    transform: translateY(1px);
  }
`;

const DangerBtn = styled(Btn)`
  background: rgba(244, 91, 105, 0.95);
  color: #0a0f1e;
`;

const GhostBtn = styled(Btn)`
  background: rgba(255, 255, 255, 0.06);
  color: rgba(226, 232, 240, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

export default function IdentityMergeScreen() {
  const { logout } = useAuth();

  return (
    <Wrap>
      <Card>
        <Badge>⚠️ Conflicto de identidad</Badge>

        <Title>Hemos detectado una cuenta duplicada</Title>
        <Text>
          Por seguridad, el acceso queda bloqueado hasta que se resuelva el
          conflicto. Esto suele ocurrir cuando el teléfono se valida creando un
          usuario distinto en lugar de vincularlo a la cuenta actual.
        </Text>

        <Text style={{ opacity: 0.85 }}>
          Solución recomendada (DEV): cerrar sesión, borrar el usuario duplicado
          en Firebase Auth/Firestore y repetir el flujo con vinculación de
          teléfono (link).
        </Text>

        <ButtonRow>
          <DangerBtn onClick={logout}>Cerrar sesión</DangerBtn>
          <GhostBtn onClick={() => (window.location.href = "/")}>
            Ir al inicio
          </GhostBtn>
        </ButtonRow>
      </Card>
    </Wrap>
  );
}