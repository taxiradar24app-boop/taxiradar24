import { getAuth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

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
      "⚠️ API base no definida en stripeService, usando fallback:",
      fallback
    );
  }

  return base;
}

async function waitForAuthenticatedUser(timeoutMs = 10000) {
  const auth = await getAuth();

  if (auth.currentUser) {
    return auth.currentUser;
  }

  return new Promise((resolve, reject) => {
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      if (unsubscribe) unsubscribe();
      reject(new Error("User not authenticated"));
    }, timeoutMs);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || settled) return;
      settled = true;
      clearTimeout(timer);
      unsubscribe();
      resolve(user);
    });
  });
}

export async function createCheckoutSession(plan) {
  if (!plan) {
    throw new Error("Plan no especificado");
  }

  const user = await waitForAuthenticatedUser();
  const token = await user.getIdToken(true);
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