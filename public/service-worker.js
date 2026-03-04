const CACHE_NAME = "taxiradar24-cache-v17"; // ✅ nueva versión
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/favicon-16x16.png",
  "/assets/favicon-32x32.png",
  "/assets/logo192.png",
  "/assets/logo512.png",
  "/assets/logo192.webp",
  "/assets/logo512.webp",
  "/assets/maskable-icon.webp",
  "/assets/apple-touch-icon.png",
  "/assets/apple-touch-icon.webp"
];

// INSTALACIÓN: Guardar en caché inicial
self.addEventListener("install", (event) => {
  console.log("[SW] Instalando… v15");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// ACTIVACIÓN: limpiar cachés viejos
self.addEventListener("activate", (event) => {
  console.log("[SW] Activado v15");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : null)))
    )
  );
  return self.clients.claim();
});

// FETCH: Network-first para páginas, cache-first para assets
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);

  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  if (url.pathname.startsWith("/assets/") || url.pathname.endsWith(".json")) {
    // cache-first para estáticos
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
  } else {
    // network-first para páginas y API
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("/index.html")))
    );
  }
});

// PUSH: manejar notificaciones push
self.addEventListener("push", (event) => {
  console.log("[SW] Push recibido:", event);
  const data = event.data ? event.data.json() : {};
  const title = data.title || "TaxiRadar24";
  const options = {
    body: data.body || "Tienes una nueva notificación.",
    icon: "/assets/logo192.png",
    badge: "/assets/logo192.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
