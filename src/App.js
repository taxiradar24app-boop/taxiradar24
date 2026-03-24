import React, { useEffect, Suspense, lazy } from "react";
import { HashRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext.js";
import { GlobalStyle } from "./Styles/globalStyles";

import { AuthProvider, useAuth } from "./context/AuthContext";
import CookieConsent from "./components/CookieConsent";

const Navigator = lazy(() => import("./navigator/navigator"));
const PhoneVerification = lazy(() => import("./hooks/usePhoneVerification"));
const IdentityMergeScreen = lazy(() => import("./Screens/IdentityMergeScreen"));

const appScreenFallbackStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#10a37f",
  fontSize: "1.1rem",
  background: "#0a1528",
};

function AppContent() {
  const { user, phoneVerified, hasIdentityConflict } = useAuth();

  // 🔥 YA NO BLOQUEAMOS EL RENDER
  if (user && hasIdentityConflict) {
    return <IdentityMergeScreen />;
  }

  if (user && !phoneVerified) {
    return <PhoneVerification />;
  }

  return <Navigator />;
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
        <AuthProvider>
          <GlobalStyle />

          <Suspense
            fallback={
              <div style={appScreenFallbackStyle}>Cargando módulo…</div>
            }
          >
            <AppContent />
          </Suspense>

          <CookieConsent />
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  );
}