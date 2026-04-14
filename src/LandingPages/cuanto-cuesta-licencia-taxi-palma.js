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
  SnippetNote,
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
} from "./LandigPagesStyle";

export default function CuantoCuestaLicenciaTaxiPalma() {
  const canonicalUrl =
    "https://taxiradar24.com/cuanto-cuesta-licencia-taxi-palma";

  const title =
    "¿Cuánto cuesta una licencia de taxi en Palma de Mallorca en 2026? | TaxiRadar24";

  const description =
    "Descubre cuánto cuesta una licencia de taxi en Palma de Mallorca, qué influye en el precio del traspaso, qué trámites oficiales existen y qué gastos debes tener en cuenta.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto cuesta una licencia de taxi en Palma de Mallorca?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El precio de una licencia de taxi en Palma de Mallorca depende del mercado de traspaso, del vehículo incluido, de la demanda y del momento de la operación. No suele existir una cifra única fija válida para todos los casos.",
        },
      },
      {
        "@type": "Question",
        name: "¿El Ajuntament de Palma fija el precio de compra de la licencia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No publica un precio de compra único como si fuera una tarifa cerrada. Lo que sí regula son los trámites administrativos vinculados a la transmisión de la licencia, la situación de conductores y la adscripción de vehículos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué otros gastos hay además del precio de la licencia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Además del valor de mercado del traspaso, hay que valorar vehículo, seguros, mantenimiento, tasas administrativas, gestión documental y preparación para entrar al sector.",
        },
      },
      {
        "@type": "Question",
        name: "¿Una licencia estacional es lo mismo que comprar una licencia de taxi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Las licencias estacionales funcionan como una categoría diferenciada y se gestionan mediante convocatorias específicas publicadas por el Ajuntament de Palma.",
        },
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "¿Cuánto cuesta una licencia de taxi en Palma de Mallorca en 2026?",
    description,
    author: {
      "@type": "Organization",
      name: "TaxiRadar24",
    },
    publisher: {
      "@type": "Organization",
      name: "TaxiRadar24",
    },
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Page>
        <Wrapper>
          <Breadcrumbs aria-label="breadcrumb">
            <CrumbLink to="/">Inicio</CrumbLink>
            <Separator>/</Separator>
            <CrumbLink to="/guia-taxista-mallorca">
              Guía taxista Mallorca
            </CrumbLink>
            <Separator>/</Separator>
            <CrumbCurrent>Cuánto cuesta licencia taxi Palma</CrumbCurrent>
          </Breadcrumbs>

          <Hero>
            <Eyebrow>Guía TaxiRadar24</Eyebrow>

            <Title>¿Cuánto cuesta una licencia de taxi en Palma de Mallorca?</Title>

            <Lead>
              Cuando alguien busca cuánto cuesta una licencia de taxi en Palma,
              normalmente quiere entender dos cosas: el <strong>precio real del
              traspaso</strong> y los <strong>trámites oficiales</strong> que
              rodean la operación. Esa diferencia es clave para no confundir el
              valor de mercado con la gestión administrativa.
            </Lead>

        <SnippetBox>
          <SnippetLabel>Respuesta rápida</SnippetLabel>

          <SnippetText>
            En la actualidad, el precio de una licencia de taxi en Palma de Mallorca 
            suele situarse aproximadamente entre <strong>110.000 € y más de 140.000 €</strong>, 
            dependiendo del mercado de traspaso, de si incluye vehículo y de las condiciones 
            de la operación.

            <br /><br />

            El Ajuntament de Palma regula la transmisión de licencias y otros trámites 
            administrativos, pero el valor económico de compra no funciona como una tarifa 
            municipal fija, sino que depende del mercado.
          </SnippetText>

          <SnippetNote>
            En la práctica, muchas operaciones en Palma de Mallorca suelen situarse en torno a los 120.000 €, aunque el rango puede variar según el momento del mercado y las condiciones del traspaso.
          </SnippetNote>
        </SnippetBox>
            
          </Hero>

          <Content>
            <Section>
              <SectionTitle>
                Precio de una licencia de taxi en Palma: mercado y realidad
              </SectionTitle>

              <Paragraph>
                El precio de una licencia de taxi en Palma de Mallorca se mueve
                en el mercado de traspasos. Por eso, cuando se habla de
                <strong> licencia taxi Palma precio</strong> o de
                <strong> cuánto vale una licencia de taxi en Palma</strong>, no
                se está hablando solo de un documento administrativo, sino de un
                activo vinculado a la explotación profesional del taxi.
              </Paragraph>

              <Paragraph>
                Esa operación puede variar mucho según el contexto económico, la
                demanda, la situación del sector, el vehículo adscrito y las
                condiciones concretas del traspaso.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>
                Qué influye en el precio de una licencia de taxi en Palma
              </SectionTitle>

              <BulletList>
                <li>Demanda del mercado en Palma de Mallorca</li>
                <li>Oferta disponible en el momento del traspaso</li>
                <li>Vehículo incluido o no incluido en la operación</li>
                <li>Estado y antigüedad del vehículo adscrito</li>
                <li>Condiciones de pago y financiación</li>
                <li>Perspectiva de rentabilidad dentro del sector taxi</li>
              </BulletList>
            </Section>

            <Section>
              <SectionTitle>
                Qué regula oficialmente el Ajuntament de Palma
              </SectionTitle>

<Section>
  <SectionTitle>
    Procedimientos oficiales del Ajuntament de Palma
  </SectionTitle>

  <Paragraph>
    El sistema de licencias de taxi en Palma no se basa únicamente en el precio de compra. Está estructurado a través de distintos procedimientos administrativos regulados por el Ajuntament de Palma.
  </Paragraph>

  <BulletList>
    <li>
      <strong>
        <a
          href="https://seuelectronica.palma.cat/-/movilidad.008-traspaso-de-licencias-de-taxi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Transmisión de licencias de taxi ↗
        </a>
      </strong>: proceso de traspaso o cambio de titularidad entre propietarios.
    </li>

    <li>
      <strong>
        <a
          href="https://seuelectronica.palma.cat/-/movilidad.004-comunicaci%C3%B3n-de-altas-y-bajas-de-los-conductores-de-los-veh%C3%ADculos-autotaxis"
          target="_blank"
          rel="noopener noreferrer"
        >
          Altas y bajas de conductores ↗
        </a>
      </strong>: gestión de conductores vinculados a una licencia de autotaxi.
    </li>

    <li>
      <strong>
        <a
          href="https://seuelectronica.palma.cat/-/movilidad.001-adscripci%C3%B3n-y-posteriores-sustituciones-de-veh%C3%ADculos-adscritos-a-licencias-de-autotaxis"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cambio o sustitución de vehículo ↗
        </a>
      </strong>: adscripción de un vehículo a la licencia. 
    </li>

    <li>
      <strong>
        <a
          href="https://mobipalma.mobi/mobilitat/transport/taxi/taxistes/licencias-estacionales/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Licencias estacionales ↗
        </a>
      </strong>: autorizaciones específicas para operar en temporada alta en Palma. 
    </li>
  </BulletList>

  <Paragraph>
    Estos procedimientos forman la base real del sistema del taxi en Palma y permiten entender correctamente cómo funciona el acceso al sector más allá del precio de la licencia.
  </Paragraph>
</Section>

              <Paragraph>
                A nivel oficial, el Ajuntament de Palma no presenta el precio
                de compra como una tarifa cerrada y única. Lo que sí aparece
                claramente dentro del área de licencias de taxi es la gestión de
                los procedimientos administrativos ligados a la actividad.
              </Paragraph>

              <Paragraph>
                Dentro de la sección de licencias para taxistas se agrupan
                bloques como la transmisión de una licencia, la variación del
                número de conductores, el cambio de vehículo y las licencias
                estacionales.
              </Paragraph>

              <TableWrap>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Bloque oficial</Th>
                      <Th>Qué representa</Th>
                    </Tr>
                  </Thead>
                  <tbody>
                    <Tr>
                      <Td>Transmisión de licencia</Td>
                      <Td>Traspaso o cambio de titularidad</Td>
                    </Tr>
                    <Tr>
                      <Td>Altas y bajas de conductores</Td>
                      <Td>Gestión de conductores vinculados al autotaxi</Td>
                    </Tr>
                    <Tr>
                      <Td>Cambio de vehículo</Td>
                      <Td>Adscripción o sustitución del vehículo</Td>
                    </Tr>
                    <Tr>
                      <Td>Licencias estacionales</Td>
                      <Td>Convocatorias específicas para temporada alta</Td>
                    </Tr>
                  </tbody>
                </Table>
              </TableWrap>
            </Section>

            <Section>
              <SectionTitle>
                Traspaso de licencia taxi Palma: qué significa realmente
              </SectionTitle>

              <Paragraph>
                Si buscas comprar una licencia de taxi en Palma, el concepto
                clave no es solo “compra”, sino también
                <strong> traspaso de licencia taxi Palma</strong> o
                <strong> transmisión de licencia</strong>. Desde el punto de
                vista administrativo, la operación debe encajar en la normativa
                y los procedimientos municipales aplicables.
              </Paragraph>

              <Paragraph>
                Además, la operación puede implicar revisar la situación del
                vehículo, la documentación del titular y otros elementos que
                afectan tanto al coste final como a la viabilidad de entrar en
                el sector con una base sólida.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>
                Qué otros gastos hay además del precio de la licencia
              </SectionTitle>

              <Paragraph>
                Una de las búsquedas más habituales es
                <strong> cuánto cuesta entrar al sector del taxi en Palma</strong>.
                Y la respuesta real es que no basta con mirar el precio del
                traspaso.
              </Paragraph>

              <BulletList>
                <li>Tramitación administrativa y tasas</li>
                <li>Vehículo adscrito a la licencia</li>
                <li>Seguro</li>
                <li>Mantenimiento y adecuación del coche</li>
                <li>Costes de explotación y puesta en marcha</li>
                <li>Preparación del examen y requisitos previos</li>
              </BulletList>
            </Section>

            <Section>
              <SectionTitle>
                Licencias estacionales: no es lo mismo que comprar una licencia
              </SectionTitle>

              <Paragraph>
                Es importante no mezclar una licencia ordinaria con las
                <strong> licencias estacionales</strong>. En Palma, esta
                categoría aparece como un bloque separado y funciona a través de
                convocatorias específicas ligadas a la temporada alta.
              </Paragraph>

              <Paragraph>
                Por tanto, si tu objetivo es valorar una inversión estable a
                largo plazo, la búsqueda correcta sigue siendo
                <strong> precio licencia taxi Palma</strong> o
                <strong> cuánto cuesta una licencia de taxi en Palma de Mallorca</strong>,
                no la información sobre licencias temporales.
              </Paragraph>
            </Section>

            <Section>
              <SectionTitle>
                Entonces, ¿cuánto cuesta una licencia de taxi en Palma de Mallorca?
              </SectionTitle>

              <Paragraph>
                La respuesta más útil es esta: el valor depende del mercado del
                traspaso y de las condiciones concretas de la operación. Por
                eso, para evaluar bien una compra, conviene analizar a la vez:
              </Paragraph>

              <BulletList>
                <li>Precio de mercado de la licencia</li>
                <li>Si el vehículo va incluido</li>
                <li>Costes administrativos y documentales</li>
                <li>Requisitos para entrar en el sector</li>
                <li>Potencial de explotación y rentabilidad</li>
              </BulletList>
            </Section>

            <CTABox>
              <CTATitle>
                Antes de pensar en una inversión grande, prepara la base correcta
              </CTATitle>

              <CTAParagraph>
                Lo más inteligente es entender primero los requisitos, el examen
                y la estructura real del sector taxi en Palma. Eso te permitirá
                valorar mejor cualquier paso futuro.
              </CTAParagraph>

              <CTAButtons>
                <PrimaryLink to="/requisitos-taxista-palma">
                  Ver requisitos
                </PrimaryLink>
                <SecondaryLink to="/academia-taxista-mallorca">
                  Preparar examen
                </SecondaryLink>
              </CTAButtons>
            </CTABox>

            <Section>
              <SectionTitle>Preguntas frecuentes</SectionTitle>

              <FaqWrap>
                <FaqItem>
                  <FaqQuestion>
                    ¿Cuánto cuesta una licencia de taxi en Palma de Mallorca?
                  </FaqQuestion>
                  <FaqAnswer>
                    Depende del mercado de traspaso, del vehículo incluido, de
                    la demanda y de las condiciones concretas de la operación.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>
                    ¿El Ajuntament de Palma fija un precio oficial de compra?
                  </FaqQuestion>
                  <FaqAnswer>
                    Regula la parte administrativa vinculada a la licencia, pero
                    el valor económico de compra no se comporta como una tarifa
                    única municipal.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>
                    ¿Qué otros gastos hay además de la licencia?
                  </FaqQuestion>
                  <FaqAnswer>
                    Vehículo, seguro, mantenimiento, tasas administrativas,
                    gestión documental y preparación previa.
                  </FaqAnswer>
                </FaqItem>

                <FaqItem>
                  <FaqQuestion>
                    ¿Las licencias estacionales son lo mismo que comprar una licencia?
                  </FaqQuestion>
                  <FaqAnswer>
                    No. Son una categoría diferenciada, ligada a convocatorias
                    específicas de temporada alta.
                  </FaqAnswer>
                </FaqItem>
              </FaqWrap>
            </Section>

            <RelatedSection>
              <SectionTitle>Seguir leyendo</SectionTitle>

              <RelatedGrid>
                <RelatedCard to="/requisitos-taxista-palma">
                  <RelatedTitle>Requisitos para ser taxista en Palma</RelatedTitle>
                  <RelatedText>
                    Entiende qué necesitas antes de entrar en el sector.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/examen-taxista-mallorca">
                  <RelatedTitle>Examen taxista Mallorca</RelatedTitle>
                  <RelatedText>
                    La parte clave para prepararte con criterio.
                  </RelatedText>
                </RelatedCard>

                <RelatedCard to="/cuanto-gana-un-taxista-en-mallorca">
                  <RelatedTitle>Cuánto gana un taxista en Mallorca</RelatedTitle>
                  <RelatedText>
                    Descubre el atractivo económico de la profesión.
                  </RelatedText>
                </RelatedCard>
              </RelatedGrid>
            </RelatedSection>
          </Content>
        </Wrapper>
      </Page>
    </>
  );
}