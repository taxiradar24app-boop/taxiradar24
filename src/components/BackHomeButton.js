import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;


  cursor: pointer;

  padding: 8px 14px;
  border-radius: 999px;

  font-size: 0.9rem;
  font-weight: 600;

  background: ${({ theme }) =>
    theme.colors.academy.surfaceSoft || "#132447"};

  border: 1px solid
    ${({ theme }) =>
      theme.colors.academy.surfaceLight || "rgba(255,255,255,0.08)"};

  color: ${({ theme }) =>
    theme.colors.academy.textMain || "#e6edf7"};

  transition: all 0.2s ease;

  &:hover {
    transform: translateX(-3px);
    background: ${({ theme }) =>
      theme.colors.academy.surfaceLight || "#1a2f55"};
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 7px 12px;
  }
`;

const Arrow = styled.span`
  font-size: 1rem;
  line-height: 1;
`;

export default function BackHomeButton() {
  const navigate = useNavigate();

  return (
    <BackWrapper onClick={() => navigate("/")}>
      <Arrow>←</Arrow>
      Volver al inicio
    </BackWrapper>
  );
}