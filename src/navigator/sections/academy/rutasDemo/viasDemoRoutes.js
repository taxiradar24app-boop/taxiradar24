import React, { lazy } from "react";

const ViasPrincipalesScreen = lazy(() =>
  import("@/Academy/Pro/ViasPrincipales/ViasPrincipalesScreen")
);

const viasDemoRoutes = [
  {
    path: "vias-principales",
    element: <ViasPrincipalesScreen />,
  },
];

export default viasDemoRoutes;