import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Page,
  Wrapper,
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
  Strong,
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
  CheckList,
  MicroHighlight,
  MiniLead,
} from "./LandigPagesStyle";

export default function GuiaTaxistaMallorca() {
  const canonicalUrl = "https://taxiradar24.com/guia-taxista-mallorca";
  const title =
    "Cómo ser taxista en Palma de Mallorca | Guía real del carnet municipal 2026";
  const description =
    "Guía real para conseguir el carnet de taxista en Palma de Mallorca: requisitos, examen municipal, test, callejero, cómo aprobar y empezar a trabajar.";

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

            <Title>
              Cómo ser taxista en Palma de Mallorca
            </Title>

            <Lead>
              Si quieres trabajar como taxista en Palma, lo primero es conseguir
              el <Strong>carnet municipal</Strong>. Aquí tienes el camino real:
              requisitos, examen, preparación y los pasos que de verdad
              importan.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Resumen rápido</SnippetLabel>
              <SnippetText>
                Para empezar no necesitas comprar una licencia. Primero necesitas
                aprobar el examen y obtener el carnet municipal de taxista.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>
            <Section>
              <SectionTitle>Antes de empezar: carnet y licencia no son lo mismo</SectionTitle>

              <Paragraph>
                Aquí es donde más gente se confunde.
              </Paragraph>

              <MicroHighlight>
                👉 Si tu objetivo es trabajar conduciendo, lo primero es el carnet.
              </MicroHighlight>

              <CheckList>
                <li>
                  <Strong>Carnet municipal de taxista:</Strong> es tu habilitación
                  personal para poder conducir un taxi en Palma.
                </li>
                <li>
                  <Strong>Licencia de taxi:</Strong> es el título del vehículo o de
                  la actividad. Puedes trabajar para un titular sin comprar una.
                </li>
              </CheckList>

              <Paragraph>
                Dicho de forma simple: <Strong>el carnet te permite trabajar</Strong>;
                la licencia ya pertenece a otro nivel del sector.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>El camino real para ser taxista en Palma</SectionTitle>

              <MiniLead>
                Si partes desde cero, este es el proceso completo:
              </MiniLead>

              <CheckList>
                <li>Cumplir los requisitos básicos para presentarte</li>
                <li>Inscribirte en la convocatoria oficial</li>
                <li>Preparar test, callejero y rutas</li>
                <li>Aprobar el examen municipal</li>
                <li>Entregar la documentación final</li>
                <li>Obtener el carnet municipal y empezar a trabajar</li>
              </CheckList>

              <SnippetBox>
                <SnippetText>
                  👉 El mayor filtro no son los papeles: es el examen.
                </SnippetText>
              </SnippetBox>
            </Section>

            <Section>
              <SectionTitle>Qué suele frenar a la mayoría</SectionTitle>

              <Paragraph>
                Mucha gente entra al proceso con ganas, pero sin método.
              </Paragraph>

              <Paragraph>
                Leen normativa, miran algo de callejero y piensan que con eso basta.
              </Paragraph>

              <MicroHighlight>
                👉 El problema es que el examen no se aprueba solo estudiando:
                se aprueba entrenando.
              </MicroHighlight>

              <CheckList>
                <li>No practican test tipo examen</li>
                <li>No entrenan el callejero con tiempo real</li>
                <li>No entienden cómo se corrige la prueba</li>
                <li>Llegan a rutas sin una base sólida</li>
              </CheckList>
            </Section>

            <Section>
              <SectionTitle>Empieza por aquí</SectionTitle>

              <Paragraph>
                Accede a cada parte del proceso según el punto en el que estés ahora:
              </Paragraph>

              <GridThree>
                <RelatedCard to="/requisitos-taxista-palma">
                  <RelatedTitle>Requisitos para el carnet</RelatedTitle>
                  <RelatedText>
                    Lo mínimo que necesitas para presentarte.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/examen-taxista-mallorca">
                  <RelatedTitle>Cómo es el examen</RelatedTitle>
                  <RelatedText>
                    Entiende la prueba antes de estudiar.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/formato-examen-taxista-palma">
                  <RelatedTitle>Formato real del examen</RelatedTitle>
                  <RelatedText>
                    Estructura, puntos y cómo se corrige.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/como-aprobar-examen-taxista-palma">
                  <RelatedTitle>Cómo aprobar a la primera</RelatedTitle>
                  <RelatedText>
                    Estrategia real para llegar preparado.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/test-taxista-palma">
                  <RelatedTitle>Test de práctica</RelatedTitle>
                  <RelatedText>
                    Entrena como en el examen real.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/cuanto-gana-un-taxista-en-mallorca">
                  <RelatedTitle>Cuánto gana un taxista</RelatedTitle>
                  <RelatedText>
                    Entiende el potencial del trabajo.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/cuanto-cuesta-licencia-taxi-palma">
                  <RelatedTitle>Precio de licencia</RelatedTitle>
                  <RelatedText>
                    Solo si quieres invertir en el sector.
                  </RelatedText>
                </RelatedCard>
              </GridThree>
            </Section>

            <CTABox>
              <CTATitle>Empieza a preparar el carnet con ventaja</CTATitle>

              <CTAParagraph>
                No estudies a ciegas. Trabaja con una base clara, practica con
                test y entiende cómo funciona el examen municipal de verdad.
              </CTAParagraph>

              <CTAButtons>
                <PrimaryLink to="/academia-taxista-mallorca">
                  Entrar a la academia
                </PrimaryLink>
                <SecondaryLink to="/test-taxista-palma">
                  Practicar test
                </SecondaryLink>
              </CTAButtons>
            </CTABox>
          </Content>
        </Wrapper>
      </Page>
    </>
  );
}