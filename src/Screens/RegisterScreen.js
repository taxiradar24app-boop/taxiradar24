import React from "react";
import UserRegistration from "./../hooks/UserRegistration";
import BotonGoogle from "./../components/BotonGoogle";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 36px 16px;
  background: #0a1528;
  color: #ececf1;
`;

const Card = styled.div`
  width: min(560px, 94vw);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 26px 18px 18px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.35);
`;

const Title = styled.h1`
  margin: 0 0 6px 0;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.2px;
  color: #f4d35e;
`;

const Sub = styled.p`
  margin: 0 0 16px 0;
  opacity: 0.8;
  line-height: 1.5;
`;

const Divider = styled.div`
  margin: 18px 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
`;

export default function RegisterScreen() {
  return (
    <Container>
      <Card>
        <Title>Crear cuenta</Title>
        <Sub>Accede con tu cuenta o utiliza Google.</Sub>

        <BotonGoogle />

        <Divider />

        <UserRegistration mode="register" />
      </Card>
    </Container>
  );
}