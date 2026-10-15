import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, BarChart2, Volume2, VolumeX, MessageSquareQuote, Check } from 'lucide-react';
import { DailyChallenge } from '../types';
import { speechService } from '../utils/speechService';
import { StorageController } from '../controllers/StorageController';

interface DailyChallengeWidgetProps {
  onShowToast?: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const DailyChallengeWidget: React.FC<DailyChallengeWidgetProps> = ({ onShowToast }) => {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch active daily challenge
  useEffect(() => {
    fetchActiveChallenge();
  }, []);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  const fetchActiveChallenge = async () => {
    setIsLoading(true);
    try {
      const token = StorageController.getAuthToken();
      const res = await fetch('/api/daily-challenge/active', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (data.challenge) {
          setChallenge(data.challenge);
          if (data.challenge.userVote !== null && data.challenge.userVote !== undefined) {
            setSelectedOption(data.challenge.userVote);
            setHasVoted(true);
          }
        }
      }
    } catch (err) {
      console.warn('Could not load daily challenge:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = () => {
    if (!challenge) return;

    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `Pregunta del día: ${challenge.question}. Opciones: ${challenge.options.join(', ')}`;
    const started = speechService.speak(textToRead, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });

    if (!started) {
      setIsSpeaking(false);
      onShowToast?.('Audio', 'Tu dispositivo no tiene habilitada la síntesis de voz.', 'info');
    }
  };

  const handleVote = async () => {
    if (!challenge || selectedOption === null || hasVoted) return;

    setIsSubmitting(true);
    try {
      const token = StorageController.getAuthToken();
      const res = await fetch(`/api/daily-challenge/${challenge.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          optionIndex: selectedOption
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.challenge) {
          setChallenge(data.challenge);
          setHasVoted(true);
          onShowToast?.('¡Respuesta registrada!', 'Gracias por participar en la dinámica vocacional de hoy.', 'success');
        }
      } else {
        const err = await res.json();
        onShowToast?.('Error al votar', err.error || 'No se pudo guardar tu respuesta.', 'error');
      }
    } catch (err) {
      onShowToast?.('Error de conexión', 'Comprueba tu conexión a internet.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If no active challenge, don't display widget
  if (isLoading) {
    return null;
  }

  if (!challenge || !challenge.active) {
    return null;
  }

  const totalVotes = challenge.totalVotes || 0;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/90 via-indigo-900/90 to-slate-900 text-white p-5 sm:p-7 shadow-xl border border-purple-500/30 backdrop-blur-xl">
      {/* Decorative background glows */}
      <div className="absolute -top-16 -right-16 w-52 h-52 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-pink-300">
            <MessageSquareQuote className="w-4 h-4 text-pink-400" />
            <span>Dinámica del Día</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Button */}
            <button
              id="daily-challenge-listen-btn"
              type="button"
              onClick={handleSpeak}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors border border-white/10"
              title={isSpeaking ? 'Detener lectura' : 'Escuchar pregunta del día'}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                  <span className="text-pink-300">Detener</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-purple-300" />
                  <span>Escuchar</span>
                </>
              )}
            </button>

            {hasVoted && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Respondida</span>
              </span>
            )}
          </div>
        </div>

        {/* Question Title */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif] text-white leading-snug">
            {challenge.question}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {hasVoted
              ? `Has participado junto con ${totalVotes} estudiante${totalVotes === 1 ? '' : 's'}. Estos son los resultados en vivo:`
              : 'Elige la opción que mejor describe tu forma de pensar y descubre qué opinan otros estudiantes:'}
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-2.5 pt-1">
          {challenge.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const stat = challenge.stats?.find(s => s.option === option);
            const percentage = stat ? stat.percentage : 0;
            const votesCount = stat ? stat.votes : 0;

            if (hasVoted) {
              return (
                <div
                  key={idx}
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-purple-600/30 border-purple-400/80 shadow-xs'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  {/* Percentage Progress Bar Background */}
                  <div
                    className={`absolute top-0 bottom-0 left-0 transition-all duration-700 rounded-2xl ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500/35 to-purple-600/40'
                        : 'bg-white/10'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />

                  <div className="relative z-10 flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                          isSelected
                            ? 'bg-pink-500 text-white'
                            : 'bg-white/20 text-slate-300'
                        }`}
                      >
                        {isSelected ? '✓' : String.fromCharCode(65 + idx)}
                      </div>
                      <span className={`font-medium ${isSelected ? 'text-white font-bold' : 'text-slate-200'}`}>
                        {option}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                      <span className="text-slate-300 text-[11px]">({votesCount})</span>
                      <span className={`font-bold ${isSelected ? 'text-pink-300 text-sm' : 'text-slate-200'}`}>
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-600/30 to-purple-600/40 border-pink-400 shadow-md ring-2 ring-pink-500/40 text-white'
                    : 'bg-white/5 hover:bg-white/15 border-white/15 text-slate-200 hover:text-white'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                    isSelected
                      ? 'bg-pink-500 text-white shadow-xs'
                      : 'bg-white/15 text-slate-300'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-xs sm:text-sm font-medium leading-snug flex-1">
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Button (if not yet voted) */}
        {!hasVoted && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
              <span>{totalVotes} estudiante{totalVotes === 1 ? '' : 's'} han votado hoy</span>
            </span>

            <button
              id="daily-challenge-submit-btn"
              type="button"
              disabled={selectedOption === null || isSubmitting}
              onClick={handleVote}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                selectedOption !== null && !isSubmitting
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md shadow-purple-900/40 active:scale-95'
                  : 'bg-white/10 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <span>Guardando respuesta...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Votar y ver resultados</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
