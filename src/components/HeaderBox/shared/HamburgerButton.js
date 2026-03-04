//HamburgerButton.js// src/components/HeaderBox/shared/HamburgerButton.js

import React from "react";
import styled from "styled-components";

/**
 * Botón hamburguesa para abrir el menú móvil
 * -------------------------------------------------------
 * Minimal, sólido, integrado al diseño que ya tienes.
 * No rompe nada y funciona con HeaderShell.
 */

export default function HamburgerButton({ onClick }) {
  return (
    <ButtonWrapper onClick={onClick} aria-label="Abrir menú">
      <Bar />
      <Bar />
      <Bar />
    </ButtonWrapper>
  );
}

/* ======================================================
   🔧 ESTILOS
====================================================== */

const ButtonWrapper = styled.button`
  background: transparent;
  border: none;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;   /* Oculto en desktop */
  }
`;

const Bar = styled.span`
  width: 22px;
  height: 3px;
  background: ${(props) => props.theme.colors.text};
  border-radius: 2px;
  display: block;
`;
