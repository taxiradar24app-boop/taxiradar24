import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Page,
  Wrapper,
  Breadcrumbs,
  CrumbLink,
  CrumbCurrent,
  Separator,
  Hero,
  Eyebrow,
  Title,
  Lead,
  SnippetBox,
  SnippetLabel,
  SnippetText,
  Content,
  Section,
  SectionTitle,
  SubTitle,
  Paragraph,
  BulletList,
  NumberList,
  CTABox,
  CTATitle,
  CTAParagraph,
  CTAButtons,
  PrimaryLink,
  SecondaryLink,
  FaqWrap,
  FaqItem,
  FaqQuestion,
  FaqAnswer,
  RelatedSection,
  RelatedGrid,
  RelatedCard,
  RelatedTitle,
  RelatedText,
} from "./LandigPagesStyle";

export default function RequisitosTaxistaPalma() {
  const canonicalUrl = "https://taxiradar24.com/requisitos-taxista-palma";
  const title = "Requisitos para ser taxista en Palma de Mallorca | TaxiRadar24";
  const description =
    "Conoce los requisitos para ser taxista en Palma de Mallorca, qué documentos suelen pedirse y por qué el examen es una parte clave del proceso.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué necesito para ser taxista en Palma?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Debes cumplir con los requisitos oficiales, reunir la documentación exigida y preparar correctamente el examen correspondiente.",
        },
      },
      {
        "@type": "Question",
        name: "¿El examen es obligatorio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. La preparación del examen es uno de los pasos más importantes para acceder al sector.",
        },
      },
      {
        "@type": "Question",
        name: "¿Conviene entrenar con test reales?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Practicar con preguntas y simulaciones ayuda a ganar seguridad y a entender mejor el nivel exigido.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Page>
        <Wrapper>
          <Breadcrumbs aria-label="breadcrumb">
            <CrumbLink to="/">Inicio</CrumbLink>
            <Separator>/</Separator>
            <CrumbLink to="/guia-taxista-mallorca">Guía taxista Mallorca</CrumbLink>
            <Separator>/</Separator>
            <CrumbCurrent>Requisitos para ser taxista</CrumbCurrent>
          </Breadcrumbs>

          <Hero>
            <Eyebrow>Guía TaxiRadar24</Eyebrow>
            <Title>Requisitos para ser taxista en Palma de Mallorca</Title>
            <Lead>
              Antes de pensar en trabajar como taxista en Palma, es fundamental entender
              qué se exige, qué pasos debes cumplir y por qué la preparación previa marca
              una diferencia enorme.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Respuesta rápida</SnippetLabel>
              <SnippetText>
                Para entrar en el sector necesitas cumplir con los requisitos oficiales,
                reunir la documentación necesaria y preparar bien el examen, que es una de
                las partes más exigentes del proceso.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>
            <Section>
              <SectionTitle>Qué debes tener en cuenta</SectionTitle>
              <BulletList>
                <li>Documentación básica exigida para iniciar el proceso</li>
                <li>Condiciones personales y administrativas</li>
                <li>Capacidad para superar el examen</li>
                <li>Conocimiento de Palma, normativa y entorno profesional</li>
              </BulletList>
            </Section>

            <Section>
              <SectionTitle>El examen es el punto decisivo</SectionTitle>
              <Paragraph>
                Muchos aspirantes piensan primero en los papeles, pero la realidad es que
                el gran filtro suele ser el examen. Prepararlo bien desde el principio evita
                pérdida de tiempo, frustración y estudio desordenado.
              </Paragraph>
              <Paragraph>
                No basta con leer teoría. Para tener opciones reales, necesitas entrenar con
                preguntas, simular situaciones y trabajar sobre contenidos que se parezcan a
                lo que de verdad vas a encontrar.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>Pasos recomendados</SectionTitle>
              <NumberList>
                <li>Entender los requisitos y el contexto del proceso</li>
                <li>Organizar la documentación necesaria</li>
                <li>Empezar cuanto antes la preparación del examen</li>
                <li>Practicar con test y simulaciones</li>
                <li>Consolidar normativa, tarifas y callejero</li>
              </NumberList>
            </Section>

            <CTABox>
              <CTATitle>Prepara el examen con criterio profesional</CTATitle>
              <CTAParagraph>
                TaxiRadar24 está pensado para ayudarte a estudiar mejor, practicar con una
                estructura clara y avanzar con más seguridad hacia el objetivo.
              </CTAParagraph>
              <CTAButtons>
                <PrimaryLink to="/academia-taxista-mallorca">Entrar en la academia</PrimaryLink>
                <SecondaryLink to="/test-taxista-palma">Ver test</SecondaryLink>
              </CTAButtons>
            </CTABox>

            <Section>
              <SectionTitle>Preguntas frecuentes</SectionTitle>
              <FaqWrap>
                <FaqItem>
                  <FaqQuestion>¿Hay que preparar bien el examen?</FaqQuestion>
                  <FaqAnswer>
                    Sí. Es uno de los puntos más importantes de todo el proceso.
                  </FaqAnswer>
                </FaqItem>
                <FaqItem>
                  <FaqQuestion>¿Vale con estudiar teoría?</FaqQuestion>
                  <FaqAnswer>
                    Lo más eficaz es combinar teoría con práctica real, test y simulaciones.
                  </FaqAnswer>
                </FaqItem>
                <FaqItem>
                  <FaqQuestion>¿Conviene empezar pronto?</FaqQuestion>
                  <FaqAnswer>
                    Sí. Una preparación con tiempo suele dar mejores resultados que estudiar
                    con prisas.
                  </FaqAnswer>
                </FaqItem>
              </FaqWrap>
            </Section>

            <RelatedSection>
              <SectionTitle>Seguir leyendo</SectionTitle>
              <RelatedGrid>
                <RelatedCard to="/test-taxista-palma">
                  <RelatedTitle>Test taxista Palma</RelatedTitle>
                  <RelatedText>
                    Entrena con preguntas y estructura tipo examen.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/examen-taxista-mallorca">
                  <RelatedTitle>Cómo aprobar el examen</RelatedTitle>
                  <RelatedText>
                    Método claro para preparar la prueba con más seguridad.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/cuanto-gana-un-taxista-en-mallorca">
                  <RelatedTitle>Cuánto gana un taxista</RelatedTitle>
                  <RelatedText>
                    Descubre por qué tanta gente quiere entrar en el sector.
                  </RelatedText>
                </RelatedCard>
              </RelatedGrid>
            </RelatedSection>
          </Content>
        </Wrapper>
      </Page>
    </>
  );
}