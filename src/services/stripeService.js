import { getAuth } from "./firebaseConfig";
import { getDb } from "./firebaseConfig";
import { getApiBase } from "./subscriptionService";

async function fs() {
  return await import("firebase/firestore");
}

async function waitForAuthenticatedUser(timeoutMs = 10000) {
  const auth = await getAuth();
  const { onAuthStateChanged } = await import("firebase/auth");

  if (auth.currentUser) {
    return auth.currentUser;
  }

  return new Promise((resolve, reject) => {
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      if (typeof unsubscribe === "function") unsubscribe();
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
  function getApiBase() {
  return "https://taxiradar24-academy-api.taxiradar24audio.workers.dev";
}

  const user = await waitForAuthenticatedUser();

  // 🔥 VALIDACIÓN DE IDENTIDAD COMPLETA
  await user.reload();

  if (!user.emailVerified) {
    window.location.href = "/check-email";
    return;
  }

  const db = await getDb();
  const { doc, getDoc } = await fs();

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    throw new Error("Usuario no encontrado");
  }

  const userData = snap.data();

  if (!userData.phoneVerified) {
    window.location.href = "/verify";
    return;
  }

  if (userData.needsMerge) {
    window.location.href = "/identity-merge";
    return;
  }

  // 🔐 SI TODO OK → STRIPE
  const token = await user.getIdToken(true);
  const apiBase = getApiBase();

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