const CACHE_NAME = "las7-shell-v2";

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./version.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {

  if (event.data && event.data.type === "CLEAR_CACHE") {

    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    }).then(() => {

      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({
          type: "CACHE_CLEARED"
        });
      }

    });

  }

});

self.addEventListener("fetch", (event) => {

  const request = event.request;

  if (request.method !== "GET") return;

  const isAppFile =
    request.mode === "navigate" ||
    request.url.endsWith("/index.html") ||
    request.url.endsWith("/style.css") ||
    request.url.endsWith("/app.js") ||
    request.url.endsWith("/manifest.webmanifest") ||
    request.url.endsWith("/version.json");

  if (isAppFile) {

    event.respondWith(

      fetch(request, {
        cache: "no-store"
      })

      .then((response) => {

        const copy = response.clone();

        caches.open(CACHE_NAME)
          .then((cache) => cache.put(request, copy));

        return response;

      })

      .catch(() => {

        return caches.match(request)
          .then((cached) => {

            return cached || caches.match("./index.html");

          });

      })

    );

    return;
  }

  event.respondWith(

    caches.match(request)
      .then((cached) => cached || fetch(request))

  );

});