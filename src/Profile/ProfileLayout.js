import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/navigator/sections/auth/useAuth";
import HeaderAcademia from "@/components/HeaderBox/HeaderAcademia";
import {
  cancelSubscription,
  requestRefund,
} from "@/services/subscriptionService";

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

  const { userData, subscription, user: firebaseUser, refreshSubscription } = auth;

  const [busyAction, setBusyAction] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState(false);

  // 🔹 Identidad (Firestore)
  const displayName = userData?.displayName || user?.displayName || "Alumno";
  const email = userData?.email || user?.email || "";
  const createdAt = userData?.createdAt || user?.createdAt;

  // 🔹 🔐 Suscripción REAL (Cloudflare D1)
  const plan = subscription?.plan || null;
  const status = subscription?.status || "none";
  const expiresAt = subscription?.expires_at || null;
  const stripeSubscriptionId = subscription?.stripe_subscription_id || null;
  const isPro = subscription?.active === true;

  // 🔹 Verificaciones
  const phoneNumber = userData?.phoneNumber ?? null;
  const phoneVerified = !!userData?.phoneVerified;

  const emailVerified =
    typeof userData?.emailVerified === "boolean"
      ? userData.emailVerified
      : null;

  const canManageSubscription = isPro && !!stripeSubscriptionId;

  const planLabel = useMemo(() => {
    if (!isPro) return "DEMO";
    return `PRO (${plan})`;
  }, [isPro, plan]);

  const handleCancelSubscription = async () => {
    if (!firebaseUser || !canManageSubscription) return;

    const confirmed = window.confirm(
      "¿Quieres cancelar la renovación automática? Mantendrás el acceso hasta el final del periodo ya pagado."
    );

    if (!confirmed) return;

    try {
      setBusyAction("cancel");
      setActionMessage("");
      setActionError(false);

      const data = await cancelSubscription(firebaseUser);
      await refreshSubscription?.();

      setActionMessage(
        data?.message ||
          `Tu suscripción quedará cancelada al final del periodo actual (${toDateLabel(
            data?.expires_at || expiresAt
          )}).`
      );
    } catch (error) {
      console.error("Error cancelando suscripción:", error);
      setActionError(true);
      setActionMessage(
        error?.message || "No se pudo cancelar la suscripción."
      );
    } finally {
      setBusyAction("");
    }
  };

  const handleRefundRequest = async () => {
    if (!firebaseUser || !canManageSubscription) return;

    const confirmed = window.confirm(
      "¿Quieres solicitar el reembolso? Si está dentro del plazo de 15 días, se devolverá el pago y se cancelará tu suscripción."
    );

    if (!confirmed) return;

    try {
      setBusyAction("refund");
      setActionMessage("");
      setActionError(false);

      const data = await requestRefund(firebaseUser);
      await refreshSubscription?.();

      setActionMessage(
        data?.message ||
          "Reembolso procesado correctamente. Tu acceso será actualizado."
      );
    } catch (error) {
      console.error("Error solicitando reembolso:", error);
      setActionError(true);
      setActionMessage(
        error?.message || "No se pudo procesar el reembolso."
      );
    } finally {
      setBusyAction("");
    }
  };

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

          <PlanBadge $pro={isPro}>{isPro ? "PRO" : "DEMO"}</PlanBadge>
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
                <RowValueStrong>{planLabel}</RowValueStrong>
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

            {isPro && (
              <SettingsRow>
                <RowLabel>Suscripción</RowLabel>
                <div>
                  <RowValueStrong>Gestión de tu plan</RowValueStrong>
                  <RowHint>
                    Puedes cancelar la renovación o solicitar un reembolso dentro
                    de los 15 días desde el cobro.
                  </RowHint>

                  {!!actionMessage && (
                    <RowHint
                      style={{
                        marginTop: 10,
                        color: actionError ? "#fca5a5" : "#9ef0d7",
                        opacity: 1,
                      }}
                    >
                      {actionMessage}
                    </RowHint>
                  )}
                </div>
                <RowActions>
                  <Button
                    type="button"
                    onClick={handleCancelSubscription}
                    disabled={
                      !canManageSubscription || busyAction === "cancel" || busyAction === "refund"
                    }
                  >
                    {busyAction === "cancel"
                      ? "Cancelando..."
                      : "Cancelar suscripción"}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleRefundRequest}
                    disabled={
                      !canManageSubscription || busyAction === "cancel" || busyAction === "refund"
                    }
                  >
                    {busyAction === "refund"
                      ? "Procesando..."
                      : "Solicitar reembolso"}
                  </Button>
                </RowActions>
              </SettingsRow>
            )}

            {isPro && (
              <SettingsRow>
                <RowLabel>Estado</RowLabel>
                <div>
                  <RowValueStrong>{status || "—"}</RowValueStrong>
                  <RowHint>
                    Estado contractual actual de tu suscripción.
                  </RowHint>
                </div>
                <RowActions>
                  <StatusPill $ok={status === "active"}>
                    {status === "active" ? "Activa" : status || "—"}
                  </StatusPill>
                </RowActions>
              </SettingsRow>
            )}
          </SettingsCard>
        </Section>
      </PageWrapper>
    </>
  );
}