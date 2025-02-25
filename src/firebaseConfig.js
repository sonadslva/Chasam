import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_aTfZtrXc8cFufHlvEjQJ5R_wl9Rgnas",
  authDomain: "chasam-5d05c.firebaseapp.com",
  databaseURL: "https://chasam-5d05c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chasam-5d05c",
  storageBucket: "chasam-5d05c.firebasestorage.app",
  messagingSenderId: "883788806730",
  appId: "1:883788806730:web:99454d79d47dc23bca04b3",
  measurementId: "G-HXZWJ24E34"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dbFirestore = getFirestore(app); // Consistent export naming
export const dbRealtime = getDatabase(app)