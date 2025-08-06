import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  text-align: center;
`;

export const SubTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
  text-align: center;
`;

export const FlightCard = styled.div`
  background-color: ${({ theme }) => theme.colors.card || '#1e1e1e'};
  border-radius: 12px;
  padding: 12px;
  margin: 10px 0;
  width: 100%;
  max-width: 600px;
`;

export const FlightText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  margin: 4px 0;
`;

export const RefreshButton = styled.button`
  margin-top: 24px;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const RefreshText = styled.span``;

export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoadingSpinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
  margin-top: 40px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
