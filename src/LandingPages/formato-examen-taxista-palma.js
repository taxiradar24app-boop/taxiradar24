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
          Examen taxi Palma: formato real, puntuación y cómo aprobar (2026)
        </title>
        <meta
          name="description"
          content="Descubre cómo es realmente el examen de taxista en Palma: puntuación, test, callejero, rutas y claves para aprobar a la primera."
        />
      </Helmet>

      <Page>
        <Wrapper>

          {/* HERO */}
          <Hero>
            <Eyebrow>Guía TaxiRadar24</Eyebrow>

            <Title>
              Cómo es realmente el examen de taxi en Palma (y cómo aprobarlo)
            </Title>

            <Lead>
              El examen de taxista en Palma no es solo teoría. Tiene reglas,
              puntuación, penalizaciones y una estructura que debes entender
              para aprobar.
            </Lead>

            <SnippetBox>
              <SnippetLabel>Resumen clave</SnippetLabel>
              <SnippetText>
                90 minutos de examen → 2 partes → necesitas mínimo 50 puntos en
                la primera para pasar a rutas.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* ESTRUCTURA REAL */}
            <Section>
              <SectionTitle>Formato real del examen de taxi Palma</SectionTitle>

              <BulletList>
                <li>Duración total: 90 minutos</li>
                <li>Primera parte: callejero + test (eliminatoria)</li>
                <li>Segunda parte: rutas</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Clave absoluta</SnippetLabel>
                <SnippetText>
                  Si no llegas a 50 puntos en la primera parte → estás fuera.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* CALLEJERO */}
            <Section>
              <SectionTitle>Ejercicio de callejero (10 puntos)</SectionTitle>

              <Paragraph>
                Tendrás que localizar 10 direcciones en el callejero en solo 10 minutos.
              </Paragraph>

              <BulletList>
                <li>Cada acierto → +1 punto</li>
                <li>Error o vacío → 0 puntos</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Error típico</SnippetLabel>
                <SnippetText>
                  No indicar plano + cuadrícula = respuesta incorrecta.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* TEST */}
            <Section>
              <SectionTitle>Test del examen (60 preguntas)</SectionTitle>

              <Paragraph>
                El test es la parte más importante y donde más gente suspende.
              </Paragraph>

              <BulletList>
                <li>60 preguntas tipo test</li>
                <li>+1 punto por acierto</li>
                <li>-0.25 / -0.33 por error</li>
                <li>Preguntas sin responder → no restan</li>
              </BulletList>

              <Paragraph>
                El contenido se basa principalmente en:
              </Paragraph>

              <BulletList>
                <li>Reglamento municipal</li>
                <li>Tarifas</li>
                <li>Calles principales</li>
                <li>Lugares clave de Palma</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Realidad</SnippetLabel>
                <SnippetText>
                  Más del 50% del test es normativa → aquí se decide el aprobado.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* RUTAS */}
            <Section>
              <SectionTitle>Ejercicio de rutas (30 puntos)</SectionTitle>

              <Paragraph>
                Tendrás que resolver 3 rutas reales dentro de Palma.
              </Paragraph>

              <BulletList>
                <li>10 puntos por ruta</li>
                <li>Mínimo 20 puntos para aprobar</li>
              </BulletList>

              <Paragraph>
                Se evalúa:
              </Paragraph>

              <BulletList>
                <li>Ruta más corta y lógica</li>
                <li>Respeto de señalización</li>
                <li>Nombres correctos de calles</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Penalizaciones reales</SnippetLabel>
                <SnippetText>
                  Error de calle → -1 punto | Ruta incorrecta → hasta -3 puntos
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* CLAVES */}
            <Section>
              <SectionTitle>Claves reales para aprobar</SectionTitle>

              <BulletList>
                <li>Dominar el reglamento (no memorizar)</li>
                <li>Practicar test reales</li>
                <li>Entrenar callejero con tiempo</li>
                <li>Simular rutas reales</li>
              </BulletList>

              <SnippetBox>
                <SnippetLabel>Verdad incómoda</SnippetLabel>
                <SnippetText>
                  El examen no se aprueba estudiando… se aprueba entrenando.
                </SnippetText>
              </SnippetBox>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Empieza a entrenar el examen real</CTATitle>

              <CTAParagraph>
                Practica con preguntas tipo examen y mejora tus resultados.
              </CTAParagraph>

              <CTAButtons>
                <PrimaryLink to="/test-taxista-palma">
                  Practicar test
                </PrimaryLink>
              </CTAButtons>
            </CTABox>

          </Content>
        </Wrapper>
      </Page>
    </>
  );
}