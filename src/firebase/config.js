// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGuO4lNDU3xirFV6NndLBiqVzM0-9kzS4",
  authDomain: "react-cursos-a90e9.firebaseapp.com",
  projectId: "react-cursos-a90e9",
  storageBucket: "react-cursos-a90e9.appspot.com",
  messagingSenderId: "229969877497",
  appId: "1:229969877497:web:8886c222b15d1378aec528"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );