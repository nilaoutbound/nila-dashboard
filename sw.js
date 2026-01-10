const CACHE_NAME = 'nila-dashboard-v1';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
const CACHE_NAME = 'nila-dashboard-v1';
const FILES = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
});

// BAGIAN PENTING: Menangkap Sinyal Notifikasi
self.addEventListener('push', function(event) {
  let data = { title: 'UPDATE DATA NILA', body: 'Cek Dashboard sekarang!' };
  if (event.data) { data = event.data.json(); }

  const options = {
    body: data.body,
    icon: 'nila-192.png',
    badge: 'nila-192.png',
    vibrate: [200, 100, 200],
    data: { url: 'https://nilaoutbound.github.io' }
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Klik notif langsung buka Web
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
