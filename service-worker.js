const CACHE_NAME = 'evalinictec4-v2.3';
const urlsToCache = [
  './',
  './index.html',
  './logo.png',
  './favicon.ico',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      // Caché resiliente: cada URL de forma independiente. Si un CDN falla,
      // la instalación del SW no se aborta (con addAll sí lo haría).
      Promise.allSettled(urlsToCache.map(u => cache.add(u)))
    )
  );
});

// Activación: limpiar SOLO las cachés propias (prefijo 'evalinictec4-').
// En un origen compartido caches.keys() devuelve TODAS las cachés del dominio:
// filtrar por prefijo evita borrar las cachés del portal y de las demás apps.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k.startsWith('evalinictec4-') && k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
