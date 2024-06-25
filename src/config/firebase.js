// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  apiKey: "AIzaSyDeYwqFiC64ZgKdPF-ltw5Bh8Q6wWvpdOE",
  //authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  authDomain: "palmaverde-fbf16.firebaseapp.com",
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  projectId: "palmaverde-fbf16",
  //storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  storageBucket: "palmaverde-fbf16.appspot.com",
  //messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  messagingSenderId: "775568341916",
  //appId: process.env.REACT_APP_FIREBASE_APP_ID,
  appId: "1:775568341916:web:013bae777c892543ece659",
  //measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  measurementId: "G-BNMZ4M93X3",
  //adding database url
  //databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  databaseURL:
    "https://palmaverde-fbf16-default-rtdb.europe-west1.firebasedatabase.app",
};
console.log("Project", firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore();

export default app;
