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
  SoftCard,
  GridThree,
} from "./LandigPagesStyle";

export default function TestTaxistaPalma() {
  const canonicalUrl = "https://taxiradar24.com/test-taxista-palma";
  const title = "Test taxista Palma gratis | Simulador y práctica | TaxiRadar24";
  const description =
    "Practica con un test de taxista en Palma, mejora tu preparación y entiende cómo entrenar con más eficacia para el examen.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Sirve hacer test para preparar el examen de taxista?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Practicar con test ayuda a fijar contenidos, detectar errores y ganar confianza antes del examen.",
        },
      },
      {
        "@type": "Question",
        name: "¿Basta con memorizar teoría?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. La práctica con preguntas y simulaciones es clave para medir el nivel real.",
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
            <CrumbCurrent>Test taxista Palma</CrumbCurrent>
          </Breadcrumbs>

          <Hero>
            <Eyebrow>Guía TaxiRadar24</Eyebrow>
            <Title>Test taxista Palma gratis: práctica real para avanzar</Title>
            <Lead>
              Si quieres preparar bien el examen de taxista en Palma, hacer test no es un
              complemento: es una parte central del proceso de aprendizaje.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Respuesta rápida</SnippetLabel>
              <SnippetText>
                Practicar con preguntas tipo test te ayuda a entender el nivel real, a
                detectar errores y a entrenar con más eficacia para el examen.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>
            <Section>
              <SectionTitle>Por qué los test marcan la diferencia</SectionTitle>
              <Paragraph>
                Leer teoría puede darte una base, pero no te muestra cómo reaccionas ante
                preguntas concretas. El test te obliga a recordar, decidir y medir tu nivel
                real de comprensión.
              </Paragraph>
              <BulletList>
                <li>Te ayuda a fijar conceptos</li>
                <li>Revela errores que no ves al leer</li>
                <li>Mejora tu velocidad mental</li>
                <li>Acerca la preparación al examen real</li>
              </BulletList>
            </Section>

            <Section>
              <SectionTitle>Mini práctica orientativa</SectionTitle>
              <GridThree>
                <SoftCard>
                  <Paragraph>
                    <strong>Pregunta 1</strong>
                  </Paragraph>
                  <Paragraph>
                    ¿Qué importancia tiene el conocimiento del callejero de Palma dentro de
                    la preparación?
                  </Paragraph>
                </SoftCard>

                <SoftCard>
                  <Paragraph>
                    <strong>Pregunta 2</strong>
                  </Paragraph>
                  <Paragraph>
                    ¿Por qué la normativa y las tarifas deben estudiarse junto con la
                    práctica?
                  </Paragraph>
                </SoftCard>

                <SoftCard>
                  <Paragraph>
                    <strong>Pregunta 3</strong>
                  </Paragraph>
                  <Paragraph>
                    ¿Qué ventaja aporta practicar con simulaciones tipo examen?
                  </Paragraph>
                </SoftCard>
              </GridThree>
            </Section>

            <Section>
              <SectionTitle>Cómo usar bien los test</SectionTitle>
              <NumberList>
                <li>Empieza con bloques pequeños</li>
                <li>Corrige cada error con atención</li>
                <li>Repite preguntas falladas</li>
                <li>Alterna test con teoría y simulaciones</li>
                <li>Mide tu progreso de forma constante</li>
              </NumberList>
            </Section>

            <CTABox>
              <CTATitle>Entrena con una estructura profesional</CTATitle>
              <CTAParagraph>
                TaxiRadar24 te permite practicar con más orden, trabajar sobre contenidos
                relevantes y avanzar hacia el examen con una base mucho más sólida.
              </CTAParagraph>
              <CTAButtons>
                <PrimaryLink to="/academia-taxista-mallorca">Acceder a la academia</PrimaryLink>
                <SecondaryLink to="/examen-taxista-mallorca">Ver guía del examen</SecondaryLink>
              </CTAButtons>
            </CTABox>

            <Section>
              <SectionTitle>Preguntas frecuentes</SectionTitle>
              <FaqWrap>
                <FaqItem>
                  <FaqQuestion>¿Hacer test ayuda de verdad?</FaqQuestion>
                  <FaqAnswer>
                    Sí. Es una de las formas más eficaces de medir y consolidar el estudio.
                  </FaqAnswer>
                </FaqItem>
                <FaqItem>
                  <FaqQuestion>¿Basta con memorizar?</FaqQuestion>
                  <FaqAnswer>
                    No. La práctica es la parte que transforma la teoría en rendimiento real.
                  </FaqAnswer>
                </FaqItem>
              </FaqWrap>
            </Section>

            <RelatedSection>
              <SectionTitle>Seguir leyendo</SectionTitle>
              <RelatedGrid>
                <RelatedCard to="/examen-taxista-mallorca">
                  <RelatedTitle>Examen taxista Mallorca</RelatedTitle>
                  <RelatedText>
                    Entiende cómo prepararlo con mejores criterios.
                  </RelatedText>
                </RelatedCard>
                <RelatedCard to="/requisitos-taxista-palma">
                  <RelatedTitle>Requisitos para ser taxista</RelatedTitle>
                  <RelatedText>
                    Conoce el contexto completo antes de presentarte.
                  </RelatedText>
                </RelatedCard>
                <RelatedCard to="/cuanto-gana-un-taxista-en-mallorca">
                  <RelatedTitle>Cuánto gana un taxista</RelatedTitle>
                  <RelatedText>
                    Descubre el interés profesional detrás del esfuerzo.
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