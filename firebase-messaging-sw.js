// Impor library Firebase Messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Tempelkan firebaseConfig yang kamu simpan tadi di sini
const firebaseConfig = {
  apiKey: "AIzaSyCrcNRqSRbMxl_1N-Bgy2bkprafEoBtG18",
  authDomain: "nila-outbound-notif.firebaseapp.com",
  projectId: "nila-outbound-notif",
  storageBucket: "nila-outbound-notif.firebasestorage.app",
  messagingSenderId: "865192980770",
  appId: "1:865192980770:web:32615234211e67c174b57b"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Logika menangkap notifikasi saat aplikasi di latar belakang (background)
messaging.onBackgroundMessage((payload) => {
  console.log('Notifikasi diterima di background:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://nilaoutbound.github.io/Nila_Dashboard/logo.png' // Pastikan link logo benar
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
