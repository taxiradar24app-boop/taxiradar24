import React from "react";
import styled from "styled-components";

const Banner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #0b1f4a;
  color: #fff;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.4);
  z-index: 2000;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }
`;

const BannerText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Button = styled.button`
  background: ${({ primary }) => (primary ? "#f4d35e" : "transparent")};
  color: ${({ primary }) => (primary ? "#0b1f4a" : "#f4d35e")};
  border: 2px solid #f4d35e;
  font-weight: 700;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ primary }) => (primary ? "#ffe27b" : "rgba(255,255,255,0.1)")};
  }
`;

export default function InstallBanner({ onAccept, onReject }) {
  return (
    <Banner>
      <BannerText>¿Quieres instalar <strong>TaxiRadar24</strong> en tu escritorio?</BannerText>
      <ButtonGroup>
        <Button primary onClick={onAccept}>Sí, instalar</Button>
        <Button onClick={onReject}>No, gracias</Button>
      </ButtonGroup>
    </Banner>
  );
}
