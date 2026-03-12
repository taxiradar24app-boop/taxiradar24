// src/Academy/upgrade/UpgradePage.js

import React, { useEffect, useState } from "react";
import {
  UpgradeWrapper,
  HeroTag,
  HeroTitle,
  HeroSubtitle,
  PlansSection,
  PlansContainer,
  PlansGrid,
  PlanCard,
  PlanTitle,
  PlanPrice,
  PlanList,
  PlanItem,
  PlanButtonWrap,
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
import { doc, onSnapshot } from "firebase/firestore";

import { useSmartNavigation } from "@/utils/SmartNavigation";
import { getDb } from "@/services/firebaseConfig";
import { createCheckoutSession } from "@/services/stripeService";
import { useAuth } from "@/context/AuthContext";

export default function UpgradePage() {
  const { goAcademyPro, goDemo, goHome } = useSmartNavigation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [checkingPro, setCheckingPro] = useState(true);
  const [payingPlan, setPayingPlan] = useState(null);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setCheckingPro(false);
      return;
    }

    let unsub = null;

    async function init() {
      try {
        const db = await getDb();
        const ref = doc(db, "users", user.uid);

        unsub = onSnapshot(
          ref,
          (snap) => {
            const plan = (snap.data()?.subscription || "").trim().toUpperCase();

            if (snap.exists() && plan === "PRO") {
              goAcademyPro();
              return;
            }

            setCheckingPro(false);
          },
          () => {
            setCheckingPro(false);
          }
        );
      } catch (error) {
        console.error("UpgradePage Firestore error:", error);
        setCheckingPro(false);
      }
    }

    init();

    return () => {
      if (unsub) unsub();
    };
  }, [user, loading, goAcademyPro]);

  const choosePlan = async (months) => {
    if (checkingPro) return;

    if (!user) {
      navigate("/login");
      return;
    }

    const plan =
      months === 1 ? "monthly" : months === 3 ? "3m" : months === 6 ? "6m" : null;

    if (!plan) return;

    try {
      setPayingPlan(plan);

      const url = await createCheckoutSession(plan);
      window.location.href = url;
    } catch (error) {
      console.error("Stripe checkout error:", error);
      alert(error?.message || "No se pudo iniciar el pago. Inténtalo de nuevo.");
      setPayingPlan(null);
    }
  };

  return (
    <UpgradeWrapper>
      <HeroTag>PLANES DE ESTUDIO</HeroTag>

      <HeroTitle>
        Empieza gratis o accede a la formación completa
      </HeroTitle>

      <HeroSubtitle>
        Puedes probar primero la versión DEMO o entrar directamente en la
        Academia PRO.
      </HeroSubtitle>

      <PlansSection>
        <PlansContainer>
          <PlansGrid>
            <PlanCard>
              <PlanTitle>DEMO</PlanTitle>
              <PlanPrice>0€</PlanPrice>

              <PlanList>
                <PlanItem>• Audios 1 y 2</PlanItem>
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
                  disabled={checkingPro || payingPlan !== null}
                  onClick={() => choosePlan(1)}
                >
                  {payingPlan === "monthly" ? "Redirigiendo…" : "Acceder"}
                </SecondaryButton>
              </PlanButtonWrap>
            </PlanCard>

            <PlanCard pro>
              <PlanTitle>PRO 3 meses</PlanTitle>
              <PlanPrice>24,99€</PlanPrice>

              <PlanList>
                <PlanItem>✔ Contenido completo</PlanItem>
                <PlanItem>✔ Ahorra 20%</PlanItem>
              </PlanList>

              <PlanButtonWrap>
                <PrimaryButton
                  type="button"
                  disabled={checkingPro || payingPlan !== null}
                  onClick={() => choosePlan(3)}
                >
                  {payingPlan === "3m" ? "Redirigiendo…" : "Comprar"}
                </PrimaryButton>
              </PlanButtonWrap>
            </PlanCard>

            <PlanCard pro>
              <PlanTitle>PRO 6 meses</PlanTitle>
              <PlanPrice>39,99€</PlanPrice>

              <PlanList>
                <PlanItem>✔ Contenido completo</PlanItem>
                <PlanItem>✔ Ahorra 33%</PlanItem>
              </PlanList>

              <PlanButtonWrap>
                <PrimaryButton
                  type="button"
                  disabled={checkingPro || payingPlan !== null}
                  onClick={() => choosePlan(6)}
                >
                  {payingPlan === "6m" ? "Redirigiendo…" : "Comprar"}
                </PrimaryButton>
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
          experiencia, o pasar directamente a PRO si ya quieres desbloquear todo
          el contenido y avanzar con una preparación más seria.
        </ClosingText>

        <ClosingButtons>
          <PrimaryButton type="button" onClick={goDemo}>
            Ir a /academia/demo
          </PrimaryButton>

            <SecondaryButton onClick={goHome}>
                    ← Volver al inicio
            </SecondaryButton>
        </ClosingButtons>
      </ClosingBox>
    </UpgradeWrapper>
  );
}