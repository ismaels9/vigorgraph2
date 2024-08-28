import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD3w-W9BK8n5_nUOGmY7BpbfdfSSiABIwg",
  authDomain: "vigorgraph-abbf7.firebaseapp.com",
  projectId: "vigorgraph-abbf7",
  storageBucket: "vigorgraph-abbf7.appspot.com",
  messagingSenderId: "211026720887",
  appId: "1:211026720887:web:0265a446af300486e6ee72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
