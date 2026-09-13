import React from 'react';
import { Career, TestResult, ViewType } from '../types';
import { RIASEC_DIMENSIONS } from '../models/data';
import { getOfficialSemesters } from '../utils/careerOfferings';
import { 
  X, 
  Layers, 
  Sparkles, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Plus, 
  Trash2,
  BookOpen
} from 'lucide-react';

interface CareerCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCareers: Career[];
  allCareers: Career[];
  onAddCareer: (careerId: string) => void;
  onRemoveCareer: (careerId: string) => void;
  onSelectCareerDetail: (career: Career) => void;
  latestTestResult: TestResult | null;
}

export const CareerCompareModal: React.FC<CareerCompareModalProps> = ({
  isOpen,
  onClose,
  selectedCareers,
  allCareers,
  onAddCareer,
  onRemoveCareer,
  onSelectCareerDetail,
  latestTestResult
}) => {
  if (!isOpen) return null;

  const availableToAdd = allCareers.filter(
    c => !selectedCareers.some(sc => sc.id === c.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="career-compare-modal"
        className="relative w-full max-w-5xl bg-white/80 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] shadow-[0_16px_48px_rgba(30,10,60,0.18)] border border-white/90 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white/60 backdrop-blur-xl border-b border-white/80 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-lg bg-purple-600 text-white shadow-xs">
                <Layers className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                Herramienta de Decisión
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Comparador de Carreras Profesionales
            </h2>
            <p className="text-xs text-slate-600">
              Analiza las diferencias clave de duración, salario, empleabilidad y compatibilidad para tomar la mejor decisión.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white/80 backdrop-blur-md text-slate-500 hover:text-slate-800 border border-white/80 hover:bg-white transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Top selector if less than 3 careers */}
          {selectedCareers.length < 3 && availableToAdd.length > 0 && (
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-dashed border-purple-300 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-600" />
                <span>Agregar otra carrera a la comparación ({selectedCareers.length}/3 seleccionadas):</span>
              </span>
              <select
                id="add-career-compare-select"
                onChange={e => {
                  if (e.target.value) {
                    onAddCareer(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="px-3.5 py-1.5 rounded-xl border border-white/80 bg-white/80 backdrop-blur-sm text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-purple-400 shadow-xs"
              >
                <option value="" disabled>Selecciona una carrera...</option>
                {availableToAdd.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.area})
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedCareers.length === 0 ? (
            <div className="p-12 text-center bg-white/70 backdrop-blur-xl rounded-3xl border border-white/80 space-y-3 shadow-xs">
              <Layers className="w-12 h-12 text-purple-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No has seleccionado ninguna carrera para comparar</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Dirígete a la sección de Carreras o usa el selector superior para añadir hasta 3 opciones y ver su comparativa detallada.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto pb-4">
              <div className={`grid gap-4 min-w-[600px] ${
                selectedCareers.length === 1 ? 'grid-cols-1 max-w-lg mx-auto' : 
                selectedCareers.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
              }`}>
                {selectedCareers.map(career => {
                  const primaryDim = RIASEC_DIMENSIONS[career.riasecPrimary];
                  const secondaryDim = RIASEC_DIMENSIONS[career.riasecSecondary];
                  const matchObj = latestTestResult?.recommendedCareers.find(rc => rc.careerId === career.id);

                  return (
                    <div
                      key={career.id}
                      className="p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex flex-col justify-between space-y-5"
                    >
                      {/* Career Card Header */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-100/80 backdrop-blur-sm text-purple-900 border border-purple-200/60">
                            {career.area}
                          </span>
                          <button
                            onClick={() => onRemoveCareer(career.id)}
                            className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                            title="Quitar del comparador"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                          {career.name}
                        </h3>

                        {matchObj && (
                          <div className="p-2.5 rounded-xl bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/60 flex items-center justify-between text-xs shadow-xs">
                            <span className="text-emerald-900 font-semibold flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                              Tu Compatibilidad
                            </span>
                            <span className="font-extrabold text-emerald-600 text-sm">
                              {matchObj.matchPercentage}%
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Attribute rows */}
                      <div className="space-y-3.5 text-xs text-slate-700 border-t border-b border-purple-100/60 py-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-purple-500" />
                            Duración & Semestres
                          </p>
                          {(() => {
                            const sem = getOfficialSemesters(career.name, career.degreeType, career.level);
                            return (
                              <p className="font-bold text-slate-900">
                                📚 {sem.semesters} semestres ({sem.duration})
                              </p>
                            );
                          })()}
                          <p className="text-slate-600 text-[11px]">{career.level || career.degreeType}</p>
                        </div>

                        {career.semesterTuition && (
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <DollarSign className="w-3 h-3 text-purple-500" />
                              Costo Matrícula Semestral
                            </p>
                            <p className="font-semibold text-slate-900 text-xs">{career.semesterTuition}</p>
                          </div>
                        )}

                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-emerald-500" />
                            Salario Promedio
                          </p>
                          <p className="font-bold text-emerald-700">{career.averageSalaryRange}</p>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-indigo-500" />
                            Tasa de Empleabilidad
                          </p>
                          <p className="font-bold text-indigo-700">{career.employabilityRate}</p>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-500" />
                            Orientación RIASEC
                          </p>
                          <p className="font-semibold text-slate-800">
                            {primaryDim.shortName} / {secondaryDim.shortName}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Habilidades Principales
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {career.necessarySkills.slice(0, 3).map((sk, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/80 backdrop-blur-sm text-slate-700 text-[10px] font-medium border border-white/80">
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <button
                        onClick={() => {
                          onClose();
                          onSelectCareerDetail(career);
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-purple-100/70 hover:bg-purple-200/80 text-purple-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-purple-200/50 shadow-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                        <span>Ver Ficha Completa</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-white/60 backdrop-blur-xl border-t border-white/80 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">
            {selectedCareers.length} de 3 carreras seleccionadas
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-colors border border-white/20"
          >
            Cerrar Comparador
          </button>
        </div>
      </div>
    </div>
  );
};
