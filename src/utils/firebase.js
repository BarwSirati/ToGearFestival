import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD8Nq5a3nsvwOE30VBavaARgWYCTioZr-0",
  authDomain: "comgear-65e33.firebaseapp.com",
  projectId: "comgear-65e33",
  storageBucket: "comgear-65e33.appspot.com",
  messagingSenderId: "947484264053",
  appId: "1:947484264053:web:9bd6a8866a077590e5da3c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authentication = getAuth(app);


