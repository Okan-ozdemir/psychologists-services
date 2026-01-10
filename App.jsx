import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Psychologists from './pages/Psychologists.jsx';
import Favorites from './pages/Favorites.jsx';
import { firebaseAuth, firebaseDb } from './services/firebase.js';

const App = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = firebaseAuth.onAuthStateChange(async (user) => {
      setUser(user);
      if (user) {
        // Load favorites for the user
        const userFavorites = await firebaseDb.getFavorites(user.id);
        setFavorites(userFavorites);
      } else {
        setFavorites([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await firebaseAuth.logout();
    setUser(null);
    setFavorites([]);
  };

  const toggleFavorite = async (psychologistId) => {
    if (!user) return false;

    try {
      const updatedFavorites = await firebaseDb.toggleFavorite(user.id, psychologistId);
      setFavorites(updatedFavorites);
      return true;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#FCF9F1]/30">
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/psychologists" 
              element={
                <Psychologists 
                  user={user} 
                  favorites={favorites} 
                  onToggleFavorite={toggleFavorite} 
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                user ? (
                  <Favorites 
                    user={user} 
                    favorites={favorites} 
                    onToggleFavorite={toggleFavorite} 
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;