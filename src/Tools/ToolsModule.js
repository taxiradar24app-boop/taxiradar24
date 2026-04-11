import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ToolsLayout from "@/navigator/layouts/ToolsLayout";

const ToolsLanding = React.lazy(() => import("@/Tools/ToolsLanding"));

const FlightAeroDataBoxScreen = React.lazy(() =>
  import("@/Tools/Flights/AeroBoxDataRadarScreen")
);

const TableAdboxScreen = React.lazy(() =>
  import("@/Tools/Flights/TableAdboxScreen")
);

const TrainScreen = React.lazy(() =>
  import("@/Tools/train/trainScreen")
);

const BoatsScreen = React.lazy(() =>
  import("@/Tools/Boats/BoatsScreen")
);

const CrusierScreen = React.lazy(() =>
  import("@/Tools/Boats/CrusierScreen")
);

function ToolsLoader() {
  return (
    <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      Cargando herramientas…
    </div>
  );
}

export default function ToolsModule() {
  return (
    <Suspense fallback={<ToolsLoader />}>
      <Routes>
        <Route element={<ToolsLayout />}>
          <Route index element={<ToolsLanding />} />
          <Route path="flights" element={<FlightAeroDataBoxScreen />} />
          <Route path="flights/scheduled" element={<TableAdboxScreen />} />
          <Route path="train" element={<TrainScreen />} />
          <Route path="boats" element={<BoatsScreen />} />
          <Route path="cruises" element={<CrusierScreen />} />
          <Route path="*" element={<Navigate to="/herramientas" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}