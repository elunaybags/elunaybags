const CACHE = 'elunay-v9';
const FILES = ['./', './index.html', './manifest.webmanifest', './img/portada.jpg', './img/trenza.webp', './img/trenza-1.jpg', './img/trenza-2.jpg', './img/cacao.webp', './img/arena.webp', './img/flecos.webp', './img/burdeos.webp', './img/noir.webp', './img/bosque.webp', './img/chocolate.webp', './img/terciopelo.webp', './img/plata.webp', './img/movil-oliva.webp', './img/movil-burdeos.webp', './img/movil-oliva-1.jpg', './img/movil-oliva-2.jpg', './img/movil-burdeos-1.jpg', './img/movil-duo.jpg', './img/icon-192.png', './img/icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); if (r.ok && new URL(e.request.url).origin === location.origin) caches.open(CACHE).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then((m) => m || caches.match('./index.html'))));
});
