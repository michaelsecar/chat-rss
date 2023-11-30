const { initializeApp } = require('firebase/app');

const firebaseConfig = {
    apiKey: "AIzaSyBTZ9dWQnW0S48C052KyF4-F1Dy5N4ZlI0",
    authDomain: "tesisrss.firebaseapp.com",
    projectId: "tesisrss",
    storageBucket: "tesisrss.appspot.com",
    messagingSenderId: "138518473775",
    appId: "1:138518473775:web:fb1296514e7521b8a6aada"
}

const app = initializeApp(firebaseConfig)

exports.app = app