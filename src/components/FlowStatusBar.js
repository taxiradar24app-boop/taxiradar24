// src/components/FlowStatusBar.js
import React from "react";
import styled from "styled-components";
import { useAuth } from "./../context/AuthContext"; // ✅ ruta corregida

const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  background: #1e1f26;
  color: #f1f1f1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  opacity: ${(props) => (props.done ? 0.6 : 1)};
  color: ${(props) =>
    props.done ? "#8f9ba8" : props.active ? "#f4d35e" : "#ccc"};
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) =>
    props.done ? "#00d897" : props.active ? "#f4d35e" : "#555"};
`;

export default function FlowStatusBar() {
  const { user, needsPhone, checking } = useAuth();

  if (checking) return null;

  const steps = [
    { id: 1, label: "Cuenta elegida" },
    { id: 2, label: "Teléfono pendiente" },
    { id: 3, label: "Verificado" },
  ];

  let activeStep = 1;
  if (user && needsPhone) activeStep = 2;
  if (user && !needsPhone) activeStep = 3;

  return (
    <Bar>
      {steps.map((step, i) => (
        <Step
          key={step.id}
          active={activeStep === step.id}
          done={activeStep > step.id}
        >
          <Dot active={activeStep === step.id} done={activeStep > step.id} />
          {step.label}
          {i < steps.length - 1 && <span>→</span>}
        </Step>
      ))}
    </Bar>
  );
}
