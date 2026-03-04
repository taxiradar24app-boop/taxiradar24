import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PageWrapper,
  PageContainer,
  Title,
  Subtitle,
  Paragraph,
  Divider,
  List,
  ListItem,
  ButtonGroup,
  CTAButton,
  SecondaryButton,
  Link,
  TipBox,
} from "./TarifasStyle";

export default function TarifasOficiales() {
  const navigate = useNavigate();

  return (
  <PageWrapper>

    <PageContainer>

      <Title>Tarifas Oficiales del Servicio de Taxi · Mallorca 2025</Title>

      <Paragraph>
        Esta sección forma parte del módulo oficial de <strong>Tarifas y Procedimientos</strong>
        de la <strong>Academia TaxiRadar24</strong>.  
        Aquí aprenderás a interpretar correctamente las tarifas oficiales, los suplementos
        y su aplicación real en el servicio diario.
      </Paragraph>

      <TipBox>
        <strong>🎯 Objetivo pedagógico:</strong>  
        comprender el <em>porqué</em> de cada tarifa y ser capaz de calcular con claridad
        el importe final que debe abonar el cliente.
      </TipBox>

      <Divider />

      <Subtitle>📅 Aplicación según el día y la hora</Subtitle>
      <List>
        <ListItem>🕒 <strong>Lunes a viernes (07:00–21:00):</strong> Servicio laborable</ListItem>
        <ListItem>🌙 <strong>Lunes a viernes (21:00–07:00):</strong> Servicio nocturno</ListItem>
        <ListItem>📅 <strong>Sábados, domingos y festivos:</strong> Servicio festivo</ListItem>
        <ListItem>🎄 <strong>Navidad y Año Nuevo:</strong> suplemento especial de 4,75 €</ListItem>
      </List>

      <Divider />

      <Subtitle>🚕 Tarifas básicas (BOIB 83 / 2025)</Subtitle>
      <List>
        <ListItem><strong>Bajada de bandera:</strong> 2,50 € (laborable) · 2,85 € (noche/festivo)</ListItem>
        <ListItem><strong>Precio por kilómetro:</strong> 1,20 € · 1,35 €</ListItem>
        <ListItem><strong>Hora de espera:</strong> 19,40 € · 21,40 €</ListItem>
      </List>

      <Divider />

      <Subtitle>✈ Servicios desde aeropuerto o puerto</Subtitle>
      <List>
        <ListItem><strong>Carrera mínima:</strong> 16,95 €</ListItem>
        <ListItem><strong>Suplemento aeropuerto / puerto:</strong> 4,65 €</ListItem>
      </List>

      <Divider />

      <Subtitle>⛰ Suplementos de montaña</Subtitle>
      <List>
        <ListItem><strong>Montaña 1:</strong> 8,52 € (Sa Calobra, Formentor…)</ListItem>
        <ListItem><strong>Montaña 2:</strong> 4,26 € (Banyalbufar, Deià…)</ListItem>
        <ListItem>⚠️ No acumulables entre sí</ListItem>
      </List>

      <Divider />

      <Subtitle>👨‍👩‍👧‍👦 Otros suplementos</Subtitle>
      <List>
        <ListItem>5–6 pasajeros → 3,00 €</ListItem>
        <ListItem>7–8 pasajeros → 6,00 €</ListItem>
        <ListItem>Radioteléfono → 1,15 €</ListItem>
      </List>

      <Divider />

      <Subtitle>🧾 Servicios gratuitos obligatorios</Subtitle>
      <List>
        <ListItem>Equipaje razonable</ListItem>
        <ListItem>Carritos de bebé y sillas de ruedas</ListItem>
        <ListItem>Perros guía</ListItem>
        <ListItem>Pago con tarjeta y emisión de recibo</ListItem>
      </List>

      <Divider />

      <Subtitle>🏛 Documentación oficial</Subtitle>
      <List>
        <ListItem>
          📄 <Link href="https://www.caib.es/eboibfront/pdf/es/2025/83/1194499" target="_blank">
            BOIB 83 / 2025 – Tarifas oficiales
          </Link>
        </ListItem>
      </List>

      <Divider />

      <ButtonGroup>
        <CTAButton onClick={() => navigate("/academy/plan-de-estudio")}>
          🚀 Continuar con el programa
        </CTAButton>

        <SecondaryButton
          onClick={() =>
            window.open(
              "https://www.caib.es/eboibfront/pdf/es/2025/83/1194499",
              "_blank"
            )
          }
        >
          📑 Ver BOIB oficial
        </SecondaryButton>
        </ButtonGroup>
      
      </PageContainer>
      </PageWrapper>
  );
}
