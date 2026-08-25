import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
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
   * Listen to Firebase Auth state changes and sync user profile + favorites + test history from Firestore
   */
  static initAuthListener(callback: (user: User | null) => void): () => void {
    this.authListeners.push(callback);

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        try {
          const user = await this.getUserProfile(fbUser.uid);
          if (user) {
            this.localFallbackUser = user;
            callback(user);
            return;
          }
        } catch (err) {
          console.error('Error fetching user profile from Firestore:', err);
        }
      }

      // If no auth user or error, notify with fallback or null
      callback(this.localFallbackUser);
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
        testHistory
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
   * Sign in with Firebase Auth email & password
   */
  static async loginUser(email: string, password: string): Promise<{ user: User | null; error?: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const uid = userCredential.user.uid;
      const fullUser = await this.getUserProfile(uid);

      if (fullUser) {
        this.localFallbackUser = fullUser;
        return { user: fullUser };
      }
      return { user: null, error: 'No se encontraron datos del perfil.' };
    } catch (err: any) {
      console.error('Firebase login error:', err);
      let errorMsg = 'Correo o contraseña incorrectos.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMsg = 'El correo o la contraseña no coinciden. Verifica tus credenciales.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMsg = 'Demasiados intentos fallidos. Intenta más tarde o restablece tu contraseña.';
      }
      return { user: null, error: errorMsg };
    }
  }

  /**
   * Sign in with Demo User
   */
  static setDemoUser(): User {
    this.localFallbackUser = { ...INITIAL_DEMO_USER };
    return this.localFallbackUser;
  }

  /**
   * Log out from Firebase Auth
   */
  static async logout(): Promise<void> {
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
        if (!this.localFallbackUser) this.localFallbackUser = { ...INITIAL_DEMO_USER };
        this.localFallbackUser = { ...this.localFallbackUser, ...data };
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
      if (userId === DEMO_USER_ID) {
        if (!this.localFallbackUser) this.localFallbackUser = { ...INITIAL_DEMO_USER };
        const updatedHistory = [testResult, ...(this.localFallbackUser.testHistory || [])];
        const updatedCareers = [...this.localFallbackUser.savedCareers];
        testResult.recommendedCareers.slice(0, 3).forEach(rc => {
          if (!updatedCareers.includes(rc.careerId)) {
            updatedCareers.push(rc.careerId);
          }
        });
        this.localFallbackUser = {
          ...this.localFallbackUser,
          testHistory: updatedHistory,
          savedCareers: updatedCareers
        };
        return this.localFallbackUser;
      }

      // Add to Firestore tests subcollection
      const testDocRef = doc(db, USERS_COLLECTION, userId, 'tests', testResult.id);
      await setDoc(testDocRef, {
        ...testResult,
        userId,
        createdAt: new Date().toISOString()
      });

      // Also merge top careers into user favorites if helpful
      const user = await this.getUserProfile(userId);
      if (user) {
        const updatedCareers = [...user.savedCareers];
        let hasNew = false;
        testResult.recommendedCareers.slice(0, 3).forEach(rc => {
          if (!updatedCareers.includes(rc.careerId)) {
            updatedCareers.push(rc.careerId);
            hasNew = true;
          }
        });

        if (hasNew) {
          const favDocRef = doc(db, USERS_COLLECTION, userId, 'data', 'favorites');
          await setDoc(favDocRef, {
            id: userId,
            savedCareers: updatedCareers,
            savedUniversities: user.savedUniversities,
            savedScholarships: user.savedScholarships,
            updatedAt: new Date().toISOString()
          }, { merge: true });
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
        if (!this.localFallbackUser) this.localFallbackUser = { ...INITIAL_DEMO_USER };
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
        if (!this.localFallbackUser) this.localFallbackUser = { ...INITIAL_DEMO_USER };
        this.localFallbackUser = {
          ...this.localFallbackUser,
          testHistory: (this.localFallbackUser.testHistory || []).filter(t => t.id !== testId)
        };
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
