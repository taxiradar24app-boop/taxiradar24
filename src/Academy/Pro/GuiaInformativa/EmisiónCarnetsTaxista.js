// src/Academy/GuiaInformativa/EmisionCarnetsTaxista.js
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

export default function EmisionCarnetsTaxista() {
  return (
    <PageContainer>
      <Title>🎓 Emisión del Carnet de Taxista</Title>

      <Paragraph>
        Una vez obtenida la <strong>calificación de aptitud</strong>, las
        personas interesadas dispondrán de <strong>diez días hábiles</strong>{" "}
        desde la fecha de publicación de las calificaciones para presentar la
        documentación necesaria.
      </Paragraph>

      <Subtitle>📄 Documentación requerida</Subtitle>
      <List>
        <ListItem>
          Fotocopia del <strong>permiso de conducir</strong> de la clase B o
          superior.
        </ListItem>
        <ListItem>
          <strong>Certificado médico</strong> emitido por un facultativo en
          psiquiatría o psicología que acredite la aptitud psíquica del
          aspirante para el ejercicio de la profesión.
        </ListItem>
        <ListItem>Una fotografía tamaño carnet.</ListItem>
      </List>

      <Subtitle>🗂️ Validación y publicación</Subtitle>
      <Paragraph>
        Transcurrido el plazo de diez días hábiles, el Ajuntament procesará y
        validará toda la documentación recibida. Posteriormente, se publicará el{" "}
        <strong>decreto oficial</strong> con la lista definitiva de personas
        aptas y sus respectivos <strong>números de carnet de taxista</strong>{" "}
        en:
      </Paragraph>

      <Paragraph>
        🔗{" "}
        <a href="https://www.mobipalma.mobi" target="_blank" rel="noreferrer">
          www.mobipalma.mobi
        </a>
      </Paragraph>

      <TipBox>
        ⚠️ Ningún aspirante podrá a ejercer como taxista antes de la publicación
        del decreto. Toda comunicación oficial relativa a las calificaciones y
        emisión de carnets se realizará exclusivamente a través de la web del
        Ajuntament.
      </TipBox>

      <GuiaNavigator
        current={8}
        total={9}
        prev="/academy/guia-informativa/publicaciones"
        next="/academy/guia-informativa/conocimientos-requeridos"
      />
    </PageContainer>
  );
}
