export const AUDIO_BASE =
  "https://taxiradar24-academy-api.taxiradar24audio.workers.dev/audio";

export const AUDIO_SIGN_ENDPOINT =
  "https://taxiradar24-academy-api.taxiradar24audio.workers.dev/audio/sign";

export const AUDIO_TOKEN = "TR24_AUDIO_2026_SUPERSEGURO";

export const AUDIO_LIST = [
  {
    id: 0,
    title: "Curso Oficial del Reglamento del Taxi de Palma",
    key: "0-curso-oficial-reglamento-taxi-palma.mp3",
    description:
      "Introducción general al curso completo del Reglamento Municipal del Taxi de Palma.",
    demo: true,
  },
  {
    id: 1,
    title: "1: Artículos 1 al 3 – Introducción, Objeto y Ámbito",
    key: "1-articulos-1-al-3-introduccion-reglamento-objeto-obligacion-ambito.mp3",
    description:
      "Explicación del objeto del reglamento, su finalidad y el ámbito de aplicación.",
    demo: true,
  },
  {
    id: 2,
    title: "2: Artículos 4 al 9 – Número de Licencias, Aumentos y Tasas",
    key: "2-articulos-4-al-9-numero-licencias-aumentos-disminuciones-tasas.mp3",
    description:
      "Número de licencias, sus posibles modificaciones y el régimen de tasas correspondiente.",
    demo: false,
  },
  {
    id: 3,
    title: "3: Artículos 10 al 15 – Creación y Otorgamiento de Licencias",
    key: "3-articulos-10-al-15-creacion-otorgamiento-nuevas-licencias.mp3",
    description:
      "Proceso de creación, adjudicación y otorgamiento de nuevas licencias municipales.",
    demo: false,
  },
  {
    id: 4,
    title: "4: Artículo 16 – Rescate de Licencias",
    key: "4-articulo-16-rescate-licencias-procedimiento-completo.mp3",
    description:
      "Funcionamiento del rescate de licencias y su procedimiento administrativo.",
    demo: false,
  },
  {
    id: 5,
    title: "5: Artículos 17 al 20 – Listas de Conductores y Transmisiones",
    key: "5-articulos-17-al-20-listas-conductores-adjudicaciones-transmisiones.mp3",
    description:
      "Listas de conductores, adjudicaciones y reglas sobre transmisión de licencias.",
    demo: false,
  },
  {
    id: 6,
    title: "6: Artículos 21 al 25 – Titulares y Requisitos",
    key: "6-articulos-21-al-25-titulares-requisitos-honorabilidad-altas-bajas-conductores.mp3",
    description:
      "Requisitos exigidos a los titulares y condiciones necesarias para ejercer la actividad.",
    demo: false,
  },
  {
    id: 7,
    title: "7: Artículos 26 al 27 – Conductores y Permiso Municipal",
    key: "7-articulos-26-al-27-conductores-permiso-municipal-taxista.mp3",
    description:
      "Normas sobre conductores asalariados y obtención del permiso municipal de taxista.",
    demo: false,
  },
  {
    id: 8,
    title: "8: Artículos 28 al 32 – Revisión y Suspensión",
    key: "8-articulos-28-al-32-permiso-municipal-taxista-revision-caducidad-suspension.mp3",
    description:
      "Revisión, vigencia, caducidad y supuestos de suspensión del permiso municipal.",
    demo: false,
  },
  {
    id: 9,
    title: "9: Artículos 33 al 45 – Vehículos y Señalización",
    key: "9-articulos-33-al-45-vehiculos-senalizacion-revision-antiguedad-sustitucion.mp3",
    description:
      "Condiciones de los vehículos, señalización obligatoria, revisiones y sustituciones.",
    demo: false,
  },
  {
    id: 10,
    title: "10: Artículo 46 – Tarifas Oficiales",
    key: "10-articulo-46-tarifas-oficiales-servicio-taxi-palma.mp3",
    description:
      "Tarifas oficiales del servicio de taxi y criterios básicos de aplicación.",
    demo: false,
  },
  {
    id: 11,
    title: "11: Artículos 47 al 65 – Prestación del Servicio",
    key: "11-articulos-47-al-65-prestacion-servicio-turnos-conductores-usuarios-zonas-especiales.mp3",
    description:
      "Prestación del servicio, turnos, derechos y deberes durante la actividad diaria.",
    demo: false,
  },
  {
    id: 12,
    title: "12: Artículos 66 al 68 – Revocación de Licencias",
    key: "12-articulos-66-al-68-revocacion-licencias-permiso-municipal-taxista.mp3",
    description:
      "Causas, procedimiento y efectos de la revocación de licencias municipales.",
    demo: false,
  },
  {
    id: 13,
    title: "13: Artículos 69 al 74 – Medidas Correctoras",
    key: "13-articulos-69-al-74-medidas-correctoras-inmovilizaciones-prohibiciones.mp3",
    description:
      "Medidas correctoras, inmovilizaciones y prohibiciones previstas en el reglamento.",
    demo: false,
  },
  {
    id: 14,
    title: "14: Artículos 77 al 81 – Infracciones",
    key: "14-articulos-77-al-81-infracciones-muy-graves-graves-leves.mp3",
    description:
      "Clasificación de infracciones muy graves, graves y leves dentro del servicio.",
    demo: false,
  },
  {
    id: 15,
    title: "15: Artículo 82 – Régimen Sancionador",
    key: "15-articulo-82-regimen-sancionador-importes-gravedad-infracciones.mp3",
    description:
      "Régimen sancionador, importes y criterios según la gravedad de la infracción.",
    demo: false,
  },
];

export const buildDemoAudioUrl = (key) =>
  `${AUDIO_BASE}?key=${encodeURIComponent(key)}&token=${AUDIO_TOKEN}`;