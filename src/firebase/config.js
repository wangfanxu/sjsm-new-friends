// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYmaJI63n05oUjvFLRYhg4oYDipf-V08k",
  authDomain: "SJSM.firebaseapp.com",
  projectId: "sjsm-2c140",
  storageBucket: "sjsm-2c140.appspot.com",
  messagingSenderId: "5758066392",
  appId: "1:5758066392:web:7209c2ac9bc2e32bfc81ad",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const projectFirestore = getFirestore(app);

// Initialize Authentication
const projectAuth = getAuth(app);

// timestamp
const timestamp = serverTimestamp();

export { projectFirestore, projectAuth, timestamp };
