import React, { lazy } from "react";

const TarifasOficiales = lazy(() =>
  import("@/Academy/Pro/Tarifas/TarifasOficiales")
);

export default [
  {
    path: "tarifas",
    element: <TarifasOficiales />,
  },
];