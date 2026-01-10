import React from 'react';
import { PSYCHOLOGISTS_DATA } from '../constants.js';
import PsychologistCard from '../components/PsychologistCard.jsx';
import { HeartOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = ({ user, favorites, onToggleFavorite }) => {
  const favoritePsychologists = PSYCHOLOGISTS_DATA.filter(psy => favorites.includes(psy.id));

  return (
    <div className="bg-gray-50/50 min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">Your Favorites</h2>

        {favoritePsychologists.length > 0 ? (
          <div className="space-y-6">
            {favoritePsychologists.map((psy) => (
              <PsychologistCard
                key={psy.id}
                psychologist={psy}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                isAuthorized={true}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-20 flex flex-col items-center text-center shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-8">
              <HeartOff size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No favorites yet</h3>
            <p className="text-gray-500 max-w-sm mb-12">
              Browse through our specialists and add them to your favorites list for quick access.
            </p>
            <Link
              to="/psychologists"
              className="px-10 py-4 bg-emerald-600 text-white rounded-3xl font-bold hover:bg-emerald-700 transition"
            >
              View Psychologists
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;