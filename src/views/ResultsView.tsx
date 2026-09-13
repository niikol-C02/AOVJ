import React, { useState } from 'react';
import { Career, TestResult, User, ViewType } from '../types';
import { RIASEC_DIMENSIONS, CAREERS_DATA } from '../models/data';
import { 
  Sparkles, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Heart, 
  Layers, 
  Download, 
  RotateCcw, 
  BookOpen, 
  Compass, 
  Star, 
  Award, 
  Share2, 
  GraduationCap, 
  Clock, 
  DollarSign, 
  TrendingUp 
} from 'lucide-react';

interface ResultsViewProps {
  testResult: TestResult | null;
  currentUser: User | null;
  onRetakeTest: () => void;
  onSelectCareer: (career: Career) => void;
  onToggleSaveCareer: (careerId: string) => void;
  savedCareers: string[];
  onNavigateToView: (view: ViewType) => void;
  onCompareToggle: (careerId: string) => void;
  comparedCareers: string[];
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  testResult,
  currentUser,
  onRetakeTest,
  onSelectCareer,
  onToggleSaveCareer,
  savedCareers,
  onNavigateToView,
  onCompareToggle,
  comparedCareers,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'careers' | 'dimensions'>('overview');

  if (!testResult) {
    return (
      <div className="max-w-xl mx-auto text-center p-12 bg-white/70 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] border border-white/80 shadow-[0_8px_32px_rgba(180,160,220,0.12)] space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-pink-100/90 backdrop-blur-sm border border-pink-200/60 text-pink-600 flex items-center justify-center mx-auto shadow-xs">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            Aún no has realizado el Test Vocacional
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Para ver tu análisis vocacional personalizado, tus fortalezas y las carreras recomendadas, completa primero el test vocacional interactivo.
          </p>
        </div>
        <button
          onClick={onRetakeTest}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:shadow-lg backdrop-blur-md border border-white/30 transition-all inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Comenzar Mi Test Vocacional</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Find matched careers data
  const matchedCareerObjects = testResult.recommendedCareers
    .map(rc => {
      const career = CAREERS_DATA.find(c => c.id === rc.careerId);
      return career ? { ...career, matchPercentage: rc.matchPercentage, explanation: rc.explanation } : null;
    })
    .filter(Boolean) as (Career & { matchPercentage: number; explanation?: string })[];

  const handlePrintCertificate = () => {
    window.print();
    onShowToast('Generando reporte vocacional', 'Se ha abierto la vista de impresión / PDF.', 'info');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Banner with Personality Profile */}
      <section className="p-6 sm:p-10 rounded-3xl sm:rounded-[36px] bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-slate-950/90 backdrop-blur-2xl text-white border border-white/20 shadow-xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-pink-300">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Diagnóstico Vocacional RIASEC</span>
            </div>
            <span className="text-xs text-purple-200">
              Fecha: {new Date(testResult.date).toLocaleDateString('es-ES', { dateStyle: 'medium' })}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Tu Arquetipo Profesional Dominante:
            </p>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white leading-tight">
              {testResult.profileTitle}
            </h1>
            <p className="text-xs sm:text-base text-purple-100/90 max-w-3xl leading-relaxed">
              {testResult.profileDescription}
            </p>
          </div>

          {/* Action buttons on banner */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={handlePrintCertificate}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center gap-2 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4 text-pink-300" />
              <span>Guardar / Imprimir Informe (PDF)</span>
            </button>
            <button
              onClick={onRetakeTest}
              className="px-4 py-2.5 rounded-xl bg-purple-700/60 hover:bg-purple-700/80 text-white text-xs font-semibold backdrop-blur-md border border-purple-400/40 flex items-center gap-2 transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Hacer Otro Test (Nuevas Preguntas)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 shadow-xs max-w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-purple-600 hover:bg-white/60'
          }`}
        >
          Resumen & Fortalezas
        </button>
        <button
          onClick={() => setActiveTab('careers')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'careers'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-purple-600 hover:bg-white/60'
          }`}
        >
          Carreras Recomendadas ({matchedCareerObjects.length})
        </button>
        <button
          onClick={() => setActiveTab('dimensions')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'dimensions'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-purple-600 hover:bg-white/60'
          }`}
        >
          Desglose RIASEC
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 3 Dominant Personality Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testResult.dominantTypes.map((type, idx) => {
              const dim = RIASEC_DIMENSIONS[type];
              const score = testResult.scores[type];
              return (
                <div
                  key={type}
                  className="p-5 rounded-3xl bg-white/65 backdrop-blur-xl border border-white/70 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100/90 backdrop-blur-sm border border-purple-200/60 text-purple-800">
                        {idx === 0 ? '★ Dimensión Principal' : `★ Dimensión ${idx + 1}`}
                      </span>
                      <span className="text-sm font-extrabold text-purple-700">{score}%</span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">{dim.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{dim.description}</p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Habilidades Asociadas:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {dim.skills.slice(0, 3).map((sk, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded-lg bg-purple-50/80 border border-purple-100 text-purple-800 text-[10px] font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Strengths & Abilities */}
          <div className="p-6 rounded-3xl sm:rounded-[32px] bg-white/65 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Tus Habilidades y Talentos Más Fuertes</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {testResult.topStrengths.map((str, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-purple-50/60 backdrop-blur-sm border border-purple-100/80 flex items-start gap-3 text-xs text-slate-800 shadow-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-semibold leading-relaxed">{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Preview of Top 3 Careers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                <span>Tus Carreras de Mayor Compatibilidad</span>
              </h3>
              <button
                onClick={() => setActiveTab('careers')}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 hover:underline"
              >
                Ver todas las recomendaciones →
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {matchedCareerObjects.slice(0, 3).map(career => {
                const isSaved = savedCareers.includes(career.id);
                return (
                  <div
                    key={career.id}
                    className="p-5 rounded-3xl bg-white/65 backdrop-blur-xl border border-white/70 hover:border-purple-300 hover:bg-white/85 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group shadow-xs"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100/90 backdrop-blur-sm border border-purple-200/60 text-purple-800">
                          {career.area}
                        </span>
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100/90 backdrop-blur-sm border border-emerald-200/60 text-emerald-800 flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>{career.matchPercentage}% match</span>
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                        {career.name}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {career.shortDescription}
                      </p>

                      {career.explanation && (
                        <div className="p-2.5 rounded-2xl bg-purple-50/80 border border-purple-200/60 text-[11px] text-purple-950 leading-relaxed flex items-start gap-2 shadow-2xs">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-purple-800">¿Por qué es para ti? </span>
                            <span>{career.explanation}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-200/50">
                      <div className="space-y-1 text-xs text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-purple-900">
                            {career.semestersCount ? `${career.semestersCount} semestres` : career.duration}
                          </span>
                          <span className="text-emerald-600 font-bold">{career.employabilityRate} empleo</span>
                        </div>
                        {career.semesterTuition && (
                          <p className="text-[10px] text-slate-500 truncate" title={career.semesterTuition}>
                            💰 {career.semesterTuition.split('(')[0]}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => onToggleSaveCareer(career.id)}
                          className={`p-2 rounded-xl border transition-colors shadow-xs ${
                            isSaved ? 'bg-pink-50 text-pink-600 border-pink-200' : 'bg-white/80 text-slate-400 border-white/80 hover:text-pink-500'
                          }`}
                          title="Guardar en favoritos"
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500' : ''}`} />
                        </button>
                        <button
                          onClick={() => onSelectCareer(career)}
                          className="flex-1 py-2 px-3 rounded-xl bg-purple-100/70 hover:bg-purple-200/80 text-purple-900 font-bold text-xs transition-colors text-center border border-purple-200/50 shadow-xs"
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FULL CAREERS LIST */}
      {activeTab === 'careers' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 text-xs text-slate-600 flex items-center justify-between shadow-xs">
            <span>Listado ordenado por porcentaje de compatibilidad con tu test vocacional.</span>
            <button
              onClick={() => onNavigateToView('compare')}
              className="text-purple-600 hover:text-purple-800 font-bold flex items-center gap-1 hover:underline"
            >
              <Layers className="w-4 h-4" />
              <span>Abrir Comparador</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {matchedCareerObjects.map(career => {
              const isSaved = savedCareers.includes(career.id);
              const isCompared = comparedCareers.includes(career.id);

              return (
                <div
                  key={career.id}
                  className="p-5 rounded-3xl bg-white/65 backdrop-blur-xl border border-white/70 hover:border-purple-300 hover:bg-white/85 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100/90 backdrop-blur-sm border border-purple-200/60 text-purple-800">
                        {career.area}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100/90 backdrop-blur-sm border border-emerald-200/60 text-emerald-800 flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>{career.matchPercentage}% Compatible</span>
                        </span>
                      </div>
                    </div>

                    <h4 
                      onClick={() => onSelectCareer(career)}
                      className="text-base font-extrabold text-slate-900 hover:text-purple-600 transition-colors cursor-pointer"
                    >
                      {career.name}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {career.shortDescription}
                    </p>

                    {career.explanation && (
                      <div className="p-2.5 rounded-2xl bg-purple-50/80 border border-purple-200/60 text-[11px] text-purple-950 leading-relaxed flex items-start gap-2 shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-purple-800">¿Por qué es para ti? </span>
                          <span>{career.explanation}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 pt-1">
                      {career.necessarySkills.slice(0, 3).map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white/80 border border-slate-200/50 text-slate-600 text-[10px]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-200/50">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>{career.duration}</span>
                      <span className="font-semibold text-emerald-700">{career.averageSalaryRange}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => onCompareToggle(career.id)}
                        className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs ${
                          isCompared ? 'bg-purple-600 text-white border-purple-600' : 'bg-white/80 text-slate-600 border-white/80 hover:bg-white'
                        }`}
                        title="Comparar"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isCompared ? 'Comparando' : 'Comparar'}</span>
                      </button>

                      <button
                        onClick={() => onToggleSaveCareer(career.id)}
                        className={`p-2 rounded-xl border transition-colors shadow-xs ${
                          isSaved ? 'bg-pink-50 text-pink-600 border-pink-200' : 'bg-white/80 text-slate-400 border-white/80 hover:text-pink-500'
                        }`}
                        title="Guardar"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500' : ''}`} />
                      </button>

                      <button
                        onClick={() => onSelectCareer(career)}
                        className="flex-1 py-2 px-3 rounded-xl bg-purple-100/70 hover:bg-purple-200/80 text-purple-900 font-bold text-xs transition-colors text-center border border-purple-200/50 shadow-xs"
                      >
                        Ver Ficha Completa
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: RIASEC DIMENSIONS DETAILED BREAKDOWN */}
      {activeTab === 'dimensions' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl sm:rounded-[32px] bg-white/65 backdrop-blur-xl border border-white/80 shadow-xs space-y-6">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span>Porcentajes por Dimensión Vocacional (Modelo de Holland)</span>
            </h3>

            {/* Visual Bars for all 6 dimensions */}
            <div className="space-y-4">
              {(Object.keys(RIASEC_DIMENSIONS) as (keyof typeof RIASEC_DIMENSIONS)[]).map(code => {
                const dim = RIASEC_DIMENSIONS[code];
                const score = testResult.scores[code] || 0;
                return (
                  <div key={code} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-800 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-purple-100/90 border border-purple-200/60 text-purple-800 flex items-center justify-center font-extrabold text-[10px] shadow-xs">
                          {code}
                        </span>
                        <span>{dim.name}</span>
                      </span>
                      <span className="text-purple-700">{score}%</span>
                    </div>

                    <div className="w-full h-3 bg-white/70 backdrop-blur-sm rounded-full overflow-hidden border border-white/80 p-0.5 shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full transition-all duration-500 shadow-xs"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">{dim.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
