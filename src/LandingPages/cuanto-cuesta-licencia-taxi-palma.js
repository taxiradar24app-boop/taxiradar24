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
  MicroHighlight,
  CheckList,
} from "./LandigPagesStyle";

export default function CuantoCuestaLicenciaTaxiPalma() {
  const canonicalUrl =
    "https://taxiradar24.com/cuanto-cuesta-licencia-taxi-palma";

  const title =
    "Precio licencia taxi Palma: cuánto cuesta realmente (2026)";

  const description =
    "Descubre cuánto cuesta una licencia de taxi en Palma, por qué es cara y si necesitas comprarla para empezar a trabajar.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Page>
        <Wrapper>

          {/* HERO */}
          <Hero>
            <Eyebrow>TaxiRadar24</Eyebrow>

            <Title>
              Precio de una licencia de taxi en Palma
            </Title>

            <Lead>
              Comprar una licencia de taxi en Palma puede costar entre{" "}
              <strong>110.000 € y más de 140.000 €</strong>.
            </Lead>

            <SnippetBox>
              <SnippetText>
                👉 Pero hay algo importante: no necesitas comprar una licencia para empezar a trabajar.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* BLOQUE CLAVE */}
            <Section>
              <SectionTitle>
                Lo que debes saber antes de pensar en comprar una licencia
              </SectionTitle>

              <Paragraph>
                Mucha gente piensa que necesita comprar una licencia para trabajar como taxista.
              </Paragraph>

              <Paragraph>
                Pero no es así.
              </Paragraph>

              <MicroHighlight>
                👉 Primero necesitas el carnet municipal.
              </MicroHighlight>

              <CheckList>
                <li>El carnet te permite trabajar</li>
                <li>La licencia es una inversión</li>
                <li>Puedes trabajar sin comprarla</li>
              </CheckList>
            </Section>

            {/* PRECIO */}
            <Section>
              <SectionTitle>
                Cuánto cuesta realmente una licencia de taxi
              </SectionTitle>

              <Paragraph>
                El precio no es fijo. Se basa en el mercado de traspaso.
              </Paragraph>

              <BulletList>
                <li>110.000 € → precios bajos</li>
                <li>120.000 € → media habitual</li>
                <li>140.000 €+ → operaciones completas</li>
              </BulletList>

              <SnippetBox>
                <SnippetText>
                  👉 Estás comprando un negocio, no solo un permiso.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* POR QUÉ ES CARA */}
            <Section>
              <SectionTitle>
                Por qué las licencias son tan caras
              </SectionTitle>

              <BulletList>
                <li>Número limitado de licencias</li>
                <li>Alta demanda en Palma</li>
                <li>Potencial de ingresos</li>
                <li>Ciudad turística</li>
              </BulletList>
            </Section>

            {/* TABLA */}
            <Section>
              <SectionTitle>Factores de precio</SectionTitle>

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
                      <Td>Demanda alta</Td>
                      <Td>Sube el precio</Td>
                    </Tr>
                    <Tr>
                      <Td>Vehículo incluido</Td>
                      <Td>Aumenta valor</Td>
                    </Tr>
                    <Tr>
                      <Td>Temporada alta</Td>
                      <Td>Más compradores</Td>
                    </Tr>
                  </tbody>
                </Table>
              </TableWrap>
            </Section>

            {/* GASTOS */}
            <Section>
              <SectionTitle>
                Gastos adicionales
              </SectionTitle>

              <BulletList>
                <li>Vehículo</li>
                <li>Seguro</li>
                <li>Mantenimiento</li>
                <li>Tasas</li>
              </BulletList>
            </Section>

            {/* DECISIÓN */}
            <Section>
              <SectionTitle>
                ¿Merece la pena comprar una licencia?
              </SectionTitle>

              <Paragraph>
                Depende de tu objetivo.
              </Paragraph>

              <CheckList>
                <li>Si quieres trabajar → necesitas carnet</li>
                <li>Si quieres invertir → licencia</li>
              </CheckList>

              <MicroHighlight>
                👉 La mayoría empieza trabajando, no comprando.
              </MicroHighlight>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Empieza por el carnet, no por la inversión</CTATitle>

              <CTAParagraph>
                Aprende el proceso completo antes de tomar decisiones grandes.
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
                  <FaqQuestion>¿Necesito licencia para empezar?</FaqQuestion>
                  <FaqAnswer>No. Necesitas el carnet.</FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>¿Se puede trabajar sin comprar?</FaqQuestion>
                  <FaqAnswer>Sí, trabajando para un titular.</FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>¿Es rentable?</FaqQuestion>
                  <FaqAnswer>Depende del trabajo y la temporada.</FaqAnswer>
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

                <RelatedCard to="/cuanto-gana-un-taxista-en-mallorca">
                  <RelatedTitle>Cuánto se gana</RelatedTitle>
                </RelatedCard>
              </RelatedGrid>
            </RelatedSection>

          </Content>
        </Wrapper>
      </Page>
    </>
  );
}