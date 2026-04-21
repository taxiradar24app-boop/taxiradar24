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
  MicroHighlight,
  CheckList,
} from "./LandigPagesStyle";

export default function FormatoExamenTaxiPalma() {
  return (
    <>
      <Helmet>
        <title>
          Formato examen taxi Palma: estructura real y puntuación (2026)
        </title>
        <meta
          name="description"
          content="Descubre el formato real del examen de taxista en Palma: puntuación, test, callejero, rutas y claves para aprobar."
        />
      </Helmet>

      <Page>
        <Wrapper>

          {/* HERO */}
          <Hero>
            <Eyebrow>TaxiRadar24</Eyebrow>

            <Title>
              Formato real del examen de taxista en Palma
            </Title>

            <Lead>
              Si entiendes cómo se puntúa el examen, ya tienes media prueba hecha.
            </Lead>

            <SnippetBox>
              <SnippetText>
                👉 90 minutos → 2 partes → si no pasas la primera, estás fuera.
              </SnippetText>
            </SnippetBox>
          </Hero>

          <Content>

            {/* VISIÓN RÁPIDA */}
            <Section>
              <SectionTitle>Así funciona el examen</SectionTitle>

              <CheckList>
                <li>90 minutos totales</li>
                <li>Primera parte → test + callejero</li>
                <li>Segunda parte → rutas</li>
              </CheckList>

              <MicroHighlight>
                👉 La primera parte decide todo.
              </MicroHighlight>
            </Section>

            {/* CORTE */}
            <Section>
              <SectionTitle>El corte que deja fuera a la mayoría</SectionTitle>

              <Paragraph>
                Para pasar a la segunda parte necesitas mínimo:
              </Paragraph>

              <MicroHighlight>
                👉 50 puntos en test + callejero
              </MicroHighlight>

              <Paragraph>
                Si no llegas, el examen termina ahí.
              </Paragraph>
            </Section>

            {/* CALLEJERO */}
            <Section>
              <SectionTitle>Callejero (10 puntos)</SectionTitle>

              <Paragraph>
                Tienes 10 minutos para ubicar 10 direcciones.
              </Paragraph>

              <CheckList>
                <li>+1 punto por acierto</li>
                <li>0 puntos si fallas</li>
              </CheckList>

              <MicroHighlight>
                👉 Error típico: no indicar plano y cuadrícula correctamente.
              </MicroHighlight>
            </Section>

            {/* TEST */}
            <Section>
              <SectionTitle>Test del examen (60 preguntas)</SectionTitle>

              <Paragraph>
                El test es la parte más importante del examen y donde más aspirantes fallan.
              </Paragraph>

              <CheckList>
                <li>60 preguntas tipo test</li>
                <li>+1 punto por acierto</li>
                <li>-0.25 / -0.33 por error</li>
                <li>Preguntas sin responder → no restan</li>
              </CheckList>

              <Paragraph>
                El contenido se basa principalmente en:
              </Paragraph>

              <BulletList>
                <li>Reglamento municipal</li>
                <li>Tarifas</li>
                <li>Calles principales</li>
                <li>Lugares clave de Palma</li>
              </BulletList>

              <MicroHighlight>
                👉 Más del 50% del test es normativa: aquí se decide el aprobado.
              </MicroHighlight>
            </Section>

            {/* RUTAS */}
            <Section>
              <SectionTitle>Rutas (30 puntos)</SectionTitle>

              <Paragraph>
                Tendrás que resolver 3 trayectos reales.
              </Paragraph>

              <CheckList>
                <li>10 puntos por ruta</li>
                <li>Mínimo 20 para aprobar</li>
              </CheckList>

              <MicroHighlight>
                👉 No gana el que sabe más calles, gana el que elige mejor.
              </MicroHighlight>
            </Section>

            {/* ERRORES */}
            <Section>
              <SectionTitle>Errores que te hacen suspender</SectionTitle>

              <BulletList>
                <li>No practicar test</li>
                <li>Dejar callejero para el final</li>
                <li>No entrenar con tiempo</li>
                <li>No simular examen real</li>
              </BulletList>
            </Section>

            {/* CTA */}
            <CTABox>
              <CTATitle>Entrena como en el examen real</CTATitle>

              <CTAParagraph>
                Entender el formato es solo el primer paso. Ahora toca practicar.
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