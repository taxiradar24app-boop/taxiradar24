import styled from "styled-components";

export const ToolsPrimaryButton = styled.button`
  padding: 0.90rem 1.9rem;
  border-radius: 999px;
  cursor: pointer;

  background: transparent;

  border: 2px solid rgba(30, 64, 175, 0.7);
  color: #00A8F3;

  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;

  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    background: rgba(22, 163, 74, 0.14);
    border-color: rgba(30, 64, 175, 0.7);
    color: #ffffff;

    transform: translateY(-1px);

    box-shadow: 0 6px 14px rgba(34, 197, 94, 0.18);
  }

  &:active {
    transform: scale(0.97);
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px rgba(134, 239, 172, 0.9),
      0 6px 18px rgba(34, 197, 94, 0.25);
  }
`;

export default ToolsPrimaryButton;