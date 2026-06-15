// SPEC Service Worker - cache + offline
const CACHE_NAME = 'spec-employee-v1';
const ASSETS = [
  './spec_employee.html',
  './manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS).catch(function(){});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(name) {
        if (name !== CACHE_NAME) return caches.delete(name);
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // Tylko GET, własna domena
  if (event.request.method !== 'GET') return;
  let url = new URL(event.request.url);
  
  // Network-first dla Supabase i głównej strony (zawsze świeże dane)
  if (url.hostname.includes('supabase.co') || url.pathname.endsWith('spec_employee.html')) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
    return;
  }
  
  // Cache-first dla bibliotek (jsdelivr, unpkg)
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        if (response.ok && response.type === 'basic') {
          let clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      });
    })
  );
});
