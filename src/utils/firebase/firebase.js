import { initializeApp } from "firebase/app";

import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

import { v4 } from "uuid";

import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
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
  orderBy,
  where,
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

export const storage = getStorage();

export const UploadImage = async (image, uMail) => {
  const imageRef = ref(storage, `images/${image.name + v4() + uMail}`);
  const response = await uploadBytes(imageRef, image);
  return response;
};

const fetchImgRef = ref(storage, "images/");

export const getImages = async () => {
  let imageList = [];
  const response = await listAll(fetchImgRef);
  const promises = response.items.map(async (item) => {
   
    const resp = await getDownloadURL(item);
    imageList.push({
      img: resp,
      img_href: item._location.path_
    });
  });
  await Promise.all(promises);
  return imageList;
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "messages");
  const q = query(collectionRef, orderBy("timestamp"));
  const querySnapshop = await getDocs(q);
  const categoryMap = querySnapshop.docs.map((docSnapshot) => {
    return docSnapshot.data();
  }, {});
  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userChatRef = doc(db, "userChats", userAuth.uid);
  const userSnapShop = await getDoc(userDocRef);

  if (!userSnapShop.exists()) {
    const { email, uid } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        uid,
        email,
        createdAt,
        ...additionalInformation,
      });

      await setDoc(userChatRef, {});
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email,
  password,
  displayName,
  photoURL
) => {
  if (!email || !password) return;

  const response = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, {
    displayName,
    photoURL,
  });
  return response;
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

export const getUsers = async (searchWord) => {
  const collectionRef = collection(db, "users");
  const q = query(
    collectionRef,
    orderBy("username"),
  );
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs
    .filter((docSnapshot) =>
      docSnapshot.data().username.toLowerCase().startsWith(searchWord.toLowerCase())
    )
    .map((docSnapshot) => docSnapshot.data());
  return categoryMap;
};
