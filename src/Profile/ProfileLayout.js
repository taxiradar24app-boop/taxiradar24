import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/navigator/sections/auth/useAuth";
import HeaderAcademia from "@/components/HeaderBox/HeaderAcademia";

import {
  PageWrapper,
  HeaderSection,
  UserInfo,
  Avatar,
  UserName,
  UserEmail,
  PlanBadge,
  DatesRow,
  Section,
  SectionTitle,
  SectionSub,
  SettingsCard,
  SettingsRow,
  RowLabel,
  RowValueStrong,
  RowHint,
  RowActions,
  Button,
  PrimaryButton,
  StatusPill,
} from "./ProfileLayoutStyle";

function toDateLabel(v) {
  if (!v) return "—";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
}

export default function ProfileLayout({ user = {} }) {
  const auth = useAuth();
  const navigate = useNavigate();

  const { userData, subscription } = auth;

  // 🔹 Identidad (Firestore)
  const displayName = userData?.displayName || user?.displayName || "Alumno";
  const email = userData?.email || user?.email || "";

  const createdAt = userData?.createdAt || user?.createdAt;

   // 🔹 🔐 Suscripción REAL (Cloudflare D1)
  const plan = subscription?.plan || null;
  const status = subscription?.status || "none";
  const expiresAt = subscription?.expires_at || null;

  const isPro = subscription?.active === true;

  // 🔹 Verificaciones
  const phoneNumber = userData?.phoneNumber ?? null;
  const phoneVerified = !!userData?.phoneVerified;

  const emailVerified =
    typeof userData?.emailVerified === "boolean"
      ? userData.emailVerified
      : null;

  return (
    <>
      <HeaderAcademia />

      <PageWrapper>
        <HeaderSection>
          <UserInfo>
            <Avatar>
              {String(displayName || "A").charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <UserName>{displayName}</UserName>
              <UserEmail>{email}</UserEmail>
              <DatesRow>
                {createdAt && <span>Alumno desde: {toDateLabel(createdAt)}</span>}
              {expiresAt && isPro && (
                <span>Activo hasta: {toDateLabel(expiresAt)}</span>
              )}
                            </DatesRow>
            </div>
          </UserInfo>

          <PlanBadge $pro={isPro}>
            {isPro ? "PRO" : "DEMO"}
          </PlanBadge>
        </HeaderSection>

        <Section>
          <SectionTitle>Datos personales</SectionTitle>
          <SectionSub>
            Información de tu cuenta. Aquí no se muestra el progreso académico.
          </SectionSub>

          <SettingsCard>
            <SettingsRow>
              <RowLabel>Nombre</RowLabel>
              <div>
                <RowValueStrong>{displayName || "—"}</RowValueStrong>
                <RowHint>Nombre visible en tu cuenta.</RowHint>
              </div>
              <RowActions>
                <Button type="button">Editar</Button>
              </RowActions>
            </SettingsRow>

            <SettingsRow>
              <RowLabel>Correo electrónico</RowLabel>
              <div>
                <RowValueStrong>{email || "—"}</RowValueStrong>
                <RowHint>Acceso y comunicaciones.</RowHint>
              </div>
              <RowActions>
                <StatusPill $ok={emailVerified === true}>
                  {emailVerified === null
                    ? "Verificación: —"
                    : emailVerified
                    ? "Verificado"
                    : "No verificado"}
                </StatusPill>
              </RowActions>
            </SettingsRow>

            <SettingsRow>
              <RowLabel>Teléfono</RowLabel>
              <div>
                <RowValueStrong>{phoneNumber || "—"}</RowValueStrong>
                <RowHint>Necesario para activar PRO.</RowHint>
              </div>
              <RowActions>
                <StatusPill $ok={phoneNumber && phoneVerified}>
                  {!phoneNumber
                    ? "Falta"
                    : phoneVerified
                    ? "Verificado"
                    : "Sin verificar"}
                </StatusPill>
              </RowActions>
            </SettingsRow>

            <SettingsRow>
              <RowLabel>Plan</RowLabel>
              <div>
                <RowValueStrong>
                  {isPro ? `PRO (${plan})` : "DEMO"}
                </RowValueStrong>
                <RowHint>
                  {isPro
                    ? `Activo hasta ${toDateLabel(expiresAt)}`
                    : "Tu acceso actual a la Academia."}
                </RowHint>
              </div>
              <RowActions>
                {isPro ? (
                  <PrimaryButton
                    type="button"
                    onClick={() => navigate("/academia/pro")}
                  >
                    Ir a la Academia
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    type="button"
                    onClick={() => navigate("/academia/upgrade")}
                  >
                    Desbloquear PRO
                  </PrimaryButton>
                )}
              </RowActions>
            </SettingsRow>
          </SettingsCard>
        </Section>
      </PageWrapper>
    </>
  );
}