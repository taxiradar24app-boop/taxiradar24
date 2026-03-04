import React from "react";
import {
  PageContainer,
  Title,
  Paragraph,
  Divider
} from "./GuiaInformativaStyle";

export default function Introduccion() {
  return (
    <PageContainer>
      <Title>1️⃣ Introducción</Title>

      <Paragraph>
        Esta guía ha sido elaborada para orientar a todas las personas interesadas
        en obtener el <strong>Permiso Municipal de Taxista de Palma</strong>.  
        Explica de forma clara todo el procedimiento: desde la inscripción hasta
        la realización del examen, incluyendo las condiciones y requisitos
        oficiales.
      </Paragraph>

      <Paragraph>
        El objetivo es que aprendas de manera práctica y progresiva, comprendiendo
        cada paso y preparándote con confianza para superar el proceso y ejercer
        la profesión de taxista con excelencia.
      </Paragraph>

      <Divider />

      {/* ✅ Navegador de secciones */}
      <GuiaNavigator current={1} />
    </PageContainer>
  );
}
