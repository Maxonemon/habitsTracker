import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCOUX8QNaJZ4CovoemJ9u6mpK4dfnF9IA",
  authDomain: "test-435913.firebaseapp.com",
  projectId: "test-435913",
  storageBucket: "test-435913.firebasestorage.app",
  messagingSenderId: "833132884665",
  appId: "1:833132884665:web:130bbafa5b44e52be1a168",
  measurementId: "G-0NS0B2MQG7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
