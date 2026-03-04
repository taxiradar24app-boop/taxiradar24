// src/Academy/GuiaInformativa/Segunda_parte_examen.js
import React from "react";
import {
  PageContainer,
  Title,
  Subtitle,
  Paragraph,
  ExampleBox,
  ExampleItem,
  TipBox,
  List,
  ListItem,
} from "./GuiaInformativaStyle";

export default function Segunda_parte_examen() {
  return (
    <PageContainer>
      <Title>🚖 Segunda Parte del Examen – Rutas</Title>

      <Paragraph>
        Esta parte será evaluada <strong>únicamente</strong> cuando el aspirante
        haya superado la primera parte del examen. Evalúa la capacidad del
        futuro taxista para diseñar y describir{" "}
        <strong>tres itinerarios</strong>
        entre puntos relevantes de la ciudad, conociendo vías principales,
        sentidos de circulación y accesos a lugares de interés.
      </Paragraph>

      <Subtitle>📈 Puntuación y Estructura</Subtitle>

      <Paragraph>
        La segunda parte del examen consta de <strong>tres rutas</strong>, cada
        una valorada en <strong>10 puntos</strong>, sumando un total de{" "}
        <strong>30 puntos</strong>. Para obtener la calificación de{" "}
        <strong>APTO</strong> es necesario lograr al menos
        <strong> 20 puntos</strong>.
      </Paragraph>

      <List>
        <ListItem>
          Cada itinerario se compone de un punto de inicio, un punto intermedio
          y un punto final.
        </ListItem>
        <ListItem>
          Se deben usar <strong>únicamente vías principales</strong>{" "}
          (autopistas, avenidas, paseos o calles incluidas en el listado oficial
          del epígrafe 5.2.2).
        </ListItem>
        <ListItem>
          Las rutas deben escribirse con la nomenclatura oficial: “Ma-19”,
          “Ma-20”, “Carrer”, “Avinguda”, etc.
        </ListItem>
      </List>

      <Subtitle>⚙️ Sistema de Corrección</Subtitle>

      <ExampleBox>
        <ExampleItem>➖ 1 punto por omitir una vía pública.</ExampleItem>
        <ExampleItem>
          ➖ 0,5 puntos por nomenclatura incorrecta de autopista o carretera.
          <br />
          Ejemplo: “Vía de Cintura ❌” → “Ma-20 ✅”
        </ExampleItem>
        <ExampleItem>
          ➖ 2 puntos por realizar una maniobra prohibida (giro o sentido
          contrario).
        </ExampleItem>
        <ExampleItem>
          ➖ 2 puntos si la ruta no es el camino más corto y directo (salvo que
          el enunciado indique lo contrario).
        </ExampleItem>
        <ExampleItem>
          ➖ 3 puntos si la ruta es inadecuada o contraria al enunciado.
        </ExampleItem>
        <ExampleItem>
          🚫 Si la ruta es incoherente o totalmente errónea, el tramo será
          anulado.
        </ExampleItem>
      </ExampleBox>

      <Subtitle>🧭 Ejemplos de Rutas Reales</Subtitle>

      <ExampleBox>
        <ExampleItem>
          <strong>Ruta nº1:</strong>
          Jefatura Superior de Policía → Aeropuerto (pasando por Plaza España).
          <br />✅ Simó Ballester → Passeig Mallorca → Avinguda Portugal →
          Avinguda Alemanya → Comte Sallent → Joan March → Plaça Espanya →
          Alexandre Rosselló → Gabriel Alomar → Félix Pons → Ma-19 → Autopista
          del Aeropuerto.
        </ExampleItem>

        <ExampleItem>
          <strong>Ruta nº2:</strong>
          Castillo de Bellver → Tanatorio Municipal (vía principal más corta,
          pasando por Es Fortí).
          <br />✅ Camí Castell de Bellver → Camilo José Cela → Joan Miró →
          Francesc Rosselló Pintor → Federico García Lorca → Marquès de la Sènia
          → Plaça Pont → Espartero → Progrés → Comte de Barcelona → Caro →
          Teodor Llorente → Passeig Mallorca → Miquel dels Sants Oliver → Andreu
          Torrens → Camí de Jesús.
        </ExampleItem>

        <ExampleItem>
          <strong>Ruta nº3:</strong>
          Dirección General de Tráfico → Mercat de Pere Garau → Plaza de Toros.
          <br />✅ Manuel Azaña → Francesc Pi i Margall → Plaça Guillem Moragues
          → Gabriel Llabrés → Plaça Pere Garau → Arquebisbe Aspàreg → Plaça
          Miquel Dols → Josep Darder Metge → Plaça Güell → Jaume Balmes → Jacint
          Verdaguer → Gaspar Bennazar Arquitecte.
        </ExampleItem>
      </ExampleBox>

      <Subtitle>🗺️ Consejos de Preparación</Subtitle>
      <TipBox>
        💡 <strong>Practica sobre mapa real:</strong> repasa diariamente 5 rutas
        distintas usando un callejero físico o digital de Palma.
        <br />
        💡 <strong>Prioriza vías principales:</strong> evita callejear o
        desviarte de avenidas principales, salvo que el enunciado lo exija.
        <br />
        💡 <strong>Cuida los nombres oficiales:</strong> usa “Ma-19” en lugar de
        “Autopista de Levante”, y “Avinguda Gabriel Alomar” en lugar de “Paseo
        Marítimo”.
      </TipBox>

      <Subtitle>⚠️ Errores frecuentes</Subtitle>
      <List>
        <ListItem>
          ❌ No respetar el acceso peatonal principal al destino.
        </ListItem>
        <ListItem>
          ❌ No leer bien el enunciado y desviarse del trayecto solicitado.
        </ListItem>
        <ListItem>
          ❌ Usar abreviaciones incorrectas (“C.” en vez de “Carrer”).
        </ListItem>
        <ListItem>❌ Omitir tramos o repetir calles prohibidas.</ListItem>
      </List>

      <TipBox>
        🎯 <strong>Recuerda:</strong> la clave de esta parte es la precisión. La
        ruta debe ser coherente, respetar las señales y reflejar tu conocimiento
        real de la red viaria principal de Palma.
      </TipBox>

      {/* ✅ Navegador inferior */}
      <GuiaNavigator
        current={5}
        total={6}
        prev="/academy/guia-informativa/primera-parte-examen"
        next="/academy/guia-informativa/casos-no-admision"
      />
    </PageContainer>
  );
}
