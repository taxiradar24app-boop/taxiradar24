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

import { Link as InlineLink } from "react-router-dom";

export default function TestTaxistaPalma() {
  const canonicalUrl = "https://taxiradar24.com/test-taxista-palma";

  const title =
    "Test taxista Palma gratis: practicar examen taxi Mallorca";

  const description =
    "Practica con test de taxista en Palma de Mallorca, mejora tu nivel y prepárate con simulaciones reales del examen.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Page>
        <Wrapper>
          <Breadcrumbs>
            <CrumbLink to="/">Inicio</CrumbLink>
            <Separator>/</Separator>
            <CrumbLink to="/guia-taxista-mallorca">
              Guía taxista Mallorca
            </CrumbLink>
            <Separator>/</Separator>
            <CrumbCurrent>Test taxista Palma</CrumbCurrent>
          </Breadcrumbs>

          <Hero>
            <Eyebrow>Guía TaxiRadar24</Eyebrow>

            <Title>
              "Test taxista Palma: entrena como en el examen y aprueba con TaxiRadar24"
            </Title>

            <Lead>
              Si estás preparando el examen de taxista en Palma de Mallorca,
              hacer test es la forma más rápida de mejorar tu nivel y detectar
              errores antes del examen real.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Respuesta rápida</SnippetLabel>
              <SnippetText>
                Practicar test de taxi en Palma te permite medir tu nivel real,
                mejorar la rapidez y entrenar con preguntas similares al examen.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* BLOQUE SEO */}
            <Section>
              <SectionTitle>
                Por qué hacer test es clave para aprobar el examen de taxi
              </SectionTitle>

              <Paragraph>
                Preparar el examen de taxista en Mallorca sin hacer test es uno
                de los errores más comunes. La práctica es lo que transforma la
                teoría en resultados.
              </Paragraph>

              <Paragraph>
                Los test te ayudan a entender el tipo de preguntas reales y a
                mejorar tu capacidad de respuesta bajo presión.
              </Paragraph>
            </Section>

            {/* BENEFICIOS */}
            <Section>
              <SectionTitle>
                Ventajas de practicar con test de taxista en Palma
              </SectionTitle>

              <BulletList>
                <li>Detectas errores rápidamente</li>
                <li>Refuerzas conocimientos clave</li>
                <li>Mejoras la velocidad de respuesta</li>
                <li>Simulas el examen real</li>
                <li>Ganas seguridad antes del examen</li>
              </BulletList>
            </Section>

            {/* MINI TEST */}
            <Section>
              <SectionTitle>
                Ejemplo de preguntas tipo examen taxi Palma
              </SectionTitle>

              <GridThree>
                <SoftCard>
                  <Paragraph><strong>Pregunta 1</strong></Paragraph>
                  <Paragraph>
                    ¿Qué importancia tiene conocer el callejero de Palma?
                  </Paragraph>
                </SoftCard>

                <SoftCard>
                  <Paragraph><strong>Pregunta 2</strong></Paragraph>
                  <Paragraph>
                    ¿Por qué es importante dominar la normativa del taxi?
                  </Paragraph>
                </SoftCard>

                <SoftCard>
                  <Paragraph><strong>Pregunta 3</strong></Paragraph>
                  <Paragraph>
                    ¿Qué ventaja aporta simular el examen real?
                  </Paragraph>
                </SoftCard>
              </GridThree>
            </Section>

            {/* MÉTODO */}
            <Section>
              <SectionTitle>
                Cómo usar los test para mejorar rápido
              </SectionTitle>

              <NumberList>
                <li>Empieza con bloques pequeños</li>
                <li>Corrige cada error</li>
                <li>Repite preguntas falladas</li>
                <li>Combina test con teoría</li>
                <li>Haz simulaciones completas</li>
              </NumberList>
            </Section>

            {/* INTERLINKING */}
            <Section>
              <SectionTitle>
                Antes de hacer test, entiende el contexto
              </SectionTitle>

              <Paragraph>
                Antes de practicar, es recomendable conocer los{" "}
                <InlineLink to="/requisitos-taxista-palma">
                  requisitos para ser taxista en Palma
                </InlineLink>{" "}
                y cómo es el{" "}
                <InlineLink to="/examen-taxista-mallorca">
                  examen de taxista en Mallorca
                </InlineLink>.
              </Paragraph>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Entrena como un profesional</CTATitle>

              <CTAParagraph>
                Con TaxiRadar24 puedes practicar con test reales y mejorar tu
                preparación de forma estructurada.
              </CTAParagraph>

              <CTAButtons>
                <PrimaryLink to="/academia-taxista-mallorca">
                  Acceder a la academia
                </PrimaryLink>
                <SecondaryLink to="/guia-taxista-mallorca">
                  Ver guía completa
                </SecondaryLink>
              </CTAButtons>
            </CTABox>

            {/* FAQ */}
            <Section>
              <SectionTitle>Preguntas frecuentes</SectionTitle>

              <FaqWrap>
                <FaqItem>
                  <FaqQuestion>
                    ¿Hacer test ayuda a aprobar?
                  </FaqQuestion>
                  <FaqAnswer>
                    Sí, es la forma más eficaz de preparar el examen.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>
                    ¿Cuántos test debo hacer?
                  </FaqQuestion>
                  <FaqAnswer>
                    Cuantos más practiques, mayor será tu seguridad.
                  </FaqAnswer>
                </FaqItem>
              </FaqWrap>
            </Section>

            {/* RELATED */}
            <RelatedSection>
              <SectionTitle>Seguir leyendo</SectionTitle>

              <RelatedGrid>
                <RelatedCard to="/examen-taxista-mallorca">
                  <RelatedTitle>Examen taxi Mallorca</RelatedTitle>
                  <RelatedText>
                    Cómo aprobar con método.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/requisitos-taxista-palma">
                  <RelatedTitle>Requisitos taxista Palma</RelatedTitle>
                  <RelatedText>
                    Todo lo necesario para empezar.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/cuanto-gana-un-taxista-en-mallorca">
                  <RelatedTitle>Cuánto gana un taxista</RelatedTitle>
                  <RelatedText>
                    Descubre el potencial del sector.
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