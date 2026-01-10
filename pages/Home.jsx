
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Users, CheckCircle, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative overflow-hidden pt-12 md:pt-24 pb-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-[60%] h-screen bg-emerald-50 rounded-bl-[100px] hidden lg:block"></div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Text Content */}
        <div className="lg:w-1/2 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-8 leading-[1.1]">
            The road to the <span className="text-emerald-600 italic">depths</span> of the human soul
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-12 leading-relaxed max-w-lg">
            We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.
          </p>
          <Link 
            to="/psychologists" 
            className="group inline-flex items-center justify-center space-x-3 bg-emerald-600 text-white px-10 py-5 rounded-[30px] font-bold text-lg hover:bg-emerald-700 transition shadow-xl shadow-emerald-200"
          >
            <span>Get started</span>
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-gray-100 pt-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-slate-800">15k+</span>
              <span className="text-sm text-gray-400">Happy Clients</span>
            </div>
             <div className="flex flex-col">
              <span className="text-3xl font-bold text-slate-800">100+</span>
              <span className="text-sm text-gray-400">Specialists</span>
            </div>
             <div className="flex flex-col">
              <span className="text-3xl font-bold text-slate-800">24/7</span>
              <span className="text-sm text-gray-400">Support</span>
            </div>
          </div>
        </div>

        {/* Visual Content */}
        <div className="lg:w-1/2 relative">
          <div className="relative z-10 w-full max-w-lg mx-auto aspect-square bg-slate-800 rounded-[50px] overflow-hidden shadow-2xl">
             <img 
              src="https://picsum.photos/seed/psychology/800/800" 
              alt="Psychotherapy Session" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          
          {/* Floating cards */}
          <div className="absolute -bottom-6 -left-6 md:-left-12 z-20 bg-white p-6 rounded-3xl shadow-xl border border-emerald-50 flex items-center space-x-4 animate-bounce-slow">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Experienced</p>
              <p className="font-bold text-slate-800">1,200+ Psychologists</p>
            </div>
          </div>

          <div className="absolute -top-6 -right-6 md:-right-8 z-20 bg-emerald-600 p-4 md:p-6 rounded-3xl shadow-xl text-white flex flex-col space-y-2 animate-bounce-slow delay-700">
             <div className="flex items-center space-x-2">
                <CheckCircle size={20} />
                <span className="font-bold">Verified</span>
             </div>
             <span className="text-xs opacity-80">All specialists are licensed</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default Home;
