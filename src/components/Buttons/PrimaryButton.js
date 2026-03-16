import styled from "styled-components";

const PrimaryButton = styled.button`
  padding: 0.90rem 1.9rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;

  font-weight: 700;
  font-size: 1rem;

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary || "#10a37f"},
    #84cc16
  );

  color: #022c22;
  box-shadow:
    0 0 14px rgba(34, 197, 94, 0.22),
    0 8px 20px rgba(34, 197, 94, 0.30);

  transition: 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
    box-shadow:
      0 0 20px rgba(34, 197, 94, 0.32),
      0 12px 26px rgba(34, 197, 94, 0.35);
  }

  &:active {
    transform: scale(0.98);
  }

  /* SOLO VERSION WEB */
  @media (min-width: 641px) {
    min-width: 280px;
  }
`;

export default PrimaryButton;