import styled from "styled-components";

const LoginId = styled.button`
  padding: 0.9rem 1.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;

  font-weight: 700;
  font-size: 1rem;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.04)
  );

  box-shadow:
    0 0 14px rgba(255, 255, 255, 0.08),
    0 8px 20px rgba(0, 0, 0, 0.2);

  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.06);
    box-shadow:
      0 0 18px rgba(255, 255, 255, 0.14),
      0 12px 26px rgba(0, 0, 0, 0.28);
    border-color: rgba(255, 255, 255, 0.22);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 641px) {
    min-width: 280px;
  }
`;

export const LoginIdText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes?.sm || "0.95rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  line-height: 1.35;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "0"};
  color: ${({ theme }) => theme.colors?.grey || "#9ca3af"} !important;
  max-width: 9rem;
  text-align: center;

  @media (max-width: 640px) {
    max-width: 100%;
  }
`;

export { LoginIdText };
export default LoginId;