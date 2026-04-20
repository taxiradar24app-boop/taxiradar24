import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Page,
  Wrapper,
  Hero,
  Eyebrow,
  Title,
  Lead,
  Content,
  Section,
  SectionTitle,
  Paragraph,
  GridThree,
  RelatedCard,
  RelatedTitle,
  RelatedText,
  CTABox,
  CTATitle,
  CTAParagraph,
  CTAButtons,
  PrimaryLink,
  SecondaryLink,
} from "./LandigPagesStyle";

export default function GuiaTaxistaMallorca() {
  const canonicalUrl = "https://taxiradar24.com/guia-taxista-mallorca";
  const title = "Guía taxista Mallorca | Academia, examen y sector | TaxiRadar24";
  const description =
    "Explora la guía completa para aspirantes a taxista en Mallorca: ingresos, requisitos, examen, test y preparación profesional.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Page>
        <Wrapper>
          <Hero>
            <Eyebrow>TaxiRadar24</Eyebrow>
            <Title>Guía completa para ser taxista en Mallorca</Title>
            <Lead>
              Aquí tienes el centro de contenido para aspirantes al carnet de taxista en
              Palma: requisitos, examen, test, rentabilidad y visión real del sector.
            </Lead>
          </Hero>

          <Content>
            <Section>
              <SectionTitle>Empieza por aquí</SectionTitle>
              <Paragraph>
                Esta guía reúne las páginas clave para entender el camino de acceso al
                sector y prepararte con una base mucho más seria.
              </Paragraph>

<GridThree>

  <RelatedCard to="/requisitos-taxista-palma">
    <RelatedTitle>Requisitos para ser taxista</RelatedTitle>
    <RelatedText>
      Entiende lo que necesitas antes de empezar.
    </RelatedText>
  </RelatedCard>

  <RelatedCard to="/examen-taxista-mallorca">
    <RelatedTitle>Examen taxista Mallorca</RelatedTitle>
    <RelatedText>
      Visión general del examen y cómo funciona.
    </RelatedText>
  </RelatedCard>

  <RelatedCard to="/formato-examen-taxista-palma">
    <RelatedTitle>Formato del examen</RelatedTitle>
    <RelatedText>
      Estructura real del examen y cómo se corrige.
    </RelatedText>
  </RelatedCard>

  <RelatedCard to="/como-aprobar-examen-taxista-palma">
    <RelatedTitle>Cómo aprobar el examen</RelatedTitle>
    <RelatedText>
      Estrategia real para superar la prueba.
    </RelatedText>
  </RelatedCard>

  <RelatedCard to="/test-taxista-palma">
    <RelatedTitle>Test taxista Palma</RelatedTitle>
    <RelatedText>
      Entrena como en el examen y mejora tu nivel.
    </RelatedText>
  </RelatedCard>

  <RelatedCard to="/cuanto-gana-un-taxista-en-mallorca">
    <RelatedTitle>Cuánto gana un taxista</RelatedTitle>
    <RelatedText>
      Descubre el atractivo profesional del sector.
    </RelatedText>
  </RelatedCard>

  <RelatedCard to="/cuanto-cuesta-licencia-taxi-palma">
    <RelatedTitle>Cuánto cuesta una licencia</RelatedTitle>
    <RelatedText>
      Analiza el contexto económico antes de dar el paso.
    </RelatedText>
  </RelatedCard>

</GridThree>
            </Section>

            <CTABox>
              <CTATitle>Da el paso con TaxiRadar24</CTATitle>
              <CTAParagraph>
                Si quieres preparar el carnet de taxista en Palma con una línea profesional,
                empieza por la academia y combina estudio con práctica real.
              </CTAParagraph>
              <CTAButtons>
                <PrimaryLink to="/academia-taxista-mallorca">Ir a la academia</PrimaryLink>
                <SecondaryLink to="/test-taxista-palma">Ver test</SecondaryLink>
              </CTAButtons>
            </CTABox>
          </Content>
        </Wrapper>
      </Page>
    </>
  );
}