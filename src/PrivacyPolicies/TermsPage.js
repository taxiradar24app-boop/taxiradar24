// src/PrivacyPolicies/TermsPage.js
import React from "react";
import LegalPageTemplate from "./LegalPageTemplate";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Objeto",
      paragraphs: [
        "Los presentes Términos y Condiciones regulan el acceso, navegación y uso de TaxiRadar24, así como la contratación y utilización de los servicios, contenidos, herramientas y funcionalidades disponibles a través de la plataforma.",
      ],
    },
    {
      title: "2. Acceso y uso de la plataforma",
      paragraphs: [
        "El acceso a determinadas áreas o funcionalidades puede requerir el registro previo del usuario, la verificación de identidad o la contratación de un plan específico.",
        "El usuario se compromete a utilizar la plataforma de forma lícita, diligente y conforme a la finalidad prevista del servicio.",
      ],
    },
    {
      title: "3. Cuenta de usuario",
      list: [
        "El usuario es responsable de la veracidad de la información que facilite.",
        "Debe custodiar adecuadamente sus credenciales de acceso.",
        "No debe ceder su cuenta a terceros ni permitir usos no autorizados.",
        "Debe comunicar cualquier sospecha de acceso indebido o uso fraudulento.",
      ],
    },
    {
      title: "4. Contenidos y servicios",
      paragraphs: [
        "TaxiRadar24 puede ofrecer contenidos gratuitos, contenidos restringidos, servicios DEMO, servicios PRO, herramientas para taxistas y cualquier otra funcionalidad vinculada al ecosistema del proyecto.",
        "La disponibilidad de ciertos módulos, áreas, materiales o herramientas puede depender del tipo de cuenta, plan contratado, fase del producto o decisiones organizativas de la plataforma.",
      ],
    },
    {
      title: "5. Propiedad intelectual",
      paragraphs: [
        "Los diseños, textos, materiales, estructura, marcas, recursos visuales, contenidos formativos, ejercicios, materiales descargables y demás elementos integrados en TaxiRadar24 están protegidos por la normativa aplicable de propiedad intelectual e industrial.",
        "No se autoriza la reproducción, distribución, transformación, extracción, reventa o explotación no autorizada de estos contenidos fuera de los supuestos permitidos por la plataforma o por la ley.",
      ],
    },
    {
      title: "6. Conductas no permitidas",
      list: [
        "Usar la plataforma de forma fraudulenta o con fines ilícitos.",
        "Intentar acceder a zonas restringidas sin autorización.",
        "Compartir credenciales, contenidos premium o materiales protegidos.",
        "Interferir en el funcionamiento técnico, seguridad o integridad del sistema.",
        "Realizar actividades que perjudiquen a otros usuarios o a la plataforma.",
      ],
    },
    {
      title: "7. Limitación de responsabilidad",
      paragraphs: [
        "TaxiRadar24 procurará mantener la plataforma operativa, actualizada y segura, pero no garantiza disponibilidad absoluta e ininterrumpida ni ausencia total de errores, incidencias técnicas o interrupciones ajenas a su control.",
        "La información y contenidos ofrecidos en la plataforma tienen finalidad informativa, formativa o de servicio según cada caso, y deben interpretarse dentro del alcance propio del producto.",
      ],
    },
    {
      title: "8. Modificaciones",
      paragraphs: [
        "TaxiRadar24 podrá actualizar estos Términos y Condiciones cuando sea necesario por razones técnicas, operativas, comerciales, organizativas o legales.",
      ],
      note: "Antes de publicar esta versión definitiva conviene adaptarla al funcionamiento exacto de DEMO, PRO, acceso a herramientas, cancelaciones, plan de usuario y cualquier restricción real de uso que vaya a existir en producción.",
    },
  ];

  return (
    <LegalPageTemplate
      eyebrow="Uso de la plataforma"
      title="Términos y Condiciones de Uso"
      lead="Estas condiciones regulan el acceso a TaxiRadar24, el uso de la plataforma, la cuenta del usuario, los contenidos disponibles y las reglas generales del servicio."
      updatedAt="10/04/2026"
      sections={sections}
    />
  );
}