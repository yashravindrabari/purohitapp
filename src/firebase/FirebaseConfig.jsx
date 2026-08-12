// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHAHb-G0tLbXcTDCjILkKdUYzOpjpDDUI",
  authDomain: "purohit-app-9677c.firebaseapp.com",
  databaseURL: "https://purohit-app-9677c-default-rtdb.firebaseio.com",
  projectId: "purohit-app-9677c",
  storageBucket: "purohit-app-9677c.appspot.com",
  messagingSenderId: "42836314053",
  appId: "1:42836314053:web:186d19f22d23a21cd26dac",
  measurementId: "G-XTTC9BE6NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
export const storage = getStorage(app)
export { fireDB, auth }
