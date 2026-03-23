import React, { lazy } from "react";

const DemoSimulador = lazy(() =>
  import("@/Academy/Demo/DemoSimulador")
);

const simuladorDemoRoutes = [
  {
    path: "simulador",
    element: <DemoSimulador />,
  },
];

export default simuladorDemoRoutes;