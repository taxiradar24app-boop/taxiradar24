import React, { Suspense, lazy, useEffect } from "react";
import { HashRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext.js";
import { GlobalStyle } from "./Styles/globalStyles";
import CookieConsent from "./PrivacyPolicies/CookieConsent.js";

const Navigator = lazy(() => import("./navigator/navigator"));

const AuthProvider = lazy(() =>
  import("./context/AuthContext").then((mod) => ({
    default: mod.AuthProvider || mod.default,
  }))
);

const COOKIE_STATUS_KEY = "taxiradar24_cookie_consent_status_v1";
const COOKIE_PREFS_KEY = "taxiradar24_cookie_consent_v1";

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
    try {
      const consentStatus = localStorage.getItem(COOKIE_STATUS_KEY);
      const savedPrefs = localStorage.getItem(COOKIE_PREFS_KEY);

      if (!consentStatus || !savedPrefs) return;

      const parsedPrefs = JSON.parse(savedPrefs);
      const analyticsAccepted = !!parsedPrefs?.analytics;

      if (
        (consentStatus === "accepted_all" || consentStatus === "customized") &&
        analyticsAccepted
      ) {
        import("./services/analytics.js")
          .then(({ initAnalytics }) => {
            if (typeof initAnalytics === "function") {
              initAnalytics();
            }
          })
          .catch((error) => {
            console.error("No se pudo inicializar analytics:", error);
          });
      }
    } catch (error) {
      console.error("Error leyendo el consentimiento de cookies:", error);
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