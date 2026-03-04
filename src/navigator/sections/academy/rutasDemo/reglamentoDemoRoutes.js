import React from "react";
import DemoReglamento from "@/Academy/Demo/DemoReglamento";
import DemoReglamentoArticulo from "@/Academy/Demo/DemoReglamentoArticulo";

const reglamentoDemoRoutes = [
  {
    path: "reglamento",
    element: <DemoReglamento />, // 👈 usa <Outlet />
    children: [
      {
        path: ":id",
        element: <DemoReglamentoArticulo />,
      },
    ],
  },
];

export default reglamentoDemoRoutes;
