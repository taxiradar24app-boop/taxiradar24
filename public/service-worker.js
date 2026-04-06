const CACHE_NAME = "taxiradar24-cache-v34";

const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/assets/favicon.ico",
  "/assets/favicon-16x16.png",
  "/assets/favicon-32x32.png",
  "/assets/logo192.png",
  "/assets/logo512.png",
  "/assets/maskable-icon.png",
  "/assets/apple-touch-icon.v2.png",
];

// =======================
// INSTALL
// =======================
self.addEventListener("install", (event) => {
  console.log("[SW] Installing v34");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );

  self.skipWaiting();
});

// =======================
// ACTIVATE
// =======================
self.addEventListener("activate", (event) => {
  console.log("[SW] Activated v34");

  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      );

      await self.clients.claim();

      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of clients) {
        client.postMessage({
          type: "SW_ACTIVATED",
          version: CACHE_NAME,
        });
      }
    })()
  );
});

// =======================
// FETCH
// =======================
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  // 🔥 CRÍTICO: nunca interceptar namespace reservado de Firebase
  if (url.pathname.startsWith("/__/")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Nunca cachear HTML principal
  if (url.pathname === "/" || url.pathname === "/index.html") {
    event.respondWith(fetch(event.request));
    return;
  }

  // Nunca cachear auth / api / workers / google / firebase
  const isSensitiveRequest =
    url.pathname.startsWith("/api/") ||
    url.hostname.includes("workers.dev") ||
    url.hostname.includes("googleapis.com") ||
    url.hostname.includes("firebaseapp.com") ||
    url.hostname.includes("firebaseio.com") ||
    url.hostname.includes("gstatic.com") ||
    url.hostname.includes("google.com");

  if (isSensitiveRequest) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Assets estáticos: cache first
  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;

        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // JS / CSS: network first + validar tipo real
  if (url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const contentType = response.headers.get("content-type") || "";
          const isJs = url.pathname.endsWith(".js");
          const isCss = url.pathname.endsWith(".css");

          const validJs =
            isJs &&
            (contentType.includes("javascript") ||
              contentType.includes("application/x-javascript") ||
              contentType.includes("text/javascript"));

          const validCss = isCss && contentType.includes("text/css");

          if (response && response.status === 200 && (validJs || validCss)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          } else {
            console.warn("[SW] Skipped caching invalid JS/CSS response:", {
              path: url.pathname,
              status: response?.status,
              contentType,
            });
          }

          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // JSON: network first
  if (url.pathname.endsWith(".json")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const contentType = response.headers.get("content-type") || "";

          if (
            response &&
            response.status === 200 &&
            contentType.includes("application/json")
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }

          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
});

// =======================
// PUSH
// =======================
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "TaxiRadar24";

  const options = {
    body: data.body || "Tienes una nueva notificación.",
    icon: "/assets/logo192.png",
    badge: "/assets/logo192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});