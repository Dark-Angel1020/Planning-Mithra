import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFTd4eta48Xg4b04fYu0FbvSej1clSq10",
  authDomain: "travel-rec-dc1d7.firebaseapp.com",
  projectId: "travel-rec-dc1d7",
  storageBucket: "travel-rec-dc1d7.firebasestorage.app",
  messagingSenderId: "50737529286",
  appId: "1:50737529286:web:f893a95db7e6b3cce572c7"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);