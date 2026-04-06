import React, { useEffect, Suspense, lazy } from "react";
import { HashRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext.js";
import { GlobalStyle } from "./Styles/globalStyles";

import CookieConsent from "./components/CookieConsent";

// ✅ Navigator lazy OK
const Navigator = lazy(() => import("./navigator/navigator"));

// ❌ ELIMINAMOS lazy en AuthProvider
import { AuthProvider } from "./context/AuthContext";

const appScreenFallbackStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#10a37f",
  fontSize: "1.1rem",
  background: "#0a1528",
};

export default function App() {
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (consent === "accepted") {
      import("./services/analytics.js").then(({ initAnalytics }) =>
        initAnalytics()
      );
    }
  }, []);

  return (
    <ThemeProvider>
      <HashRouter>
        <GlobalStyle />

        {/* ✅ AuthProvider SIN lazy */}
        <AuthProvider>
          <Suspense
            fallback={
              <div style={appScreenFallbackStyle}>Cargando…</div>
            }
          >
            <Navigator />
          </Suspense>
        </AuthProvider>

        <CookieConsent />
      </HashRouter>
    </ThemeProvider>
  );
}