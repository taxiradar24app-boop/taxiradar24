import React, { lazy } from "react";

const DemoAudios = lazy(() =>
  import("@/Academy/Demo/DemoAudios")
);

const audiosDemoRoutes = [
  {
    path: "audios",
    element: <DemoAudios />,
  },
];

export default audiosDemoRoutes;