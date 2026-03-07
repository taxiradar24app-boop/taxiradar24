// src/services/subscriptionService.js

function normalizeBase(url) {
  if (!url) return "";
  return url.replace(/\/$/, "");
}

export function getApiBase() {
  // CRA / Webpack
  const envBase = process.env.REACT_APP_API_BASE;

  // fallback por seguridad (producción)
  const fallback = "https://taxiradar24-academy-api.taxiradar24audio.workers.dev";

  const base = normalizeBase(envBase || fallback);

  if (!envBase) {
    console.warn(
      "⚠️ REACT_APP_API_BASE no definido, usando fallback:",
      fallback
    );
  }

  return base;
}

export async function fetchMySubscription(firebaseUser) {
  if (!firebaseUser) throw new Error("No user");

  const token = await firebaseUser.getIdToken();

  const apiBase = getApiBase();

  const res = await fetch(`${apiBase}/academy/subscription/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      data?.error || data?.message || "Error consultando suscripción";
    throw new Error(msg);
  }

  return data; // { ok, uid, plan, status, expires_at }
}

export function isSubscriptionActive(sub) {
  return sub?.status === "active";
}