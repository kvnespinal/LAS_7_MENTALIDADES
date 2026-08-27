const CACHE_NAME = "las7-shell-v1.1.5";

const APP_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.webmanifest",
    "./version.json",
    "./assets/background.png",
    "./assets/01_CRECE.svg",
    "./assets/02_MULTIPLAZA.svg",
    "./assets/03_METROMALL.svg",
    "./assets/04_GRUPO_ROBLE.svg",
    "./assets/05_GRAFISMO.svg",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);

        /*
         * Cache every file independently so one missing asset cannot
         * abort installation of the whole offline shell.
         */
        for (const file of APP_FILES) {
            try {
                const response = await fetch(file, { cache: "no-store" });
                if (response.ok) {
                    await cache.put(file, response.clone());
                }
            } catch (error) {
                console.warn("Precache skipped:", file);
            }
        }

        await self.skipWaiting();
    })());
});

self.addEventListener("activate", event => {
    event.waitUntil((async () => {
        const keys = await caches.keys();

        await Promise.all(
            keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
        );

        await self.clients.claim();
    })());
});

self.addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener("fetch", event => {
    const request = event.request;

    if (request.method !== "GET") return;

    /*
     * Navigation: cache-first.
     * This is what allows the MUPI to start with Wi-Fi completely OFF.
     */
    if (request.mode === "navigate") {
        event.respondWith((async () => {
            const cached = await caches.match("./index.html");

            if (cached) {
                /*
                 * Refresh the cached HTML in the background when online.
                 * The response shown to the user always comes from cache.
                 */
                fetch(request, { cache: "no-store" })
                    .then(response => {
                        if (response && response.ok) {
                            return caches.open(CACHE_NAME).then(cache =>
                                cache.put("./index.html", response.clone())
                            );
                        }
                    })
                    .catch(() => {});

                return cached;
            }

            /*
             * First ever load: network is allowed because there is no cache yet.
             */
            return fetch(request);
        })());

        return;
    }

    /*
     * All application resources: cache-first.
     * If a resource is not cached, use the network and cache it when possible.
     */
    event.respondWith((async () => {
        const cached = await caches.match(request);

        if (cached) {
            if (navigator.onLine) {
                fetch(request)
                    .then(response => {
                        if (response && response.ok) {
                            caches.open(CACHE_NAME).then(cache =>
                                cache.put(request, response.clone())
                            );
                        }
                    })
                    .catch(() => {});
            }

            return cached;
        }

        try {
            const response = await fetch(request);

            if (response && response.ok) {
                const url = new URL(request.url);

                if (url.origin === self.location.origin) {
                    const cache = await caches.open(CACHE_NAME);
                    await cache.put(request, response.clone());
                }
            }

            return response;
        } catch (error) {
            return caches.match("./index.html");
        }
    })());
});
