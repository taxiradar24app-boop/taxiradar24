import React, { lazy } from "react";

const ReglamentoMenu = lazy(() =>
  import("@/Academy/Pro/ReglamentoOficial/ReglamentoMenu")
);

const ArticleTemplate = lazy(() =>
  import("@/Academy/Pro/ReglamentoOficial/ReglamentoArticulo")
);

const reglamentoRoutes = [
  {
    path: "reglamento",
    children: [
      { index: true, element: <ReglamentoMenu /> }, // 👈 CLAVE
      { path: "menu", element: <ReglamentoMenu /> },
      { path: ":id", element: <ArticleTemplate /> },
    ],
  },
];

export default reglamentoRoutes;
