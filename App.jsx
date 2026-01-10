
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Psychologists from './pages/Psychologists';
import Favorites from './pages/Favorites';
import { mockAuth, mockDb } from './services/mockFirebase';

const App = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Initial load from Firebase
    const loadData = async () => {
      console.log('Loading data from Firebase...');
      const currentUser = mockAuth.getCurrentUser();
      console.log('Current user:', currentUser);
      setUser(currentUser);
      const favs = await mockDb.getFavorites();
      console.log('Favorites loaded:', favs);
      setFavorites(favs);
    };
    loadData();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    mockAuth.logout();
    setUser(null);
  };

  const toggleFavorite = async (psychologistId) => {
    if (!user) return false;

    const isAdding = !favorites.includes(psychologistId);
    try {
      const updated = await mockDb.saveFavorite(psychologistId, isAdding);
      setFavorites(updated);
      return true;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  };

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
