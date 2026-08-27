const CACHE_NAME = "las7-shell-v1.1.8";

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

        // Cache every asset independently. One bad/missing file must not
        // prevent the offline shell from being installed.
        await Promise.all(APP_FILES.map(async file => {
            try {
                const response = await fetch(new Request(file, { cache: "reload" }));
                if (response.ok) {
                    await cache.put(file, response.clone());
                }
            } catch (error) {
                console.warn("Precache skipped:", file);
            }
        }));

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

    // The app shell must start from cache whenever it has already been
    // installed. This is what makes a cold launch possible with Wi-Fi OFF.
    if (request.mode === "navigate") {
        event.respondWith((async () => {
            const cache = await caches.open(CACHE_NAME);
            const cached = await cache.match("./index.html");

            if (cached) {
                // Refresh in the background when a network is available.
                fetch(request, { cache: "no-store" })
                    .then(response => {
                        if (response && response.ok) {
                            return cache.put("./index.html", response.clone());
                        }
                    })
                    .catch(() => {});

                return cached;
            }

            // First ever launch: network is necessary to seed the shell.
            try {
                const response = await fetch(request);
                if (response && response.ok) {
                    await cache.put("./index.html", response.clone());
                }
                return response;
            } catch (error) {
                // If even the first load is offline, return whatever shell
                // can be found in any cache.
                return caches.match("./index.html");
            }
        })());

        return;
    }

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);

        if (cached) {
            // Stale-while-refresh for resources: the UI gets the cached
            // resource immediately, while the latest copy is fetched online.
            fetch(request, { cache: "no-store" })
                .then(response => {
                    if (response && response.ok) {
                        cache.put(request, response.clone()).catch(() => {});
                    }
                })
                .catch(() => {});

            return cached;
        }

        try {
            const response = await fetch(request);

            if (response && response.ok) {
                const url = new URL(request.url);
                if (url.origin === self.location.origin) {
                    await cache.put(request, response.clone());
                }
            }

            return response;
        } catch (error) {
            // For missing subresources, fail gracefully. The cached HTML
            // remains available for the next navigation.
            return new Response("", {
                status: 504,
                statusText: "Offline"
            });
        }
    })());
});
