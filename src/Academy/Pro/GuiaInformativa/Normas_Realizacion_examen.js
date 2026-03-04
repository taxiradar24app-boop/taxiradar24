// src/Academy/GuiaInformativa/Normas_Realizacion_examen.js
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

export default function Normas_Realizacion_examen() {
  return (
    <PageContainer>
      <Title>📋 Normas para la Realización del Examen</Title>

      <Paragraph>
        Estas normas regulan el comportamiento y las condiciones bajo las cuales
        se debe desarrollar el examen oficial para la obtención del{" "}
        <strong>Permiso Municipal de Taxista de Palma</strong>. Su cumplimiento
        es obligatorio para todos los aspirantes.
      </Paragraph>

      <Subtitle>🚫 Antes y durante el examen</Subtitle>
      <List>
        <ListItem>
          Una vez iniciado el examen, no se permitirá la entrada de ningún
          aspirante bajo ningún concepto.
        </ListItem>
        <ListItem>
          Todas las partes del examen (callejero, test y hojas de respuestas)
          deben estar <strong>correctamente identificadas</strong>. Los exámenes
          sin identificación no serán corregidos.
        </ListItem>
        <ListItem>
          Está <strong>prohibido el uso o tenencia visible</strong> de teléfonos
          móviles, relojes inteligentes, auriculares u otros dispositivos
          electrónicos. Si suena o se manipula uno de ellos durante el examen,
          el aspirante deberá abandonar el aula y su examen será anulado.
        </ListItem>
        <ListItem>
          El examen comenzará con el aviso de viva voz del equipo examinador.
          Desde ese momento, los aspirantes{" "}
          <strong>no podrán hablar entre ellos</strong> ni mirar otros exámenes.
          Solo se podrá interactuar con los examinadores levantando la mano para
          pedir permiso.
        </ListItem>
        <ListItem>
          Todas las pertenencias deben quedar en el suelo, salvo prendas de
          vestir, que pueden colocarse sobre la silla o su respaldo.
        </ListItem>
        <ListItem>
          Nadie podrá abandonar el aula sin autorización expresa del examinador,
          salvo por motivos médicos o casos de urgencia justificados
          documentalmente. En caso contrario, el examen se considerará nulo.
        </ListItem>
        <ListItem>
          Antes y después del examen se deberá mantener{" "}
          <strong>silencio absoluto y orden</strong> en las instalaciones.
        </ListItem>
        <ListItem>
          Una vez finalizado el examen, si el aspirante no tiene que realizar
          más pruebas, deberá{" "}
          <strong>abandonar el edificio inmediatamente</strong>.
        </ListItem>
      </List>

      <Subtitle>⛔ Casos en los que NO se admitirá la inscripción</Subtitle>
      <List>
        <ListItem>
          Personas que hayan presentado documentación falsa o hayan sido
          suplantadas, durante un periodo de tres años.
        </ListItem>
        <ListItem>
          Personas que estén cumpliendo suspensión de su permiso de conducción.
        </ListItem>
        <ListItem>
          Personas expulsadas de un examen en los últimos tres años por portar o
          usar teléfono móvil, auriculares o cualquier aparato electrónico de
          almacenamiento de información.
        </ListItem>
      </List>

      <Subtitle>🚷 Motivos para negar el acceso al examen</Subtitle>
      <List>
        <ListItem>
          A aquellas personas que acudan a las pruebas una vez pasada la hora de
          llamamiento fijada.
        </ListItem>
        <ListItem>
          No llevar la documentación original acreditativa de identidad.
        </ListItem>
        <ListItem>
          A aquellos aspirantes que no lleven la documentación original
          acreditativa de su identidad.
        </ListItem>
        <ListItem>
          A aquellas personas que lleven teléfono móvil, auriculares, o
          cualquier otro aparato de comunicación externa o pueda ser utilizado
          como sistema de almacenamiento de información.
        </ListItem>
        <ListItem>
          A aquellos aspirantes que tengan pendiente presentar alguna
          documentación imprescindible para realizar el examen.
        </ListItem>
        <ListItem>
          -A aquellos aspirantes que no hayan hecho efectivo el pago de la tasa.
        </ListItem>
        <ListItem>
          Aquellos aspirantes que concurran al examen con vestimenta inadecuada
          (chancletas, pantalón corto, camisetas de tirantes...), o que con
          dicha vestimenta, atenten contra las normas básicas del decoro, o
          alteren el normal desarrollo de las pruebas.
        </ListItem>
      </List>

      <Subtitle>❌ Motivos de expulsión durante el examen</Subtitle>
      <List>
        <ListItem>Copiar o intentar copiar por cualquier medio.</ListItem>
        <ListItem>
          Portar o usar dispositivos electrónicos o de comunicación durante el
          examen.
        </ListItem>
        <ListItem>
          Hablar, mirar o interactuar con otros aspirantes una vez iniciado el
          examen.
        </ListItem>
        <ListItem>
          Adoptar una actitud que impida el desarrollo normal del examen.
        </ListItem>
        <ListItem>
          Llevar información de apoyo o material no autorizado.
        </ListItem>
        <ListItem>
          Se anularán los exámenes de quienes, posteriormente, se demuestre que
          copiaron las respuestas o no identificaron correctamente sus hojas.
        </ListItem>
      </List>

      <TipBox>
        💡 <strong>Recomendación:</strong> Llega con tiempo al aula, revisa tu
        documentación antes de entrar y evita cualquier dispositivo electrónico
        durante la prueba. Mantén la calma, escucha las instrucciones y respeta
        las normas: tu actitud también forma parte de la evaluación.
      </TipBox>

      {/* ✅ Navegador inferior */}
      <GuiaNavigator
        current={6}
        total={6}
        prev="/academy/guia-informativa/segunda-parte-examen"
      />
    </PageContainer>
  );
}
