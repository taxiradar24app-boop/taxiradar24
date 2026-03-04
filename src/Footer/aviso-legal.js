// src/Screens/FooterScreens/aviso-legal.js
import React from "react";
import { Form } from "./../FooterScreens";
export default function AvisoLegal() {
  return (
    <Form>
      <h1>Aviso Legal</h1>
      <p>
        En cumplimiento con la Ley 34/2002 de Servicios de la Sociedad de la
        Información y de Comercio Electrónico (LSSI-CE), se informa de los
        siguientes datos de la web TaxiRadar24:
      </p>

      <h2>1. Datos identificativos</h2>
      <p>
        Titular: [Tu nombre o empresa] <br />
        NIF: [Tu NIF o CIF] <br />
        Dirección: [Tu dirección completa] <br />
        Correo electrónico: [tu-email@dominio.com]
      </p>

      <h2>2. Objeto</h2>
      <p>
        El presente sitio web tiene carácter informativo y ofrece un servicio de
        rastreo de vuelos en Palma de Mallorca, además de recursos relacionados
        con la preparación del carnet de taxista.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso y uso del sitio web atribuye la condición de usuario, lo que
        implica la aceptación plena de las condiciones incluidas en este aviso
        legal. El usuario se compromete a no utilizar los contenidos del sitio
        para actividades ilícitas.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los contenidos del sitio web, incluyendo textos, imágenes, logotipos,
        iconos, diseño gráfico y código fuente, son titularidad de TaxiRadar24 o
        de terceros que han autorizado su uso, y están protegidos por la
        normativa de propiedad intelectual e industrial.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        TaxiRadar24 no se responsabiliza de los daños derivados del mal uso de
        los contenidos del sitio ni de la información facilitada por terceros a
        través de enlaces externos.
      </p>

      <h2>6. Legislación aplicable</h2>
      <p>
        La relación entre TaxiRadar24 y los usuarios se regirá por la normativa
        española vigente, y cualquier controversia se someterá a los Juzgados y
        Tribunales de Palma de Mallorca.
      </p>
    </Form>
  );
}
