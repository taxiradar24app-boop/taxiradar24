// src/components/CookieConsent.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Banner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.95);
  color: #fff;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 9999;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.4);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const Buttons = styled.div`
  margin-top: 0.8rem;

  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s ease-in-out;
  }

  .accept {
    background-color: #f4d35e;
    color: #000;
  }

  .reject {
    background-color: #444;
    color: #fff;
  }

  .accept:hover {
    background-color: #fff176;
  }

  .reject:hover {
    background-color: #666;
  }
`;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (value) => {
    localStorage.setItem("cookieConsent", value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Banner>
      <div>
        <p>
          Usamos cookies para mejorar tu experiencia y analizar el tráfico. 
          Puedes aceptar o rechazar su uso en cualquier momento. 
          Consulta nuestra <a href="/cookies" style={{ color: "#f4d35e" }}>Política de Cookies</a>.
        </p>
        <Buttons>
          <button className="accept" onClick={() => handleConsent("accepted")}>
            Aceptar
          </button>
          <button className="reject" onClick={() => handleConsent("rejected")}>
            Rechazar
          </button>
        </Buttons>
      </div>
    </Banner>
  );
}
