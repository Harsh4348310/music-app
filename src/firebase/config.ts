import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfk8SoH4osUYY7FlARNuK7xLRIm6RJoFM",
  authDomain: "shivay-music.firebaseapp.com",
  projectId: "shivay-music",
  storageBucket: "shivay-music.firebasestorage.app",
  messagingSenderId: "687306325326",
  appId: "1:687306325326:web:34eea02a34048cccb1b21f",
  measurementId: "G-CEPHB66YWJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);