import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js");

      if (registration.waiting) {
        window.dispatchEvent(new CustomEvent("sw-update-ready"));
      }

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            window.dispatchEvent(new CustomEvent("sw-update-ready"));
          }
        });
      });
    } catch (error) {
      console.error("Error registrando service worker:", error);
    }
  });

  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data?.type === "SW_ACTIVATED") {
      sessionStorage.setItem("app_update_ready", "true");
      window.dispatchEvent(
        new CustomEvent("sw-version-activated", {
          detail: { version: event.data.version },
        })
      );
    }
  });

  document.addEventListener("visibilitychange", () => {
    const updateReady = sessionStorage.getItem("app_update_ready") === "true";

    if (document.visibilityState === "visible" && updateReady) {
      sessionStorage.removeItem("app_update_ready");
      window.location.reload();
    }
  });
}