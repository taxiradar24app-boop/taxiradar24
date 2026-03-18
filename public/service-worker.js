const CACHE_NAME = "taxiradar24-cache-v28";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/assets/favicon-16x16.png",
  "/assets/favicon-32x32.png",
  "/assets/favicon-48x48.png",
  "/assets/logo192.png",
  "/assets/logo512.png",
  "/assets/maskable-icon.png",
  "/assets/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  console.log("[SW] Instalando v28");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activado v28");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  if (url.pathname.startsWith("/assets/") || url.pathname === "/favicon.ico") {
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

  if (
    url.pathname === "/" ||
    url.pathname === "/index.html" ||
    url.pathname.endsWith(".json")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }

          return response;
        })
        .catch(() =>
          caches
            .match(event.request)
            .then((cached) => cached || caches.match("/index.html"))
        )
    );
  }
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "TaxiRadar24";

  const options = {
    body: data.body || "Tienes una nueva notificación.",
    icon: "/assets/logo192.png",
    badge: "/assets/logo192.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});