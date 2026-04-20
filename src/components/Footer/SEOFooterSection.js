import React from "react";
import {
  Wrapper,
  Grid,
  Column,
  Title,
  StyledLink,
  SocialLink,
  SocialIcon,
  SocialLabel,
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
          <StyledLink to="/requisitos-taxista-palma">
            Requisitos taxista
          </StyledLink>
          <StyledLink to="/examen-taxista-mallorca">
            Examen taxista Mallorca
          </StyledLink>
          <StyledLink to="/formato-examen-taxista-palma">
            Formato examen taxista
          </StyledLink>
          <StyledLink to="/como-aprobar-examen-taxista-palma">
            Cómo aprobar examen taxi
          </StyledLink>
          <StyledLink to="/test-taxista-palma">
            Test taxista Palma
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

        <Column>
          <Title>Comunidad</Title>

          <SocialLink
            href="https://www.youtube.com/@TaxiRadar24"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube TaxiRadar24"
          >
            <SocialIcon
              src="/assets/rss_icon/httpswww.youtube.com@TaxiRadar24.webp"
              alt="YouTube"
            />
            <SocialLabel>YouTube</SocialLabel>
          </SocialLink>

          <SocialLink
            href="https://www.instagram.com/taxiradara24/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram TaxiRadar24"
          >
            <SocialIcon
              src="/assets/rss_icon/httpswww.instagram.comtaxiradara24.webp"
              alt="Instagram"
            />
            <SocialLabel>Instagram</SocialLabel>
          </SocialLink>

          <SocialLink
            href="https://www.facebook.com/taxiradar24"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook TaxiRadar24"
          >
            <SocialIcon
              src="/assets/rss_icon/httpswww.facebook.comtaxiradar24.webp"
              alt="Facebook"
            />
            <SocialLabel>Facebook</SocialLabel>
          </SocialLink>
        </Column>
      </Grid>
    </Wrapper>
  );
}