import React, { lazy } from "react";

const AudioScreen = lazy(() =>
  import("@/Academy/Pro/AudioLectura/AudioScreen")
);

export default [
  {
    path: "audios",
    element: <AudioScreen />,
  },
];
