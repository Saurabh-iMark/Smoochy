import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCsDTf_o9ygpBQn3ks9ukXFHtLw7Xi_ods",
  authDomain: "smoochy-b5387.firebaseapp.com",
  projectId: "smoochy-b5387",
  storageBucket: "smoochy-b5387.appspot.com",
  messagingSenderId: "732109402700",
  appId: "1:732109402700:web:2e345f43a44acf75467ae9",
  measurementId: "G-TWMMSWH6YX"
};

// Initialize Firebase
initializeApp(firebaseConfig);


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});


export const Sendrequest = () => {
  // console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      // console.log("Notification User Permission Granted.");

      return getToken(messaging, { vapidKey: `Notification_key_pair` })
        .then((currentToken) => {
          if (currentToken) {
            // console.log('Client Token: ', currentToken);
            
          } else {
            
            // console.log('Failed to generate the registration token.');
          }
        })
        .catch((err) => {
          // console.log('An error occurred when requesting to receive the token.', err);
        });
    } else {
      // console.log("User Permission Denied.");
    }
  });
}