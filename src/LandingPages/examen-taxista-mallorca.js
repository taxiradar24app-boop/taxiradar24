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

import { Link as InlineLink } from "react-router-dom";

export default function ExamenTaxistaMallorca() {
  const canonicalUrl = "https://taxiradar24.com/examen-taxista-mallorca";

  const title =
    "Examen taxista Mallorca: guía general del examen en Palma | TaxiRadar24";

  const description =
    "Guía general del examen de taxista en Palma de Mallorca: qué es, cómo se divide, qué partes tiene y qué debes consultar para prepararlo con criterio.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo es el examen de taxista en Palma de Mallorca?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El examen se divide en dos partes: una primera parte eliminatoria compuesta por callejero y test, y una segunda parte de rutas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto dura el examen de taxista en Palma?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La duración total de la prueba es de 90 minutos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Se corrige la segunda parte si suspendes la primera?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. La primera parte es eliminatoria y solo si se supera se evalúa la segunda parte del examen.",
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
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
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
            <CrumbCurrent>Examen taxista Mallorca</CrumbCurrent>
          </Breadcrumbs>

          <Hero>
            <Eyebrow>Guía TaxiRadar24</Eyebrow>

            <Title>
              Examen taxista Mallorca: guía general del examen en Palma
            </Title>

            <Lead>
              El examen de taxista en Palma de Mallorca es la prueba clave para
              obtener el permiso municipal. Antes de prepararlo en serio,
              conviene entender su estructura general, qué partes lo componen y
              qué tipo de conocimientos exige.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Resumen rápido</SnippetLabel>
              <SnippetText>
                El examen de taxista en Palma se compone de una primera parte
                eliminatoria de callejero y test, y una segunda parte de rutas.
                Si no superas la primera fase, la segunda no se corrige.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>
            <Section>
              <SectionTitle>
                Qué es el examen de taxista en Palma de Mallorca
              </SectionTitle>

              <Paragraph>
                El examen de taxista en Palma es la prueba de aptitud que debe
                superar el aspirante para avanzar en el proceso de obtención del
                permiso municipal de taxista.
              </Paragraph>

              <Paragraph>
                No se trata solo de una prueba teórica. El examen está pensado
                para comprobar si el candidato domina los conocimientos
                necesarios para ejercer con criterio profesional dentro del
                servicio de autotaxi en Palma.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>
                Cómo se divide el examen de taxista
              </SectionTitle>

              <Paragraph>
                La prueba oficial se organiza en dos partes claramente
                diferenciadas.
              </Paragraph>

              <BulletList>
                <li>Primera parte: callejero y test</li>
                <li>Segunda parte: rutas o itinerarios</li>
              </BulletList>

              <Paragraph>
                La primera parte tiene carácter eliminatorio. Eso significa que
                solo los aspirantes que alcanzan el nivel exigido en esa fase
                pasan a la evaluación de la segunda parte.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Punto clave</SnippetLabel>
                <SnippetText>
                  Entender esta estructura cambia totalmente la forma correcta
                  de preparar el examen.
                </SnippetText>
              </SnippetBox>
            </Section>

            <Section>
              <SectionTitle>
                Qué conocimientos se evalúan en el examen
              </SectionTitle>

              <Paragraph>
                El examen exige una combinación de conocimientos normativos,
                operativos y de orientación profesional dentro de Palma.
              </Paragraph>

              <BulletList>
                <li>Normativa aplicable al servicio del taxi</li>
                <li>Tarifas vigentes</li>
                <li>Uso del callejero</li>
                <li>Vías principales de Palma</li>
                <li>Lugares de referencia y accesos principales</li>
                <li>Resolución correcta de rutas</li>
              </BulletList>

              <Paragraph>
                Por eso, prepararlo bien implica mucho más que leer teoría: hay
                que entender el examen y después trabajar cada bloque con
                método.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>
                Dónde conviene profundizar para prepararlo bien
              </SectionTitle>

              <Paragraph>
                Esta página es una guía general. Si quieres preparar el examen
                con criterio, lo recomendable es separar bien cada intención.
              </Paragraph>

              <Paragraph>
                Para entender la estructura exacta de la prueba, consulta{" "}
                <InlineLink to="/formato-examen-taxista-palma">
                  cómo es el formato del examen de taxista en Palma
                </InlineLink>
                .
              </Paragraph>

              <Paragraph>
                Si lo que necesitas es práctica, puedes entrenar con el{" "}
                <InlineLink to="/test-taxista-palma">
                  test de taxista en Palma
                </InlineLink>
                .
              </Paragraph>

              <Paragraph>
                Y si buscas una estrategia completa de estudio, aquí tienes la
                guía sobre{" "}
                <InlineLink to="/como-aprobar-examen-taxista-palma">
                  cómo aprobar el examen de taxista en Palma
                </InlineLink>
                .
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>
                Antes del examen: el punto de partida correcto
              </SectionTitle>

              <Paragraph>
                Antes de centrarte en la preparación, conviene revisar también
                los{" "}
                <InlineLink to="/requisitos-taxista-palma">
                  requisitos para ser taxista en Palma
                </InlineLink>
                , ya que el acceso al examen y la obtención final del carnet
                dependen de cumplir las condiciones oficiales del proceso.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Enfoque recomendado</SnippetLabel>
                <SnippetText>
                  Primero entiende el proceso, después la estructura del examen,
                  luego practica y finalmente trabaja una estrategia real de
                  aprobado.
                </SnippetText>
              </SnippetBox>
            </Section>

            <CTABox>
              <CTATitle>Prepara el examen con una base ordenada</CTATitle>

              <CTAParagraph>
                Si quieres avanzar con más claridad, empieza por entender el
                formato oficial, practica con test y después trabaja la
                estrategia completa de preparación.
              </CTAParagraph>

              <CTAButtons>
                <PrimaryLink to="/formato-examen-taxista-palma">
                  Ver formato del examen
                </PrimaryLink>
                <SecondaryLink to="/test-taxista-palma">
                  Practicar test
                </SecondaryLink>
              </CTAButtons>
            </CTABox>

            <Section>
              <SectionTitle>Preguntas frecuentes</SectionTitle>

              <FaqWrap>
                <FaqItem>
                  <FaqQuestion>
                    ¿Cómo es el examen de taxista en Palma?
                  </FaqQuestion>
                  <FaqAnswer>
                    Se divide en dos partes: una primera parte eliminatoria de
                    callejero y test, y una segunda parte de rutas.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>
                    ¿La primera parte del examen es eliminatoria?
                  </FaqQuestion>
                  <FaqAnswer>
                    Sí. Si no se supera la primera parte, la segunda no se
                    corrige.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>
                    ¿Dónde puedo ver la estructura completa del examen?
                  </FaqQuestion>
                  <FaqAnswer>
                    En la página de formato del examen, donde se explica con más
                    detalle cada bloque de la prueba.
                  </FaqAnswer>
                </FaqItem>
              </FaqWrap>
            </Section>

            <RelatedSection>
              <SectionTitle>Seguir leyendo</SectionTitle>

              <RelatedGrid>
                <RelatedCard to="/formato-examen-taxista-palma">
                  <RelatedTitle>Formato del examen</RelatedTitle>
                  <RelatedText>
                    Entiende la estructura oficial de la prueba.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/test-taxista-palma">
                  <RelatedTitle>Test taxista Palma</RelatedTitle>
                  <RelatedText>
                    Practica con preguntas tipo examen.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/como-aprobar-examen-taxista-palma">
                  <RelatedTitle>Cómo aprobar el examen</RelatedTitle>
                  <RelatedText>
                    Sigue una estrategia real de preparación.
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