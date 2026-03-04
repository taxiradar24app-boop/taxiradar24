import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackWrapper = styled.div`
  display: flex;
  // justify-content: flex-end; /* 🚀 coloca el contenido a la derecha */
  align-items: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
  opacity: 0.92;
  transition: opacity 0.25s ease, transform 0.2s ease;
  width: 100%; /* 🔥 Para que pueda alinearse a la derecha */

  &:hover {
    opacity: 1;
    transform: translateX(-2px);
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    filter: drop-shadow(0px 0px 6px rgba(0, 255, 0, 0.15));
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;

    img {
      width: 40px;
      height: 40px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 0.8rem;

    img {
      width: 36px;
      height: 36px;
    }
  }
`;

export default function BackHomeButton() {
  const navigate = useNavigate();

  return (
    <BackWrapper onClick={() => navigate("/")}>
      <img src="/assets/logo192.png" alt="TaxiRadar24 logo" />
    </BackWrapper>
  );
}
