/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCizkj1qwjZY0b2w1Fud0tfKRAoFuy6Jyg",
  authDomain: "e-shop-41e42.firebaseapp.com",
  projectId: "e-shop-41e42",
  storageBucket: "e-shop-41e42.appspot.com",
  messagingSenderId: "22753575441",
  appId: "1:22753575441:web:1dd27860c952f4d200a7b0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// connectFirestoreEmulator(db, "localhost", 8088);
