import './../styles/styles.css'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { addDoc, doc, getDoc, getFirestore, setDoc, collection, getDocs, updateDoc, query, where } from "firebase/firestore"


    const firebaseConfig = {
        apiKey: "AIzaSyC6-W2cpY7JhgrILY9LIT9rttX3ezmJQIQ",
        authDomain: "project-sda-be047.firebaseapp.com",
        projectId: "project-sda-be047",
        storageBucket: "project-sda-be047.appspot.com",
        messagingSenderId: "136329560677",
        appId: "1:136329560677:web:b0ed2300e412dcb39f7c8c"
      };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

