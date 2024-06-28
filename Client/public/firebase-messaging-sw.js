/* eslint-disable no-undef */

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDMo5rtFBKjET5CHdUmbWBDK2tLpCmU41s",
  authDomain: "sociofy-aad0d.firebaseapp.com",
  projectId: "sociofy-aad0d",
  storageBucket: "sociofy-aad0d.appspot.com",
  messagingSenderId: "126762484858",
  appId: "1:126762484858:web:6154d0178580eee6fd67c3",
  measurementId: "G-P90CDM1DDM",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage = (payload) => {
  const notificationTitle = payload?.notification?.title;
  const notificationOptions = {
    body: payload?.notification.title,
  }
  self.registration.showNotification(notificationTitle, notificationOptions);
}