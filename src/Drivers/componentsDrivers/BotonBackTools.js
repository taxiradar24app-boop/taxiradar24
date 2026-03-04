import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/**
 * Botón de navegación reutilizable.
 * Props:
 * - to: ruta destino (por defecto "/drivers")
 * - label: texto o emoji opcional (por defecto "⬅️")
 * - title: tooltip (por defecto "Volver")
 */
const BackBtn = styled.button`
  position: fixed;
  top: 16px;
  left: 16px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary || "#f4d35e"};
  font-size: 1.8rem;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary || "#f4d35e"};
    outline-offset: 3px;
  }
`;

export default function BotonBackTools({
  to = "/drivers",
  label = "⬅️",
  title = "Volver",
}) {
  const navigate = useNavigate();

  return (
    <BackBtn onClick={() => navigate(to)} aria-label={title} title={title}>
      {label}
    </BackBtn>
  );
}
