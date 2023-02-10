// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWyW3s92P-m-t4WpcfSgUVOg-Uq0WsF-g",
  authDomain: "note-aa82a.firebaseapp.com",
  projectId: "note-aa82a",
  storageBucket: "note-aa82a.appspot.com",
  messagingSenderId: "516072071717",
  appId: "1:516072071717:web:7e6393b32b4fbea45b55cc",
  measurementId: "G-SC9FEH1LF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);