import React, { useState, useEffect } from 'react';
import { User, ViewType, SystemConstant, ConstantCategory } from '../types';
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
  Award,
  BarChart2,
  MessageSquareQuote,
  Edit2,
  PieChart,
  PlusCircle,
  MinusCircle,
  HelpCircle,
  Vote,
  Database,
  Key,
  ToggleLeft,
  ToggleRight,
  UserX,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { VOCATIONAL_QUESTION_BANK as QUESTIONS_DATA } from '../models/questionsData';
import { COMPREHENSIVE_CAREERS_DATA } from '../models/careersData';

interface AdminDashboardViewProps {
  currentUser: User;
  onNavigate: (view: ViewType) => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

type AdminTab = 'overview' | 'users' | 'constants' | 'challenges' | 'tests' | 'results' | 'config';

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
    ageStats?: {
      averageAge: number;
      minAge: number;
      maxAge: number;
      usersByAgeRange: Record<string, number>;
      allAgesList: { age: number; count: number }[];
    };
    recentUsers?: any[];
  }>({
    totalUsers: 0,
    totalTests: 0,
    activeUsers: 0,
    averageMatch: 0,
    riasecCounts: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
    registrationsByDay: {},
    careerFrequency: {},
    ageStats: {
      averageAge: 0,
      minAge: 0,
      maxAge: 0,
      usersByAgeRange: { '12-15': 0, '16-17': 0, '18-20': 0, '21-24': 0, '25+': 0 },
      allAgesList: []
    },
    recentUsers: []
  });

  // Users Data (Vista 1)
  const [usersList, setUsersList] = useState<any[]>([]);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [userAgeFilter, setUserAgeFilter] = useState('all');
  const [userEduFilter, setUserEduFilter] = useState('all');
  const [selectedUserDetail, setSelectedUserDetail] = useState<any | null>(null);
  const [userToChangeRole, setUserToChangeRole] = useState<any | null>(null);
  const [userToDelete, setUserToDelete] = useState<any | null>(null);

  // System Constants Data (Vista 2)
  const [constantsList, setConstantsList] = useState<SystemConstant[]>([]);
  const [constantSearchTerm, setConstantSearchTerm] = useState('');
  const [constantCategoryFilter, setConstantCategoryFilter] = useState<string>('all');
  const [isConstantModalOpen, setIsConstantModalOpen] = useState(false);
  const [isEditingConstant, setIsEditingConstant] = useState(false);
  const [constantFormData, setConstantFormData] = useState<{
    key: string;
    value: string;
    category: ConstantCategory;
    description: string;
    dataType: 'string' | 'number' | 'boolean' | 'json';
  }>({
    key: '',
    value: '',
    category: 'platform',
    description: '',
    dataType: 'string'
  });
  const [constantToDelete, setConstantToDelete] = useState<SystemConstant | null>(null);
  const [isSavingConstant, setIsSavingConstant] = useState(false);

  // Tests & Questions
  const [testStats, setTestStats] = useState<{
    totalCompleted: number;
    averageTimeMinutes: number;
    completionRatePercent: number;
    customQuestions: any[];
  }>({
    totalCompleted: 0,
    averageTimeMinutes: 0,
    completionRatePercent: 0,
    customQuestions: []
  });

  // Question Form State
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState('A');
  const [newQuestionArea, setNewQuestionArea] = useState('Artes, Creatividad y Diseño');
  const [newQuestionTopic, setNewQuestionTopic] = useState('');

  // Daily Challenges (Pregunta del Día) State
  const [challengesList, setChallengesList] = useState<any[]>([]);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [editingChallengeId, setEditingChallengeId] = useState<string | null>(null);
  const [challengeQuestion, setChallengeQuestion] = useState('');
  const [challengeOptions, setChallengeOptions] = useState<string[]>(['', '', '', '']);
  const [challengeActive, setChallengeActive] = useState(true);
  const [isSavingChallenge, setIsSavingChallenge] = useState(false);

  // Challenge Stats Modal State
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [selectedChallengeStats, setSelectedChallengeStats] = useState<any | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

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
      } else if (tab === 'constants') {
        await loadConstants();
      } else if (tab === 'challenges') {
        const res = await fetchWithAuth('/api/admin/daily-challenges');
        if (res.ok) {
          const data = await res.json();
          setChallengesList(data.challenges || []);
        }
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

  const loadConstants = async () => {
    try {
      const res = await fetchWithAuth('/api/admin/constants');
      if (res.ok) {
        const data = await res.json();
        setConstantsList(data.constants || []);
        return;
      }
      // Fallback constants si la API responde 404 (ej: Vercel modo estático)
      const fallbackConstants: SystemConstant[] = [
        {
          key: 'MIN_VOCATIONAL_MATCH_PERCENTAGE',
          value: '55',
          category: 'vocational',
          description: 'Porcentaje mínimo de afinidad para recomendar una carrera al estudiante',
          dataType: 'number',
          updatedAt: new Date().toISOString(),
          updatedBy: 'system'
        },
        {
          key: 'RIASEC_WEIGHT_ALGORITHM',
          value: 'balanced',
          category: 'vocational',
          description: 'Modelo de cálculo para dimensiones de Holland (balanced, intensive o conservative)',
          dataType: 'string',
          updatedAt: new Date().toISOString(),
          updatedBy: 'system'
        },
        {
          key: 'MAX_COMPARE_CAREERS_LIMIT',
          value: '3',
          category: 'limits',
          description: 'Límite máximo de carreras que un usuario puede añadir al comparador interactivo',
          dataType: 'number',
          updatedAt: new Date().toISOString(),
          updatedBy: 'system'
        },
        {
          key: 'SESSION_EXPIRATION_HOURS',
          value: '72',
          category: 'security',
          description: 'Tiempo de vida en horas del token de sesión autenticada',
          dataType: 'number',
          updatedAt: new Date().toISOString(),
          updatedBy: 'system'
        },
        {
          key: 'ALLOW_GUEST_TEST_EXPLORATION',
          value: 'true',
          category: 'platform',
          description: 'Permite a visitantes sin cuenta resolver un test preliminar antes de registrarse',
          dataType: 'boolean',
          updatedAt: new Date().toISOString(),
          updatedBy: 'system'
        },
        {
          key: 'TTS_SPEECH_DEFAULT_RATE',
          value: '0.95',
          category: 'platform',
          description: 'Velocidad de locución predeterminada para el motor de voz (0.5 a 1.5)',
          dataType: 'number',
          updatedAt: new Date().toISOString(),
          updatedBy: 'system'
        },
        {
          key: 'PLATFORM_STATUS_BANNER',
          value: 'operational',
          category: 'platform',
          description: 'Estado global del servicio: operational, maintenance o admissions_active',
          dataType: 'string',
          updatedAt: new Date().toISOString(),
          updatedBy: 'system'
        }
      ];
      setConstantsList(fallbackConstants);
    } catch (err) {
      console.error('Error loading constants:', err);
    }
  };

  const handleChangeUserRole = async (user: any, newRole: 'admin' | 'user') => {
    try {
      const res = await fetchWithAuth(`/api/admin/users/${user.id}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        onShowToast(
          'Rol actualizado', 
          `El rol de ${user.name} ahora es ${newRole === 'admin' ? 'Administrador' : 'Estudiante'}.`, 
          'success'
        );
        setUserToChangeRole(null);
        await loadUsers();
      } else {
        const data = await res.json();
        onShowToast('Error', data.error || 'No se pudo cambiar el rol.', 'error');
      }
    } catch (err) {
      onShowToast('Error', 'Fallo al comunicarse con el servidor.', 'error');
    }
  };

  const handleToggleUserStatus = async (user: any) => {
    const nextStatus = user.status === 'suspended' ? 'active' : 'suspended';
    try {
      const res = await fetchWithAuth(`/api/admin/users/${user.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        onShowToast(
          nextStatus === 'active' ? 'Cuenta activada' : 'Cuenta suspendida',
          `El acceso de ${user.name} ha sido ${nextStatus === 'active' ? 'habilitado' : 'suspendido'}.`,
          nextStatus === 'active' ? 'success' : 'info'
        );
        await loadUsers();
      } else {
        const data = await res.json();
        onShowToast('Error', data.error || 'No se pudo modificar el estado.', 'error');
      }
    } catch (err) {
      onShowToast('Error', 'Fallo de conexión al servidor.', 'error');
    }
  };

  const handleDeleteUser = async (user: any) => {
    try {
      const res = await fetchWithAuth(`/api/admin/users/${user.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        onShowToast('Usuario eliminado', `Se eliminó a ${user.name} de la base de datos.`, 'success');
        setUserToDelete(null);
        await loadUsers();
      } else {
        const data = await res.json();
        onShowToast('Error', data.error || 'No se pudo eliminar el usuario.', 'error');
      }
    } catch (err) {
      onShowToast('Error', 'Fallo al eliminar el usuario.', 'error');
    }
  };

  const handleOpenNewConstantModal = () => {
    setConstantFormData({
      key: '',
      value: '',
      category: 'platform',
      description: '',
      dataType: 'string'
    });
    setIsEditingConstant(false);
    setIsConstantModalOpen(true);
  };

  const handleOpenEditConstantModal = (c: SystemConstant) => {
    setConstantFormData({
      key: c.key,
      value: c.value,
      category: c.category,
      description: c.description,
      dataType: c.dataType
    });
    setIsEditingConstant(true);
    setIsConstantModalOpen(true);
  };

  const handleSaveConstant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!constantFormData.key.trim()) {
      onShowToast('Campo requerido', 'Ingresa la clave (Key) de la constante.', 'error');
      return;
    }
    if (constantFormData.value === undefined || constantFormData.value === '') {
      onShowToast('Campo requerido', 'Ingresa el valor de la constante.', 'error');
      return;
    }

    setIsSavingConstant(true);
    try {
      const endpoint = isEditingConstant 
        ? `/api/admin/constants/${encodeURIComponent(constantFormData.key)}`
        : '/api/admin/constants';
      const method = isEditingConstant ? 'PUT' : 'POST';

      const res = await fetchWithAuth(endpoint, {
        method,
        body: JSON.stringify(constantFormData)
      });

      if (res.ok) {
        onShowToast(
          isEditingConstant ? 'Constante actualizada' : 'Constante creada',
          `La variable ${constantFormData.key} se guardó exitosamente en la base de datos.`,
          'success'
        );
        setIsConstantModalOpen(false);
        await loadConstants();
      } else {
        const data = await res.json();
        onShowToast('Error', data.error || 'No se pudo guardar la constante.', 'error');
      }
    } catch (err) {
      onShowToast('Error', 'Error al sincronizar con la base de datos.', 'error');
    } finally {
      setIsSavingConstant(false);
    }
  };

  const handleDeleteConstant = async (constant: SystemConstant) => {
    try {
      const res = await fetchWithAuth(`/api/admin/constants/${encodeURIComponent(constant.key)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        onShowToast('Constante eliminada', `La variable ${constant.key} ha sido removida.`, 'success');
        setConstantToDelete(null);
        await loadConstants();
      } else {
        const data = await res.json();
        onShowToast('Error', data.error || 'No se pudo eliminar la constante.', 'error');
      }
    } catch (err) {
      onShowToast('Error', 'Error al procesar eliminación.', 'error');
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'No registrada';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (_) {
      return isoString;
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
        return;
      }

      // Fallback a Firestore para despliegues estáticos en Vercel
      if (res.status === 404) {
        try {
          const { collection, getDocs } = await import('firebase/firestore');
          const { db } = await import('../lib/firebase');
          const snap = await getDocs(collection(db, 'users'));
          const fsUsers: any[] = [];
          snap.forEach(docSnap => {
            const u = docSnap.data();
            fsUsers.push({
              id: docSnap.id,
              name: u.name || 'Estudiante',
              email: u.email || '',
              role: u.role || 'user',
              status: u.status || 'active',
              age: u.age || 17,
              educationLevel: u.educationLevel || 'Secundaria / Bachillerato',
              city: u.city || '',
              country: u.country || 'Colombia',
              createdAt: u.createdAt || new Date().toISOString(),
              testsCount: (u.testHistory || []).length,
              savedCareersCount: (u.savedCareers || []).length
            });
          });
          if (fsUsers.length > 0) {
            setUsersList(fsUsers);
          }
        } catch (fsErr) {
          console.warn('[AdminDashboard] Fallback Firestore users:', fsErr);
        }
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

  // Challenge / Dinámica del Día Handlers
  const handleOpenCreateChallenge = () => {
    setEditingChallengeId(null);
    setChallengeQuestion('');
    setChallengeOptions(['', '', '', '']);
    setChallengeActive(true);
    setIsChallengeModalOpen(true);
  };

  const handleOpenEditChallenge = (ch: any) => {
    setEditingChallengeId(ch.id);
    setChallengeQuestion(ch.question);
    const opts = Array.isArray(ch.options) && ch.options.length >= 2 ? ch.options : ['', ''];
    setChallengeOptions(opts);
    setChallengeActive(ch.active === true || ch.active === 1);
    setIsChallengeModalOpen(true);
  };

  const handleAddOptionField = () => {
    if (challengeOptions.length < 6) {
      setChallengeOptions([...challengeOptions, '']);
    }
  };

  const handleRemoveOptionField = (idx: number) => {
    if (challengeOptions.length > 2) {
      setChallengeOptions(challengeOptions.filter((_, i) => i !== idx));
    }
  };

  const handleOptionChange = (idx: number, val: string) => {
    const updated = [...challengeOptions];
    updated[idx] = val;
    setChallengeOptions(updated);
  };

  const handleSaveChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeQuestion.trim()) {
      onShowToast('Pregunta obligatoria', 'Por favor ingresa el texto de la dinámica.', 'error');
      return;
    }
    const cleanOpts = challengeOptions.map(o => o.trim()).filter(Boolean);
    if (cleanOpts.length < 2) {
      onShowToast('Opciones insuficientes', 'Escribe al menos dos opciones de respuesta válidas.', 'error');
      return;
    }

    setIsSavingChallenge(true);
    try {
      const url = editingChallengeId 
        ? `/api/admin/daily-challenges/${editingChallengeId}`
        : '/api/admin/daily-challenges';
      const method = editingChallengeId ? 'PUT' : 'POST';

      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify({
          question: challengeQuestion.trim(),
          options: cleanOpts,
          active: challengeActive
        })
      });

      if (res.ok) {
        onShowToast(
          editingChallengeId ? 'Dinámica actualizada' : 'Dinámica creada',
          'Los cambios se guardaron exitosamente en el servidor.',
          'success'
        );
        setIsChallengeModalOpen(false);
        loadTabContent('challenges');
      } else {
        const err = await res.json();
        onShowToast('Error al guardar', err.error || 'No se pudo guardar la dinámica.', 'error');
      }
    } catch (err) {
      onShowToast('Error de conexión', 'No fue posible comunicar con el servidor.', 'error');
    } finally {
      setIsSavingChallenge(false);
    }
  };

  const handleToggleChallengeActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetchWithAuth(`/api/admin/daily-challenges/${id}/toggle`, {
        method: 'PATCH',
        body: JSON.stringify({ active: !currentActive })
      });
      if (res.ok) {
        onShowToast(
          !currentActive ? 'Dinámica Activada' : 'Dinámica Desactivada',
          !currentActive ? 'Ahora los estudiantes verán esta pregunta en la página.' : 'La dinámica fue pausada.',
          'info'
        );
        loadTabContent('challenges');
      }
    } catch (err) {
      console.error('Error toggling challenge active:', err);
    }
  };

  const handleDeleteChallenge = async (id: string) => {
    if (!confirm('¿Deseas eliminar permanentemente esta pregunta del día y todos sus votos registrados?')) return;
    try {
      const res = await fetchWithAuth(`/api/admin/daily-challenges/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        onShowToast('Dinámica eliminada', 'La pregunta fue removida de la base de datos.', 'info');
        loadTabContent('challenges');
      }
    } catch (err) {
      console.error('Error deleting challenge:', err);
    }
  };

  const handleOpenStats = async (id: string) => {
    setIsLoadingStats(true);
    setIsStatsModalOpen(true);
    setSelectedChallengeStats(null);
    try {
      const res = await fetchWithAuth(`/api/admin/daily-challenges/${id}/stats`);
      if (res.ok) {
        const data = await res.json();
        setSelectedChallengeStats(data);
      } else {
        onShowToast('Error', 'No se pudieron consultar las estadísticas.', 'error');
      }
    } catch (err) {
      console.error('Error loading challenge stats:', err);
    } finally {
      setIsLoadingStats(false);
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
          { id: 'users', label: 'Gestión de Personas', icon: Users },
          { id: 'constants', label: 'Constantes del Sistema', icon: Database },
          { id: 'challenges', label: 'Pregunta del Día', icon: MessageSquareQuote },
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
                  {overviewData.totalTests > 0 && overviewData.averageMatch > 0 ? `${overviewData.averageMatch}%` : 'Sin tests'}
                </h3>
                <p className="text-[11px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>{overviewData.totalTests > 0 ? 'Ponderación vocacional real' : 'Pendiente de tests completados'}</span>
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

          {/* Demographics & Recent Users Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Distribution & Metrics */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Edades y Demografía de Estudiantes
                  </h3>
                  <p className="text-xs text-slate-500">
                    Promedio general y distribución por rangos de edad
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-2xl bg-purple-100 text-purple-900 font-bold text-xs flex items-center gap-1 border border-purple-200">
                  <span>Promedio:</span>
                  <span className="font-mono text-sm">
                    {overviewData.ageStats?.averageAge && overviewData.ageStats.averageAge > 0 
                      ? `${overviewData.ageStats.averageAge} años` 
                      : 'Sin datos'}
                  </span>
                </div>
              </div>

              {/* Age Range Progress Bars */}
              <div className="space-y-3 pt-2">
                {[
                  { range: '12-15', label: '12 a 15 años (Secundaria / Exploración)', color: 'from-pink-500 to-rose-500' },
                  { range: '16-17', label: '16 a 17 años (Bachillerato / Preuniversitario)', color: 'from-purple-500 to-indigo-500' },
                  { range: '18-20', label: '18 a 20 años (Educación Superior / Jóvenes)', color: 'from-blue-500 to-cyan-500' },
                  { range: '21-24', label: '21 a 24 años (Especialización / Empleo)', color: 'from-emerald-500 to-teal-500' },
                  { range: '25+', label: '25 años o más (Reorientación Profesional)', color: 'from-amber-500 to-orange-500' }
                ].map(item => {
                  const rangeCount = (overviewData.ageStats?.usersByAgeRange as Record<string, number>)?.[item.range] || 0;
                  const totalUsers = overviewData.totalUsers || 1;
                  const pct = Math.round((rangeCount / totalUsers) * 100);

                  return (
                    <div key={item.range} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>{item.label}</span>
                        <span className="font-mono text-purple-900 font-bold">
                          {rangeCount} estudiantes ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700`}
                          style={{ width: `${Math.max(pct, rangeCount > 0 ? 5 : 0)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between text-xs text-slate-600">
                <span>Rango detectado:</span>
                <span className="font-bold text-purple-900">
                  {overviewData.ageStats?.minAge && overviewData.ageStats.maxAge
                    ? `Desde los ${overviewData.ageStats.minAge} hasta los ${overviewData.ageStats.maxAge} años`
                    : 'Sin edades suficientes'}
                </span>
              </div>
            </div>

            {/* Recently Registered Users */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Usuarios Registrados Recientemente
                  </h3>
                  <p className="text-xs text-slate-500">
                    Últimas cuentas creadas en la plataforma
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('users')}
                  className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
                >
                  <span>Ver todos</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {(overviewData.recentUsers && overviewData.recentUsers.length > 0) ? (
                  overviewData.recentUsers.slice(0, 5).map(ru => (
                    <div key={ru.id} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-400 to-purple-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                          {ru.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">{ru.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{ru.email} • {ru.age} años</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('users');
                            handleOpenUserDetail(ru.id);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-[11px] transition-colors"
                        >
                          Ver ficha
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 py-4 text-center">No hay registros recientes.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: GESTIÓN DE PERSONAS / USUARIOS REGISTRADOS (VISTA 1)
          ========================================================================= */}
      {!isLoading && activeTab === 'users' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Summary Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Usuarios</p>
              <p className="text-2xl font-black text-slate-900 mt-1 font-['Outfit',sans-serif]">{usersList.length}</p>
            </div>
            <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Estudiantes</p>
              <p className="text-2xl font-black text-purple-700 mt-1 font-['Outfit',sans-serif]">
                {usersList.filter(u => u.role !== 'admin').length}
              </p>
            </div>
            <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Administradores</p>
              <p className="text-2xl font-black text-indigo-700 mt-1 font-['Outfit',sans-serif]">
                {usersList.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Cuentas Activas</p>
              <p className="text-2xl font-black text-emerald-700 mt-1 font-['Outfit',sans-serif]">
                {usersList.filter(u => u.status !== 'suspended').length}
              </p>
            </div>
          </div>

          {/* User Filtering Controls Bar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs space-y-3">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              {/* Search by Name or Email */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-search-users-input"
                  type="text"
                  placeholder="Buscar por nombre o correo electrónico..."
                  value={userSearchTerm}
                  onChange={e => setUserSearchTerm(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && loadUsers()}
                  className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-purple-400 text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Fast Filter Dropdowns */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {/* Role Filter */}
                <select
                  id="admin-filter-role"
                  value={userRoleFilter}
                  onChange={e => setUserRoleFilter(e.target.value as any)}
                  className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700"
                >
                  <option value="all">Todos los roles</option>
                  <option value="user">Solo Estudiantes</option>
                  <option value="admin">Solo Administradores</option>
                </select>

                {/* Status Filter */}
                <select
                  id="admin-filter-status"
                  value={userStatusFilter}
                  onChange={e => setUserStatusFilter(e.target.value as any)}
                  className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700"
                >
                  <option value="all">Todos los estados</option>
                  <option value="active">Activos</option>
                  <option value="suspended">Suspendidos</option>
                </select>

                {/* Age Filter */}
                <select
                  id="admin-filter-age"
                  value={userAgeFilter}
                  onChange={e => setUserAgeFilter(e.target.value)}
                  className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700"
                >
                  <option value="all">Todas las edades</option>
                  <option value="12-15">12 a 15 años</option>
                  <option value="16-18">16 a 18 años</option>
                  <option value="19-24">19 a 24 años</option>
                  <option value="25+">25 o más</option>
                </select>

                <button
                  id="admin-apply-user-filters-btn"
                  onClick={loadUsers}
                  className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Actualizar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Users Table */}
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5 sm:p-4">Nombre Completo</th>
                    <th className="p-3.5 sm:p-4">Correo Electrónico</th>
                    <th className="p-3.5 sm:p-4">Fecha de Registro</th>
                    <th className="p-3.5 sm:p-4">Rol Actual</th>
                    <th className="p-3.5 sm:p-4">Estado</th>
                    <th className="p-3.5 sm:p-4 text-center">Tests</th>
                    <th className="p-3.5 sm:p-4 text-right">Acciones de Gestión</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usersList
                    .filter(u => {
                      if (userRoleFilter !== 'all' && u.role !== userRoleFilter) return false;
                      if (userStatusFilter !== 'all') {
                        const st = u.status || 'active';
                        if (st !== userStatusFilter) return false;
                      }
                      return true;
                    })
                    .length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-slate-400">
                        No se encontraron usuarios que coincidan con los filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    usersList
                      .filter(u => {
                        if (userRoleFilter !== 'all' && u.role !== userRoleFilter) return false;
                        if (userStatusFilter !== 'all') {
                          const st = u.status || 'active';
                          if (st !== userStatusFilter) return false;
                        }
                        return true;
                      })
                      .map(u => {
                        const isSuspended = u.status === 'suspended';
                        return (
                          <tr key={u.id} className="hover:bg-purple-50/40 transition-colors">
                            {/* Column 1: Nombre */}
                            <td className="p-3.5 sm:p-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-2xl ${u.avatarColor || 'bg-gradient-to-tr from-pink-400 to-purple-500'} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                                  {u.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-slate-900 leading-tight truncate">{u.name}</p>
                                  <p className="text-[10px] text-slate-400">{u.city || 'Colombia'} • {u.age || 17} años</p>
                                </div>
                              </div>
                            </td>

                            {/* Column 2: Correo electrónico */}
                            <td className="p-3.5 sm:p-4 font-mono text-[11px] text-slate-600">
                              <span className="truncate max-w-[200px] block" title={u.email}>
                                {u.email}
                              </span>
                            </td>

                            {/* Column 3: Fecha de registro */}
                            <td className="p-3.5 sm:p-4 text-slate-600 text-[11px]">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>{formatDate(u.createdAt)}</span>
                              </div>
                            </td>

                            {/* Column 4: Rol actual */}
                            <td className="p-3.5 sm:p-4">
                              {u.role === 'admin' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-200 shadow-xs">
                                  <ShieldCheck className="w-3 h-3 text-purple-700" />
                                  <span>Administrador</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                  <Users className="w-3 h-3 text-slate-500" />
                                  <span>Estudiante</span>
                                </span>
                              )}
                            </td>

                            {/* Column 5: Estado de la cuenta */}
                            <td className="p-3.5 sm:p-4">
                              {isSuspended ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                                  <UserX className="w-3 h-3 text-rose-600" />
                                  <span>Suspendida</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>Activa</span>
                                </span>
                              )}
                            </td>

                            {/* Column 6: Tests */}
                            <td className="p-3.5 sm:p-4 text-center font-bold text-purple-700 font-mono">
                              {u.testsCount}
                            </td>

                            {/* Column 7: Acciones */}
                            <td className="p-3.5 sm:p-4 text-right">
                              <div className="inline-flex items-center gap-1 sm:gap-1.5">
                                {/* Ver Ficha */}
                                <button
                                  id={`admin-user-view-${u.id}`}
                                  type="button"
                                  onClick={() => handleOpenUserDetail(u.id)}
                                  className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold transition-colors"
                                  title="Ver ficha completa y resultados"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {/* Cambiar Rol */}
                                <button
                                  id={`admin-user-role-${u.id}`}
                                  type="button"
                                  onClick={() => setUserToChangeRole(u)}
                                  className="px-2 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-[11px] transition-colors flex items-center gap-1"
                                  title="Cambiar rol entre Estudiante y Administrador"
                                >
                                  <ShieldCheck className="w-3 h-3" />
                                  <span className="hidden sm:inline">Rol</span>
                                </button>

                                {/* Toggle Estado (Activar/Desactivar) */}
                                <button
                                  id={`admin-user-status-${u.id}`}
                                  type="button"
                                  onClick={() => handleToggleUserStatus(u)}
                                  className={`p-1.5 rounded-xl transition-colors ${
                                    isSuspended
                                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                                      : 'bg-amber-50 hover:bg-amber-100 text-amber-700'
                                  }`}
                                  title={isSuspended ? 'Habilitar cuenta' : 'Desactivar o suspender cuenta'}
                                >
                                  {isSuspended ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                                </button>

                                {/* Eliminar Usuario */}
                                <button
                                  id={`admin-user-delete-${u.id}`}
                                  type="button"
                                  onClick={() => setUserToDelete(u)}
                                  className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition-colors"
                                  title="Eliminar usuario de la plataforma"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal 1: User Detail Profile */}
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
                      <p className="text-xs text-slate-500">{selectedUserDetail.email} • Rol: <strong className="text-purple-700">{selectedUserDetail.role}</strong></p>
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

                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-800">Historial de Evaluaciones RIASEC</h4>
                  {selectedUserDetail.testHistory?.length === 0 ? (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs text-slate-500">
                      Este estudiante aún no ha completado el test vocacional en la plataforma.
                    </div>
                  ) : (
                    selectedUserDetail.testHistory?.map((t: any, i: number) => (
                      <div key={i} className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-purple-900">{t.profileTitle}</span>
                          <span className="text-[11px] text-slate-500">{new Date(t.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-600">{t.profileDescription}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {t.recommendedCareers?.slice(0, 4).map((rc: any, idx: number) => {
                            const careerObj = COMPREHENSIVE_CAREERS_DATA.find(c => c.id === rc.careerId);
                            return (
                              <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-purple-900 font-semibold text-[11px] shadow-2xs">
                                {careerObj?.name || rc.careerId} ({rc.matchPercentage}%)
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Carreras de Interés / Seleccionadas por el Estudiante */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-800">Carreras Seleccionadas y Guardadas</h4>
                    <span className="text-xs font-semibold text-pink-600">
                      {selectedUserDetail.savedCareers?.length || 0} de interés
                    </span>
                  </div>

                  {!selectedUserDetail.savedCareers || selectedUserDetail.savedCareers.length === 0 ? (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs text-slate-500">
                      El estudiante no ha guardado carreras profesionales en su lista de favoritos todavía.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedUserDetail.savedCareers.map((cid: string) => {
                        const careerObj = COMPREHENSIVE_CAREERS_DATA.find(c => c.id === cid);
                        return (
                          <div
                            key={cid}
                            className="p-3 rounded-2xl bg-pink-50/50 border border-pink-100 flex items-center gap-2.5 text-xs text-slate-800"
                          >
                            <span className="text-base">🎓</span>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold truncate text-pink-950">{careerObj?.name || cid}</p>
                              <p className="text-[10px] text-slate-500 capitalize">{careerObj?.area || 'Carrera Profesional'}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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

          {/* Modal 2: Change Role Confirmation */}
          {userToChangeRole && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Modificar Rol de Usuario</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Usuario: <strong className="text-slate-800">{userToChangeRole.name}</strong> ({userToChangeRole.email})
                  </p>
                  <p className="text-xs text-slate-600 mt-2">
                    Rol actual: <span className="font-bold uppercase text-purple-700">{userToChangeRole.role}</span>.
                    Selecciona el nuevo rol a asignar en la base de datos:
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleChangeUserRole(userToChangeRole, 'user')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left ${
                      userToChangeRole.role === 'user'
                        ? 'border-purple-600 bg-purple-50 text-purple-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <p className="font-bold">Estudiante</p>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">Acceso al test, carreras y perfil vocacional.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChangeUserRole(userToChangeRole, 'admin')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left ${
                      userToChangeRole.role === 'admin'
                        ? 'border-purple-600 bg-purple-50 text-purple-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <p className="font-bold text-indigo-700">Administrador</p>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">Acceso al panel /admin, métricas y constantes.</p>
                  </button>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setUserToChangeRole(null)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal 3: Delete User Confirmation */}
          {userToDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">¿Eliminar Usuario de la Plataforma?</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Esta acción eliminará de forma irreversible a <strong className="text-slate-900">{userToDelete.name}</strong> ({userToDelete.email}), incluyendo sus evaluaciones vocacionales y favoritos.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setUserToDelete(null)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(userToDelete)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md"
                  >
                    Confirmar Eliminación
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB: GESTIÓN DE CONSTANTES / DATOS DEL SISTEMA (VISTA 2)
          ========================================================================= */}
      {!isLoading && activeTab === 'constants' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Card & Actions */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-purple-100 text-purple-700">
                  <Database className="w-4 h-4" />
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Constantes y Parámetros Globales del Sistema
                </h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Monitorea, edita y agrega en tiempo real las variables operativas, parámetros del algoritmo RIASEC, límites de sesión y directivas de la aplicación web.
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <button
                id="admin-reload-constants-btn"
                type="button"
                onClick={loadConstants}
                className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                title="Recargar constantes desde la base de datos"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refrescar</span>
              </button>

              <button
                id="admin-create-constant-btn"
                type="button"
                onClick={handleOpenNewConstantModal}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Constante</span>
              </button>
            </div>
          </div>

          {/* Filtering and Search for Constants */}
          <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-search-constants-input"
                type="text"
                placeholder="Buscar constante por clave, descripción o valor..."
                value={constantSearchTerm}
                onChange={e => setConstantSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-purple-400 text-slate-800"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Categoría:</span>
              {[
                { id: 'all', label: 'Todas' },
                { id: 'vocational', label: 'Vocacional' },
                { id: 'security', label: 'Seguridad' },
                { id: 'platform', label: 'Plataforma' },
                { id: 'limits', label: 'Límites' },
                { id: 'notifications', label: 'Notificaciones' }
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setConstantCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    constantCategoryFilter === cat.id
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Constants Table */}
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5 sm:p-4">Clave del Sistema (Key)</th>
                    <th className="p-3.5 sm:p-4">Categoría</th>
                    <th className="p-3.5 sm:p-4">Tipo</th>
                    <th className="p-3.5 sm:p-4">Valor Actual</th>
                    <th className="p-3.5 sm:p-4">Descripción y Propósito</th>
                    <th className="p-3.5 sm:p-4">Última Actualización</th>
                    <th className="p-3.5 sm:p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {constantsList
                    .filter(c => {
                      if (constantCategoryFilter !== 'all' && c.category !== constantCategoryFilter) return false;
                      if (constantSearchTerm.trim()) {
                        const term = constantSearchTerm.toLowerCase();
                        if (
                          !c.key.toLowerCase().includes(term) &&
                          !c.description.toLowerCase().includes(term) &&
                          !String(c.value).toLowerCase().includes(term)
                        ) {
                          return false;
                        }
                      }
                      return true;
                    })
                    .length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-slate-400">
                        No se encontraron constantes que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ) : (
                    constantsList
                      .filter(c => {
                        if (constantCategoryFilter !== 'all' && c.category !== constantCategoryFilter) return false;
                        if (constantSearchTerm.trim()) {
                          const term = constantSearchTerm.toLowerCase();
                          if (
                            !c.key.toLowerCase().includes(term) &&
                            !c.description.toLowerCase().includes(term) &&
                            !String(c.value).toLowerCase().includes(term)
                          ) {
                            return false;
                          }
                        }
                        return true;
                      })
                      .map(c => {
                        const categoryBadgeColors: Record<string, string> = {
                          vocational: 'bg-purple-100 text-purple-900 border-purple-200',
                          security: 'bg-rose-100 text-rose-900 border-rose-200',
                          platform: 'bg-blue-100 text-blue-900 border-blue-200',
                          limits: 'bg-emerald-100 text-emerald-900 border-emerald-200',
                          notifications: 'bg-amber-100 text-amber-900 border-amber-200'
                        };
                        const badgeClass = categoryBadgeColors[c.category] || 'bg-slate-100 text-slate-800 border-slate-200';

                        return (
                          <tr key={c.key} className="hover:bg-purple-50/40 transition-colors">
                            {/* Key */}
                            <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900">
                              <span className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-purple-900">
                                {c.key}
                              </span>
                            </td>

                            {/* Category */}
                            <td className="p-3.5 sm:p-4">
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${badgeClass}`}>
                                {c.category}
                              </span>
                            </td>

                            {/* Type */}
                            <td className="p-3.5 sm:p-4 font-mono text-[10px] text-slate-500 uppercase">
                              {c.dataType}
                            </td>

                            {/* Value */}
                            <td className="p-3.5 sm:p-4">
                              <span className="font-mono font-bold text-xs text-indigo-900 bg-indigo-50/80 px-2 py-1 rounded-md border border-indigo-100">
                                {c.value}
                              </span>
                            </td>

                            {/* Description */}
                            <td className="p-3.5 sm:p-4 text-slate-600 max-w-xs truncate" title={c.description}>
                              {c.description || 'Sin descripción'}
                            </td>

                            {/* Updated */}
                            <td className="p-3.5 sm:p-4 text-[11px] text-slate-500">
                              <p>{formatDate(c.updatedAt)}</p>
                              {c.updatedBy && <p className="text-[10px] text-slate-400">Por: {c.updatedBy}</p>}
                            </td>

                            {/* Actions */}
                            <td className="p-3.5 sm:p-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  id={`admin-edit-constant-${c.key}`}
                                  type="button"
                                  onClick={() => handleOpenEditConstantModal(c)}
                                  className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold transition-colors"
                                  title="Editar constante"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  id={`admin-delete-constant-${c.key}`}
                                  type="button"
                                  onClick={() => setConstantToDelete(c)}
                                  className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition-colors"
                                  title="Eliminar constante"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal: Create or Edit Constant Form */}
          {isConstantModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
              <form onSubmit={handleSaveConstant} className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-2xl bg-purple-100 text-purple-700">
                      <Key className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">
                        {isEditingConstant ? 'Modificar Constante del Sistema' : 'Nueva Constante Global'}
                      </h3>
                      <p className="text-xs text-slate-500">Parámetro sincronizado en tiempo real con la base de datos</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsConstantModalOpen(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Key */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Clave / Identificador (Key) *
                    </label>
                    <input
                      type="text"
                      disabled={isEditingConstant}
                      value={constantFormData.key}
                      onChange={e => setConstantFormData(prev => ({ ...prev, key: e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, '_') }))}
                      placeholder="EJ: MIN_VOCATIONAL_MATCH_PERCENTAGE"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:ring-2 focus:ring-purple-400 focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-500"
                      required
                    />
                    <p className="text-[10px] text-slate-400 mt-0.5">Letras mayúsculas, números y guiones bajos únicamente.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Category */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Categoría</label>
                      <select
                        value={constantFormData.category}
                        onChange={e => setConstantFormData(prev => ({ ...prev, category: e.target.value as any }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                      >
                        <option value="vocational">Vocacional & Algoritmo</option>
                        <option value="security">Seguridad & Sesión</option>
                        <option value="platform">Plataforma & UI</option>
                        <option value="limits">Límites & Cuotas</option>
                        <option value="notifications">Notificaciones</option>
                      </select>
                    </div>

                    {/* Data Type */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tipo de Dato</label>
                      <select
                        value={constantFormData.dataType}
                        onChange={e => setConstantFormData(prev => ({ ...prev, dataType: e.target.value as any }))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono"
                      >
                        <option value="string">String (Texto)</option>
                        <option value="number">Number (Numérico)</option>
                        <option value="boolean">Boolean (true / false)</option>
                        <option value="json">JSON (Estructura)</option>
                      </select>
                    </div>
                  </div>

                  {/* Value */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Valor Actual *
                    </label>
                    <input
                      type="text"
                      value={constantFormData.value}
                      onChange={e => setConstantFormData(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="Valor del parámetro..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:ring-2 focus:ring-purple-400 focus:outline-hidden"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Descripción y Propósito Funcional
                    </label>
                    <textarea
                      rows={2}
                      value={constantFormData.description}
                      onChange={e => setConstantFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Explica qué regla o comportamiento controla esta constante en la aplicación..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-purple-400 focus:outline-hidden resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsConstantModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingConstant}
                    className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSavingConstant ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>Guardar Constante</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Modal: Delete Constant Confirmation */}
          {constantToDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">¿Eliminar Constante del Sistema?</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    ¿Estás seguro de que deseas eliminar la constante <strong className="font-mono text-purple-900">{constantToDelete.key}</strong>?
                    Los módulos que dependan de este valor adoptarán su comportamiento predeterminado.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setConstantToDelete(null)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteConstant(constantToDelete)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md"
                  >
                    Eliminar Parámetro
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB: PREGUNTA O DINÁMICA DEL DÍA
          ========================================================================= */}
      {!isLoading && activeTab === 'challenges' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Quick Stats for Daily Challenges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Preguntas Creadas</p>
                <h3 className="text-2xl font-black text-purple-700 mt-1 font-['Outfit',sans-serif]">
                  {challengesList.length}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <MessageSquareQuote className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Dinámica Activa</p>
                <h3 className="text-base font-black text-emerald-700 mt-1 truncate max-w-[200px] font-['Outfit',sans-serif]">
                  {challengesList.some(c => c.active === 1 || c.active === true) ? 'Publicada en Inicio' : 'Sin publicar'}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total de Respuestas</p>
                <h3 className="text-2xl font-black text-pink-700 mt-1 font-['Outfit',sans-serif]">
                  {challengesList.reduce((acc, c) => acc + (c.totalVotes || 0), 0)}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center">
                <Vote className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Action Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-xs">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>Gestor de Dinámica o Pregunta del Día</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
                Crea preguntas interactivas para que los estudiantes participen diariamente, consulta las estadísticas de votos en tiempo real y administra las opciones de respuesta.
              </p>
            </div>

            <button
              id="admin-create-challenge-btn"
              type="button"
              onClick={handleOpenCreateChallenge}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-900/20 active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Pregunta del Día</span>
            </button>
          </div>

          {/* Challenges List */}
          {challengesList.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 space-y-3">
              <MessageSquareQuote className="w-10 h-10 text-purple-300 mx-auto" />
              <p className="font-bold text-slate-700 text-sm">No hay dinámicas del día registradas.</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Crea la primera pregunta interactiva para que los estudiantes compartan sus intereses vocacionales al ingresar a VocAcción.
              </p>
              <button
                onClick={handleOpenCreateChallenge}
                className="px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold transition-colors"
              >
                Crear primera pregunta
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {challengesList.map(ch => {
                const isActive = ch.active === 1 || ch.active === true;
                const opts: string[] = Array.isArray(ch.options) ? ch.options : [];
                const votes = ch.totalVotes || 0;

                return (
                  <div
                    key={ch.id}
                    className={`p-5 sm:p-6 rounded-3xl bg-white/80 backdrop-blur-xl border transition-all space-y-4 shadow-xs ${
                      isActive ? 'border-purple-300 ring-2 ring-purple-400/20' : 'border-slate-200/80 opacity-90'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>Publicada (Activa)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            Pausada (Inactiva)
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 font-mono">
                          ID: {ch.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 font-bold border border-purple-100 flex items-center gap-1">
                          <Vote className="w-3.5 h-3.5" />
                          <span>{votes} voto{votes === 1 ? '' : 's'}</span>
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          {new Date(ch.created_at || ch.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif] leading-snug">
                        {ch.question}
                      </h4>
                    </div>

                    {/* Options list preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {opts.map((opt, idx) => {
                        const stat = ch.stats?.find((s: any) => s.option === opt);
                        const pct = stat ? stat.percentage : 0;
                        const vCount = stat ? stat.votes : 0;

                        return (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2"
                          >
                            <span className="text-slate-700 truncate font-medium">
                              <strong className="text-purple-700 mr-1.5">{String.fromCharCode(65 + idx)}.</strong>
                              {opt}
                            </span>
                            {votes > 0 && (
                              <span className="text-[11px] font-bold text-purple-800 shrink-0 font-mono">
                                {pct}% ({vCount})
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* View Stats & Responses Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenStats(ch.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs transition-colors"
                        >
                          <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
                          <span>Ver Respuestas & Estadísticas</span>
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditChallenge(ch)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-slate-600" />
                          <span>Modificar</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Toggle Active Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleChallengeActive(ch.id, isActive)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            isActive
                              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          <span>{isActive ? 'Pausar dinámica' : 'Publicar en inicio'}</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteChallenge(ch.id)}
                          className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                          title="Eliminar dinámica"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Modal to Create or Edit Challenge */}
          {isChallengeModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
              <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <MessageSquareQuote className="w-5 h-5 text-purple-600" />
                    <span>{editingChallengeId ? 'Modificar Pregunta del Día' : 'Crear Nueva Pregunta del Día'}</span>
                  </div>
                  <button
                    onClick={() => setIsChallengeModalOpen(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveChallenge} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Enunciado / Pregunta para los estudiantes *
                    </label>
                    <textarea
                      id="admin-challenge-question-input"
                      rows={3}
                      value={challengeQuestion}
                      onChange={e => setChallengeQuestion(e.target.value)}
                      placeholder="Ej. Si pudieras resolver un gran reto para el mundo en los próximos 10 años, ¿en qué área te gustaría trabajar?"
                      className="w-full p-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-700 block">
                        Opciones de respuesta (mínimo 2, máximo 6) *
                      </label>
                      {challengeOptions.length < 6 && (
                        <button
                          type="button"
                          onClick={handleAddOptionField}
                          className="text-[11px] font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Añadir opción</span>
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {challengeOptions.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <input
                            type="text"
                            value={opt}
                            onChange={e => handleOptionChange(idx, e.target.value)}
                            placeholder={`Opción ${String.fromCharCode(65 + idx)}`}
                            className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-300"
                            required
                          />
                          {challengeOptions.length > 2 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveOptionField(idx)}
                              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                              title="Quitar opción"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-3">
                    <input
                      id="admin-challenge-active-checkbox"
                      type="checkbox"
                      checked={challengeActive}
                      onChange={e => setChallengeActive(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded-md focus:ring-purple-500 cursor-pointer"
                    />
                    <label htmlFor="admin-challenge-active-checkbox" className="text-xs text-slate-700 cursor-pointer select-none">
                      <strong className="block text-slate-900">Publicar inmediatamente como activa</strong>
                      <span>Aparecerá en el inicio para todos los estudiantes.</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsChallengeModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
                    >
                      Cancelar
                    </button>
                    <button
                      id="admin-save-challenge-submit-btn"
                      type="submit"
                      disabled={isSavingChallenge}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold transition-all shadow-md shadow-purple-900/20 active:scale-95"
                    >
                      {isSavingChallenge ? 'Guardando...' : (editingChallengeId ? 'Guardar Cambios' : 'Publicar Dinámica')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal to View Stats and Individual Student Responses */}
          {isStatsModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-100 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 font-['Outfit',sans-serif]">
                      Estadísticas y Respuestas de Estudiantes
                    </h3>
                    <p className="text-xs text-slate-500">Métricas acumuladas y desglose individual de votos</p>
                  </div>
                  <button
                    onClick={() => setIsStatsModalOpen(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {isLoadingStats ? (
                  <div className="p-8 text-center text-purple-700 text-sm font-semibold flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin text-purple-600" />
                    <span>Consultando votos en la base de datos...</span>
                  </div>
                ) : selectedChallengeStats ? (
                  <div className="space-y-5 text-xs">
                    {/* Question Summary */}
                    <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                        Pregunta
                      </span>
                      <p className="text-slate-900 font-bold text-sm leading-snug">
                        {selectedChallengeStats.challenge?.question}
                      </p>
                      <div className="flex items-center gap-3 pt-1 text-slate-500 text-[11px]">
                        <span>Total de votos: <strong className="text-purple-800">{selectedChallengeStats.totalVotes}</strong></span>
                        <span>Estado: <strong className={selectedChallengeStats.challenge?.active ? 'text-emerald-600' : 'text-slate-600'}>
                          {selectedChallengeStats.challenge?.active ? 'Activa' : 'Pausada'}
                        </strong></span>
                      </div>
                    </div>

                    {/* Option Percentages Graphic Breakdown */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                        <BarChart2 className="w-4 h-4 text-purple-600" />
                        <span>Distribución de Respuestas (%)</span>
                      </h4>

                      <div className="space-y-2.5">
                        {selectedChallengeStats.stats?.map((st: any, idx: number) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-700">
                                {String.fromCharCode(65 + idx)}. {st.option}
                              </span>
                              <span className="font-bold text-purple-800 font-mono">
                                {st.percentage}% ({st.votes} votos)
                              </span>
                            </div>
                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-500"
                                style={{ width: `${st.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Table of Individual Student Votes */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>Detalle de Participaciones ({selectedChallengeStats.votes?.length || 0})</span>
                      </h4>

                      {(!selectedChallengeStats.votes || selectedChallengeStats.votes.length === 0) ? (
                        <p className="text-slate-400 py-3 text-center">Aún no se registran respuestas para esta pregunta.</p>
                      ) : (
                        <div className="max-h-60 overflow-y-auto rounded-2xl border border-slate-100 divide-y divide-slate-100">
                          {selectedChallengeStats.votes.map((v: any, vIdx: number) => (
                            <div key={vIdx} className="p-3 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
                              <div>
                                <p className="font-bold text-slate-900 leading-tight">
                                  {v.userName}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {v.userEmail || 'Estudiante visitante'}
                                </p>
                              </div>

                              <div className="text-right">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">
                                  {v.optionText}
                                </span>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                  {new Date(v.votedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(v.votedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setIsStatsModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
                      >
                        Cerrar Estadísticas
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 py-4 text-center">No se encontraron datos.</p>
                )}
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
