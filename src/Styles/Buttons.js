import styled from 'styled-components';

export const GoogleButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #000;
  }
`;