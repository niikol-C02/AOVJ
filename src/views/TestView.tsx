import React, { useState, useEffect } from 'react';
import { Question, TestResult } from '../types';
import { VOCATIONAL_QUESTIONS, RIASEC_DIMENSIONS } from '../models/data';
import { TestEngine } from '../controllers/TestEngine';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  Flame, 
  BookOpen, 
  Heart, 
  Zap, 
  Smile
} from 'lucide-react';

interface TestViewProps {
  onCompleteTest: (result: TestResult) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const TestView: React.FC<TestViewProps> = ({ onCompleteTest, onShowToast }) => {
  // Test mode: 'full' (30 questions) vs 'quick' (18 questions)
  const [testMode, setTestMode] = useState<'full' | 'quick'>('full');
  const questionsToUse = testMode === 'full' 
    ? VOCATIONAL_QUESTIONS 
    : VOCATIONAL_QUESTIONS.filter((_, idx) => idx % 2 === 0 || idx > 20);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Group questions by area for tabs
  const areas = [
    { key: 'intereses', label: '1. Intereses y Gustos', icon: Heart, color: 'pink' },
    { key: 'habilidades', label: '2. Habilidades y Talentos', icon: Zap, color: 'purple' },
    { key: 'personalidad', label: '3. Personalidad y Estilo', icon: Smile, color: 'indigo' },
    { key: 'preferencias', label: '4. Preferencias Laborales', icon: Award, color: 'amber' }
  ];

  const totalQuestions = questionsToUse.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const currentQuestion = questionsToUse[currentStepIndex];
  const currentArea = currentQuestion ? currentQuestion.area : 'intereses';

  const handleSelectRating = (rating: number) => {
    if (!currentQuestion) return;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: rating
    }));

    // Auto-advance to next question if not at end
    if (currentStepIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 250);
    }
  };

  const handleFinish = () => {
    if (answeredCount < totalQuestions) {
      onShowToast(
        'Faltan preguntas por responder',
        `Has respondido ${answeredCount} de ${totalQuestions}. Completa las restantes para obtener la mayor precisión.`,
        'info'
      );
    }

    setIsCalculating(true);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => {
      const result = TestEngine.calculateResults(answers, questionsToUse);
      onCompleteTest(result);
      setIsCalculating(false);
    }, 600);
  };

  const ratingOptions = [
    { value: 1, label: 'Nada afín', emoji: '😣', desc: 'No me gusta / En desacuerdo' },
    { value: 2, label: 'Poco', emoji: '🙁', desc: 'Poco interés' },
    { value: 3, label: 'Neutral', emoji: '😐', desc: 'Me da igual / Regular' },
    { value: 4, label: 'Bastante', emoji: '🙂', desc: 'Me agrada / De acuerdo' },
    { value: 5, label: '¡Totalmente!', emoji: '🤩', desc: '¡Me encanta / Muy afín!' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Test Header with Frosted Glass */}
      <div className="p-6 sm:p-8 rounded-3xl sm:rounded-[32px] bg-white/65 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(180,160,220,0.1)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-purple-200/80 text-xs font-bold text-purple-800 mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Cuestionario Vocacional Interactivo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Test de Orientación Vocacional
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mt-1">
              Descubre qué carreras y áreas profesionales encajan con tu forma de ser, tus gustos y tus habilidades. Responde con sinceridad: no hay respuestas correctas o incorrectas.
            </p>
          </div>

          {/* Test length switcher */}
          <div className="flex items-center p-1 bg-white/75 backdrop-blur-md rounded-2xl border border-white/80 shadow-xs">
            <button
              onClick={() => {
                setTestMode('full');
                setCurrentStepIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                testMode === 'full'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              Test Completo (30 preg.)
            </button>
            <button
              onClick={() => {
                setTestMode('quick');
                setCurrentStepIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                testMode === 'quick'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              Test Rápido (18 preg.)
            </button>
          </div>
        </div>

        {/* Progress Bar & Status */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-pink-500" />
              <span>Progreso: {answeredCount} de {totalQuestions} respondidas</span>
            </span>
            <span className="text-purple-700">{progressPercent}% completado</span>
          </div>

          <div className="w-full h-3 bg-white/60 backdrop-blur-sm rounded-full overflow-hidden border border-white/80 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-300 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Area Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {areas.map(area => {
          const isAreaActive = currentArea === area.key;
          const Icon = area.icon;
          return (
            <div
              key={area.key}
              className={`p-3 rounded-2xl border text-center transition-all flex items-center justify-center gap-2 backdrop-blur-md ${
                isAreaActive
                  ? 'bg-white/90 border-purple-300 text-purple-900 shadow-xs font-bold'
                  : 'bg-white/50 border-white/60 text-slate-600 text-xs hover:bg-white/70'
              }`}
            >
              <Icon className={`w-4 h-4 ${isAreaActive ? 'text-purple-600' : 'text-slate-400'}`} />
              <span className="text-xs truncate">{area.label}</span>
            </div>
          );
        })}
      </div>

      {/* Main Question Card with Frosted Glass */}
      {currentQuestion && (
        <div className="p-6 sm:p-10 rounded-3xl sm:rounded-[32px] bg-white/75 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(180,160,220,0.12)] space-y-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Question Index and Area Badge */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-purple-100/90 backdrop-blur-sm border border-purple-200/60 text-purple-800 font-bold text-xs shadow-xs">
              Pregunta {currentStepIndex + 1} de {totalQuestions}
            </span>
            <span className="text-xs text-slate-500 capitalize font-medium">
              Área: {currentQuestion.area}
            </span>
          </div>

          {/* Question Statement */}
          <div className="text-center max-w-2xl mx-auto py-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] leading-snug">
              "{currentQuestion.text}"
            </h2>
            <p className="text-xs text-slate-500 mt-3">
              Selecciona el nivel que mejor represente qué tanto te identifica esta afirmación:
            </p>
          </div>

          {/* 5-Point Interactive Rating Scale with Glass Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {ratingOptions.map(opt => {
              const isSelected = answers[currentQuestion.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  id={`rating-btn-${opt.value}`}
                  onClick={() => handleSelectRating(opt.value)}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 group backdrop-blur-md ${
                    isSelected
                      ? 'bg-purple-100/90 border-purple-400 text-purple-900 shadow-md scale-105 ring-2 ring-purple-400/40'
                      : 'bg-white/60 hover:bg-white/90 border-white/80 hover:border-pink-300 text-slate-700 shadow-xs'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl group-hover:scale-125 transition-transform">
                    {opt.emoji}
                  </span>
                  <div className="text-center">
                    <p className="font-bold text-xs sm:text-sm">{opt.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 hidden sm:block">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
            <button
              onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className="px-4 py-2.5 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-slate-700 text-xs font-semibold hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {/* Quick jump questions pagination dots */}
            <div className="hidden md:flex items-center gap-1 max-w-xs overflow-x-auto py-1">
              {questionsToUse.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentStepIndex
                      ? 'bg-purple-600 scale-125'
                      : answers[q.id]
                      ? 'bg-pink-400'
                      : 'bg-slate-300/80 hover:bg-slate-400'
                  }`}
                  title={`Pregunta ${idx + 1}`}
                />
              ))}
            </div>

            {currentStepIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentStepIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all border border-white/20"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="finish-test-btn"
                onClick={handleFinish}
                disabled={isCalculating}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-md border border-white/30 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isCalculating ? 'Calculando Perfil...' : 'Ver Mis Resultados'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Finish CTA if ready */}
      {answeredCount === totalQuestions && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-500/90 to-teal-600/90 backdrop-blur-xl border border-white/40 text-white shadow-xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
            <div>
              <p className="text-sm font-bold">¡Has respondido todas las preguntas!</p>
              <p className="text-xs text-emerald-100">Haz clic para descubrir tus carreras recomendadas.</p>
            </div>
          </div>
          <button
            onClick={handleFinish}
            className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-extrabold text-xs shadow-md hover:bg-emerald-50 transition-all shrink-0"
          >
            Obtener Resultados →
          </button>
        </div>
      )}
    </div>
  );
};
