import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { User, TestResult } from '../types';
import { 
  validateEmail, 
  isPasswordValid, 
  getMissingPasswordRequirements 
} from '../utils/authValidation';

const ACTIVE_USER_ID_KEY = 'vocaccion_active_user_id';
const ACTIVE_USER_EMAIL_KEY = 'vocaccion_active_user_email';
const ACTIVE_SESSION_FLAG = 'vocaccion_session_authenticated';
const CACHED_USER_KEY = 'vocaccion_cached_user';
const AUTH_TOKEN_KEY = 'vocaccion_auth_token';

export const INITIAL_DEMO_USER: User = {
  id: 'user-demo-valentina',
  name: 'Valentina Gómez',
  email: 'demo@vocaccion.edu',
  role: 'user',
  status: 'active',
  age: 17,
  educationLevel: 'Último año de Bachillerato / Secundaria',
  city: 'Bogotá',
  country: 'Colombia',
  avatarColor: 'bg-gradient-to-tr from-pink-400 to-purple-500',
  createdAt: '2026-08-01T10:00:00.000Z',
  savedCareers: ['ing-software-ia', 'diseno-digital-ux-ui', 'psicologia-clinica'],
  savedUniversities: ['uni-nacional', 'uni-andes'],
  savedScholarships: ['beca-lideres-del-manana', 'beca-talento-tech-global'],
  testHistory: [
    {
      id: 'test-res-demo-1',
      date: '2026-08-10T14:30:00.000Z',
      scores: {
        I: 88,
        A: 82,
        S: 65,
        R: 54,
        E: 48,
        C: 40
      },
      dominantTypes: ['I', 'A', 'S'],
      profileTitle: 'Investigador Creativo e Innovador (I-A)',
      profileDescription: 'Posees una extraordinaria combinación entre mente analítica y sensibilidad artística. Te apasiona resolver problemas mediante la innovación, el diseño y la tecnología con impacto humano.',
      topStrengths: [
        'Curiosidad científica y pensamiento abstracto',
        'Creatividad visual y resolución no convencional de problemas',
        'Capacidad de autoaprendizaje e investigación profunda',
        'Sensibilidad hacia el bienestar de los usuarios y la sociedad'
      ],
      recommendedCareers: [
        { careerId: 'ing-software-ia', matchPercentage: 96 },
        { careerId: 'diseno-digital-ux-ui', matchPercentage: 94 },
        { careerId: 'ciencia-datos-ia', matchPercentage: 91 },
        { careerId: 'ing-biomedica', matchPercentage: 88 },
        { careerId: 'arquitectura-urbanismo', matchPercentage: 85 }
      ],
      questionIdsAnswered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  ],
  answeredQuestionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
};

export class StorageController {
  private static currentUser: User | null = null;
  private static authListeners: ((user: User | null) => void)[] = [];

  private static notifyListeners(user: User | null) {
    this.currentUser = user;
    if (user) {
      try {
        localStorage.setItem(CACHED_USER_KEY, JSON.stringify(user));
        sessionStorage.setItem(ACTIVE_SESSION_FLAG, 'true');
        sessionStorage.setItem(ACTIVE_USER_ID_KEY, user.id);
        sessionStorage.setItem(ACTIVE_USER_EMAIL_KEY, user.email);
      } catch (_) {}
    } else {
      try {
        localStorage.removeItem(CACHED_USER_KEY);
        sessionStorage.removeItem(ACTIVE_SESSION_FLAG);
        sessionStorage.removeItem(ACTIVE_USER_ID_KEY);
        sessionStorage.removeItem(ACTIVE_USER_EMAIL_KEY);
      } catch (_) {}
    }

    this.authListeners.forEach(cb => {
      try {
        cb(user);
      } catch (err) {
        console.error('Error in auth listener callback:', err);
      }
    });
  }

  /**
   * Obtener token de sesión activo (Bearer)
   */
  static getAuthToken(): string | null {
    try {
      return sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (_) {
      return null;
    }
  }

  /**
   * Validar si el usuario actual cuenta con rol de Administrador
   */
  static isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  /**
   * Listen to Auth state changes and restore authenticated user profile if session exists
   */
  static initAuthListener(callback: (user: User | null) => void): () => void {
    this.authListeners.push(callback);

    const token = this.getAuthToken();
    const hasSession = sessionStorage.getItem(ACTIVE_SESSION_FLAG) === 'true';

    // Helper to load cached offline user
    const loadCachedUser = (): User | null => {
      try {
        const raw = localStorage.getItem(CACHED_USER_KEY);
        if (raw) {
          return JSON.parse(raw);
        }
      } catch (_) {}
      return null;
    };

    // 1. Verify via Server-side Bearer token
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Token inválido o expirado');
        })
        .then(data => {
          if (data?.user) {
            this.currentUser = data.user;
            sessionStorage.setItem(ACTIVE_SESSION_FLAG, 'true');
            sessionStorage.setItem(ACTIVE_USER_ID_KEY, data.user.id);
            sessionStorage.setItem(ACTIVE_USER_EMAIL_KEY, data.user.email);
            try {
              localStorage.setItem(CACHED_USER_KEY, JSON.stringify(data.user));
            } catch (_) {}
            callback(data.user);
          } else {
            throw new Error('No user data');
          }
        })
        .catch(() => {
          // Fallback to offline cached user if server is temporarily unreachable
          const cached = loadCachedUser();
          if (cached && hasSession) {
            this.currentUser = cached;
            callback(cached);
          } else {
            this.currentUser = null;
            callback(null);
          }
        });
    } else if (hasSession) {
      const cached = loadCachedUser();
      if (cached) {
        this.currentUser = cached;
        callback(cached);
      } else {
        this.currentUser = null;
        callback(null);
      }
    } else {
      this.currentUser = null;
      callback(null);
    }

    return () => {
      this.authListeners = this.authListeners.filter(cb => cb !== callback);
    };
  }

  /**
   * Registro oficial de estudiante: valida campos, llama al endpoint backend seguro
   */
  static async registerUser(data: {
    name: string;
    email: string;
    password: string;
    age?: number;
    educationLevel?: string;
    city?: string;
    country?: string;
  }): Promise<{ user: User | null; error?: string }> {
    try {
      const cleanName = (data.name || '').trim();
      const cleanEmail = (data.email || '').trim().toLowerCase();

      if (!cleanName) {
        return { user: null, error: 'Por favor ingresa tu nombre completo.' };
      }

      // 1. Strict Email Format Validation
      const emailCheck = validateEmail(cleanEmail);
      if (!emailCheck.isValid) {
        return { user: null, error: emailCheck.error || 'Formato de correo inválido.' };
      }

      // 2. Strict Password Requirements Validation
      if (!isPasswordValid(data.password)) {
        const missing = getMissingPasswordRequirements(data.password);
        return {
          user: null,
          error: `La contraseña no cumple los requisitos de seguridad: ${missing.join(', ')}.`
        };
      }

      // 3. Register via Express API
      const serverRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          password: data.password,
          age: data.age || 17,
          educationLevel: data.educationLevel,
          city: data.city,
          country: data.country
        })
      });

      if (serverRes.ok) {
        const resData = await serverRes.json();
        if (resData.token) {
          sessionStorage.setItem(AUTH_TOKEN_KEY, resData.token);
          localStorage.setItem(AUTH_TOKEN_KEY, resData.token);
        }
        if (resData.user) {
          this.notifyListeners(resData.user);
          return { user: resData.user };
        }
      }

      const errData = await serverRes.json().catch(() => null);
      return {
        user: null,
        error: errData?.error || 'No se pudo crear la cuenta. Por favor verifica tus datos o intenta más tarde.'
      };
    } catch (err: any) {
      console.error('Registration network error:', err);
      return {
        user: null,
        error: 'No se pudo conectar con el servidor para registrar tu cuenta. Verifica tu conexión a internet.'
      };
    }
  }

  /**
   * Inicio de sesión de usuario: verifica credenciales mediante el backend seguro
   */
  static async loginUser(
    email: string,
    password: string
  ): Promise<{ user: User | null; error?: string }> {
    try {
      const cleanEmail = (email || '').trim().toLowerCase();

      // 1. Basic format validation
      const emailCheck = validateEmail(cleanEmail);
      if (!emailCheck.isValid) {
        return { user: null, error: emailCheck.error || 'Correo electrónico inválido.' };
      }

      if (!password) {
        return { user: null, error: 'Por favor ingresa tu contraseña.' };
      }

      // 2. Login through Express Auth API
      const serverRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });

      if (serverRes.ok) {
        const resData = await serverRes.json();
        if (resData.token) {
          sessionStorage.setItem(AUTH_TOKEN_KEY, resData.token);
          localStorage.setItem(AUTH_TOKEN_KEY, resData.token);
        }
        if (resData.user) {
          this.notifyListeners(resData.user);
          return { user: resData.user };
        }
      }

      const errData = await serverRes.json().catch(() => null);
      return {
        user: null,
        error: errData?.error || 'Correo o contraseña incorrectos. Verifica tus credenciales o crea una cuenta nueva.'
      };
    } catch (err: any) {
      console.error('Login network error:', err);
      return {
        user: null,
        error: 'No se pudo conectar con el servidor. Verifica tu conexión a internet e inténtalo de nuevo.'
      };
    }
  }

  /**
   * Google Sign-in integration
   */
  static async loginWithGoogle(): Promise<{ user: User | null; error?: string }> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userCredential = await signInWithPopup(auth, provider);
      const fbUser = userCredential.user;

      const cleanEmail = (fbUser.email || '').trim().toLowerCase();

      // Synchronize with server backend to obtain token and unified User object
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: fbUser.uid,
          email: cleanEmail,
          displayName: fbUser.displayName || 'Estudiante'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          sessionStorage.setItem(AUTH_TOKEN_KEY, data.token);
          localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        }
        if (data.user) {
          this.notifyListeners(data.user);
          return { user: data.user };
        }
      }

      // Fallback local construct if server returned unexpected payload
      const fallbackUser: User = {
        id: fbUser.uid,
        name: fbUser.displayName || 'Estudiante VocAcción',
        email: cleanEmail,
        role: 'user',
        status: 'active',
        age: 17,
        educationLevel: 'Último año de Bachillerato / Secundaria',
        city: '',
        country: 'Colombia',
        avatarColor: 'bg-gradient-to-tr from-pink-400 to-purple-500',
        createdAt: new Date().toISOString(),
        savedCareers: [],
        savedUniversities: [],
        savedScholarships: [],
        testHistory: [],
        answeredQuestionIds: []
      };

      this.notifyListeners(fallbackUser);
      return { user: fallbackUser };
    } catch (err: any) {
      console.error('Google login error:', err);
      let errorMsg = 'No se pudo iniciar sesión con Google.';
      if (err.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Ventana de inicio de sesión cerrada antes de completar.';
      }
      return { user: null, error: errorMsg };
    }
  }

  /**
   * Demo account for quick testing
   */
  static setDemoUser(): User {
    const demoUser: User = { ...INITIAL_DEMO_USER };
    this.notifyListeners(demoUser);
    return demoUser;
  }

  /**
   * Secure logout
   */
  static async logout(): Promise<void> {
    const token = this.getAuthToken();
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    }

    try {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      sessionStorage.removeItem(ACTIVE_SESSION_FLAG);
      sessionStorage.removeItem(ACTIVE_USER_ID_KEY);
      sessionStorage.removeItem(ACTIVE_USER_EMAIL_KEY);
      localStorage.removeItem(CACHED_USER_KEY);
      localStorage.removeItem('vocaccion_demo_active');
    } catch (_) {}

    try {
      await firebaseSignOut(auth);
    } catch (_) {}

    this.notifyListeners(null);
  }

  /**
   * Send password reset request
   */
  static async sendPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    const cleanEmail = (email || '').trim().toLowerCase();
    const emailCheck = validateEmail(cleanEmail);
    if (!emailCheck.isValid) {
      return { success: false, error: emailCheck.error };
    }

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail })
      });

      if (res.ok) {
        return { success: true };
      }

      const data = await res.json().catch(() => null);
      return { success: false, error: data?.error || 'No se pudo procesar la solicitud.' };
    } catch (err: any) {
      return { success: false, error: 'Error de conexión al procesar la solicitud.' };
    }
  }

  /**
   * Update student profile fields
   */
  static async updateUser(userId: string, data: Partial<User>): Promise<User | null> {
    if (!this.currentUser) return null;

    const token = this.getAuthToken();
    try {
      if (token) {
        const res = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          const resData = await res.json();
          if (resData.user) {
            this.notifyListeners(resData.user);
            return resData.user;
          }
        }
      }
    } catch (err) {
      console.warn('Could not sync profile with server:', err);
    }

    // Optimistic / offline update
    const updatedUser: User = { ...this.currentUser, ...data };
    this.notifyListeners(updatedUser);
    return updatedUser;
  }

  /**
   * Save a vocational test result to user document
   */
  static async addTestResultToUser(userId: string, testResult: TestResult): Promise<User | null> {
    if (!this.currentUser) return null;

    const token = this.getAuthToken();
    try {
      if (token) {
        const res = await fetch('/api/user/tests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(testResult)
        });

        if (res.ok) {
          const resData = await res.json();
          if (resData.user) {
            this.notifyListeners(resData.user);
            return resData.user;
          }
        }
      }
    } catch (err) {
      console.warn('Could not sync test result with server:', err);
    }

    // Optimistic / offline update
    const newlyAnswered = testResult.questionIdsAnswered || [];
    const prevAnswered = this.currentUser.answeredQuestionIds || [];
    const merged = Array.from(new Set([...prevAnswered, ...newlyAnswered]));
    const updatedHistory = [testResult, ...(this.currentUser.testHistory || [])];

    const updated: User = {
      ...this.currentUser,
      testHistory: updatedHistory,
      answeredQuestionIds: merged
    };
    this.notifyListeners(updated);
    return updated;
  }

  /**
   * Toggle career, university, or scholarship in user favorites
   */
  static async toggleFavorite(
    userId: string, 
    type: 'career' | 'university' | 'scholarship', 
    itemId: string
  ): Promise<User | null> {
    if (!this.currentUser) return null;

    const token = this.getAuthToken();
    try {
      if (token) {
        const res = await fetch('/api/user/favorites/toggle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ type, itemId })
        });

        if (res.ok) {
          const resData = await res.json();
          if (resData.user) {
            this.notifyListeners(resData.user);
            return resData.user;
          }
        }
      }
    } catch (err) {
      console.warn('Could not sync favorites with server:', err);
    }

    // Optimistic / offline update
    let listKey: 'savedCareers' | 'savedUniversities' | 'savedScholarships' = 'savedCareers';
    if (type === 'university') listKey = 'savedUniversities';
    if (type === 'scholarship') listKey = 'savedScholarships';

    const curList = this.currentUser[listKey] || [];
    const updatedList = curList.includes(itemId)
      ? curList.filter(id => id !== itemId)
      : [...curList, itemId];

    const updated: User = {
      ...this.currentUser,
      [listKey]: updatedList
    };
    this.notifyListeners(updated);
    return updated;
  }

  /**
   * Delete test result from history
   */
  static async deleteTestResult(userId: string, testId: string): Promise<User | null> {
    if (!this.currentUser) return null;

    const token = this.getAuthToken();
    try {
      if (token) {
        const res = await fetch(`/api/user/tests/${encodeURIComponent(testId)}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const resData = await res.json();
          if (resData.user) {
            this.notifyListeners(resData.user);
            return resData.user;
          }
        }
      }
    } catch (err) {
      console.warn('Could not delete test on server:', err);
    }

    const filtered = (this.currentUser.testHistory || []).filter(t => t.id !== testId);
    const updated: User = {
      ...this.currentUser,
      testHistory: filtered
    };
    this.notifyListeners(updated);
    return updated;
  }

  /**
   * Get user profile by ID or email
   */
  static async getUserProfile(uidOrEmail: string): Promise<User | null> {
    try {
      const res = await fetch(`/api/user/${encodeURIComponent(uidOrEmail)}`);
      if (res.ok) {
        const data = await res.json();
        return data.user || null;
      }
    } catch (err) {
      console.warn('Could not fetch user profile:', err);
    }
    return null;
  }
}
