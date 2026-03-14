// ======================================================================
// 🎨 themes.js — TAXIRADAR24 ENTERPRISE (versión final unificada)
// ======================================================================

// 🎨 PALETA BASE GLOBAL
export const baseColors = {
  backBlue: "rgba(10, 15, 30, 0.55)",
  blue: "#162c66",
  blueSoft: "#0b1f3b",
  blueDeep: "#0A1528",
  blueSoftText: "#0a7d9c",

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

  academy: {
    surface: "#0e1a33",
    surfaceSoft: "#132447",
    surfaceLight: "#1a2f55",

    textMain: "#e6edf7",
    textSoft: "#b9c3d6",
    textMuted: "#9ca3af",

    accentKey: "#FFC83D",
    accentAcademy: "#10a37f",
  },
};

// ======================================================================
// 🧱 TOKENS COMPARTIDOS
// ======================================================================
const sharedSpacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
};

const sharedFontSizes = {
  xs: "0.8125rem",  // 13px
  sm: "0.9375rem",  // 15px
  md: "1rem",       // 16px
  lg: "1.125rem",   // 18px
  xl: "1.75rem",    // 28px
  xxl: "2.25rem",   // 36px
  hero: "2.75rem",  // 44px aprox
};

const sharedFontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 800,
};

const sharedLineHeights = {
  tight: 1.15,
  heading: 1.22,
  title: 1.28,
  body: 1.65,
  relaxed: 1.75,
};

const sharedLetterSpacings = {
  tighter: "-0.03em",
  tight: "-0.02em",
  normal: "-0.01em",
  wide: "0em",
};

const sharedRadius = {
  sm: "8px",
  md: "14px",
  lg: "20px",
  xl: "28px",
  pill: "999px",
};

const sharedBreakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
};

const sharedTypography = {
  family:
    '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const sharedEffects = {
  glassBlur: "14px",
  glassBorderLight: "1px solid rgba(255,255,255,0.14)",
  glassBorderDark: "1px solid rgba(255,255,255,0.08)",
};

// ======================================================================
// ☀️ THEME LIGHT
// ======================================================================
export const lightTheme = {
  mode: "light",
  colors: { ...baseColors },

  background: "#f5f7fb",
  pageBg: "rgba(10, 15, 30, 0.55)",
  topbar: "#edf2f7",
  border: "rgba(0,0,0,0.08)",
  card: "#ffffff",
  cardAlt: "#f5f8fc",
  text: "#111827",
  textSoft: "#4b5563",
  textMuted: "#6b7280",

  pro: {
    background: "#f7fafc",
    pageBg: "rgba(10, 15, 30, 0.55)",
    topbar: "#e9eef4",
    card: "#ffffff",
    cardAlt: "#f1f5fa",
    border: "rgba(0,0,0,0.08)",

    text: "#111827",
    textSoft: "#4b5563",
    textMuted: "#6b7280",

    backBlue: "rgba(10, 15, 30, 0.08)",
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

  spacing: sharedSpacing,
  fontSizes: sharedFontSizes,
  fontWeights: sharedFontWeights,
  lineHeights: sharedLineHeights,
  letterSpacings: sharedLetterSpacings,
  borderRadius: sharedRadius,
  breakpoints: sharedBreakpoints,
  typography: sharedTypography,
  effects: sharedEffects,

  shadows: {
    card: "0 8px 24px rgba(15, 23, 42, 0.08)",
    menu: "0 18px 44px rgba(15, 23, 42, 0.14)",
    glass: "0 12px 40px rgba(15, 23, 42, 0.12)",
    highlight: "0 10px 30px rgba(16, 163, 127, 0.12)",
  },

  glass: {
    bg: "rgba(255,255,255,0.68)",
    bgSoft: "rgba(255,255,255,0.52)",
    border: "1px solid rgba(255,255,255,0.7)",
    text: "#111827",
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
  textMuted: "#8fa1b6",

  pro: {
    background: "#0b1220",
    pageBg: "#0f1a2b",
    topbar: "#112034",

    card: "#13263f",
    cardAlt: "#0f1e34",

    border: "rgba(255,255,255,0.07)",

    text: "#e8edf3",
    textSoft: "#b7c3d0",
    textMuted: "#8fa1b6",
  },

  spacing: sharedSpacing,
  fontSizes: sharedFontSizes,
  fontWeights: sharedFontWeights,
  lineHeights: sharedLineHeights,
  letterSpacings: sharedLetterSpacings,
  borderRadius: sharedRadius,
  breakpoints: sharedBreakpoints,
  typography: sharedTypography,
  effects: sharedEffects,

  shadows: {
    card: "0 10px 26px rgba(0,0,0,0.40)",
    menu: "0 18px 48px rgba(0,0,0,0.55)",
    glass: "0 16px 40px rgba(0,0,0,0.35)",
    highlight: "0 12px 34px rgba(16, 163, 127, 0.18)",
  },

  glass: {
    bg: "rgba(8, 19, 37, 0.58)",
    bgSoft: "rgba(13, 32, 51, 0.42)",
    border: "1px solid rgba(255,255,255,0.08)",
    text: "#e8edf3",
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