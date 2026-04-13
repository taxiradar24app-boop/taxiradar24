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
  Strong,
  BulletList,
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
  TableWrap,
  Table,
  Thead,
  Tr,
  Th,
  Td,
} from "./LandigPagesStyle";

export default function CuantoGanaUnTaxistaEnMallorca() {
  const canonicalUrl = "https://taxiradar24.com/cuanto-gana-un-taxista-en-mallorca";
  const title = "¿Cuánto gana un taxista en Mallorca en 2026? | TaxiRadar24";
  const description =
    "Descubre cuánto gana un taxista en Mallorca en 2026, qué factores influyen en sus ingresos y cómo empezar a prepararte para entrar en el sector.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto gana un taxista en Mallorca al mes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los ingresos pueden variar según la temporada, el tipo de jornada, la demanda y la experiencia. En temporada alta el potencial suele aumentar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Se gana más en verano?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. En Mallorca la temporada turística tiene un impacto claro en la demanda de servicios de taxi.",
        },
      },
      {
        "@type": "Question",
        name: "¿Es importante conocer bien Palma?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. El conocimiento de calles, zonas calientes, aeropuerto y normativa puede influir mucho en el rendimiento profesional.",
        },
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "¿Cuánto gana un taxista en Mallorca en 2026?",
    description,
    author: {
      "@type": "Organization",
      name: "TaxiRadar24",
    },
    publisher: {
      "@type": "Organization",
      name: "TaxiRadar24",
    },
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Page>
        <Wrapper>
          <Breadcrumbs aria-label="breadcrumb">
            <CrumbLink to="/">Inicio</CrumbLink>
            <Separator>/</Separator>
            <CrumbLink to="/guia-taxista-mallorca">Guía taxista Mallorca</CrumbLink>
            <Separator>/</Separator>
            <CrumbCurrent>Cuánto gana un taxista en Mallorca</CrumbCurrent>
          </Breadcrumbs>

          <Hero>
            <Eyebrow>Guía TaxiRadar24</Eyebrow>
            <Title>¿Cuánto gana un taxista en Mallorca en 2026?</Title>
            <Lead>
              Si estás pensando en preparar el carnet de taxista en Palma, una de las
              primeras preguntas es cuánto puede llegar a ganar un profesional del sector
              y si realmente compensa el esfuerzo de entrar en este mundo.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Respuesta rápida</SnippetLabel>
              <SnippetText>
                El potencial de ingresos de un taxista en Mallorca depende de la temporada,
                la demanda, los turnos, la zona de trabajo y el nivel de preparación
                profesional. En un entorno turístico como Palma, la estacionalidad tiene un
                peso enorme.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>
            <Section>
              <SectionTitle>Qué influye en lo que gana un taxista</SectionTitle>
              <Paragraph>
                No existe una cifra única válida para todos. Dos profesionales pueden vivir
                realidades muy diferentes en función de su experiencia, su manera de
                trabajar y el momento del año.
              </Paragraph>

              <BulletList>
                <li>Temporada alta frente a temporada baja</li>
                <li>Turnos de día o de noche</li>
                <li>Trabajo cerca del aeropuerto y zonas turísticas</li>
                <li>Conocimiento operativo de Palma</li>
                <li>Capacidad para optimizar tiempos y recorridos</li>
              </BulletList>
            </Section>

            <Section>
              <SectionTitle>Temporada turística y rentabilidad</SectionTitle>
              <Paragraph>
                Mallorca no se comporta igual durante todo el año. En los meses de mayor
                turismo se incrementan los desplazamientos desde el aeropuerto, puertos,
                hoteles, playas y centros urbanos. Eso hace que muchas personas consideren
                esta profesión una opción atractiva.
              </Paragraph>
              <Paragraph>
                Pero también hay que entender que la rentabilidad no depende solo del
                volumen de trabajo. También influye la resistencia física, la gestión del
                tiempo, el conocimiento del callejero y la capacidad para trabajar de forma
                constante.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>Tabla orientativa de factores</SectionTitle>
              <TableWrap>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Factor</Th>
                      <Th>Impacto</Th>
                    </Tr>
                  </Thead>
                  <tbody>
                    <Tr>
                      <Td>Temporada alta</Td>
                      <Td>Mayor volumen de servicios y más movimiento</Td>
                    </Tr>
                    <Tr>
                      <Td>Aeropuerto</Td>
                      <Td>Punto clave para generar actividad</Td>
                    </Tr>
                    <Tr>
                      <Td>Turnos nocturnos</Td>
                      <Td>Pueden cambiar mucho la dinámica del trabajo</Td>
                    </Tr>
                    <Tr>
                      <Td>Conocer Palma</Td>
                      <Td>Mejora tiempos, decisiones y rendimiento</Td>
                    </Tr>
                  </tbody>
                </Table>
              </TableWrap>
            </Section>

            <Section>
              <SectionTitle>¿Compensa entrar al sector?</SectionTitle>
              <Paragraph>
                Para muchas personas sí, pero no es una decisión que deba tomarse solo
                mirando el ingreso potencial. También hay que valorar el proceso para
                acceder, los requisitos, la preparación del examen y la realidad diaria de
                la profesión.
              </Paragraph>
              <Paragraph>
                La mejor forma de verlo con claridad es empezar por la base: entender cómo
                funciona el examen de taxista y qué exige realmente el entorno de Palma.
              </Paragraph>
            </Section>

            <CTABox>
              <CTATitle>Da el primer paso con una preparación seria</CTATitle>
              <CTAParagraph>
                Antes de pensar en lo que se puede ganar, lo más inteligente es preparar
                bien el examen, dominar la normativa y conocer Palma como un profesional.
              </CTAParagraph>
              <CTAButtons>
                <PrimaryLink to="/academia-taxista-mallorca">Ver academia</PrimaryLink>
                <SecondaryLink to="/test-taxista-palma">Probar test</SecondaryLink>
              </CTAButtons>
            </CTABox>

            <Section>
              <SectionTitle>Preguntas frecuentes</SectionTitle>
              <FaqWrap>
                <FaqItem>
                  <FaqQuestion>¿Se gana más en verano?</FaqQuestion>
                  <FaqAnswer>
                    Sí. La temporada turística suele elevar de forma clara la actividad del
                    taxi en Mallorca.
                  </FaqAnswer>
                </FaqItem>
                <FaqItem>
                  <FaqQuestion>¿El aeropuerto es importante?</FaqQuestion>
                  <FaqAnswer>
                    Mucho. Es uno de los puntos operativos más relevantes dentro del flujo
                    de trabajo del taxi en Palma.
                  </FaqAnswer>
                </FaqItem>
                <FaqItem>
                  <FaqQuestion>¿Hace falta preparar bien el examen?</FaqQuestion>
                  <FaqAnswer>
                    Sí. Entrar al sector exige preparación específica y conocimiento real
                    del entorno.
                  </FaqAnswer>
                </FaqItem>
              </FaqWrap>
            </Section>

            <RelatedSection>
              <SectionTitle>Seguir leyendo</SectionTitle>
              <RelatedGrid>
                <RelatedCard to="/requisitos-taxista-palma">
                  <RelatedTitle>Requisitos para ser taxista en Palma</RelatedTitle>
                  <RelatedText>
                    Todo lo necesario para empezar el proceso de forma correcta.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/cuanto-cuesta-licencia-taxi-palma">
                  <RelatedTitle>Cuánto cuesta una licencia de taxi</RelatedTitle>
                  <RelatedText>
                    Entiende mejor el contexto económico del sector.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/examen-taxista-mallorca">
                  <RelatedTitle>Cómo aprobar el examen</RelatedTitle>
                  <RelatedText>
                    La parte decisiva para entrar con opciones reales.
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