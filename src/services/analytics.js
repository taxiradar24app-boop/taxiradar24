// src/services/analytics.js

import { getApp } from "./firebaseConfig";

let analyticsInstance = null;

export async function initAnalytics() {
  if (analyticsInstance) return analyticsInstance;

  try {
    const app = await getApp();
    const { getAnalytics, logEvent, isSupported } = await import(
      "firebase/analytics"
    );

    const supported = await isSupported().catch(() => false);
    if (!supported) {
      console.warn("⚠️ Firebase Analytics no está soportado en este entorno.");
      return null;
    }

    const analytics = getAnalytics(app);

    analyticsInstance = analytics;
    logEvent(analytics, "consent_accepted");

    console.log("✅ Firebase Analytics inicializado (lazy)");
    return analytics;
  } catch (error) {
    console.warn("⚠️ No se pudo iniciar Firebase Analytics:", error);
    return null;
  }
}