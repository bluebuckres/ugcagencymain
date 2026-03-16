// sw.js
const CACHE_NAME = 'makeugc-v2';
const STATIC_ASSETS = [
    '/',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

/** Only cache same-origin http/https GET requests — never chrome-extension, data:, etc. */
function isCacheable(request) {
    const url = new URL(request.url);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    // Skip Next.js dynamic image optimiser — it requires a live server
    if (url.pathname.startsWith('/_next/image')) return false;
    // Skip third-party analytics / tracking (PostHog, etc.)
    if (!url.hostname.endsWith('makeugc.in') && !url.hostname.endsWith('neetocal.com')) return false;
    return true;
}

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    // Always skip non-cacheable requests — let the browser handle them normally
    if (!isCacheable(event.request)) return;

    // Network-first for navigation requests
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => caches.match('/'))
        );
        return;
    }

    // Cache-first for static images and fonts (same-origin only)
    if (
        event.request.destination === 'image' ||
        event.request.destination === 'font'
    ) {
        event.respondWith(
            caches.match(event.request).then((cached) => {
                if (cached) return cached;
                return fetch(event.request).then((fetchRes) => {
                    // Only cache valid, opaque-safe responses
                    if (!fetchRes || fetchRes.status !== 200 || fetchRes.type === 'error') {
                        return fetchRes;
                    }
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, fetchRes.clone());
                        return fetchRes;
                    });
                });
            })
        );
        return;
    }

    // Network-first for everything else (JS, CSS, pages)
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (!response || response.status !== 200 || response.type === 'error') {
                    return response;
                }
                const resClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
