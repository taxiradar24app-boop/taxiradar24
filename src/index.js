import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

const App = lazy(() => import("./App"));

const appBootFallbackStyle = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background: "#0a1528",
  color: "#ffffff",
  fontSize: "1rem",
  fontWeight: 600,
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Suspense fallback={<div style={appBootFallbackStyle}>Cargando TaxiRadar24…</div>}>
    <App />
  </Suspense>
);