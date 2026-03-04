// src/Screens/FooterScreens/cookies.js
import React from "react";
import { Form } from "../../Footer/FooterStyle";
export default function Cookies() {
  return (
    <Form>
      <h1>Política de Cookies</h1>
      <p>
        En TaxiRadar24 utilizamos cookies propias y de terceros para mejorar la
        experiencia del usuario, analizar el tráfico y personalizar el
        contenido.
      </p>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Son pequeños archivos de texto que se almacenan en el navegador del
        usuario y permiten reconocer el dispositivo, recordar preferencias y
        mejorar la navegación.
      </p>

      <h2>2. Tipos de cookies que usamos</h2>
      <ul>
        <li>
          <strong>Cookies técnicas:</strong> necesarias para el funcionamiento
          básico.
        </li>
        <li>
          <strong>Cookies de análisis:</strong> nos ayudan a entender cómo usas
          la web.
        </li>
        <li>
          <strong>Cookies de terceros:</strong> como Google Analytics.
        </li>
      </ul>

      <h2>3. Cómo gestionar las cookies</h2>
      <p>
        Puedes permitir, bloquear o eliminar las cookies en cualquier momento
        desde la configuración de tu navegador. Ten en cuenta que desactivar
        cookies puede limitar el funcionamiento de algunos servicios.
      </p>
    </Form>
  );
}
