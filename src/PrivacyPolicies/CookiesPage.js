// src/PrivacyPolicies/CookiesPage.js
import React from "react";
import LegalPageTemplate from "./LegalPageTemplate";

export default function CookiesPage() {
  const sections = [
    {
      title: "1. Qué son las cookies",
      paragraphs: [
        "Las cookies son pequeños archivos o tecnologías similares que pueden almacenarse en el dispositivo del usuario cuando visita una página web. Sirven para facilitar funciones técnicas, recordar preferencias, mejorar la navegación o recopilar información sobre el uso del sitio.",
      ],
    },
    {
      title: "2. Tipos de cookies que puede utilizar TaxiRadar24",
      list: [
        "Cookies necesarias: imprescindibles para el funcionamiento básico del sitio y de la autenticación.",
        "Cookies de preferencias: permiten recordar determinadas opciones del usuario.",
        "Cookies de analítica: ayudan a entender el comportamiento de navegación y a mejorar la plataforma.",
        "Cookies de medición o marketing: permiten evaluar acciones promocionales o campañas cuando proceda.",
      ],
    },
    {
      title: "3. Cookies necesarias",
      paragraphs: [
        "Las cookies necesarias pueden utilizarse para asegurar el funcionamiento básico del sitio, mantener la sesión iniciada, aplicar medidas de seguridad, guardar ajustes esenciales o permitir determinadas funciones técnicas del servicio.",
      ],
    },
    {
      title: "4. Cookies opcionales",
      paragraphs: [
        "Las cookies de preferencias, analítica o medición solo deben activarse cuando el usuario las acepte o configure expresamente desde el panel de consentimiento correspondiente.",
      ],
    },
    {
      title: "5. Gestión del consentimiento",
      paragraphs: [
        "El usuario puede aceptar todas las categorías opcionales, rechazarlas o guardar una configuración personalizada desde el centro de privacidad y consentimiento mostrado en TaxiRadar24.",
        "Asimismo, el usuario podrá modificar su elección posteriormente si la plataforma ofrece un acceso visible a la configuración de cookies.",
      ],
    },
    {
      title: "6. Desactivación desde el navegador",
      paragraphs: [
        "Además del panel de consentimiento, el usuario también puede limitar, bloquear o eliminar cookies desde la configuración del navegador o dispositivo, aunque ello podría afectar al correcto funcionamiento de algunas partes del sitio.",
      ],
    },
    {
      title: "7. Cambios en la política de cookies",
      paragraphs: [
        "TaxiRadar24 podrá actualizar esta Política de Cookies cuando se introduzcan cambios en el funcionamiento del sitio, en los servicios utilizados o en la propia configuración de consentimiento.",
      ],
      note: "Conviene completar esta página con el listado real de herramientas, cookies técnicas concretas y la lógica efectiva que finalmente se implemente en producción.",
    },
  ];

  return (
    <LegalPageTemplate
      eyebrow="Cookies"
      title="Política de Cookies"
      lead="Aquí explicamos qué tecnologías de seguimiento puede utilizar TaxiRadar24, qué función cumplen y cómo puede gestionarlas el usuario desde el panel de consentimiento."
      updatedAt="10/04/2026"
      sections={sections}
    />
  );
}