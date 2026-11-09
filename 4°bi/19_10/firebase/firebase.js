
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCveP-TVptXBE8zXPvJkX0rGUzqCLM-Hg8",
  authDomain: "felipe-e-caio.firebaseapp.com",
  projectId: "felipe-e-caio",
  storageBucket: "felipe-e-caio.firebasestorage.app",
  messagingSenderId: "522634336162",
  appId: "1:522634336162:web:115518992f2d9924fd84fb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
