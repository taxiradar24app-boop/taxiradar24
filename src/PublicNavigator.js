// src/navigator/PublicNavigator.js

import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./navigator/layouts/PublicLayout";

const HomeScreen = React.lazy(() => import("@/Screens/HomeScreen"));

function Loader() {
  return (
    <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      Cargando…
    </div>
  );
}

export default function PublicNavigator() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomeScreen />} />
        </Route>
      </Routes>
    </Suspense>
  );
}