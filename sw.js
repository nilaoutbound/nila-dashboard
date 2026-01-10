const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdo0SPq3qGRLzliwtTaLu8hQQKdSv-N7QXAZn_3h71gKNdVkz2uNz7bOyajRbAQlJI/exec";

// Gunakan 'install' untuk langsung aktif
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Fungsi untuk mengambil data dari Google Script
async function ambilDataBaru() {
  try {
    // Tambahkan timestamp agar browser tidak mengambil data lama (cache)
    const response = await fetch(`${SCRIPT_URL}?action=checkUpdate&t=${Date.now()}`);
    const data = await response.json();
    
    // Ambil ID terakhir yang disimpan di memori HP
    const cache = await caches.open('nila-data');
    const lastIdResponse = await cache.match('last-id');
    const lastId = lastIdResponse ? await lastIdResponse.text() : null;

    // Jika ID baru berbeda dengan ID lama, munculkan notif!
    if (data.lastId && data.lastId !== lastId) {
      // Simpan ID baru ke memori
      await cache.put('last-id', new Response(data.lastId));

      self.registration.showNotification('DASHBOARD NILA', {
        body: data.pesan || '⚠️ Ada perubahan data jadwal!',
        icon: 'nila-192.png',
        badge: 'nila-192.png',
        vibrate: [200, 100, 200],
        tag: 'update-nila', // Agar notif tidak bertumpuk
        renotify: true
      });
    }
  } catch (err) {
    console.error("Gagal cek data:", err);
  }
}

// Pemicu otomatis dari sistem (Interval 5-15 menit)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cek-data-nila') {
    event.waitUntil(ambilDataBaru());
  }
});

// Pemicu manual atau dari halaman web
self.addEventListener('message', (event) => {
  if (event.data === 'cekSekarang') {
    ambilDataBaru();
  }
});
