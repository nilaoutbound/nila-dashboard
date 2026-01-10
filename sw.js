const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdo0SPq3qGRLzliwtTaLu8hQQKdSv-N7QXAZn_3h71gKNdVkz2uNz7bOyajRbAQlJI/exec";

// Memaksa Service Worker baru langsung mengambil kendali
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

async function ambilDataBaru() {
  try {
    // Tambahkan random string agar Google Script tidak memberi data lama
    const response = await fetch(`${SCRIPT_URL}?action=checkUpdate&nocache=${Math.random()}`);
    const data = await response.json();
    
    // Simpan di Storage HP
    const storage = await caches.open('nila-check');
    const oldDataRaw = await storage.match('last-id');
    const oldId = oldDataRaw ? await oldDataRaw.text() : "";

    // CEK: Jika ID baru tidak sama dengan yang lama, atau ID kosong
    if (data.lastId && data.lastId !== oldId) {
      await storage.put('last-id', new Response(data.lastId));
      
      self.registration.showNotification('DASHBOARD NILA', {
        body: data.pesan || 'Ada update data!',
        icon: 'nila-192.png',
        vibrate: [500, 110, 500], // Getar lebih lama
        requireInteraction: true // Notif tidak hilang sampai diklik
      });
    }
  } catch (err) {
    console.log("Error:", err);
  }
}

self.addEventListener('message', (event) => {
  if (event.data === 'cekSekarang') {
    ambilDataBaru();
  }
});
