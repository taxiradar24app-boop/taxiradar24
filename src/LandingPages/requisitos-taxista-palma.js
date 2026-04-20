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
} from "./LandigPagesStyle";

import { Link as InlineLink } from "react-router-dom";

export default function RequisitosTaxistaPalma() {
  const canonicalUrl = "https://taxiradar24.com/requisitos-taxista-palma";

  const title =
    "Requisitos para ser taxista en Palma de Mallorca (Carnet y examen 2026)";

  const description =
    "Todo lo que necesitas para obtener el carnet de taxista en Palma: requisitos, examen, inscripción, documentación y cómo aprobar a la primera.";

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
              Requisitos para ser taxista
            </CrumbCurrent>
          </Breadcrumbs>

          {/* HERO */}
          <Hero>
            <Eyebrow>Guía Oficial TaxiRadar24</Eyebrow>

            <Title>
              Requisitos para obtener el carnet de taxista en Palma de Mallorca
            </Title>

            <Lead>
              Para trabajar como taxista en Palma es necesario cumplir requisitos
              oficiales, inscribirse al examen municipal y superar una prueba
              exigente que determina quién puede ejercer la profesión.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Clave</SnippetLabel>
              <SnippetText>
                El mayor filtro no son los requisitos, es el examen. Prepararlo
                correctamente marca la diferencia.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* PROCESO */}
            <Section>
              <SectionTitle>
                Proceso completo para obtener la licencia de taxi en Palma
              </SectionTitle>

              <Paragraph>
                Aunque muchos lo llaman “carnet de taxista”, en Palma de Mallorca
                el proceso consiste en obtener un permiso municipal tras superar
                un examen oficial y cumplir todos los requisitos exigidos.
              </Paragraph>

              <Paragraph>
                El examen se convoca dos veces al año, normalmente en febrero y
                noviembre, y toda la información se publica en la web oficial del
                Ayuntamiento.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Importante</SnippetLabel>
                <SnippetText>
                  Solo hay dos oportunidades al año para presentarse al examen.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* REQUISITOS */}
            <Section>
              <SectionTitle>
                Requisitos para acceder al examen de taxista en Palma
              </SectionTitle>

              <BulletList>
                <li>Permiso de conducir clase B con al menos 1 año</li>
                <li>Nivel de catalán oral suficiente</li>
                <li>Sin antecedentes penales</li>
                <li>Sin delitos de naturaleza sexual</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Condición obligatoria</SnippetLabel>
                <SnippetText>
                  Si no cumples estos requisitos, no podrás acceder al examen.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* INSCRIPCIÓN */}
            <Section>
              <SectionTitle>
                Cómo inscribirse al examen de taxi en Palma
              </SectionTitle>

              <Paragraph>
                El plazo de inscripción comienza tras la convocatoria oficial y
                finaliza aproximadamente un mes antes del examen.
              </Paragraph>

              <BulletList>
                <li>DNI, NIE o pasaporte en vigor</li>
                <li>Permiso de conducir</li>
                <li>Pago de la tasa de examen</li>
                <li>Acreditación del nivel de catalán</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Atención</SnippetLabel>
                <SnippetText>
                  Solicitudes fuera de plazo o incompletas quedan excluidas automáticamente.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* EXAMEN */}
            <Section>
              <SectionTitle>
                Cómo es el examen de taxista en Palma de Mallorca
              </SectionTitle>

              <Paragraph>
                El examen tiene una duración aproximada de 1 hora y media y
                evalúa conocimientos sobre normativa, callejero y funcionamiento
                del servicio de taxi.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Realidad</SnippetLabel>
                <SnippetText>
                  Muchos aspirantes suspenden por no practicar con test y simuladores reales.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* RESULTADOS */}
            <Section>
              <SectionTitle>
                Resultados del examen
              </SectionTitle>

              <Paragraph>
                Se publica una plantilla provisional con un plazo de 3 días para
                alegaciones, seguido de la lista definitiva de aptos y no aptos.
              </Paragraph>
            </Section>

            {/* DOCUMENTACIÓN */}
            <Section>
              <SectionTitle>
                Documentación para obtener el carnet de taxista
              </SectionTitle>

              <BulletList>
                <li>Fotografía tipo carnet</li>
                <li>Certificado de antecedentes penales</li>
                <li>Certificado de delitos sexuales</li>
                <li>Certificado médico oficial</li>
                <li>Pago de la tasa</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Importante</SnippetLabel>
                <SnippetText>
                  El aprobado caduca en 1 año si no completas el proceso.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Prepárate para aprobar</CTATitle>

              <CTAParagraph>
                Practica con test reales y simulador de examen para aumentar tus
                probabilidades de éxito.
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
                  <FaqQuestion>¿Cuántas convocatorias hay?</FaqQuestion>
                  <FaqAnswer>
                    Dos al año, normalmente en febrero y noviembre.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>¿Es difícil el examen?</FaqQuestion>
                  <FaqAnswer>
                    Sí, requiere preparación específica y práctica.
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