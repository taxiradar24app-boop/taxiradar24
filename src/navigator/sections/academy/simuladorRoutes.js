import React, { lazy } from "react";

const SimuladorExamen = lazy(() =>
  import("@/Academy/Pro/SimuladorExamen/SimuladorExamen")
);

export default [
  {
    path: "simulador",
    element: <SimuladorExamen />,
  },
];
