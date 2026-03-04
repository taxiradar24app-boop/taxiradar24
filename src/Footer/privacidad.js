// src/Screens/FooterScreens/privacidad.js
import React from "react";
import { Form } from "../../Footer/FooterStyle";
export default function Privacidad() {
  return (
    <Form>
      <h1>Política de Privacidad</h1>
      <p>
        En TaxiRadar24 valoramos tu privacidad y nos comprometemos a proteger
        los datos personales de nuestros usuarios conforme al Reglamento (UE)
        2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        Titular: [Tu nombre o empresa] <br />
        Email de contacto: [tu-email@dominio.com]
      </p>

      <h2>2. Finalidad del tratamiento</h2>
      <p>
        Los datos recogidos se utilizan para gestionar el acceso a los
        servicios, mejorar la experiencia del usuario y, en su caso, enviar
        comunicaciones relacionadas con TaxiRadar24.
      </p>

      <h2>3. Derechos del usuario</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión,
        oposición, limitación y portabilidad escribiendo a nuestro correo de
        contacto.
      </p>

      <h2>4. Conservación de los datos</h2>
      <p>
        Los datos se conservarán únicamente durante el tiempo necesario para
        cumplir con las finalidades establecidas y con las obligaciones legales.
      </p>
    </Form>
  );
}
