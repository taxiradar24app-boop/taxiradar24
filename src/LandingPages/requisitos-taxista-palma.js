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

export default function RequisitosTaxistaPalma() {
  const canonicalUrl = "https://taxiradar24.com/requisitos-taxista-palma";

  const title =
    "Requisitos para ser taxista en Palma de Mallorca (Guía oficial 2026)";

  const description =
    "Guía oficial para obtener el carnet de taxista en Palma: requisitos reales, examen, documentación, dificultad y cómo aprobar a la primera.";

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
              Requisitos oficiales para obtener el carnet de taxista en Palma de Mallorca
            </Title>

            <Lead>
              Para ejercer como conductor de autotaxi en Palma es obligatorio superar un proceso regulado por el Ayuntamiento, que incluye requisitos de acceso, inscripción al examen y acreditaciones oficiales.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Requisito clave</SnippetLabel>
              <SnippetText>
                Es imprescindible disponer de permiso de conducción tipo B con al menos un año de experiencia, acreditar el nivel de catalán oral y superar el examen oficial.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* BLOQUE INTENCIÓN REAL */}
            <Section>
              <SectionTitle>
                Qué necesitas realmente para ser taxista en Palma
              </SectionTitle>

              <Paragraph>
                Para obtener el carnet de taxista en Palma no basta con cumplir requisitos administrativos. El proceso incluye normativa, acreditaciones oficiales y la superación del{" "}
                <InlineLink to="/examen-taxista-mallorca">
                  examen de taxista en Mallorca
                </InlineLink>.
              </Paragraph>

              <Paragraph>
                El verdadero filtro del proceso es el examen, donde se evalúa el conocimiento real del aspirante.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Resumen real</SnippetLabel>
                <SnippetText>
                  Cumplir requisitos es solo el primer paso. La clave está en preparar el examen correctamente.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* REQUISITOS */}
            <Section>
              <SectionTitle>
                Requisitos oficiales de acceso al examen
              </SectionTitle>

              <BulletList>
                <li>Permiso de conducción B con mínimo 1 año</li>
                <li>Acreditación de catalán oral</li>
                <li>Sin antecedentes penales</li>
                <li>Sin delitos de naturaleza sexual</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Punto crítico</SnippetLabel>
                <SnippetText>
                  Sin el nivel de catalán o la experiencia mínima de conducción, no puedes acceder al examen.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* INSCRIPCIÓN */}
            <Section>
              <SectionTitle>
                Procedimiento de inscripción al examen
              </SectionTitle>

              <Paragraph>
                El plazo de inscripción se abre tras la convocatoria oficial y finaliza un mes antes del examen.
              </Paragraph>

              <BulletList>
                <li>DNI / NIE / Pasaporte</li>
                <li>Permiso de conducir</li>
                <li>Pago de tasa</li>
                <li>Acreditación de catalán</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Importante</SnippetLabel>
                <SnippetText>
                  Fuera de plazo o sin documentación → exclusión automática.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* CATALÁN */}
            <Section>
              <SectionTitle>
                Acreditación del catalán
              </SectionTitle>

              <BulletList>
                <li>Certificado oficial</li>
                <li>Titulación académica (ESO/Bach)</li>
                <li>Prueba oficial del Ayuntamiento</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Punto clave</SnippetLabel>
                <SnippetText>
                  El catalán es obligatorio, no es opcional.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* EXAMEN */}
            <Section>
              <SectionTitle>
                Cómo es el examen de taxista en Palma
              </SectionTitle>

              <Paragraph>
                Se convoca dos veces al año (febrero y noviembre).
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Frecuencia</SnippetLabel>
                <SnippetText>
                  Solo hay dos oportunidades al año → cada intento cuenta.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* DIFICULTAD */}
            <Section>
              <SectionTitle>
                Dificultad real del examen
              </SectionTitle>

              <Paragraph>
                Muchos aspirantes no aprueban en su primer intento.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Realidad</SnippetLabel>
                <SnippetText>
                  El mayor error es presentarse sin preparación específica.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* DOCUMENTACIÓN FINAL */}
            <Section>
              <SectionTitle>
                Documentación para obtener el carnet
              </SectionTitle>

              <BulletList>
                <li>Foto carnet</li>
                <li>Antecedentes penales</li>
                <li>Certificado delitos sexuales</li>
                <li>Certificado médico</li>
                <li>Pago de tasa</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Condición crítica</SnippetLabel>
                <SnippetText>
                  El aprobado caduca en 1 año si no completas el proceso.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* ERRORES */}
            <Section>
              <SectionTitle>
                Errores comunes
              </SectionTitle>

              <BulletList>
                <li>No preparar el examen</li>
                <li>Subestimar la dificultad</li>
                <li>No dominar callejero</li>
                <li>Fallar en plazos</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Error frecuente</SnippetLabel>
                <SnippetText>
                  Presentarse sin preparación es el principal motivo de suspenso.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Prepárate con ventaja</CTATitle>

              <CTAParagraph>
                Practica con preguntas reales y mejora tus probabilidades de aprobar.
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
                  <FaqQuestion>¿Es difícil el examen?</FaqQuestion>
                  <FaqAnswer>
                    Sí, requiere preparación específica.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>¿Cuántas convocatorias hay?</FaqQuestion>
                  <FaqAnswer>
                    Dos al año.
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