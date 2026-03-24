import React from "react";
import styled from "styled-components";

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 10px 14px;
  border: 1px solid rgba(163, 230, 53, 0.16);
  border-radius: 999px;
  background: rgba(10, 20, 44, 0.72);
  color: #e8eef9;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);

  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.9375rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(163, 230, 53, 0.34);
    background: rgba(12, 24, 52, 0.9);
    box-shadow:
      0 14px 28px rgba(0, 0, 0, 0.28),
      0 0 0 1px rgba(163, 230, 53, 0.06);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    min-height: 40px;
    padding: 9px 12px;
    font-size: 0.88rem;
  }
`;

const BackIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: rgba(163, 230, 53, 0.12);
  color: #c9f36b;
  font-size: 0.95rem;
  line-height: 1;
  flex-shrink: 0;
`;

const BackText = styled.span`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`;

export default function ButtonBackSlot({
  onClick,
  label = "Herramientas",
  ariaLabel = "Volver",
}) {
  return (
    <BackButton type="button" onClick={onClick} aria-label={ariaLabel}>
      <BackIcon>←</BackIcon>
      <BackText>{label}</BackText>
    </BackButton>
  );
}