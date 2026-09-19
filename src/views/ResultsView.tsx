import React, { useState } from 'react';
import { Career, TestResult, User, ViewType } from '../types';
import { RIASEC_DIMENSIONS, CAREERS_DATA, UNIVERSITIES_DATA, SCHOLARSHIPS_DATA } from '../models/data';
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
  TrendingUp,
  Brain,
  HelpCircle,
  Building2,
  ExternalLink,
  ShieldCheck
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
  const [activeSection, setActiveSection] = useState<'all' | 'profile' | 'interests' | 'skills' | 'careers' | 'why' | 'explore'>('all');

  if (!testResult) {
    return (
      <div className="max-w-xl mx-auto text-center p-12 bg-white/70 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] border border-white/80 shadow-[0_8px_32px_rgba(180,160,220,0.12)] space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-pink-100/90 backdrop-blur-sm border border-pink-200/60 text-pink-600 flex items-center justify-center mx-auto shadow-xs">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            Aún no has realizado un Test Vocacional
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Para ver tu análisis vocacional personalizado, tus áreas de interés y recomendaciones no limitantes, completa uno de nuestros tests interactivos.
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
  const matchedCareerObjects = (testResult.recommendedCareers || [])
    .map(rc => {
      const career = CAREERS_DATA.find(c => c.id === rc.careerId);
      return career ? { ...career, matchPercentage: rc.matchPercentage, explanation: rc.explanation } : null;
    })
    .filter(Boolean) as (Career & { matchPercentage: number; explanation?: string })[];

  const handlePrintCertificate = () => {
    window.print();
    onShowToast('Generando reporte vocacional', 'Se ha abierto la vista de impresión / PDF.', 'info');
  };

  const primaryType = (testResult.dominantTypes && testResult.dominantTypes[0]) || 'I';
  const secondaryType = (testResult.dominantTypes && testResult.dominantTypes[1]) || 'A';
  const primaryDim = RIASEC_DIMENSIONS[primaryType] || RIASEC_DIMENSIONS.I;
  const secondaryDim = RIASEC_DIMENSIONS[secondaryType] || RIASEC_DIMENSIONS.A;

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
              <span>Exploración Vocacional Personalizada</span>
            </div>
            <span className="text-xs text-purple-200">
              Fecha: {new Date(testResult.date).toLocaleDateString('es-ES', { dateStyle: 'medium' })}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Tu perfil vocacional identificado:
            </p>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white leading-tight">
              {testResult.profileTitle}
            </h1>
            <p className="text-xs sm:text-base text-purple-100/90 max-w-3xl leading-relaxed">
              Tus respuestas muestran una destacada afinidad con perfiles orientados a la exploración, la creatividad y la resolución de problemas. Recuerda que este resultado es una brújula para explorar opciones con libertad, sin delimitar tu potencial.
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
              <span>Hacer otro test adaptado</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Jump Bar between the 6 Organized Sections */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveSection('all')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeSection === 'all' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          Ver reporte completo
        </button>
        <button
          onClick={() => setActiveSection('profile')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeSection === 'profile' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          ✨ Tu perfil
        </button>
        <button
          onClick={() => setActiveSection('interests')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeSection === 'interests' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          ❤️ Tus intereses
        </button>
        <button
          onClick={() => setActiveSection('skills')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeSection === 'skills' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          🧠 Tus habilidades
        </button>
        <button
          onClick={() => setActiveSection('careers')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeSection === 'careers' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          🎯 Áreas relacionadas
        </button>
        <button
          onClick={() => setActiveSection('why')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeSection === 'why' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          💡 ¿Por qué aparecen?
        </button>
        <button
          onClick={() => setActiveSection('explore')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            activeSection === 'explore' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          🔎 Explora más
        </button>
      </div>

      {/* ============================================================ */}
      {/* 1. SECCIÓN: ✨ TU PERFIL                                      */}
      {/* ============================================================ */}
      {(activeSection === 'all' || activeSection === 'profile') && (
        <section id="section-tu-perfil" className="p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                ✨ Tu perfil: Resumen general de características
              </h2>
              <p className="text-xs text-slate-600">
                Una síntesis de tu forma de abordar problemas, tus motivaciones y tu estilo de trabajo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
              <span className="text-[11px] font-bold uppercase text-purple-700 tracking-wider">
                Dimensión Principal: {primaryDim.name} ({testResult.scores[primaryType]}%)
              </span>
              <p className="text-xs text-purple-950 leading-relaxed">
                {primaryDim.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
              <span className="text-[11px] font-bold uppercase text-indigo-700 tracking-wider">
                Dimensión Complementaria: {secondaryDim.name} ({testResult.scores[secondaryType]}%)
              </span>
              <p className="text-xs text-indigo-950 leading-relaxed">
                {secondaryDim.description}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong>Perspectiva respetuosa:</strong> Estas características reflejan tus preferencias actuales. Puedes desarrollar nuevas habilidades en cualquier momento de tu vida académica o profesional según tus metas e intereses.
            </p>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 2. SECCIÓN: ❤️ TUS INTERESES                                  */}
      {/* ============================================================ */}
      {(activeSection === 'all' || activeSection === 'interests') && (
        <section id="section-tus-intereses" className="p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                ❤️ Tus intereses: Principales áreas que te motivan
              </h2>
              <p className="text-xs text-slate-600">
                Temas, actividades y situaciones que despiertan tu curiosidad y entusiasmo genuino.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {(testResult.dominantTypes || []).map((type, idx) => {
              const dim = RIASEC_DIMENSIONS[type] || RIASEC_DIMENSIONS.I;
              const score = testResult.scores ? testResult.scores[type] || 0 : 0;
              const skillsList = dim.skills || [];
              return (
                <div key={type} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-pink-600">
                      {idx === 0 ? 'Interés Principal' : 'Interés Secundario'}
                    </span>
                    <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                      {score}% afinidad
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{dim.name}</h3>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {skillsList.slice(0, 3).map((ch, cIdx) => (
                      <span key={cIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-pink-50 text-pink-800 border border-pink-100">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 3. SECCIÓN: 🧠 TUS HABILIDADES                                */}
      {/* ============================================================ */}
      {(activeSection === 'all' || activeSection === 'skills') && (
        <section id="section-tus-habilidades" className="p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                🧠 Tus habilidades: Aptitudes y destrezas para fortalecer
              </h2>
              <p className="text-xs text-slate-600">
                Capacidades prácticas, analíticas y de comunicación que demuestras facilidad para aplicar.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {(testResult.topStrengths || []).map((str, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3 text-xs text-slate-800 shadow-2xs"
              >
                <span className="w-6 h-6 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <span className="font-bold text-slate-900 block">{str}</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Aptitud clave que puedes potenciar mediante proyectos, estudios técnicos o universitarios.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. SECCIÓN: 🎯 ÁREAS RELACIONADAS                            */}
      {/* ============================================================ */}
      {(activeSection === 'all' || activeSection === 'careers') && (
        <section id="section-areas-relacionadas" className="p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  🎯 Áreas relacionadas: Carreras y opciones formativas
                </h2>
                <p className="text-xs text-slate-600">
                  Podrías explorar estas disciplinas académicas y profesionales que guardan alta afinidad con tus respuestas.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-2">
            {(matchedCareerObjects || []).slice(0, 6).map(career => {
              const isSaved = savedCareers.includes(career.id);
              return (
                <div
                  key={career.id}
                  className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 shadow-2xs group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        {career.area}
                      </span>
                      <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{career.matchPercentage}% match</span>
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                      {career.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {career.shortDescription}
                    </p>

                    <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-[11px] text-purple-950 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">📚 {career.semestersCount ? `${career.semestersCount} semestres` : career.duration}</span>
                        <span className="text-emerald-700 font-bold">{career.employabilityRate}</span>
                      </div>
                      {career.semesterTuition && (
                        <p className="text-[10px] text-slate-600 truncate" title={career.semesterTuition}>
                          💰 {career.semesterTuition.split('(')[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onToggleSaveCareer(career.id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isSaved ? 'bg-pink-50 text-pink-600 border-pink-200' : 'bg-white text-slate-400 border-slate-200 hover:text-pink-500'
                      }`}
                      title="Guardar en favoritos"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => onSelectCareer(career)}
                      className="flex-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors text-center shadow-xs"
                    >
                      Ver carrera completa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. SECCIÓN: 💡 ¿POR QUÉ APARECEN?                           */}
      {/* ============================================================ */}
      {(activeSection === 'all' || activeSection === 'why') && (
        <section id="section-por-que-aparecen" className="p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                💡 ¿Por qué aparecen estas opciones?
              </h2>
              <p className="text-xs text-slate-600">
                Transparencia total sobre los criterios que fundamentan las recomendaciones.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <h3 className="font-bold text-amber-950 text-sm">
                1. Conexión directa con tus respuestas
              </h3>
              <p>
                Tus valoraciones altas ante situaciones que requieren razonamiento, investigación, análisis o trabajo creativo señalaron afinidad con los arquetipos <strong>{primaryDim.name}</strong> y <strong>{secondaryDim.name}</strong>. Las carreras seleccionadas emplean diariamente estas actividades.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">
                2. Exploración abierta y sin determinismo
              </h3>
              <p>
                Ningún test puede dictar de manera definitiva lo que debes estudiar. Estas áreas se presentan como puntos de partida sugeridos ("Podrías explorar...", "También puedes considerar...") para que investigues planes de estudio, hables con profesionales y tomes una decisión consciente e informada.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. SECCIÓN: 🔎 EXPLORA MÁS                                   */}
      {/* ============================================================ */}
      {(activeSection === 'all' || activeSection === 'explore') && (
        <section id="section-explora-mas" className="p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                🔎 Explora más: Conexión con el catálogo de oportunidades
              </h2>
              <p className="text-xs text-slate-600">
                Continúa tu proceso de orientación explorando programas académicos, instituciones y convocatorias de apoyo financiero.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div 
              onClick={() => onNavigateToView('careers')}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-purple-600 transition-colors">
                Catálogo de Carreras ({CAREERS_DATA.length})
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filtra por semestres, costos, áreas de conocimiento y modalidades de estudio.
              </p>
              <span className="text-xs font-bold text-purple-600 inline-flex items-center gap-1 pt-1">
                Explorar carreras <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div 
              onClick={() => onNavigateToView('universities')}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                Universidades ({UNIVERSITIES_DATA.length})
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conoce campus, acreditaciones de alta calidad y oferta académica por ciudades.
              </p>
              <span className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 pt-1">
                Ver universidades <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div 
              onClick={() => onNavigateToView('scholarships')}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                Becas y Financiación ({SCHOLARSHIPS_DATA.length})
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Opciones de apoyo económico, requisitos y fechas de postulación para tu formación.
              </p>
              <span className="text-xs font-bold text-amber-600 inline-flex items-center gap-1 pt-1">
                Consultar becas <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
