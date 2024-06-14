// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxXjVVBmoPePZfdzJmZd1Vx5MCrZGP7aA",
  authDomain: "fir-ff507.firebaseapp.com",
  projectId: "fir-ff507",
  storageBucket: "fir-ff507.appspot.com",
  messagingSenderId: "29576568944",
  appId: "1:29576568944:web:0bbfd6611d18f77b5f54b5",
  measurementId: "G-BL4L0DRPXS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()