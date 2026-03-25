import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.4rem;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;
  min-height: 48px;

  border-radius: ${({ theme }) => theme.borderRadius?.lg || "20px"};

  border: 1px solid
    ${({ theme }) =>
      theme.tools?.colors?.brandSoft || "rgba(0,168,243,0.16)"};

  background: rgba(0, 168, 243, 0.12);

  color: ${({ theme }) =>
    theme.tools?.colors?.textStrong || "#ffffff"};  // 🔥 CLAVE

  cursor: pointer;

  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};

  transition: all 0.18s ease;

  &:hover {
    background: ${({ theme }) =>
      theme.tools?.colors?.brandSoft || "rgba(0,168,243,0.16)"};

    border-color: ${({ theme }) =>
      theme.tools?.colors?.brand || "#00A8F3"};
  }

  &:active {
    transform: scale(0.97);
  }
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  border-radius: 50%;
  background: rgba(16, 163, 127, 0.15);

  font-size: 14px;
`;

export default function BackButtonTools({ to = "/" }) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Button onClick={() => navigate(to)}>
        <Icon>←</Icon>
        Volver
      </Button>
    </Wrapper>
  );
}