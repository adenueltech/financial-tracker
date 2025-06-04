import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDIM9RqS852fkpx_hu1_F3R-WRy-sh5yEc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "finance-7fd90.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "finance-7fd90",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "finance-7fd90.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "192040626088",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:192040626088:web:b3c54859bcbd6e64fddf9d",
}

// Log config for debugging (remove in production)
console.log("Firebase config:", {
  apiKey: firebaseConfig.apiKey ? "✓ Set" : "✗ Missing",
  authDomain: firebaseConfig.authDomain ? "✓ Set" : "✗ Missing",
  projectId: firebaseConfig.projectId ? "✓ Set" : "✗ Missing",
  storageBucket: firebaseConfig.storageBucket ? "✓ Set" : "✗ Missing",
  messagingSenderId: firebaseConfig.messagingSenderId ? "✓ Set" : "✗ Missing",
  appId: firebaseConfig.appId ? "✓ Set" : "✗ Missing",
})

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
