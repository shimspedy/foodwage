// Service Worker for FoodWage - Enables offline access to recipes
const CACHE_NAME = 'foodwage-cache-v1';
const urlsToCache = [
  '/',
  '/css/min/bass.min.css',
  '/css/main.css',
  '/css/seo.css',
  '/js/random.json',
  '/js/randomhero.js',
  '/js/searchevents.js',
  '/js/signature.js'
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response - one to return, one to cache
            const responseToCache = response.clone();

            // Only cache recipes and essential resources
            if (event.request.url.includes('/recipes/') || 
                event.request.url.includes('/css/') ||
                event.request.url.includes('/js/') ||
                event.request.url.includes('/icons/')) {
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          }
        );
      })
      .catch(() => {
        // If both cache and network fail, serve offline page for HTML requests
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/offline.html');
        }
      })
  );
});

// Clean up old caches when a new service worker takes over
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});