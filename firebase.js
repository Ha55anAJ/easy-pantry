// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATn7uFJgc0m8z4r9FKHBE6ZQStGOR7Coo",
  authDomain: "easy-pantry-ac509.firebaseapp.com",
  projectId: "easy-pantry-ac509",
  storageBucket: "easy-pantry-ac509.appspot.com",
  messagingSenderId: "637673548175",
  appId: "1:637673548175:web:ba12fb017b774d236203fa",
  measurementId: "G-W1PGHZHRY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore }; 