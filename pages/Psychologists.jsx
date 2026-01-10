
import React, { useState, useMemo, useEffect } from 'react';
import { SortOption } from '../types';
import { PSYCHOLOGISTS_DATA } from '../constants';
import PsychologistCard from '../components/PsychologistCard';
import Filters from '../components/Filters';
import { Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 3;

const Psychologists = ({ user, favorites, onToggleFavorite }) => {
  const [sortOption, setSortOption] = useState(SortOption.NAME_ASC);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isFetching, setIsFetching] = useState(false);

  // Sıralama değiştiğinde görünür kart sayısını sıfırla (şartnameye uygun davranış)
  const handleSortChange = (option) => {
    setSortOption(option);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const sortedPsychologists = useMemo(() => {
    const data = [...PSYCHOLOGISTS_DATA];
    switch (sortOption) {
      case SortOption.NAME_ASC:
        return data.sort((a, b) => a.name.localeCompare(b.name));
      case SortOption.NAME_DESC:
        return data.sort((a, b) => b.name.localeCompare(a.name));
      case SortOption.PRICE_ASC:
        return data.sort((a, b) => a.price_per_hour - b.price_per_hour);
      case SortOption.PRICE_DESC:
        return data.sort((a, b) => b.price_per_hour - a.price_per_hour);
      case SortOption.RATING_ASC:
        return data.sort((a, b) => a.rating - b.rating);
      case SortOption.RATING_DESC:
        return data.sort((a, b) => b.rating - a.rating);
      default:
        return data;
    }
  }, [sortOption]);

  const visiblePsychologists = sortedPsychologists.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPsychologists.length;

  const loadMore = async () => {
    setIsFetching(true);
    // Şartnamedeki "veritabanına yeni istek gönderilmeli" maddesi için asenkron simülasyon
    await new Promise(resolve => setTimeout(resolve, 800));
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    setIsFetching(false);
  };

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
