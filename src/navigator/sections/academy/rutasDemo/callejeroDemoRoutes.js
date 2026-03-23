import React, { lazy } from "react";

const DemoCallejero = lazy(() =>
  import("@/Academy/Demo/DemoCallejero")
);

const callejeroDemoRoutes = [
  {
    path: "callejero",
    element: <DemoCallejero />,
  },
];

export default callejeroDemoRoutes;