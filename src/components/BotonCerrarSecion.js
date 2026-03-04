// src/components/BotonCerrarSecion.js
import React from "react";
import styled from "styled-components";
import { getFirebaseAuth } from "./../utils/lazyFirebase"; // ✅ lazy auth

const ButtonWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover { opacity: 1; }
`;

export default function BotonCerrarSecion() {
  const handleLogout = async () => {
    try {
      const { getAuth, signOut } = await getFirebaseAuth();
      await signOut(getAuth());
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <ButtonWrapper>
      <LogoutButton onClick={handleLogout}>🚪 Cerrar sesión</LogoutButton>
    </ButtonWrapper>
  );
}