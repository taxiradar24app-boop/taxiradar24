// src/Styles/homeStyles.js
import styled from 'styled-components';

// Contenedor principal centrado
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
`;

// Logo de la app
export const LogoImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Título principal animado sustituido por h1
export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// Contenedor de botones (flexbox responsive)
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 400px;
  margin-top: ${({ theme }) => theme.spacing.lg};
  gap: 20px;
  padding: 0 16px;
  box-sizing: border-box;
`;

// Botones principales del menú
export const MenuBox = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 12px;
  width: 100%;
  max-width: 300px;
  border: none;
  cursor: pointer;
  color: #333;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.md};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

// Footer para textos finales
export const Footer = styled.div`
  margin-top: auto;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: #999;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
