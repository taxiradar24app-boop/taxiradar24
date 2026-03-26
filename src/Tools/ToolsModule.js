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

// 🚆 Tren
const TrainScreen = React.lazy(() =>
  import("@/Tools/train/trainScreen")
);

// ⚓ Boats (CORREGIDO)
const BoatsScreen = React.lazy(() =>
  import("@/Tools/Boats/BoatsScreen")
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

          {/* ✈️ Vuelos */}
          <Route path="flights" element={<FlightAeroDataBoxScreen />} />
          <Route path="flights/scheduled" element={<TableAdboxScreen />} />

          {/* 🚆 Tren */}
          <Route path="train" element={<TrainScreen />} />

          {/* ⚓ Puerto */}
          <Route path="boats" element={<BoatsScreen />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/herramientas" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}