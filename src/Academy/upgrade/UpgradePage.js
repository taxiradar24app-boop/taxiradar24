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
import { createCheckoutSession } from "./../../services/stripeService";
import { useAuth } from "@/context/AuthContext";

const db = getDb();

export default function UpgradePage() {
  const { goAcademyPro, goDemo } = useSmartNavigation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [checkingPro, setCheckingPro] = useState(true);
  const [payingPlan, setPayingPlan] = useState(null); // "monthly" | "3m" | "6m" | null

  // =====================================================
  // ✅ AUTO-DETECT: si en Firebase Console pones PRO,
  // esta pantalla te saca automáticamente a PRO.
  // =====================================================
  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    const ref = doc(db, "users", user.uid);

    const unsub = onSnapshot(
      ref,
      (snap) => {
        const plan = (snap.data()?.subscription || "").trim().toUpperCase();

        // Si ya eres PRO, fuera de Upgrade
        if (snap.exists() && plan === "PRO") {
          goAcademyPro();
          return;
        }

        setCheckingPro(false);
      },
      () => {
        // si hay error, al menos desbloqueamos UI
        setCheckingPro(false);
      }
    );

    return () => unsub();
  }, [user, loading, navigate, goAcademyPro]);

  // =====================================================
  // 💳 LÓGICA DE ELECCIÓN DE PLAN (Stripe)
  // =====================================================
  const choosePlan = async (months) => {
    // Mientras validamos PRO (onSnapshot), evitamos clicks
    if (checkingPro) return;

    // 12 meses aún no está creado en Stripe (temporal)
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

      // Redirección Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error("Stripe checkout error:", error);
      alert(error?.message || "No se pudo iniciar el pago. Inténtalo de nuevo.");
      setPayingPlan(null);
    }
  };

  return (
    <UpgradeWrapper>
      {/* HERO DE IMPACTO */}
      <HeroTag>Acceso PRO — TaxiRadar24</HeroTag>

      <HeroTitle>Elige tu plan PRO y desbloquea TODO el contenido</HeroTitle>

      <HeroSubtitle>
        Estudia con audios guiados, simuladores oficiales, Callejero completo y
        la preparación más clara y directa para aprobar el Permiso Municipal de
        Taxista.
      </HeroSubtitle>

      {/* Mensaje mini (opcional) mientras valida */}
      {checkingPro && (
        <div style={{ marginTop: "1rem", opacity: 0.8 }}>
          Verificando acceso…
        </div>
      )}

      {/* GRID DE PLANES */}
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

      </PlansGrid>

      {/* CTA seguir gratis */}
      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <PlanButton
          style={{ width: "280px" }}
          onClick={goDemo}
          disabled={payingPlan !== null}
        >
          Seguir en versión DEMO
        </PlanButton>
      </div>

      {/* GARANTÍA */}
      <GuaranteeBox>
        <GuaranteeTitle>Garantía TaxiRadar24</GuaranteeTitle>
        <GuaranteeText>
          Si estudias con nuestros audios, realizas los simuladores y completas
          los ejercicios, llegarás al examen con la mejor preparación posible.
          Miles de preguntas y todos los artículos explicados paso a paso.
        </GuaranteeText>
      </GuaranteeBox>
    </UpgradeWrapper>
  );
}