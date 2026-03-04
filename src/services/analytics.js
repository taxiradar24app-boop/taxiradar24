// src/services/analytics.js
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "./../services/firebaseApp";

let analyticsInitialized = false;

export function initAnalytics() {
  if (analyticsInitialized) return;

  try {
    const analytics = getAnalytics(app);
    analyticsInitialized = true;
    logEvent(analytics, "consent_accepted");
    console.log("✅ Firebase Analytics inicializado con consentimiento del usuario.");
  } catch (error) {
    console.warn("⚠️ No se pudo iniciar Firebase Analytics:", error);
  }
}
