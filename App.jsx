
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
    // Initial load from "Firebase" simulation
    setUser(mockAuth.getCurrentUser());
    setFavorites(mockDb.getFavorites());
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    mockAuth.logout();
    setUser(null);
  };

  const toggleFavorite = (psychologistId) => {
    if (!user) return false;
    
    const isAdding = !favorites.includes(psychologistId);
    const updated = mockDb.saveFavorite(psychologistId, isAdding);
    setFavorites(updated);
    return true;
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
