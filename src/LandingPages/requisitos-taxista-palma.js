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
  CheckList,
  MicroHighlight,
  MiniLead,
} from "./LandigPagesStyle";

export default function RequisitosTaxistaPalma() {
  const canonicalUrl = "https://taxiradar24.com/requisitos-taxista-palma";

  const title =
    "Requisitos para ser taxista en Palma de Mallorca (Carnet municipal 2026)";

  const description =
    "Requisitos reales para obtener el carnet de taxista en Palma: permiso de conducir, catalán, examen y documentación. Guía clara y actualizada.";

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
            <Eyebrow>TaxiRadar24</Eyebrow>

            <Title>
              Requisitos para ser taxista en Palma de Mallorca
            </Title>

            <Lead>
              Antes de presentarte al examen necesitas cumplir unas condiciones
              básicas. Aquí tienes el filtro real: si puedes acceder o no al carnet municipal.
            </Lead>

            <SnippetBox>
              <SnippetText>
                👉 Si no cumples estos requisitos, no podrás presentarte al examen.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* CHECK RÁPIDO */}
            <Section>
              <SectionTitle>¿Puedes presentarte al examen?</SectionTitle>

              <MiniLead>
                Comprueba en 30 segundos si cumples lo necesario:
              </MiniLead>

              <CheckList>
                <li>Permiso de conducir B con mínimo 1 año</li>
                <li>Puedes acreditar nivel de catalán oral</li>
                <li>No tienes antecedentes penales</li>
                <li>No tienes delitos de carácter sexual</li>
              </CheckList>

              <MicroHighlight>
                👉 Si cumples estos 4 puntos, puedes presentarte.
              </MicroHighlight>
            </Section>

            {/* EXPLICACIÓN REAL */}
            <Section>
              <SectionTitle>Requisitos explicados sin rodeos</SectionTitle>

              <Paragraph>
                Estos son los puntos que el Ayuntamiento exige para acceder al examen.
              </Paragraph>

              <BulletList>
                <li>
                  <strong>Permiso de conducir:</strong> mínimo clase B con 1 año de experiencia.
                </li>
                <li>
                  <strong>Catalán oral:</strong> puedes acreditarlo con título o mediante prueba.
                </li>
                <li>
                  <strong>Antecedentes:</strong> no puedes tener antecedentes penales ni delitos sexuales.
                </li>
              </BulletList>

              <SnippetBox>
                <SnippetText>
                  👉 Los certificados suelen pedirse después de aprobar el examen.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* INSCRIPCIÓN */}
            <Section>
              <SectionTitle>Cómo inscribirte al examen</SectionTitle>

              <Paragraph>
                Cuando se abre la convocatoria, tienes un plazo limitado para presentar la solicitud.
              </Paragraph>

              <CheckList>
                <li>DNI, NIE o pasaporte</li>
                <li>Permiso de conducir</li>
                <li>Pago de la tasa de examen</li>
                <li>Documento de catalán (si aplica)</li>
              </CheckList>

              <MicroHighlight>
                👉 Solicitudes incompletas o fuera de plazo quedan fuera automáticamente.
              </MicroHighlight>
            </Section>

            {/* EXAMEN */}
            <Section>
              <SectionTitle>El verdadero filtro: el examen</SectionTitle>

              <Paragraph>
                Cumplir los requisitos solo te permite entrar.
              </Paragraph>

              <Paragraph>
                Lo que realmente decide si trabajas o no es el examen municipal.
              </Paragraph>

              <MicroHighlight>
                👉 La mayoría suspende por no practicar correctamente.
              </MicroHighlight>
            </Section>

            {/* DOCUMENTACIÓN */}
            <Section>
              <SectionTitle>Después de aprobar</SectionTitle>

              <Paragraph>
                Si superas el examen, tendrás que entregar la documentación final:
              </Paragraph>

              <BulletList>
                <li>Certificado de antecedentes penales</li>
                <li>Certificado de delitos sexuales</li>
                <li>Certificado médico</li>
                <li>Fotografía tipo carnet</li>
                <li>Pago de tasas</li>
              </BulletList>

              <SnippetBox>
                <SnippetText>
                  👉 El aprobado caduca si no completas el proceso a tiempo.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Prepárate para el examen con ventaja</CTATitle>

              <CTAParagraph>
                No basta con cumplir requisitos. Necesitas entrenar como en el examen real.
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
                    Normalmente dos al año: febrero y noviembre.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>¿Necesito licencia para empezar?</FaqQuestion>
                  <FaqAnswer>
                    No. Primero necesitas el carnet municipal para trabajar como conductor.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>¿Es difícil el examen?</FaqQuestion>
                  <FaqAnswer>
                    Sí. Requiere práctica con test y preparación específica.
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