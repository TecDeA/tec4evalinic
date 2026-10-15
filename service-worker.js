const CACHE_NAME = 'evalinictec4-v2.1';
const urlsToCache = [
  '/TEC4EvalInic/',
  '/TEC4EvalInic/index.html',
  '/TEC4EvalInic/logo.png',
  '/TEC4EvalInic/favicon.ico',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});