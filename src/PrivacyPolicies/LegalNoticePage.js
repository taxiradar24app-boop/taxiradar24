// src/PrivacyPolicies/LegalNoticePage.js
import React from "react";
import LegalPageTemplate from "./LegalPageTemplate";

export default function LegalNoticePage() {
  const sections = [
    {
      title: "1. Titularidad del sitio",
      paragraphs: [
        "El presente sitio web y la plataforma TaxiRadar24 deben identificar de forma clara al titular o responsable del servicio, incluyendo los datos de contacto que correspondan y cualquier otra información legal necesaria para la correcta identificación del responsable.",
      ],
      note: "Aquí debes introducir los datos reales del titular del proyecto, denominación, correo de contacto y, si procede, información adicional necesaria antes de publicar la versión final.",
    },
    {
      title: "2. Objeto del sitio",
      paragraphs: [
        "TaxiRadar24 es una plataforma digital orientada a la prestación de contenidos, herramientas, recursos y servicios vinculados al ecosistema del taxi, la formación y otras áreas relacionadas con el producto.",
      ],
    },
    {
      title: "3. Acceso al sitio web",
      paragraphs: [
        "El acceso al sitio tiene carácter voluntario y puede estar sujeto a disponibilidad técnica, mantenimiento, actualización o desarrollo progresivo de determinadas funcionalidades.",
      ],
    },
    {
      title: "4. Responsabilidad sobre el uso",
      paragraphs: [
        "El usuario se compromete a hacer un uso adecuado del sitio, de sus contenidos y de sus servicios, evitando actuaciones contrarias a la ley, a la buena fe, a los derechos de terceros o al funcionamiento normal de la plataforma.",
      ],
    },
    {
      title: "5. Propiedad intelectual e industrial",
      paragraphs: [
        "Los elementos que integran TaxiRadar24, incluyendo estructura, diseño, contenidos, materiales, textos, gráficos, identidad visual, desarrollos y demás componentes del sitio, pertenecen a su titular o se utilizan con la correspondiente autorización.",
      ],
    },
    {
      title: "6. Enlaces externos",
      paragraphs: [
        "La plataforma podrá incluir referencias o enlaces a sitios, recursos o servicios de terceros. La existencia de dichos enlaces no implica control permanente sobre tales servicios ni aprobación automática de sus contenidos o políticas.",
      ],
    },
    {
      title: "7. Modificaciones y disponibilidad",
      paragraphs: [
        "TaxiRadar24 podrá modificar, suspender, actualizar o reorganizar cualquier parte del sitio web, del servicio o de sus contenidos cuando lo considere necesario por razones técnicas, estratégicas, operativas o legales.",
      ],
    },
    {
      title: "8. Normativa y resolución de conflictos",
      paragraphs: [
        "Las cuestiones relacionadas con el uso de la plataforma, en la medida en que proceda, se interpretarán conforme a la normativa aplicable y al marco jurídico que resulte pertinente según la actividad desarrollada por el servicio.",
      ],
      note: "Este aviso legal está preparado como base estructural. Antes de publicación definitiva debes insertar los datos reales del titular y la redacción jurídica final que desees adoptar para el proyecto.",
    },
  ];

  return (
    <LegalPageTemplate
      eyebrow="Aviso legal"
      title="Aviso Legal"
      lead="En esta página se recoge la información general del sitio TaxiRadar24, su finalidad, las condiciones básicas de acceso y el marco general de responsabilidad y uso."
      updatedAt="10/04/2026"
      sections={sections}
    />
  );
}