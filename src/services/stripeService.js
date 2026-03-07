import { getAuth } from "./firebaseConfig";

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
      "⚠️ VITE_API_BASE no definido en stripeService, usando fallback:",
      fallback
    );
  }

  return base;
}

export async function createCheckoutSession(plan) {
  const auth = await getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const token = await user.getIdToken();
  const apiBase = getApiBase();

  if (!apiBase) {
    throw new Error("API base no disponible para Stripe");
  }

  const response = await fetch(`${apiBase}/stripe/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ plan }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Stripe error");
  }

  if (!data?.url) {
    throw new Error("Stripe checkout URL not returned by API");
  }

  return data.url;
}