import React from 'react';
import { Career, University, ViewType } from '../types';
import { RIASEC_DIMENSIONS, UNIVERSITIES_DATA } from '../models/data';
import { getCareerUniversityOfferings, getOfficialSemesters } from '../utils/careerOfferings';
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
  Zap,
  Compass,
  MapPin,
  Laptop
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

  // Resuelve las ofertas universitarias con duración, semestres, valor y sede específicos por institución
  const universityOfferings = getCareerUniversityOfferings(career, UNIVERSITIES_DATA);
  const officialSpecs = getOfficialSemesters(career.name, career.degreeType, career.level);

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
                <span>Duración Oficial</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {officialSpecs.duration}
              </p>
              <p className="text-[11px] text-purple-700 font-semibold mt-0.5">
                {officialSpecs.semesters} semestres académicos
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>Costo del Semestre</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {universityOfferings.some(o => o.type === 'Pública') ? 'Desde $0 COP (Pública)' : (career.semesterTuition || 'Específico por universidad')}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                Ver detalle por institución en la sección inferior
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                <span>Nivel de Formación</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {career.level || career.degreeType || 'Profesional Universitario'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Modalidad: {career.modality || 'Presencial'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                <span>Empleabilidad y Salario</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{career.employabilityRate} vinculación</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{career.averageSalaryRange}</p>
            </div>
          </div>

          {/* Cities Offered & Regional Coverage */}
          <div className="p-4 rounded-2xl bg-purple-50/70 backdrop-blur-xl border border-purple-100/80 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
              <Compass className="w-4 h-4 text-purple-600" />
              <span>Ciudades y Regiones donde se ofrece esta carrera</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(universityOfferings.length > 0
                ? Array.from(new Set(universityOfferings.map(o => o.city)))
                : (career.citiesOffered && career.citiesOffered.length > 0 
                  ? career.citiesOffered 
                  : ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga'])
              ).map((city, cIdx) => (
                <span key={cIdx} className="px-2.5 py-1 rounded-lg bg-white/90 border border-purple-200/60 text-xs text-slate-700 font-medium shadow-2xs">
                  📍 {city}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              *Información sujeta al registro calificado vigente de cada institución ante el Ministerio de Educación Nacional (SNIES).
            </p>
          </div>

          {/* Description */}
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>¿De qué trata esta carrera?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {career.shortDescription}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {career.fullDescription}
            </p>
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

          {/* 🏫 Universidades que ofrecen la carrera: Semestres y Costo Específico */}
          {universityOfferings.length > 0 && (
            <div className="space-y-3.5 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-100 pb-2">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    <span>Universidades que ofrecen esta carrera: Duración y Costo Semestral</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Información oficial sobre semestres, valor de matrícula y sedes por institución.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToView('universities');
                  }}
                  className="text-xs text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1 hover:underline ml-auto"
                >
                  <span>Ver todas las IES</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {universityOfferings.map((offering) => (
                  <div
                    key={offering.universityId}
                    className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-purple-100/90 hover:border-purple-300 hover:bg-white hover:shadow-md transition-all space-y-3 shadow-xs"
                  >
                    {/* Header de la Universidad */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            offering.type === 'Pública'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          }`}>
                            {offering.type}
                          </span>
                          {offering.accreditation && (
                            <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200/60 px-1.5 py-0.5 rounded">
                              Alta Calidad
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                          🏫 {offering.universityName}
                        </h4>
                      </div>

                      {offering.websiteUrl && (
                        <a
                          href={offering.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors border border-purple-200/60 shrink-0"
                          title={`Sitio oficial de ${offering.universityName}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {/* Especificaciones Académicas */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100 text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span><strong>📚 Semestres:</strong> {offering.semestersCount}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span><strong>📍 Ciudad:</strong> {offering.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <Laptop className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                        <span><strong>💻 Modalidad:</strong> {offering.modality}</span>
                      </div>
                    </div>

                    {/* 💰 Valor del Semestre Relacionado con la Universidad Específica */}
                    <div className={`p-2.5 rounded-xl border text-xs leading-relaxed ${
                      offering.type === 'Pública'
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                        : offering.semesterTuition.includes('Consultar')
                          ? 'bg-slate-50 border-slate-200 text-slate-700'
                          : 'bg-purple-50/70 border-purple-200 text-purple-950'
                    }`}>
                      <div className="font-extrabold flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Valor por semestre:</span>
                      </div>
                      <p className="mt-0.5 font-medium">
                        {offering.semesterTuition}
                      </p>
                    </div>
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
