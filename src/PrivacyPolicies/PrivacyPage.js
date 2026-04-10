// src/PrivacyPolicies/PrivacyPage.js
import React from "react";
import LegalPageTemplate from "./LegalPageTemplate";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Objeto de esta política",
      paragraphs: [
        "La presente Política de Privacidad describe cómo TaxiRadar24 recopila, utiliza, conserva y protege los datos personales de los usuarios que acceden a la plataforma, navegan por el sitio web, crean una cuenta o utilizan cualquiera de los servicios ofrecidos.",
        "Esta política tiene por finalidad explicar de forma clara qué información tratamos, por qué la tratamos y qué opciones tiene el usuario sobre sus datos.",
      ],
    },
    {
      title: "2. Datos que podemos recopilar",
      paragraphs: [
        "Podemos recopilar datos identificativos y de contacto facilitados por el usuario al registrarse o comunicarse con la plataforma.",
      ],
      list: [
        "Nombre y apellidos.",
        "Correo electrónico.",
        "Número de teléfono.",
        "Datos necesarios para acceso, autenticación y seguridad de la cuenta.",
        "Datos de uso de la plataforma, navegación y progreso dentro de los servicios.",
        "Información facilitada mediante formularios, soporte o comunicaciones directas.",
      ],
    },
    {
      title: "3. Finalidades del tratamiento",
      paragraphs: [
        "Los datos personales podrán ser utilizados para gestionar el acceso a la plataforma, prestar los servicios contratados, personalizar la experiencia del usuario, ofrecer soporte técnico y mantener la seguridad general del sistema.",
      ],
      list: [
        "Crear y gestionar cuentas de usuario.",
        "Permitir el acceso a contenidos DEMO o PRO.",
        "Gestionar pagos, suscripciones y estado del plan contratado.",
        "Atender consultas, incidencias o solicitudes del usuario.",
        "Mejorar la experiencia, contenidos y funcionamiento general del servicio.",
        "Cumplir obligaciones legales o contractuales aplicables.",
      ],
    },
    {
      title: "4. Base que justifica el tratamiento",
      paragraphs: [
        "El tratamiento de los datos podrá basarse en la ejecución de la relación contractual con el usuario, en el consentimiento prestado para determinadas finalidades, en el interés legítimo de mejorar y proteger la plataforma y, cuando proceda, en el cumplimiento de obligaciones legales.",
      ],
    },
    {
      title: "5. Conservación de los datos",
      paragraphs: [
        "Los datos serán conservados durante el tiempo necesario para cumplir la finalidad para la que fueron recabados, mientras exista una relación activa con el usuario o mientras deban mantenerse por razones legales, administrativas, fiscales, de seguridad o defensa de reclamaciones.",
      ],
    },
    {
      title: "6. Cesión o acceso por terceros",
      paragraphs: [
        "TaxiRadar24 podrá utilizar proveedores técnicos o de infraestructura que actúen como encargados del tratamiento o prestadores de servicios vinculados al funcionamiento de la plataforma.",
        "En caso de servicios de pago, gestión técnica, alojamiento, analítica o autenticación, ciertos terceros podrán acceder únicamente a la información necesaria para la prestación de dichos servicios conforme a la relación técnica o contractual aplicable.",
      ],
    },
    {
      title: "7. Derechos del usuario",
      paragraphs: [
        "El usuario podrá solicitar, cuando corresponda, el acceso, rectificación, supresión, oposición, limitación del tratamiento o portabilidad de sus datos, así como retirar el consentimiento para tratamientos basados en él.",
        "Para ello, podrá dirigirse al canal de contacto habilitado por TaxiRadar24 indicando de forma clara su solicitud e identificándose de manera suficiente.",
      ],
    },
    {
      title: "8. Seguridad de la información",
      paragraphs: [
        "TaxiRadar24 adopta medidas razonables de carácter técnico y organizativo orientadas a proteger la información personal frente a accesos no autorizados, pérdida, alteración o uso indebido.",
        "No obstante, ningún sistema conectado a internet puede garantizar una seguridad absoluta, por lo que el usuario también debe proteger sus credenciales y hacer un uso diligente de su cuenta.",
      ],
      note: "Esta página es una base profesional de trabajo. Debe revisarse y completarse con los datos reales del titular, correo de contacto jurídico y flujos concretos del proyecto antes de publicarla como versión definitiva.",
    },
  ];

  return (
    <LegalPageTemplate
      eyebrow="Privacidad"
      title="Política de Privacidad"
      lead="En esta sección explicamos cómo TaxiRadar24 trata los datos personales relacionados con el acceso a la plataforma, la cuenta del usuario, la experiencia formativa y los servicios asociados."
      updatedAt="10/04/2026"
      sections={sections}
    />
  );
}