import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPiz3qWLoK-R3hO51CjdS_YNfMWvjQ5fo",
  authDomain: "auth-ts-b72fe.firebaseapp.com",
  projectId: "auth-ts-b72fe",
  storageBucket: "auth-ts-b72fe.appspot.com",
  messagingSenderId: "257791883472",
  appId: "1:257791883472:web:7baf558c7843d4183a46d5",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };
