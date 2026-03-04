import styled from "styled-components";

export const PrimaryButton = styled.button`
  padding: 0.85rem 1.8rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;

  font-weight: 700;
  font-size: 0.96rem;

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary || "#10a37f"},
    #84cc16
  );

  color: #022c22;

  box-shadow:
    0 0 14px rgba(34, 197, 94, 0.22),
    0 8px 20px rgba(34, 197, 94, 0.30);

  transition: transform 0.16s ease, box-shadow 0.16s ease, filter 0.16s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
    box-shadow:
      0 0 18px rgba(34, 197, 94, 0.32),
      0 12px 26px rgba(34, 197, 94, 0.35);
  }

  &:active {
    transform: translateY(0px) scale(0.98);
    box-shadow:
      0 0 10px rgba(34, 197, 94, 0.18),
      0 6px 16px rgba(34, 197, 94, 0.24);
  }
`;
