import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDl99vDN9VjCDoVYj2d5aLgE7ntW8H16ZY",
    authDomain: "ethrift-b10a7.firebaseapp.com",
    projectId: "ethrift-b10a7",
    storageBucket: "ethrift-b10a7.appspot.com",
    messagingSenderId: "411966090243",
    appId: "1:411966090243:web:e74d5e044baf78986c7236",
    measurementId: "G-3QNNENG6HD"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

let messaging;
if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}

export { messaging };