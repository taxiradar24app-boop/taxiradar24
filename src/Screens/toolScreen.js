import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './../services/firebaseConfig';
import { useThemeMode } from './../Styles/ThemeContext';
import {
  Container, Title, ToolCard, ToolText, ToggleThemeButton, ToggleText
} from './../Styles/toolStyle';

export default function ToolScreen() {
  const { toggleTheme, mode } = useThemeMode();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Container>
      <Title>Pantalla de Herramientas</Title>

      <ToolCard onClick={() => navigate('/radar')}>
        <ToolText>✈️ Radar de vuelos</ToolText>
      </ToolCard>

      <ToggleThemeButton onClick={toggleTheme}>
        <ToggleText>🌓 Cambiar a modo {mode === 'light' ? 'noche' : 'día'}</ToggleText>
      </ToggleThemeButton>

      <ToggleThemeButton onClick={handleLogout}>
        <ToggleText>🚪 Cerrar sesión</ToggleText>
      </ToggleThemeButton>
    </Container>
  );
}
