
var CACHE_STATIC_NAME = 'static-v2';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';
let STATIC_FILES = [
    '/',
    '/index.html',
    '/src/css/app.css',
    '/src/css/main.css',
    '/src/js/main.js',
    '/src/js/material.min.js',
    '/offline.html',
    'https://fonts.googleapis.com/css?family=Roboto:400,700',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        cache.addAll(STATIC_FILES);
      })
  )
    self.skipWaiting()
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );
});


/** 1 - La estrategia utilizada fue: Cache with network fallback **/
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 });
//             })
//             .catch(function(err) {
//
//             });
//         }
//       })
//   );
// });



/** 2 - Estrategia: Network-only
 *      Se necesita conexión. **/
// self.addEventListener('fetch', (event) => {
//    event.respondWith(fetch(event.request))
// });

/** 3 - Estrategia: Cache-only.
 *      Si el usuario requiere un recurso que no está en la caché, ¿se muestra una página offline? **/
// self.addEventListener('fetch', (event) => {
//     event.respondWith(caches.match(event.request))
// });

/** 4 - Estrategia: Network, cache fallback. **/
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         fetch(event.request).then( (response) => {
//             return caches.open(CACHE_DYNAMIC_NAME).then( (cache) => {
//                 cache.put(event.request, response.clone())
//                 return response;
//             })
//         }).catch( () => {
//            return caches.match(event.request)
//         })
//     )
// });

/** 5 - Estrategia: Cache, then network **/

// const isInArray = (string, array) => {
//     let result = false;
//     for (let i = 0; i < array.length; i++) {
//         if (array[i] === string){
//             result = true;
//         }
//     }
//     return result;
// }
//
// self.addEventListener('fetch', (event) => {
//    if (event.request.url.indexOf('https://httpbin.org.or/ip') > -1) {
//         event.respondWith(
//             caches.open(CACHE_DYNAMIC_NAME).then( (cache) => {
//                 return fetch(event.request).then( (response) => {
//                     cache.put(event.request, response.clone())
//                     return response;
//                 })
//             })
//         )
//    } else if (isInArray(event.request.url, STATIC_FILES)){
//        event.respondWith(
//            caches.match(event.request)
//        )
//    } else {
//        event.respondWith(
//            caches.match(event.request).then( (response) => {
//                return response? response : fetch(event.request).then( (res) => {
//                    return caches.open(CACHE_DYNAMIC_NAME).then( (cache) => {
//                        cache.put(event.request, res.clone())
//                        return res;
//                    })
//                }).catch( (error) => {
//                    caches.match('/offline.html').then( (response) => {
//                        return response;
//                    })
//                })
//            })
//        )
//    }
// });
