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
  MicroHighlight,
  CheckList,
} from "./LandigPagesStyle";

export default function ExamenTaxistaMallorca() {
  const canonicalUrl = "https://taxiradar24.com/examen-taxista-mallorca";

  const title =
    "Examen taxi Palma: cómo es realmente y qué necesitas para aprobar (2026)";

  const description =
    "Descubre cómo es el examen de taxista en Palma, su estructura real y qué necesitas para aprobar a la primera.";

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
            <CrumbCurrent>Examen taxi Palma</CrumbCurrent>
          </Breadcrumbs>

          {/* HERO */}
          <Hero>
            <Eyebrow>TaxiRadar24</Eyebrow>

            <Title>
              Cómo es el examen de taxista en Palma
            </Title>

            <Lead>
              El examen es el paso que decide si trabajas o no.
              No es complicado… pero sí exigente.
            </Lead>

            <SnippetBox>
              <SnippetText>
                👉 La mayoría no suspende por no saber… suspende por no entrenar.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* REALIDAD */}
            <Section>
              <SectionTitle>La realidad del examen</SectionTitle>

              <Paragraph>
                Cada convocatoria deja fuera a muchos aspirantes.
              </Paragraph>

              <Paragraph>
                No porque sea imposible.
              </Paragraph>

              <MicroHighlight>
                👉 Porque no entienden cómo funciona realmente.
              </MicroHighlight>

              <CheckList>
                <li>No practican test</li>
                <li>No entrenan callejero con tiempo</li>
                <li>No conocen el formato real</li>
              </CheckList>
            </Section>

            {/* ESTRUCTURA */}
            <Section>
              <SectionTitle>Estructura del examen</SectionTitle>

              <BulletList>
                <li>Primera parte → test + callejero (eliminatoria)</li>
                <li>Segunda parte → rutas</li>
              </BulletList>

              <Paragraph>
                La primera parte decide todo.
              </Paragraph>

              <MicroHighlight>
                👉 Si no la apruebas, la segunda no cuenta.
              </MicroHighlight>
            </Section>

            {/* CONVOCATORIA */}
            <Section>
              <SectionTitle>Convocatorias</SectionTitle>

              <Paragraph>
                El examen se convoca dos veces al año.
              </Paragraph>

              <CheckList>
                <li>Febrero</li>
                <li>Noviembre</li>
              </CheckList>

              <MicroHighlight>
                👉 Solo tienes dos oportunidades al año.
              </MicroHighlight>
            </Section>

            {/* INSCRIPCIÓN */}
            <Section>
              <SectionTitle>Inscripción</SectionTitle>

              <BulletList>
                <li>DNI / NIE</li>
                <li>Permiso de conducir</li>
                <li>Pago de tasa</li>
                <li>Catalán (si aplica)</li>
              </BulletList>

              <MicroHighlight>
                👉 Solicitudes fuera de plazo quedan fuera automáticamente.
              </MicroHighlight>
            </Section>

            {/* RESULTADOS */}
            <Section>
              <SectionTitle>Resultados</SectionTitle>

              <Paragraph>
                Primero se publica una plantilla provisional.
              </Paragraph>

              <Paragraph>
                Después, lista definitiva.
              </Paragraph>
            </Section>

            {/* DESPUÉS */}
            <Section>
              <SectionTitle>Después de aprobar</SectionTitle>

              <BulletList>
                <li>Antecedentes penales</li>
                <li>Certificado médico</li>
                <li>Foto carnet</li>
                <li>Pago de tasas</li>
              </BulletList>

              <MicroHighlight>
                👉 El aprobado no dura para siempre.
              </MicroHighlight>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Ahora ya sabes cómo es el examen</CTATitle>

              <CTAParagraph>
                El siguiente paso es prepararlo correctamente.
              </CTAParagraph>

              <CTAButtons>
                <PrimaryLink to="/test-taxista-palma">
                  Practicar test
                </PrimaryLink>
                <SecondaryLink to="/como-aprobar-examen-taxista-palma">
                  Cómo aprobar
                </SecondaryLink>
              </CTAButtons>
            </CTABox>

            {/* FAQ */}
            <Section>
              <SectionTitle>Preguntas frecuentes</SectionTitle>

              <FaqWrap>
                <FaqItem>
                  <FaqQuestion>¿Es difícil?</FaqQuestion>
                  <FaqAnswer>
                    Sí, si no entrenas.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>¿Cuánto dura?</FaqQuestion>
                  <FaqAnswer>
                    Aproximadamente 90 minutos.
                  </FaqAnswer>
                </FaqItem>
              </FaqWrap>
            </Section>

          </Content>
        </Wrapper>
      </Page>
    </>
  );
}