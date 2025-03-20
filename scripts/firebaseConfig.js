// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,signInWithPopup,  onAuthStateChanged, sendEmailVerification, GoogleAuthProvider  } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBY-gX5FYGERajiulu2XRFYMc8tZWmXxv0",
  authDomain: "auth-site-2113e.firebaseapp.com",
  projectId: "auth-site-2113e",
  storageBucket: "auth-site-2113e.firebasestorage.app",
  messagingSenderId: "188480599696",
  appId: "1:188480599696:web:7f69209e4d71cf32198a15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  provider
};

