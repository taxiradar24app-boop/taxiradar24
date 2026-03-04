// src/navigator/navigationConfig.js

export const ROLES = {
  GUEST: "guest",
  STUDENT: "student",
  DRIVER: "driver",
  HYBRID: "hybrid",
};

export const PLANS = {
  ACADEMIA_PRO: "ACADEMIA_PRO",
  TOOLS_PRO: "TOOLS_PRO",
};

export const publicNav = [
  { id: "home", label: "Inicio", path: "/" },
  { id: "academy", label: "Academia", path: "/academia/demo" },
  { id: "tools", label: "Herramientas", path: "/herramientas" },
];

export const academyNav = {
  demo: [
    { id: "demo-reglamento", label: "Reglamento", path: "/academia/demo/reglamento" },
    { id: "demo-audios", label: "Audios", path: "/academia/demo/audios" },
    { id: "demo-simulador", label: "Simulador", path: "/academia/demo/simulador" },
    { id: "demo-callejero", label: "Callejero", path: "/academia/demo/callejero" },
  ],
  pro: [
    // { id: "pro-dashboard", label: "Mi Academia", path: "/academia/pro" },
    { id: "pro-reglamento", label: "Reglamento", path: "/academia/pro/reglamento" },
    { id: "pro-simulador", label: "Simulador", path: "/academia/pro/simulador" },
    { id: "pro-audios", label: "Audios", path: "/academia/pro/audios" },
    { id: "pro-callejero", label: "Callejero", path: "/academia/pro/callejero" },
    // { id: "pro-vias", label: "Vías", path: "/academia/pro/vias-principales" },
    // { id: "pro-tarifas", label: "Tarifas", path: "/academia/pro/tarifas" },
  ],
};

export const toolsNav = {
  free: [{ id: "tools-landing", label: "Herramientas Taxi", path: "/herramientas" }],
  pro: [
    { id: "tools-flights", label: "Radar Vuelos", path: "/tools/flights" },
    { id: "tools-flights-scheduled", label: "Vuelos Programados", path: "/tools/flights/scheduled" },
  ],
};

// 🔥 NUEVO: usa subscription (D1), no Firestore
export function resolveNavigation({ user, subscription }) {
  if (!user) {
    return {
      mode: "guest",
      academy: academyNav.demo,
      tools: [],
      showUpgradeCTA: true,
    };
  }

  const isActive = subscription?.status === "active";

  if (!isActive) {
    return {
      mode: "demo",
      academy: academyNav.demo,
      tools: [],
      showUpgradeCTA: true,
    };
  }

  return {
    mode: "academy-pro",
    academy: academyNav.pro,
    tools: [],
    showUpgradeCTA: false,
  };
}