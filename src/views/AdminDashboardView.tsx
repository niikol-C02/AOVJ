import React, { useState, useEffect } from 'react';
import { User, ViewType } from '../types';
import { StorageController } from '../controllers/StorageController';
import { 
  LayoutDashboard, 
  Users, 
  FileQuestion, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Eye, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Calendar, 
  Sparkles, 
  RefreshCw, 
  Sliders, 
  Clock, 
  BookOpen, 
  X,
  Layers,
  ChevronRight,
  TrendingUp,
  Activity,
  Award
} from 'lucide-react';
import { VOCATIONAL_QUESTION_BANK as QUESTIONS_DATA } from '../models/questionsData';
import { COMPREHENSIVE_CAREERS_DATA } from '../models/careersData';

interface AdminDashboardViewProps {
  currentUser: User;
  onNavigate: (view: ViewType) => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

type AdminTab = 'overview' | 'users' | 'tests' | 'results' | 'config';

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentUser,
  onNavigate,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Overview Data
  const [overviewData, setOverviewData] = useState<{
    totalUsers: number;
    totalTests: number;
    activeUsers: number;
    averageMatch: number;
    riasecCounts: Record<string, number>;
    registrationsByDay: Record<string, number>;
    careerFrequency: Record<string, number>;
  }>({
    totalUsers: 0,
    totalTests: 0,
    activeUsers: 0,
    averageMatch: 88,
    riasecCounts: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
    registrationsByDay: {},
    careerFrequency: {}
  });

  // Users Data
  const [usersList, setUsersList] = useState<any[]>([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userAgeFilter, setUserAgeFilter] = useState('all');
  const [userEduFilter, setUserEduFilter] = useState('all');
  const [selectedUserDetail, setSelectedUserDetail] = useState<any | null>(null);

  // Tests & Questions
  const [testStats, setTestStats] = useState<{
    totalCompleted: number;
    averageTimeMinutes: number;
    completionRatePercent: number;
    customQuestions: any[];
  }>({
    totalCompleted: 0,
    averageTimeMinutes: 8.5,
    completionRatePercent: 94.2,
    customQuestions: []
  });

  // Question Form State
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState('A');
  const [newQuestionArea, setNewQuestionArea] = useState('Artes, Creatividad y Diseño');
  const [newQuestionTopic, setNewQuestionTopic] = useState('');

  // Platform Config
  const [platformSettings, setPlatformSettings] = useState<Record<string, string>>({
    platformStatus: 'operational',
    activeVersion: '2.4.0-pro',
    minMatchThreshold: '50',
    riasecWeightingProfile: 'balanced',
    allowGuestTests: 'true'
  });
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isSavingConfig, setIsSavingConfig] = useState(false);

  const authToken = StorageController.getAuthToken();

  // Helper fetch with auth
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(options.headers || {})
    };
    return fetch(url, { ...options, headers });
  };

  // Load Admin Data on tab switch or mount
  useEffect(() => {
    loadTabContent(activeTab);
  }, [activeTab]);

  const loadTabContent = async (tab: AdminTab) => {
    setIsLoading(true);
    setErrorNotice(null);

    try {
      if (tab === 'overview') {
        const res = await fetchWithAuth('/api/admin/overview');
        if (res.ok) {
          const data = await res.json();
          setOverviewData(data);
        } else if (res.status === 401 || res.status === 403) {
          setErrorNotice('Acceso no autorizado: No cuentas con privilegios de administrador.');
          onShowToast('Acceso Denegado (403)', 'Tu cuenta no tiene autorización para este módulo.', 'error');
          onNavigate('home');
          return;
        }
      } else if (tab === 'users') {
        await loadUsers();
      } else if (tab === 'tests') {
        const res = await fetchWithAuth('/api/admin/tests');
        if (res.ok) {
          const data = await res.json();
          setTestStats(data);
        }
      } else if (tab === 'config' || tab === 'results') {
        const res = await fetchWithAuth('/api/admin/config');
        if (res.ok) {
          const data = await res.json();
          if (data.settings) setPlatformSettings(data.settings);
          if (data.logs) setAuditLogs(data.logs);
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (userSearchTerm) params.append('search', userSearchTerm);
      if (userAgeFilter !== 'all') params.append('ageRange', userAgeFilter);
      if (userEduFilter !== 'all') params.append('educationLevel', userEduFilter);

      const res = await fetchWithAuth(`/api/admin/users?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setUsersList(data.users || []);
      }
    } catch (err) {
      console.error('Error loading users:', err);
    }
  };

  const handleOpenUserDetail = async (userId: string) => {
    try {
      const res = await fetchWithAuth(`/api/admin/users/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedUserDetail(data.user);
      }
    } catch (err) {
      console.error('Error fetching user detail:', err);
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) {
      onShowToast('Campo requerido', 'Ingresa el texto de la pregunta.', 'error');
      return;
    }

    try {
      const res = await fetchWithAuth('/api/admin/questions', {
        method: 'POST',
        body: JSON.stringify({
          text: newQuestionText,
          category: newQuestionCategory,
          area: newQuestionArea,
          topic: newQuestionTopic
        })
      });

      if (res.ok) {
        onShowToast('Pregunta guardada', 'La pregunta fue agregada exitosamente al banco vocacional.', 'success');
        setIsAddQuestionOpen(false);
        setNewQuestionText('');
        setNewQuestionTopic('');
        loadTabContent('tests');
      } else {
        const err = await res.json();
        onShowToast('Error', err.error || 'No se pudo guardar la pregunta.', 'error');
      }
    } catch (err) {
      onShowToast('Error de conexión', 'No fue posible comunicar con el servidor.', 'error');
    }
  };

  const handleToggleQuestionActive = async (id: number, currentActive: boolean) => {
    try {
      const res = await fetchWithAuth(`/api/admin/questions/${id}/active`, {
        method: 'PATCH',
        body: JSON.stringify({ active: !currentActive })
      });
      if (res.ok) {
        onShowToast('Estado actualizado', `Pregunta ${!currentActive ? 'activada' : 'desactivada'}.`, 'info');
        loadTabContent('tests');
      }
    } catch (err) {
      console.error('Error updating question active state:', err);
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm('¿Deseas eliminar permanentemente esta pregunta del catálogo?')) return;
    try {
      const res = await fetchWithAuth(`/api/admin/questions/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        onShowToast('Pregunta eliminada', 'El registro fue removido del banco.', 'info');
        loadTabContent('tests');
      }
    } catch (err) {
      console.error('Error deleting question:', err);
    }
  };

  const handleSavePlatformConfig = async () => {
    setIsSavingConfig(true);
    try {
      const res = await fetchWithAuth('/api/admin/config', {
        method: 'POST',
        body: JSON.stringify(platformSettings)
      });
      if (res.ok) {
        const data = await res.json();
        setPlatformSettings(data.settings);
        onShowToast('Configuración guardada', 'Los parámetros del sistema fueron actualizados en el servidor.', 'success');
      }
    } catch (err) {
      onShowToast('Error', 'No se pudo guardar la configuración.', 'error');
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const res = await fetchWithAuth('/api/admin/export');
      if (res.ok) {
        const data = await res.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_vocaccion_${new Date().toISOString().substring(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        onShowToast('Reporte generado', 'El archivo de auditoría y estadísticas se descargó correctamente.', 'success');
      }
    } catch (err) {
      onShowToast('Error', 'No se pudo descargar el reporte.', 'error');
    }
  };

  const riasecLabels: Record<string, { title: string; color: string }> = {
    R: { title: 'Realista', color: 'bg-amber-500 text-amber-50' },
    I: { title: 'Investigador', color: 'bg-blue-500 text-blue-50' },
    A: { title: 'Artístico & Creativo', color: 'bg-purple-500 text-purple-50' },
    S: { title: 'Social & Humano', color: 'bg-pink-500 text-pink-50' },
    E: { title: 'Emprendedor', color: 'bg-emerald-500 text-emerald-50' },
    C: { title: 'Convencional', color: 'bg-slate-500 text-slate-50' }
  };

  const allQuestionsCombined = [
    ...testStats.customQuestions.map(q => ({
      id: `custom-${q.id}`,
      numId: q.id,
      text: q.text,
      category: q.category,
      area: q.area,
      isCustom: true,
      active: q.active === 1
    })),
    ...QUESTIONS_DATA.slice(0, 40).map(q => ({
      id: `system-${q.id}`,
      numId: q.id,
      text: q.text,
      category: q.category,
      area: q.area,
      isCustom: false,
      active: true
    }))
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Top Banner & Mode Switcher */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-purple-500/30 text-purple-300 border border-purple-400/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Acceso Administrativo Dual</span>
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              v{platformSettings.activeVersion}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
            Panel de Gestión y Control VocAcción
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Sesión autenticada para <strong className="text-white">{currentUser.name}</strong> ({currentUser.email}). Control de métricas, banco de preguntas y analítica vocacional.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Dual Mode Switch Button: Return to Student view */}
          <button
            id="admin-return-student-view-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all backdrop-blur-md shadow-xs active:scale-95"
            title="Alternar a la vista habitual de estudiante sin cerrar tu sesión"
          >
            <ArrowLeft className="w-4 h-4 text-pink-300" />
            <span>Vista de Estudiante</span>
          </button>

          {/* Export Quick Button */}
          <button
            id="admin-export-quick-btn"
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-purple-900/40 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Reporte</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <nav aria-label="Módulos de administración" className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200/80">
        {[
          { id: 'overview', label: 'Resumen General', icon: LayoutDashboard },
          { id: 'users', label: 'Gestión de Usuarios', icon: Users },
          { id: 'tests', label: 'Banco de Tests & Preguntas', icon: FileQuestion },
          { id: 'results', label: 'Resultados & Estadísticas', icon: BarChart3 },
          { id: 'config', label: 'Configuración & Auditoría', icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`admin-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md shadow-purple-500/20 ring-1 ring-purple-600'
                  : 'bg-white/60 backdrop-blur-md text-slate-600 hover:text-purple-800 hover:bg-white/90 border border-slate-200/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center justify-center p-12 bg-white/60 backdrop-blur-md rounded-3xl border border-white/60">
          <div className="flex items-center gap-3 text-purple-700 font-semibold text-sm">
            <RefreshCw className="w-5 h-5 animate-spin text-purple-600" />
            <span>Cargando datos administrativos del servidor...</span>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 1: RESUMEN GENERAL (OVERVIEW)
          ========================================================================= */}
      {!isLoading && activeTab === 'overview' && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
          {/* 4 Metric Key Performance Indicators (KPIs) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Usuarios Registrados</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
                  {overviewData.totalUsers}
                </h3>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Cuentas activas en la BD</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tests Completados</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
                  {overviewData.totalTests}
                </h3>
                <p className="text-[11px] text-purple-600 font-semibold mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Modelo Holland (RIASEC)</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center">
                <FileQuestion className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Usuarios Activos</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
                  {overviewData.activeUsers}
                </h3>
                <p className="text-[11px] text-blue-600 font-semibold mt-1 flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  <span>Últimos 7 días</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Afinidad Promedio</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">
                  {overviewData.averageMatch}%
                </h3>
                <p className="text-[11px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>Ponderación vocacional</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Graphical Distributions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* RIASEC Profile Distribution Bar Visualizer */}
            <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Distribución de Intereses Vocacionales (RIASEC)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Frecuencia de áreas de preferencia detectadas en los tests psicométricos
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                  Modelo Holland
                </span>
              </div>

              <div className="space-y-3.5 pt-2">
                {Object.entries(riasecLabels).map(([code, meta]) => {
                  const count = Number((overviewData.riasecCounts as Record<string, number>)[code] || 0);
                  const total = Object.values(overviewData.riasecCounts as Record<string, number>).reduce((a: number, b: number) => a + Number(b || 0), 0) || 1;
                  const percent = Math.round((count / total) * 100);

                  return (
                    <div key={code} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${meta.color}`}>
                            {code}
                          </span>
                          <span>{meta.title}</span>
                        </span>
                        <span>{count} coincidencias ({percent}%)</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${meta.color.split(' ')[0]}`}
                          style={{ width: `${Math.max(percent, 4)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Popular Careers Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Carreras con Mayor Interés
                </h3>
                <p className="text-xs text-slate-500">
                  Profesiones más guardadas y recomendadas en la plataforma
                </p>
              </div>

              <div className="space-y-2.5">
                {COMPREHENSIVE_CAREERS_DATA.slice(0, 6).map((c, i) => (
                  <div key={c.id} className="flex items-center justify-between p-2.5 rounded-2xl bg-white/60 border border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-[10px]">
                        #{i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-slate-800 line-clamp-1">{c.name}</p>
                        <p className="text-[10px] text-slate-400">{c.area}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-purple-600 text-[11px]">
                      {c.employabilityRate || '+18%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: GESTIÓN DE USUARIOS
          ========================================================================= */}
      {!isLoading && activeTab === 'users' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* User Filtering Controls */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-search-users-input"
                type="text"
                placeholder="Buscar por nombre o correo..."
                value={userSearchTerm}
                onChange={e => setUserSearchTerm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && loadUsers()}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <Filter className="w-3.5 h-3.5" />
                <span>Filtros:</span>
              </div>
              <select
                id="admin-filter-age"
                value={userAgeFilter}
                onChange={e => setUserAgeFilter(e.target.value)}
                className="text-xs bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700"
              >
                <option value="all">Todas las edades</option>
                <option value="12-15">12 a 15 años</option>
                <option value="16-18">16 a 18 años</option>
                <option value="19-24">19 a 24 años</option>
                <option value="25+">25 o más</option>
              </select>

              <select
                id="admin-filter-edu"
                value={userEduFilter}
                onChange={e => setUserEduFilter(e.target.value)}
                className="text-xs bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 max-w-[160px] truncate"
              >
                <option value="all">Todo nivel educativo</option>
                <option value="Bachillerato">Bachillerato / Secundaria</option>
                <option value="Pregrado / Universidad">Universidad / Pregrado</option>
                <option value="Técnico o Tecnológico">Técnico o Tecnológico</option>
              </select>

              <button
                id="admin-apply-user-filters-btn"
                onClick={loadUsers}
                className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-xs"
              >
                Aplicar
              </button>
            </div>
          </div>

          {/* Interactive Users Table with Horizontal Scroll Protection */}
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5 sm:p-4">Estudiante / Usuario</th>
                    <th className="p-3.5 sm:p-4">Rol & Permisos</th>
                    <th className="p-3.5 sm:p-4">Edad & Grado</th>
                    <th className="p-3.5 sm:p-4">Ubicación</th>
                    <th className="p-3.5 sm:p-4 text-center">Tests Realizados</th>
                    <th className="p-3.5 sm:p-4 text-center">Favoritos</th>
                    <th className="p-3.5 sm:p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usersList.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-slate-400">
                        No se encontraron usuarios que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ) : (
                    usersList.map(u => (
                      <tr key={u.id} className="hover:bg-purple-50/40 transition-colors">
                        <td className="p-3.5 sm:p-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-xl ${u.avatarColor || 'bg-gradient-to-tr from-pink-400 to-purple-500'} text-white flex items-center justify-center font-bold text-xs`}>
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">{u.name}</p>
                              <p className="text-[11px] text-slate-500 truncate max-w-[180px] sm:max-w-xs">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 sm:p-4">
                          {u.role === 'admin' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                              <ShieldCheck className="w-3 h-3 text-purple-600" />
                              <span>Administrador</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700">
                              Estudiante
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 sm:p-4">
                          <p className="font-semibold text-slate-800">{u.age} años</p>
                          <p className="text-[10px] text-slate-500 truncate max-w-[140px]">{u.educationLevel}</p>
                        </td>
                        <td className="p-3.5 sm:p-4">
                          <p className="text-slate-700">{u.city || 'No especificada'}</p>
                          <p className="text-[10px] text-slate-400">{u.country}</p>
                        </td>
                        <td className="p-3.5 sm:p-4 text-center font-bold text-purple-700">
                          {u.testsCount}
                        </td>
                        <td className="p-3.5 sm:p-4 text-center font-bold text-pink-600">
                          {u.savedCareersCount}
                        </td>
                        <td className="p-3.5 sm:p-4 text-right">
                          <button
                            id={`admin-view-user-${u.id}`}
                            onClick={() => handleOpenUserDetail(u.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver Ficha</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Detail Modal */}
          {selectedUserDetail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-100 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${selectedUserDetail.avatarColor} text-white flex items-center justify-center font-bold`}>
                      {selectedUserDetail.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{selectedUserDetail.name}</h3>
                      <p className="text-xs text-slate-500">{selectedUserDetail.email} • Rol: <strong>{selectedUserDetail.role}</strong></p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUserDetail(null)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Edad</p>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedUserDetail.age} años</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Ciudad</p>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedUserDetail.city || 'N/A'}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Tests Realizados</p>
                    <p className="font-bold text-purple-700 text-sm mt-0.5">{selectedUserDetail.testHistory?.length || 0}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Carreras Guardadas</p>
                    <p className="font-bold text-pink-600 text-sm mt-0.5">{selectedUserDetail.savedCareers?.length || 0}</p>
                  </div>
                </div>

                {/* Test History inside detail */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-800">Historial de Evaluaciones</h4>
                  {selectedUserDetail.testHistory?.length === 0 ? (
                    <p className="text-xs text-slate-400">Este estudiante aún no ha completado el test vocacional.</p>
                  ) : (
                    selectedUserDetail.testHistory?.map((t: any, i: number) => (
                      <div key={i} className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-purple-900">{t.profileTitle}</span>
                          <span className="text-[11px] text-slate-500">{new Date(t.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-600">{t.profileDescription}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {t.recommendedCareers?.slice(0, 4).map((rc: any, idx: number) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-800 font-medium text-[10px]">
                              {rc.careerId} ({rc.matchPercentage}%)
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setSelectedUserDetail(null)}
                    className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
                  >
                    Cerrar Ficha
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: BANCO DE TESTS & PREGUNTAS
          ========================================================================= */}
      {!isLoading && activeTab === 'tests' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Quick Stats for Test Completion */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tasa de Completitud</p>
                <h3 className="text-2xl font-black text-purple-700 mt-1 font-['Outfit',sans-serif]">
                  {testStats.completionRatePercent}%
                </h3>
              </div>
              <CheckCircle2 className="w-8 h-8 text-purple-500" />
            </div>

            <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tiempo Promedio</p>
                <h3 className="text-2xl font-black text-blue-700 mt-1 font-['Outfit',sans-serif]">
                  {testStats.averageTimeMinutes} min
                </h3>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>

            <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Preguntas en Catálogo</p>
                <h3 className="text-2xl font-black text-pink-700 mt-1 font-['Outfit',sans-serif]">
                  {QUESTIONS_DATA.length + testStats.customQuestions.length}
                </h3>
              </div>
              <BookOpen className="w-8 h-8 text-pink-500" />
            </div>
          </div>

          {/* Question Bank Header & Add Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                Banco de Preguntas Vocacionales
              </h3>
              <p className="text-xs text-slate-500">
                Visualiza, activa o desactiva preguntas psicométricas e incorpora nuevas afirmaciones al banco
              </p>
            </div>

            <button
              id="admin-add-question-btn"
              onClick={() => setIsAddQuestionOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Nueva Pregunta</span>
            </button>
          </div>

          {/* Add Question Modal Form */}
          {isAddQuestionOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-base text-slate-900">Añadir Pregunta al Banco Vocacional</h3>
                  <button onClick={() => setIsAddQuestionOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Enunciado / Pregunta para el estudiante *
                    </label>
                    <textarea
                      id="admin-new-question-text"
                      rows={3}
                      value={newQuestionText}
                      onChange={e => setNewQuestionText(e.target.value)}
                      placeholder="Ej. Me interesa aprender a diseñar interfaces visuales o crear estilismos de moda..."
                      className="w-full p-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Categoría RIASEC *</label>
                      <select
                        id="admin-new-question-category"
                        value={newQuestionCategory}
                        onChange={e => setNewQuestionCategory(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="R">R - Realista (Técnico / Mecánico)</option>
                        <option value="I">I - Investigador (Científico / Analítico)</option>
                        <option value="A">A - Artístico (Creativo / Moda / Visual)</option>
                        <option value="S">S - Social (Pedagogía / Bienestar)</option>
                        <option value="E">E - Emprendedor (Negocios / Liderazgo)</option>
                        <option value="C">C - Convencional (Gestión / Datos)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Área Vocacional *</label>
                      <input
                        id="admin-new-question-area"
                        type="text"
                        value={newQuestionArea}
                        onChange={e => setNewQuestionArea(e.target.value)}
                        placeholder="Ej. Arte, Belleza y Moda"
                        className="w-full p-2.5 rounded-xl border border-slate-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Palabra Clave / Tópico (Opcional)</label>
                    <input
                      id="admin-new-question-topic"
                      type="text"
                      value={newQuestionTopic}
                      onChange={e => setNewQuestionTopic(e.target.value)}
                      placeholder="Ej. estilismo, maquillaje, diseño_vestuario"
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddQuestionOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
                    >
                      Cancelar
                    </button>
                    <button
                      id="admin-submit-question-btn"
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold"
                    >
                      Guardar en Base de Datos
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Question List */}
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {allQuestionsCombined.map(q => (
                <div key={q.id} className="p-4 hover:bg-purple-50/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${riasecLabels[q.category]?.color || 'bg-slate-600 text-white'}`}>
                        Tipo {q.category}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">#{q.numId}</span>
                      <span className="font-semibold text-slate-600">{q.area}</span>
                      {q.isCustom && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-pink-700">
                          Personalizada
                        </span>
                      )}
                    </div>
                    <p className="text-slate-800 font-medium text-xs sm:text-sm">
                      {q.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {q.isCustom && (
                      <>
                        <button
                          onClick={() => handleToggleQuestionActive(q.numId, q.active)}
                          className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                            q.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {q.active ? 'Activa' : 'Inactiva'}
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q.numId)}
                          className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                          title="Eliminar pregunta"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {!q.isCustom && (
                      <span className="text-[11px] font-semibold text-slate-400 italic">
                        Pregunta del Sistema
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: RESULTADOS & ESTADÍSTICAS
          ========================================================================= */}
      {!isLoading && activeTab === 'results' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Análisis Comparativo y Exportación de Auditoría
                </h3>
                <p className="text-xs text-slate-500">
                  Resumen de perfiles vocacionales predominantes y generación de reportes oficiales
                </p>
              </div>

              <button
                id="admin-export-data-full-btn"
                onClick={handleDownloadReport}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Informe Integral (JSON)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 space-y-2 text-xs">
                <h4 className="font-bold text-purple-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Nuevas Áreas Vocacionales Incorporadas</span>
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  El algoritmo ahora evalúa afinidades vocacionales en Arte, Moda, Belleza Integral, Producción Audiovisual y Creación Digital, asignando ponderaciones orientativas e inclusivas según los intereses directos del estudiante.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 space-y-2 text-xs">
                <h4 className="font-bold text-blue-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Seguridad de Roles & Auditoría</span>
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Todas las peticiones a la ruta <code className="bg-white/80 px-1 py-0.5 rounded text-indigo-700">/admin</code> son filtradas por el middleware del servidor Express, garantizando que solo los correos administrativos autorizados accedan a la gestión.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: CONFIGURACIÓN & AUDITORÍA
          ========================================================================= */}
      {!isLoading && activeTab === 'config' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Parameters Form */}
            <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Parámetros Operativos
                  </h3>
                  <p className="text-xs text-slate-500">Ajusta variables globales del motor vocacional</p>
                </div>
                <Sliders className="w-5 h-5 text-purple-600" />
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estado de la Plataforma</label>
                  <select
                    id="admin-config-status"
                    value={platformSettings.platformStatus}
                    onChange={e => setPlatformSettings(prev => ({ ...prev, platformStatus: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="operational">Operacional (100% Disponible)</option>
                    <option value="maintenance">Modo Mantenimiento Programado</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Umbral Mínimo de Coincidencia Vocacional (%)</label>
                  <input
                    id="admin-config-threshold"
                    type="number"
                    min="30"
                    max="80"
                    value={platformSettings.minMatchThreshold}
                    onChange={e => setPlatformSettings(prev => ({ ...prev, minMatchThreshold: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Porcentaje mínimo para sugerir una carrera compatible.</p>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Perfil de Ponderación RIASEC</label>
                  <select
                    id="admin-config-weighting"
                    value={platformSettings.riasecWeightingProfile}
                    onChange={e => setPlatformSettings(prev => ({ ...prev, riasecWeightingProfile: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="balanced">Equilibrado (60% Primario, 30% Secundario, 10% Terciario)</option>
                    <option value="focused">Enfocado (70% Primario, 20% Secundario, 10% Terciario)</option>
                    <option value="exploratory">Exploratorio Inclusivo (50% Primario, 35% Secundario, 15% Terciario)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    id="admin-save-config-btn"
                    onClick={handleSavePlatformConfig}
                    disabled={isSavingConfig}
                    className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    {isSavingConfig ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    <span>Guardar Parámetros en Servidor</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Registro de Auditoría Administrativa
                </h3>
                <p className="text-xs text-slate-500">Historial de eventos de gestión y modificaciones del sistema</p>
              </div>

              <div className="max-h-80 overflow-y-auto space-y-2 text-xs divide-y divide-slate-100">
                {auditLogs.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">No hay registros de auditoría recientes.</p>
                ) : (
                  auditLogs.map((log: any) => (
                    <div key={log.id} className="pt-2 flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-slate-800 text-[11px]">{log.action}</p>
                        <p className="text-[10px] text-slate-500">{log.details || 'Sin detalle adicional'}</p>
                        <p className="text-[9px] text-slate-400">{log.user_email}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
