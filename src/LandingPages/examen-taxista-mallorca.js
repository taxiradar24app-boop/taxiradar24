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
    "Examen taxi Palma de Mallorca: cómo es, inscripción y proceso completo (2026)";

  const description =
    "Guía completa del examen de taxista en Palma: cómo es, convocatoria, inscripción, requisitos y cómo aprobar a la primera.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo es el examen de taxista en Palma de Mallorca?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El examen se divide en dos partes: una primera parte eliminatoria de callejero y test, y una segunda parte de rutas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuántas convocatorias hay?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Se realizan dos convocatorias al año, normalmente en febrero y noviembre.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto dura el examen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La duración aproximada es de 90 minutos.",
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
            <CrumbCurrent>Examen taxi Palma</CrumbCurrent>
          </Breadcrumbs>

          {/* HERO */}
          <Hero>
            <Eyebrow>Guía TaxiRadar24</Eyebrow>

            <Title>
              Examen taxi Palma de Mallorca: cómo es y cómo aprobarlo
            </Title>

            <Lead>
              El examen de taxista en Palma es el paso clave para obtener el
              carnet municipal. Entender su estructura, proceso e inscripción
              es fundamental para aprobar a la primera.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Resumen rápido</SnippetLabel>
              <SnippetText>
                El examen tiene dos partes: una primera eliminatoria de test y
                callejero, y una segunda de rutas. Si no superas la primera, la
                segunda no se corrige.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* PROCESO */}
            <Section>
              <SectionTitle>
                Proceso completo del examen de taxista en Palma
              </SectionTitle>

              <Paragraph>
                El examen de taxi en Palma forma parte de un proceso oficial que
                incluye convocatoria, inscripción, realización del examen y
                validación final.
              </Paragraph>

              <Paragraph>
                Se convoca dos veces al año (febrero y noviembre) y la información
                oficial se publica en la web del Ayuntamiento (Mobipalma).
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Importante</SnippetLabel>
                <SnippetText>
                  Solo hay dos oportunidades al año → cada intento cuenta.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* INSCRIPCIÓN */}
            <Section>
              <SectionTitle>
                Cómo inscribirse al examen taxi Palma
              </SectionTitle>

              <Paragraph>
                El plazo de inscripción comienza tras la convocatoria oficial y
                finaliza aproximadamente un mes antes del examen.
              </Paragraph>

              <BulletList>
                <li>DNI / NIE o pasaporte</li>
                <li>Permiso de conducir</li>
                <li>Pago de tasa</li>
                <li>Acreditación de catalán</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Atención</SnippetLabel>
                <SnippetText>
                  Fuera de plazo o sin documentación → exclusión automática.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* ESTRUCTURA */}
            <Section>
              <SectionTitle>
                Cómo es el examen de taxista en Palma
              </SectionTitle>

              <BulletList>
                <li>Primera parte: test + callejero (eliminatoria)</li>
                <li>Segunda parte: rutas</li>
              </BulletList>

              <Paragraph>
                La primera parte es el mayor filtro. Solo si la apruebas, se
                corrige la segunda.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Clave</SnippetLabel>
                <SnippetText>
                  La mayoría suspende por no preparar correctamente el test y el callejero.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* RESULTADOS */}
            <Section>
              <SectionTitle>
                Resultados y revisión del examen
              </SectionTitle>

              <Paragraph>
                Se publica una plantilla provisional con 3 días para alegaciones,
                seguida de la lista definitiva de aptos y no aptos.
              </Paragraph>
            </Section>

            {/* CARNET */}
            <Section>
              <SectionTitle>
                Qué hacer después de aprobar el examen
              </SectionTitle>

              <BulletList>
                <li>Certificado de antecedentes penales</li>
                <li>Certificado delitos sexuales</li>
                <li>Certificado médico</li>
                <li>Fotografía carnet</li>
                <li>Pago de tasa</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Muy importante</SnippetLabel>
                <SnippetText>
                  El aprobado caduca en 1 año si no completas el proceso.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Prepárate para aprobar el examen</CTATitle>

              <CTAParagraph>
                Practica con test reales y mejora tus probabilidades de éxito.
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
                  <FaqQuestion>¿Cuántas convocatorias hay?</FaqQuestion>
                  <FaqAnswer>
                    Dos al año, normalmente en febrero y noviembre.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>¿Es difícil el examen?</FaqQuestion>
                  <FaqAnswer>
                    Sí, requiere preparación específica.
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