import React from 'react';
import { Scholarship } from '../types';
import { 
  X, 
  Heart, 
  Award, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  Gift, 
  Users, 
  BookOpen,
  Sparkles
} from 'lucide-react';

interface ScholarshipDetailModalProps {
  scholarship: Scholarship | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (scholarshipId: string) => void;
}

export const ScholarshipDetailModal: React.FC<ScholarshipDetailModalProps> = ({
  scholarship,
  onClose,
  isSaved,
  onToggleSave
}) => {
  if (!scholarship) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="scholarship-detail-modal"
        className="relative w-full max-w-3xl bg-white/80 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] shadow-[0_16px_48px_rgba(30,10,60,0.18)] border border-white/90 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white/60 backdrop-blur-xl border-b border-white/80 flex items-start justify-between gap-4">
          <div className="space-y-1.5 pr-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-600 text-white shadow-xs">
                {scholarship.coverage}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200/80 shadow-xs">
                {scholarship.organization}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {scholarship.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleSave(scholarship.id)}
              className={`p-2.5 rounded-2xl border transition-all ${
                isSaved
                  ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-500/20'
                  : 'bg-white/80 backdrop-blur-md text-slate-600 border-white/80 hover:border-pink-300 hover:text-pink-600 shadow-xs'
              }`}
              title={isSaved ? 'Quitar de guardados' : 'Guardar beca'}
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

        {/* Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Deadline Alert Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/80 backdrop-blur-xl border border-amber-200/80 flex items-center justify-between gap-3 text-amber-950 shadow-xs">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-bold">Fecha Límite de Convocatoria:</p>
                <p className="text-sm font-extrabold text-slate-900">{scholarship.deadlineDate}</p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-200/90 text-amber-950 shadow-xs">
              Convocatoria Abierta
            </span>
          </div>

          {/* Description */}
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Descripción del Programa de Ayuda
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">{scholarship.description}</p>
          </div>

          {/* Target Audience */}
          <div className="p-4 rounded-2xl bg-purple-100/50 backdrop-blur-xl border border-purple-200/60 flex items-center gap-3 shadow-xs">
            <Users className="w-5 h-5 text-purple-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-purple-900">¿A quién está dirigida?</p>
              <p className="text-xs text-purple-800">{scholarship.targetAudience}</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Gift className="w-4 h-4 text-emerald-600" />
              <span>Beneficios y Cobertura Otorgada</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {scholarship.benefits.map((ben, idx) => (
                <div key={idx} className="p-3 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-200/70 flex items-start gap-2 text-xs text-emerald-950 shadow-xs">
                  <span className="text-emerald-600 font-bold">★</span>
                  <span>{ben}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-pink-500" />
              <span>Requisitos para Postular</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {scholarship.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-pink-100 text-pink-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-pink-200/50">
                    {idx + 1}
                  </span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas of Study Included */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Áreas de Estudio Aplicables
            </h3>
            <div className="flex flex-wrap gap-2">
              {scholarship.fieldOfStudy.map((f, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 text-xs font-medium border border-white/80 shadow-xs">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-xl border-t border-white/80 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleSave(scholarship.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isSaved
                ? 'bg-pink-50 text-pink-700 border-pink-200 shadow-xs'
                : 'bg-white/80 backdrop-blur-sm text-slate-700 border-white/80 hover:bg-white shadow-xs'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500 text-pink-500' : ''}`} />
            <span>{isSaved ? 'Guardada en mis Becas' : 'Guardar Beca'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/80 bg-white/80 backdrop-blur-sm text-xs font-semibold text-slate-700 hover:bg-white transition-colors shadow-xs"
            >
              Cerrar
            </button>
            <a
              href={scholarship.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-1.5 border border-white/20"
            >
              <span>Postular en Sitio Oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
