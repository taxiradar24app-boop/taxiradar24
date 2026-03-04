// src/components/Logo/Logo.js

import React from "react";
import styled from "styled-components";
import logo from "./../../../assets/logo192.png"; // ✅ Ruta relativa correcta

export function Logo({ height = 40, onClick }) {
  return (
    <LogoWrapper onClick={onClick} style={{ height }}>
      <img src={logo} alt="TaxiRadar24 Logo" />
    </LogoWrapper>
  );
}

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    height: 100%;
    width: auto;
    display: block;
  }
`;
