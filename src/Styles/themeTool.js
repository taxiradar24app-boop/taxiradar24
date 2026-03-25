const themeTool = {
  name: "toolsPro",

  colors: {
    // ===== BRAND / IDENTIDAD =====
    brand: "#00A8F3",
    brandStrong: "#0094DA",
    brandSoft: "rgba(0, 168, 243, 0.16)",
    brandGlow: "rgba(0, 168, 243, 0.35)",

    accent: "#00F5FF",
    accentSoft: "rgba(0, 245, 255, 0.16)",
    accentGlow: "rgba(0, 245, 255, 0.35)",

    success: "#10A37F",
    successSoft: "rgba(16, 163, 127, 0.16)",
    warning: "#FFC83D",
    warningSoft: "rgba(255, 200, 61, 0.16)",
    danger: "#FF5C7A",
    dangerSoft: "rgba(255, 92, 122, 0.16)",

    info: "#4FD1FF",
    infoSoft: "rgba(79, 209, 255, 0.18)",

    // ===== FONDOS =====
    bg: "#07111F",
    bgDeep: "#050C18",
    bgElevated: "#0B1728",
    bgCard: "rgba(10, 22, 40, 0.92)",
    bgCardStrong: "#0E1C31",
    bgPanel: "#10233D",
    bgPanelSoft: "rgba(16, 35, 61, 0.75)",
    bgInput: "#0C1A2D",
    bgTableHead: "#102742",
    bgTableRow: "rgba(255,255,255,0.02)",
    bgTableRowHover: "rgba(0,168,243,0.08)",

    // ===== TEXTO =====
    text: "#EAF4FF",
    textStrong: "#FFFFFF",
    textSoft: "#B8CAE0",
    textMuted: "#7E93AC",
    textDim: "#5E728B",
    textOnBrand: "#04111D",

    // ===== BORDES =====
    border: "rgba(255,255,255,0.08)",
    borderSoft: "rgba(255,255,255,0.05)",
    borderStrong: "rgba(0,168,243,0.35)",
    borderAccent: "rgba(0,245,255,0.35)",

    // ===== HEADER / NAV =====
    headerBg: "rgba(5, 12, 24, 0.82)",
    headerBorder: "rgba(255,255,255,0.06)",
    headerText: "#EAF4FF",
    headerTextSoft: "#9DB2C8",
    headerActiveBg: "rgba(0,168,243,0.14)",
    headerActiveText: "#00F5FF",

    // ===== OVERLAY / MODALS =====
    overlay: "rgba(2, 6, 14, 0.72)",
    modalBg: "#0A1528",

    // ===== ESTADOS DE VUELOS / RADAR =====
    statusOnTime: "#10A37F",
    statusOnTimeBg: "rgba(16,163,127,0.16)",

    statusDelayed: "#FFC83D",
    statusDelayedBg: "rgba(255,200,61,0.16)",

    statusLanded: "#00A8F3",
    statusLandedBg: "rgba(0,168,243,0.16)",

    statusTubo: "#00F5FF",
    statusTuboBg: "rgba(0,245,255,0.16)",

    statusCanceled: "#FF5C7A",
    statusCanceledBg: "rgba(255,92,122,0.16)",

    // ===== SOMBRAS =====
    shadowSm: "0 6px 18px rgba(0,0,0,0.18)",
    shadowMd: "0 12px 28px rgba(0,0,0,0.24)",
    shadowLg: "0 18px 42px rgba(0,0,0,0.32)",
    shadowBrand: "0 0 0 1px rgba(0,168,243,0.16), 0 10px 30px rgba(0,168,243,0.18)",
    shadowAccent: "0 0 0 1px rgba(0,245,255,0.16), 0 10px 30px rgba(0,245,255,0.18)",
  },

  gradients: {
    page:
      "linear-gradient(180deg, #050C18 0%, #07111F 30%, #091728 100%)",

    hero:
      "linear-gradient(135deg, rgba(0,168,243,0.22) 0%, rgba(0,245,255,0.10) 35%, rgba(5,12,24,0.96) 100%)",

    card:
      "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",

    brand:
      "linear-gradient(135deg, #00A8F3 0%, #00F5FF 100%)",

    success:
      "linear-gradient(135deg, #10A37F 0%, #34D399 100%)",

    warning:
      "linear-gradient(135deg, #FFC83D 0%, #FFD978 100%)",

    darkGlass:
      "linear-gradient(180deg, rgba(10,22,40,0.92) 0%, rgba(8,17,31,0.96) 100%)",
  },

  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.35rem",
      xxl: "1.75rem",
      hero: "2.4rem",
      display: "3.2rem",
    },

    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    lineHeights: {
      tight: 1.1,
      normal: 1.45,
      relaxed: 1.65,
    },

    letterSpacings: {
      tight: "-0.02em",
      normal: "0",
      wide: "0.03em",
    },
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    xxl: "2rem",
    xxxl: "3rem",
    section: "5rem",
    sectionMobile: "3rem",
  },

  radius: {
    xs: "6px",
    sm: "10px",
    md: "14px",
    lg: "18px",
    xl: "24px",
    pill: "999px",
  },

  layout: {
    container: "1200px",
    containerWide: "1320px",
    headerHeight: "78px",
    headerHeightMobile: "64px",
    sidebarWidth: "280px",
    cardMinHeight: "180px",
  },

  borders: {
    thin: "1px solid rgba(255,255,255,0.06)",
    normal: "1px solid rgba(255,255,255,0.08)",
    strong: "1px solid rgba(0,168,243,0.32)",
    accent: "1px solid rgba(0,245,255,0.32)",
  },

  effects: {
    blurSm: "blur(8px)",
    blurMd: "blur(14px)",
    blurLg: "blur(22px)",
    glass: `
      background: rgba(10, 22, 40, 0.78);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255,255,255,0.06);
    `,
  },

  zIndex: {
    base: 1,
    dropdown: 50,
    sticky: 100,
    overlay: 200,
    drawer: 300,
    modal: 400,
    toast: 500,
  },

  transitions: {
    fast: "0.18s ease",
    normal: "0.28s ease",
    slow: "0.4s ease",
  },

  breakpoints: {
    xs: "360px",
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1440px",
  },

  buttons: {
    primary: {
      bg: "linear-gradient(135deg, #00A8F3 0%, #00F5FF 100%)",
      color: "#04111D",
      border: "1px solid rgba(0,245,255,0.28)",
      shadow: "0 10px 28px rgba(0,168,243,0.28)",
    },

    secondary: {
      bg: "rgba(255,255,255,0.03)",
      color: "#EAF4FF",
      border: "1px solid rgba(255,255,255,0.08)",
      shadow: "0 8px 18px rgba(0,0,0,0.18)",
    },

    ghost: {
      bg: "transparent",
      color: "#9EDFFF",
      border: "1px solid rgba(0,168,243,0.22)",
      shadow: "none",
    },

    danger: {
      bg: "linear-gradient(135deg, #FF5C7A 0%, #FF7B94 100%)",
      color: "#FFFFFF",
      border: "1px solid rgba(255,255,255,0.10)",
      shadow: "0 10px 28px rgba(255,92,122,0.22)",
    },
  },

  cards: {
    default: {
      bg: "rgba(10, 22, 40, 0.92)",
      border: "1px solid rgba(255,255,255,0.06)",
      shadow: "0 12px 28px rgba(0,0,0,0.22)",
      radius: "18px",
    },

    highlight: {
      bg: "linear-gradient(180deg, rgba(0,168,243,0.10) 0%, rgba(10,22,40,0.94) 100%)",
      border: "1px solid rgba(0,168,243,0.24)",
      shadow: "0 12px 30px rgba(0,168,243,0.14)",
      radius: "18px",
    },

    alert: {
      bg: "linear-gradient(180deg, rgba(255,200,61,0.10) 0%, rgba(10,22,40,0.94) 100%)",
      border: "1px solid rgba(255,200,61,0.22)",
      shadow: "0 12px 28px rgba(255,200,61,0.10)",
      radius: "18px",
    },
  },

  table: {
    headBg: "#102742",
    rowBg: "rgba(255,255,255,0.01)",
    rowHoverBg: "rgba(0,168,243,0.08)",
    border: "rgba(255,255,255,0.06)",
    text: "#EAF4FF",
    textSoft: "#9CB4CC",
  },

  pills: {
    info: {
      bg: "rgba(0,168,243,0.14)",
      color: "#6FDBFF",
      border: "1px solid rgba(0,168,243,0.22)",
    },

    success: {
      bg: "rgba(16,163,127,0.14)",
      color: "#6EE7B7",
      border: "1px solid rgba(16,163,127,0.22)",
    },

    warning: {
      bg: "rgba(255,200,61,0.14)",
      color: "#FFD978",
      border: "1px solid rgba(255,200,61,0.22)",
    },

    danger: {
      bg: "rgba(255,92,122,0.14)",
      color: "#FF9DB0",
      border: "1px solid rgba(255,92,122,0.22)",
    },
  },
};

export default themeTool;