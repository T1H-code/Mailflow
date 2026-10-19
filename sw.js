/* MAILFLOW OS – Service Worker
 * Speichert NUR die App-Dateien (Shell) für den Offline-Start.
 * E-Mails, Tokens und alle Anfragen an Google/Microsoft werden NIE gecacht.
 * Nach Änderungen an den Dateien: VERSION erhöhen, damit Nutzer das Update bekommen.
 */
const VERSION = 'mailflow-v1.2.0';
const SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) if (key !== VERSION) await caches.delete(key);
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Nur eigene Dateien – Google-, Microsoft- und alle anderen Server laufen direkt übers Netz.
  if (url.origin !== self.location.origin) return;
  // OAuth-Rückkehr (?code=…) nie aus dem Cache bedienen.
  if (url.search.includes('code=') || url.search.includes('error=')) return;

  if (req.mode === 'navigate') {
    // Netzwerk zuerst (immer aktuell), offline die gespeicherte App
    event.respondWith(
      fetch(req).catch(async () => (await caches.match('./index.html')) || (await caches.match('./')) || Response.error()),
    );
    return;
  }

  // App-Dateien: schnell aus dem Cache, im Hintergrund aktualisieren
  event.respondWith(
    (async () => {
      const cache = await caches.open(VERSION);
      const hit = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then((res) => {
          if (res.ok && res.type === 'basic') cache.put(req, res.clone());
          return res;
        })
        .catch(() => hit);
      return hit || network;
    })(),
  );
});
