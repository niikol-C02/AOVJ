import React, { useState, useEffect, useMemo } from 'react';
import { AccessibilityPreferences, AgeStage, Question, TestCategoryId, TestResult, User, getAgeStage } from '../types';
import { 
  TEST_CATEGORIES_DATA, 
  TestCategoryInfo, 
  getAdaptiveQuestions, 
  getTestCategoryInfo,
  AGE_STAGES_INFO
} from '../models/adaptiveTestBank';
import { TestEngine } from '../controllers/TestEngine';
import { AccessibilityModal } from '../components/AccessibilityModal';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Flame, 
  Heart, 
  Zap, 
  Smile, 
  RotateCw, 
  SlidersHorizontal,
  Info,
  ShieldCheck,
  GraduationCap,
  Compass,
  Briefcase,
  Brain,
  RefreshCw,
  Clock,
  Check,
  Sliders,
  Save,
  PauseCircle,
  HelpCircle
} from 'lucide-react';

interface TestViewProps {
  currentUser: User | null;
  onCompleteTest: (result: TestResult) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  accessibilityPreferences?: AccessibilityPreferences;
  onUpdateAccessibilityPreferences?: (prefs: AccessibilityPreferences) => void;
  onUpdateUserAge?: (age: number) => void;
}

type ScaleMode = 'standard' | 'enthusiasm' | 'simple';

export const TestView: React.FC<TestViewProps> = ({ 
  currentUser, 
  onCompleteTest, 
  onShowToast,
  accessibilityPreferences = {},
  onUpdateAccessibilityPreferences,
  onUpdateUserAge
}) => {
  // Navigation inside TestView:
  // 1. 'category-select': Grid of 5 test categories
  // 2. 'pre-test': Preparation / overview screen before taking the test
  // 3. 'active-test': Test questions in progress
  const [currentScreen, setCurrentScreen] = useState<'category-select' | 'pre-test' | 'active-test'>('category-select');
  const [selectedCategoryId, setSelectedCategoryId] = useState<TestCategoryId>('estudiantes');
  const [scaleMode, setScaleMode] = useState<ScaleMode>('standard');
  const [isA11yModalOpen, setIsA11yModalOpen] = useState(false);

  // Local copy of accessibility preferences if parent doesn't provide updates
  const [localPrefs, setLocalPrefs] = useState<AccessibilityPreferences>(
    currentUser?.accessibilityPreferences || accessibilityPreferences
  );

  useEffect(() => {
    if (currentUser?.accessibilityPreferences) {
      setLocalPrefs(currentUser.accessibilityPreferences);
    }
  }, [currentUser?.accessibilityPreferences]);

  const handleUpdatePrefs = (newPrefs: AccessibilityPreferences) => {
    setLocalPrefs(newPrefs);
    if (onUpdateAccessibilityPreferences) {
      onUpdateAccessibilityPreferences(newPrefs);
    }
  };

  const userAge = currentUser?.age || 17;
  const ageStage: AgeStage = getAgeStage(userAge);
  const stageInfo = AGE_STAGES_INFO[ageStage];

  // Active category info
  const categoryInfo: TestCategoryInfo = useMemo(() => {
    return getTestCategoryInfo(selectedCategoryId);
  }, [selectedCategoryId]);

  // Questions tailored by category and age stage
  const questions: Question[] = useMemo(() => {
    return getAdaptiveQuestions(selectedCategoryId, ageStage);
  }, [selectedCategoryId, ageStage]);

  // Answers state
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Reset progress when category changes
  const handleSelectCategory = (catId: TestCategoryId) => {
    setSelectedCategoryId(catId);
    setCurrentScreen('pre-test');
    setAnswers({});
    setCurrentStepIndex(0);
  };

  const handleStartTest = () => {
    setCurrentScreen('active-test');
    setAnswers({});
    setCurrentStepIndex(0);
  };

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const currentQuestion = questions[currentStepIndex];

  // For category "intereses-habilidades", calculate whether we are in Phase 1 or Phase 2
  const isInterestsSkillsCategory = selectedCategoryId === 'intereses-habilidades';
  const isSkillsPhase = isInterestsSkillsCategory && currentQuestion && (
    currentQuestion.topic?.includes('habilidades') || currentQuestion.text.includes('[Mis Habilidades]') || currentStepIndex >= Math.ceil(totalQuestions / 2)
  );

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
      }, 240);
    }
  };

  const handleSaveAndPause = () => {
    onShowToast(
      'Progreso guardado',
      `Has respondido ${answeredCount} de ${totalQuestions} preguntas. Puedes retomar en cualquier momento sin perder tu avance.`,
      'info'
    );
  };

  const handleFinish = () => {
    if (answeredCount < totalQuestions) {
      onShowToast(
        'Faltan preguntas por responder',
        `Has respondido ${answeredCount} de ${totalQuestions}. Te recomendamos completar todas para la mayor precisión.`,
        'info'
      );
    }

    setIsCalculating(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => {
      const userContext = {
        city: currentUser?.city,
        educationLevel: currentUser?.educationLevel,
        age: userAge,
        ageStage,
        testCategoryId: selectedCategoryId
      };

      const result = TestEngine.calculateResults(answers, questions, userContext);
      onCompleteTest(result);
      setIsCalculating(false);
    }, 600);
  };

  // Response options according to scale mode
  const getRatingOptions = () => {
    switch (scaleMode) {
      case 'enthusiasm':
        return [
          { value: 1, label: 'Nada afín', emoji: '🥱', desc: 'No me llama la atención' },
          { value: 2, label: 'Poco interés', emoji: '🤔', desc: 'Rara vez me atrae' },
          { value: 3, label: 'Moderado', emoji: '🙂', desc: 'Aceptable o regular' },
          { value: 4, label: 'Me atrae', emoji: '😃', desc: 'Me gustaría explorarlo' },
          { value: 5, label: '¡Me apasiona!', emoji: '🔥', desc: '¡Me encantaría dedicarme a ello!' }
        ];
      case 'simple':
        return [
          { value: 1, label: 'En desacuerdo', emoji: '👎', desc: 'No va conmigo' },
          { value: 3, label: 'Indiferente', emoji: '⚖️', desc: 'A veces / Neutral' },
          { value: 5, label: 'De acuerdo', emoji: '👍', desc: 'Totalmente identificado' }
        ];
      case 'standard':
      default:
        return [
          { value: 1, label: 'Nada afín', emoji: '😣', desc: 'No me agrada / Desacuerdo' },
          { value: 2, label: 'Poco', emoji: '🙁', desc: 'Poco interés' },
          { value: 3, label: 'Neutral', emoji: '😐', desc: 'Me da igual / Regular' },
          { value: 4, label: 'Bastante', emoji: '🙂', desc: 'Me agrada / De acuerdo' },
          { value: 5, label: '¡Totalmente!', emoji: '🤩', desc: '¡Me encanta / Muy afín!' }
        ];
    }
  };

  const ratingOptions = getRatingOptions();

  // Helper icon renderer for categories
  const renderCategoryIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Brain': return <Brain className={className} />;
      case 'RefreshCw': return <RefreshCw className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  // Accessibility conditional classes
  const isHighContrast = !!localPrefs.visualHighContrast;
  const isLargeText = !!localPrefs.visualLargeText;
  const isAccessibleFont = !!localPrefs.visualAccessibleFont;
  const isLargeButtons = !!localPrefs.motorLargeButtons;

  return (
    <div className={`max-w-5xl mx-auto space-y-6 pb-16 ${isAccessibleFont ? 'tracking-wide' : ''}`}>
      {/* ============================================================ */}
      {/* 1. TOP STATUS BAR (Personalization & Accessibility Shortcut) */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
            {userAge}
          </div>
          <div className="text-xs">
            <span className="text-slate-500 font-medium">Experiencia adaptada: </span>
            <strong className="text-purple-950 font-bold">{stageInfo.name}</strong>
            <span className="text-slate-400 ml-1 hidden sm:inline">({stageInfo.ageRange})</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="open-a11y-modal-btn"
            onClick={() => setIsA11yModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            title="Ajustar tamaño de texto, alto contraste, opciones de lectura y tiempo"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-600" />
            <span>Personalizar mi experiencia</span>
            {Object.values(localPrefs).filter(Boolean).length > 0 && (
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SCREEN 1: CATEGORY SELECTION                                */}
      {/* ============================================================ */}
      {currentScreen === 'category-select' && (
        <div className="space-y-6">
          {/* Hero Header */}
          <div className="p-6 sm:p-10 rounded-3xl sm:rounded-[36px] bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(180,160,220,0.12)] space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-xs font-bold text-purple-900 shadow-xs">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>Orientación Vocacional Adaptativa & Inclusiva</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] tracking-tight">
              Tests Vocacionales Personalizados
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Selecciona el enfoque que mejor responda a tu momento actual. La plataforma adapta el lenguaje, la cantidad de preguntas y los ejemplos a tu edad y a tus necesidades de accesibilidad, sin limitar tus posibilidades profesionales.
            </p>
          </div>

          {/* 5 Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEST_CATEGORIES_DATA.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <div
                  key={cat.id}
                  id={`cat-card-${cat.id}`}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`p-6 rounded-3xl bg-white/75 backdrop-blur-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden ${
                    isSelected ? 'border-purple-500 ring-2 ring-purple-400/40 bg-white/95' : 'border-white/90 hover:border-purple-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.colorGradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                        {renderCategoryIcon(cat.iconName, "w-6 h-6")}
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100/90 text-slate-700 border border-slate-200/80">
                        {cat.badge}
                      </span>
                    </div>

                    <h2 className="text-lg font-extrabold text-slate-900 font-['Outfit',sans-serif] group-hover:text-purple-600 transition-colors">
                      {cat.title}
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      <span>{cat.approxTime.split('(')[0]}</span>
                    </span>

                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-purple-100/80 group-hover:bg-purple-600 text-purple-900 group-hover:text-white font-bold transition-colors flex items-center gap-1"
                    >
                      <span>Explorar test</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SCREEN 2: PRE-TEST PREPARATION SCREEN                       */}
      {/* ============================================================ */}
      {currentScreen === 'pre-test' && (
        <div className="p-6 sm:p-10 rounded-3xl sm:rounded-[36px] bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_8px_32px_rgba(180,160,220,0.12)] space-y-8 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryInfo.colorGradient} text-white flex items-center justify-center shadow-md`}>
                {renderCategoryIcon(categoryInfo.iconName, "w-7 h-7")}
              </div>
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block">
                  Antes de comenzar tu test
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  {categoryInfo.title}
                </h1>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen('category-select')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ver otras categorías</span>
            </button>
          </div>

          {/* Cards: ¿Qué vas a descubrir? & ¿Qué exploraremos? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ¿Qué vas a descubrir? */}
            <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
              <div className="flex items-center gap-2 text-purple-950 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>¿Qué vas a descubrir?</span>
              </div>
              <p className="text-xs sm:text-sm text-purple-900/90 leading-relaxed">
                {categoryInfo.whatYouWillDiscover}
              </p>
            </div>

            {/* ¿Qué exploraremos? */}
            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
              <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
                <Brain className="w-4 h-4 text-indigo-600" />
                <span>¿Qué exploraremos?</span>
              </div>
              <ul className="space-y-2 text-xs text-indigo-950/90">
                {categoryInfo.whatWeWillExplore.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Adaptation & Accessibility Details */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Tu experiencia personalizada</span>
              </div>
              <button
                onClick={() => setIsA11yModalOpen(true)}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1"
              >
                <Sliders className="w-3 h-3" />
                <span>Modificar ajustes de accesibilidad</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="p-3 rounded-xl bg-white border border-slate-200/70">
                <strong className="text-slate-800 block mb-1">⏱️ Tiempo aproximado:</strong>
                <span>{categoryInfo.approxTime}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200/70">
                <strong className="text-slate-800 block mb-1">🧒 Etapa configurada:</strong>
                <span>{stageInfo.name} ({userAge} años) — preguntas adaptadas sin límite de opciones.</span>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              {questions.length} preguntas diseñadas especialmente para ti.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsA11yModalOpen(true)}
                className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <Sliders className="w-4 h-4 text-purple-600" />
                <span>Personalizar antes de empezar</span>
              </button>

              <button
                id="start-test-btn"
                onClick={handleStartTest}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>Comenzar test</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SCREEN 3: ACTIVE TEST QUESTIONS                             */}
      {/* ============================================================ */}
      {currentScreen === 'active-test' && (
        <div className="space-y-6">
          {/* Test Header */}
          <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${categoryInfo.colorGradient} text-white flex items-center justify-center shadow-xs`}>
                  {renderCategoryIcon(categoryInfo.iconName, "w-4 h-4")}
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                    {categoryInfo.title}
                  </h2>
                  <span className="text-[11px] text-slate-500">
                    Etapa: {stageInfo.name} • Sin límite de tiempo
                  </span>
                </div>
              </div>

              {/* Action buttons: Pause, scale style, accessibility */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSaveAndPause}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5 shadow-xs"
                  title="Guardar respuestas para continuar después"
                >
                  <Save className="w-3.5 h-3.5 text-purple-600" />
                  <span className="hidden sm:inline">Guardar progreso</span>
                </button>

                <div className="flex items-center gap-1 text-xs">
                  <select
                    value={scaleMode}
                    onChange={(e) => setScaleMode(e.target.value as ScaleMode)}
                    className="bg-white border border-purple-200 rounded-xl px-2.5 py-1.5 text-xs text-purple-900 font-bold focus:outline-none"
                    title="Estilo de respuestas"
                  >
                    <option value="standard">Escala Afinidad (1 a 5)</option>
                    <option value="enthusiasm">Escala Entusiasmo (1 a 5)</option>
                    <option value="simple">Escala Simple (3 opciones)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Special Phase Badge for "Intereses y habilidades" */}
            {isInterestsSkillsCategory && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold">
                <Brain className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isSkillsPhase ? 'Fase 2: Mis habilidades (¿En qué demuestras facilidad o potencial?)' : 'Fase 1: Mis intereses (¿Qué actividades y temas llaman tu atención?)'}
                </span>
              </div>
            )}

            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-pink-500" />
                  <span>Pregunta {currentStepIndex + 1} de {totalQuestions}</span>
                </span>
                <span className="text-purple-700 font-extrabold">{progressPercent}% completado</span>
              </div>

              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          {currentQuestion && (
            <div className={`p-6 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-2xl border shadow-lg space-y-6 transition-all ${
              isHighContrast ? 'border-slate-900 shadow-2xl bg-white text-slate-950' : 'border-white/90 shadow-[0_8px_32px_rgba(180,160,220,0.12)]'
            }`}>
              {/* Question Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-900">
                  {currentQuestion.topic || 'Actividad vocacional'}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  #{currentQuestion.id}
                </span>
              </div>

              {/* Question Text */}
              <div className="space-y-2 py-2">
                <h3 className={`font-extrabold text-slate-900 leading-snug font-['Outfit',sans-serif] ${
                  isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                }`}>
                  {currentQuestion.text}
                </h3>
                {localPrefs.readingAssistance && (
                  <p className="text-xs text-purple-700 font-medium">
                    💡 Piensa en cómo te sientes ante esta situación: puedes responder según lo que disfrutas o te llama la atención.
                  </p>
                )}
              </div>

              {/* Response Options */}
              <div className={`grid ${scaleMode === 'simple' ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-5'} gap-3 pt-2`}>
                {ratingOptions.map(opt => {
                  const isSelected = answers[currentQuestion.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      id={`rating-opt-${opt.value}`}
                      onClick={() => handleSelectRating(opt.value)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center group cursor-pointer ${
                        isLargeButtons ? 'min-h-[72px] py-5 px-4' : 'min-h-[60px]'
                      } ${
                        isSelected
                          ? isHighContrast
                            ? 'bg-slate-950 text-white border-slate-950 ring-4 ring-purple-400'
                            : 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white border-transparent shadow-lg scale-105'
                          : isHighContrast
                            ? 'bg-white text-slate-950 border-2 border-slate-900 hover:bg-slate-100'
                            : 'bg-white/80 hover:bg-white border-slate-200/90 text-slate-700 hover:border-purple-300 hover:shadow-md'
                      }`}
                    >
                      <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                        {opt.emoji}
                      </span>
                      <span className={`font-extrabold block leading-tight ${isLargeText ? 'text-sm' : 'text-xs'}`}>
                        {opt.label}
                      </span>
                      <span className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-white/90' : 'text-slate-400'}`}>
                        {opt.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentStepIndex === 0}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <div className="flex items-center gap-2">
                  {currentStepIndex < totalQuestions - 1 ? (
                    <button
                      onClick={() => setCurrentStepIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                    >
                      <span>Siguiente</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      id="finish-test-btn"
                      onClick={handleFinish}
                      disabled={isCalculating}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all flex items-center gap-2 animate-pulse"
                    >
                      {isCalculating ? (
                        <>
                          <RotateCw className="w-4 h-4 animate-spin" />
                          <span>Analizando tu perfil...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Finalizar y ver resultados</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Accessibility Modal */}
      <AccessibilityModal
        isOpen={isA11yModalOpen}
        onClose={() => setIsA11yModalOpen(false)}
        preferences={localPrefs}
        onUpdatePreferences={handleUpdatePrefs}
        userAge={userAge}
        onUpdateAge={onUpdateUserAge}
        onShowToast={onShowToast}
      />
    </div>
  );
};
