import React, { lazy } from "react";

const CallejeroPalmaScreen = lazy(() =>
  import("@/Academy/Pro/CallejeroPalma/CallejeroPalmaScreen")
);

const callejeroRoutes = [
  {
    path: "callejero",
    element: <CallejeroPalmaScreen />,
  },
];

export default callejeroRoutes;
