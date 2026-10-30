import React, { useState, useEffect } from 'react';
import { INSPIRING_FIGURES } from '../data/mockData';
import { Quote, RefreshCw, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';

export const InspiringQuotesSection: React.FC = () => {
  // Random starting quote on every page load/mount
  const [currentIndex, setCurrentIndex] = useState(() => {
    return Math.floor(Math.random() * INSPIRING_FIGURES.length);
  });
  const [isRotating, setIsRotating] = useState(false);

  // Auto-rotate every 14 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 14000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % INSPIRING_FIGURES.length);
      setIsRotating(false);
    }, 150);
  };

  const handlePrev = () => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + INSPIRING_FIGURES.length) % INSPIRING_FIGURES.length);
      setIsRotating(false);
    }, 150);
  };

  const handleRandom = () => {
    setIsRotating(true);
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * INSPIRING_FIGURES.length);
      if (nextIndex === currentIndex && INSPIRING_FIGURES.length > 1) {
        nextIndex = (currentIndex + 1) % INSPIRING_FIGURES.length;
      }
      setCurrentIndex(nextIndex);
      setIsRotating(false);
    }, 150);
  };

  const figure = INSPIRING_FIGURES[currentIndex] || INSPIRING_FIGURES[0];

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/40 relative overflow-hidden flex flex-col justify-between">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header zone with kicker and refresh control */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-emerald-300">
              Doğaya İlham Verenler
            </h3>
            <p className="text-[10px] text-slate-300">
              Her yenilemede yeni bir düşünce
            </p>
          </div>
        </div>

        <button
          onClick={handleRandom}
          title="Rastgele Yeni Söz Getir"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-emerald-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Yeni Söz</span>
        </button>
      </div>

      {/* Body: Quote & Inspiring Leader */}
      <div className={`relative z-10 space-y-6 transition-opacity duration-200 ${isRotating ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}`}>
        
        {/* Quote Mark Icon */}
        <Quote className="w-10 h-10 text-emerald-400/40" />

        {/* The Quote */}
        <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-slate-100 leading-relaxed italic">
          “{figure.quote}”
        </blockquote>

        {figure.subquote && (
          <p className="text-xs text-emerald-200/90 font-medium">
            ✦ {figure.subquote}
          </p>
        )}

        {/* Profile Card with Photo and Name */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-400 shadow-md">
            <img
              src={figure.imageUrl}
              alt={figure.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="min-w-0">
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span>{figure.name}</span>
              {figure.lifespan && (
                <span className="text-[11px] text-slate-400 font-normal font-mono">
                  ({figure.lifespan})
                </span>
              )}
            </div>
            <div className="text-xs text-emerald-300 font-medium leading-snug">
              {figure.role}
            </div>
          </div>
        </div>

      </div>

      {/* Footer Navigation Arrows and Indicators */}
      <div className="relative z-10 flex items-center justify-between pt-6 mt-6 border-t border-white/10">
        <div className="flex items-center gap-1">
          {INSPIRING_FIGURES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex ? 'w-6 bg-emerald-400' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Söz ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Önceki söz"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Sonraki söz"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
