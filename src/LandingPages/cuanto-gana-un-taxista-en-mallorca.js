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
    "¿Cuánto gana un taxista en Palma de Mallorca? Sueldo real, ingresos y cuánto se gana (2026)";

  const description =
    "Descubre cuánto gana un taxista en Palma: ingresos reales, sueldo mensual, cuánto se gana en verano y si merece la pena trabajar en el taxi en Mallorca.";

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

          {/* HERO */}
          <Hero>
            <Eyebrow>Guía TaxiRadar24</Eyebrow>

            <Title>
              ¿Cuánto gana un taxista en Palma de Mallorca?
            </Title>

            <Lead>
              El sueldo de un taxista en Palma de Mallorca puede situarse entre{" "}
              <strong>2000€ y 3000€ al mes</strong>, aunque en temporada alta puede
              ser superior. Todo depende de cómo trabajes, cuándo trabajes y dónde.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Respuesta rápida</SnippetLabel>
              <SnippetText>
                En verano un taxista puede ganar bastante más que en invierno,
                especialmente trabajando en aeropuerto y zonas turísticas.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* BLOQUE SEO FUERTE */}
            <Section>
              <SectionTitle>
                Sueldo de un taxista en Palma de Mallorca: ingresos reales
              </SectionTitle>

              <Paragraph>
                Muchas personas buscan cuánto gana un taxista en Palma y la realidad
                es que no existe un sueldo fijo. Los ingresos dependen directamente
                de la actividad, los turnos y la temporada.
              </Paragraph>

              <Paragraph>
                En condiciones normales, un taxista en Mallorca puede generar entre
                2000€ y 3000€ al mes, aunque en verano los ingresos pueden ser más altos.
              </Paragraph>
            </Section>

            {/* NUEVO BLOQUE SEO */}
            <Section>
              <SectionTitle>
                ¿Cuánto gana un taxista en Palma en verano?
              </SectionTitle>

              <Paragraph>
                Durante la temporada turística, Palma recibe millones de visitantes,
                lo que incrementa la demanda de taxis.
              </Paragraph>

              <Paragraph>
                En este periodo, muchos taxistas concentran su actividad en el aeropuerto,
                hoteles y zonas de alta rotación, aumentando significativamente sus ingresos.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Clave</SnippetLabel>
                <SnippetText>
                  El verano es donde realmente se gana dinero en el taxi en Mallorca.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* AEROPUERTO */}
            <Section>
              <SectionTitle>
                ¿Cuánto gana un taxista en el aeropuerto de Palma?
              </SectionTitle>

              <Paragraph>
                El aeropuerto es uno de los puntos más rentables del trabajo diario.
              </Paragraph>

              <Paragraph>
                Los servicios suelen ser más largos y constantes, lo que permite
                aumentar la facturación diaria.
              </Paragraph>
            </Section>

            {/* FACTORES */}
            <Section>
              <SectionTitle>
                Factores que influyen en cuánto gana un taxista
              </SectionTitle>

              <BulletList>
                <li>Temporada (verano vs invierno)</li>
                <li>Turnos (día o noche)</li>
                <li>Zona de trabajo</li>
                <li>Experiencia</li>
                <li>Conocimiento de Palma</li>
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
                      <Td>Servicios más largos</Td>
                    </Tr>
                    <Tr>
                      <Td>Noches</Td>
                      <Td>Mayor rotación</Td>
                    </Tr>
                  </tbody>
                </Table>
              </TableWrap>
            </Section>

            {/* DECISIÓN */}
            <Section>
              <SectionTitle>
                ¿Merece la pena ser taxista en Palma de Mallorca?
              </SectionTitle>

              <Paragraph>
                Sí, pero no es automático. Es una profesión activa que requiere
                dedicación, estrategia y conocimiento del entorno.
              </Paragraph>

              <Paragraph>
                Antes de empezar, revisa los{" "}
                <InlineLink to="/requisitos-taxista-palma">
                  requisitos para ser taxista
                </InlineLink>{" "}
                y cómo es el{" "}
                <InlineLink to="/examen-taxista-mallorca">
                  examen de taxi en Palma
                </InlineLink>.
              </Paragraph>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Empieza con ventaja</CTATitle>

              <CTAParagraph>
                Si quieres entrar en el sector, prepárate desde el principio.
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
                    Entre 2000€ y 3000€, dependiendo del trabajo y la temporada.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>
                    ¿Se gana más en verano?
                  </FaqQuestion>
                  <FaqAnswer>
                    Sí, es cuando hay más demanda.
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