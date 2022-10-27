import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

const messaging = getMessaging();

onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });