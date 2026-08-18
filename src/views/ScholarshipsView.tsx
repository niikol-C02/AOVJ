import React, { useState, useMemo } from 'react';
import { Scholarship } from '../types';
import { 
  Award, 
  Search, 
  Calendar, 
  Gift, 
  CheckCircle2, 
  ExternalLink, 
  Heart, 
  Sparkles, 
  Clock 
} from 'lucide-react';

interface ScholarshipsViewProps {
  scholarships: Scholarship[];
  onSelectScholarship: (scholarship: Scholarship) => void;
  onToggleSaveScholarship: (scholarshipId: string) => void;
  savedScholarships: string[];
}

export const ScholarshipsView: React.FC<ScholarshipsViewProps> = ({
  scholarships,
  onSelectScholarship,
  onToggleSaveScholarship,
  savedScholarships
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoverage, setSelectedCoverage] = useState('Todas');

  const coverages = ['Todas', '100% Total', 'Parcial 50-80%', 'Internacional'];

  const filteredScholarships = useMemo(() => {
    return scholarships.filter(sch => {
      const matchesSearch =
        sch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sch.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sch.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sch.fieldOfStudy.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCoverage =
        selectedCoverage === 'Todas' || sch.coverage.includes(selectedCoverage.replace('Todas', ''));

      return matchesSearch && matchesCoverage;
    });
  }, [scholarships, searchTerm, selectedCoverage]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Header with Frosted Glass */}
      <div className="p-6 sm:p-8 rounded-3xl sm:rounded-[32px] bg-white/65 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(180,160,220,0.1)] space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-amber-200/80 text-xs font-bold text-amber-900 shadow-xs">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Financiamiento y Oportunidades Educativas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            Becas y Ayudas Universitarias
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Encuentra becas académicas de mérito, apoyos de sostenimiento, becas de talento tecnológico e intercambios internacionales.
          </p>
        </div>

        {/* Search & Coverage Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-scholarships-input"
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre de beca, universidad o área (ej. Tech, Mérito, Internacional)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/80 bg-white/75 backdrop-blur-md text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/50 shadow-xs placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            {coverages.map(cov => (
              <button
                key={cov}
                onClick={() => setSelectedCoverage(cov)}
                className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all backdrop-blur-md ${
                  selectedCoverage === cov
                    ? 'bg-amber-600 text-white shadow-xs border border-amber-500'
                    : 'bg-white/60 text-slate-600 border border-white/80 hover:bg-white/90 shadow-xs'
                }`}
              >
                {cov}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scholarships Grid */}
      {filteredScholarships.length === 0 ? (
        <div className="p-12 text-center bg-white/70 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] border border-white/80 shadow-xs space-y-3">
          <Award className="w-12 h-12 text-amber-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No encontramos becas</h3>
          <p className="text-xs text-slate-500">Prueba con otros términos de búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredScholarships.map(sch => {
            const isSaved = savedScholarships.includes(sch.id);

            return (
              <div
                key={sch.id}
                className="p-5 sm:p-6 rounded-3xl sm:rounded-[32px] bg-white/65 backdrop-blur-xl border border-white/70 hover:border-amber-300 hover:bg-white/85 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group shadow-xs"
              >
                <div className="space-y-3">
                  {/* Top badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100/90 backdrop-blur-sm border border-purple-200/60 text-purple-800">
                      {sch.coverage}
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-amber-200/70 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-600" />
                      <span>Límite: {sch.deadlineDate}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectScholarship(sch)}
                    className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors cursor-pointer leading-snug"
                  >
                    {sch.title}
                  </h3>

                  <p className="text-xs font-semibold text-purple-700">
                    Organiza: {sch.organization}
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {sch.description}
                  </p>

                  {/* Benefits pills */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Beneficios clave:
                    </p>
                    <div className="space-y-1 text-xs text-slate-700">
                      {sch.benefits.slice(0, 2).map((b, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span className="truncate">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200/50">
                  <button
                    onClick={() => onToggleSaveScholarship(sch.id)}
                    className={`p-2 rounded-xl border transition-all shadow-xs ${
                      isSaved ? 'bg-pink-50 text-pink-600 border-pink-200 shadow-xs' : 'bg-white/80 text-slate-400 border-white/80 hover:text-pink-500 hover:border-pink-200'
                    }`}
                    title="Guardar beca"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500' : ''}`} />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={sch.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-white/80 bg-white/70 text-slate-600 hover:bg-white transition-colors shadow-xs"
                      title="Postular en sitio oficial"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => onSelectScholarship(sch)}
                      className="px-4 py-2 rounded-xl bg-amber-100/70 hover:bg-amber-200/80 text-amber-950 font-bold text-xs transition-colors border border-amber-200/50 shadow-xs"
                    >
                      Ver Requisitos
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
