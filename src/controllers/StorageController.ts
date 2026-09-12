import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { User, TestResult } from '../types';

const TOKEN_STORAGE_KEY = 'vocaccion_auth_token';
const DEMO_ACTIVE_KEY = 'vocaccion_demo_active';

export const INITIAL_DEMO_USER: User = {
  id: 'user-demo-1',
  name: 'Valentina Gómez',
  email: 'demo@vocaccion.edu',
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

  private static getToken(): string | null {
    try {
      return sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  private static setToken(token: string) {
    try {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch (e) {
      console.warn('Storage set token error:', e);
    }
  }

  private static clearToken() {
    try {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(DEMO_ACTIVE_KEY);
      sessionStorage.removeItem('vocaccion_session_authenticated');
    } catch (e) {
      console.warn('Storage clear token error:', e);
    }
  }

  private static notifyListeners(user: User | null) {
    this.currentUser = user;
    this.authListeners.forEach(cb => {
      try {
        cb(user);
      } catch (err) {
        console.error('Error in auth listener callback:', err);
      }
    });
  }

  /**
   * Listen to Auth state changes and sync current user profile
   */
  static initAuthListener(callback: (user: User | null) => void): () => void {
    this.authListeners.push(callback);

    // Initial check: if there is an active session token, verify it with the database
    const token = this.getToken();
    const hasSessionFlag = sessionStorage.getItem('vocaccion_session_authenticated') === 'true';

    if (token && hasSessionFlag) {
      fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Invalid token');
        })
        .then(data => {
          if (data?.user) {
            this.currentUser = data.user;
            callback(data.user);
          } else {
            this.clearToken();
            this.currentUser = null;
            callback(null);
          }
        })
        .catch(() => {
          this.clearToken();
          this.currentUser = null;
          callback(null);
        });
    } else {
      // User must explicitly log in when entering page
      this.clearToken();
      this.currentUser = null;
      callback(null);
    }

    return () => {
      this.authListeners = this.authListeners.filter(cb => cb !== callback);
    };
  }

  /**
   * Register a new student account in the backend database
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
          age: data.age || 17,
          educationLevel: data.educationLevel || 'Último año de Bachillerato / Secundaria',
          city: data.city || '',
          country: data.country || 'Colombia'
        })
      });

      const resJson = await response.json();

      if (!response.ok) {
        return {
          user: null,
          error: resJson.error || 'No se pudo crear la cuenta.'
        };
      }

      if (resJson.token) {
        this.setToken(resJson.token);
        try {
          sessionStorage.setItem('vocaccion_session_authenticated', 'true');
        } catch (_) {}
      }

      const user: User = resJson.user;
      this.notifyListeners(user);
      return { user };
    } catch (err: any) {
      console.error('Registration API request error:', err);
      return {
        user: null,
        error: 'No se pudo conectar con el servidor para registrar tu cuenta. Verifica tu conexión.'
      };
    }
  }

  /**
   * Log in an existing student account
   */
  static async loginUser(
    email: string,
    password: string
  ): Promise<{ user: User | null; error?: string }> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password
        })
      });

      const resJson = await response.json();

      if (!response.ok) {
        return {
          user: null,
          error: resJson.error || 'Correo o contraseña incorrectos. Verifica tus datos.'
        };
      }

      if (resJson.token) {
        this.setToken(resJson.token);
        try {
          sessionStorage.setItem('vocaccion_session_authenticated', 'true');
        } catch (_) {}
      }

      const user: User = resJson.user;
      this.notifyListeners(user);
      return { user };
    } catch (err: any) {
      console.error('Login API request error:', err);
      return {
        user: null,
        error: 'No se pudo conectar con el servidor para iniciar sesión.'
      };
    }
  }

  /**
   * Sign in with Google Auth
   */
  static async loginWithGoogle(): Promise<{ user: User | null; error?: string }> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userCredential = await signInWithPopup(auth, provider);
      const fbUser = userCredential.user;

      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || 'Estudiante'
        })
      });

      const resJson = await response.json();
      if (!response.ok) {
        return {
          user: null,
          error: resJson.error || 'No se pudo autenticar con Google en la base de datos.'
        };
      }

      if (resJson.token) {
        this.setToken(resJson.token);
        try {
          sessionStorage.setItem('vocaccion_session_authenticated', 'true');
        } catch (_) {}
      }

      const user: User = resJson.user;
      this.notifyListeners(user);
      return { user };
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
   * Quick demo access
   */
  static setDemoUser(): User {
    const demoUser = { ...INITIAL_DEMO_USER };
    try {
      sessionStorage.setItem('vocaccion_session_authenticated', 'true');
    } catch (_) {}

    // Synchronize demo session with backend
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'demo@vocaccion.edu', password: 'demo123' })
    })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.token) {
          this.setToken(resJson.token);
          if (resJson.user) {
            this.notifyListeners(resJson.user);
          }
        }
      })
      .catch(err => console.warn('Demo session sync:', err));

    this.notifyListeners(demoUser);
    return demoUser;
  }

  /**
   * Log out user and destroy session
   */
  static async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (e) {
        console.warn('Error during API logout:', e);
      }
    }

    try {
      await firebaseSignOut(auth);
    } catch (_) {}

    this.clearToken();
    this.notifyListeners(null);
  }

  /**
   * Send password reset request
   */
  static async sendPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });

      const resJson = await response.json();
      if (!response.ok) {
        return { success: false, error: resJson.error || 'No se pudo procesar la solicitud.' };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Error de conexión al enviar correo de recuperación.' };
    }
  }

  /**
   * Update student profile fields
   */
  static async updateUser(userId: string, data: Partial<User>): Promise<User | null> {
    try {
      const token = this.getToken();
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        console.warn('Update user failed with status:', response.status);
        if (this.currentUser) {
          const updated = { ...this.currentUser, ...data };
          this.notifyListeners(updated);
          return updated;
        }
        return null;
      }

      const resJson = await response.json();
      const updatedUser = resJson.user;
      this.notifyListeners(updatedUser);
      return updatedUser;
    } catch (e) {
      console.error('Error updating user:', e);
      return null;
    }
  }

  /**
   * Save a vocational test result
   */
  static async addTestResultToUser(userId: string, testResult: TestResult): Promise<User | null> {
    try {
      const token = this.getToken();
      const response = await fetch('/api/user/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(testResult)
      });

      if (!response.ok) {
        console.warn('Add test result failed with status:', response.status);
        if (this.currentUser) {
          const newlyAnswered = testResult.questionIdsAnswered || [];
          const prevAnswered = this.currentUser.answeredQuestionIds || [];
          const merged = Array.from(new Set([...prevAnswered, ...newlyAnswered]));
          const updated: User = {
            ...this.currentUser,
            testHistory: [testResult, ...(this.currentUser.testHistory || [])],
            answeredQuestionIds: merged
          };
          this.notifyListeners(updated);
          return updated;
        }
        return null;
      }

      const resJson = await response.json();
      const updatedUser = resJson.user;
      this.notifyListeners(updatedUser);
      return updatedUser;
    } catch (e) {
      console.error('Error saving test result:', e);
      return null;
    }
  }

  /**
   * Toggle career, university, or scholarship in user favorites
   */
  static async toggleFavorite(
    userId: string, 
    type: 'career' | 'university' | 'scholarship', 
    itemId: string
  ): Promise<User | null> {
    try {
      const token = this.getToken();
      const response = await fetch('/api/user/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ type, itemId })
      });

      if (!response.ok) {
        console.warn('Toggle favorite failed with status:', response.status);
        if (this.currentUser) {
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
        return null;
      }

      const resJson = await response.json();
      const updatedUser = resJson.user;
      this.notifyListeners(updatedUser);
      return updatedUser;
    } catch (e) {
      console.error('Error toggling favorite:', e);
      return null;
    }
  }

  /**
   * Delete test result from user history
   */
  static async deleteTestResult(userId: string, testId: string): Promise<User | null> {
    try {
      const token = this.getToken();
      const response = await fetch(`/api/user/tests/${testId}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (!response.ok) {
        if (this.currentUser) {
          const updated = {
            ...this.currentUser,
            testHistory: (this.currentUser.testHistory || []).filter(t => t.id !== testId)
          };
          this.notifyListeners(updated);
          return updated;
        }
        return null;
      }

      const resJson = await response.json();
      const updatedUser = resJson.user;
      this.notifyListeners(updatedUser);
      return updatedUser;
    } catch (e) {
      console.error('Error deleting test result:', e);
      return null;
    }
  }

  /**
   * Get user profile by ID
   */
  static async getUserProfile(uid: string): Promise<User | null> {
    try {
      const token = this.getToken();
      const response = await fetch(`/api/user/${uid}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (!response.ok) return null;
      const resJson = await response.json();
      return resJson.user;
    } catch (err) {
      console.error('Error in getUserProfile:', err);
      return null;
    }
  }
}
