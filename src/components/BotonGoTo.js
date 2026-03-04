// src/components/BotonGoTo.js
import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * 🔁 Botón universal de navegación adaptable.
 * Si el router actual es `navigator.js` (ToolScreen base),
 * y se pide ir a "/", redirige a "/tools" o al AuthNavigator según contexto.
 */
const GoBtn = styled.button`
  position: fixed;
  top: ${({ top }) => top || "16px"};
  left: ${({ left }) => left || "16px"};
  background: ${({ background }) => background || "none"};
  border: none;
  color: ${({ color, theme }) => color || theme.colors.primary || "#f4d35e"};
  font-size: ${({ size }) => size || "1.8rem"};
  cursor: pointer;
  opacity: 0.85;
  border-radius: 12px;
  padding: ${({ padding }) => padding || "4px 6px"};
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

export default function BotonGoTo({
  to,
  label = "⬅️",
  title = "Ir",
  color,
  background,
  top,
  left,
  size,
  padding,
  onBeforeNavigate,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (onBeforeNavigate) onBeforeNavigate();

    // 🧭 Si estamos en ToolScreen (navigator.js), redirigir a AuthNavigator
    if (location.pathname.startsWith("/") && !location.pathname.includes("auth")) {
      if (to === "/" || to === "/home") {
        navigate("/tools", { replace: true }); // fallback dentro del Navigator.js
        return;
      }
    }

    // Si se especifica destino, navegar normalmente
    if (to) navigate(to, { replace: true });
    else navigate(-1);
  };

  return (
    <GoBtn
      onClick={handleClick}
      aria-label={title}
      title={title}
      color={color}
      background={background}
      top={top}
      left={left}
      size={size}
      padding={padding}
    >
      {label}
    </GoBtn>
  );
}
