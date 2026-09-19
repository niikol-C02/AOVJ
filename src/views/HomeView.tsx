import React from 'react';
import { Career, TestResult, User, ViewType } from '../types';
import { DailyTipCard } from '../components/DailyTipCard';
import { 
  Sparkles, 
  Compass, 
  BookOpen, 
  Building2, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Star, 
  Heart, 
  Zap, 
  GraduationCap, 
  Clock,
  Layers
} from 'lucide-react';

interface HomeViewProps {
  currentUser: User | null;
  onNavigate: (view: ViewType) => void;
  latestTestResult: TestResult | null;
  trendingCareers: Career[];
  onSelectCareer: (career: Career) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentUser,
  onNavigate,
  latestTestResult,
  trendingCareers,
  onSelectCareer,
  onOpenAuth
}) => {
  const hasCompletedTest = !!latestTestResult;

  return (
    <div className="space-y-8 sm:space-y-12 pb-12">
      {/* Hero Welcome Banner with Frosted Glass Surface */}
      <section className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-white/65 backdrop-blur-2xl border border-white/80 p-6 sm:p-10 lg:p-12 shadow-[0_8px_32px_rgba(180,160,220,0.12)]">
        {/* Subtle decorative background circles */}
        <div className="absolute -right-12 -top-12 w-72 h-72 bg-gradient-to-br from-pink-400/25 to-purple-400/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-72 h-72 bg-gradient-to-tr from-purple-400/25 to-indigo-400/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200/80 shadow-xs text-xs font-bold text-purple-800">
            <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
            <span>Plataforma de Orientación Vocacional para Jóvenes</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif] leading-tight">
            Descubre tu vocación,{' '}
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              encuentra tu pasión
            </span>{' '}
            y diseña tu futuro.
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl font-normal">
            {currentUser ? (
              <>
                ¡Hola de nuevo, <span className="font-bold text-slate-900">{currentUser.name.split(' ')[0]}</span>! Explora tus habilidades, responde nuestro test vocacional interactivo, compara carreras y encuentra las mejores universidades y becas para ti.
              </>
            ) : (
              'Analiza tus intereses, talentos y personalidad con nuestro test científico de orientación vocacional. Te conectamos con carreras compatibles, universidades y becas.'
            )}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            {hasCompletedTest ? (
              <>
                <button
                  id="hero-view-results-btn"
                  onClick={() => onNavigate('results')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] backdrop-blur-md border border-white/30 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ver Mis Resultados Vocacionales</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="hero-retake-test-btn"
                  onClick={() => onNavigate('test')}
                  className="px-5 py-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 text-purple-900 font-bold text-sm hover:bg-white/90 hover:border-purple-300 transition-all shadow-xs"
                >
                  Rehacer Test
                </button>
              </>
            ) : (
              <>
                <button
                  id="hero-start-test-btn"
                  onClick={() => onNavigate('test')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] backdrop-blur-md border border-white/30 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Comenzar Test Vocacional Gratis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="hero-explore-careers-btn"
                  onClick={() => onNavigate('careers')}
                  className="px-5 py-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 text-slate-800 font-bold text-sm hover:bg-white/90 hover:border-purple-200 transition-all shadow-xs"
                >
                  Explorar Catálogo de Carreras
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Test Status & Quick Result Preview (if completed) */}
      {latestTestResult && (
        <section className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
                Perfil Vocacional Detectado
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {latestTestResult.profileTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {latestTestResult.profileDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('results')}
              className="px-5 py-2.5 rounded-xl bg-purple-100/80 backdrop-blur-sm hover:bg-purple-200/80 text-purple-900 text-xs font-bold transition-colors flex items-center gap-1.5 border border-purple-200/60 shadow-xs"
            >
              <span>Ver Informe Completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* 4 Feature Modules Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Tu Ruta de Orientación Vocacional
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Paso a paso para tomar la decisión académica más importante de tu vida.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Test */}
          <div
            id="home-module-test"
            onClick={() => onNavigate('test')}
            className="p-6 rounded-3xl bg-white/65 backdrop-blur-xl border border-white/70 hover:border-pink-300 hover:bg-white/85 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xs"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-100/90 backdrop-blur-sm border border-pink-200/60 text-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600">Paso 1</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                  Test Vocacional
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Responde preguntas sobre tus intereses, talentos y personalidad para identificar tus áreas afines.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-pink-600">
              <span>{hasCompletedTest ? 'Rehacer evaluación' : 'Iniciar test'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Careers */}
          <div
            id="home-module-careers"
            onClick={() => onNavigate('careers')}
            className="p-6 rounded-3xl bg-white/65 backdrop-blur-xl border border-white/70 hover:border-purple-300 hover:bg-white/85 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xs"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100/90 backdrop-blur-sm border border-purple-200/60 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Paso 2</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Catálogo de Carreras
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explora planes de estudio, duración, campo laboral, salarios y competencias requeridas.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-purple-600">
              <span>Explorar carreras</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Universities */}
          <div
            id="home-module-universities"
            onClick={() => onNavigate('universities')}
            className="p-6 rounded-3xl bg-white/65 backdrop-blur-xl border border-white/70 hover:border-indigo-300 hover:bg-white/85 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xs"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100/90 backdrop-blur-sm border border-indigo-200/60 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Paso 3</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Universidades
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Compara instituciones públicas y privadas, requisitos de admisión, costos y campus.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-indigo-600">
              <span>Ver instituciones</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Scholarships */}
          <div
            id="home-module-scholarships"
            onClick={() => onNavigate('scholarships')}
            className="p-6 rounded-3xl bg-white/65 backdrop-blur-xl border border-white/70 hover:border-amber-300 hover:bg-white/85 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xs"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/90 backdrop-blur-sm border border-amber-200/60 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Paso 4</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Becas y Apoyos
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conoce convocatorias activas de financiamiento, becas de excelencia y requisitos para postular.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-amber-700">
              <span>Buscar becas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Trending Careers */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-pink-500" />
              <span>Carreras con Mayor Demanda y Proyección</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Opciones de alto crecimiento y excelente proyección salarial.
            </p>
          </div>
          <button
            onClick={() => onNavigate('careers')}
            className="text-xs sm:text-sm font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 hover:underline"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {trendingCareers.slice(0, 3).map(career => {
            const matchObj = latestTestResult?.recommendedCareers?.find(rc => rc.careerId === career.id);
            return (
              <div
                key={career.id}
                onClick={() => onSelectCareer(career)}
                className="p-5 rounded-3xl bg-white/65 backdrop-blur-xl border border-white/70 hover:border-purple-300 hover:bg-white/85 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 group shadow-xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100/90 backdrop-blur-sm border border-purple-200/60 text-purple-800">
                      {career.area}
                    </span>
                    {matchObj ? (
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100/90 backdrop-blur-sm border border-emerald-200/60 text-emerald-800 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{matchObj.matchPercentage}% match</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50/90 backdrop-blur-sm text-amber-700 border border-amber-200">
                        Alta demanda
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                    {career.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {career.shortDescription}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-200/50">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      {career.duration.split(' ')[0]} {career.duration.split(' ')[1]}
                    </span>
                    <span className="font-semibold text-emerald-600">
                      {career.employabilityRate} empleabilidad
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">
                      {career.averageSalaryRange}
                    </span>
                    <span className="text-xs font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Ver ficha →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dynamic Rotating Student Advice Card (Changes Daily) */}
      <DailyTipCard onNavigateTest={() => onNavigate('test')} />
    </div>
  );
};
