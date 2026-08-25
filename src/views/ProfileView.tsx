import React, { useState } from 'react';
import { Career, Scholarship, TestResult, University, User, ViewType } from '../types';
import { StorageController } from '../controllers/StorageController';
import { 
  User as UserIcon, 
  Settings, 
  Sparkles, 
  Heart, 
  BookOpen, 
  Building2, 
  Award, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Lock, 
  CheckCircle2, 
  LogOut, 
  Trash2, 
  ChevronRight, 
  ArrowRight,
  Shield
} from 'lucide-react';

interface ProfileViewProps {
  currentUser: User | null;
  onUpdateUser: (updated: User) => void;
  onLogout: () => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  allCareers: Career[];
  allUniversities: University[];
  allScholarships: Scholarship[];
  onSelectCareer: (career: Career) => void;
  onSelectUniversity: (uni: University) => void;
  onSelectScholarship: (sch: Scholarship) => void;
  onNavigateToView: (view: ViewType) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  onUpdateUser,
  onLogout,
  onOpenAuth,
  allCareers,
  allUniversities,
  allScholarships,
  onSelectCareer,
  onSelectUniversity,
  onSelectScholarship,
  onNavigateToView,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'tests' | 'favorites'>('profile');

  // Edit profile form state
  const [name, setName] = useState(currentUser?.name || '');
  const [age, setAge] = useState<number | ''>(currentUser?.age || 17);
  const [educationLevel, setEducationLevel] = useState(currentUser?.educationLevel || 'Último año de Bachillerato / Secundaria');
  const [city, setCity] = useState(currentUser?.city || '');
  const [country, setCountry] = useState(currentUser?.country || '');
  const [newPassword, setNewPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto text-center p-10 bg-white/70 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] border border-white/80 shadow-[0_8px_32px_rgba(180,160,220,0.12)] space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-purple-100/90 backdrop-blur-sm border border-purple-200/60 text-purple-600 flex items-center justify-center mx-auto shadow-xs">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
          Inicia sesión para gestionar tu perfil
        </h2>
        <p className="text-xs text-slate-600">
          Crea tu cuenta para guardar tus tests vocacionales, carreras favoritas y postulaciones de becas.
        </p>
        <button
          onClick={() => onOpenAuth('login')}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md hover:shadow-lg backdrop-blur-md border border-white/20 transition-all"
        >
          Iniciar Sesión / Registrarme
        </button>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedData: Partial<User> = {
      name: name.trim(),
      age: Number(age) || undefined,
      educationLevel,
      city: city.trim(),
      country: country.trim()
    };

    const res = await StorageController.updateUser(currentUser.id, updatedData);
    if (res) {
      onUpdateUser(res);
      onShowToast('Perfil actualizado en Firebase', 'Tus datos personales se han sincronizado con Firestore.', 'success');
      setNewPassword('');
    } else {
      onShowToast('Error al actualizar', 'No se pudieron guardar los cambios en la base de datos.', 'error');
    }
    setIsSaving(false);
  };

  // Find saved objects
  const savedCareerList = allCareers.filter(c => currentUser.savedCareers?.includes(c.id));
  const savedUniList = allUniversities.filter(u => currentUser.savedUniversities?.includes(u.id));
  const savedSchList = allScholarships.filter(s => currentUser.savedScholarships?.includes(s.id));

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl sm:rounded-[32px] bg-white/65 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(180,160,220,0.1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl ${currentUser.avatarColor || 'bg-gradient-to-tr from-pink-400 to-purple-500'} text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-md border border-white/20`}>
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                {currentUser.name}
              </h1>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100/90 backdrop-blur-sm border border-purple-200/60 text-purple-800 shadow-xs">
                Estudiante
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{currentUser.email}</p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
              <span>{currentUser.educationLevel || 'Bachillerato'}</span>
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-rose-600 border border-rose-200/80 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs backdrop-blur-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 shadow-xs max-w-fit">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-purple-600 hover:bg-white/60'
          }`}
        >
          Datos Personales
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'tests'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-purple-600 hover:bg-white/60'
          }`}
        >
          Historial de Tests ({currentUser.testHistory?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'favorites'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-purple-600 hover:bg-white/60'
          }`}
        >
          Favoritos ({savedCareerList.length + savedUniList.length + savedSchList.length})
        </button>
      </div>

      {/* TAB 1: EDIT PROFILE */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-3xl sm:rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(180,160,220,0.1)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-purple-600" />
              <span>Modificar Información Personal</span>
            </h3>
            <span className="text-xs text-slate-400">Guarda tus cambios para actualizar tu perfil</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/80 bg-white/75 backdrop-blur-md text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-purple-400 shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico (No editable)</label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/60 bg-white/40 backdrop-blur-sm text-xs sm:text-sm text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Edad</label>
              <input
                type="number"
                min={12}
                max={99}
                value={age}
                onChange={e => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/80 bg-white/75 backdrop-blur-md text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-purple-400 shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nivel Educativo Actual</label>
              <select
                value={educationLevel}
                onChange={e => setEducationLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/80 bg-white/75 backdrop-blur-md text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-purple-400 shadow-xs"
              >
                <option value="Secundaria / Bachillerato (9°-10°)">Secundaria / Bachillerato (Grados 9°-10°)</option>
                <option value="Último año de Bachillerato / Secundaria">Último año de Bachillerato / 11°-12°</option>
                <option value="Graduado de Bachiller / En búsqueda de carrera">Graduado de Bachiller / En búsqueda de carrera</option>
                <option value="Estudiante Técnico / Tecnológico">Estudiante Técnico / Tecnológico</option>
                <option value="Estudiante Universitario (Reorientación)">Estudiante Universitario (Cambio de carrera)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ciudad / Región</label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Ej. Bogotá, Medellín, CDMX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/80 bg-white/75 backdrop-blur-md text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-purple-400 shadow-xs placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">País</label>
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                placeholder="Ej. Colombia, México, Perú"
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/80 bg-white/75 backdrop-blur-md text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-purple-400 shadow-xs placeholder-slate-400"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/50">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cambiar Contraseña (Opcional)
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Dejar en blanco para mantener la actual"
              className="max-w-md w-full px-3.5 py-2.5 rounded-xl border border-white/80 bg-white/75 backdrop-blur-md text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-purple-400 shadow-xs placeholder-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md hover:opacity-95 transition-all border border-white/20 backdrop-blur-md"
          >
            {isSaving ? 'Guardando...' : 'Guardar Cambios del Perfil'}
          </button>
        </form>
      )}

      {/* TAB 2: TEST HISTORY */}
      {activeTab === 'tests' && (
        <div className="space-y-4">
          {(!currentUser.testHistory || currentUser.testHistory.length === 0) ? (
            <div className="p-12 text-center bg-white/70 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] border border-white/80 shadow-xs space-y-3">
              <Sparkles className="w-12 h-12 text-purple-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">Aún no tienes historial de tests</h3>
              <p className="text-xs text-slate-500">Realiza tu primer test vocacional para guardar tus resultados.</p>
              <button
                onClick={() => onNavigateToView('test')}
                className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md hover:bg-purple-700 transition-colors border border-white/20"
              >
                Comenzar Test
              </button>
            </div>
          ) : (
            currentUser.testHistory.map((test, idx) => (
              <div
                key={test.id}
                className="p-5 sm:p-6 rounded-3xl sm:rounded-[32px] bg-white/65 backdrop-blur-xl border border-white/70 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100/90 backdrop-blur-sm border border-purple-200/60 text-purple-800">
                      Evaluación #{currentUser.testHistory.length - idx}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(test.date).toLocaleDateString('es-ES', { dateStyle: 'long' })}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">{test.profileTitle}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{test.profileDescription}</p>
                </div>

                <button
                  onClick={() => onNavigateToView('results')}
                  className="px-4 py-2.5 rounded-xl bg-purple-100/70 hover:bg-purple-200/80 text-purple-900 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 border border-purple-200/50 shadow-xs"
                >
                  <span>Ver Informe Completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: SAVED FAVORITES */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          {/* Saved Careers */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Carreras Guardadas ({savedCareerList.length})</span>
            </h3>

            {savedCareerList.length === 0 ? (
              <p className="text-xs text-slate-500 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-xs">
                No tienes carreras guardadas aún. Explora el catálogo y pulsa el icono de corazón en las que te interesen.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {savedCareerList.map(c => (
                  <div
                    key={c.id}
                    onClick={() => onSelectCareer(c)}
                    className="p-4 rounded-2xl bg-white/65 backdrop-blur-xl border border-white/70 hover:border-purple-300 hover:bg-white/85 transition-all cursor-pointer shadow-xs flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100/80 text-purple-700">
                        {c.area}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{c.name}</h4>
                    </div>
                    <p className="text-[11px] font-semibold text-purple-600">Ver ficha →</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Universities */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>Universidades Guardadas ({savedUniList.length})</span>
            </h3>

            {savedUniList.length === 0 ? (
              <p className="text-xs text-slate-500 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-xs">
                No tienes universidades guardadas en tu lista.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {savedUniList.map(u => (
                  <div
                    key={u.id}
                    onClick={() => onSelectUniversity(u)}
                    className="p-4 rounded-2xl bg-white/65 backdrop-blur-xl border border-white/70 hover:border-purple-300 hover:bg-white/85 transition-all cursor-pointer shadow-xs space-y-1"
                  >
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100/80 text-slate-700">
                      {u.type}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{u.name}</h4>
                    <p className="text-[11px] text-slate-500">{u.city}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Scholarships */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Becas de Interés ({savedSchList.length})</span>
            </h3>

            {savedSchList.length === 0 ? (
              <p className="text-xs text-slate-500 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-xs">
                No tienes becas guardadas en tu lista.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {savedSchList.map(s => (
                  <div
                    key={s.id}
                    onClick={() => onSelectScholarship(s)}
                    className="p-4 rounded-2xl bg-white/65 backdrop-blur-xl border border-white/70 hover:border-amber-300 hover:bg-white/85 transition-all cursor-pointer shadow-xs space-y-1"
                  >
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800">
                      {s.coverage}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{s.title}</h4>
                    <p className="text-[11px] text-purple-700">{s.organization}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
