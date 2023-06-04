// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYmaJI63n05oUjvFLRYhg4oYDipf-V08k",
  authDomain: "sjsm-2c140.firebaseapp.com",
  projectId: "sjsm-2c140",
  storageBucket: "sjsm-2c140.appspot.com",
  messagingSenderId: "5758066392",
  appId: "1:5758066392:web:7209c2ac9bc2e32bfc81ad",
  measurementId: "G-M0RY2CXYLZ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timestamp };
