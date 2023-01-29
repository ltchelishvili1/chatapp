import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8A3fTMm0FzM2Se2_LbE4jZ49ASL7e1GE",
  authDomain: "chatapp-5c1b5.firebaseapp.com",
  projectId: "chatapp-5c1b5",
  storageBucket: "chatapp-5c1b5.appspot.com",
  messagingSenderId: "171679285860",
  appId: "1:171679285860:web:ff152d8b8e4efe6878d571",
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  propmt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => {
  signInWithPopup(auth, googleProvider);
  console.log(auth)
};
