function normalizeBase(url) {
  if (!url) return "";
  return String(url).replace(/\/$/, "");
}

function readEnvValue(key) {
  if (
    typeof process !== "undefined" &&
    process.env &&
    typeof process.env[key] !== "undefined"
  ) {
    return process.env[key];
  }

  if (
    typeof window !== "undefined" &&
    window.__ENV__ &&
    typeof window.__ENV__[key] !== "undefined"
  ) {
    return window.__ENV__[key];
  }

  return undefined;
}

export function getApiBase() {
  const envBase =
    readEnvValue("REACT_APP_API_BASE") || readEnvValue("API_BASE");
  const fallback =
    "https://taxiradar24-academy-api.taxiradar24audio.workers.dev";

  const base = normalizeBase(envBase || fallback);

  if (!envBase) {
    console.warn(
      "⚠️ API base no definida en subscriptionService, usando fallback:",
      fallback
    );
  }

  return base;
}

export async function fetchMySubscription(firebaseUser) {
  if (!firebaseUser) {
    throw new Error("No user");
  }

  const token = await firebaseUser.getIdToken(true);
  const apiBase = getApiBase();

  if (!apiBase) {
    throw new Error("API base no disponible");
  }

  const res = await fetch(`${apiBase}/academy/subscription/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      data?.error || data?.message || "Error consultando suscripción";
    throw new Error(msg);
  }

  return data;
}

export function isSubscriptionActive(sub) {
  if (!sub) return false;

  const status = String(sub.status || "").toLowerCase();
  return status === "active" || status === "trialing";
}