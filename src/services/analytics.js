// src/services/analytics.js

let analyticsInstance = null;

export async function initAnalytics() {
  if (analyticsInstance) return analyticsInstance;

  try {
    const { getAnalytics, logEvent } = await import("firebase/analytics");
    const { app } = await import("./firebaseApp");

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