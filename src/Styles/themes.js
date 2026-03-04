// ======================================================================
// 🎨 themes.js — TAXIRADAR24 ENTERPRISE (versión final unificada)
// ======================================================================

// 🎨 PALETA BASE GLOBAL
export const baseColors = {
  backBlue: "#0a0f1e8c",
  blue: "#162c66",
  blueSoft: "#0b1f3b",
  blueDeep: "#0A1528",
  blueSoftText: "#0a7d9cff",

  green: "#10a37f",
  greenLight: "#2ce3b5",
  greeLogo: "#58E63D",
  yellow: "#FFC83D",

  white: "#ffffff",
  black: "#000000",

  grey: "#9ca3af",
  greyLight: "#e5e7eb",
  greyDark: "#404552",

  success: "#10a37f",
  warning: "#f59e0b",
  danger: "#dc2626",
  // SOLO derivados, coherentes con la base
academy: {
  surface: "#0e1a33",        // azul profundo pero más cálido
  surfaceSoft: "#132447",    // para cajas largas
  surfaceLight: "#1a2f55",   // sidebar y bloques secundarios

  textMain: "#e6edf7",       // NO blanco puro
  textSoft: "#b9c3d6",       // lectura larga
  textMuted: "#9ca3af",

  accentKey: "#FFC83D",      // puntos clave
  accentAcademy: "#10a37f",  // lenguaje academia
}

};

// ======================================================================
// 🎨 PALETA PRO BASE (usada en modo oscuro/claro PRO)
// ======================================================================
const proBase = {
  background: "#0b0f19",
  pageBg: "#081325",
  card: "#0d2033",
  cardAlt: "#112b45",
  text: "#ffffff",
  textSoft: "rgba(255,255,255,0.80)",
  border: "rgba(255,255,255,0.08)",
  topbar: "#0d2033",
  sidebarBorder: "rgba(255,255,255,0.12)",
  success: "#10a37f",
};

// ======================================================================
// ☀️ THEME LIGHT
// ======================================================================
export const lightTheme = {
  mode: "light",
  colors: { ...baseColors },

  // Base general
  background: "#f5f6fa",
  pageBg: "#ffffff",
  topbar: "#e9eef4",
  border: "rgba(0,0,0,0.08)",
  card: "#ffffff",
  cardAlt: "#f1f5fa",
  text: "#111827",
  textSoft: "#4b5563",

  // PRO
  pro: {
    background: "#f7fafc",
    pageBg: "#ffffff",
    topbar: "#e9eef4",
    card: "#ffffff",
    cardAlt: "#f1f5fa",

    border: "rgba(0,0,0,0.08)",

    text: "#111827",
    textSoft: "#4b5563",
    backBlue: "#0a0f1e8c",
    
    blue: "#162c66",
    blueSoft: "#0b1f3b",
    blueDeep: "#0A1528",

    green: "#10a37f",
    greenLight: "#2ce3b5",
    greeLogo: "#58E63D",
    yellow: "#FFC83D",

    white: "#ffffff",
    black: "#000000",

    grey: "#9ca3af",
    greyLight: "#e5e7eb",
    greyDark: "#404552",

    success: "#10a37f",
    warning: "#f59e0b",
    danger: "#dc2626",
  },

  // Sistema de espaciamiento y diseño
  spacing: { sm: "8px", md: "16px", lg: "24px" },

  fontSizes: {
    xs: "0.8rem",
    sm: "0.95rem",
    md: "1.1rem",
    lg: "1.35rem",
    xl: "1.9rem",
    hero: "3rem",
  },

  borderRadius: { sm: "8px", md: "12px", lg: "20px" },

  shadows: {
    card: "0 4px 8px rgba(0,0,0,0.08)",
    menu: "0 10px 24px rgba(0,0,0,0.15)",
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
  },
};

// ======================================================================
// 🌙 THEME DARK
// ======================================================================
export const darkTheme = {
  mode: "dark",
  colors: { ...baseColors },

  background: "#0b1220",
  pageBg: "#0f1a2b",
  topbar: "#112034",
  border: "rgba(255,255,255,0.07)",
  card: "#13263f",
  cardAlt: "#0f1e34",
  text: "#e8edf3",
  textSoft: "#b7c3d0",

  // PRO
  pro: {
    background: "#0b1220",
    pageBg: "#0f1a2b",
    topbar: "#112034",

    card: "#13263f",
    cardAlt: "#0f1e34",

    border: "rgba(255,255,255,0.07)",

    text: "#e8edf3",
    textSoft: "#b7c3d0",
  },

  spacing: { sm: "8px", md: "16px", lg: "24px" },

  fontSizes: {
    xs: "0.8rem",
    sm: "0.95rem",
    md: "1.1rem",
    lg: "1.35rem",
    xl: "1.9rem",
    hero: "3rem",
  },

  borderRadius: { sm: "6px", md: "12px", lg: "20px" },

  shadows: {
    card: "0 4px 8px rgba(0,0,0,0.6)",
    menu: "0 10px 22px rgba(0,0,0,0.8)",
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
  },
};

// ======================================================================
// 🟦 OBJETO DE THEMES PARA ThemeContext
// ======================================================================
const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;
