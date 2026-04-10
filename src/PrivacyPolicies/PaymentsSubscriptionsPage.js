// src/PrivacyPolicies/PaymentsSubscriptionsPage.js
import React from "react";
import LegalPageTemplate from "./LegalPageTemplate";

export default function PaymentsSubscriptionsPage() {
  const sections = [
    {
      title: "1. Planes y acceso",
      paragraphs: [
        "TaxiRadar24 puede ofrecer diferentes modalidades de acceso, incluyendo contenidos gratuitos, acceso DEMO, suscripciones PRO, herramientas o servicios adicionales.",
        "Cada plan podrá tener su propio alcance, duración, limitaciones, precio y condiciones específicas.",
      ],
    },
    {
      title: "2. Pagos y proveedor de cobro",
      paragraphs: [
        "Los pagos asociados a planes, suscripciones o servicios de TaxiRadar24 pueden ser procesados por proveedores externos especializados, incluyendo Stripe, conforme a la infraestructura de pago implementada en la plataforma.",
        "La gestión del pago, validación de la operación, instrumentación del cobro y determinados datos vinculados a la transacción podrán estar sujetos al flujo técnico del proveedor de pago correspondiente.",
      ],
    },
    {
      title: "3. Renovaciones",
      paragraphs: [
        "Cuando el plan contratado sea de carácter recurrente, la suscripción podrá renovarse automáticamente conforme al ciclo temporal aplicado al plan, salvo cancelación previa realizada por el usuario o salvo que la plataforma establezca otra condición específica.",
      ],
    },
    {
      title: "4. Cancelación",
      paragraphs: [
        "El usuario podrá cancelar la renovación de su suscripción conforme al sistema habilitado por TaxiRadar24. La cancelación impedirá la renovación futura, pero no implica necesariamente la devolución automática de importes ya cobrados, salvo que se indique expresamente otra cosa.",
      ],
    },
    {
      title: "5. Reembolsos",
      paragraphs: [
        "Las solicitudes de reembolso serán analizadas conforme a la naturaleza del servicio contratado, el momento de la solicitud, el estado de acceso al contenido o cualquier condición específica anunciada en la oferta correspondiente.",
        "TaxiRadar24 podrá establecer una política concreta de devolución, revisión o compensación para ciertos supuestos, siempre dentro del marco que resulte aplicable al servicio ofrecido.",
      ],
    },
    {
      title: "6. Incidencias de pago",
      list: [
        "Pagos rechazados o no completados.",
        "Errores técnicos en la activación del plan.",
        "Renovaciones fallidas.",
        "Desajustes temporales entre pago y acceso.",
        "Solicitudes de revisión manual sobre estado del plan.",
      ],
    },
    {
      title: "7. Facturación y datos económicos",
      paragraphs: [
        "El usuario deberá facilitar la información necesaria para la correcta gestión del cobro y, cuando proceda, de la facturación asociada al servicio contratado. Será responsabilidad del usuario comprobar que los datos facilitados son correctos y están actualizados.",
      ],
    },
    {
      title: "8. Servicios de terceros",
      paragraphs: [
        "Determinados tratamientos vinculados a la operación de pago pueden depender de servicios de terceros ajenos a TaxiRadar24. El uso de dichos sistemas puede quedar sujeto adicionalmente a sus propias condiciones, políticas técnicas o políticas de privacidad.",
      ],
      note: "Esta página debe afinarse con tu política final real de suscripciones, cancelación, renovación, ventana de reembolso y flujo efectivo con Stripe antes de publicarla como versión definitiva.",
    },
  ];

  return (
    <LegalPageTemplate
      eyebrow="Pagos y acceso PRO"
      title="Pagos y Suscripciones"
      lead="Aquí se describe cómo funciona la contratación de planes, la renovación de suscripciones, la cancelación del servicio y el procesamiento de pagos dentro de TaxiRadar24."
      updatedAt="10/04/2026"
      sections={sections}
    />
  );
}