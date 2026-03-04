import React, { useEffect, Suspense } from "react";
import { HashRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext.js";
import { GlobalStyle } from "./Styles/globalStyles";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Navigator from "./navigator/navigator";
import PhoneVerification from "./hooks/usePhoneVerification";
import CookieConsent from "./components/CookieConsent";

// ✅ NUEVO
import IdentityMergeScreen from "./Screens/IdentityMergeScreen";

function AppContent() {
  const { user, loading, phoneVerified, hasIdentityConflict } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
          fontFamily: "System, -apple-system, Segoe UI, Roboto, Arial",
        }}
      >
        Cargando…
      </div>
    );
  }

  // =====================================================
  // 🧨 BLOQUEO INMEDIATO (Enterprise) — Opción A
  // Si hay conflicto de identidad, NO dejamos seguir
  // =====================================================
  if (user && hasIdentityConflict) return <IdentityMergeScreen />;

  // Tu lógica existente
  if (user && !phoneVerified) return <PhoneVerification />;

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

          {/* 🚀 Lazy Loading Activado */}
          <Suspense
            fallback={
              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10a37f",
                  fontSize: "1.2rem",
                }}
              >
                Cargando módulo…
              </div>
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