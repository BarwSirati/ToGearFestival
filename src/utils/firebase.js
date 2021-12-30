import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBC0SJBHs12Bhz8glLmiIj-vQ4GDwTn5K0",
  authDomain: "togearfestival.firebaseapp.com",
  projectId: "togearfestival",
  storageBucket: "togearfestival.appspot.com",
  messagingSenderId: "798105962628",
  appId: "1:798105962628:web:34cfb5507f877faad5dad1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authentication = getAuth(app);
