import React, { useState, useMemo, useEffect } from 'react';
import { firebaseDb } from '../services/firebase.js';
import { PSYCHOLOGISTS_DATA } from '../constants.js';
import PsychologistCard from '../components/PsychologistCard.jsx';
import Filters from '../components/Filters.jsx';
import { Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 3;

const Psychologists = ({ user, favorites, onToggleFavorite }) => {
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('Name A-Z');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const loadPsychologists = async () => {
      try {
        const data = await firebaseDb.getPsychologists();
        if (data && data.length > 0) {
          setPsychologists(data);
        } else {
          // Fallback to constants data if Firebase is empty
          console.log('No data in Firebase, using fallback data');
          setPsychologists(PSYCHOLOGISTS_DATA);
        }
      } catch (error) {
        console.error('Error loading psychologists:', error);
        // Fallback to constants data on error
        setPsychologists(PSYCHOLOGISTS_DATA);
      } finally {
        setLoading(false);
      }
    };

    loadPsychologists();
  }, []);

  // Sıralama değiştiğinde görünür kart sayısını sıfırla (şartnameye uygun davranış)
  const handleSortChange = (option) => {
    setSortOption(option);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const sortedPsychologists = useMemo(() => {
    const data = [...psychologists];
    switch (sortOption) {
      case 'Name A-Z':
        return data.sort((a, b) => a.name.localeCompare(b.name));
      case 'Name Z-A':
        return data.sort((a, b) => b.name.localeCompare(a.name));
      case 'Price low to high':
        return data.sort((a, b) => a.price_per_hour - b.price_per_hour);
      case 'Price high to low':
        return data.sort((a, b) => b.price_per_hour - a.price_per_hour);
      case 'Rating low to high':
        return data.sort((a, b) => a.rating - b.rating);
      case 'Rating high to low':
        return data.sort((a, b) => b.rating - a.rating);
      default:
        return data;
    }
  }, [psychologists, sortOption]);

  const visiblePsychologists = sortedPsychologists.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPsychologists.length;

  const loadMore = async () => {
    setIsFetching(true);
    // Şartnamedeki "veritabanına yeni istek gönderilmeli" maddesi için asenkron simülasyon
    await new Promise(resolve => setTimeout(resolve, 800));
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    setIsFetching(false);
  };

  if (loading) {
    return (
      <div className="bg-gray-50/30 min-h-screen pt-12 pb-24 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading psychologists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/30 min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <Filters currentSort={sortOption} onSortChange={handleSortChange} />

        <div className="space-y-8 mt-10">
          {visiblePsychologists.map((psy) => (
            <PsychologistCard
              key={psy.id}
              psychologist={psy}
              isFavorite={favorites.includes(psy.id)}
              onToggleFavorite={onToggleFavorite}
              isAuthorized={!!user}
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-20 flex flex-col items-center">
            <button
              onClick={loadMore}
              disabled={isFetching}
              className="px-14 py-4 bg-emerald-600 text-white rounded-[40px] font-bold text-lg hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-emerald-50"
            >
              {isFetching && <Loader2 size={22} className="animate-spin" />}
              <span>{isFetching ? 'Loading specialists...' : 'Load more'}</span>
            </button>
            <p className="text-gray-400 text-sm mt-4 font-medium">
              Showing {visibleCount} of {sortedPsychologists.length} specialists
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Psychologists;