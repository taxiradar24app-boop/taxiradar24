// ✅ Botón integrado y elegante para volver al Home de la Academia
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BotonAcademy = () => {
  const navigate = useNavigate();

  return (
    <BackWrapper>
      <BackButton onClick={() => navigate("/academy")} title="Volver a la Academia">
        <Arrow>←</Arrow>
        <span>Acadenia</span>
      </BackButton>
    </BackWrapper>
  );
};

export default BotonAcademy;

// 💅 Estilos refinados
const BackWrapper = styled.div`
  position: absolute;
  top: 4rem;
  left: 1.2rem;
  z-index: 1200;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 4rem;
    left: 1rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: ${({ theme }) => theme.colors.text || "#fefefe"};
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.4rem 0.9rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    transform: translateY(-1px);
  }

  span {
    font-size: 0.9rem;
    letter-spacing: 0.2px;
  }
`;

const Arrow = styled.span`
  font-size: 1.1rem;
  line-height: 1;
  font-weight: 600;
`;
