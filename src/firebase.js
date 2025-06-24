import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-_qcLuHdwmU7u9znI-KVGqepjbsOmkEk",
  authDomain: "react-movie-app-209d1.firebaseapp.com",
  projectId: "react-movie-app-209d1",
  storageBucket: "react-movie-app-209d1.firebasestorage.app",
  messagingSenderId: "673402814645",
  appId: "1:673402814645:web:573eb534a2d186e567fefc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
