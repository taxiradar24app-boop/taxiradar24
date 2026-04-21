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
  MicroHighlight,
  CheckList,
} from "./LandigPagesStyle";

export default function CuantoGanaUnTaxistaEnMallorca() {
  const canonicalUrl =
    "https://taxiradar24.com/cuanto-gana-un-taxista-en-mallorca";

  const title =
    "Cuánto gana un taxista en Palma: ingresos reales (2026)";

  const description =
    "Descubre cuánto gana un taxista en Palma de Mallorca, ingresos reales por temporada y si merece la pena trabajar en el taxi.";

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
              Cuánto gana un taxista
            </CrumbCurrent>
          </Breadcrumbs>

          {/* HERO */}
          <Hero>
            <Eyebrow>TaxiRadar24</Eyebrow>

            <Title>
              Cuánto gana un taxista en Palma de Mallorca
            </Title>

            <Lead>
              Un taxista en Palma puede ganar entre{" "}
              <strong>2000€ y 3000€ al mes</strong>…  
              pero la diferencia real está en cómo trabajas.
            </Lead>

            <SnippetBox>
              <SnippetText>
                👉 En verano, los ingresos pueden ser mucho mayores.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* REALIDAD */}
            <Section>
              <SectionTitle>La realidad del dinero en el taxi</SectionTitle>

              <Paragraph>
                No existe un sueldo fijo.
              </Paragraph>

              <Paragraph>
                Tú decides cuánto ganas.
              </Paragraph>

              <MicroHighlight>
                👉 No gana más el que trabaja más horas, sino el que trabaja mejor.
              </MicroHighlight>

              <CheckList>
                <li>Dónde trabajas</li>
                <li>Cuándo trabajas</li>
                <li>Cómo te mueves por Palma</li>
              </CheckList>
            </Section>

            {/* VERANO */}
            <Section>
              <SectionTitle>Verano: donde se gana dinero</SectionTitle>

              <Paragraph>
                Palma es una ciudad turística.
              </Paragraph>

              <Paragraph>
                En verano, la demanda se dispara.
              </Paragraph>

              <MicroHighlight>
                👉 Aquí es donde muchos taxistas hacen la diferencia del año.
              </MicroHighlight>
            </Section>

            {/* AEROPUERTO */}
            <Section>
              <SectionTitle>Aeropuerto: punto clave</SectionTitle>

              <Paragraph>
                El aeropuerto concentra la mayor parte del movimiento.
              </Paragraph>

              <CheckList>
                <li>Servicios largos</li>
                <li>Clientes constantes</li>
                <li>Alta rotación</li>
              </CheckList>
            </Section>

            {/* FACTORES */}
            <Section>
              <SectionTitle>Factores que cambian tus ingresos</SectionTitle>

              <BulletList>
                <li>Temporada</li>
                <li>Turnos</li>
                <li>Zona</li>
                <li>Experiencia</li>
                <li>Conocimiento de Palma</li>
              </BulletList>
            </Section>

            {/* TABLA */}
            <Section>
              <SectionTitle>Claves de rentabilidad</SectionTitle>

              <TableWrap>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Factor</Th>
                      <Th>Resultado</Th>
                    </Tr>
                  </Thead>
                  <tbody>
                    <Tr>
                      <Td>Verano</Td>
                      <Td>Más ingresos</Td>
                    </Tr>
                    <Tr>
                      <Td>Aeropuerto</Td>
                      <Td>Más facturación</Td>
                    </Tr>
                    <Tr>
                      <Td>Experiencia</Td>
                      <Td>Mejores decisiones</Td>
                    </Tr>
                  </tbody>
                </Table>
              </TableWrap>
            </Section>

            {/* DECISIÓN */}
            <Section>
              <SectionTitle>¿Merece la pena?</SectionTitle>

              <Paragraph>
                Sí, pero no es automático.
              </Paragraph>

              <Paragraph>
                Es una profesión activa donde tú controlas el resultado.
              </Paragraph>

              <MicroHighlight>
                👉 Si lo haces bien, puede ser muy rentable.
              </MicroHighlight>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Empieza con una base sólida</CTATitle>

              <CTAParagraph>
                Si quieres entrar en el sector, empieza por el carnet.
              </CTAParagraph>

              <CTAButtons>
                <PrimaryLink to="/guia-taxista-mallorca">
                  Ver guía completa
                </PrimaryLink>
                <SecondaryLink to="/test-taxista-palma">
                  Practicar examen
                </SecondaryLink>
              </CTAButtons>
            </CTABox>

            {/* FAQ */}
            <Section>
              <SectionTitle>Preguntas frecuentes</SectionTitle>

              <FaqWrap>
                <FaqItem>
                  <FaqQuestion>¿Cuánto se gana al mes?</FaqQuestion>
                  <FaqAnswer>
                    Entre 2000€ y 3000€, dependiendo del trabajo.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>¿Se gana más en verano?</FaqQuestion>
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
                <RelatedCard to="/guia-taxista-mallorca">
                  <RelatedTitle>Cómo ser taxista</RelatedTitle>
                </RelatedCard>

                <RelatedCard to="/requisitos-taxista-palma">
                  <RelatedTitle>Requisitos</RelatedTitle>
                </RelatedCard>

                <RelatedCard to="/test-taxista-palma">
                  <RelatedTitle>Practicar test</RelatedTitle>
                </RelatedCard>
              </RelatedGrid>
            </RelatedSection>

          </Content>
        </Wrapper>
      </Page>
    </>
  );
}