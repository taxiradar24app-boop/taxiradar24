import React from "react";
import {
  Wrapper,
  Grid,
  Column,
  Title,
  StyledLink,
} from "./SEOFooterSectionStyle";

export default function SEOFooterSection() {
  return (
    <Wrapper aria-label="Navegación SEO secundaria">
      <Grid>
        <Column>
          <Title>Academia</Title>
          <StyledLink to="/guia-taxista-mallorca">
            Guía taxista Mallorca
          </StyledLink>
          <StyledLink to="/examen-taxista-mallorca">
            Examen taxista Mallorca
          </StyledLink>
          <StyledLink to="/test-taxista-palma">
            Test taxista Palma
          </StyledLink>
          <StyledLink to="/requisitos-taxista-palma">
            Requisitos taxista
          </StyledLink>
        </Column>

        <Column>
          <Title>Sector Taxi</Title>
          <StyledLink to="/cuanto-gana-un-taxista-en-mallorca">
            Cuánto gana un taxista
          </StyledLink>
          <StyledLink to="/cuanto-cuesta-licencia-taxi-palma">
            Cuanto cuesta una licencia de taxi
          </StyledLink>
        </Column>

        <Column>
          <Title>Herramientas</Title>
          <StyledLink to="/herramientas">
            Herramientas taxistas
          </StyledLink>
        </Column>

        <Column>
          <Title>Empresa</Title>
          <StyledLink to="/privacidad">Privacidad</StyledLink>
          <StyledLink to="/cookies">Cookies</StyledLink>
          <StyledLink to="/terminos">Términos</StyledLink>
          <StyledLink to="/aviso-legal">Aviso legal</StyledLink>
        </Column>
      </Grid>
    </Wrapper>
  );
}