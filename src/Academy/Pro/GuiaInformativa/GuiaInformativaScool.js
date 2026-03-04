// src/Academy/GuiaInformativaScool.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  Title,
  Subtitle,
  Paragraph,
  Divider,
  GuiaList,
  GuiaItem,
  Link,
  ButtonGroup,
  CTAButton,
} from "./GuiaInformativaStyle";

export default function GuiaInformativaScool() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  return (
    <PageContainer>
      <Title>Guía Informativa · Permiso Municipal de Taxista en Palma</Title>

      <Paragraph>
        Bienvenido a la <strong>Guía Informativa de la Academia TaxiRadar24</strong>.  
        Aquí aprenderás paso a paso cómo conseguir tu{" "}
        <strong>Permiso Municipal de Taxista en Palma de Mallorca</strong>.  
        Te mostraremos el proceso oficial, los requisitos, las pruebas y los mejores consejos
        para aprobar con seguridad y confianza.
      </Paragraph>

      <Divider />

      <Subtitle>🚦 ¿Qué encontrarás en esta guía?</Subtitle>
      <Paragraph>
        Esta guía resume todo el proceso de inscripción, las normas del examen y el camino
        que recorrerás hasta convertirte en taxista profesional.  
        Ideal para quienes comienzan desde cero o quieren repasar el proceso completo.
      </Paragraph>

      <GuiaList>
        <GuiaItem onClick={goTo("/guia-informativa/introduccion")}>
          🧭 Introducción y objetivos
        </GuiaItem>
        <GuiaItem onClick={goTo("/guia-informativa/normativa")}>
          ⚖️ Normativa aplicable
        </GuiaItem>
        <GuiaItem onClick={goTo("/guia-informativa/procedimiento")}>
          📝 Procedimiento de inscripción
        </GuiaItem>
        <GuiaItem onClick={goTo("/guia-informativa/primera-parte")}>
          🧠 Primera parte del examen
        </GuiaItem>
        <GuiaItem onClick={goTo("/guia-informativa/segunda-parte")}>
          📍 Segunda parte del examen
        </GuiaItem>
        <GuiaItem onClick={goTo("/guia-informativa/conocimientos-requeridos")}>
          📚 Conocimientos requeridos
        </GuiaItem>
      </GuiaList>

      <Divider />

      <Paragraph>
        Esta guía te prepara para comprender cada etapa del proceso municipal y
        acompañarte desde la solicitud hasta el día del examen.  
        Está diseñada para que avances a tu ritmo y sientas confianza en cada paso.
      </Paragraph>

      <ButtonGroup>
        <CTAButton onClick={() => navigate("/reglamento-oficial/temario")}>
          🚀 Comenzar el Temario
        </CTAButton>
      </ButtonGroup>

      <Divider />

      <Subtitle>⚖️ Enlace Oficial</Subtitle>
      <Paragraph>
        Toda la información está basada en la{" "}
        <strong>Guía Informativa Oficial 2025 (versión 1.2 – 28/08/25)</strong>{" "}
        del Ajuntament de Palma. Puedes consultar la versión completa en:
      </Paragraph>
      <Link
        href="https://www.mobipalma.mobi/es/mobilitat/transport/taxi/taxistes/per-ser-taxista/"
        target="_blank"
        rel="noopener noreferrer"
      >
        🔗 www.mobipalma.mobi/es/mobilitat/transport/taxi/taxistes/per-ser-taxista/
      </Link>
    </PageContainer>
  );
}
