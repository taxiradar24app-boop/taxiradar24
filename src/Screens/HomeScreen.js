import React from 'react';
import {
  Container,
  LogoImage,
  Title,
  ButtonsContainer,
  MenuBox,
  Footer
} from './../Styles/homeStyles';
import { useThemeMode } from './../Styles/ThemeContext';
import logo from './../../assets/Moneda_digital_TaxiTip1.png';

export default function HomeScreen() {
  console.log('✅ HomeScreen renderizado');

  const { toggleTheme, mode } = useThemeMode();

  return (
    <Container>
      <LogoImage src={logo} alt="Logo TaxiTip" />
      <Title>Bienvenido a TAXITIP.ORG</Title>

      <ButtonsContainer>
        {/* <MenuBox onClick={() => navigate('/tools')}>
          🛠 Herramientas
        </MenuBox> */}

        <MenuBox onClick={toggleTheme}>
          🌓 Tema: {mode === 'light' ? 'Día' : 'Noche'}
        </MenuBox>
      </ButtonsContainer>

      <Footer>
        Registro | Contacto | Aviso legal
      </Footer>
    </Container>
  );
}
