self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('nila-v1').then(cache =>
      cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './nila-192.png',
        './nila-512.png'
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
