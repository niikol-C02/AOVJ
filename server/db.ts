import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import crypto from 'node:crypto';
import { hashPassword, verifyPassword, generateSessionToken } from './auth';

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  age: number;
  educationLevel: string;
  city: string;
  country: string;
  avatarColor: string;
  createdAt: string;
  savedCareers: string[];
  savedUniversities: string[];
  savedScholarships: string[];
  testHistory: any[];
  answeredQuestionIds: number[];
}

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, 'vocaccion.db');
  dbInstance = new DatabaseSync(dbPath);

  // Initialize SQLite schema
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      age INTEGER DEFAULT 17,
      education_level TEXT,
      city TEXT,
      country TEXT DEFAULT 'Colombia',
      avatar_color TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_favorites (
      user_id TEXT PRIMARY KEY,
      saved_careers TEXT NOT NULL DEFAULT '[]',
      saved_universities TEXT NOT NULL DEFAULT '[]',
      saved_scholarships TEXT NOT NULL DEFAULT '[]',
      updated_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_tests (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      test_data TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // Seed default Demo User if not present
  seedDemoUser(dbInstance);

  return dbInstance;
}

function seedDemoUser(db: DatabaseSync) {
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get('demo@vocaccion.edu') as any;
  if (!existing) {
    const demoId = 'user-demo-1';
    const now = new Date().toISOString();
    const demoPasswordHash = hashPassword('demo123');

    db.prepare(`
      INSERT INTO users (id, email, password_hash, name, age, education_level, city, country, avatar_color, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      demoId,
      'demo@vocaccion.edu',
      demoPasswordHash,
      'Valentina Gómez',
      17,
      'Último año de Bachillerato / Secundaria',
      'Bogotá',
      'Colombia',
      'bg-gradient-to-tr from-pink-400 to-purple-500',
      now,
      now
    );

    db.prepare(`
      INSERT OR REPLACE INTO user_favorites (user_id, saved_careers, saved_universities, saved_scholarships, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      demoId,
      JSON.stringify(['ing-software-ia', 'diseno-digital-ux-ui', 'psicologia-clinica']),
      JSON.stringify(['uni-nacional', 'uni-andes']),
      JSON.stringify(['beca-lideres-del-manana', 'beca-talento-tech-global']),
      now
    );

    const demoTest = {
      id: 'test-res-demo-1',
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
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
    };

    db.prepare(`
      INSERT OR REPLACE INTO user_tests (id, user_id, test_data, created_at)
      VALUES (?, ?, ?, ?)
    `).run(
      demoTest.id,
      demoId,
      JSON.stringify(demoTest),
      demoTest.date
    );
  }
}

/**
 * Assemble a full user object with favorites and tests
 */
export function buildUserResponse(userId: string): UserResponse | null {
  const db = getDb();
  const userRow = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
  if (!userRow) return null;

  const favRow = db.prepare('SELECT * FROM user_favorites WHERE user_id = ?').get(userId) as any;
  let savedCareers: string[] = [];
  let savedUniversities: string[] = [];
  let savedScholarships: string[] = [];

  if (favRow) {
    try { savedCareers = JSON.parse(favRow.saved_careers || '[]'); } catch (_) {}
    try { savedUniversities = JSON.parse(favRow.saved_universities || '[]'); } catch (_) {}
    try { savedScholarships = JSON.parse(favRow.saved_scholarships || '[]'); } catch (_) {}
  }

  const testRows = db.prepare('SELECT test_data FROM user_tests WHERE user_id = ? ORDER BY created_at DESC').all(userId) as any[];
  const testHistory: any[] = [];
  const allAnsweredIds = new Set<number>();

  for (const row of testRows) {
    try {
      const parsed = JSON.parse(row.test_data);
      testHistory.push(parsed);
      if (Array.isArray(parsed.questionIdsAnswered)) {
        parsed.questionIdsAnswered.forEach((qid: any) => {
          const num = Number(qid);
          if (!isNaN(num)) allAnsweredIds.add(num);
        });
      }
    } catch (e) {
      console.error('Error parsing test row:', e);
    }
  }

  return {
    id: userRow.id,
    email: userRow.email,
    name: userRow.name,
    age: userRow.age || 17,
    educationLevel: userRow.education_level || 'Último año de Bachillerato / Secundaria',
    city: userRow.city || '',
    country: userRow.country || 'Colombia',
    avatarColor: userRow.avatar_color || 'bg-gradient-to-tr from-pink-400 to-purple-500',
    createdAt: userRow.created_at,
    savedCareers,
    savedUniversities,
    savedScholarships,
    testHistory,
    answeredQuestionIds: Array.from(allAnsweredIds)
  };
}

/**
 * Register a new user in SQLite
 */
export function registerDbUser(data: {
  name: string;
  email: string;
  password: string;
  age?: number;
  educationLevel?: string;
  city?: string;
  country?: string;
}): { user: UserResponse | null; token?: string; error?: string } {
  const db = getDb();
  const cleanEmail = data.email.trim().toLowerCase();

  // 1. Check if email already exists
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
  if (existing) {
    return {
      user: null,
      error: 'Ya existe una cuenta registrada con este correo electrónico. Por favor inicia sesión.'
    };
  }

  // 2. Validate password length
  if (!data.password || data.password.length < 6) {
    return {
      user: null,
      error: 'La contraseña debe contener al menos 6 caracteres.'
    };
  }

  const userId = crypto.randomUUID();
  const now = new Date().toISOString();
  const passwordHash = hashPassword(data.password);

  const avatarGradients = [
    'bg-gradient-to-tr from-pink-400 to-purple-500',
    'bg-gradient-to-tr from-purple-400 to-indigo-500',
    'bg-gradient-to-tr from-rose-400 to-amber-500',
    'bg-gradient-to-tr from-fuchsia-400 to-pink-500',
    'bg-gradient-to-tr from-violet-500 to-purple-600'
  ];
  const randomGradient = avatarGradients[Math.floor(Math.random() * avatarGradients.length)];

  // Insert user
  db.prepare(`
    INSERT INTO users (id, email, password_hash, name, age, education_level, city, country, avatar_color, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    userId,
    cleanEmail,
    passwordHash,
    data.name.trim(),
    data.age || 17,
    data.educationLevel || 'Último año de Bachillerato / Secundaria',
    data.city ? data.city.trim() : '',
    data.country ? data.country.trim() : 'Colombia',
    randomGradient,
    now,
    now
  );

  // Initialize empty favorites
  db.prepare(`
    INSERT INTO user_favorites (user_id, saved_careers, saved_universities, saved_scholarships, updated_at)
    VALUES (?, '[]', '[]', '[]', ?)
  `).run(userId, now);

  // Create session token
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  db.prepare(`
    INSERT INTO sessions (token, user_id, created_at, expires_at)
    VALUES (?, ?, ?, ?)
  `).run(token, userId, now, expiresAt);

  const user = buildUserResponse(userId);
  return { user, token };
}

/**
 * Log in a user with email and password
 */
export function loginDbUser(
  email: string,
  password: string
): { user: UserResponse | null; token?: string; error?: string } {
  const db = getDb();
  const cleanEmail = email.trim().toLowerCase();

  const userRow = db.prepare('SELECT id, password_hash FROM users WHERE email = ?').get(cleanEmail) as any;
  if (!userRow) {
    return {
      user: null,
      error: 'Correo o contraseña incorrectos. Verifica tus credenciales o crea una cuenta nueva.'
    };
  }

  const isValid = verifyPassword(password, userRow.password_hash);
  if (!isValid) {
    return {
      user: null,
      error: 'Correo o contraseña incorrectos. Verifica tus credenciales o crea una cuenta nueva.'
    };
  }

  const token = generateSessionToken();
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  db.prepare(`
    INSERT INTO sessions (token, user_id, created_at, expires_at)
    VALUES (?, ?, ?, ?)
  `).run(token, userRow.id, now, expiresAt);

  const user = buildUserResponse(userRow.id);
  return { user, token };
}

/**
 * Authenticate via session token
 */
export function getUserByToken(token: string): UserResponse | null {
  const db = getDb();
  const session = db.prepare(`
    SELECT user_id, expires_at FROM sessions WHERE token = ?
  `).get(token) as any;

  if (!session) return null;

  // Check expiry
  if (new Date(session.expires_at).getTime() < Date.now()) {
    db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    return null;
  }

  return buildUserResponse(session.user_id);
}

/**
 * Delete session token on logout
 */
export function removeSession(token: string): void {
  const db = getDb();
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

/**
 * Login or create a user via Google OAuth data
 */
export function googleDbUser(data: {
  uid: string;
  email: string;
  displayName?: string;
}): { user: UserResponse | null; token?: string; error?: string } {
  const db = getDb();
  const cleanEmail = data.email.trim().toLowerCase();

  let userRow = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail) as any;
  let userId = userRow?.id;
  const now = new Date().toISOString();

  if (!userId) {
    userId = data.uid || crypto.randomUUID();
    const avatarGradients = [
      'bg-gradient-to-tr from-pink-400 to-purple-500',
      'bg-gradient-to-tr from-purple-400 to-indigo-500',
      'bg-gradient-to-tr from-rose-400 to-amber-500',
      'bg-gradient-to-tr from-fuchsia-400 to-pink-500'
    ];
    const randomGradient = avatarGradients[Math.floor(Math.random() * avatarGradients.length)];
    const dummyHash = hashPassword(crypto.randomUUID());

    db.prepare(`
      INSERT INTO users (id, email, password_hash, name, age, education_level, city, country, avatar_color, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      cleanEmail,
      dummyHash,
      data.displayName || 'Estudiante VocAcción',
      17,
      'Último año de Bachillerato / Secundaria',
      '',
      'Colombia',
      randomGradient,
      now,
      now
    );

    db.prepare(`
      INSERT INTO user_favorites (user_id, saved_careers, saved_universities, saved_scholarships, updated_at)
      VALUES (?, '[]', '[]', '[]', ?)
    `).run(userId, now);
  }

  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  db.prepare(`
    INSERT INTO sessions (token, user_id, created_at, expires_at)
    VALUES (?, ?, ?, ?)
  `).run(token, userId, now, expiresAt);

  const user = buildUserResponse(userId);
  return { user, token };
}

/**
 * Update user profile
 */
export function updateDbUser(userId: string, data: Partial<UserResponse>): UserResponse | null {
  const db = getDb();
  const now = new Date().toISOString();

  const updates: string[] = ['updated_at = ?'];
  const values: any[] = [now];

  if (data.name !== undefined) {
    updates.push('name = ?');
    values.push(data.name.trim());
  }
  if (data.age !== undefined) {
    updates.push('age = ?');
    values.push(data.age);
  }
  if (data.educationLevel !== undefined) {
    updates.push('education_level = ?');
    values.push(data.educationLevel);
  }
  if (data.city !== undefined) {
    updates.push('city = ?');
    values.push(data.city.trim());
  }
  if (data.country !== undefined) {
    updates.push('country = ?');
    values.push(data.country.trim());
  }
  if (data.avatarColor !== undefined) {
    updates.push('avatar_color = ?');
    values.push(data.avatarColor);
  }

  values.push(userId);
  db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...values);

  return buildUserResponse(userId);
}

/**
 * Toggle favorite item (career, university, scholarship)
 */
export function toggleDbFavorite(
  userId: string,
  type: 'career' | 'university' | 'scholarship',
  itemId: string
): UserResponse | null {
  const db = getDb();
  const now = new Date().toISOString();

  const favRow = db.prepare('SELECT * FROM user_favorites WHERE user_id = ?').get(userId) as any;
  let savedCareers: string[] = [];
  let savedUniversities: string[] = [];
  let savedScholarships: string[] = [];

  if (favRow) {
    try { savedCareers = JSON.parse(favRow.saved_careers || '[]'); } catch (_) {}
    try { savedUniversities = JSON.parse(favRow.saved_universities || '[]'); } catch (_) {}
    try { savedScholarships = JSON.parse(favRow.saved_scholarships || '[]'); } catch (_) {}
  }

  if (type === 'career') {
    savedCareers = savedCareers.includes(itemId)
      ? savedCareers.filter(id => id !== itemId)
      : [...savedCareers, itemId];
  } else if (type === 'university') {
    savedUniversities = savedUniversities.includes(itemId)
      ? savedUniversities.filter(id => id !== itemId)
      : [...savedUniversities, itemId];
  } else if (type === 'scholarship') {
    savedScholarships = savedScholarships.includes(itemId)
      ? savedScholarships.filter(id => id !== itemId)
      : [...savedScholarships, itemId];
  }

  db.prepare(`
    INSERT INTO user_favorites (user_id, saved_careers, saved_universities, saved_scholarships, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      saved_careers = excluded.saved_careers,
      saved_universities = excluded.saved_universities,
      saved_scholarships = excluded.saved_scholarships,
      updated_at = excluded.updated_at
  `).run(
    userId,
    JSON.stringify(savedCareers),
    JSON.stringify(savedUniversities),
    JSON.stringify(savedScholarships),
    now
  );

  return buildUserResponse(userId);
}

/**
 * Add test result
 */
export function addDbTestResult(userId: string, testResult: any): UserResponse | null {
  const db = getDb();
  const testId = testResult.id || crypto.randomUUID();
  const now = testResult.date || new Date().toISOString();

  db.prepare(`
    INSERT OR REPLACE INTO user_tests (id, user_id, test_data, created_at)
    VALUES (?, ?, ?, ?)
  `).run(
    testId,
    userId,
    JSON.stringify(testResult),
    now
  );

  return buildUserResponse(userId);
}

/**
 * Delete test result
 */
export function deleteDbTestResult(userId: string, testId: string): UserResponse | null {
  const db = getDb();
  db.prepare('DELETE FROM user_tests WHERE id = ? AND user_id = ?').run(testId, userId);
  return buildUserResponse(userId);
}
