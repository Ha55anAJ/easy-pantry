// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "MY_FIREBASE_API",
  authDomain: "easy-pantry-ac509.firebaseapp.com",
  projectId: "easy-pantry-ac509",
  storageBucket: "easy-pantry-ac509.appspot.com",
  messagingSenderId: "637673548175",
  appId: "1:637673548175:web:ba12fb017b774d236203fa",
  measurementId: "G-W1PGHZHRY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
