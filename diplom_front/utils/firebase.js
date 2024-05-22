// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDl99vDN9VjCDoVYj2d5aLgE7ntW8H16ZY",
    authDomain: "ethrift-b10a7.firebaseapp.com",
    projectId: "ethrift-b10a7",
    storageBucket: "ethrift-b10a7.appspot.com",
    messagingSenderId: "411966090243",
    appId: "1:411966090243:web:e74d5e044baf78986c7236",
    measurementId: "G-3QNNENG6HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);