import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import { User as UserIcon, LogOut, Menu, X } from 'lucide-react';

const Header = ({ user, onLogin, onLogout }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className={`hover:text-emerald-600 transition ${location.pathname === '/' ? 'text-emerald-600 font-semibold' : 'text-gray-600'}`}
      >
        Home
      </Link>
      <Link
        to="/psychologists"
        className={`hover:text-emerald-600 transition ${location.pathname === '/psychologists' ? 'text-emerald-600 font-semibold' : 'text-gray-600'}`}
      >
        Psychologists
      </Link>
      {user && (
        <Link
          to="/favorites"
          className={`hover:text-emerald-600 transition ${location.pathname === '/favorites' ? 'text-emerald-600 font-semibold' : 'text-gray-600'}`}
        >
          Favorites
        </Link>
      )}
    </>
  );

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">Psychologists<span className="text-emerald-600">.Services</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <UserIcon size={16} className="text-emerald-600" />
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-red-500 transition"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => openAuth('login')}
                className="px-6 py-2 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition border border-gray-200"
              >
                Log In
              </button>
              <button
                onClick={() => openAuth('register')}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition shadow-sm shadow-emerald-200"
              >
                Registration
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-6 space-y-6 flex flex-col absolute w-full left-0 top-20 shadow-xl">
          <nav className="flex flex-col space-y-4 text-center text-lg">
            <NavLinks />
          </nav>
          <div className="flex flex-col space-y-3">
            {user ? (
              <button
                onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-semibold flex items-center justify-center space-x-2"
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => openAuth('login')}
                  className="w-full py-3 rounded-xl border border-gray-200 font-semibold text-gray-700"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuth('register')}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold"
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onAuthSuccess={onLogin}
      />
    </header>
  );
};

export default Header;