import React, { useState } from 'react';
import { Heart, Star, User, GraduationCap, Briefcase, Info } from 'lucide-react';
import AppointmentModal from './AppointmentModal.jsx';

const PsychologistCard = ({
  psychologist,
  isFavorite,
  onToggleFavorite,
  isAuthorized
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);

  const handleHeartClick = () => {
    const success = onToggleFavorite(psychologist.id);
    if (!success) {
      setShowAuthWarning(true);
      setTimeout(() => setShowAuthWarning(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 relative group hover:shadow-md transition-all duration-300">
      {/* Auth Warning Toast */}
      {showAuthWarning && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-bold z-50 animate-bounce shadow-xl">
          Please log in to add to favorites!
        </div>
      )}

      {/* Avatar Container */}
      <div className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0">
        <div className="w-full h-full rounded-[24px] border-2 border-emerald-500/20 p-1.5 bg-white">
           <img
            src={psychologist.avatar_url}
            alt={psychologist.name}
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image'; e.currentTarget.onerror = null }}
            className="w-full h-full object-cover rounded-[20px]"
          />
        </div>
        <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
      </div>

      {/* Info Container */}
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <p className="text-gray-400 font-medium text-xs mb-1 uppercase tracking-widest">Psychologist</p>
            <h3 className="text-2xl font-bold text-slate-800">{psychologist.name}</h3>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
            <div className="flex items-center space-x-1.5">
              <Star size={18} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-slate-800">Rating: {psychologist.rating}</span>
            </div>
            <div className="h-4 w-[1px] bg-gray-200 hidden sm:block"></div>
            <div className="text-slate-800 font-medium">
               Price / 1 hour: <span className="text-emerald-600 font-bold">{psychologist.price_per_hour}$</span>
            </div>
            <button
              onClick={handleHeartClick}
              className="p-1 hover:scale-110 transition-transform active:scale-95"
              aria-label="Toggle Favorite"
            >
              <Heart
                size={26}
                className={`${isFavorite ? 'text-red-500 fill-red-500' : 'text-slate-800'} transition-colors duration-300`}
              />
            </button>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-gray-50 text-gray-600 px-4 py-2 rounded-full text-xs font-medium">
            Experience: <span className="text-slate-800 font-bold">{psychologist.experience}</span>
          </span>
          <span className="bg-gray-50 text-gray-600 px-4 py-2 rounded-full text-xs font-medium">
            License: <span className="text-slate-800 font-bold">{psychologist.license}</span>
          </span>
          <span className="bg-gray-50 text-gray-600 px-4 py-2 rounded-full text-xs font-medium">
            Specialization: <span className="text-slate-800 font-bold">{psychologist.specialization}</span>
          </span>
          <span className="bg-gray-50 text-gray-600 px-4 py-2 rounded-full text-xs font-medium">
            Initial consultation: <span className="text-slate-800 font-bold">{psychologist.initial_consultation}</span>
          </span>
        </div>

        <p className="text-gray-600 leading-relaxed mb-6">
          {psychologist.about}
        </p>

        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-emerald-600 font-bold text-sm underline underline-offset-4 hover:text-emerald-700 transition"
          >
            Read more
          </button>
        ) : (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="space-y-8 pt-8 border-t border-gray-100">
              <div className="space-y-6">
                {psychologist.reviews.length > 0 ? (
                  psychologist.reviews.map((review, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-bold text-lg">
                          {review.reviewer_name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{review.reviewer_name}</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={`${i < review.reviewer_rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed pl-14">
                        {review.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm italic">No reviews yet.</p>
                )}
              </div>

              <button
                onClick={() => setIsAppointmentOpen(true)}
                className="px-10 py-4 bg-emerald-600 text-white font-bold rounded-[30px] hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
              >
                Make an appointment
              </button>
            </div>
          </div>
        )}
      </div>

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        psychologist={psychologist}
      />
    </div>
  );
};

export default PsychologistCard;