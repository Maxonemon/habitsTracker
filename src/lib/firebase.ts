import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyHLrotaS1MhdkfwHeGrx2Zhqmaql0ZZg",
  authDomain: "habitstracker2.firebaseapp.com",
  projectId: "habitstracker2",
  storageBucket: "habitstracker2.firebasestorage.app",
  messagingSenderId: "509807806376",
  appId: "1:509807806376:web:9430942d09a4b0e769ff9d",
  measurementId: "G-F4DV4KEKGX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
