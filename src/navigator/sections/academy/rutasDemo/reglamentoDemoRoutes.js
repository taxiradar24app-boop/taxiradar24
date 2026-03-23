import React, { lazy } from "react";

const DemoReglamento = lazy(() =>
  import("@/Academy/Demo/DemoReglamento")
);

const DemoReglamentoArticulo = lazy(() =>
  import("@/Academy/Demo/DemoReglamentoArticulo")
);

const reglamentoDemoRoutes = [
  {
    path: "reglamento",
    element: <DemoReglamento />,
    children: [
      {
        path: ":id",
        element: <DemoReglamentoArticulo />,
      },
    ],
  },
];

export default reglamentoDemoRoutes;