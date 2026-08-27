
const CACHE_NAME = "las7-shell-v1.1.5";

const APP_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./ui-1080x1920.css",
    "./app.js",
    "./manifest.webmanifest",
    "./version.json",
    "./assets/background.png",
    "./assets/icon-192.png",
    "./assets/icon-512.png",
    "./assets/01_CRECE.svg",
    "./assets/02_MULTIPLAZA.svg",
    "./assets/03_METROMALL.svg",
    "./assets/04_GRUPO_ROBLE.svg",
    "./assets/05_GRAFISMO.svg"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async cache => {
                /*
                 * Cache files individually. One missing optional asset must
                 * NOT cancel the entire Service Worker installation.
                 */
                for (const file of APP_FILES) {
                    try {
                        const response = await fetch(file, { cache: "no-store" });
                        if (response.ok) {
                            await cache.put(file, response);
                        }
                    } catch (error) {
                        console.warn("No se pudo precachear:", file);
                    }
                }
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys =>
                Promise.all(
                    keys
                        .filter(key => key !== CACHE_NAME)
                        .map(key => caches.delete(key))
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener("message", event => {
    if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

/*
 * Navigation and application shell:
 * CACHE FIRST. This is the critical part for the MUPI.
 *
 * If the device has no Internet, the cached index.html is served
 * immediately. When online, we refresh the cache in the background.
 */
self.addEventListener("fetch", event => {
    const request = event.request;

    if (request.method !== "GET") return;

    const url = new URL(request.url);

    if (request.mode === "navigate") {
        event.respondWith(
            caches.match("./index.html").then(cached => {
                const networkUpdate = fetch(request, { cache: "no-store" })
                    .then(response => {
                        if (response && response.ok) {
                            const copy = response.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => cache.put("./index.html", copy));
                        }
                        return response;
                    })
                    .catch(() => cached);

                /*
                 * If a cached shell exists, return it immediately.
                 * Network refresh happens in the background.
                 */
                return cached || networkUpdate;
            })
        );
        return;
    }

    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;

            return fetch(request)
                .then(response => {
                    if (response && response.ok && url.origin === self.location.origin) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(() => caches.match("./index.html"));
        })
    );
});
