// src/services/stripeService.js
import { getAuth } from "./firebaseConfig";

const WORKER_URL = process.env.REACT_APP_API_BASE;

export async function createCheckoutSession(plan) {
  const auth = await getAuth();

  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();

  const response = await fetch(`${WORKER_URL}/stripe/create-checkout-session`, {
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

  return data.url;
}