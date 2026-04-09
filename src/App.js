import React, { Suspense, lazy, useEffect } from "react";
import { HashRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext.js";
import { GlobalStyle } from "./Styles/globalStyles";
import CookieConsent from "./components/CookieConsent";

const Navigator = lazy(() => import("./navigator/navigator"));

const AuthProvider = lazy(() =>
  import("./context/AuthContext").then((mod) => ({
    default: mod.AuthProvider || mod.default,
  }))
);

const appScreenFallbackStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#10a37f",
  fontSize: "1.1rem",
  background: "#0a1528",
};

function AppFallback() {
  return <div style={appScreenFallbackStyle}>Cargando…</div>;
}

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

        <Suspense fallback={<AppFallback />}>
          <AuthProvider>
            <Suspense fallback={<AppFallback />}>
              <Navigator />
            </Suspense>
          </AuthProvider>
        </Suspense>

        <CookieConsent />
      </HashRouter>
    </ThemeProvider>
  );
}