// src/Academy/GuiaInformativa/Publicaciones.js
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

export default function Publicaciones() {
  return (
    <PageContainer>
      <Title>📰 Publicaciones de Calificaciones</Title>

      <Paragraph>
        Una vez finalizado el examen, el Ajuntament de Palma publicará la{" "}
        <strong>plantilla provisional con las respuestas correctas</strong> de
        los ejercicios de la primera parte.
      </Paragraph>

      <Paragraph>
        Durante el día siguiente se publicarán el examen completo y la plantilla
        provisional de respuestas correctas en la web oficial:
      </Paragraph>

      <Paragraph>
        🔗{" "}
        <a href="https://www.mobipalma.mobi" target="_blank" rel="noreferrer">
          www.mobipalma.mobi › Mobilitat › Taxi › Taxistes › Per ser Taxista
        </a>
      </Paragraph>

      <Subtitle>📅 Revisión y reclamaciones</Subtitle>
      <List>
        <ListItem>
          Los aspirantes dispondrán de <strong>tres días hábiles</strong> para
          presentar reclamaciones o solicitar revisiones de la plantilla
          provisional.
        </ListItem>
        <ListItem>
          Las reclamaciones deberán presentarse mediante instancia en el{" "}
          <em>Registro General del Ajuntament de Palma</em>.
        </ListItem>
        <ListItem>
          No se admitirán reclamaciones verbales o por correo electrónico.
        </ListItem>
      </List>

      <Subtitle>📜 Publicación definitiva</Subtitle>
      <Paragraph>
        Una vez resueltas las reclamaciones, se publicará la{" "}
        <strong>plantilla definitiva de respuestas</strong> junto con la{" "}
        <strong>relación de aspirantes aptos y no aptos</strong> en la misma
        página web.
      </Paragraph>

      <TipBox>
        💡 <strong>Recomendación:</strong> consulta la web oficial durante los
        días posteriores al examen y guarda una copia de tu resultado o
        reclamación presentada.
      </TipBox>

      <GuiaNavigator
        current={7}
        total={9}
        prev="/academy/guia-informativa/normas-realizacion"
        next="/academy/guia-informativa/emision-carnets"
      />
    </PageContainer>
  );
}
