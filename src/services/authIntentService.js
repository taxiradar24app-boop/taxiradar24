// src/services/authIntentService.js

const KEY = "postLoginIntent";

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function isValidRedirectPath(path) {
  return (
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.startsWith("/login") &&
    !path.startsWith("/register")
  );
}

export function saveAuthIntent(intent = {}) {
  if (!isBrowser()) return;

  const payload = {
    redirectTo: isValidRedirectPath(intent.redirectTo) ? intent.redirectTo : "/",
    source: intent.source || "unknown",
    createdAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("⚠️ No se pudo guardar postLoginIntent:", error);
  }
}

export function getAuthIntent() {
  if (!isBrowser()) return null;

  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    return {
      redirectTo: isValidRedirectPath(parsed?.redirectTo)
        ? parsed.redirectTo
        : "/",
      source: parsed?.source || "unknown",
      createdAt: parsed?.createdAt || null,
    };
  } catch (error) {
    console.warn("⚠️ No se pudo leer postLoginIntent:", error);
    return null;
  }
}

export function clearAuthIntent() {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(KEY);
  } catch (error) {
    console.warn("⚠️ No se pudo limpiar postLoginIntent:", error);
  }
}

export function resolveIntentRedirect(fallback = "/") {
  const intent = getAuthIntent();
  if (intent?.redirectTo && isValidRedirectPath(intent.redirectTo)) {
    return intent.redirectTo;
  }
  return fallback;
}

export function buildAuthIntent({
  redirectTo,
  source = "unknown",
  fallback = "/",
} = {}) {
  return {
    redirectTo: isValidRedirectPath(redirectTo) ? redirectTo : fallback,
    source,
  };
}