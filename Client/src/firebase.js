import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDMo5rtFBKjET5CHdUmbWBDK2tLpCmU41s",
  authDomain: "sociofy-aad0d.firebaseapp.com",
  projectId: "sociofy-aad0d",
  storageBucket: "sociofy-aad0d.appspot.com",
  messagingSenderId: "126762484858",
  appId: "1:126762484858:web:6154d0178580eee6fd67c3",
  measurementId: "G-P90CDM1DDM",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const registerForToken = () => {
  const userId = JSON.parse(localStorage.getItem("user_id"));

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      const vapidKey =
        "BMbhAQkk60Tqi6VZYqLFPKZ-zbvMvfKFopdzWyQY22IS4aDyv0apwtGjA-VdUxuVBIJpbpwJtJL6lNM1YdymJvA";

      return getToken(messaging, { vapidKey })
        .then(async (currentToken) => {
          if (currentToken) {
            //passes the token to the server
            const response = await fetch(
              `http://localhost:8080/store_firebase_token/${userId}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firebaseToken: currentToken }),
              }
            );
            const result = await response.json();
            
            //stores the token in the local storage
            if (result.success) {
              localStorage.setItem(
                "firebaseToken",
                JSON.stringify(currentToken)
              );
            }
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((error) => {
          console.log("An error occurred while retrieving token. ", error);
          
        });
    } else if (permission === "denied") {
      console.log("Please allow notification to generate token.");
    }
  });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
