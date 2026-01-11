import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, push, update, remove } from 'firebase/database';
import { mockAuth, mockDb } from './mockFirebase.js';
import { PSYCHOLOGISTS_DATA } from '../constants.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const useMock = !import.meta.env.VITE_FIREBASE_API_KEY;

// Initialize Firebase only if not using mock
let auth, db;
if (!useMock) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app);
}

// Auth functions
const realFirebaseAuth = {
  register: async (data) => {
    const { email, password, name } = data;
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

  login: async (data) => {
    const { email, password } = data;
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

export const firebaseAuth = useMock ? mockAuth : realFirebaseAuth;

// Database functions
const realFirebaseDb = {
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

const mockFirebaseDb = {
  getPsychologists: async () => PSYCHOLOGISTS_DATA,
  getFavorites: async (userId) => mockDb.getFavorites(),
  toggleFavorite: async (userId, psychologistId) => {
    const current = mockDb.getFavorites();
    const isFavorite = current.includes(psychologistId);
    return mockDb.saveFavorite(psychologistId, !isFavorite);
  }
};

export const firebaseDb = useMock ? mockFirebaseDb : realFirebaseDb;