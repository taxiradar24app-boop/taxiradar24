// src/services/subscriptionService.js

export function getApiBase() {
  // CRA / Webpack
  const base = process.env.REACT_APP_API_BASE;
  if (!base) return "";
  return base.replace(/\/$/, "");
}

export async function fetchMySubscription(firebaseUser) {
  if (!firebaseUser) throw new Error("No user");
  const token = await firebaseUser.getIdToken();

  const apiBase = getApiBase();
  if (!apiBase) {
    throw new Error(
      "REACT_APP_API_BASE no está definido. Debe apuntar a tu Worker (API)."
    );
  }

  const res = await fetch(`${apiBase}/academy/subscription/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.error || data?.message || "Error consultando suscripción";
    throw new Error(msg);
  }

  return data; // { ok, uid, plan, status, expires_at }
}

export function isSubscriptionActive(sub) {
  return sub?.status === "active";
}