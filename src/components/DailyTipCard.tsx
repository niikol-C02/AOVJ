import React from 'react';
import { getDailyAdvice } from '../models/adviceData';
import { Quote, Sparkles, Calendar, HeartHandshake, ChevronRight } from 'lucide-react';

interface DailyTipCardProps {
  onNavigateTest?: () => void;
}

export const DailyTipCard: React.FC<DailyTipCardProps> = ({ onNavigateTest }) => {
  // Obtiene determinísticamente la única frase del día basada en el calendario actual
  // Permanece idéntica durante todo el día y cambia automáticamente a medianoche
  const dailyQuote = getDailyAdvice();

  // Fecha actual formateada en español (ej. "domingo, 13 de septiembre de 2026")
  const todayFormatted = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <section 
      id="daily-quote-card" 
      className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 text-white p-6 sm:p-8 lg:p-10 border border-white/20 shadow-xl space-y-6"
    >
      {/* Subtle background ambient light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar: Solamente la Frase del Día y la fecha */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-white">
                Frase del Día
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[11px] font-bold">
                Inspiración Diaria
              </span>
            </div>
            <p className="text-xs text-purple-200/85 flex items-center gap-1.5 capitalize pt-0.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>{todayFormatted}</span>
            </p>
          </div>
        </div>

        <span className="text-[11px] text-purple-300/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-medium">
          Se renueva automáticamente a medianoche
        </span>
      </div>

      {/* Main Quote Display: Una sola frase motivadora para hoy */}
      <div className="relative z-10 space-y-5">
        <div className="relative pl-6 sm:pl-9 border-l-4 border-pink-500 py-2 space-y-3">
          <Quote className="absolute -top-1 left-2 w-5 h-5 text-pink-400/50" />
          <blockquote className="text-lg sm:text-xl md:text-2xl italic text-purple-50 font-medium leading-relaxed font-serif">
            "{dailyQuote.quote}"
          </blockquote>
          <p className="text-sm sm:text-base text-pink-300 font-bold tracking-wide">
            — {dailyQuote.author}
          </p>
        </div>

        {/* Reflexión motivadora sobre metas y futuro */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-purple-400/20 text-purple-200 border border-purple-400/30 shrink-0 mt-0.5">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-purple-200">
              Para tu futuro y tus estudios:
            </p>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
              {dailyQuote.practicalTip}
            </p>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-purple-300">
        <span className="text-purple-300/70">
          Una frase cada día para acompañar tu vocación, esfuerzo y superación.
        </span>

        {onNavigateTest && (
          <button
            onClick={onNavigateTest}
            className="text-pink-300 hover:text-pink-200 font-bold flex items-center gap-1 hover:underline ml-auto"
          >
            <span>Descubre tu carrera con el test</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};
