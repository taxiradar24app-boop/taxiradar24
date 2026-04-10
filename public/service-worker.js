const CACHE_NAME = "taxiradar24-cache-v38";

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
  console.log("[SW] Installing", CACHE_NAME);

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activated", CACHE_NAME);

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

  if (url.pathname.startsWith("/__/")) {
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
    url.hostname.includes("google.com");

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
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put("/index.html", clone);
            });
          }
          return response;
        })
        .catch(async () => {
          const cached =
            (await caches.match("/index.html")) || (await caches.match("/"));
          if (cached) return cached;
          throw new Error("No cached index.html available");
        })
    );
    return;
  }

  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  if (url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
    event.respondWith(
      fetch(request)
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
              cache.put(request, clone);
            });
          }

          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  if (url.pathname.endsWith(".json")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const contentType = response.headers.get("content-type") || "";

          if (
            response &&
            response.status === 200 &&
            contentType.includes("application/json")
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }

          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
        }
        return response;
      });
    })
  );
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