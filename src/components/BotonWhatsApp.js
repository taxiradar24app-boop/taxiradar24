import React from "react";
import styled from "styled-components";

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #10a37f; /* verde oficial WhatsApp */
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #14bf94ff;
  }
`;

export default function BotonWhatsApp() {
  const telefono = process.env.VITE_WHATSAPP_PHONE; // 👈 con process.env en Webpack
  const mensaje = "¡Hola TaxiTip! Quiero comentarte mi experiencia.";

  const enlace = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  return (
    <WhatsAppButton href={enlace} target="_blank" rel="noopener noreferrer">
      💬 Coméntame tu experiencia
    </WhatsAppButton>
  );
}
