import styled, { css } from "styled-components";

const dangerStyles = css`
  background: #f45b69;
  color: #ffffff;

  &:hover:not(:disabled) {
    background: #ec4d5c;
    box-shadow: 0 16px 30px rgba(244, 91, 105, 0.22);
  }
`;

const ghostStyles = css`
  background: transparent;
  color: #d7e3f4;
  border: 1px solid rgba(148, 163, 184, 0.28);
  box-shadow: none;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.04);
    color: #ffffff;
  }
`;

const primaryStyles = css`
  background: linear-gradient(135deg, #10a37f 0%, #6acb45 100%);
  color: #081325;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 18px 34px rgba(74, 222, 128, 0.24);
    filter: brightness(1.03);
  }
`;

const AuthButton = styled.button`
  width: 100%;
  min-height: 56px;
  margin-top: 12px;
  padding: 14px 18px;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    transform 0.14s ease,
    opacity 0.2s ease,
    background 0.22s ease,
    color 0.22s ease,
    box-shadow 0.22s ease,
    filter 0.22s ease;

  ${({ $variant }) => {
    if ($variant === "danger") return dangerStyles;
    if ($variant === "ghost") return ghostStyles;
    return primaryStyles;
  }}

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.68;
    cursor: not-allowed;
    transform: none;
    filter: grayscale(0.1);
  }
`;

export default AuthButton;