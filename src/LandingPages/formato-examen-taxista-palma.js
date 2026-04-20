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
  BulletList,
  CTABox,
  CTATitle,
  CTAParagraph,
  CTAButtons,
  PrimaryLink,
} from "./LandigPagesStyle";

import { Link as InlineLink } from "react-router-dom";

export default function FormatoExamenTaxiPalma() {
  return (
    <>
      <Helmet>
        <title>
          Formato del examen de taxista en Palma de Mallorca (Guía oficial)
        </title>
        <meta
          name="description"
          content="Descubre cómo es el examen de taxista en Palma: estructura real, test, callejero, rutas, normas y cómo aprobar."
        />
      </Helmet>

      <Page>
        <Wrapper>

          {/* HERO */}
          <Hero>
            <Eyebrow>Guía Oficial TaxiRadar24</Eyebrow>

            <Title>
              Cómo es el examen de taxista en Palma de Mallorca
            </Title>

            <Lead>
              El examen para obtener el permiso municipal de taxista en Palma está estructurado en varias fases y requiere preparación específica en normativa, callejero y rutas.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Resumen clave</SnippetLabel>
              <SnippetText>
                El examen se divide en dos partes: una primera fase eliminatoria (callejero + test) y una segunda fase de rutas que determina la aptitud final.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* INTRODUCCIÓN */}
            <Section>
              <SectionTitle>Introducción al proceso</SectionTitle>

              <Paragraph>
                El procedimiento para obtener el permiso municipal de taxista en Palma está regulado por el Ayuntamiento y requiere seguir un proceso estructurado desde la inscripción hasta la obtención del carnet.
              </Paragraph>

              <Paragraph>
                Toda la información oficial se publica exclusivamente en la web municipal, siendo el único canal válido durante todo el proceso.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Importante</SnippetLabel>
                <SnippetText>
                  Toda la comunicación oficial del examen se realiza únicamente a través de la web del Ayuntamiento.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* NORMATIVA */}
            <Section>
              <SectionTitle>Normativa aplicable</SectionTitle>

              <Paragraph>
                El examen se rige por el Reglamento municipal del transporte público y por diferentes decretos que regulan el acceso al permiso de taxista.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Punto clave</SnippetLabel>
                <SnippetText>
                  Gran parte del examen tipo test se basa directamente en el Reglamento municipal.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* INSCRIPCIÓN */}
            <Section>
              <SectionTitle>Inscripción a las pruebas</SectionTitle>

              <Paragraph>
                La inscripción debe realizarse con al menos 30 días de antelación y puede hacerse de forma presencial o telemática.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Error frecuente</SnippetLabel>
                <SnippetText>
                  No cumplir el plazo de inscripción implica no poder presentarse al examen.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* PROCEDIMIENTO EXAMEN */}
            <Section>
              <SectionTitle>Procedimiento del examen</SectionTitle>

              <Paragraph>
                El examen tiene una duración total de 90 minutos y está dividido en dos partes.
              </Paragraph>

              <BulletList>
                <li>Primera parte: Callejero + Test (eliminatoria)</li>
                <li>Segunda parte: Rutas</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Clave del examen</SnippetLabel>
                <SnippetText>
                  Si no apruebas la primera parte, la segunda no se corrige.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* PRIMERA PARTE */}
            <Section>
              <SectionTitle>Primera parte: Callejero y Test</SectionTitle>

              <Paragraph>
                La primera parte evalúa la capacidad de localizar direcciones y el conocimiento teórico del aspirante.
              </Paragraph>

              <BulletList>
                <li>Callejero: localizar direcciones en tiempo limitado</li>
                <li>Test: 60 preguntas sobre normativa y ciudad</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Dificultad real</SnippetLabel>
                <SnippetText>
                  La mayoría de aspirantes falla en esta fase por falta de práctica real.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* SEGUNDA PARTE */}
            <Section>
              <SectionTitle>Segunda parte: Rutas</SectionTitle>

              <Paragraph>
                Esta parte consiste en desarrollar itinerarios reales por Palma, aplicando conocimiento de vías principales y circulación.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Punto crítico</SnippetLabel>
                <SnippetText>
                  Las rutas deben seguir el camino más lógico, respetando señalización y accesos reales.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* NORMAS */}
            <Section>
              <SectionTitle>Normas para la realización del examen</SectionTitle>

              <BulletList>
                <li>No se permite el uso de dispositivos electrónicos</li>
                <li>No se puede hablar durante la prueba</li>
                <li>El examen debe estar correctamente identificado</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Expulsión inmediata</SnippetLabel>
                <SnippetText>
                  El uso del móvil o copiar implica la anulación del examen.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* EXPULSIÓN */}
            <Section>
              <SectionTitle>Motivos de expulsión del examen</SectionTitle>

              <BulletList>
                <li>Copiar o comunicarse con otros aspirantes</li>
                <li>Uso de dispositivos electrónicos</li>
                <li>Alterar el desarrollo del examen</li>
              </BulletList>
            </Section>

            {/* NO ADMITIDOS */}
            <Section>
              <SectionTitle>Casos en los que no se admite inscripción</SectionTitle>

              <BulletList>
                <li>Documentación falsa</li>
                <li>Suspensión del permiso de conducir</li>
                <li>Expulsiones previas por fraude</li>
              </BulletList>
            </Section>

            {/* RESULTADOS */}
            <Section>
              <SectionTitle>Publicación de resultados y carnet</SectionTitle>

              <Paragraph>
                Los resultados se publican en la web municipal y se establece un plazo de alegaciones.
              </Paragraph>

              <SnippetBox>
                <SnippetLabel>Importante</SnippetLabel>
                <SnippetText>
                  No se comunican resultados por teléfono, solo en la web oficial.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Prepárate con método real</CTATitle>

              <CTAParagraph>
                El examen no se aprueba solo con teoría. Necesitas práctica real.
              </CTAParagraph>

              <CTAButtons>
                <PrimaryLink to="/test-taxista-palma">
                  Practicar test reales
                </PrimaryLink>
              </CTAButtons>
            </CTABox>

          </Content>
        </Wrapper>
      </Page>
    </>
  );
}