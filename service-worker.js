const CACHE_NAME = "G23";
const toCache = [
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
let deferredPrompt;

self.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

self.addEventListener('install', function (event) {
    self.skipWaiting();
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
            .catch(() => {
              return caches.match(event.request);
            })
    );
});

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
