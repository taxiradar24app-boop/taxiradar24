// toolsDriversRoutes.js — v6 PRO
import React from "react";

import FlightAeroDataBoxScreen from "@/Drivers/Aero/AeroBoxDataRadarScreen";
import TableAdboxScreen from "@/Drivers/Aero/TableAdboxScreen";
// import BootArrivalsScreen from "@/Drivers/Boot/BootArrivalsScreen";
// import ToolScreen from "@/Drivers/trein/toolScreen";

export const toolsDriversRoutes = [
  // ✈️ Radar
  { path: "aero", element: <FlightAeroDataBoxScreen /> },
  { path: "aero/tabla", element: <TableAdboxScreen /> },

  // 🚢 Barcos (si se activa)
  // { path: "boot", element: <BootArrivalsScreen /> },

  // 🚆 Tren (si se activa)
  // { path: "tren", element: <ToolScreen /> },
];

export default toolsDriversRoutes;
