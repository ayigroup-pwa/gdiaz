
const CACHE_NAME = 'app-gram';

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/favicon.ico',

    '/src/images/main-image.jpg',
    '/src/images/main-image-lg.jpg',
    '/src/images/main-image-sm.jpg',

    '/src/css/app.css',
    '/src/css/feed.css',
    '/src/css/help.css',

    '/src/js/app.js',
    '/src/js/feed.js',
    '/src/js/material.min.js'
];

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  const cachePromise = caches.open(CACHE_NAME).then(cache=>{
    console.log(`[Service worker] Added Cache ${CACHE_NAME}`)
    return cache.addAll(FILES_TO_CACHE);
  })
  event.waitUntil(cachePromise);
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
  event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if(key !== CACHE_NAME){
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }))
      })
  )
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching something ....', event);
  event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          console.log('Response', response);
          return response || fetch(event.request);
        })
      })
  )
});

