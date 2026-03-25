import styled from "styled-components";

const BaseButton = styled.button`
  width: 100%;
  min-height: 52px;
  padding: 14px 18px;
  border-radius: ${({ theme }) => theme.borderRadius?.lg || "20px"};
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-family: ${({ theme }) =>
    theme.typography?.family ||
    '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'};
  font-size: ${({ theme }) => theme.fontSizes?.md || "1rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.semibold || 600};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings?.normal || "-0.01em"};

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;

  &:active {
    transform: scale(0.98);
  }
`;

export const ToolsPrimaryButton = styled(BaseButton)`
  width: 100%;
  min-height: 56px;
  padding: 16px 18px;
  max-width: 75%;

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.tools?.colors?.bgPanel || "#00A8F3"},
    #6793aa
  );

  color: ${({ theme }) => theme.landed || "#00A8F3"};

  box-shadow:
    0 8px 18px rgba(0, 120, 180, 0.22),
    0 3px 8px rgba(0, 0, 0, 0.25);

  &:hover {
    filter: brightness(1.04);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    filter: brightness(0.98);
  }

  @media (max-width: 640px) {
    min-height: 58px;
    font-size: 1.05rem;
  }
`;

export const ToolsSecondaryButton = styled(BaseButton)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border || "rgba(255,255,255,0.08)"};
  color: ${({ theme }) => theme.text || "#e8edf3"};

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    border-color: ${({ theme }) =>
      theme.tools?.colors?.brandSoft || "rgba(0,168,243,0.16)"};
  }
`;

export const ToolsGhostButton = styled(BaseButton)`
  background: transparent;
  color: ${({ theme }) => theme.tools?.colors?.brand || "#00A8F3"};
  border: 1px solid
    ${({ theme }) => theme.tools?.colors?.brandSoft || "rgba(0,168,243,0.16)"};

  &:hover {
    background: ${({ theme }) =>
      theme.tools?.colors?.brandSoft || "rgba(0,168,243,0.16)"};
  }
`;

export const ToolsSuccessButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors?.green || "#10a37f"};
  color: #022c22;

  box-shadow:
    0 10px 24px rgba(16, 163, 127, 0.25),
    0 4px 12px rgba(0, 0, 0, 0.25);

  &:hover {
    filter: brightness(1.05);
  }
`;

export const ToolsWarningButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors?.yellow || "#FFC83D"};
  color: #1a1a1a;

  &:hover {
    filter: brightness(1.05);
  }
`;