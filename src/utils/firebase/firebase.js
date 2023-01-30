import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShop = await getDoc(userDocRef);

  if (!userSnapShop.exists()) {
    console.log(userAuth);
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUsingEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
