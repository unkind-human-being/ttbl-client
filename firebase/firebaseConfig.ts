import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2hneQr5OdZyMdup_glaqTiwK3oTJGr2s",
  authDomain: "namestore-48e71.firebaseapp.com",
  projectId: "namestore-48e71",
  storageBucket: "namestore-48e71.firebasestorage.app",
  messagingSenderId: "95231484252",
  appId: "1:95231484252:web:b2c30121329e0a48e8e199",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
