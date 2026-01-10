import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDJag4KRMEm8XsMPBSvU5LG-g8CQavfqEI",
  authDomain: "psychologists-services-37310.firebaseapp.com",
  databaseURL: "https://psychologists-services-37310-default-rtdb.firebaseio.com",
  projectId: "psychologists-services-37310",
  storageBucket: "psychologists-services-37310.firebasestorage.app",
  messagingSenderId: "930144587787",
  appId: "1:930144587787:web:3da4bc607c2f9fb5e0370e",
  measurementId: "G-0RKPTJ2KMZ"
};

const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized:', app);

export const auth = getAuth(app);
console.log('Firebase auth initialized:', auth);

export const db = getDatabase(app);
console.log('Firebase database initialized:', db);