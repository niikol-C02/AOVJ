import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User, TestResult } from '../types';

const USERS_COLLECTION = 'users';
const DEMO_USER_ID = 'user-demo-1';

// Seed demo fallback
export const INITIAL_DEMO_USER: User = {
  id: DEMO_USER_ID,
  name: 'Camila Rodriguez',
  email: 'camila@estudiante.edu',
  age: 17,
  educationLevel: 'Último año de Bachillerato / Secundaria',
  city: 'Bogotá / CDMX',
  country: 'Latinoamérica',
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
      ]
    }
  ]
};

export class StorageController {
  private static localFallbackUser: User | null = null;
  private static authListeners: ((user: User | null) => void)[] = [];

  /**
   * Helpers for demo user state persistence in localStorage
   */
  static getOrCreateDemoUser(): User {
    try {
      const stored = localStorage.getItem('vocaccion_demo_user');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading demo user from localStorage:', e);
    }
    return { ...INITIAL_DEMO_USER };
  }

  static saveDemoUser(user: User): void {
    try {
      localStorage.setItem('vocaccion_demo_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Error saving demo user to localStorage:', e);
    }
  }

  /**
   * Listen to Firebase Auth state changes and sync user profile + favorites + test history from Firestore
   */
  static initAuthListener(callback: (user: User | null) => void): () => void {
    this.authListeners.push(callback);

    // Clean up any stale legacy demo flag so initial page entry always shows the login screen
    try {
      localStorage.removeItem('vocaccion_demo_active');
    } catch (e) {
      // ignore
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      let hasActiveSession = false;
      try {
        hasActiveSession = sessionStorage.getItem('vocaccion_session_authenticated') === 'true';
      } catch (e) {
        // ignore
      }

      if (fbUser && hasActiveSession) {
        try {
          let user = await this.getUserProfile(fbUser.uid);
          if (!user) {
            // New user via provider without Firestore doc yet - create fresh clean profile
            const avatarGradients = [
              'bg-gradient-to-tr from-pink-400 to-purple-500',
              'bg-gradient-to-tr from-purple-400 to-indigo-500',
              'bg-gradient-to-tr from-rose-400 to-amber-500',
              'bg-gradient-to-tr from-fuchsia-400 to-pink-500'
            ];
            const randomGradient = avatarGradients[Math.floor(Math.random() * avatarGradients.length)];
            const newUserDoc = {
              id: fbUser.uid,
              name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Estudiante',
              email: fbUser.email || '',
              age: 17,
              educationLevel: 'Último año de Bachillerato / Secundaria',
              city: '',
              country: 'Colombia',
              avatarColor: randomGradient,
              createdAt: new Date().toISOString()
            };
            try {
              await setDoc(doc(db, USERS_COLLECTION, fbUser.uid), newUserDoc);
              await setDoc(doc(db, USERS_COLLECTION, fbUser.uid, 'data', 'favorites'), {
                id: fbUser.uid,
                savedCareers: [],
                savedUniversities: [],
                savedScholarships: [],
                updatedAt: new Date().toISOString()
              });
            } catch (errCreate) {
              console.warn('Could not auto-create user profile:', errCreate);
            }
            user = {
              ...newUserDoc,
              savedCareers: [],
              savedUniversities: [],
              savedScholarships: [],
              testHistory: [],
              answeredQuestionIds: []
            };
          }
          this.localFallbackUser = user;
          callback(user);
          return;
        } catch (err) {
          console.error('Error fetching user profile from Firestore:', err);
        }
      } else if (fbUser && !hasActiveSession) {
        // If there was a lingering Firebase token from another visit, sign out so the user starts cleanly at the login screen
        try {
          await signOut(auth);
        } catch (e) {
          // ignore
        }
      }

      // If active session was set for demo user
      if (hasActiveSession && this.localFallbackUser) {
        callback(this.localFallbackUser);
        return;
      }

      // When opening or re-entering the page, always require explicit login (shows Welcome / Login screen)
      this.localFallbackUser = null;
      callback(null);
    });

    return () => {
      unsubscribe();
      this.authListeners = this.authListeners.filter(cb => cb !== callback);
    };
  }

  /**
   * Fetch full user document including favorites and tests from Firestore
   */
  static async getUserProfile(uid: string): Promise<User | null> {
    try {
      if (uid === DEMO_USER_ID) {
        return this.localFallbackUser || INITIAL_DEMO_USER;
      }

      const userDocRef = doc(db, USERS_COLLECTION, uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        return null;
      }

      const userData = userSnap.data();

      // Fetch favorites subdocument
      let savedCareers: string[] = [];
      let savedUniversities: string[] = [];
      let savedScholarships: string[] = [];

      try {
        const favDocRef = doc(db, USERS_COLLECTION, uid, 'data', 'favorites');
        const favSnap = await getDoc(favDocRef);
        if (favSnap.exists()) {
          const favData = favSnap.data();
          savedCareers = favData.savedCareers || [];
          savedUniversities = favData.savedUniversities || [];
          savedScholarships = favData.savedScholarships || [];
        }
      } catch (e) {
        console.warn('Could not read favorites subdoc:', e);
      }

      // Fetch test history subcollection
      const testHistory: TestResult[] = [];
      try {
        const testsColRef = collection(db, USERS_COLLECTION, uid, 'tests');
        const testsSnap = await getDocs(testsColRef);
        testsSnap.forEach(tDoc => {
          testHistory.push(tDoc.data() as TestResult);
        });
        // sort by date descending
        testHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } catch (e) {
        console.warn('Could not read tests subcollection:', e);
      }

      // Collect answered question IDs across all test history
      const answeredFromTests: number[] = [];
      testHistory.forEach(t => {
        if (t.questionIdsAnswered && Array.isArray(t.questionIdsAnswered)) {
          answeredFromTests.push(...t.questionIdsAnswered);
        }
      });
      const existingAnswered = Array.isArray(userData.answeredQuestionIds) ? userData.answeredQuestionIds : [];
      const combinedAnsweredIds = Array.from(new Set([...existingAnswered, ...answeredFromTests]));

      const fullUser: User = {
        id: uid,
        name: userData.name || 'Estudiante',
        email: userData.email || auth.currentUser?.email || '',
        age: userData.age,
        educationLevel: userData.educationLevel,
        city: userData.city,
        country: userData.country,
        avatarColor: userData.avatarColor || 'bg-gradient-to-tr from-pink-400 to-purple-500',
        createdAt: userData.createdAt || new Date().toISOString(),
        savedCareers,
        savedUniversities,
        savedScholarships,
        testHistory,
        answeredQuestionIds: combinedAnsweredIds
      };

      return fullUser;
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return null;
    }
  }

  /**
   * Register a new student user in Firebase Auth and Firestore
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password
      );
      const uid = userCredential.user.uid;

      const avatarGradients = [
        'bg-gradient-to-tr from-pink-400 to-purple-500',
        'bg-gradient-to-tr from-purple-400 to-indigo-500',
        'bg-gradient-to-tr from-rose-400 to-amber-500',
        'bg-gradient-to-tr from-fuchsia-400 to-pink-500'
      ];
      const randomGradient = avatarGradients[Math.floor(Math.random() * avatarGradients.length)];

      const newUserDoc = {
        id: uid,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        age: data.age || 17,
        educationLevel: data.educationLevel || 'Último año de Bachillerato / Secundaria',
        city: data.city || '',
        country: data.country || '',
        avatarColor: randomGradient,
        createdAt: new Date().toISOString()
      };

      // Save user profile to Firestore
      await setDoc(doc(db, USERS_COLLECTION, uid), newUserDoc);

      // Initialize favorites document
      await setDoc(doc(db, USERS_COLLECTION, uid, 'data', 'favorites'), {
        id: uid,
        savedCareers: [],
        savedUniversities: [],
        savedScholarships: [],
        updatedAt: new Date().toISOString()
      });

      const fullUser: User = {
        ...newUserDoc,
        savedCareers: [],
        savedUniversities: [],
        savedScholarships: [],
        testHistory: []
      };

      try {
        sessionStorage.setItem('vocaccion_session_authenticated', 'true');
      } catch (e) {
        // ignore
      }

      this.localFallbackUser = fullUser;
      return { user: fullUser };
    } catch (err: any) {
      console.error('Firebase registration error:', err);
      let errorMsg = 'No se pudo completar el registro.';
      if (err.code === 'auth/email-already-in-use') {
        errorMsg = 'Ya existe una cuenta con este correo electrónico.';
      } else if (err.code === 'auth/weak-password') {
        errorMsg = 'La contraseña debe tener al menos 6 caracteres.';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'El formato del correo electrónico no es válido.';
      }
      return { user: null, error: errorMsg };
    }
  }

  /**
   * Sign in with Google Auth (real popup authentication)
   */
  static async loginWithGoogle(): Promise<{ user: User | null; error?: string }> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userCredential = await signInWithPopup(auth, provider);
      const fbUser = userCredential.user;
      const uid = fbUser.uid;

      let fullUser = await this.getUserProfile(uid);

      if (!fullUser) {
        // First-time user via Google: create a completely fresh profile with no other user's data
        const avatarGradients = [
          'bg-gradient-to-tr from-pink-400 to-purple-500',
          'bg-gradient-to-tr from-purple-400 to-indigo-500',
          'bg-gradient-to-tr from-rose-400 to-amber-500',
          'bg-gradient-to-tr from-fuchsia-400 to-pink-500'
        ];
        const randomGradient = avatarGradients[Math.floor(Math.random() * avatarGradients.length)];

        const newUserDoc = {
          id: uid,
          name: fbUser.displayName || 'Estudiante VocAcción',
          email: fbUser.email || '',
          age: 17,
          educationLevel: 'Último año de Bachillerato / Secundaria',
          city: '',
          country: 'Colombia',
          avatarColor: randomGradient,
          createdAt: new Date().toISOString()
        };

        await setDoc(doc(db, USERS_COLLECTION, uid), newUserDoc);

        // Initialize clean favorites document
        await setDoc(doc(db, USERS_COLLECTION, uid, 'data', 'favorites'), {
          id: uid,
          savedCareers: [],
          savedUniversities: [],
          savedScholarships: [],
          updatedAt: new Date().toISOString()
        });

        fullUser = {
          ...newUserDoc,
          savedCareers: [],
          savedUniversities: [],
          savedScholarships: [],
          testHistory: [],
          answeredQuestionIds: []
        };
      }

      try {
        sessionStorage.setItem('vocaccion_session_authenticated', 'true');
      } catch (e) {
        // ignore
      }

      this.localFallbackUser = fullUser;
      return { user: fullUser };
    } catch (err: any) {
      console.error('Google login error:', err);
      let errorMsg = 'No se pudo iniciar sesión con Google.';
      if (err.code === 'auth/popup-closed-by-user') {
        errorMsg = 'El inicio de sesión fue cancelado (cerraste la ventana de Google).';
      } else if (err.code === 'auth/popup-blocked') {
        errorMsg = 'El navegador bloqueó la ventana emergente de Google. Habilita ventanas emergentes e inténtalo de nuevo.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        errorMsg = 'Operación cancelada.';
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        errorMsg = 'Ya existe una cuenta con este correo pero con otro método de inicio de sesión.';
      } else if (err.message) {
        errorMsg = err.message;
      }
      return { user: null, error: errorMsg };
    }
  }

  /**
   * Sign in with Firebase Auth email & password
   */
  static async loginUser(email: string, password: string): Promise<{ user: User | null; error?: string }> {
    try {
      const cleanEmail = email.trim().toLowerCase();

      // Support built-in Demo Account without requiring Google or registration
      if (
        cleanEmail === 'demo@vocaccion.edu' || 
        cleanEmail === 'demo@estudiante.edu' || 
        cleanEmail === 'demo'
      ) {
        const demoUser = this.setDemoUser();
        return { user: demoUser };
      }

      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const uid = userCredential.user.uid;
      let fullUser = await this.getUserProfile(uid);

      if (!fullUser) {
        const newUserDoc = {
          id: uid,
          name: userCredential.user.displayName || email.split('@')[0] || 'Estudiante',
          email: userCredential.user.email || email.trim().toLowerCase(),
          age: 17,
          educationLevel: 'Último año de Bachillerato / Secundaria',
          city: '',
          country: 'Colombia',
          avatarColor: 'bg-gradient-to-tr from-pink-400 to-purple-500',
          createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, USERS_COLLECTION, uid), newUserDoc);
        await setDoc(doc(db, USERS_COLLECTION, uid, 'data', 'favorites'), {
          id: uid,
          savedCareers: [],
          savedUniversities: [],
          savedScholarships: [],
          updatedAt: new Date().toISOString()
        });
        fullUser = {
          ...newUserDoc,
          savedCareers: [],
          savedUniversities: [],
          savedScholarships: [],
          testHistory: [],
          answeredQuestionIds: []
        };
      }

      try {
        sessionStorage.setItem('vocaccion_session_authenticated', 'true');
      } catch (e) {
        // ignore
      }

      this.localFallbackUser = fullUser;
      return { user: fullUser };
    } catch (err: any) {
      console.error('Firebase login error:', err);
      let errorMsg = 'Correo o contraseña incorrectos.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMsg = 'El correo o la contraseña no coinciden. Verifica tus credenciales.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMsg = 'Demasiados intentos fallidos. Intenta más tarde o restablece tu contraseña.';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'El formato del correo electrónico no es válido.';
      }
      return { user: null, error: errorMsg };
    }
  }

  /**
   * Sign in with Demo User
   */
  static setDemoUser(): User {
    try {
      sessionStorage.setItem('vocaccion_session_authenticated', 'true');
    } catch (e) {
      // ignore
    }
    this.localFallbackUser = this.getOrCreateDemoUser();
    return this.localFallbackUser;
  }

  /**
   * Log out from Firebase Auth
   */
  static async logout(): Promise<void> {
    try {
      localStorage.removeItem('vocaccion_demo_active');
    } catch (e) {
      // ignore
    }
    try {
      sessionStorage.removeItem('vocaccion_session_authenticated');
    } catch (e) {
      // ignore
    }
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Error logging out from Firebase:', e);
    }
    this.localFallbackUser = null;
  }

  /**
   * Send password reset email via Firebase Auth
   */
  static async sendPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { success: true };
    } catch (err: any) {
      console.error('Password reset error:', err);
      let errorMsg = 'No se pudo enviar el correo de restablecimiento.';
      if (err.code === 'auth/user-not-found') {
        errorMsg = 'No encontramos una cuenta registrada con este correo.';
      }
      return { success: false, error: errorMsg };
    }
  }

  /**
   * Update student profile fields in Firestore
   */
  static async updateUser(userId: string, data: Partial<User>): Promise<User | null> {
    try {
      if (userId === DEMO_USER_ID) {
        if (!this.localFallbackUser) this.localFallbackUser = this.getOrCreateDemoUser();
        this.localFallbackUser = { ...this.localFallbackUser, ...data };
        this.saveDemoUser(this.localFallbackUser);
        return this.localFallbackUser;
      }

      const userDocRef = doc(db, USERS_COLLECTION, userId);
      const updatePayload: Record<string, any> = {
        updatedAt: new Date().toISOString()
      };
      if (data.name !== undefined) updatePayload.name = data.name;
      if (data.age !== undefined) updatePayload.age = data.age;
      if (data.educationLevel !== undefined) updatePayload.educationLevel = data.educationLevel;
      if (data.city !== undefined) updatePayload.city = data.city;
      if (data.country !== undefined) updatePayload.country = data.country;
      if (data.avatarColor !== undefined) updatePayload.avatarColor = data.avatarColor;

      await updateDoc(userDocRef, updatePayload);
      return await this.getUserProfile(userId);
    } catch (e) {
      console.error('Error updating user in Firestore:', e);
      return null;
    }
  }

  /**
   * Save a vocational test result in Firestore under `/users/{userId}/tests/{testId}`
   */
  static async addTestResultToUser(userId: string, testResult: TestResult): Promise<User | null> {
    try {
      const newlyAnswered = testResult.questionIdsAnswered || [];

      if (userId === DEMO_USER_ID) {
        if (!this.localFallbackUser) this.localFallbackUser = this.getOrCreateDemoUser();
        const updatedHistory = [testResult, ...(this.localFallbackUser.testHistory || [])];
        const prevAnswered = this.localFallbackUser.answeredQuestionIds || [];
        const mergedAnswered = Array.from(new Set([...prevAnswered, ...newlyAnswered]));

        this.localFallbackUser = {
          ...this.localFallbackUser,
          testHistory: updatedHistory,
          answeredQuestionIds: mergedAnswered
        };
        this.saveDemoUser(this.localFallbackUser);
        return this.localFallbackUser;
      }

      // Add to Firestore tests subcollection
      const testDocRef = doc(db, USERS_COLLECTION, userId, 'tests', testResult.id);
      await setDoc(testDocRef, {
        ...testResult,
        userId,
        createdAt: new Date().toISOString()
      });

      // Update answeredQuestionIds on the main user document
      if (newlyAnswered.length > 0) {
        try {
          const userDocRef = doc(db, USERS_COLLECTION, userId);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const currentAnswered = userSnap.data().answeredQuestionIds || [];
            const merged = Array.from(new Set([...currentAnswered, ...newlyAnswered]));
            await updateDoc(userDocRef, {
              answeredQuestionIds: merged,
              updatedAt: new Date().toISOString()
            });
          }
        } catch (err) {
          console.warn('Could not update answeredQuestionIds on user doc:', err);
        }
      }

      return await this.getUserProfile(userId);
    } catch (e) {
      console.error('Error saving test result to Firestore:', e);
      return null;
    }
  }

  /**
   * Toggle a career, university, or scholarship in user favorites in Firestore
   */
  static async toggleFavorite(
    userId: string, 
    type: 'career' | 'university' | 'scholarship', 
    itemId: string
  ): Promise<User | null> {
    try {
      if (userId === DEMO_USER_ID) {
        if (!this.localFallbackUser) this.localFallbackUser = this.getOrCreateDemoUser();
        let listKey: 'savedCareers' | 'savedUniversities' | 'savedScholarships' = 'savedCareers';
        if (type === 'university') listKey = 'savedUniversities';
        if (type === 'scholarship') listKey = 'savedScholarships';

        const curList = this.localFallbackUser[listKey] || [];
        const updatedList = curList.includes(itemId)
          ? curList.filter(id => id !== itemId)
          : [...curList, itemId];

        this.localFallbackUser = {
          ...this.localFallbackUser,
          [listKey]: updatedList
        };
        this.saveDemoUser(this.localFallbackUser);
        return this.localFallbackUser;
      }

      const user = await this.getUserProfile(userId);
      if (!user) return null;

      let listKey: 'savedCareers' | 'savedUniversities' | 'savedScholarships' = 'savedCareers';
      if (type === 'university') listKey = 'savedUniversities';
      if (type === 'scholarship') listKey = 'savedScholarships';

      const currentList = user[listKey] || [];
      const updatedList = currentList.includes(itemId)
        ? currentList.filter(id => id !== itemId)
        : [...currentList, itemId];

      const favDocRef = doc(db, USERS_COLLECTION, userId, 'data', 'favorites');
      await setDoc(favDocRef, {
        id: userId,
        savedCareers: listKey === 'savedCareers' ? updatedList : user.savedCareers,
        savedUniversities: listKey === 'savedUniversities' ? updatedList : user.savedUniversities,
        savedScholarships: listKey === 'savedScholarships' ? updatedList : user.savedScholarships,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      return await this.getUserProfile(userId);
    } catch (e) {
      console.error('Error toggling favorite in Firestore:', e);
      return null;
    }
  }

  /**
   * Delete a test result from user history
   */
  static async deleteTestResult(userId: string, testId: string): Promise<User | null> {
    try {
      if (userId === DEMO_USER_ID) {
        if (!this.localFallbackUser) this.localFallbackUser = this.getOrCreateDemoUser();
        this.localFallbackUser = {
          ...this.localFallbackUser,
          testHistory: (this.localFallbackUser.testHistory || []).filter(t => t.id !== testId)
        };
        this.saveDemoUser(this.localFallbackUser);
        return this.localFallbackUser;
      }

      const testDocRef = doc(db, USERS_COLLECTION, userId, 'tests', testId);
      await deleteDoc(testDocRef);

      return await this.getUserProfile(userId);
    } catch (e) {
      console.error('Error deleting test result from Firestore:', e);
      return null;
    }
  }
}
