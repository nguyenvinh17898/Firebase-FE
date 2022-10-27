// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyB_4v3M32avnercYzytIz0e_BjfjqBznKg",
    authDomain: "fcm-hello-c9454.firebaseapp.com",
    projectId: "fcm-hello-c9454",
    storageBucket: "fcm-hello-c9454.appspot.com",
    messagingSenderId: "514569944142",
    appId: "1:514569944142:web:0486eaa2377e3f38fe971f",
    measurementId: "G-10MPSWTMBW"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // self.registration.showNotification(notificationTitle,
  //   notificationOptions);
});