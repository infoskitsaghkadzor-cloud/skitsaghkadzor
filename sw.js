/* Ski Tsaghkadzor PWA Service Worker */
const CACHE_NAME = 'skitsaghkadzor-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/register.html',
  '/booking.html',
  '/css/styles.css',
  '/js/translations.js',
  '/js/i18n.js',
  '/images/logo.png',
  '/manifest.json'
];

function basePath() {
  const path = self.location.pathname.replace(/\/[^/]*$/, '');
  return path || '';
}
function scopePath(path) {
  const base = basePath();
  const p = path.startsWith('/') ? path : '/' + path;
  return base + p;
}

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS.map(scopePath));
    }).then(function () {
      return self.skipWaiting();
    }).catch(function () {})
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (n) { return n !== CACHE_NAME; }).map(function (n) { return caches.delete(n); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      if (cached) return cached;
      return fetch(e.request).then(function (res) {
        const clone = res.clone();
        if (res.ok && res.type === 'basic') {
          caches.open(CACHE_NAME).then(function (cache) { cache.put(e.request, clone); });
        }
        return res;
      }).catch(function () {
        return caches.match(scopePath('/index.html')).then(function (r) { return r || caches.match('/index.html'); });
      });
    })
  );
});
