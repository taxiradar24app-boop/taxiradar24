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
  CheckList,
  MicroHighlight,
} from "./LandigPagesStyle";

export default function TestTaxistaPalma() {
  const canonicalUrl = "https://taxiradar24.com/test-taxista-palma";

  const title =
    "Test taxista Palma: cómo practicar y aprobar el examen (2026)";

  const description =
    "Practica test de taxista en Palma de Mallorca y mejora tu nivel real. Aprende cómo usar test para aprobar el examen municipal.";

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

          {/* HERO */}
          <Hero>
            <Eyebrow>TaxiRadar24</Eyebrow>

            <Title>
              Test taxista Palma: la forma real de aprobar el examen
            </Title>

            <Lead>
              Si no haces test, no estás preparando el examen. Practicar con
              preguntas reales es lo que marca la diferencia entre aprobar o suspender.
            </Lead>

            <SnippetBox>
              <SnippetText>
                👉 El examen no se aprueba estudiando más… se aprueba entrenando mejor.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* BLOQUE IMPACTO */}
            <Section>
              <SectionTitle>Por qué hacer test cambia todo</SectionTitle>

              <Paragraph>
                La mayoría de aspirantes estudia teoría durante semanas…
              </Paragraph>

              <Paragraph>
                pero suspende cuando se enfrenta al examen real.
              </Paragraph>

              <MicroHighlight>
                👉 El problema no es el contenido, es la falta de práctica.
              </MicroHighlight>

              <CheckList>
                <li>No reconocen el tipo de preguntas</li>
                <li>No tienen velocidad de respuesta</li>
                <li>No saben cómo se corrige el examen</li>
              </CheckList>
            </Section>

            {/* BENEFICIOS */}
            <Section>
              <SectionTitle>Qué consigues haciendo test</SectionTitle>

              <CheckList>
                <li>Detectas errores en segundos</li>
                <li>Aprendes cómo preguntan en el examen</li>
                <li>Mejoras la rapidez</li>
                <li>Ganas seguridad</li>
                <li>Simulas condiciones reales</li>
              </CheckList>

              <SnippetBox>
                <SnippetText>
                  👉 Los test convierten teoría en reflejos.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* EJEMPLO */}
            <Section>
              <SectionTitle>Preguntas tipo examen</SectionTitle>

              <GridThree>
                <SoftCard>
                  <Paragraph><strong>Pregunta real</strong></Paragraph>
                  <Paragraph>
                    ¿Qué ocurre si fallas la primera parte del examen?
                  </Paragraph>
                </SoftCard>

                <SoftCard>
                  <Paragraph><strong>Pregunta real</strong></Paragraph>
                  <Paragraph>
                    ¿Qué importancia tiene el callejero en la prueba?
                  </Paragraph>
                </SoftCard>

                <SoftCard>
                  <Paragraph><strong>Pregunta real</strong></Paragraph>
                  <Paragraph>
                    ¿Cómo se evalúan las rutas en el examen?
                  </Paragraph>
                </SoftCard>
              </GridThree>
            </Section>

            {/* MÉTODO */}
            <Section>
              <SectionTitle>Cómo usar los test correctamente</SectionTitle>

              <NumberList>
                <li>Empieza con bloques pequeños</li>
                <li>Corrige cada error inmediatamente</li>
                <li>Repite preguntas falladas</li>
                <li>Combina con teoría</li>
                <li>Haz simulaciones completas</li>
              </NumberList>

              <MicroHighlight>
                👉 No es hacer muchos test, es hacerlos bien.
              </MicroHighlight>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Entrena como en el examen real</CTATitle>

              <CTAParagraph>
                Accede a test reales, simulador y sistema completo de preparación.
              </CTAParagraph>

              <CTAButtons>
                <PrimaryLink to="/academia-taxista-mallorca">
                  Empezar ahora
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
                  <FaqQuestion>¿Hacer test es suficiente?</FaqQuestion>
                  <FaqAnswer>
                    No, pero es la base para aprobar.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>¿Cuántos test debo hacer?</FaqQuestion>
                  <FaqAnswer>
                    Hasta que respondas sin dudar.
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
                  <RelatedText>Cómo funciona realmente</RelatedText>
                </RelatedCard>

                <RelatedCard to="/requisitos-taxista-palma">
                  <RelatedTitle>Requisitos taxista</RelatedTitle>
                  <RelatedText>Comprueba si puedes acceder</RelatedText>
                </RelatedCard>

                <RelatedCard to="/como-aprobar-examen-taxista-palma">
                  <RelatedTitle>Cómo aprobar</RelatedTitle>
                  <RelatedText>Estrategia completa</RelatedText>
                </RelatedCard>
              </RelatedGrid>
            </RelatedSection>

          </Content>
        </Wrapper>
      </Page>
    </>
  );
}