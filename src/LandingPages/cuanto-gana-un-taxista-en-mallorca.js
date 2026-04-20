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
  TableWrap,
  Table,
  Thead,
  Tr,
  Th,
  Td,
} from "./LandigPagesStyle";

import { Link as InlineLink } from "react-router-dom";

export default function CuantoGanaUnTaxistaEnMallorca() {
  const canonicalUrl =
    "https://taxiradar24.com/cuanto-gana-un-taxista-en-mallorca";

  const title =
    "¿Cuánto gana un taxista en Palma de Mallorca en 2026? (2000€ - 3000€+)";

  const description =
    "Descubre cuánto gana un taxista en Palma de Mallorca en 2026: ingresos reales entre 1500€ y 3000€, factores clave y si merece la pena trabajar en el taxi.";

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
              Cuánto gana un taxista en Mallorca
            </CrumbCurrent>
          </Breadcrumbs>

          <Hero>
            <Eyebrow>Guía TaxiRadar24</Eyebrow>

            <Title>
              ¿Cuánto gana un taxista en Palma de Mallorca en 2026?
            </Title>

            <Lead>
              Un taxista en Palma de Mallorca puede ganar entre{" "}
              <strong>2000€ y 3000€ al mes</strong>, dependiendo de la temporada,
              los turnos y la experiencia. Si estás pensando en entrar en el sector,
              aquí tienes una visión real de cuánto se puede ganar y de qué depende.
            </Lead>
                      
          <SnippetBox>
            <SnippetLabel>Respuesta rápida</SnippetLabel>
            <SnippetText>
              El sueldo de un taxista en Palma varía según la época del año,
              siendo el verano el periodo con mayor actividad y rentabilidad.
            </SnippetText>
          </SnippetBox>
          </Hero>

          <Content>

          {/* BLOQUE PRINCIPAL */}
          <Section>
            <SectionTitle>
              Cuánto gana un taxista en Palma de Mallorca realmente
            </SectionTitle>

            <Paragraph>
              El sueldo de un taxista en Palma de Mallorca no es fijo, pero en condiciones
              normales puede situarse entre{" "}
              <strong>2000€ y 3000€ al mes</strong>, dependiendo del nivel de actividad,
              los turnos y la experiencia.
            </Paragraph>

            <Paragraph>
              Muchos aspirantes buscan cuánto gana un taxista en Palma realmente, y la
              respuesta depende en gran parte de la temporada. En verano, la demanda
              aumenta debido al turismo, lo que permite generar más ingresos, especialmente
              en zonas como el aeropuerto, hoteles y áreas turísticas.
            </Paragraph>

            <Paragraph>
              Por tanto, el ingreso de un taxista en Mallorca está directamente relacionado
              con la dedicación, la estrategia de trabajo y el conocimiento del entorno.
            </Paragraph>
          </Section>

            {/* AEROPUERTO */}
            <Section>
              <SectionTitle>
                ¿Cuánto gana un taxista en el aeropuerto de Palma?
              </SectionTitle>

              <Paragraph>
                El aeropuerto de Palma es uno de los puntos más importantes del
                trabajo diario. Durante la temporada turística, concentra gran
                parte de los servicios.
              </Paragraph>

              <Paragraph>
                Trabajar en esta zona puede aumentar los ingresos diarios,
                aunque también requiere conocer bien horarios y dinámica de
                trabajo.
              </Paragraph>
            </Section>

            {/* FACTORES */}
            <Section>
              <SectionTitle>
                Factores que influyen en los ingresos
              </SectionTitle>

              <BulletList>
                <li>Temporada alta o baja</li>
                <li>Turnos de trabajo</li>
                <li>Zona de actividad (aeropuerto, centro, hoteles)</li>
                <li>Experiencia profesional</li>
                <li>Conocimiento del callejero de Palma</li>
              </BulletList>
            </Section>

            {/* TABLA */}
            <Section>
              <SectionTitle>Factores clave de rentabilidad</SectionTitle>

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
                      <Td>Verano</Td>
                      <Td>Alta demanda → más ingresos</Td>
                    </Tr>
                    <Tr>
                      <Td>Aeropuerto</Td>
                      <Td>Zona clave de trabajo</Td>
                    </Tr>
                    <Tr>
                      <Td>Noches</Td>
                      <Td>Mayor rotación de servicios</Td>
                    </Tr>
                    <Tr>
                      <Td>Experiencia</Td>
                      <Td>Mejor rendimiento diario</Td>
                    </Tr>
                  </tbody>
                </Table>
              </TableWrap>
            </Section>

            {/* VIVIR DEL TAXI */}
            <Section>
              <SectionTitle>
                ¿Se puede vivir del taxi en Mallorca?
              </SectionTitle>

              <Paragraph>
                Sí, muchas personas viven del taxi en Palma de Mallorca, pero no
                es una actividad pasiva. Requiere constancia, organización y
                conocimiento del entorno.
              </Paragraph>
            </Section>

            {/* DECISIÓN */}
            <Section>
              <SectionTitle>
                ¿Merece la pena ser taxista en Palma?
              </SectionTitle>

              <Paragraph>
                Para muchas personas sí, especialmente en una ciudad turística
                como Palma. Sin embargo, es importante entender todo el proceso
                antes de empezar.
              </Paragraph>

              <Paragraph>
                Antes de tomar la decisión, revisa los{" "}
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
              <CTATitle>Empieza con ventaja</CTATitle>

              <CTAParagraph>
                Si quieres entrar en el sector, lo más importante es prepararte
                bien desde el principio.
              </CTAParagraph>

              <CTAButtons>
                <PrimaryLink to="/test-taxista-palma">
                  Practicar test
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
                    ¿Cuánto gana un taxista en Palma al mes?
                  </FaqQuestion>
                  <FaqAnswer>
                    Entre 2000€ y 3000€, dependiendo de la temporada y el trabajo.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>
                    ¿Se gana más en verano?
                  </FaqQuestion>
                  <FaqAnswer>
                    Sí, el turismo incrementa la demanda.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>
                    ¿Es importante conocer Palma?
                  </FaqQuestion>
                  <FaqAnswer>
                    Mucho. Mejora el rendimiento y los ingresos.
                  </FaqAnswer>
                </FaqItem>
              </FaqWrap>
            </Section>

            {/* RELATED */}
            <RelatedSection>
              <SectionTitle>Seguir leyendo</SectionTitle>

              <RelatedGrid>
                <RelatedCard to="/requisitos-taxista-palma">
                  <RelatedTitle>Requisitos taxista Palma</RelatedTitle>
                </RelatedCard>

                <RelatedCard to="/cuanto-cuesta-licencia-taxi-palma">
                  <RelatedTitle>Precio licencia taxi</RelatedTitle>
                </RelatedCard>

                <RelatedCard to="/examen-taxista-mallorca">
                  <RelatedTitle>Examen taxi Mallorca</RelatedTitle>
                </RelatedCard>
              </RelatedGrid>
            </RelatedSection>

          </Content>
        </Wrapper>
      </Page>
    </>
  );
}