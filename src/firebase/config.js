// Import the functions you need from the SDKs you need

import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";


import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: ""
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const projectFirestore = getFirestore(app);

// Initialize Authentication
const projectAuth = getAuth(app);

// timestamp
const timestamp = serverTimestamp();

// config.js
module.exports = {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
};



export { projectFirestore, projectAuth, timestamp };
