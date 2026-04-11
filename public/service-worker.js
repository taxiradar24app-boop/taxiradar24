const CACHE_NAME = "taxiradar24-cache-v42";

const APP_SHELL_CACHE = CACHE_NAME;
const RUNTIME_CACHE = `${CACHE_NAME}-runtime`;
const IMAGE_CACHE = `${CACHE_NAME}-images`;
const JSON_CACHE = `${CACHE_NAME}-json`;

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/favicon.ico",
  "/assets/favicon-16x16.png",
  "/assets/favicon-32x32.png",
  "/assets/logo192.png",
  "/assets/logo512.png",
  "/assets/maskable-icon.png",
  "/assets/apple-touch-icon.v2.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys.map((key) => {
          if (
            key !== APP_SHELL_CACHE &&
            key !== RUNTIME_CACHE &&
            key !== IMAGE_CACHE &&
            key !== JSON_CACHE
          ) {
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

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  const isFirebaseInternal = url.pathname.startsWith("/__/");
  if (isFirebaseInternal) {
    event.respondWith(fetch(request));
    return;
  }

  const isSensitiveRequest =
    url.pathname.startsWith("/api/") ||
    url.hostname.includes("workers.dev") ||
    url.hostname.includes("googleapis.com") ||
    url.hostname.includes("firebaseapp.com") ||
    url.hostname.includes("firebaseio.com") ||
    url.hostname.includes("gstatic.com") ||
    url.hostname.includes("google.com") ||
    url.hostname.includes("stripe.com");

  if (isSensitiveRequest) {
    event.respondWith(fetch(request));
    return;
  }

  const isNavigationRequest =
    request.mode === "navigate" ||
    request.destination === "document" ||
    (request.headers.get("accept") || "").includes("text/html");

  if (isNavigationRequest) {
    event.respondWith(
      fetch(request).catch(async () => {
        const cached =
          (await caches.match("/index.html")) || (await caches.match("/"));
        if (cached) return cached;
        throw new Error("No cached app shell available");
      })
    );
    return;
  }

  const isImageRequest =
    request.destination === "image" || url.pathname.startsWith("/assets/");

  if (isImageRequest) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  const isStaticCodeRequest =
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".woff") ||
    url.pathname.endsWith(".ttf");

  if (isStaticCodeRequest) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
    return;
  }

  const isJsonRequest = url.pathname.endsWith(".json");
  if (isJsonRequest) {
    event.respondWith(networkFirst(request, JSON_CACHE));
    return;
  }

  event.respondWith(networkFirst(request, RUNTIME_CACHE));
});

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

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (isCacheable(response)) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (isCacheable(response)) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request)
    .then(async (response) => {
      if (isCacheable(response)) {
        const cache = await caches.open(cacheName);
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  return cached || fetchPromise;
}

function isCacheable(response) {
  return !!response && response.status === 200;
}