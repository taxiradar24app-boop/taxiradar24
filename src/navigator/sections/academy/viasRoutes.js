import React, { lazy } from "react";

const ViasPrincipalesScreen = lazy(() =>
  import("@/Academy/Pro/ViasPrincipales/ViasPrincipalesScreen")
);

const viasRoutes = [
  {
    path: "vias-principales",
    element: <ViasPrincipalesScreen />,
  },
];

export default viasRoutes;
