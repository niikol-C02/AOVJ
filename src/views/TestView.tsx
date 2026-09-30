import React, { useState, useEffect, useMemo } from 'react';
import { AccessibilityPreferences, AgeStage, Question, TestCategoryId, TestDefinition, TestResult, User, getAgeStage, getAgeStageLabel } from '../types';
import { 
  TEST_CATEGORIES_DATA, 
  TestCategoryInfo, 
  getAdaptiveQuestions, 
  getTestCategoryInfo,
  getTestDefinitionById,
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
  Heart, 
  Zap, 
  RotateCw, 
  SlidersHorizontal,
  Info,
  ShieldCheck,
  GraduationCap,
  Compass,
  Briefcase,
  Brain,
  Clock,
  Check,
  Save,
  Volume2,
  VolumeX,
  RotateCcw,
  Sliders,
  UserCheck,
  BookOpen
} from 'lucide-react';

interface TestViewProps {
  currentUser: User | null;
  onCompleteTest: (result: TestResult) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  accessibilityPreferences?: AccessibilityPreferences;
  onUpdateAccessibilityPreferences?: (prefs: AccessibilityPreferences) => void;
  onUpdateUserAge?: (age: number) => void;
  initialCategoryId?: TestCategoryId;
  initialScreen?: 'categories' | 'category-tests' | 'pre-test' | 'active-test';
}

type ScaleMode = 'standard' | 'enthusiasm' | 'simple';

export const TestView: React.FC<TestViewProps> = ({ 
  currentUser, 
  onCompleteTest, 
  onShowToast,
  accessibilityPreferences = {},
  onUpdateAccessibilityPreferences,
  onUpdateUserAge,
  initialCategoryId = 'orientacion-vocacional',
  initialScreen = 'categories'
}) => {
  // Screens:
  // 1. 'categories': Grid of 6 categories "¿Qué quieres conocer sobre ti?"
  // 2. 'category-tests': Tests available within the selected category
  // 3. 'pre-test': Information card for the chosen test before starting
  // 4. 'active-test': Questions in progress
  const [currentScreen, setCurrentScreen] = useState<'categories' | 'category-tests' | 'pre-test' | 'active-test'>(initialScreen);
  const [selectedCategoryId, setSelectedCategoryId] = useState<TestCategoryId>(initialCategoryId);
  const [selectedTestId, setSelectedTestId] = useState<string>('test-riasec-integral');
  const [scaleMode, setScaleMode] = useState<ScaleMode>('standard');
  const [isA11yModalOpen, setIsA11yModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (initialScreen) {
      setCurrentScreen(initialScreen);
    }
  }, [initialScreen]);

  // Local preferences
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
  const ageLabel = getAgeStageLabel(userAge);
  const stageInfo = AGE_STAGES_INFO[ageStage] || AGE_STAGES_INFO['16-17'];

  // Current category & test info
  const categoryInfo: TestCategoryInfo = useMemo(() => {
    return getTestCategoryInfo(selectedCategoryId);
  }, [selectedCategoryId]);

  const activeTestDef: TestDefinition = useMemo(() => {
    const testLookup = getTestDefinitionById(selectedTestId);
    if (testLookup && testLookup.test) {
      return testLookup.test;
    }
    return categoryInfo.availableTests[0];
  }, [selectedTestId, categoryInfo]);

  // Questions tailored by category, age stage, and specific test
  const questions: Question[] = useMemo(() => {
    return getAdaptiveQuestions(selectedCategoryId, ageStage, selectedTestId);
  }, [selectedCategoryId, ageStage, selectedTestId]);

  // Answers state
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Stop speech when changing screens or questions
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentScreen, currentStepIndex]);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      onShowToast?.('Síntesis de voz', 'Tu navegador no soporta lectura por voz.', 'info');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Navigation handlers
  const handleOpenCategory = (catId: TestCategoryId) => {
    setSelectedCategoryId(catId);
    setCurrentScreen('category-tests');
  };

  const handleSelectTest = (test: TestDefinition) => {
    setSelectedTestId(test.id);
    setSelectedCategoryId(test.categoryId);
    setCurrentScreen('pre-test');
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

  const handleSelectRating = (rating: number) => {
    if (!currentQuestion) return;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: rating
    }));

    // Auto advance
    if (currentStepIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 260);
    }
  };

  const handleSaveAndPause = () => {
    onShowToast?.(
      'Progreso guardado',
      `Has respondido ${answeredCount} de ${totalQuestions} preguntas. Puedes retomar en cualquier momento.`,
      'info'
    );
  };

  const handleFinish = () => {
    setIsCalculating(true);

    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => {
      const userContext = {
        city: currentUser?.city,
        educationLevel: currentUser?.educationLevel,
        age: userAge,
        ageStage,
        testCategoryId: selectedCategoryId,
        testId: selectedTestId
      };

      const result = TestEngine.calculateResults(answers, questions, userContext);
      onCompleteTest(result);
      setIsCalculating(false);
    }, 600);
  };

  // Response options
  const getRatingOptions = () => {
    switch (scaleMode) {
      case 'enthusiasm':
        return [
          { value: 1, label: 'Nada afín', emoji: '🥱', desc: 'No me atrae' },
          { value: 2, label: 'Poco interés', emoji: '🤔', desc: 'Rara vez me gusta' },
          { value: 3, label: 'Moderado', emoji: '🙂', desc: 'Aceptable' },
          { value: 4, label: 'Me atrae', emoji: '😃', desc: 'Me gustaría explorarlo' },
          { value: 5, label: '¡Me apasiona!', emoji: '🔥', desc: '¡Me encanta hacerlo!' }
        ];
      case 'simple':
        return [
          { value: 1, label: 'En desacuerdo', emoji: '👎', desc: 'No va conmigo' },
          { value: 3, label: 'Neutral', emoji: '😐', desc: 'Indiferente' },
          { value: 5, label: 'De acuerdo', emoji: '👍', desc: 'Totalmente de acuerdo' }
        ];
      case 'standard':
      default:
        return [
          { value: 1, label: 'Totalmente en desacuerdo', emoji: '1', desc: 'No va con mis gustos' },
          { value: 2, label: 'En desacuerdo', emoji: '2', desc: 'Poco interés' },
          { value: 3, label: 'Neutral', emoji: '3', desc: 'Ni me gusta ni me disgusta' },
          { value: 4, label: 'De acuerdo', emoji: '4', desc: 'Me llama la atención' },
          { value: 5, label: 'Totalmente de acuerdo', emoji: '5', desc: 'Me apasiona completamente' }
        ];
    }
  };

  const ratingOptions = getRatingOptions();
  const isLargeText = !!localPrefs.visualLargeText;
  const isHighContrast = !!localPrefs.visualHighContrast;
  const isLargeButtons = !!localPrefs.motorLargeButtons;

  return (
    <div className={`space-y-6 sm:space-y-8 pb-16 max-w-6xl mx-auto ${
      isHighContrast ? 'contrast-125' : ''
    }`}>
      {/* Top Experience Customization & Age Stage Banner */}
      <section className="p-4 sm:p-5 rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Experiencia adaptada: <span className="text-purple-700">{ageLabel.range}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                {ageLabel.title}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {ageLabel.subtitle}. El contenido se adapta sin limitar tus opciones de carrera.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setIsA11yModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100/80 text-purple-900 font-bold text-xs border border-purple-200/80 transition-colors flex items-center gap-1.5 shadow-xs"
            title="Personalizar tamaño de letra, contraste, lectura por voz y adaptaciones"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-600" />
            <span>Personalizar mi experiencia</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. PANTALLA: CATEGORÍAS (”¿Qué quieres conocer sobre ti?”)               */}
      {/* ========================================================================= */}
      {currentScreen === 'categories' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-bold border border-pink-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Exploración Vocacional Guiada</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              ¿Qué quieres conocer sobre ti?
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Selecciona el tipo de orientación que deseas explorar hoy. Puedes realizar varios test para tener una visión más rica y completa de tu futuro.
            </p>
          </div>

          {/* Grid of the 6 Clear Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {TEST_CATEGORIES_DATA.map(cat => {
              const testCount = cat.availableTests.length;
              return (
                <div
                  key={cat.id}
                  id={`cat-card-${cat.id}`}
                  onClick={() => handleOpenCategory(cat.id)}
                  className={`p-6 rounded-3xl bg-white/70 backdrop-blur-xl border ${cat.borderColor} hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 cursor-pointer group shadow-xs`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.colorGradient} text-white flex items-center justify-center shadow-md shadow-purple-500/10 group-hover:scale-105 transition-transform`}>
                        {cat.id === 'intereses' && <Sparkles className="w-6 h-6" />}
                        {cat.id === 'habilidades' && <Brain className="w-6 h-6" />}
                        {cat.id === 'personalidad' && <UserCheck className="w-6 h-6" />}
                        {cat.id === 'areas-profesionales' && <Briefcase className="w-6 h-6" />}
                        {cat.id === 'preferencias-academicas' && <BookOpen className="w-6 h-6" />}
                        {cat.id === 'orientacion-vocacional' && <Compass className="w-6 h-6" />}
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {testCount} test{testCount > 1 ? 's' : ''} disponible{testCount > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">
                        {cat.badge}
                      </span>
                      <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors mt-0.5">
                        {cat.title}
                      </h2>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
                    <span>Ver tests disponibles</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PANTALLA: TESTS DISPONIBLES EN LA CATEGORÍA                          */}
      {/* ========================================================================= */}
      {currentScreen === 'category-tests' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentScreen('categories')}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Categorías</span>
            </button>
            <span className="text-xs text-slate-400">/</span>
            <span className="text-xs font-bold text-purple-800">{categoryInfo.title}</span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-3">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Categoría seleccionada
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {categoryInfo.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              {categoryInfo.description} {categoryInfo.whatYouWillDiscover}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
              Tests disponibles en esta categoría ({categoryInfo.availableTests.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryInfo.availableTests.map(test => (
                <div
                  key={test.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/80 hover:border-purple-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 shadow-2xs group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                        {test.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-500" />
                        <span>{test.approxTime}</span>
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                      {test.name}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {test.shortDescription}
                    </p>

                    <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-purple-950 space-y-1">
                      <span className="font-bold block text-[11px] uppercase tracking-wide text-purple-700">¿Para qué sirve?</span>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {test.whatItIsFor}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-500 font-medium">
                      <span>{test.questionCount} preguntas</span> • <span>{test.difficulty || 'Accesible'}</span>
                    </div>

                    <button
                      onClick={() => handleSelectTest(test)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Ver detalles y comenzar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PANTALLA: INFORMACIÓN DETALLADA DEL TEST (PRE-TEST)                   */}
      {/* ========================================================================= */}
      {currentScreen === 'pre-test' && (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentScreen('category-tests')}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Tests</span>
            </button>
            <span className="text-xs text-slate-400">/</span>
            <span className="text-xs text-slate-600">{categoryInfo.title}</span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl sm:rounded-[36px] bg-white/85 backdrop-blur-2xl border border-white/80 shadow-xl shadow-purple-500/5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                  Categoría: {activeTestDef.categoryName}
                </span>
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                  {activeTestDef.badge}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {activeTestDef.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeTestDef.shortDescription}
              </p>
            </div>

            {/* Structured attributes required by user */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100">
                <span className="text-[10px] font-bold uppercase text-purple-700 block">Tiempo estimado</span>
                <p className="text-xs font-extrabold text-slate-900 mt-0.5">{activeTestDef.approxTime}</p>
                <span className="text-[10px] text-slate-500">Sin límite estricto</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-pink-50/60 border border-pink-100">
                <span className="text-[10px] font-bold uppercase text-pink-700 block">Cantidad preguntas</span>
                <p className="text-xs font-extrabold text-slate-900 mt-0.5">{questions.length} preguntas</p>
                <span className="text-[10px] text-slate-500">Paso a paso</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold uppercase text-indigo-700 block">Nivel de dificultad</span>
                <p className="text-xs font-extrabold text-slate-900 mt-0.5">{activeTestDef.difficulty || 'Accesible'}</p>
                <span className="text-[10px] text-slate-500">Sin respuestas erróneas</span>
              </div>
            </div>

            {/* ¿Para qué sirve? */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50/50 border border-purple-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-purple-950 font-['Outfit',sans-serif] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>¿Para qué sirve este test?</span>
                </span>
                <button
                  type="button"
                  onClick={() => speakText(`${activeTestDef.name}. ${activeTestDef.whatItIsFor}`)}
                  className="text-[11px] font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
                  title="Escuchar descripción en voz alta"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? 'Detener audio' : 'Escuchar'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeTestDef.whatItIsFor}
              </p>
            </div>

            {/* Pedagogical reassurance */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p>
                <strong>No hay respuestas correctas ni incorrectas:</strong> Responde con sinceridad según lo que te gusta o te hace sentir cómodo. Podrás ver carreras recomendadas explicando claramente por qué se relacionan con tus resultados.
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                id="btn-start-test-now"
                onClick={handleStartTest}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] font-['Outfit',sans-serif] tracking-wide"
              >
                <span>Comenzar test</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentScreen('category-tests')}
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors text-center"
              >
                Elegir otro test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PANTALLA: TEST ACTIVO (PREGUNTAS EN CURSO)                            */}
      {/* ========================================================================= */}
      {currentScreen === 'active-test' && currentQuestion && (
        <div className="max-w-2xl mx-auto space-y-5 animate-in fade-in duration-200">
          {/* Header Bar with Pause & Scale Mode */}
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => setCurrentScreen('pre-test')}
              className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Salir del test</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveAndPause}
                className="px-3 py-1 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium flex items-center gap-1 shadow-xs"
              >
                <Save className="w-3.5 h-3.5 text-purple-600" />
                <span className="hidden sm:inline">Guardar avance</span>
              </button>
              <button
                onClick={() => setIsA11yModalOpen(true)}
                className="p-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-purple-700 shadow-xs"
                title="Ajustes de accesibilidad"
              >
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Pregunta {currentStepIndex + 1} de {totalQuestions}</span>
              <span className="text-purple-700">{progressPercent}% completado</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Main Question Card */}
          <div className={`p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-2xl border ${
            isHighContrast ? 'border-slate-900 shadow-none' : 'border-white/90 shadow-xl shadow-purple-500/5'
          } space-y-6`}>
            {/* Top metadata of question */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
                {currentQuestion.area || 'Intereses'}
              </span>

              <button
                type="button"
                onClick={() => speakText(currentQuestion.text)}
                className="px-2.5 py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold flex items-center gap-1 transition-colors"
                title="Escuchar pregunta en voz alta"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? 'Pausar' : 'Escuchar pregunta'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h3 className={`font-extrabold text-slate-900 leading-snug font-['Outfit',sans-serif] ${
                isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
              }`}>
                {currentQuestion.text}
              </h3>
              {localPrefs.cognitiveClearLanguage && (
                <p className="text-xs text-purple-800 bg-purple-50 p-2.5 rounded-xl border border-purple-100">
                  💡 <strong>Guía sencilla:</strong> Piensa si te gustaría hacer esto con frecuencia o si prefieres evitarlo. No hay respuesta equivocada.
                </p>
              )}
            </div>

            {/* Rating Buttons */}
            <div className={`grid ${scaleMode === 'simple' ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-5'} gap-2.5 sm:gap-3 pt-2`}>
              {ratingOptions.map(opt => {
                const isSelected = answers[currentQuestion.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    id={`rating-opt-${opt.value}`}
                    onClick={() => handleSelectRating(opt.value)}
                    className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border transition-all text-center group cursor-pointer ${
                      isLargeButtons ? 'min-h-[76px] py-4' : 'min-h-[58px]'
                    } ${
                      isSelected
                        ? isHighContrast
                          ? 'bg-slate-950 text-white border-slate-950 ring-4 ring-purple-400'
                          : 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white border-transparent shadow-lg scale-102'
                        : isHighContrast
                          ? 'bg-white text-slate-950 border-2 border-slate-900 hover:bg-slate-100'
                          : 'bg-white/80 hover:bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-xl mb-1 group-hover:scale-110 transition-transform">
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

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
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
