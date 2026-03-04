// =====================================
// ⭐ BotonSolLuna.js (CORREGIDO)
// =====================================

import React from "react";
import styled from "styled-components";
import { useThemeMode } from "@/context/ThemeContext";  // <-- CORRECTO

const ToggleWrapper = styled.button`
  border: none;
  background: ${({ theme }) => theme.pro.topbar};
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.pro.text};
  font-size: 1.4rem;

  transition: 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.pro.cardAlt};
  }
`;

export default function BotonSolLuna() {
  const { mode, toggleTheme } = useThemeMode();  // <-- AQUÍ ESTABA EL ERROR

  return (
    <ToggleWrapper onClick={toggleTheme}>
      {mode === "light" ? "🌙" : "☀️"}
    </ToggleWrapper>
  );
}
