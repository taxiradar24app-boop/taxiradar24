import React, { useEffect, Suspense, lazy } from "react";
import { HashRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext.js";
import { GlobalStyle } from "./Styles/globalStyles";

import CookieConsent from "./components/CookieConsent";

// 🔥 Navigator completo (lazy)
const Navigator = lazy(() => import("./navigator/navigator"));

// 🔥 AuthProvider lazy (CLAVE)
const AuthProviderLazy = lazy(() =>
  import("./context/AuthContext").then((mod) => ({
    default: mod.AuthProvider,
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

        <Suspense
          fallback={
            <div style={appScreenFallbackStyle}>Cargando módulo…</div>
          }
        >
          {/* 🔥 Firebase SOLO se carga aquí */}
          <AuthProviderLazy>
            <Navigator />
          </AuthProviderLazy>
        </Suspense>

        <CookieConsent />
      </HashRouter>
    </ThemeProvider>
  );
}