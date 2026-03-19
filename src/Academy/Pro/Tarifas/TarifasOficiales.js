import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PageWrapper,
  PageContainer,
  HeroCard,
  Eyebrow,
  Title,
  IntroText,
  InfoGrid,
  TipBox,
  MemoryBox,
  SectionCard,
  Subtitle,
  Paragraph,
  Divider,
  List,
  ListItem,
  SummaryBox,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  ButtonGroup,
  CTAButton,
  SecondaryButton,
  Link,
} from "./TarifasStyle";

export default function TarifasOficiales() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <PageContainer>
        <HeroCard>
          <Eyebrow>Tarifas y procedimiento</Eyebrow>

          <Title>Tarifas Oficiales del Servicio de Taxi · Mallorca 2025</Title>

          <IntroText>
            En esta lección aprenderás a interpretar correctamente las tarifas
            oficiales, los suplementos y su aplicación real en el servicio
            diario. El objetivo no es solo memorizar cifras, sino entender en
            qué momento se aplica cada importe y cómo razonarlo con seguridad en
            el examen.
          </IntroText>
        </HeroCard>

        <InfoGrid>
          <TipBox>
            <strong>🎯 Objetivo pedagógico:</strong> comprender el porqué de
            cada tarifa y ser capaz de calcular con claridad el importe final
            que debe abonar el cliente.
          </TipBox>

          <MemoryBox>
            <strong>🧠 Clave para memorizar:</strong> divide este tema en cuatro
            bloques: horario, tarifa base, suplementos especiales y servicios
            gratuitos. Así te será más fácil recordar qué se cobra y qué no.
          </MemoryBox>
        </InfoGrid>

        <SectionCard>
          <Subtitle>📅 Aplicación según el día y la hora</Subtitle>
          <Paragraph>
            Antes de calcular una carrera, lo primero es identificar en qué
            franja temporal se presta el servicio. Ese dato condiciona la bajada
            de bandera, el precio por kilómetro y la hora de espera.
          </Paragraph>

          <List>
            <ListItem>
              🕒 <strong>Lunes a viernes (07:00–21:00):</strong> servicio
              laborable
            </ListItem>
            <ListItem>
              🌙 <strong>Lunes a viernes (21:00–07:00):</strong> servicio
              nocturno
            </ListItem>
            <ListItem>
              📅 <strong>Sábados, domingos y festivos:</strong> servicio
              festivo
            </ListItem>
            <ListItem>
              🎄 <strong>Navidad y Año Nuevo:</strong> suplemento especial de
              4,75 €
            </ListItem>
          </List>

          <Divider />
        </SectionCard>

        <SectionCard>
          <Subtitle>🚕 Tarifas básicas (BOIB 83 / 2025)</Subtitle>
          <Paragraph>
            Estas son las cantidades base que forman el núcleo del cálculo de la
            carrera. Son especialmente importantes porque suelen aparecer en
            preguntas teóricas y también en casos prácticos.
          </Paragraph>

          <SummaryBox>
            <SummaryRow>
              <SummaryLabel>Bajada de bandera</SummaryLabel>
              <SummaryValue>
                2,50 € laborable · 2,85 € noche/festivo
              </SummaryValue>
            </SummaryRow>

            <SummaryRow>
              <SummaryLabel>Precio por kilómetro</SummaryLabel>
              <SummaryValue>1,20 € · 1,35 €</SummaryValue>
            </SummaryRow>

            <SummaryRow>
              <SummaryLabel>Hora de espera</SummaryLabel>
              <SummaryValue>19,40 € · 21,40 €</SummaryValue>
            </SummaryRow>
          </SummaryBox>
        </SectionCard>

        <SectionCard>
          <Subtitle>✈ Servicios desde aeropuerto o puerto</Subtitle>
          <Paragraph>
            En este tipo de servicios debes recordar dos datos clave: la carrera
            mínima y el suplemento específico de aeropuerto o puerto.
          </Paragraph>

          <List>
            <ListItem>
              <strong>Carrera mínima:</strong> 16,95 €
            </ListItem>
            <ListItem>
              <strong>Suplemento aeropuerto / puerto:</strong> 4,65 €
            </ListItem>
          </List>
        </SectionCard>

        <SectionCard>
          <Subtitle>⛰ Suplementos de montaña</Subtitle>
          <Paragraph>
            Se aplican en determinados trayectos y es importante recordar que no
            pueden acumularse entre sí.
          </Paragraph>

          <List>
            <ListItem>
              <strong>Montaña 1:</strong> 8,52 € (Sa Calobra, Formentor…)
            </ListItem>
            <ListItem>
              <strong>Montaña 2:</strong> 4,26 € (Banyalbufar, Deià…)
            </ListItem>
            <ListItem>
              ⚠️ <strong>No acumulables entre sí</strong>
            </ListItem>
          </List>
        </SectionCard>

        <SectionCard>
          <Subtitle>👨‍👩‍👧‍👦 Otros suplementos</Subtitle>
          <List>
            <ListItem>
              <strong>5–6 pasajeros:</strong> 3,00 €
            </ListItem>
            <ListItem>
              <strong>7–8 pasajeros:</strong> 6,00 €
            </ListItem>
            <ListItem>
              <strong>Radioteléfono:</strong> 1,15 €
            </ListItem>
          </List>
        </SectionCard>

        <SectionCard>
          <Subtitle>🧾 Servicios gratuitos obligatorios</Subtitle>
          <Paragraph>
            Este bloque también es importante para el examen porque define qué
            prestaciones deben ofrecerse sin coste adicional.
          </Paragraph>

          <List>
            <ListItem>Equipaje razonable</ListItem>
            <ListItem>Carritos de bebé y sillas de ruedas</ListItem>
            <ListItem>Perros guía</ListItem>
            <ListItem>Pago con tarjeta y emisión de recibo</ListItem>
          </List>
        </SectionCard>

        <SectionCard>
          <Subtitle>🏛 Documentación oficial</Subtitle>
          <Paragraph>
            Cuando quieras contrastar los importes con la fuente oficial, puedes
            revisar directamente el boletín.
          </Paragraph>

          <List>
            <ListItem>
              📄{" "}
              <Link
                href="https://www.caib.es/eboibfront/pdf/es/2025/83/1194499"
                target="_blank"
                rel="noopener noreferrer"
              >
                BOIB 83 / 2025 – Tarifas oficiales
              </Link>
            </ListItem>
          </List>
        </SectionCard>

        <SectionCard>
          <Subtitle>🚀 Siguiente paso</Subtitle>
          <Paragraph>
            Cuando domines esta parte, lo ideal es continuar con el programa y
            reforzarla después con preguntas de examen o repasos breves.
          </Paragraph>

          <ButtonGroup>
            <CTAButton onClick={() => navigate("/academy/plan-de-estudio")}>
              Continuar con el programa
            </CTAButton>

            <SecondaryButton
              onClick={() =>
                window.open(
                  "https://www.caib.es/eboibfront/pdf/es/2025/83/1194499",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Ver BOIB oficial
            </SecondaryButton>
          </ButtonGroup>
        </SectionCard>
      </PageContainer>
    </PageWrapper>
  );
}