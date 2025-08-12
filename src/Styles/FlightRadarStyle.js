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
  margin-bottom: 8px;
  text-align: center;
`;

export const SubTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 14px;
  text-align: center;
  opacity: 0.8;
`;

export const ListContainer = styled.div`
  width: 100%;
  max-width: 760px;
  display: grid;
  gap: 12px;
`;

export const FlightCard = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 14px;
  box-shadow: ${({ theme }) => theme.shadows.light};
`;

export const FlightText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  margin: 4px 0;
`;

export const Bar = styled.div`
  width: 100%;
  max-width: 760px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 16px;
`;

export const Muted = styled.span`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-size: 12px;
`;

export const LoadingSpinner = styled.div`
  border: 6px solid rgba(255,255,255,.2);
  border-top: 6px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 46px;
  height: 46px;
  animation: spin 1s linear infinite;
  margin-top: 26px;
  @keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
`;
