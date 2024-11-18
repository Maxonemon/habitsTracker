import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWNzQ7vTdtoJ571MPunoC-fdr7LghNS3o",
  authDomain: "habittracks-23a01.firebaseapp.com",
  projectId: "habittracks-23a01",
  storageBucket: "habittracks-23a01.firebasestorage.app",
  messagingSenderId: "533339425992",
  appId: "1:533339425992:web:5edcdb39867831724a69fd",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
