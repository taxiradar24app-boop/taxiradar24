function normalizeBase(url) {
  if (!url) return "";
  return url.replace(/\/$/, "");
}

export function getApiBase() {
  const envBase = import.meta.env.VITE_API_BASE;
  const fallback =
    "https://taxiradar24-academy-api.taxiradar24audio.workers.dev";

  const base = normalizeBase(envBase || fallback);

  if (!envBase) {
    console.warn(
      "⚠️ VITE_API_BASE no definido en subscriptionService, usando fallback:",
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

  return data;
}

export function isSubscriptionActive(sub) {
  return sub?.status === "active";
}