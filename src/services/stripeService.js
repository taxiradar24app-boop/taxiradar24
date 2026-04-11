import { getAuth, getDb } from "./firebaseConfig";
import { getApiBase } from "./subscriptionService";
import { getAuthIntent, saveAuthIntent } from "@/services/authIntentService";

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
    let unsubscribe = null;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      if (typeof unsubscribe === "function") unsubscribe();
      reject(new Error("User not authenticated"));
    }, timeoutMs);

    unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || settled) return;
      settled = true;
      clearTimeout(timer);
      unsubscribe();
      resolve(user);
    });
  });
}

function getCurrentAppPath() {
  try {
    const pathname = window.location.pathname || "/";
    const search = window.location.search || "";
    return `${pathname}${search}`;
  } catch {
    return "/";
  }
}

function redirectWithIntent(path, source = "stripe_checkout_guard") {
  const currentIntent = getAuthIntent();
  const currentPath = getCurrentAppPath();

  if (!currentIntent?.redirectTo) {
    saveAuthIntent({
      redirectTo: currentPath || "/academia/upgrade",
      source,
    });
  }

  window.location.href = path;
}

export async function createCheckoutSession(plan) {
  if (!plan) {
    throw new Error("Plan no especificado");
  }

  const user = await waitForAuthenticatedUser();

  await user.reload();

  if (!user.emailVerified) {
    redirectWithIntent("/check-email", "stripe_email_required");
    return null;
  }

  const db = await getDb();
  const { doc, getDoc } = await fs();

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    throw new Error("Usuario no encontrado");
  }

  const userData = snap.data() || {};

  if (userData.needsMerge) {
    redirectWithIntent("/identity-merge", "stripe_identity_conflict");
    return null;
  }

  if (!userData.phoneVerified) {
    redirectWithIntent("/verify", "stripe_phone_required");
    return null;
  }

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