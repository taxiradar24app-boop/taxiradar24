// ======================================================================
// 🎓 UPGRADE PAGE — Versión Enterprise con SmartNavigation
// (diseño intacto, navegación centralizada)
// + Auto-detect PRO en Firestore (modo manual consola)
// + Stripe Checkout (1m / 3m / 6m)
// ======================================================================

import React, { useEffect, useState } from "react";
import {
  UpgradeWrapper,
  HeroTag,
  HeroTitle,
  HeroSubtitle,
  PlansGrid,
  PlanCard,
  PlanTitle,
  PlanPrice,
  PlanButton,
  GuaranteeBox,
  GuaranteeTitle,
  GuaranteeText,
} from "./UpgradeStyles";

import { useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";

import { useSmartNavigation } from "@/utils/SmartNavigation";
import { getDb } from "@/services/firebaseConfig";
import { createCheckoutSession } from "@/services/stripeService";
import { useAuth } from "@/context/AuthContext";

export default function UpgradePage() {
  const { goAcademyPro, goDemo } = useSmartNavigation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [checkingPro, setCheckingPro] = useState(true);
  const [payingPlan, setPayingPlan] = useState(null); // "monthly" | "3m" | "6m" | null

  useEffect(() => {
    if (loading) return;

    let unsub = null;

    async function init() {
      if (!user) {
        navigate("/login");
        return;
      }

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
  }, [user, loading, navigate, goAcademyPro]);

  const choosePlan = async (months) => {
    if (checkingPro) return;

    if (months === 12) {
      goAcademyPro();
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
      <HeroTag>Acceso PRO — TaxiRadar24</HeroTag>

      <HeroTitle>Elige tu plan PRO y desbloquea TODO el contenido</HeroTitle>

      <HeroSubtitle>
        Estudia con audios guiados, simuladores oficiales, Callejero completo y
        la preparación más clara y directa para aprobar el Permiso Municipal de
        Taxista.
      </HeroSubtitle>

      {checkingPro && (
        <div style={{ marginTop: "1rem", opacity: 0.8 }}>
          Verificando acceso…
        </div>
      )}

      <PlansGrid>
        <PlanCard>
          <PlanTitle>1 mes</PlanTitle>
          <PlanPrice>9,99€</PlanPrice>
          <PlanButton
            disabled={checkingPro || payingPlan !== null}
            onClick={() => choosePlan(1)}
          >
            {payingPlan === "monthly" ? "Redirigiendo…" : "Elegir plan"}
          </PlanButton>
        </PlanCard>

        <PlanCard>
          <PlanTitle>3 meses</PlanTitle>
          <PlanPrice>24,99€</PlanPrice>
          <PlanButton
            disabled={checkingPro || payingPlan !== null}
            onClick={() => choosePlan(3)}
          >
            {payingPlan === "3m" ? "Redirigiendo…" : "Elegir plan"}
          </PlanButton>
        </PlanCard>

        <PlanCard>
          <PlanTitle>6 meses</PlanTitle>
          <PlanPrice>39,99€</PlanPrice>
          <PlanButton
            disabled={checkingPro || payingPlan !== null}
            onClick={() => choosePlan(6)}
          >
            {payingPlan === "6m" ? "Redirigiendo…" : "Elegir plan"}
          </PlanButton>
        </PlanCard>

        <PlanCard>
          <PlanTitle>12 meses</PlanTitle>
          <PlanPrice>Próximamente</PlanPrice>
          <PlanButton
            disabled={checkingPro || payingPlan !== null}
            onClick={() => choosePlan(12)}
          >
            Acceso manual
          </PlanButton>
        </PlanCard>
      </PlansGrid>

      <GuaranteeBox>
        <GuaranteeTitle>¿Qué desbloqueas con PRO?</GuaranteeTitle>
        <GuaranteeText>
          Acceso completo a los módulos, simuladores, callejero, audiolectura y
          herramientas avanzadas para preparar el examen con una metodología
          clara, progresiva y profesional.
        </GuaranteeText>

        <div style={{ marginTop: "1rem" }}>
          <PlanButton
            style={{ maxWidth: 280 }}
            disabled={checkingPro || payingPlan !== null}
            onClick={goDemo}
          >
            Volver a DEMO
          </PlanButton>
        </div>
      </GuaranteeBox>
    </UpgradeWrapper>
  );
}