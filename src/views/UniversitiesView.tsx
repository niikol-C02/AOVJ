import React, { useState, useMemo } from 'react';
import { University, ViewType } from '../types';
import { 
  Building2, 
  Search, 
  MapPin, 
  Star, 
  GraduationCap, 
  ExternalLink, 
  Heart, 
  DollarSign, 
  BookOpen 
} from 'lucide-react';

interface UniversitiesViewProps {
  universities: University[];
  onSelectUniversity: (university: University) => void;
  onToggleSaveUniversity: (universityId: string) => void;
  savedUniversities: string[];
  onNavigateToCareers: (careerName?: string) => void;
}

export const UniversitiesView: React.FC<UniversitiesViewProps> = ({
  universities,
  onSelectUniversity,
  onToggleSaveUniversity,
  savedUniversities,
  onNavigateToCareers
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'Todas' | 'Pública' | 'Privada'>('Todas');

  const filteredUniversities = useMemo(() => {
    return universities.filter(uni => {
      const matchesSearch =
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.topCareers.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = selectedType === 'Todas' || uni.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [universities, searchTerm, selectedType]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Header with Frosted Glass */}
      <div className="p-6 sm:p-8 rounded-3xl sm:rounded-[32px] bg-white/65 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(180,160,220,0.1)] space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-purple-200/80 text-xs font-bold text-indigo-800 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Directorio de Instituciones de Educación Superior</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            Universidades e Institutos
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Encuentra las mejores universidades públicas y privadas, compara sus ofertas académicas, campus y procesos de admisión.
          </p>
        </div>

        {/* Search & Type Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-universities-input"
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por universidad, ciudad o carrera ofrecida..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/80 bg-white/75 backdrop-blur-md text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 shadow-xs placeholder-slate-400"
            />
          </div>

          <div className="flex items-center p-1 bg-white/75 backdrop-blur-md rounded-2xl border border-white/80 shadow-xs">
            {(['Todas', 'Pública', 'Privada'] as const).map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedType === type
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-purple-600'
                }`}
              >
                {type === 'Todas' ? 'Todas' : `${type}s`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* University Grid */}
      {filteredUniversities.length === 0 ? (
        <div className="p-12 text-center bg-white/70 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] border border-white/80 shadow-xs space-y-3">
          <Building2 className="w-12 h-12 text-purple-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No encontramos universidades</h3>
          <p className="text-xs text-slate-500">Prueba con otra búsqueda o cambia el tipo de institución.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredUniversities.map(uni => {
            const isSaved = savedUniversities.includes(uni.id);

            return (
              <div
                key={uni.id}
                className="p-5 sm:p-6 rounded-3xl sm:rounded-[32px] bg-white/65 backdrop-blur-xl border border-white/70 hover:border-purple-300 hover:bg-white/85 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group shadow-xs"
              >
                <div className="space-y-3">
                  {/* Top info */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl ${uni.badgeBg} text-white font-extrabold flex items-center justify-center text-xs shadow-md shrink-0 border border-white/20`}>
                        {uni.logoText}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm border ${
                            uni.type === 'Pública' ? 'bg-emerald-100/90 border-emerald-200/60 text-emerald-800' : 'bg-purple-100/90 border-purple-200/60 text-purple-800'
                          }`}>
                            {uni.type}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {uni.rating}
                          </span>
                        </div>
                        <h3 
                          onClick={() => onSelectUniversity(uni)}
                          className="text-base font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors cursor-pointer leading-snug"
                        >
                          {uni.name}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-purple-500" />
                          <span>{uni.city}, {uni.country}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleSaveUniversity(uni.id)}
                      className={`p-2 rounded-xl border transition-all shadow-xs ${
                        isSaved ? 'bg-pink-50 text-pink-600 border-pink-200 shadow-xs' : 'bg-white/80 text-slate-400 border-white/80 hover:text-pink-500 hover:border-pink-200'
                      }`}
                      title="Guardar universidad"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {uni.description}
                  </p>

                  {/* Top careers list */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Carreras destacadas:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {(uni.topCareers || []).slice(0, 3).map((c, idx) => (
                        <span
                          key={idx}
                          onClick={() => onNavigateToCareers(c)}
                          className="px-2 py-0.5 rounded-md bg-white/80 border border-purple-100 hover:bg-purple-100/80 text-purple-900 text-[10px] font-medium cursor-pointer transition-colors"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200/50">
                  <span className="text-[11px] text-slate-500 truncate max-w-[180px]">
                    {uni.tuitionInfo.split('(')[0]}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={uni.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-white/80 bg-white/70 text-slate-600 hover:bg-white transition-colors shadow-xs"
                      title="Web oficial"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => onSelectUniversity(uni)}
                      className="px-4 py-2 rounded-xl bg-purple-100/70 hover:bg-purple-200/80 text-purple-900 font-bold text-xs transition-colors border border-purple-200/50 shadow-xs"
                    >
                      Ver Información
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
