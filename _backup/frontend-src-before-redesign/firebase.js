import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration for project "idealpack-store"
const firebaseConfig = {
  projectId: "idealpack-store",
  authDomain: "idealpack-store.firebaseapp.com",
  storageBucket: "idealpack-store.appspot.com",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForIdealPackStore"
};

let app;
let db = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (e) {
  console.warn('[Firebase Client] Initialization note:', e.message);
}

export { app, db };
