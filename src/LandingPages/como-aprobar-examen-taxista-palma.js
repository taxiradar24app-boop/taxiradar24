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
  CheckList,
  MicroHighlight,
} from "./LandigPagesStyle";

export default function ComoAprobarExamenTaxistaPalma() {
  const canonicalUrl =
    "https://taxiradar24.com/como-aprobar-examen-taxista-palma";

  const title =
    "Cómo aprobar el examen de taxista en Palma (método real 2026)";

  const description =
    "Aprende cómo aprobar el examen de taxista en Palma con método real: callejero, test, rutas y estrategia para superar la prueba.";

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
            <CrumbCurrent>
              Cómo aprobar examen
            </CrumbCurrent>
          </Breadcrumbs>

          {/* HERO */}
          <Hero>
            <Eyebrow>TaxiRadar24</Eyebrow>

            <Title>
              Cómo aprobar el examen de taxista en Palma
            </Title>

            <Lead>
              No necesitas estudiar más… necesitas estudiar mejor.
              Aprobar este examen depende de cómo entrenas, no solo de cuánto lees.
            </Lead>

            <SnippetBox>
              <SnippetText>
                👉 El examen no se aprueba con teoría. Se aprueba con práctica.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* REALIDAD */}
            <Section>
              <SectionTitle>La realidad del examen</SectionTitle>

              <Paragraph>
                La mayoría de aspirantes estudia durante semanas…
              </Paragraph>

              <Paragraph>
                pero suspende el día del examen.
              </Paragraph>

              <MicroHighlight>
                👉 No fallan por falta de estudio. Fallan por falta de entrenamiento.
              </MicroHighlight>

              <CheckList>
                <li>No practican test reales</li>
                <li>No dominan el callejero con tiempo</li>
                <li>No entienden cómo se corrige</li>
              </CheckList>
            </Section>

            {/* ESTRUCTURA */}
            <Section>
              <SectionTitle>Cómo funciona realmente el examen</SectionTitle>

              <Paragraph>
                El examen tiene dos partes, pero solo una decide si continúas.
              </Paragraph>

              <CheckList>
                <li>Primera parte → test + callejero (eliminatoria)</li>
                <li>Segunda parte → rutas</li>
              </CheckList>

              <MicroHighlight>
                👉 Si fallas la primera, no hay segunda.
              </MicroHighlight>
            </Section>

            {/* MÉTODO */}
            <Section>
              <SectionTitle>Método real para aprobar</SectionTitle>

              <NumberList>
                <li>Entiende cómo es el examen</li>
                <li>Practica test desde el inicio</li>
                <li>Entrena callejero todos los días</li>
                <li>Corrige cada error</li>
                <li>Introduce rutas cuando tengas base</li>
                <li>Simula el examen completo</li>
              </NumberList>

              <SnippetBox>
                <SnippetText>
                  👉 No es estudiar mucho. Es estudiar lo correcto.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* CALLEJERO */}
            <Section>
              <SectionTitle>Callejero: donde se pierde el examen</SectionTitle>

              <Paragraph>
                El callejero no es difícil… pero exige rapidez.
              </Paragraph>

              <CheckList>
                <li>Responder completo</li>
                <li>No dudar</li>
                <li>Respetar formato</li>
                <li>Llegar a tiempo</li>
              </CheckList>

              <MicroHighlight>
                👉 Aquí se pierden más puntos de los que crees.
              </MicroHighlight>
            </Section>

            {/* TEST */}
            <Section>
              <SectionTitle>Test: lo que realmente sube tu nivel</SectionTitle>

              <Paragraph>
                El test es donde conviertes teoría en reflejos.
              </Paragraph>

              <CheckList>
                <li>Detectas errores rápido</li>
                <li>Aprendes cómo preguntan</li>
                <li>Mejoras velocidad</li>
                <li>Ganas seguridad</li>
              </CheckList>

              <MicroHighlight>
                👉 Si no haces test, no estás preparado.
              </MicroHighlight>
            </Section>

            {/* RUTAS */}
            <Section>
              <SectionTitle>Rutas: nivel profesional</SectionTitle>

              <Paragraph>
                Aquí ya no memorizas, decides.
              </Paragraph>

              <Paragraph>
                Tienes que pensar como taxista.
              </Paragraph>

              <MicroHighlight>
                👉 No gana el que sabe más calles. Gana el que elige mejor.
              </MicroHighlight>
            </Section>

            {/* ERRORES */}
            <Section>
              <SectionTitle>Errores que te hacen suspender</SectionTitle>

              <BulletList>
                <li>Estudiar sin practicar</li>
                <li>Dejar callejero para el final</li>
                <li>No corregir errores</li>
                <li>No simular examen real</li>
              </BulletList>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Prepárate como en el examen real</CTATitle>

              <CTAParagraph>
                Entrena con test reales, simulador y sistema completo.
              </CTAParagraph>

              <CTAButtons>
                <PrimaryLink to="/academia-taxista-mallorca">
                  Empezar ahora
                </PrimaryLink>
                <SecondaryLink to="/test-taxista-palma">
                  Practicar test
                </SecondaryLink>
              </CTAButtons>
            </CTABox>

            {/* FAQ */}
            <Section>
              <SectionTitle>Preguntas frecuentes</SectionTitle>

              <FaqWrap>
                <FaqItem>
                  <FaqQuestion>¿Es difícil el examen?</FaqQuestion>
                  <FaqAnswer>
                    Sí, si no entrenas correctamente.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>¿Cuánto tarda prepararlo?</FaqQuestion>
                  <FaqAnswer>
                    Depende del método, no del tiempo.
                  </FaqAnswer>
                </FaqItem>
              </FaqWrap>
            </Section>

            {/* RELATED */}
            <RelatedSection>
              <SectionTitle>Seguir leyendo</SectionTitle>

              <RelatedGrid>
                <RelatedCard to="/test-taxista-palma">
                  <RelatedTitle>Test taxista</RelatedTitle>
                  <RelatedText>Entrena como en el examen</RelatedText>
                </RelatedCard>

                <RelatedCard to="/requisitos-taxista-palma">
                  <RelatedTitle>Requisitos</RelatedTitle>
                  <RelatedText>Comprueba si puedes empezar</RelatedText>
                </RelatedCard>

                <RelatedCard to="/formato-examen-taxista-palma">
                  <RelatedTitle>Formato examen</RelatedTitle>
                  <RelatedText>Entiende la estructura real</RelatedText>
                </RelatedCard>
              </RelatedGrid>
            </RelatedSection>

          </Content>
        </Wrapper>
      </Page>
    </>
  );
}