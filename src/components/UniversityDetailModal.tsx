import React from 'react';
import { University, ViewType } from '../types';
import { 
  X, 
  Heart, 
  MapPin, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  DollarSign, 
  Sparkles, 
  Award,
  Star
} from 'lucide-react';

interface UniversityDetailModalProps {
  university: University | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (universityId: string) => void;
  onNavigateToCareers: (careerName?: string) => void;
}

export const UniversityDetailModal: React.FC<UniversityDetailModalProps> = ({
  university,
  onClose,
  isSaved,
  onToggleSave,
  onNavigateToCareers
}) => {
  if (!university) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="university-detail-modal"
        className="relative w-full max-w-3xl bg-white/80 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] shadow-[0_16px_48px_rgba(30,10,60,0.18)] border border-white/90 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white/60 backdrop-blur-xl border-b border-white/80 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-2xl ${university.badgeBg} text-white font-extrabold flex items-center justify-center text-sm shadow-md shrink-0 border border-white/20`}>
              {university.logoText}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-sm border ${
                  university.type === 'Pública' ? 'bg-emerald-100/90 border-emerald-200/60 text-emerald-800' : 'bg-purple-100/90 border-purple-200/60 text-purple-800'
                }`}>
                  {university.type}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-amber-200/70">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{university.rating} / 5.0</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {university.name}
              </h2>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-purple-500" />
                <span>{university.city}, {university.country}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleSave(university.id)}
              className={`p-2.5 rounded-2xl border transition-all ${
                isSaved
                  ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-500/20'
                  : 'bg-white/80 backdrop-blur-md text-slate-600 border-white/80 hover:border-pink-300 hover:text-pink-600 shadow-xs'
              }`}
              title={isSaved ? 'Quitar de favoritos' : 'Guardar universidad'}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/80 backdrop-blur-md text-slate-500 hover:text-slate-800 border border-white/80 hover:bg-white transition-colors shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* About */}
          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Sobre la Institución
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">{university.description}</p>
          </div>

          {/* Tuition & Cost Info */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 backdrop-blur-xl border border-emerald-200/70 flex items-start gap-3 shadow-xs">
            <DollarSign className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-900">Costos y Esquema de Matrícula</h4>
              <p className="text-xs text-emerald-800 mt-0.5">{university.tuitionInfo}</p>
            </div>
          </div>

          {/* Top Programs / Careers */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>Programas Académicos Destacados</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {university.topCareers.map((prog, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onClose();
                    onNavigateToCareers(prog);
                  }}
                  className="p-3 rounded-xl bg-white/70 backdrop-blur-xl border border-white/80 hover:border-purple-300 hover:bg-white/90 cursor-pointer transition-all flex items-center justify-between text-xs font-semibold text-slate-800 shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span>{prog}</span>
                  </div>
                  <span className="text-[10px] text-purple-600">Ver carrera →</span>
                </div>
              ))}
            </div>
          </div>

          {/* Admission Requirements */}
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-pink-500" />
              <span>Requisitos de Admisión & Proceso de Ingreso</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {university.admissionRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-pink-100 text-pink-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-pink-200/50">
                    ✓
                  </span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Highlights */}
          <div className="p-5 rounded-2xl bg-purple-100/40 backdrop-blur-xl border border-purple-200/60 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Instalaciones y Vida Universitaria</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {university.campusHighlights.map((hl, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-purple-100/80 flex items-start gap-2 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-xl border-t border-white/80 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleSave(university.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isSaved
                ? 'bg-pink-50 text-pink-700 border-pink-200 shadow-xs'
                : 'bg-white/80 backdrop-blur-sm text-slate-700 border-white/80 hover:bg-white shadow-xs'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500 text-pink-500' : ''}`} />
            <span>{isSaved ? 'Guardada en mis Universidades' : 'Guardar Universidad'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/80 bg-white/80 backdrop-blur-sm text-xs font-semibold text-slate-700 hover:bg-white transition-colors shadow-xs"
            >
              Cerrar
            </button>
            <a
              href={university.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-1.5 border border-white/20"
            >
              <span>Sitio Web Oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
