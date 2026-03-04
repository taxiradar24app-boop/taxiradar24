// src/components/HeaderBox/shared/academyNavConfig.js

/**
 * CONFIGURACIÓN DEL MENÚ DE LA ACADEMIA
 * --------------------------------------
 * Por ahora es minimal, pero ya cumple con:
 *  - No romper NavLinks
 *  - No generar errores de rutas undefined
 *  - Estructura escalable
 */

export const ACADEMY_NAV = [
  {
    label: "Inicio",
    path: "/academia/pro",
  },
  {
    label: "Reglamento",
    path: "/academia/reglamento",
  },
  {
    label: "Audios",
    path: "/academia/audios",
  },
  {
    label: "Simulador",
    path: "/academia/simulador",
  },
  {
    label: "Callejero",
    path: "/academia/callejero",
  },
  {
    label: "Tarifas",
    path: "/academia/tarifas",
  },
];
