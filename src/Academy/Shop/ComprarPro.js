import React from "react";
import { PlansWrapper, PlanCard, Price, BtnBuy } from "./UpgradeStyles";

export default function ComprarPro() {
  const buyPlan = (plan) => {
    // MÁS ADELANTE → Stripe o Cloudflare Billing
    alert(`Plan seleccionado: ${plan}`);
  };

  return (
    <PlansWrapper>
      <h1>Mejora a PRO</h1>
      <p>Elige un plan y accede a todo el contenido oficial.</p>

      <div className="grid">
        <PlanCard>
          <h3>Mensual</h3>
          <Price>7,99€</Price>
          <ul>
            <li>Acceso total</li>
            <li>Actualizaciones</li>
            <li>Simuladores PRO</li>
          </ul>
          <BtnBuy onClick={() => buyPlan("mensual")}>Obtener PRO</BtnBuy>
        </PlanCard>

        <PlanCard>
          <h3>3 Meses</h3>
          <Price>19,99€</Price>
          <BtnBuy onClick={() => buyPlan("trimestral")}>Obtener PRO</BtnBuy>
        </PlanCard>

        <PlanCard>
          <h3>6 Meses</h3>
          <Price>34,99€</Price>
          <BtnBuy onClick={() => buyPlan("semestral")}>Obtener PRO</BtnBuy>
        </PlanCard>

        <PlanCard className="best">
          <h3>Anual</h3>
          <Price>59,99€</Price>
          <BtnBuy onClick={() => buyPlan("anual")}>Obtener PRO</BtnBuy>
        </PlanCard>
      </div>
    </PlansWrapper>
  );
}
