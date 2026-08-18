import { CAREERS_DATA, SCHOLARSHIPS_DATA, UNIVERSITIES_DATA } from '../models/data';
import { Career, Scholarship, TestResult, University, User } from '../types';

const STORAGE_USERS_KEY = 'vocaccion_users_db_v1';
const STORAGE_SESSION_KEY = 'vocaccion_active_session_v1';
const STORAGE_VERIFICATION_CODES = 'vocaccion_recovery_codes_v1';

// Seed demo user
const INITIAL_DEMO_USER: User = {
  id: 'user-demo-1',
  name: 'Camila Rodriguez',
  email: 'camila@estudiante.edu',
  password: 'Password123!',
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
  static getUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_USERS_KEY);
      if (!data) {
        const initial = [INITIAL_DEMO_USER];
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading users from storage:', e);
      return [INITIAL_DEMO_USER];
    }
  }

  static saveUsers(users: User[]): void {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to storage:', e);
    }
  }

  static getActiveUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_SESSION_KEY);
      if (!data) {
        return null;
      }
      const user: User = JSON.parse(data);
      // Synchronize with database to ensure fresh saved items
      const users = this.getUsers();
      const freshUser = users.find(u => u.id === user.id);
      return freshUser || user;
    } catch (e) {
      return null;
    }
  }

  static setActiveUser(user: User | null): void {
    try {
      if (user) {
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_SESSION_KEY);
      }
    } catch (e) {
      console.error('Error setting session:', e);
    }
  }

  static updateUser(updated: Partial<User> & { id: string }): User | null {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === updated.id);
    if (index === -1) return null;

    const fullUpdatedUser: User = {
      ...users[index],
      ...updated
    };

    users[index] = fullUpdatedUser;
    this.saveUsers(users);

    const active = this.getActiveUser();
    if (active && active.id === updated.id) {
      this.setActiveUser(fullUpdatedUser);
    }

    return fullUpdatedUser;
  }

  static addTestResultToUser(userId: string, testResult: TestResult): User | null {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return null;

    const user = users[index];
    const updatedTestHistory = [testResult, ...(user.testHistory || [])];
    
    // Also merge top recommended careers into user favorites if empty
    const updatedSavedCareers = [...user.savedCareers];
    testResult.recommendedCareers.slice(0, 3).forEach(rc => {
      if (!updatedSavedCareers.includes(rc.careerId)) {
        updatedSavedCareers.push(rc.careerId);
      }
    });

    const fullUser: User = {
      ...user,
      testHistory: updatedTestHistory,
      savedCareers: updatedSavedCareers
    };

    users[index] = fullUser;
    this.saveUsers(users);

    const active = this.getActiveUser();
    if (active && active.id === userId) {
      this.setActiveUser(fullUser);
    }

    return fullUser;
  }

  static toggleFavorite(userId: string, type: 'career' | 'university' | 'scholarship', itemId: string): User | null {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return null;

    const user = users[index];
    let listKey: 'savedCareers' | 'savedUniversities' | 'savedScholarships' = 'savedCareers';
    if (type === 'university') listKey = 'savedUniversities';
    if (type === 'scholarship') listKey = 'savedScholarships';

    const currentList = user[listKey] || [];
    let updatedList: string[];
    if (currentList.includes(itemId)) {
      updatedList = currentList.filter(id => id !== itemId);
    } else {
      updatedList = [...currentList, itemId];
    }

    const updatedUser = {
      ...user,
      [listKey]: updatedList
    };

    users[index] = updatedUser;
    this.saveUsers(users);

    const active = this.getActiveUser();
    if (active && active.id === userId) {
      this.setActiveUser(updatedUser);
    }

    return updatedUser;
  }

  // Recovery code management
  static createRecoveryCode(email: string): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_VERIFICATION_CODES) || '{}');
      existing[email.toLowerCase().trim()] = {
        code,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_VERIFICATION_CODES, JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }
    return code;
  }

  static verifyRecoveryCode(email: string, code: string): boolean {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_VERIFICATION_CODES) || '{}');
      const item = existing[email.toLowerCase().trim()];
      if (!item) return false;
      // Valid for 30 minutes
      const isValidTime = Date.now() - item.timestamp < 30 * 60 * 1000;
      return isValidTime && item.code.trim() === code.trim();
    } catch (e) {
      return false;
    }
  }

  static resetUserPassword(email: string, newPassword: string): boolean {
    const users = this.getUsers();
    const index = users.findIndex(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());
    if (index === -1) return false;

    users[index].password = newPassword;
    this.saveUsers(users);

    // clear verification code
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_VERIFICATION_CODES) || '{}');
      delete existing[email.toLowerCase().trim()];
      localStorage.setItem(STORAGE_VERIFICATION_CODES, JSON.stringify(existing));
    } catch (e) {}

    return true;
  }
}
