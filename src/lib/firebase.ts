import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsBAgJ8g_SG8VhPvp9oakoMQ6Tc8XwB8A",
  authDomain: "umkm-instant-store.firebaseapp.com",
  projectId: "umkm-instant-store",
  storageBucket: "umkm-instant-store.firebasestorage.app",
  messagingSenderId: "339335706588",
  appId: "1:339335706588:web:760328566ba286dc770119",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
