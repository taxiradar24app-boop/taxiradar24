import React from "react";
import UserRegistration from "./../hooks/UserRegistration";
import BotonGoogle from "./../components/BotonGoogle";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0A1528";
  color: #ececf1;
`;

export default function RegisterScreen() {
  return (
    <Container>
      <h1>Crear cuenta</h1>
      <BotonGoogle />
      <UserRegistration mode="register" />
    </Container>
  );
}
