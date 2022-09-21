import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZ-NpUDa8URN-6CHYIBaZh_JE-CZDM-x8",
  authDomain: "whatsapp-clone-nextjs-dc6b8.firebaseapp.com",
  projectId: "whatsapp-clone-nextjs-dc6b8",
  storageBucket: "whatsapp-clone-nextjs-dc6b8.appspot.com",
  messagingSenderId: "84844481315",
  appId: "1:84844481315:web:06e35dcc0fe71fbcdc5a96",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const provier = new GoogleAuthProvider();

export { db, auth, provier };
