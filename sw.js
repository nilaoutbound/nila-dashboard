const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdo0SPq3qGRLzliwtTaLu8hQQKdSv-N7QXAZn_3h71gKNdVkz2uNz7bOyajRbAQlJI/exec";

// Cek data setiap 5 menit (Android biasanya membatasi jika terlalu sering)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cek-data-nila') {
    event.waitUntil(ambilDataBaru());
  }
});

// Fungsi untuk mengambil data dari Google Script
async function ambilDataBaru() {
  try {
    const response = await fetch(SCRIPT_URL + "?action=checkUpdate");
    const data = await response.json();
    
    if (data.status === "ada_perubahan") {
      self.registration.showNotification('DASHBOARD NILA', {
        body: '⚠️ Ada perubahan data kritis! Klik untuk cek.',
        icon: 'nila-192.png',
        vibrate: [200, 100, 200]
      });
    }
  } catch (err) {
    console.error("Gagal cek data:", err);
  }
}

// Tambahkan pendengar pesan jika ingin dipicu manual dari web
self.addEventListener('message', (event) => {
  if (event.data === 'cekSekarang') {
    ambilDataBaru();
  }
});
