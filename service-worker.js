const cacheName = 'sembako-shop-v1';
const filesToCache = [
  "/",
  "manifest.json",
  "assets/js/register.js",
  "assets/css/bootstrap.css",
  "assets/css/bootstrap.css.map",
  "assets/css/styles.css",
  "assets/image/1.png",
  "assets/image/1.png",
  "assets/js/bootstrap.js",
  "assets/js/bootstrap.js.map",
  "assets/js/jquery-3.3.1.slim.min.js",
  "assets/js/script.js",
  "index.html",
];

self.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  showInstallPromotion();
});
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      return cache.addAll(toCache)
    })
    .then(self.skipWaiting())
  )
})
self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request)
    .catch(() => {
      return caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.match(event.request)
        })
    })
  )
})
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
    .then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Hapus cache lama',
            key)
          return caches.delete(key)
        }
      }))
    })
    .then(() => self.clients.claim())
  )
})
