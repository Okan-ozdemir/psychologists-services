import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, push, update, remove } from 'firebase/database';

// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

// Auth functions
export const firebaseAuth = {
  register: async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user profile to database
    await set(ref(db, `users/${user.uid}`), {
      name,
      email,
      createdAt: new Date().toISOString()
    });

    return {
      id: user.uid,
      name,
      email
    };
  },

  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user profile from database
    const userRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();

    return {
      id: user.uid,
      name: userData?.name || email.split('@')[0],
      email: user.email || email
    };
  },

  logout: async () => {
    await signOut(auth);
  },

  onAuthStateChange: (callback) => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user profile from database
        const userRef = ref(db, `users/${firebaseUser.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();

        const user = {
          id: firebaseUser.uid,
          name: userData?.name || firebaseUser.email?.split('@')[0] || '',
          email: firebaseUser.email || ''
        };
        callback(user);
      } else {
        callback(null);
      }
    });
  }
};

// Database functions
export const firebaseDb = {
  // Get all psychologists
  getPsychologists: async () => {
    const psychologistsRef = ref(db, 'psychologists');
    const snapshot = await get(psychologistsRef);
    const data = snapshot.val();

    if (!data) return [];

    return Object.entries(data).map(([id, psy]) => ({
      id,
      ...psy
    }));
  },

  // Get user favorites
  getFavorites: async (userId) => {
    const favoritesRef = ref(db, `users/${userId}/favorites`);
    const snapshot = await get(favoritesRef);
    const data = snapshot.val();

    if (!data) return [];

    return Object.keys(data);
  },

  // Toggle favorite
  toggleFavorite: async (userId, psychologistId) => {
    const favoritesRef = ref(db, `users/${userId}/favorites`);
    const snapshot = await get(favoritesRef);
    const currentFavorites = snapshot.val() || {};

    const isCurrentlyFavorite = currentFavorites[psychologistId];

    if (isCurrentlyFavorite) {
      // Remove from favorites
      await remove(ref(db, `users/${userId}/favorites/${psychologistId}`));
    } else {
      // Add to favorites
      await set(ref(db, `users/${userId}/favorites/${psychologistId}`), true);
    }

    // Return updated favorites
    const updatedSnapshot = await get(favoritesRef);
    const updatedData = updatedSnapshot.val() || {};
    return Object.keys(updatedData);
  }
};