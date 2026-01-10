
import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { PSYCHOLOGISTS_DATA } from '../constants.jsx';

export const mockAuth = {
  register: async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      return { id: userCredential.user.uid, name: data.name, email: data.email };
    } catch (error) {
      throw error;
    }
  },
  login: async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      return { id: userCredential.user.uid, name: userCredential.user.displayName || data.email.split('@')[0], email: data.email };
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  },
  getCurrentUser: () => {
    const user = auth.currentUser;
    return user ? { id: user.uid, name: user.displayName || user.email.split('@')[0], email: user.email } : null;
  }
};

export const mockDb = {
  getFavorites: async () => {
    if (!auth.currentUser) return [];
    try {
      const favRef = ref(db, `users/${auth.currentUser.uid}/favorites`);
      const snapshot = await get(favRef);
      return snapshot.val() || [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },
  saveFavorite: async (id, isAdding) => {
    if (!auth.currentUser) return [];
    try {
      const favRef = ref(db, `users/${auth.currentUser.uid}/favorites`);
      const snapshot = await get(favRef);
      let favs = snapshot.val() || [];
      if (isAdding) {
        if (!favs.includes(id)) favs.push(id);
      } else {
        favs = favs.filter(f => f !== id);
      }
      await set(favRef, favs);
      return favs;
    } catch (error) {
      console.error('Error saving favorite:', error);
      throw error;
    }
  },
  getPsychologists: () => {
    return PSYCHOLOGISTS_DATA;
  }
};
