import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { User, TestResult } from '../types';
import { 
  validateEmail, 
  isPasswordValid, 
  getMissingPasswordRequirements 
} from '../utils/authValidation';
import { 
  hashPassword, 
  generateSalt, 
  hashEmailToDocId 
} from '../utils/crypto';

const ACTIVE_USER_ID_KEY = 'vocaccion_active_user_id';
const ACTIVE_USER_EMAIL_KEY = 'vocaccion_active_user_email';
const ACTIVE_SESSION_FLAG = 'vocaccion_session_authenticated';

export const INITIAL_DEMO_USER: User = {
  id: 'user-demo-valentina',
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
   * Listen to Auth state changes and restore authenticated user profile if session exists
   */
  static initAuthListener(callback: (user: User | null) => void): () => void {
    this.authListeners.push(callback);

    const hasSession = sessionStorage.getItem(ACTIVE_SESSION_FLAG) === 'true';
    const activeDocId = sessionStorage.getItem(ACTIVE_USER_ID_KEY);

    if (hasSession && activeDocId) {
      // Re-hydrate session from real Firestore
      getDoc(doc(db, 'users', activeDocId))
        .then(snap => {
          if (snap.exists()) {
            const data = snap.data();
            const user: User = {
              id: data.id || activeDocId,
              email: data.email,
              name: data.name,
              age: data.age || 17,
              educationLevel: data.educationLevel || 'Último año de Bachillerato / Secundaria',
              city: data.city || '',
              country: data.country || 'Colombia',
              avatarColor: data.avatarColor || 'bg-gradient-to-tr from-pink-400 to-purple-500',
              createdAt: data.createdAt || new Date().toISOString(),
              savedCareers: Array.isArray(data.savedCareers) ? data.savedCareers : [],
              savedUniversities: Array.isArray(data.savedUniversities) ? data.savedUniversities : [],
              savedScholarships: Array.isArray(data.savedScholarships) ? data.savedScholarships : [],
              testHistory: Array.isArray(data.testHistory) ? data.testHistory : [],
              answeredQuestionIds: Array.isArray(data.answeredQuestionIds) ? data.answeredQuestionIds : []
            };
            this.currentUser = user;
            callback(user);
          } else {
            this.logout();
            callback(null);
          }
        })
        .catch(err => {
          console.warn('Could not rehydrate Firestore session:', err);
          callback(null);
        });
    } else {
      // First entry: show auth gate
      this.currentUser = null;
      callback(null);
    }

    return () => {
      this.authListeners = this.authListeners.filter(cb => cb !== callback);
    };
  }

  /**
   * Real student registration: validates inputs, checks for duplicates, hashes password and saves to Firestore
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

      // 3. Generate deterministic document ID based on normalized email
      const docId = await hashEmailToDocId(cleanEmail);
      const userDocRef = doc(db, 'users', docId);

      // 4. Duplicate Check in Firestore Database
      const existingSnap = await getDoc(userDocRef);
      if (existingSnap.exists()) {
        return {
          user: null,
          error: 'Ya existe una cuenta registrada con este correo electrónico. Por favor inicia sesión.'
        };
      }

      // 5. Cryptographic Password Hashing (PBKDF2 with SHA-256 and unique 16-byte salt)
      const salt = generateSalt();
      const passwordHash = await hashPassword(data.password, salt);

      const avatarGradients = [
        'bg-gradient-to-tr from-pink-400 to-purple-500',
        'bg-gradient-to-tr from-purple-400 to-indigo-500',
        'bg-gradient-to-tr from-rose-400 to-amber-500',
        'bg-gradient-to-tr from-fuchsia-400 to-pink-500',
        'bg-gradient-to-tr from-violet-500 to-purple-600'
      ];
      const randomGradient = avatarGradients[Math.floor(Math.random() * avatarGradients.length)];

      const newUser: User = {
        id: docId,
        name: cleanName,
        email: cleanEmail,
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

      // 6. Persist directly to Google Cloud Firestore database
      await setDoc(userDocRef, {
        ...newUser,
        passwordHash,
        passwordSalt: salt
      });

      // 7. Store active session identifiers
      try {
        sessionStorage.setItem(ACTIVE_SESSION_FLAG, 'true');
        sessionStorage.setItem(ACTIVE_USER_ID_KEY, docId);
        sessionStorage.setItem(ACTIVE_USER_EMAIL_KEY, cleanEmail);
      } catch (_) {}

      // 8. Optional background sync with Express API (if server is active)
      fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          password: data.password,
          age: newUser.age,
          educationLevel: newUser.educationLevel,
          city: newUser.city,
          country: newUser.country
        })
      }).catch(() => {});

      this.notifyListeners(newUser);
      return { user: newUser };
    } catch (err: any) {
      console.error('Firestore Registration error:', err);
      return {
        user: null,
        error: 'Ocurrió un error al guardar tu cuenta en la base de datos: ' + (err?.message || 'Error de conexión.')
      };
    }
  }

  /**
   * Real student login: queries Firestore by email, verifies cryptographic password hash
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

      // 2. Fetch user document from Firestore
      const docId = await hashEmailToDocId(cleanEmail);
      const userDocRef = doc(db, 'users', docId);
      const snap = await getDoc(userDocRef);

      if (!snap.exists()) {
        return {
          user: null,
          error: 'Correo o contraseña incorrectos. Verifica tus credenciales o crea una cuenta nueva.'
        };
      }

      const userData = snap.data();

      // 3. Verify cryptographic password hash
      const salt = userData.passwordSalt;
      const expectedHash = userData.passwordHash;

      if (!salt || !expectedHash) {
        return {
          user: null,
          error: 'Error en el formato de seguridad de la cuenta. Por favor restablece tu contraseña.'
        };
      }

      const computedHash = await hashPassword(password, salt);
      if (computedHash !== expectedHash) {
        return {
          user: null,
          error: 'Correo o contraseña incorrectos. Verifica tus credenciales o crea una cuenta nueva.'
        };
      }

      // 4. Build user profile object
      const user: User = {
        id: userData.id || docId,
        email: userData.email,
        name: userData.name,
        age: userData.age || 17,
        educationLevel: userData.educationLevel || 'Último año de Bachillerato / Secundaria',
        city: userData.city || '',
        country: userData.country || 'Colombia',
        avatarColor: userData.avatarColor || 'bg-gradient-to-tr from-pink-400 to-purple-500',
        createdAt: userData.createdAt || new Date().toISOString(),
        savedCareers: Array.isArray(userData.savedCareers) ? userData.savedCareers : [],
        savedUniversities: Array.isArray(userData.savedUniversities) ? userData.savedUniversities : [],
        savedScholarships: Array.isArray(userData.savedScholarships) ? userData.savedScholarships : [],
        testHistory: Array.isArray(userData.testHistory) ? userData.testHistory : [],
        answeredQuestionIds: Array.isArray(userData.answeredQuestionIds) ? userData.answeredQuestionIds : []
      };

      // 5. Establish session
      try {
        sessionStorage.setItem(ACTIVE_SESSION_FLAG, 'true');
        sessionStorage.setItem(ACTIVE_USER_ID_KEY, docId);
        sessionStorage.setItem(ACTIVE_USER_EMAIL_KEY, cleanEmail);
      } catch (_) {}

      // Optional background sync with Express
      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      }).catch(() => {});

      this.notifyListeners(user);
      return { user };
    } catch (err: any) {
      console.error('Firestore Login error:', err);
      return {
        user: null,
        error: 'No se pudo verificar la cuenta con la base de datos: ' + (err?.message || 'Error de conexión.')
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
      const docId = await hashEmailToDocId(cleanEmail);
      const userDocRef = doc(db, 'users', docId);

      const snap = await getDoc(userDocRef);
      let user: User;

      if (snap.exists()) {
        const data = snap.data();
        user = {
          id: data.id || docId,
          email: data.email,
          name: data.name,
          age: data.age || 17,
          educationLevel: data.educationLevel || 'Último año de Bachillerato / Secundaria',
          city: data.city || '',
          country: data.country || 'Colombia',
          avatarColor: data.avatarColor || 'bg-gradient-to-tr from-pink-400 to-purple-500',
          createdAt: data.createdAt,
          savedCareers: data.savedCareers || [],
          savedUniversities: data.savedUniversities || [],
          savedScholarships: data.savedScholarships || [],
          testHistory: data.testHistory || [],
          answeredQuestionIds: data.answeredQuestionIds || []
        };
      } else {
        user = {
          id: docId,
          name: fbUser.displayName || 'Estudiante VocAcción',
          email: cleanEmail,
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
        await setDoc(userDocRef, user);
      }

      sessionStorage.setItem(ACTIVE_SESSION_FLAG, 'true');
      sessionStorage.setItem(ACTIVE_USER_ID_KEY, docId);
      sessionStorage.setItem(ACTIVE_USER_EMAIL_KEY, cleanEmail);

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
   * Demo account for quick testing
   */
  static setDemoUser(): User {
    const demoUser: User = { ...INITIAL_DEMO_USER };
    const docId = 'user-demo-valentina';

    try {
      sessionStorage.setItem(ACTIVE_SESSION_FLAG, 'true');
      sessionStorage.setItem(ACTIVE_USER_ID_KEY, docId);
      sessionStorage.setItem(ACTIVE_USER_EMAIL_KEY, demoUser.email);
    } catch (_) {}

    // Ensure demo account exists in Firestore
    const userDocRef = doc(db, 'users', docId);
    getDoc(userDocRef).then(snap => {
      if (!snap.exists()) {
        setDoc(userDocRef, demoUser).catch(() => {});
      }
    }).catch(() => {});

    this.notifyListeners(demoUser);
    return demoUser;
  }

  /**
   * Secure logout
   */
  static async logout(): Promise<void> {
    try {
      sessionStorage.removeItem(ACTIVE_SESSION_FLAG);
      sessionStorage.removeItem(ACTIVE_USER_ID_KEY);
      sessionStorage.removeItem(ACTIVE_USER_EMAIL_KEY);
      sessionStorage.removeItem('vocaccion_auth_token');
      localStorage.removeItem('vocaccion_auth_token');
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
      const docId = await hashEmailToDocId(cleanEmail);
      const snap = await getDoc(doc(db, 'users', docId));
      if (!snap.exists()) {
        return { 
          success: false, 
          error: 'No existe ninguna cuenta registrada con este correo electrónico.' 
        };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Error al procesar la solicitud: ' + (err?.message || 'Error de conexión.') };
    }
  }

  /**
   * Update student profile fields
   */
  static async updateUser(userId: string, data: Partial<User>): Promise<User | null> {
    if (!this.currentUser) return null;

    try {
      const docId = await hashEmailToDocId(this.currentUser.email);
      const userDocRef = doc(db, 'users', docId);

      await updateDoc(userDocRef, data);
      const updatedUser: User = { ...this.currentUser, ...data };
      this.notifyListeners(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error('Error updating user in Firestore:', err);
      const fallback: User = { ...this.currentUser, ...data };
      this.notifyListeners(fallback);
      return fallback;
    }
  }

  /**
   * Save a vocational test result to user document
   */
  static async addTestResultToUser(userId: string, testResult: TestResult): Promise<User | null> {
    if (!this.currentUser) return null;

    try {
      const docId = await hashEmailToDocId(this.currentUser.email);
      const userDocRef = doc(db, 'users', docId);

      const newlyAnswered = testResult.questionIdsAnswered || [];
      const prevAnswered = this.currentUser.answeredQuestionIds || [];
      const merged = Array.from(new Set([...prevAnswered, ...newlyAnswered]));

      const updatedHistory = [testResult, ...(this.currentUser.testHistory || [])];

      await updateDoc(userDocRef, {
        testHistory: updatedHistory,
        answeredQuestionIds: merged
      });

      const updated: User = {
        ...this.currentUser,
        testHistory: updatedHistory,
        answeredQuestionIds: merged
      };
      this.notifyListeners(updated);
      return updated;
    } catch (err) {
      console.error('Error saving test result to Firestore:', err);
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

    try {
      const docId = await hashEmailToDocId(this.currentUser.email);
      const userDocRef = doc(db, 'users', docId);

      let listKey: 'savedCareers' | 'savedUniversities' | 'savedScholarships' = 'savedCareers';
      if (type === 'university') listKey = 'savedUniversities';
      if (type === 'scholarship') listKey = 'savedScholarships';

      const curList = this.currentUser[listKey] || [];
      const updatedList = curList.includes(itemId)
        ? curList.filter(id => id !== itemId)
        : [...curList, itemId];

      await updateDoc(userDocRef, {
        [listKey]: updatedList
      });

      const updated: User = {
        ...this.currentUser,
        [listKey]: updatedList
      };
      this.notifyListeners(updated);
      return updated;
    } catch (err) {
      console.error('Error toggling favorite in Firestore:', err);
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
  }

  /**
   * Delete test result from history
   */
  static async deleteTestResult(userId: string, testId: string): Promise<User | null> {
    if (!this.currentUser) return null;

    try {
      const docId = await hashEmailToDocId(this.currentUser.email);
      const userDocRef = doc(db, 'users', docId);

      const filtered = (this.currentUser.testHistory || []).filter(t => t.id !== testId);
      await updateDoc(userDocRef, { testHistory: filtered });

      const updated: User = {
        ...this.currentUser,
        testHistory: filtered
      };
      this.notifyListeners(updated);
      return updated;
    } catch (err) {
      console.error('Error deleting test result from Firestore:', err);
      const filtered = (this.currentUser.testHistory || []).filter(t => t.id !== testId);
      const updated: User = {
        ...this.currentUser,
        testHistory: filtered
      };
      this.notifyListeners(updated);
      return updated;
    }
  }

  /**
   * Get user profile by ID or email
   */
  static async getUserProfile(uidOrEmail: string): Promise<User | null> {
    try {
      let docId = uidOrEmail;
      if (uidOrEmail.includes('@')) {
        docId = await hashEmailToDocId(uidOrEmail);
      }
      const snap = await getDoc(doc(db, 'users', docId));
      if (!snap.exists()) return null;
      return snap.data() as User;
    } catch (err) {
      console.error('Error in getUserProfile:', err);
      return null;
    }
  }
}
