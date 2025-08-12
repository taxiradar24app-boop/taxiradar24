import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ToolCard = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  width: 100%;
  max-width: 320px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: background-color .25s ease, transform .06s ease;
  &:hover { background-color: ${({ theme }) => theme.colors.secondary}; }
  &:active { transform: scale(.98); }
`;

export const ToolText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const ToggleThemeButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  &:hover { background-color: ${({ theme }) => theme.colors.primary}; color: #000; }
`;

export const ToggleText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
