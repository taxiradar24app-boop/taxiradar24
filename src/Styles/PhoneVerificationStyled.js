// src/Styles/PhoneVerificationStyle.js
import styled from "styled-components";
import { darkTheme } from "./themes"; // usamos el tema dark

// 📱 Contenedor general (pantalla completa)
export const PhoneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${darkTheme.colors.background};
`;

// 🧩 Tarjeta principal (formulario)
export const PhoneCard = styled.div`
  background: ${darkTheme.colors.card};
  color: ${darkTheme.colors.text};
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.6);
`;

// ✏️ Campo de entrada de teléfono o código
export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border-radius: 8px;
  border: 1px solid #00d897;
  text-align: center;
  background: #2b2c34;
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #f4d35e;
    box-shadow: 0 0 6px rgba(244, 211, 94, 0.4);
  }
`;

// ✅ Botón principal
export const Button = styled.button`
  background: #1fb67f;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  margin-top: 1rem;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover {
    background: #00d897;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #3a3b3c;
    cursor: not-allowed;
  }
`;

// 🔗 Enlace "Volver y reiniciar"
// 🔗 Enlace secundario "Volver y reiniciar"
export const BackLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  color: #4da3ff; /* azul tipo enlace */
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: #82c0ff;
  }
`;
