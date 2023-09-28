// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// apiKey: "AIzaSyDTWLoieVD9KEawmz2smmPydylPFkd9y2I",
// authDomain: "exchange-of-experiences.firebaseapp.com",
// projectId: "exchange-of-experiences",
// storageBucket: "exchange-of-experiences.appspot.com",
// messagingSenderId: "439426298487",
// appId: "1:439426298487:web:552a4ff48f6c9572bb4c72",
// measurementId: "G-LCVME2XKZB",

const firebaseConfig = {
  apiKey: "AIzaSyDTWLoieVD9KEawmz2smmPydylPFkd9y2I",
  authDomain: "exchange-of-experiences.firebaseapp.com",
  projectId: "exchange-of-experiences",
  storageBucket: "exchange-of-experiences.appspot.com",
  messagingSenderId: "439426298487",
  appId: "1:439426298487:web:552a4ff48f6c9572bb4c72",
  measurementId: "G-LCVME2XKZB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
