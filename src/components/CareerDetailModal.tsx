import React from 'react';
import { Career, University, ViewType } from '../types';
import { RIASEC_DIMENSIONS, UNIVERSITIES_DATA } from '../models/data';
import { 
  X, 
  Heart, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Briefcase, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  Sparkles,
  ExternalLink,
  Zap
} from 'lucide-react';

interface CareerDetailModalProps {
  career: Career | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (careerId: string) => void;
  onCompareToggle: (careerId: string) => void;
  isCompared: boolean;
  onNavigateToView: (view: ViewType) => void;
  matchScore?: number;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  onClose,
  isSaved,
  onToggleSave,
  onCompareToggle,
  isCompared,
  onNavigateToView,
  matchScore
}) => {
  if (!career) return null;

  const primaryDim = RIASEC_DIMENSIONS[career.riasecPrimary];
  const secondaryDim = RIASEC_DIMENSIONS[career.riasecSecondary];

  // Find linked universities
  const linkedUnis: University[] = UNIVERSITIES_DATA.filter(uni => 
    career.suggestedUniversities.includes(uni.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="career-detail-modal"
        className="relative w-full max-w-3xl bg-white/80 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] shadow-[0_16px_48px_rgba(30,10,60,0.18)] border border-white/90 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-white/60 backdrop-blur-xl border-b border-white/80 flex items-start justify-between gap-4">
          <div className="space-y-1.5 pr-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-600 text-white shadow-xs">
                {career.area}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 border border-purple-100/80 shadow-xs">
                {career.degreeType}
              </span>
              {matchScore && (
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-500 text-white flex items-center gap-1 shadow-xs border border-white/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{matchScore}% Compatibilidad</span>
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {career.name}
            </h2>
          </div>

          {/* Action buttons on header */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id={`modal-fav-btn-${career.id}`}
              onClick={() => onToggleSave(career.id)}
              className={`p-2.5 rounded-2xl border transition-all ${
                isSaved
                  ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-500/20'
                  : 'bg-white/80 backdrop-blur-md text-slate-600 border-white/80 hover:border-pink-300 hover:text-pink-600 shadow-xs'
              }`}
              title={isSaved ? 'Quitar de guardados' : 'Guardar carrera'}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
            </button>
            <button
              id="close-career-detail-modal"
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/80 backdrop-blur-md text-slate-500 hover:text-slate-800 border border-white/80 hover:bg-white transition-colors shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <Clock className="w-3.5 h-3.5 text-purple-500" />
                <span>Duración</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{career.duration}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>Salario Promedio</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{career.averageSalaryRange}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                <span>Empleabilidad</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{career.employabilityRate}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Perfil RIASEC</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {primaryDim.shortName} / {secondaryDim.shortName}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>¿De qué trata esta carrera?</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">{career.fullDescription}</p>
          </div>

          {/* Necessary Skills & Competencies */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Habilidades y Aptitudes Clave</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {career.necessarySkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl bg-purple-100/70 backdrop-blur-sm text-purple-900 border border-purple-200/60 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Work Fields & Job Opportunities */}
          <div className="p-5 rounded-2xl bg-purple-100/40 backdrop-blur-xl border border-purple-200/60 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span>Campos Laborales & Dónde podrás trabajar</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {career.workFields.map((field, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-white/80 backdrop-blur-sm p-2.5 rounded-xl border border-purple-100/80 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-pink-500 mt-1.5 shrink-0" />
                  <span>{field}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Activities */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900">
              ¿Qué hace un profesional en su día a día?
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {career.dailyActivities.map((activity, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/70 backdrop-blur-xl p-3 rounded-xl border border-white/80 shadow-xs">
                  <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-bold text-[10px] flex items-center justify-center shrink-0 border border-pink-200/50">
                    {idx + 1}
                  </span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Universities Offering the Career */}
          {linkedUnis.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  <span>Universidades Destacadas que la ofrecen</span>
                </h3>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToView('universities');
                  }}
                  className="text-xs text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1 hover:underline"
                >
                  <span>Ver todas</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {linkedUnis.map(uni => (
                  <div
                    key={uni.id}
                    className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 hover:border-purple-300 hover:bg-white/90 transition-all flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/80 text-slate-700 border border-slate-200/60">
                        {uni.type}
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-1">{uni.name}</p>
                      <p className="text-[11px] text-slate-500">{uni.city}, {uni.country}</p>
                    </div>
                    <a
                      href={uni.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-purple-100/70 text-purple-700 hover:bg-purple-200/80 transition-colors border border-purple-200/50 shadow-xs"
                      title="Visitar sitio web oficial"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer actions */}
        <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-xl border-t border-white/80 flex flex-wrap items-center justify-between gap-3">
          <button
            id={`modal-toggle-compare-${career.id}`}
            onClick={() => onCompareToggle(career.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
              isCompared
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-purple-100/70 text-purple-900 border-purple-200/70 hover:bg-purple-200/80 backdrop-blur-sm'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isCompared ? 'Seleccionada en Comparador' : 'Agregar a Comparar'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/80 bg-white/80 backdrop-blur-sm text-xs font-semibold text-slate-700 hover:bg-white transition-colors shadow-xs"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onToggleSave(career.id);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-1.5 border border-white/20"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
              <span>{isSaved ? 'Guardada en Favoritos' : 'Guardar Carrera'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
