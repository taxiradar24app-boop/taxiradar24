// src/Academy/GuiaInformativa/Procedimiento.js
import React from "react";
import {
  PageContainer,
  Title,
  Subtitle,
  Paragraph,
  StepList,
  StepItem,
  Link,
} from "./GuiaInformativaStyle";

export default function Procedimiento() {
  return (
    <PageContainer>
      <Title>📝 Procedimiento de Inscripción</Title>

      <Paragraph>
        El proceso de inscripción a las pruebas para obtener el{" "}
        <strong>Permiso Municipal de Taxista de Palma</strong> debe realizarse
        con una antelación mínima de <strong>30 días naturales</strong> antes
        de la fecha oficial del examen.
      </Paragraph>

      <Paragraph>
        La información más actualizada sobre el proceso, los plazos, el lugar
        del examen y cualquier aviso importante se publica exclusivamente en
        la web oficial del Ajuntament de Palma:
      </Paragraph>

      <Link
        href="https://mobipalma.mobi/mobilitat/transport/taxi/taxistes/per-ser-taxista/"
        target="_blank"
        rel="noopener noreferrer"
      >
        🔗 https://mobipalma.mobi/mobilitat/transport/taxi/taxistes/per-ser-taxista/
      </Link>

      <Subtitle>📌 Formas de Inscripción</Subtitle>

      <StepList>
        <StepItem>
          <strong>Presencial:</strong> en cualquiera de las{" "}
          <em>Oficinas de Atención a la Ciudadanía (OAC)</em> del Ajuntament
          de Palma.
        </StepItem>
        <StepItem>
          <strong>Telemática:</strong> a través de la{" "}
          <em>sede electrónica municipal</em>, si se dispone de{" "}
          <strong>certificado digital</strong> o <strong>DNI electrónico</strong>.
        </StepItem>
        <StepItem>
          Solo se admitirán a examen los aspirantes que cumplan el plazo
          mínimo de 30 días de antelación.
        </StepItem>
      </StepList>

      <Subtitle>📅 Calendario de Convocatorias</Subtitle>

      <Paragraph>
        Cada año se realizan <strong>dos convocatorias oficiales</strong>:
      </Paragraph>

      <StepList>
        <StepItem>
          🗓️ <strong>Primera convocatoria:</strong> primer martes de{" "}
          <strong>febrero</strong>.
        </StepItem>
        <StepItem>
          🗓️ <strong>Segunda convocatoria:</strong> primer martes de{" "}
          <strong>noviembre</strong>.
        </StepItem>
        <StepItem>
          Si alguna de las fechas fuese inhábil, el examen se celebrará el{" "}
          <strong>martes hábil siguiente</strong>.
        </StepItem>
      </StepList>

      <Subtitle>📄 Listas de Admitidos</Subtitle>
      <Paragraph>
        Tras el cierre del plazo de inscripción, el Ajuntament de Palma
        publicará en la web municipal las{" "}
        <strong>listas provisionales y definitivas de admitidos</strong> a las
        pruebas. Solo las personas incluidas en dichas listas podrán presentarse
        al examen.
      </Paragraph>

      <Subtitle>⚠️ Importante</Subtitle>
      <Paragraph>
        Toda la comunicación oficial se realiza exclusivamente a través del
        portal web municipal. No se facilita información por teléfono ni por
        correo electrónico. Las consultas o incidencias deben realizarse
        mediante instancia registrada en el{" "}
        <em>Registro Municipal</em>.
      </Paragraph>

      <Subtitle>🧠 Recomendación Didáctica</Subtitle>
      <Paragraph>
        Es aconsejable revisar periódicamente la web de movilidad del
        Ajuntament de Palma, ya que cualquier cambio en fechas o condiciones
        será publicado allí. Te recomendamos anotar las fechas en tu calendario
        y preparar la documentación con antelación.
      </Paragraph>

      {/* ✅ Navegador inferior con contador activo */}
      <GuiaNavigator
        current={3}
        total={6}
        prev="/academy/guia-informativa/normativa"
        next="/academy/guia-informativa/examen"
      />
    </PageContainer>
  );
}
