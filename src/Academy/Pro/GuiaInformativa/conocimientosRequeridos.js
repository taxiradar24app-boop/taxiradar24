// src/Academy/GuiaInformativa/ConocimientosRequeridos.js
import React from "react";
import {
  PageContainer,
  Title,
  Subtitle,
  Paragraph,
  List,
  ListItem,
  TipBox,
} from "./GuiaInformativaStyle";

export default function ConocimientosRequeridos() {
  return (
    <PageContainer>
      <Title>📚 Conocimientos Requeridos para Ser Taxista en Palma</Title>

      <Paragraph>
        El examen para la obtención del Permiso Municipal de Taxista evalúa
        tanto los conocimientos teóricos como prácticos necesarios para
        desempeñar la profesión con seguridad, eficiencia y conocimiento del
        entorno urbano de Palma.
      </Paragraph>

      <Subtitle>✅ Ámbitos de conocimiento</Subtitle>
      <List>
        <ListItem>
          <strong>Callejero:</strong> dominio de la red viaria, localización de
          calles, avenidas, plazas y zonas de referencia.
        </ListItem>
        <ListItem>
          <strong>Test teórico:</strong> comprensión del reglamento municipal,
          tarifas, normativa aplicable y atención al cliente.
        </ListItem>
        <ListItem>
          <strong>Rutas o itinerarios:</strong> capacidad para establecer el
          recorrido más corto y adecuado entre puntos de la ciudad respetando la
          circulación y accesos correctos.
        </ListItem>
      </List>

      <TipBox>
        💡 Este resumen sirve como orientación general de los contenidos
        evaluados. Próximamente se organizarán ejercicios, autoevaluaciones y
        simulacros de examen dentro de la plataforma TaxiRadar24.
      </TipBox>

      <GuiaNavigator
        current={9}
        total={9}
        prev="/academy/guia-informativa/emision-carnets"
      />
    </PageContainer>
  );
}
