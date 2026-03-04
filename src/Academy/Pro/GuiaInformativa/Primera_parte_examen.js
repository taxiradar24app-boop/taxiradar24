// src/Academy/GuiaInformativa/Primera_parte_examen.js
import React from "react";
import {
  PageContainer,
  Title,
  Subtitle,
  Paragraph,
  ExampleBox,
  ExampleItem,
  TipBox,
} from "./GuiaInformativaStyle";

export default function Primera_parte_examen() {
  return (
    <PageContainer>
      <Title>🧩 Primera Parte del Examen: Callejero y Test</Title>

      <Paragraph>
        La prueba de aptitud consta de <strong>dos partes</strong>. Esta primera
        parte incluye los ejercicios de <strong>callejero</strong> y{" "}
        <strong>test teórico</strong>, con una duración total de{" "}
        <strong>90 minutos</strong>:
      </Paragraph>

      <Paragraph>
        🕐 <strong>10 minutos</strong> para el ejercicio de <em>callejero</em> y{" "}
        <strong>80 minutos</strong> para el <em>test teórico y de rutas</em>.
      </Paragraph>

      <Subtitle>🚗 1º Ejercicio: Callejero</Subtitle>
      <Paragraph>
        El objetivo es demostrar tu habilidad para utilizar correctamente el{" "}
        <strong>callejero oficial de Palma</strong> (habitualmente el editado
        por <em>Edicions Cort</em>). Deberás localizar <strong>10 direcciones</strong> 
        dictadas por el examinador, indicando el número de plano y la cuadrícula 
        donde se ubican.
      </Paragraph>

      <Paragraph>
        🔹 Cada respuesta correcta vale <strong>1 punto</strong>.  
        🔹 Las respuestas incorrectas o incompletas suman <strong>0 puntos</strong>.  
        🔹 Tiempo máximo: <strong>10 minutos</strong>.
      </Paragraph>

      <Subtitle>📘 Ejemplos Prácticos</Subtitle>
      <ExampleBox>
        <ExampleItem>
          Carrer Nuredduna nº3 → Plano: 25, Cuadrícula: D1 → ✅ Correcto (1 punto)
        </ExampleItem>
        <ExampleItem>
          Carrer Nuredduna nº3 → 25-D1 → ✅ Correcto (1 punto)
        </ExampleItem>
        <ExampleItem>
          Carrer Nuredduna nº3 → Plano: ---, Cuadrícula: D1 → ❌ Incorrecto (0 puntos)
        </ExampleItem>
        <ExampleItem>
          Carrer Nuredduna nº3 → 25 → ❌ Incorrecto (0 puntos)
        </ExampleItem>
      </ExampleBox>

      <TipBox>
        💡 <strong>Consejo:</strong> practica con el callejero físico antes del examen.
        Aprende a ubicar rápidamente calles principales, plazas y zonas de referencia.
      </TipBox>

      <Subtitle>🧠 2º Ejercicio: Test Teórico</Subtitle>
      <Paragraph>
        Consiste en <strong>60 preguntas tipo test</strong>, con una única
        respuesta correcta. El contenido se basa en:
      </Paragraph>

      <ul style={{ maxWidth: "900px", lineHeight: "1.6" }}>
        <li>📜 Reglamento municipal y normativa del taxi en Palma.</li>
        <li>💰 Aplicación de tarifas urbanas de autotaxi.</li>
        <li>🗺️ Conocimiento de vías principales, centros oficiales, culturales, educativos y sanitarios.</li>
        <li>🏨 Identificación de hoteles, centros deportivos y monumentos relevantes.</li>
      </ul>

      <Paragraph>
        Cada respuesta correcta suma <strong>+1 punto</strong>.  
        Las respuestas incorrectas restan:
      </Paragraph>

      <ul style={{ maxWidth: "900px" }}>
        <li>−0.33 puntos si hay 3 opciones de respuesta.</li>
        <li>−0.25 puntos si hay 4 opciones de respuesta.</li>
        <li>Las no contestadas no suman ni restan.</li>
      </ul>

      <Subtitle>📊 Distribución aproximada de preguntas</Subtitle>
      <ExampleBox>
        <ExampleItem>Reglamento municipal: 25–30 preguntas</ExampleItem>
        <ExampleItem>Tarifas: 2–4 preguntas</ExampleItem>
        <ExampleItem>Centros oficiales: 6–8 preguntas</ExampleItem>
        <ExampleItem>Centros culturales: 2–3 preguntas</ExampleItem>
        <ExampleItem>Centros médicos y hospitalarios: 2–3 preguntas</ExampleItem>
        <ExampleItem>Centros escolares y universitarios: 2–3 preguntas</ExampleItem>
        <ExampleItem>Hoteles: 2–3 preguntas</ExampleItem>
        <ExampleItem>Centros deportivos: 4–6 preguntas</ExampleItem>
        <ExampleItem>Establecimientos hosteleros y monumentos: 2–4 preguntas</ExampleItem>
      </ExampleBox>

      <TipBox>
        💡 <strong>Recomendación:</strong> Estudia con un método progresivo.
        Repasa primero la normativa, luego las tarifas y finalmente los puntos de la ciudad.
        Entrena con exámenes simulados para mejorar tu tiempo de respuesta.
      </TipBox>

      {/* ✅ Navegador inferior con contador activo */}
      <GuiaNavigator
        current={4}
        total={6}
        prev="/academy/guia-informativa/procedimiento"
        next="/academy/guia-informativa/segunda-parte-examen"
      />
    </PageContainer>
  );
}
