import React, { useState } from 'react';
import { DAILY_ADVICE_LIST, getDailyAdvice } from '../models/adviceData';
import { DailyAdvice, AdviceCategory } from '../types';
import { 
  Sparkles, 
  RotateCw, 
  Quote, 
  Lightbulb, 
  CheckCircle2, 
  Compass, 
  BookOpen, 
  GraduationCap, 
  Flame, 
  Clock, 
  Briefcase,
  Layers,
  ChevronRight,
  Calendar
} from 'lucide-react';

interface DailyTipCardProps {
  onNavigateTest?: () => void;
}

export const DailyTipCard: React.FC<DailyTipCardProps> = ({ onNavigateTest }) => {
  // Start with today's advice by default
  const [currentAdvice, setCurrentAdvice] = useState<DailyAdvice>(() => getDailyAdvice());
  const [filterCategory, setFilterCategory] = useState<AdviceCategory | 'all'>('all');
  const [isRotating, setIsRotating] = useState(false);

  // Format today's date in Spanish
  const todayFormatted = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());

  const getCategoryIcon = (category: AdviceCategory) => {
    switch (category) {
      case 'Orientación vocacional':
        return <Compass className="w-4 h-4 text-pink-500" />;
      case 'Educación':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'Elección de carrera':
        return <GraduationCap className="w-4 h-4 text-purple-500" />;
      case 'Motivación':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'Organización para estudiar':
        return <Clock className="w-4 h-4 text-indigo-500" />;
      case 'Futuro profesional':
        return <Briefcase className="w-4 h-4 text-cyan-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-pink-500" />;
    }
  };

  const handleNextAdvice = () => {
    setIsRotating(true);
    setTimeout(() => {
      const filtered = filterCategory === 'all' 
        ? DAILY_ADVICE_LIST 
        : DAILY_ADVICE_LIST.filter(a => a.category === filterCategory);
      
      const currentIndex = filtered.findIndex(a => a.id === currentAdvice.id);
      const nextIndex = (currentIndex + 1) % filtered.length;
      setCurrentAdvice(filtered[nextIndex]);
      setIsRotating(false);
    }, 200);
  };

  const handleSelectCategory = (cat: AdviceCategory | 'all') => {
    setFilterCategory(cat);
    const filtered = cat === 'all' 
      ? DAILY_ADVICE_LIST 
      : DAILY_ADVICE_LIST.filter(a => a.category === cat);
    if (filtered.length > 0) {
      setCurrentAdvice(filtered[0]);
    }
  };

  const categories: AdviceCategory[] = [
    'Orientación vocacional',
    'Educación',
    'Elección de carrera',
    'Motivación',
    'Organización para estudiar',
    'Futuro profesional'
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 text-white p-6 sm:p-8 lg:p-10 border border-white/20 shadow-xl space-y-6">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-white">
                Consejo del Día
              </h2>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-bold">
                Rotación Diaria Automática
              </span>
            </div>
            <p className="text-xs text-purple-200/80 flex items-center gap-1.5 capitalize">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>{todayFormatted}</span>
            </p>
          </div>
        </div>

        {/* Action button to cycle advice */}
        <button
          onClick={handleNextAdvice}
          id="btn-rotate-advice"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-purple-100 hover:text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition-all shadow-xs"
          title="Ver otro consejo inspirador"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          <span>Explorar otro consejo</span>
        </button>
      </div>

      {/* Category Pills Selector */}
      <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => handleSelectCategory('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
            filterCategory === 'all'
              ? 'bg-white text-slate-900 border-white shadow-xs'
              : 'bg-white/5 text-purple-200 border-white/10 hover:bg-white/15'
          }`}
        >
          Todos los temas (31)
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleSelectCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
              filterCategory === cat
                ? 'bg-purple-500 text-white border-purple-400 shadow-xs'
                : 'bg-white/5 text-purple-200 border-white/10 hover:bg-white/15'
            }`}
          >
            {getCategoryIcon(cat)}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Advice Content Body */}
      <div className="relative z-10 space-y-5 transition-all duration-300">
        {/* Category & Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-900/60 border border-purple-400/30 text-purple-200">
            {getCategoryIcon(currentAdvice.category)}
            <span>{currentAdvice.category}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit',sans-serif] leading-snug">
            {currentAdvice.title}
          </h3>
        </div>

        {/* Inspirational Quote */}
        <div className="relative pl-6 sm:pl-8 border-l-4 border-pink-500 py-1 space-y-2">
          <Quote className="absolute -top-1 left-1.5 w-4 h-4 text-pink-400/50" />
          <blockquote className="text-base sm:text-lg italic text-purple-100 font-medium leading-relaxed">
            "{currentAdvice.quote}"
          </blockquote>
          <p className="text-xs text-pink-300 font-bold tracking-wide">
            — {currentAdvice.author}
          </p>
        </div>

        {/* Practical Application Tip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
              Consejo Práctico para Aplicar Hoy:
            </p>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
              {currentAdvice.practicalTip}
            </p>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-purple-300">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Consejo #{currentAdvice.dayIndex} de la guía vocacional VocAcción</span>
        </span>

        {onNavigateTest && (
          <button
            onClick={onNavigateTest}
            className="text-pink-300 hover:text-pink-200 font-bold flex items-center gap-1 hover:underline"
          >
            <span>Realizar test vocacional</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};
