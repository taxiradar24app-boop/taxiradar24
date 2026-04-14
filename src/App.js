import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext.js";
import { GlobalStyle } from "./Styles/globalStyles";
import CookieConsent from "./PrivacyPolicies/CookieConsent.js";
import { HelmetProvider } from "react-helmet-async";

const Navigator = lazy(() => import("./navigator/navigator"));

const AuthProvider = lazy(() =>
  import("./context/AuthContext").then((mod) => ({
    default: mod.AuthProvider || mod.default,
  }))
);

const COOKIE_STATUS_KEY = "taxiradar24_cookie_consent_status_v1";
const COOKIE_PREFS_KEY = "taxiradar24_cookie_consent_v1";

const appScreenFallbackStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#10a37f",
  fontSize: "1.05rem",
  background: "#0a1528",
};

function AppFallback() {
  return <div style={appScreenFallbackStyle}>Cargando…</div>;
}

function ToastCenter({
  updateReady,
  installReady,
  onUpdate,
  onInstall,
  onCloseUpdate,
  onCloseInstall,
}) {
  if (!updateReady && !installReady) return null;

  return (
    <div style={toastWrapStyle}>
      {updateReady && (
        <div style={toastCardStyle}>
          <div style={toastTextBlockStyle}>
            <div style={toastTitleStyle}>Nueva versión disponible</div>
            <div style={toastTextStyle}>
              Hemos preparado una versión más reciente de TaxiRadar24.
            </div>
          </div>

          <div style={toastActionsStyle}>
            <button style={toastGhostButtonStyle} onClick={onCloseUpdate}>
              Más tarde
            </button>
            <button style={toastPrimaryButtonStyle} onClick={onUpdate}>
              Actualizar
            </button>
          </div>
        </div>
      )}

      {!updateReady && installReady && (
        <div style={toastCardStyle}>
          <div style={toastTextBlockStyle}>
            <div style={toastTitleStyle}>Instala la app</div>
            <div style={toastTextStyle}>
              Añade TaxiRadar24 a tu pantalla para abrirla como PWA y recibir las
              nuevas versiones mejor preparadas.
            </div>
          </div>

          <div style={toastActionsStyle}>
            <button style={toastGhostButtonStyle} onClick={onCloseInstall}>
              Cerrar
            </button>
            <button style={toastPrimaryButtonStyle} onClick={onInstall}>
              Instalar app
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [updateReady, setUpdateReady] = useState(false);
  const [installReady, setInstallReady] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

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

  useEffect(() => {
    const handleUpdateReady = () => {
      setUpdateReady(true);
    };

    window.addEventListener("sw-update-ready", handleUpdateReady);
    return () => {
      window.removeEventListener("sw-update-ready", handleUpdateReady);
    };
  }, []);

  useEffect(() => {
    const isStandalone =
      window.matchMedia?.("(display-mode: standalone)")?.matches ||
      window.navigator.standalone === true;

    const dismissed = localStorage.getItem("taxiradar24_install_toast_dismissed") === "true";

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);

      if (!isStandalone && !dismissed) {
        setInstallReady(true);
      }
    };

    const handleAppInstalled = () => {
      setInstallReady(false);
      setDeferredPrompt(null);
      localStorage.removeItem("taxiradar24_install_toast_dismissed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleUpdateNow = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();

      if (registration?.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      setUpdateReady(false);

      setTimeout(() => {
        window.location.reload();
      }, 450);
    } catch (error) {
      console.error("No se pudo actualizar la aplicación:", error);
      window.location.reload();
    }
  };

  const handleInstallNow = async () => {
    try {
      if (!deferredPrompt) {
        return;
      }

      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;

      if (result?.outcome === "accepted") {
        setInstallReady(false);
      }

      setDeferredPrompt(null);
    } catch (error) {
      console.error("No se pudo mostrar el prompt de instalación:", error);
    }
  };

  const handleCloseUpdate = () => {
    setUpdateReady(false);
  };

  const handleCloseInstall = () => {
    setInstallReady(false);
    localStorage.setItem("taxiradar24_install_toast_dismissed", "true");
  };

  return (
    <ThemeProvider>
      <HelmetProvider>
        <BrowserRouter>
          <GlobalStyle />

          <Suspense fallback={<AppFallback />}>
            <AuthProvider>
              <Suspense fallback={<AppFallback />}>
                <Navigator />
              </Suspense>
            </AuthProvider>
          </Suspense>

          <ToastCenter
            updateReady={updateReady}
            installReady={installReady}
            onUpdate={handleUpdateNow}
            onInstall={handleInstallNow}
            onCloseUpdate={handleCloseUpdate}
            onCloseInstall={handleCloseInstall}
          />

          <CookieConsent />
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
}

const toastWrapStyle = {
  position: "fixed",
  right: "16px",
  bottom: "16px",
  zIndex: 10050,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "min(92vw, 420px)",
};

const toastCardStyle = {
  background: "rgba(9, 19, 37, 0.96)",
  border: "1px solid rgba(16, 163, 127, 0.34)",
  borderRadius: "18px",
  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.35)",
  padding: "16px",
  backdropFilter: "blur(10px)",
};

const toastTextBlockStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "14px",
};

const toastTitleStyle = {
  color: "#f9fafb",
  fontSize: "1rem",
  fontWeight: 800,
  lineHeight: 1.2,
};

const toastTextStyle = {
  color: "#cbd5e1",
  fontSize: "0.95rem",
  lineHeight: 1.5,
};

const toastActionsStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const toastPrimaryButtonStyle = {
  border: "none",
  borderRadius: "12px",
  padding: "12px 14px",
  background: "linear-gradient(135deg, #10a37f, #34d399)",
  color: "#052e2b",
  fontWeight: 800,
  cursor: "pointer",
};

const toastGhostButtonStyle = {
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "12px",
  padding: "12px 14px",
  background: "transparent",
  color: "#f8fafc",
  fontWeight: 700,
  cursor: "pointer",
};