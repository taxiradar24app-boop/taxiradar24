// src/Academy/Pro/ViasPrincipales/utils/mapHelpers.js

import centrosOficiales from "./../data/centrosOficiales";
import centrosCulturales from "./../data/centrosCulturales";
import centrosSalud from "./../data/centrosSalud";
import centrosEducativos from "./../data/centrosEducativos";
import hoteles from "./../data/hoteles";
import polideportivos from "./../data/polideportivos";
import hosteleria from "./../data/hosteleria";
import monumentos from "./../data/monumentos";
// ================= ICONOS =================

const iconBase = (emoji) =>
  L.divIcon({
    html: `<div style="
      font-size:22px;
      line-height:1;
      transform: translate(-50%, -50%);
    ">${emoji}</div>`,
    className: "",
    iconSize: [24, 24],
  });

export const CATEGORY_ICONS = {
  vias: iconBase("🛣️"),
  oficiales: iconBase("🏛️"),
  culturales: iconBase("🎭"),
  salud: iconBase("🏥"),
  educativos: iconBase("🎓"),
  hoteles: iconBase("🏨"),
  deportes: iconBase("🏟️"),
  hosteleria: iconBase("🍽️"),
  monumentos: iconBase("🗿"),
};

// ================= DATOS =================

// ⬇️⬇️⬇️ CLAVE ⬇️⬇️⬇️
export const getCategoryData = (category) => {
  switch (category) {
    case "oficiales":
      return centrosOficiales.items;
    case "culturales":
      return centrosCulturales.items;
    case "salud":
      return centrosSalud.items;
    case "educativos":
      return centrosEducativos.items;
    case "hoteles":
      return hoteles.items;
    case "deportivos": 
      return polideportivos.items;
    case "hosteleria":
      return hosteleria.items;
    case "monumentos":
      return monumentos.items;
    default:
      return [];
  }
};

export const getCategoryIcon = (category) =>
  CATEGORY_ICONS[category] || CATEGORY_ICONS.vias;