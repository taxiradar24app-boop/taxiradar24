import React, { lazy } from "react";

const TarifasOficiales = lazy(() =>
  import("@/Academy/Pro/Tarifas/TarifasOficiales")
);

const tarifasDemoRoutes = [
  {
    path: "tarifas",
    element: <TarifasOficiales />,
  },
];

export default tarifasDemoRoutes;