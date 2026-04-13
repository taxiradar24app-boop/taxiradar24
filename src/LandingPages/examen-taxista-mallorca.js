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

export default function ExamenTaxistaMallorca() {
  const canonicalUrl = "https://taxiradar24.com/examen-taxista-mallorca";
  const title = "Examen taxista Mallorca: cómo aprobar a la primera | TaxiRadar24";
  const description =
    "Guía para entender el examen de taxista en Mallorca, cómo prepararlo mejor y por qué la práctica con test y simulaciones marca la diferencia.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Es difícil el examen de taxista en Mallorca?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Puede ser exigente si no se prepara con método. La combinación de teoría, test y simulación mejora mucho las opciones.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué conviene estudiar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Es importante trabajar normativa, tarifas, callejero y comprensión del entorno profesional de Palma.",
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
            <CrumbCurrent>Examen taxista Mallorca</CrumbCurrent>
          </Breadcrumbs>

          <Hero>
            <Eyebrow>Guía TaxiRadar24</Eyebrow>
            <Title>Examen taxista Mallorca: cómo aprobar con más seguridad</Title>
            <Lead>
              El examen es el filtro que más respeto genera entre los aspirantes. La buena
              noticia es que una preparación ordenada puede cambiar mucho el resultado.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Respuesta rápida</SnippetLabel>
              <SnippetText>
                Aprobar el examen de taxista en Mallorca exige método, práctica y
                constancia. Quien combina teoría, test y simulación suele llegar con mucha
                más seguridad.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>
            <Section>
              <SectionTitle>Qué suele marcar la diferencia</SectionTitle>
              <BulletList>
                <li>Estudiar con una estructura clara</li>
                <li>Practicar con preguntas frecuentes</li>
                <li>Trabajar el callejero de Palma</li>
                <li>Consolidar normativa y tarifas</li>
                <li>Simular la presión del examen</li>
              </BulletList>
            </Section>

            <Section>
              <SectionTitle>Error común de muchos aspirantes</SectionTitle>
              <Paragraph>
                El error más habitual es pensar que basta con leer contenido y memorizar.
                En realidad, el rendimiento mejora cuando conviertes el estudio en práctica
                activa y revisión constante.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>Método recomendado</SectionTitle>
              <NumberList>
                <li>Comprender el temario y organizarlo</li>
                <li>Estudiar bloques cortos con foco</li>
                <li>Hacer test después de cada bloque</li>
                <li>Revisar fallos y repetir</li>
                <li>Simular exámenes completos</li>
              </NumberList>
            </Section>

            <CTABox>
              <CTATitle>Prepárate de forma más inteligente</CTATitle>
              <CTAParagraph>
                TaxiRadar24 está pensado para ayudarte a pasar de estudiar sin orden a
                entrenar con una estructura mucho más eficaz.
              </CTAParagraph>
              <CTAButtons>
                <PrimaryLink to="/academia-taxista-mallorca">Ver academia</PrimaryLink>
                <SecondaryLink to="/test-taxista-palma">Practicar test</SecondaryLink>
              </CTAButtons>
            </CTABox>

            <Section>
              <SectionTitle>Preguntas frecuentes</SectionTitle>
              <FaqWrap>
                <FaqItem>
                  <FaqQuestion>¿Es un examen exigente?</FaqQuestion>
                  <FaqAnswer>
                    Sí, especialmente si no se prepara con un método claro.
                  </FaqAnswer>
                </FaqItem>
                <FaqItem>
                  <FaqQuestion>¿Conviene hacer simulaciones?</FaqQuestion>
                  <FaqAnswer>
                    Sí. Te acercan a la realidad del examen y mejoran tu seguridad.
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
                    Practica con preguntas para medir tu nivel.
                  </RelatedText>
                </RelatedCard>
                <RelatedCard to="/requisitos-taxista-palma">
                  <RelatedTitle>Requisitos para ser taxista</RelatedTitle>
                  <RelatedText>
                    El contexto necesario antes de presentarte.
                  </RelatedText>
                </RelatedCard>
                <RelatedCard to="/cuanto-gana-un-taxista-en-mallorca">
                  <RelatedTitle>Cuánto gana un taxista</RelatedTitle>
                  <RelatedText>
                    Entiende el atractivo real del sector.
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