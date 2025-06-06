// Firebase configuration and initialization
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-ZQQvLNm2z0OuDuqDu04zIALyaQfszP4",
  authDomain: "roomedin.firebaseapp.com",
  projectId: "roomedin",
  storageBucket: "roomedin.firebasestorage.app",
  messagingSenderId: "550790932142",
  appId: "1:550790932142:web:a83a5814e39245543e6f3f",
  measurementId: "G-VW8J7PR0NC"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

export default app
