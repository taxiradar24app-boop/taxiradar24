// src/Academy/upgrade/UpgradePage.js

import React, { useEffect, useMemo, useState } from "react";
import {
  UpgradeWrapper,
  HeroTag,
  HeroTitle,
  HeroSubtitle,
  NoticeBox,
  NoticeTitle,
  NoticeText,
  PlansSection,
  PlansContainer,
  PlansGrid,
  PlanCard,
  LockPill,
  PlanTitle,
  PlanPrice,
  PlanList,
  PlanItem,
  PlanButtonWrap,
  PlanHint,
  ClosingBox,
  ClosingTag,
  ClosingTitle,
  ClosingText,
  ClosingButtons,
} from "./UpgradeStyles";

import {
  PrimaryButton,
  SecondaryButton,
  CardButton,
} from "@/components/Buttons/ButtonsAcademia";

import { useNavigate } from "react-router-dom";
import { useSmartNavigation } from "@/utils/SmartNavigation";
import { getDb } from "@/services/firebaseConfig";
import { docLazy, onSnapshotLazy } from "@/services/firestoreService";
import { createCheckoutSession } from "@/services/stripeService";
import { useAuth } from "@/context/AuthContext";

export default function UpgradePage() {
  const { goAcademyPro, goDemo, goHome } = useSmartNavigation();
  const {
    user,
    loading,
    emailVerified,
    phoneVerified,
    hasIdentityConflict,
  } = useAuth();

  const navigate = useNavigate();

  const [checkingPro, setCheckingPro] = useState(true);
  const [payingPlan, setPayingPlan] = useState(null);

  const canPurchasePro =
    !!user &&
    emailVerified === true &&
    phoneVerified === true &&
    !hasIdentityConflict;

  const identityMessage = useMemo(() => {
    if (!user) {
      return {
        title: "Puedes ver todos los planes ahora mismo",
        text:
          "Para activar cualquier plan PRO primero tendrás que iniciar sesión y completar tu identificación.",
      };
    }

    if (hasIdentityConflict) {
      return {
        title: "Tu cuenta necesita revisión",
        text:
          "Hemos detectado un conflicto de identidad. Puedes ver los planes, pero antes de comprar debes resolver ese estado.",
      };
    }

    if (!emailVerified) {
      return {
        title: "Te falta verificar el correo",
        text:
          "Puedes revisar todos los planes, pero antes de comprar necesitamos confirmar que tu correo es tuyo.",
      };
    }

    if (!phoneVerified) {
      return {
        title: "Te falta verificar el teléfono",
        text:
          "Puedes revisar todos los planes, pero antes de comprar necesitamos confirmar tu número de teléfono.",
      };
    }

    return {
      title: "Tu perfil está listo para activar PRO",
      text:
        "Ya puedes elegir el plan que mejor te encaje y continuar al pago con total normalidad.",
    };
  }, [user, emailVerified, phoneVerified, hasIdentityConflict]);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setCheckingPro(false);
      return;
    }

    let unsub = null;
    let cancelled = false;

    async function init() {
      try {
        const db = await getDb();
        const userRef = await docLazy(db, "users", user.uid);

        unsub = await onSnapshotLazy(
          userRef,
          (snap) => {
            if (cancelled) return;

            const plan = (snap.data()?.subscription || "").trim().toUpperCase();

            if (snap.exists() && plan === "PRO") {
              goAcademyPro();
              return;
            }

            setCheckingPro(false);
          },
          () => {
            if (cancelled) return;
            setCheckingPro(false);
          }
        );
      } catch (error) {
        console.error("UpgradePage Firestore error:", error);
        if (!cancelled) {
          setCheckingPro(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      if (typeof unsub === "function") {
        unsub();
      }
    };
  }, [user, loading, goAcademyPro]);

  const redirectToIdentityStep = () => {
    if (!user) {
      navigate("/login", {
        state: { redirectTo: "/academia/upgrade" },
      });
      return;
    }

    if (hasIdentityConflict) {
      navigate("/identity-merge", {
        state: { redirectTo: "/academia/upgrade" },
      });
      return;
    }

    if (!emailVerified) {
      navigate("/check-email", {
        state: { redirectTo: "/academia/upgrade" },
      });
      return;
    }

    if (!phoneVerified) {
      navigate("/verify", {
        state: { redirectTo: "/academia/upgrade" },
      });
    }
  };

  const choosePlan = async (months) => {
    if (checkingPro) return;

    if (!canPurchasePro) {
      redirectToIdentityStep();
      return;
    }

    const plan =
      months === 1
        ? "test"
        : months === 3
          ? "3m"
          : months === 6
            ? "6m"
            : null;

    if (!plan) return;

    try {
      setPayingPlan(plan);

      const url = await createCheckoutSession(plan);

      if (!url) {
        setPayingPlan(null);
        return;
      }

      window.location.href = url;
    } catch (error) {
      console.error("Stripe checkout error:", error);
      alert(error?.message || "No se pudo iniciar el pago. Inténtalo de nuevo.");
      setPayingPlan(null);
    }
  };

  const getPlanButtonLabel = (planKey, defaultLabel) => {
    if (payingPlan === planKey) return "Redirigiendo…";
    return defaultLabel;
  };

  const getPlanHint = () => {
    if (!user) {
      return "Puedes ver este plan ahora. Para comprarlo, primero tendrás que iniciar sesión.";
    }

    if (hasIdentityConflict) {
      return "Antes de comprar, resuelve el conflicto de identidad.";
    }

    if (!emailVerified) {
      return "Antes de comprar, confirma tu correo electrónico.";
    }

    if (!phoneVerified) {
      return "Antes de comprar, confirma tu teléfono.";
    }

    return "Tu perfil está completo. Ya puedes activar este plan.";
  };

  const planActionDisabled = checkingPro || payingPlan !== null;

  return (
    <UpgradeWrapper>
      <HeroTag>PLANES DE ESTUDIO</HeroTag>

      <HeroTitle>Empieza gratis o accede a la formación completa</HeroTitle>

      <HeroSubtitle>
        Puedes explorar todos los planes antes de decidirte. El acceso a la
        compra solo se activa cuando tu identidad está completa y validada.
      </HeroSubtitle>

      <NoticeBox>
        <NoticeTitle>{identityMessage.title}</NoticeTitle>
        <NoticeText>{identityMessage.text}</NoticeText>
      </NoticeBox>

      <PlansSection>
        <PlansContainer>
          <PlansGrid>
            <PlanCard>
              <PlanTitle>DEMO</PlanTitle>
              <PlanPrice>0€</PlanPrice>

              <PlanList>
                <PlanItem>• Audios 1–2</PlanItem>
                <PlanItem>• 1 simulador de examen</PlanItem>
                <PlanItem>• Ejercicios básicos de callejero</PlanItem>
                <PlanItem>• Acceso inmediato</PlanItem>
              </PlanList>

              <PlanButtonWrap>
                <CardButton type="button" onClick={goDemo}>
                  Entrar a DEMO
                </CardButton>
              </PlanButtonWrap>
            </PlanCard>

            <PlanCard pro>
              {!canPurchasePro && <LockPill>🔒 Compra protegida</LockPill>}

              <PlanTitle>PRO</PlanTitle>
              <PlanPrice>9,99€ / mes</PlanPrice>

              <PlanList>
                <PlanItem>✔ Audios 1–15 completos</PlanItem>
                <PlanItem>✔ Simuladores ilimitados</PlanItem>
                <PlanItem>✔ Callejero completo</PlanItem>
                <PlanItem>✔ Seguimiento de progreso</PlanItem>
                <PlanItem>✔ Acceso 24/7 desde móvil o PWA</PlanItem>
              </PlanList>

              <PlanButtonWrap>
                <SecondaryButton
                  type="button"
                  disabled={planActionDisabled}
                  onClick={() => choosePlan(1)}
                >
                  {getPlanButtonLabel("monthly", "Acceder")}
                </SecondaryButton>
                <PlanHint>{getPlanHint()}</PlanHint>
              </PlanButtonWrap>
            </PlanCard>

            <PlanCard pro>
              {!canPurchasePro && <LockPill>🔒 Compra protegida</LockPill>}

              <PlanTitle>PRO 3 meses</PlanTitle>
              <PlanPrice>24,99€</PlanPrice>

              <PlanList>
                <PlanItem>✔ Contenido completo</PlanItem>
                <PlanItem>✔ Ahorra 20%</PlanItem>
              </PlanList>

              <PlanButtonWrap>
                <PrimaryButton
                  type="button"
                  disabled={planActionDisabled}
                  onClick={() => choosePlan(3)}
                >
                  {getPlanButtonLabel("3m", "Comprar")}
                </PrimaryButton>
                <PlanHint>{getPlanHint()}</PlanHint>
              </PlanButtonWrap>
            </PlanCard>

            <PlanCard pro>
              {!canPurchasePro && <LockPill>🔒 Compra protegida</LockPill>}

              <PlanTitle>PRO 6 meses</PlanTitle>
              <PlanPrice>39,99€</PlanPrice>

              <PlanList>
                <PlanItem>✔ Contenido completo</PlanItem>
                <PlanItem>✔ Ahorra 33%</PlanItem>
              </PlanList>

              <PlanButtonWrap>
                <PrimaryButton
                  type="button"
                  disabled={planActionDisabled}
                  onClick={() => choosePlan(6)}
                >
                  {getPlanButtonLabel("6m", "Comprar")}
                </PrimaryButton>
                <PlanHint>{getPlanHint()}</PlanHint>
              </PlanButtonWrap>
            </PlanCard>
          </PlansGrid>
        </PlansContainer>
      </PlansSection>

      <ClosingBox>
        <ClosingTag>TaxiRadar24</ClosingTag>

        <ClosingTitle>Elige cómo quieres empezar</ClosingTitle>

        <ClosingText>
          Puedes entrar ahora mismo en la versión DEMO para conocer la
          experiencia, o revisar los planes PRO y completar tu perfil cuando
          quieras dar el paso a la formación completa.
        </ClosingText>

        <ClosingButtons>
          <PrimaryButton type="button" onClick={goDemo}>
            Ir a /academia/demo
          </PrimaryButton>

          <SecondaryButton type="button" onClick={goHome}>
            ← Volver al inicio
          </SecondaryButton>
        </ClosingButtons>
      </ClosingBox>
    </UpgradeWrapper>
  );
}