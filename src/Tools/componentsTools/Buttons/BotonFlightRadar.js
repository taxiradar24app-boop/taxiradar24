// src/components/BotonFlightRadar.js
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAuth } from "@/services/firebaseConfig";

/* 🎨 Estilo del botón principal */
const ToolCard = styled.button`
  background-color: #343541;
  color: #fff;
  font-weight: 700;
  border: 2px solid #0e8b6e;
  border-radius: 50px;
  padding: 14px 40px;
  font-size: 1rem;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 280px;
  height: 52px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: #0e8b6e;
    transform: translateY(-2px);
    box-shadow: 0 0 10px rgba(244, 211, 94, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    width: 50%;
    min-width: unset;
    padding: 12px 24px;
    height: 48px;
    font-size: 0.95rem;
  }
`;

const ToolText = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

export default function BotonFlightRadar() {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const auth = await getAuth(); // ✅ lazy correcto
      const user = auth.currentUser;

      if (user) {
        navigate("/aerodataradar");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error obteniendo auth:", error);
      navigate("/login");
    }
  };

  return (
    <ToolCard onClick={handleClick}>
      <ToolText>Radar Vuelos 📡</ToolText>
    </ToolCard>
  );
}