import React, { useState, useMemo } from 'react';
import { Career, TestResult, ViewType } from '../types';
import { getOfficialSemesters } from '../utils/careerOfferings';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  Heart, 
  Layers, 
  Clock, 
  DollarSign, 
  GraduationCap,
  Compass,
  ArrowUpDown,
  ChevronDown
} from 'lucide-react';

interface CareersViewProps {
  careers: Career[];
  onSelectCareer: (career: Career) => void;
  onToggleSaveCareer: (careerId: string) => void;
  savedCareers: string[];
  onCompareToggle: (careerId: string) => void;
  comparedCareers: string[];
  latestTestResult: TestResult | null;
  onNavigateToView: (view: ViewType) => void;
}

export const CareersView: React.FC<CareersViewProps> = ({
  careers,
  onSelectCareer,
  onToggleSaveCareer,
  savedCareers,
  onCompareToggle,
  comparedCareers,
  latestTestResult,
  onNavigateToView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('Todas');
  const [sortBy, setSortBy] = useState<'match' | 'name' | 'employability'>('match');
  const [visibleCount, setVisibleCount] = useState(24);

  // Extract unique areas
  const areas = useMemo(() => {
    const set = new Set(careers.map(c => c.area));
    return ['Todas', ...Array.from(set).sort()];
  }, [careers]);

  // Filter and sort careers
  const filteredCareers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return careers
      .filter(career => {
        const matchesSearch = !term ||
          career.name.toLowerCase().includes(term) ||
          career.shortDescription.toLowerCase().includes(term) ||
          (career.fullDescription && career.fullDescription.toLowerCase().includes(term)) ||
          career.area.toLowerCase().includes(term) ||
          (career.degreeType && career.degreeType.toLowerCase().includes(term)) ||
          (career.level && career.level.toLowerCase().includes(term)) ||
          career.necessarySkills.some(s => s.toLowerCase().includes(term)) ||
          career.workFields.some(w => w.toLowerCase().includes(term)) ||
          (career.citiesOffered && career.citiesOffered.some(c => c.toLowerCase().includes(term)));

        const matchesArea = selectedArea === 'Todas' || career.area === selectedArea;

        return matchesSearch && matchesArea;
      })
      .sort((a, b) => {
        if (sortBy === 'match') {
          const matchA = latestTestResult?.recommendedCareers.find(rc => rc.careerId === a.id)?.matchPercentage || 50;
          const matchB = latestTestResult?.recommendedCareers.find(rc => rc.careerId === b.id)?.matchPercentage || 50;
          return matchB - matchA;
        }
        if (sortBy === 'employability') {
          return parseInt(b.employabilityRate) - parseInt(a.employabilityRate);
        }
        return a.name.localeCompare(b.name);
      });
  }, [careers, searchTerm, selectedArea, sortBy, latestTestResult]);

  // Reset pagination on search change
  React.useEffect(() => {
    setVisibleCount(24);
  }, [searchTerm, selectedArea, sortBy]);

  const visibleCareers = useMemo(() => {
    return filteredCareers.slice(0, visibleCount);
  }, [filteredCareers, visibleCount]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Header with Frosted Glass */}
      <div className="p-6 sm:p-8 rounded-3xl sm:rounded-[32px] bg-white/65 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(180,160,220,0.1)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-purple-200/80 text-xs font-bold text-purple-800 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-purple-600" />
              <span>Catálogo Académico Oficial ({careers.length} carreras)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Explorador de Carreras Universitarias
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Descubre semestres, costos aproximados, ciudades de oferta, nivel de formación, empleabilidad y habilidades para cada profesión en Colombia.
            </p>
          </div>

          {comparedCareers.length > 0 && (
            <button
              onClick={() => onNavigateToView('compare')}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all animate-in zoom-in-95 backdrop-blur-md border border-white/20"
            >
              <Layers className="w-4 h-4" />
              <span>Ver Comparativa ({comparedCareers.length})</span>
            </button>
          )}
        </div>

        {/* Search Bar & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Search text field */}
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-careers-input"
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por carrera, ciudad o habilidad (ej. Criminología, Criminalística, Medicina, Bogotá)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/80 bg-white/75 backdrop-blur-md text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 shadow-xs placeholder-slate-400"
            />
          </div>

          {/* Sort order select */}
          <div className="relative">
            <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              id="sort-careers-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/80 bg-white/75 backdrop-blur-md text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 shadow-xs"
            >
              <option value="match">Mayor Compatibilidad con Test</option>
              <option value="employability">Mayor Empleabilidad</option>
              <option value="name">Alfabético (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Area Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {areas.map(area => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all backdrop-blur-md ${
                selectedArea === area
                  ? 'bg-purple-600 text-white shadow-xs border border-purple-500'
                  : 'bg-white/60 hover:bg-white/90 text-slate-600 border border-white/80 shadow-xs'
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        {/* Results Counter indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/50">
          <span>Mostrando <strong>{visibleCareers.length}</strong> de <strong>{filteredCareers.length}</strong> programas encontrados</span>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="text-purple-600 hover:underline font-semibold"
            >
              Borrar búsqueda
            </button>
          )}
        </div>
      </div>

      {/* Career Cards Grid */}
      {filteredCareers.length === 0 ? (
        <div className="p-12 text-center bg-white/70 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] border border-white/80 shadow-xs space-y-3">
          <BookOpen className="w-12 h-12 text-purple-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No encontramos carreras que coincidan</h3>
          <p className="text-xs text-slate-500">Prueba con otras palabras clave (como "Criminología", "Derecho", "Ingeniería") o restablece los filtros.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedArea('Todas');
            }}
            className="px-4 py-2 rounded-xl bg-purple-100 text-purple-800 text-xs font-bold hover:bg-purple-200 transition-colors shadow-xs"
          >
            Limpiar Filtros
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleCareers.map(career => {
              const isSaved = savedCareers.includes(career.id);
              const isCompared = comparedCareers.includes(career.id);
              const matchObj = latestTestResult?.recommendedCareers.find(rc => rc.careerId === career.id);

              return (
                <div
                  key={career.id}
                  className="p-5 sm:p-6 rounded-3xl sm:rounded-[32px] bg-white/65 backdrop-blur-xl border border-white/70 hover:border-purple-300 hover:bg-white/85 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group shadow-xs"
                >
                  <div className="space-y-3">
                    {/* Top badges */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100/90 backdrop-blur-sm border border-purple-200/60 text-purple-800">
                          {career.area}
                        </span>
                        {career.level && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100/90 text-slate-600 border border-slate-200/60">
                            {career.level}
                          </span>
                        )}
                      </div>

                      {matchObj && (
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100/90 backdrop-blur-sm border border-emerald-200/60 text-emerald-800 flex items-center gap-1 shadow-xs shrink-0">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>{matchObj.matchPercentage}%</span>
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => onSelectCareer(career)}
                      className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors cursor-pointer leading-snug"
                    >
                      {career.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {career.shortDescription}
                    </p>

                    {/* Quick Specs: Semesters, Tuition, Cities */}
                    {(() => {
                      const semInfo = getOfficialSemesters(career.name, career.degreeType, career.level);
                      return (
                        <div className="space-y-1.5 pt-1 text-[11px]">
                          <div className="flex items-center justify-between text-slate-600 font-medium">
                            <span className="flex items-center gap-1 text-purple-900 font-semibold">
                              <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                              <span>{semInfo.semesters} semestres ({semInfo.duration})</span>
                            </span>
                            <span className="text-emerald-700 font-bold">
                              {career.employabilityRate} empleo
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-slate-600 bg-purple-50/60 px-2 py-1 rounded-lg border border-purple-100">
                            <DollarSign className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">
                              {career.semesterTuition ? career.semesterTuition.split('(')[0].trim() : 'Precios por universidad en la ficha'}
                            </span>
                          </div>

                          {career.citiesOffered && career.citiesOffered.length > 0 && (
                            <div className="flex items-center gap-1 text-[10px] text-slate-600 font-medium pt-0.5">
                              <Compass className="w-3 h-3 text-purple-500 shrink-0" />
                              <span className="truncate">Sedes: {career.citiesOffered.slice(0, 3).join(', ')}{career.citiesOffered.length > 3 ? ` +${career.citiesOffered.length - 3}` : ''}</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Skills tags preview */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {career.necessarySkills.slice(0, 2).map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/80 border border-slate-200/60 text-purple-900 text-[10px] font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="space-y-3 pt-3 border-t border-slate-200/50">
                    <div className="flex items-center gap-2">
                      {/* Compare button */}
                      <button
                        onClick={() => onCompareToggle(career.id)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all shadow-xs ${
                          isCompared
                            ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                            : 'bg-white/80 text-slate-600 border-white/80 hover:bg-white'
                        }`}
                        title={isCompared ? 'En comparador' : 'Agregar a comparador'}
                      >
                        <Layers className="w-4 h-4" />
                      </button>

                      {/* Bookmark Favorite */}
                      <button
                        onClick={() => onToggleSaveCareer(career.id)}
                        className={`p-2.5 rounded-xl border transition-all shadow-xs ${
                          isSaved
                            ? 'bg-pink-50 text-pink-600 border-pink-200 shadow-xs'
                            : 'bg-white/80 text-slate-400 border-white/80 hover:text-pink-500 hover:border-pink-200'
                        }`}
                        title="Guardar en favoritos"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500' : ''}`} />
                      </button>

                      {/* View Details modal button */}
                      <button
                        onClick={() => onSelectCareer(career)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-purple-100/70 hover:bg-purple-200/80 text-purple-900 font-bold text-xs transition-colors text-center border border-purple-200/50 shadow-xs"
                      >
                        Ver Ficha Completa
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Pagination Button */}
          {visibleCount < filteredCareers.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount(prev => prev + 24)}
                className="px-6 py-3 rounded-2xl bg-white/80 hover:bg-white border border-purple-200/70 text-purple-900 font-extrabold text-xs shadow-md hover:shadow-lg backdrop-blur-md transition-all inline-flex items-center gap-2"
              >
                <span>Cargar más carreras ({filteredCareers.length - visibleCount} restantes)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
