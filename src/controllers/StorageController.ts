import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
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

const ADMIN_EMAILS = [
  'nicoleilincastaneda@gmail.com',
  'perezcastanedamelaniyulieth@gmail.com',
  'lunismariana02@gmail.com',
  'eileentovarc.25@gmail.com'
];

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
   * Registro oficial de estudiante:
   * 1. Valida campos y requisitos de seguridad.
   * 2. Intenta el endpoint del backend (/api/auth/register).
   * 3. Si el endpoint retorna 404 (típico en despliegues estáticos de Vercel) o error de red,
   *    ejecuta el fallback con Firebase Auth y Firestore directamente.
   * 4. Registra detalles precisos en console.error y muestra el mensaje real devuelto.
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

    // 3. Try Express API first
    try {
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

      // Si el endpoint no existe en Vercel (404), recurrir a Firebase Authentication
      if (serverRes.status === 404) {
        console.warn(
          `[VocAcción Auth] Endpoint /api/auth/register retornó 404 en el servidor actual (despliegue estático en Vercel). ` +
          `Activando fallback directo a Firebase Auth...`
        );
        return await this.registerWithFirebaseAuth(data, cleanName, cleanEmail);
      }

      // Extraer y reportar el mensaje de error exacto del servidor
      const rawText = await serverRes.text();
      let serverErrorMsg = '';
      try {
        const parsed = JSON.parse(rawText);
        serverErrorMsg = parsed.error || parsed.message || '';
      } catch (_) {
        serverErrorMsg = rawText ? rawText.slice(0, 200) : '';
      }

      const finalError = serverErrorMsg || `Error HTTP ${serverRes.status} al procesar el registro en el servidor.`;
      return {
        user: null,
        error: finalError
      };
    } catch (networkErr: any) {
      console.warn('[VocAcción Auth] Fallo al alcanzar /api/auth/register:', networkErr);
      console.info('[VocAcción Auth] Intentando fallback con Firebase Authentication...');
      try {
        return await this.registerWithFirebaseAuth(data, cleanName, cleanEmail);
      } catch (fbErr: any) {
        console.error('[VocAcción Auth Fallback Error]', fbErr);
        return {
          user: null,
          error: `Error de conexión: No se pudo conectar con el backend ni con Firebase Auth (${fbErr?.message || networkErr?.message}).`
        };
      }
    }
  }

  /**
   * Registro directo vía Firebase Authentication y Firestore (Modo cliente/Vercel)
   */
  private static async registerWithFirebaseAuth(
    data: {
      password: string;
      age?: number;
      educationLevel?: string;
      city?: string;
      country?: string;
    },
    cleanName: string,
    cleanEmail: string
  ): Promise<{ user: User | null; error?: string }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, data.password);
      const fbUser = userCredential.user;

      const isAdminEmail = ADMIN_EMAILS.includes(cleanEmail);

      const avatarGradients = [
        'bg-gradient-to-tr from-pink-400 to-purple-500',
        'bg-gradient-to-tr from-purple-400 to-indigo-500',
        'bg-gradient-to-tr from-rose-400 to-amber-500',
        'bg-gradient-to-tr from-fuchsia-400 to-pink-500',
        'bg-gradient-to-tr from-violet-500 to-purple-600'
      ];
      const randomGradient = avatarGradients[Math.floor(Math.random() * avatarGradients.length)];

      const newUser: User = {
        id: fbUser.uid,
        name: cleanName,
        email: cleanEmail,
        role: isAdminEmail ? 'admin' : 'user',
        status: 'active',
        age: data.age || 17,
        educationLevel: data.educationLevel || 'Último año de Bachillerato / Secundaria',
        city: data.city ? data.city.trim() : '',
        country: data.country ? data.country.trim() : 'Colombia',
        avatarColor: randomGradient,
        createdAt: new Date().toISOString(),
        savedCareers: [],
        savedUniversities: [],
        savedScholarships: [],
        testHistory: [],
        answeredQuestionIds: []
      };

      try {
        await setDoc(doc(db, 'users', fbUser.uid), newUser);
      } catch (fsErr) {
        console.warn('[VocAcción Firestore Warning] Perfil guardado localmente (Firestore sync pendiente):', fsErr);
      }

      this.notifyListeners(newUser);
      return { user: newUser };
    } catch (fbErr: any) {
      console.warn('[VocAcción Firebase Auth Register Warning]', fbErr);
      let errorMsg = 'Error en Firebase Auth: ' + (fbErr?.message || 'Error desconocido.');

      if (fbErr?.code === 'auth/email-already-in-use') {
        errorMsg = 'Ya existe una cuenta registrada con este correo electrónico. Por favor inicia sesión.';
      } else if (fbErr?.code === 'auth/weak-password') {
        errorMsg = 'La contraseña debe tener un mínimo de 6 caracteres.';
      } else if (fbErr?.code === 'auth/invalid-email') {
        errorMsg = 'El formato del correo electrónico ingresado no es válido.';
      } else if (fbErr?.code === 'auth/operation-not-allowed') {
        errorMsg = 'El proveedor de Correo/Contraseña no está habilitado en Firebase Authentication Console.';
      }

      return { user: null, error: errorMsg };
    }
  }

  /**
   * Inicio de sesión de usuario:
   * 1. Verifica credenciales contra el backend (/api/auth/login).
   * 2. Si el endpoint retorna 404 (Vercel estático) o fallo de red,
   *    ejecuta el fallback con Firebase Auth signInWithEmailAndPassword.
   * 3. Registra logs claros con console.error para facilitar depuración en Vercel y DevTools.
   */
  static async loginUser(
    email: string,
    password: string
  ): Promise<{ user: User | null; error?: string }> {
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
    try {
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

      // Si el endpoint no existe en Vercel (404), usar Firebase Auth directamente
      if (serverRes.status === 404) {
        console.warn(
          `[VocAcción Auth] Endpoint /api/auth/login retornó 404 (despliegue estático en Vercel). ` +
          `Activando fallback directo a Firebase Auth...`
        );
        return await this.loginWithFirebaseAuth(cleanEmail, password);
      }

      const rawText = await serverRes.text();
      let serverErrorMsg = '';
      try {
        const parsed = JSON.parse(rawText);
        serverErrorMsg = parsed.error || parsed.message || '';
      } catch (_) {
        serverErrorMsg = rawText ? rawText.slice(0, 200) : '';
      }

      const finalError = serverErrorMsg || 'Correo o contraseña incorrectos. Verifica tus credenciales o crea una cuenta nueva.';
      return {
        user: null,
        error: finalError
      };
    } catch (networkErr: any) {
      console.warn('[VocAcción Auth] Fallo al alcanzar /api/auth/login:', networkErr);
      console.info('[VocAcción Auth] Intentando inicio de sesión con Firebase Authentication...');
      try {
        return await this.loginWithFirebaseAuth(cleanEmail, password);
      } catch (fbErr: any) {
        console.error('[VocAcción Auth Login Fallback Error]', fbErr);
        return {
          user: null,
          error: `Error de inicio de sesión: No se pudo conectar con el backend ni con Firebase Auth (${fbErr?.message || networkErr?.message}).`
        };
      }
    }
  }

  /**
   * Inicio de sesión directo vía Firebase Authentication y Firestore (Modo cliente/Vercel)
   */
  private static async loginWithFirebaseAuth(
    cleanEmail: string,
    password: string
  ): Promise<{ user: User | null; error?: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const fbUser = userCredential.user;

      const isAdminEmail = ADMIN_EMAILS.includes(cleanEmail);

      let profileData: any = null;
      try {
        const snap = await getDoc(doc(db, 'users', fbUser.uid));
        if (snap.exists()) {
          profileData = snap.data();
        }
      } catch (fsErr) {
        console.warn('[VocAcción Firestore Warning] Perfil no obtenido de Firestore:', fsErr);
      }

      const user: User = {
        id: fbUser.uid,
        email: cleanEmail,
        name: profileData?.name || fbUser.displayName || 'Estudiante VocAcción',
        role: profileData?.role || (isAdminEmail ? 'admin' : 'user'),
        status: profileData?.status || 'active',
        age: profileData?.age || 17,
        educationLevel: profileData?.educationLevel || 'Último año de Bachillerato / Secundaria',
        city: profileData?.city || '',
        country: profileData?.country || 'Colombia',
        avatarColor: profileData?.avatarColor || 'bg-gradient-to-tr from-pink-400 to-purple-500',
        createdAt: profileData?.createdAt || new Date().toISOString(),
        savedCareers: profileData?.savedCareers || [],
        savedUniversities: profileData?.savedUniversities || [],
        savedScholarships: profileData?.savedScholarships || [],
        testHistory: profileData?.testHistory || [],
        answeredQuestionIds: profileData?.answeredQuestionIds || []
      };

      this.notifyListeners(user);
      return { user };
    } catch (fbErr: any) {
      console.warn('[VocAcción Firebase Auth Login Warning]', fbErr);
      let errorMsg = 'Error al iniciar sesión: ' + (fbErr?.message || 'Error de credenciales.');

      if (
        fbErr?.code === 'auth/invalid-credential' ||
        fbErr?.code === 'auth/wrong-password' ||
        fbErr?.code === 'auth/user-not-found'
      ) {
        errorMsg = 'Correo o contraseña incorrectos. Verifica tus credenciales o crea una cuenta nueva.';
      } else if (fbErr?.code === 'auth/too-many-requests') {
        errorMsg = 'Demasiados intentos fallidos. Tu cuenta ha sido bloqueada temporalmente por seguridad.';
      } else if (fbErr?.code === 'auth/invalid-email') {
        errorMsg = 'El formato del correo electrónico ingresado no es válido.';
      }

      return { user: null, error: errorMsg };
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
      try {
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
      } catch (syncErr) {
        console.warn('[VocAcción Auth] Fallo al sincronizar Google con backend Express:', syncErr);
      }

      const isAdminEmail = ADMIN_EMAILS.includes(cleanEmail);

      // Fallback local construct if server returned unexpected payload
      const fallbackUser: User = {
        id: fbUser.uid,
        name: fbUser.displayName || 'Estudiante VocAcción',
        email: cleanEmail,
        role: isAdminEmail ? 'admin' : 'user',
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

      try {
        await setDoc(doc(db, 'users', fbUser.uid), fallbackUser, { merge: true });
      } catch (fsErr) {
        console.warn('[VocAcción Firestore Warning] Google profile sync to Firestore skipped:', fsErr);
      }

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
   * Send password reset request (real email or recovery token)
   */
  static async sendPasswordReset(email: string): Promise<{
    success: boolean;
    error?: string;
    message?: string;
    previewResetUrl?: string;
    mailConfigured?: boolean;
  }> {
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

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        return {
          success: true,
          message: data.message,
          previewResetUrl: data.previewResetUrl,
          mailConfigured: data.mailConfigured
        };
      }

      return {
        success: false,
        error: data?.error || 'No se pudo procesar la solicitud de recuperación.'
      };
    } catch (err: any) {
      return {
        success: false,
        error: 'No se pudo conectar con el servidor para procesar la recuperación. Verifica tu conexión.'
      };
    }
  }

  /**
   * Verify whether a password reset token is valid and active
   */
  static async verifyResetToken(token: string): Promise<{ valid: boolean; email?: string; error?: string }> {
    if (!token) {
      return { valid: false, error: 'Token de recuperación no proporcionado.' };
    }

    try {
      const res = await fetch(`/api/auth/verify-reset-token?token=${encodeURIComponent(token)}`);
      const data = await res.json().catch(() => null);

      if (res.ok && data?.valid) {
        return { valid: true, email: data.email };
      }

      return { valid: false, error: data?.error || 'Enlace de recuperación inválido o expirado.' };
    } catch (err: any) {
      return { valid: false, error: 'Error de conexión al validar el enlace de recuperación.' };
    }
  }

  /**
   * Reset account password using verified token
   */
  static async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string; message?: string }> {
    if (!token) {
      return { success: false, error: 'Token de recuperación no válido.' };
    }

    if (!isPasswordValid(newPassword)) {
      const missing = getMissingPasswordRequirements(newPassword);
      return {
        success: false,
        error: `La nueva contraseña no cumple los requisitos: ${missing.join(', ')}.`
      };
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        return { success: true, message: data.message };
      }

      return { success: false, error: data?.error || 'No se pudo restablecer la contraseña.' };
    } catch (err: any) {
      return { success: false, error: 'Error de red al actualizar la contraseña.' };
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

    // Also sync to Firestore if user is authenticated in Firebase
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid), data, { merge: true });
      } catch (fsErr) {
        console.warn('Could not sync profile with Firestore:', fsErr);
      }
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

    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          testHistory: updatedHistory,
          answeredQuestionIds: merged
        }, { merge: true });
      } catch (fsErr) {
        console.warn('Could not sync test to Firestore:', fsErr);
      }
    }

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

    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          [listKey]: updatedList
        }, { merge: true });
      } catch (fsErr) {
        console.warn('Could not sync favorites to Firestore:', fsErr);
      }
    }

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

    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          testHistory: filtered
        }, { merge: true });
      } catch (fsErr) {
        console.warn('Could not delete test in Firestore:', fsErr);
      }
    }

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
      console.warn('Could not fetch user profile from server:', err);
    }

    // Try Firestore
    try {
      const snap = await getDoc(doc(db, 'users', uidOrEmail));
      if (snap.exists()) {
        return snap.data() as User;
      }
    } catch (fsErr) {
      console.warn('Could not fetch user profile from Firestore:', fsErr);
    }

    return null;
  }
}
