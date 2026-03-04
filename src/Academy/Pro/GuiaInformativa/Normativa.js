// src/Academy/GuiaInformativa/Normativa.js
import React from "react";
import {
  PageContainer,
  Title,
  Subtitle,
  Paragraph,
  LawList,
  LawItem,
  Link,
} from "./GuiaInformativaStyle"; 

export default function Normativa() {
  return (
    <PageContainer>
      <Title>📜 Normativa Aplicable</Title>

      <Paragraph>
        Las pruebas para la obtención del <strong>Permiso Municipal de Taxista de Palma</strong> se rigen
        por la normativa oficial establecida por el <strong>Ajuntament de Palma</strong>.  
        Esta normativa define el marco legal, los procedimientos y los criterios
        que deben cumplirse para acceder y superar las pruebas.
      </Paragraph>

      <Subtitle>⚖️ Legislación vigente</Subtitle>

      <LawList>
        <LawItem>
          <strong>Decreto del Regidor del Área de Movilidad</strong>, por delegación de la Alcaldía,  
          número <strong>10576</strong> de 13 de junio de 2016, publicado en el <strong>BOIB núm. 78</strong> de 21 de junio de 2016,  
          modificado mediante los decretos:
          <br />
          – Nº <strong>8507</strong> de 4 de mayo de 2017 (BOIB núm. 54 de 6 de mayo de 2017)  
          <br />
          – Nº <strong>4474</strong> de 2 de marzo de 2018 (BOIB núm. 30 de 8 de marzo de 2018)
        </LawItem>

        <LawItem>
          <strong>Decreto número 21692</strong>, de 1 de diciembre de 2022.
        </LawItem>

        <LawItem>
          <strong>Artículo 29 del Reglamento municipal</strong> de los transportes públicos de viajeros
          y de las actividades auxiliares y complementarias.
        </LawItem>
      </LawList>

      <Subtitle>📚 Referencia oficial</Subtitle>
      <Paragraph>
        Puedes consultar la normativa completa y actualizada directamente en el portal
        oficial del Ajuntament de Palma:
      </Paragraph>

      <Link
        href="https://www.mobipalma.mobi/es/mobilitat/transport/taxi/taxistes/per-ser-taxista/"
        target="_blank"
        rel="noopener noreferrer"
      >
        🔗 https://www.mobipalma.mobi/es/mobilitat/transport/taxi/taxistes/per-ser-taxista/
      </Link>

      <Subtitle>🧠 Recomendación didáctica</Subtitle>
      <Paragraph>
        Memoriza las fechas y números de los decretos principales, ya que suelen aparecer
        en las preguntas del examen.  
        Familiarízate con los términos <em>“Reglamento municipal”</em> y <em>“Decreto del Regidor del Área de Movilidad”</em>,
        pues son los pilares legales del permiso municipal.
      </Paragraph>

      <Paragraph>
        Esta normativa es el punto de partida del temario, y su comprensión facilita la lectura
        del <strong>Reglamento oficial</strong> y las <strong>materias aplicables</strong> del examen.
      </Paragraph>

      <GuiaNavigator current={2} />
    </PageContainer>
  );
}

