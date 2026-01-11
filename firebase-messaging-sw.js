// Impor library Firebase Messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Tempelkan firebaseConfig yang kamu simpan tadi di sini
const firebaseConfig = {
  apiKey: "ISI_API_KEY_KAMU",
  authDomain: "ISI_AUTH_DOMAIN_KAMU",
  projectId: "ISI_PROJECT_ID_KAMU",
  storageBucket: "ISI_STORAGE_BUCKET_KAMU",
  messagingSenderId: "ISI_SENDER_ID_KAMU",
  appId: "ISI_APP_ID_KAMU"
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
