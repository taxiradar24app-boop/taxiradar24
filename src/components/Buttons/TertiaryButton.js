import styled from "styled-components";

const TertiaryButton = styled.button`
  background: transparent;
  border: none;

  color: ${({ theme }) => theme.colors.textPrimary || "#e5e7eb"};

  cursor: pointer;

  font-size: 0.95rem;
  font-weight: 500;

  padding: 0.25rem 0;
  margin: 0;

  position: relative;

  opacity: 0.85;

  transition: opacity 0.16s ease, color 0.16s ease;

  &:hover {
    opacity: 1;
    color: #ffffff;
  }

  /* underline elegante animado */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;

    width: 0%;
    height: 1px;

    background: currentColor;

    transition: width 0.18s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &:active {
    opacity: 0.75;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export default TertiaryButton;
