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

async function getAuthHeaders(firebaseUser) {
  if (!firebaseUser) {
    throw new Error("No user");
  }

  const token = await firebaseUser.getIdToken(true);

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function readJsonSafe(res) {
  return res.json().catch(() => ({}));
}

export async function fetchMySubscription(firebaseUser) {
  if (!firebaseUser) {
    throw new Error("No user");
  }

  const apiBase = getApiBase();

  if (!apiBase) {
    throw new Error("API base no disponible");
  }

  const res = await fetch(`${apiBase}/academy/subscription/me`, {
    method: "GET",
    headers: await getAuthHeaders(firebaseUser),
  });

  const data = await readJsonSafe(res);

  if (!res.ok) {
    const msg =
      data?.error || data?.message || "Error consultando suscripción";
    throw new Error(msg);
  }

  return data;
}

export async function cancelSubscription(firebaseUser) {
  if (!firebaseUser) {
    throw new Error("No user");
  }

  const apiBase = getApiBase();

  if (!apiBase) {
    throw new Error("API base no disponible");
  }

  const res = await fetch(`${apiBase}/stripe/cancel-subscription`, {
    method: "POST",
    headers: await getAuthHeaders(firebaseUser),
    body: JSON.stringify({}),
  });

  const data = await readJsonSafe(res);

  if (!res.ok) {
    const msg =
      data?.error || data?.message || "No se pudo cancelar la suscripción";
    throw new Error(msg);
  }

  return data;
}

export async function requestRefund(firebaseUser) {
  if (!firebaseUser) {
    throw new Error("No user");
  }

  const apiBase = getApiBase();

  if (!apiBase) {
    throw new Error("API base no disponible");
  }

  const res = await fetch(`${apiBase}/stripe/request-refund`, {
    method: "POST",
    headers: await getAuthHeaders(firebaseUser),
    body: JSON.stringify({}),
  });

  const data = await readJsonSafe(res);

  if (!res.ok) {
    const msg =
      data?.error || data?.message || "No se pudo solicitar el reembolso";
    throw new Error(msg);
  }

  return data;
}

export function isSubscriptionActive(sub) {
  return sub?.active === true;
}

export function isAcademiaPro(sub) {
  return sub?.active === true;
}