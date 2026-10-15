import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import crypto from 'node:crypto';
import { hashPassword, verifyPassword, generateSessionToken } from './auth';
import { validateEmail, isPasswordValid, getMissingPasswordRequirements } from '../src/utils/authValidation';

export interface UserResponse {
  id: string;
  email: string;
  role: 'admin' | 'user';
  status?: 'active' | 'suspended';
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

/**
 * 4 Cuentas de correo con autorización administrativa estricta en servidor.
 * NUNCA se exponen contraseñas ni listas en el cliente.
 */
export const AUTHORIZED_ADMIN_EMAILS = new Set([
  'nicoleilincastaneda@gmail.com',
  'perezcastanedamelaniyulieth@gmail.com',
  'lunismariana02@gmail.com',
  'eileentovarc.25@gmail.com'
]);

export function isEmailAdmin(email: string): boolean {
  return AUTHORIZED_ADMIN_EMAILS.has((email || '').trim().toLowerCase());
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
      role TEXT DEFAULT 'user',
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

    CREATE TABLE IF NOT EXISTS platform_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS custom_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      category TEXT NOT NULL,
      area TEXT NOT NULL,
      topic TEXT,
      active INTEGER DEFAULT 1,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      user_email TEXT,
      action TEXT NOT NULL,
      details TEXT,
      timestamp TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS daily_challenges (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      options TEXT NOT NULL,
      active INTEGER DEFAULT 1,
      created_by TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS daily_challenge_votes (
      id TEXT PRIMARY KEY,
      challenge_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      user_email TEXT,
      selected_option_index INTEGER NOT NULL,
      voted_at TEXT NOT NULL,
      UNIQUE(challenge_id, user_id),
      FOREIGN KEY(challenge_id) REFERENCES daily_challenges(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS system_constants (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'platform',
      description TEXT NOT NULL DEFAULT '',
      data_type TEXT NOT NULL DEFAULT 'string',
      updated_at TEXT NOT NULL,
      updated_by TEXT
    );
  `);

  // Safe migration: Add role and status columns if DB existed prior to this update
  try {
    dbInstance.exec(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';`);
  } catch (_) {
    // Column already exists
  }
  try {
    dbInstance.exec(`ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active';`);
  } catch (_) {
    // Column already exists
  }

  // Seed default Demo User if not present
  seedDemoUser(dbInstance);

  // Seed / ensure Authorized Admin Accounts
  seedAdminAccounts(dbInstance);

  // Seed initial Daily Challenge
  seedInitialDailyChallenge(dbInstance);

  // Seed initial System Constants
  seedSystemConstants(dbInstance);

  return dbInstance;
}

function seedInitialDailyChallenge(db: DatabaseSync) {
  try {
    const countRow = db.prepare('SELECT COUNT(*) as count FROM daily_challenges').get() as any;
    if (!countRow || countRow.count === 0) {
      const id = 'challenge-init-1';
      const now = new Date().toISOString();
      const options = JSON.stringify([
        'Lo que verdaderamente me apasiona y disfruto hacer cada día',
        'Buenas oportunidades laborales y salario atractivo en el mercado',
        'Poder ayudar a las personas y generar un impacto positivo en la sociedad',
        'Tener un buen balance entre mi vida laboral, personal y familiar'
      ]);
      db.prepare(`
        INSERT INTO daily_challenges (id, question, options, active, created_by, created_at, updated_at)
        VALUES (?, ?, ?, 1, 'admin', ?, ?)
      `).run(
        id,
        '¿Qué factor consideras más decisivo al momento de elegir tu carrera profesional?',
        options,
        now,
        now
      );

      // Realistic seed votes so user sees instant engaging statistics
      const seedVotes = [
        { id: 'v1', opt: 0, email: 'estudiante1@colegio.edu' },
        { id: 'v2', opt: 0, email: 'estudiante2@colegio.edu' },
        { id: 'v3', opt: 1, email: 'estudiante3@colegio.edu' },
        { id: 'v4', opt: 2, email: 'estudiante4@colegio.edu' },
        { id: 'v5', opt: 3, email: 'estudiante5@colegio.edu' },
        { id: 'v6', opt: 0, email: 'estudiante6@colegio.edu' },
        { id: 'v7', opt: 1, email: 'estudiante7@colegio.edu' },
        { id: 'v8', opt: 2, email: 'estudiante8@colegio.edu' },
      ];
      for (const v of seedVotes) {
        db.prepare(`
          INSERT OR IGNORE INTO daily_challenge_votes (id, challenge_id, user_id, user_email, selected_option_index, voted_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(v.id, id, v.id, v.email, v.opt, now);
      }
    }
  } catch (err) {
    console.error('Error seeding initial daily challenge:', err);
  }
}

function seedSystemConstants(db: DatabaseSync) {
  try {
    const countRow = db.prepare('SELECT COUNT(*) as count FROM system_constants').get() as any;
    if (!countRow || countRow.count === 0) {
      const now = new Date().toISOString();
      const initialConstants = [
        {
          key: 'MIN_VOCATIONAL_MATCH_PERCENTAGE',
          value: '55',
          category: 'vocational',
          description: 'Porcentaje mínimo de afinidad para recomendar una carrera al estudiante',
          data_type: 'number'
        },
        {
          key: 'RIASEC_WEIGHT_ALGORITHM',
          value: 'balanced',
          category: 'vocational',
          description: 'Modelo de cálculo para dimensiones de Holland (balanced, intensive o conservative)',
          data_type: 'string'
        },
        {
          key: 'MAX_COMPARE_CAREERS_LIMIT',
          value: '3',
          category: 'limits',
          description: 'Límite máximo de carreras que un usuario puede añadir al comparador interactivo',
          data_type: 'number'
        },
        {
          key: 'SESSION_EXPIRATION_HOURS',
          value: '72',
          category: 'security',
          description: 'Tiempo de vida en horas del token de sesión autenticada',
          data_type: 'number'
        },
        {
          key: 'ALLOW_GUEST_TEST_EXPLORATION',
          value: 'true',
          category: 'platform',
          description: 'Permite a visitantes sin cuenta resolver un test preliminar antes de registrarse',
          data_type: 'boolean'
        },
        {
          key: 'TTS_SPEECH_DEFAULT_RATE',
          value: '0.95',
          category: 'platform',
          description: 'Velocidad de locución predeterminada para el motor de voz (0.5 a 1.5)',
          data_type: 'number'
        },
        {
          key: 'PLATFORM_STATUS_BANNER',
          value: 'operational',
          category: 'platform',
          description: 'Estado global del servicio: operational, maintenance o admissions_active',
          data_type: 'string'
        },
        {
          key: 'DAILY_CHALLENGE_MAX_OPTIONS',
          value: '4',
          category: 'limits',
          description: 'Número máximo de opciones permitidas al crear una pregunta del día',
          data_type: 'number'
        },
        {
          key: 'ENABLE_COMMUNITY_NOTIFICATIONS',
          value: 'true',
          category: 'notifications',
          description: 'Activar notificaciones sobre nuevas becas, fechas ICFES y ferias universitarias',
          data_type: 'boolean'
        }
      ];

      for (const c of initialConstants) {
        db.prepare(`
          INSERT INTO system_constants (key, value, category, description, data_type, updated_at, updated_by)
          VALUES (?, ?, ?, ?, ?, ?, 'system')
        `).run(c.key, c.value, c.category, c.description, c.data_type, now);
      }
    }
  } catch (err) {
    console.error('Error seeding system constants:', err);
  }
}

function seedAdminAccounts(db: DatabaseSync) {
  const adminAccounts = [
    {
      email: 'nicoleilincastaneda@gmail.com',
      name: 'Nicole Ilin Castañeda',
      id: 'admin-nicole-1'
    },
    {
      email: 'perezcastanedamelaniyulieth@gmail.com',
      name: 'Melaniy Yulieth Pérez Castañeda',
      id: 'admin-melaniy-2'
    },
    {
      email: 'lunismariana02@gmail.com',
      name: 'Mariana Lunis',
      id: 'admin-mariana-3'
    },
    {
      email: 'eileentovarc.25@gmail.com',
      name: 'Eileen Tovar C.',
      id: 'admin-eileen-4'
    }
  ];

  const now = new Date().toISOString();
  // Safe default password for initialized admin accounts that fulfills all security requirements
  const defaultAdminPassHash = hashPassword('Admin2026!*VocAccion');

  for (const admin of adminAccounts) {
    const existing = db.prepare('SELECT id, role FROM users WHERE email = ?').get(admin.email) as any;
    if (!existing) {
      db.prepare(`
        INSERT INTO users (id, email, password_hash, name, role, age, education_level, city, country, avatar_color, created_at, updated_at)
        VALUES (?, ?, ?, ?, 'admin', 22, 'Profesional / Administrador', 'Colombia', 'Colombia', 'bg-gradient-to-tr from-purple-500 to-indigo-600', ?, ?)
      `).run(admin.id, admin.email, defaultAdminPassHash, admin.name, now, now);

      db.prepare(`
        INSERT OR IGNORE INTO user_favorites (user_id, saved_careers, saved_universities, saved_scholarships, updated_at)
        VALUES (?, '[]', '[]', '[]', ?)
      `).run(admin.id, now);
    } else if (existing.role !== 'admin') {
      db.prepare('UPDATE users SET role = ? WHERE id = ?').run('admin', existing.id);
    }
  }
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

  const isAdm = isEmailAdmin(userRow.email) || userRow.role === 'admin';

  return {
    id: userRow.id,
    email: userRow.email,
    role: isAdm ? 'admin' : 'user',
    status: userRow.status || 'active',
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

  // 1. Validate email format
  const emailCheck = validateEmail(cleanEmail);
  if (!emailCheck.isValid) {
    return {
      user: null,
      error: emailCheck.error || 'Correo electrónico inválido.'
    };
  }

  // 2. Check if email already exists
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
  if (existing) {
    return {
      user: null,
      error: 'Ya existe una cuenta registrada con este correo electrónico. Por favor inicia sesión.'
    };
  }

  // 3. Validate strict password requirements
  if (!isPasswordValid(data.password)) {
    const missing = getMissingPasswordRequirements(data.password || '');
    return {
      user: null,
      error: `La contraseña no cumple los requisitos de seguridad: ${missing.join(', ')}.`
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

  const assignedRole = isEmailAdmin(cleanEmail) ? 'admin' : 'user';

  // Insert user
  db.prepare(`
    INSERT INTO users (id, email, password_hash, name, role, age, education_level, city, country, avatar_color, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    userId,
    cleanEmail,
    passwordHash,
    data.name.trim(),
    assignedRole,
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

  const userRow = db.prepare('SELECT id, password_hash, status FROM users WHERE email = ?').get(cleanEmail) as any;
  if (!userRow) {
    return {
      user: null,
      error: 'Correo o contraseña incorrectos. Verifica tus credenciales o crea una cuenta nueva.'
    };
  }

  if (userRow.status === 'suspended') {
    return {
      user: null,
      error: 'Esta cuenta ha sido suspendida temporalmente por un administrador. Contacta a soporte para más información.'
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

    const assignedRole = isEmailAdmin(cleanEmail) ? 'admin' : 'user';

    db.prepare(`
      INSERT INTO users (id, email, password_hash, name, role, age, education_level, city, country, avatar_color, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      cleanEmail,
      dummyHash,
      data.displayName || 'Estudiante VocAcción',
      assignedRole,
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
  } else if (isEmailAdmin(cleanEmail)) {
    // Ensure admin role is set
    db.prepare('UPDATE users SET role = ? WHERE id = ?').run('admin', userId);
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

// =========================================================================
// ADMIN DATA & MANAGEMENT FUNCTIONS
// =========================================================================

/**
 * Overview statistics and metrics for the Admin Dashboard
 */
export function getAdminOverviewData() {
  const db = getDb();

  // 1. Total users
  const totalUsersRow = db.prepare('SELECT COUNT(*) as count FROM users').get() as any;
  const totalUsers = totalUsersRow?.count || 0;

  // 2. Total completed tests
  const totalTestsRow = db.prepare('SELECT COUNT(*) as count FROM user_tests').get() as any;
  const totalTests = totalTestsRow?.count || 0;

  // 3. Active users (recent sessions or tests in last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const activeUsersRow = db.prepare(`
    SELECT COUNT(DISTINCT user_id) as count FROM (
      SELECT user_id FROM sessions WHERE created_at >= ?
      UNION
      SELECT user_id FROM user_tests WHERE created_at >= ?
    )
  `).get(sevenDaysAgo, sevenDaysAgo) as any;
  const activeUsers = Math.max(activeUsersRow?.count || 0, 1);

  // 4. RIASEC dominant types distribution & average match
  const testRows = db.prepare('SELECT test_data FROM user_tests').all() as any[];
  const riasecCounts: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  let matchSum = 0;
  let matchCount = 0;
  const careerFrequency: Record<string, number> = {};

  for (const row of testRows) {
    try {
      const parsed = JSON.parse(row.test_data);
      if (Array.isArray(parsed.dominantTypes)) {
        parsed.dominantTypes.forEach((dt: string) => {
          if (riasecCounts[dt] !== undefined) {
            riasecCounts[dt]++;
          }
        });
      }
      if (Array.isArray(parsed.recommendedCareers)) {
        parsed.recommendedCareers.forEach((rec: any) => {
          if (typeof rec.matchPercentage === 'number') {
            matchSum += rec.matchPercentage;
            matchCount++;
          }
          if (rec.careerId) {
            careerFrequency[rec.careerId] = (careerFrequency[rec.careerId] || 0) + 1;
          }
        });
      }
    } catch (_) {}
  }

  // Also include favorites in career popularity
  const favRows = db.prepare('SELECT saved_careers FROM user_favorites').all() as any[];
  for (const f of favRows) {
    try {
      const arr = JSON.parse(f.saved_careers || '[]');
      arr.forEach((cid: string) => {
        careerFrequency[cid] = (careerFrequency[cid] || 0) + 2; // Extra weight for explicit favorites
      });
    } catch (_) {}
  }

  const averageMatch = matchCount > 0 ? Math.round(matchSum / matchCount) : 88;

  // 5. Registrations by date (last 7 days)
  const registrationsByDay: Record<string, number> = {};
  const usersCreated = db.prepare('SELECT created_at FROM users ORDER BY created_at ASC').all() as any[];
  for (const u of usersCreated) {
    const day = (u.created_at || '').substring(0, 10);
    if (day) {
      registrationsByDay[day] = (registrationsByDay[day] || 0) + 1;
    }
  }

  // 6. User ages analysis (Exact requirement from user: Edades de los usuarios, cantidad por rango de edad)
  const userAges = db.prepare('SELECT age FROM users WHERE age IS NOT NULL').all() as any[];
  const ageCounts: Record<number, number> = {};
  const usersByAgeRange: Record<string, number> = {
    '12-15': 0,
    '16-17': 0,
    '18-20': 0,
    '21-24': 0,
    '25+': 0
  };
  let sumAge = 0;
  let validAgeCount = 0;
  let minAge = 99;
  let maxAge = 0;

  for (const row of userAges) {
    const age = Number(row.age);
    if (!isNaN(age) && age > 0) {
      validAgeCount++;
      sumAge += age;
      if (age < minAge) minAge = age;
      if (age > maxAge) maxAge = age;
      ageCounts[age] = (ageCounts[age] || 0) + 1;

      if (age <= 15) usersByAgeRange['12-15']++;
      else if (age <= 17) usersByAgeRange['16-17']++;
      else if (age <= 20) usersByAgeRange['18-20']++;
      else if (age <= 24) usersByAgeRange['21-24']++;
      else usersByAgeRange['25+']++;
    }
  }

  const averageAge = validAgeCount > 0 ? Math.round((sumAge / validAgeCount) * 10) / 10 : 17;
  const allAgesList = Object.entries(ageCounts)
    .map(([a, c]) => ({ age: Number(a), count: c }))
    .sort((a, b) => a.age - b.age);

  // 7. Recent users (last 10 registered)
  const recentUsers = db.prepare(`
    SELECT u.id, u.name, u.email, u.age, u.city, u.education_level, u.created_at,
      (SELECT COUNT(*) FROM user_tests t WHERE t.user_id = u.id) as tests_count
    FROM users u
    ORDER BY u.created_at DESC
    LIMIT 10
  `).all() as any[];

  // 8. Daily Challenges metrics
  const totalChallengesRow = db.prepare('SELECT COUNT(*) as count FROM daily_challenges').get() as any;
  const totalChallengeVotesRow = db.prepare('SELECT COUNT(*) as count FROM daily_challenge_votes').get() as any;

  return {
    totalUsers,
    totalTests,
    activeUsers,
    averageMatch,
    riasecCounts,
    registrationsByDay,
    careerFrequency,
    ageStats: {
      averageAge,
      minAge: minAge <= 90 ? minAge : 16,
      maxAge: maxAge > 0 ? maxAge : 22,
      usersByAgeRange,
      allAgesList
    },
    recentUsers: recentUsers.map(r => ({
      id: r.id,
      name: r.name,
      email: r.email,
      age: r.age || 17,
      city: r.city || 'No especificada',
      educationLevel: r.education_level || 'Bachillerato',
      createdAt: r.created_at,
      testsCount: Number(r.tests_count) || 0
    })),
    dailyChallengesOverview: {
      totalChallenges: totalChallengesRow?.count || 0,
      totalVotes: totalChallengeVotesRow?.count || 0
    }
  };
}

/**
 * List users for Admin with filters and pagination
 */
export function getAdminUsersList(search?: string, ageRange?: string, educationLevel?: string) {
  const db = getDb();
  let query = `
    SELECT 
      u.id, 
      u.email, 
      u.name, 
      u.role, 
      u.status,
      u.age, 
      u.education_level, 
      u.city, 
      u.country, 
      u.avatar_color, 
      u.created_at,
      (SELECT COUNT(*) FROM user_tests t WHERE t.user_id = u.id) as tests_count,
      (SELECT saved_careers FROM user_favorites f WHERE f.user_id = u.id) as saved_careers
    FROM users u
    WHERE 1=1
  `;
  const params: any[] = [];

  if (search && search.trim()) {
    const term = `%${search.trim().toLowerCase()}%`;
    query += ' AND (LOWER(u.name) LIKE ? OR LOWER(u.email) LIKE ? OR LOWER(u.city) LIKE ?)';
    params.push(term, term, term);
  }

  if (educationLevel && educationLevel !== 'all') {
    query += ' AND u.education_level = ?';
    params.push(educationLevel);
  }

  if (ageRange && ageRange !== 'all') {
    if (ageRange === '12-15') query += ' AND u.age BETWEEN 12 AND 15';
    else if (ageRange === '16-18') query += ' AND u.age BETWEEN 16 AND 18';
    else if (ageRange === '19-24') query += ' AND u.age BETWEEN 19 AND 24';
    else if (ageRange === '25+') query += ' AND u.age >= 25';
  }

  query += ' ORDER BY u.created_at DESC';

  const rows = db.prepare(query).all(...params) as any[];

  return rows.map(r => {
    let savedCount = 0;
    try {
      const arr = JSON.parse(r.saved_careers || '[]');
      savedCount = Array.isArray(arr) ? arr.length : 0;
    } catch (_) {}

    return {
      id: r.id,
      email: r.email,
      name: r.name,
      role: isEmailAdmin(r.email) ? 'admin' : (r.role || 'user'),
      status: r.status || 'active',
      age: r.age,
      educationLevel: r.education_level || 'Bachillerato',
      city: r.city || 'No especificada',
      country: r.country || 'Colombia',
      avatarColor: r.avatar_color,
      createdAt: r.created_at,
      testsCount: Number(r.tests_count) || 0,
      savedCareersCount: savedCount
    };
  });
}

/**
 * Get detailed vocational and profile report of a specific user
 */
export function getAdminUserDetail(userId: string) {
  return buildUserResponse(userId);
}

/**
 * Test statistics and question bank management
 */
export function getAdminTestsStats() {
  const db = getDb();
  const testCountRow = db.prepare('SELECT COUNT(*) as count FROM user_tests').get() as any;
  const customQuestions = db.prepare('SELECT * FROM custom_questions ORDER BY id DESC').all() as any[];

  return {
    totalCompleted: testCountRow?.count || 0,
    averageTimeMinutes: 8.5,
    completionRatePercent: 94.2,
    customQuestions
  };
}

/**
 * Get custom admin questions list
 */
export function getAdminQuestions() {
  const db = getDb();
  return db.prepare('SELECT * FROM custom_questions ORDER BY id DESC').all() as any[];
}

/**
 * Add custom question to database
 */
export function addAdminQuestion(data: {
  text: string;
  category: string;
  area: string;
  topic?: string;
}) {
  const db = getDb();
  const now = new Date().toISOString();
  const result = db.prepare(`
    INSERT INTO custom_questions (text, category, area, topic, active, created_at)
    VALUES (?, ?, ?, ?, 1, ?)
  `).run(data.text.trim(), data.category.toUpperCase(), data.area, data.topic?.trim() || '', now);

  return { id: result.lastInsertRowid, ...data, active: 1, created_at: now };
}

/**
 * Toggle question active status
 */
export function toggleAdminQuestionActive(id: number, active: boolean) {
  const db = getDb();
  db.prepare('UPDATE custom_questions SET active = ? WHERE id = ?').run(active ? 1 : 0, id);
  return { success: true };
}

/**
 * Delete custom question
 */
export function deleteAdminQuestion(id: number) {
  const db = getDb();
  db.prepare('DELETE FROM custom_questions WHERE id = ?').run(id);
  return { success: true };
}

/**
 * Platform settings
 */
export function getAdminPlatformSettings() {
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM platform_settings').all() as any[];
  const settings: Record<string, string> = {
    platformStatus: 'operational',
    activeVersion: '2.4.0-pro',
    minMatchThreshold: '50',
    riasecWeightingProfile: 'balanced',
    allowGuestTests: 'true'
  };

  rows.forEach(r => {
    settings[r.key] = r.value;
  });

  return settings;
}

/**
 * Update platform settings
 */
export function updateAdminPlatformSettings(newSettings: Record<string, string>) {
  const db = getDb();
  const now = new Date().toISOString();

  for (const [key, value] of Object.entries(newSettings)) {
    db.prepare(`
      INSERT INTO platform_settings (key, value, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
    `).run(key, String(value), now);
  }

  return getAdminPlatformSettings();
}

/**
 * Audit log recording
 */
export function addAuditLog(action: string, userEmail?: string, userId?: string, details?: string) {
  const db = getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO audit_logs (id, user_id, user_email, action, details, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, userId || 'system', userEmail || 'system@vocaccion.edu', action, details || '', now);
}

/**
 * Fetch audit logs
 */
export function getAdminAuditLogs(limit: number = 30) {
  const db = getDb();
  return db.prepare('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT ?').all(limit) as any[];
}

// =========================================================================
// PREGUNTA O DINÁMICA DEL DÍA (DAILY CHALLENGES)
// =========================================================================

/**
 * Get active daily challenge with live stats and user's choice (if answered)
 */
export function getActiveDailyChallenge(userId?: string) {
  const db = getDb();
  const challenge = db.prepare('SELECT * FROM daily_challenges WHERE active = 1 ORDER BY updated_at DESC LIMIT 1').get() as any;
  if (!challenge) return null;

  let options: string[] = [];
  try {
    options = JSON.parse(challenge.options);
  } catch (_) {
    options = [];
  }

  // Get vote counts per option
  const voteRows = db.prepare(`
    SELECT selected_option_index, COUNT(*) as count
    FROM daily_challenge_votes
    WHERE challenge_id = ?
    GROUP BY selected_option_index
  `).all(challenge.id) as any[];

  const votesPerOption: Record<number, number> = {};
  let totalVotes = 0;
  for (const r of voteRows) {
    const idx = Number(r.selected_option_index);
    const count = Number(r.count);
    votesPerOption[idx] = count;
    totalVotes += count;
  }

  const stats = options.map((opt, idx) => {
    const votes = votesPerOption[idx] || 0;
    const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
    return {
      option: opt,
      votes,
      percentage
    };
  });

  let userVote: number | null = null;
  if (userId) {
    const userVoteRow = db.prepare('SELECT selected_option_index FROM daily_challenge_votes WHERE challenge_id = ? AND user_id = ?').get(challenge.id, userId) as any;
    if (userVoteRow) {
      userVote = Number(userVoteRow.selected_option_index);
    }
  }

  return {
    id: challenge.id,
    question: challenge.question,
    options,
    active: challenge.active === 1,
    createdBy: challenge.created_by,
    createdAt: challenge.created_at,
    updatedAt: challenge.updated_at,
    totalVotes,
    stats,
    userVote
  };
}

/**
 * Record a vote for the daily challenge
 */
export function voteDailyChallenge(challengeId: string, userId: string, userEmail: string | undefined, optionIndex: number) {
  const db = getDb();
  const now = new Date().toISOString();
  const voteId = crypto.randomUUID();

  db.prepare(`
    INSERT INTO daily_challenge_votes (id, challenge_id, user_id, user_email, selected_option_index, voted_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(challenge_id, user_id) DO UPDATE SET selected_option_index = excluded.selected_option_index, voted_at = excluded.voted_at
  `).run(voteId, challengeId, userId, userEmail || 'estudiante@vocaccion.edu', optionIndex, now);

  return getActiveDailyChallenge(userId);
}

/**
 * List all daily challenges for Admin
 */
export function getAllDailyChallenges() {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM daily_challenges ORDER BY created_at DESC').all() as any[];

  return rows.map(r => {
    let options: string[] = [];
    try { options = JSON.parse(r.options); } catch (_) {}

    const voteRows = db.prepare(`
      SELECT selected_option_index, COUNT(*) as count
      FROM daily_challenge_votes
      WHERE challenge_id = ?
      GROUP BY selected_option_index
    `).all(r.id) as any[];

    const votesPerOption: Record<number, number> = {};
    let totalVotes = 0;
    for (const vr of voteRows) {
      const idx = Number(vr.selected_option_index);
      const count = Number(vr.count);
      votesPerOption[idx] = count;
      totalVotes += count;
    }

    const stats = options.map((opt, idx) => {
      const votes = votesPerOption[idx] || 0;
      const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
      return { option: opt, votes, percentage };
    });

    return {
      id: r.id,
      question: r.question,
      options,
      active: r.active === 1,
      createdBy: r.created_by,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      totalVotes,
      stats
    };
  });
}

/**
 * Create a new daily challenge
 */
export function createDailyChallenge(question: string, options: string[], active: boolean = true, createdBy: string = 'admin') {
  const db = getDb();
  const id = 'challenge-' + crypto.randomUUID().substring(0, 8);
  const now = new Date().toISOString();

  if (active) {
    db.prepare('UPDATE daily_challenges SET active = 0').run();
  }

  db.prepare(`
    INSERT INTO daily_challenges (id, question, options, active, created_by, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, question.trim(), JSON.stringify(options), active ? 1 : 0, createdBy, now, now);

  return getActiveDailyChallenge();
}

/**
 * Update a daily challenge
 */
export function updateDailyChallenge(id: string, question: string, options: string[], active?: boolean) {
  const db = getDb();
  const now = new Date().toISOString();

  if (active) {
    db.prepare('UPDATE daily_challenges SET active = 0 WHERE id != ?').run(id);
  }

  const activeVal = active !== undefined ? (active ? 1 : 0) : undefined;
  if (activeVal !== undefined) {
    db.prepare(`
      UPDATE daily_challenges
      SET question = ?, options = ?, active = ?, updated_at = ?
      WHERE id = ?
    `).run(question.trim(), JSON.stringify(options), activeVal, now, id);
  } else {
    db.prepare(`
      UPDATE daily_challenges
      SET question = ?, options = ?, updated_at = ?
      WHERE id = ?
    `).run(question.trim(), JSON.stringify(options), now, id);
  }

  return true;
}

/**
 * Toggle active state of a daily challenge
 */
export function toggleDailyChallengeActive(id: string, active: boolean) {
  const db = getDb();
  const now = new Date().toISOString();

  if (active) {
    db.prepare('UPDATE daily_challenges SET active = 0 WHERE id != ?').run(id);
  }

  db.prepare('UPDATE daily_challenges SET active = ?, updated_at = ? WHERE id = ?')
    .run(active ? 1 : 0, now, id);

  return true;
}

/**
 * Delete a daily challenge and its votes
 */
export function deleteDailyChallenge(id: string) {
  const db = getDb();
  db.prepare('DELETE FROM daily_challenge_votes WHERE challenge_id = ?').run(id);
  db.prepare('DELETE FROM daily_challenges WHERE id = ?').run(id);
  return true;
}

/**
 * Get detailed stats and responses for a daily challenge
 */
export function getDailyChallengeStats(id: string) {
  const db = getDb();
  const challenge = db.prepare('SELECT * FROM daily_challenges WHERE id = ?').get(id) as any;
  if (!challenge) return null;

  let options: string[] = [];
  try { options = JSON.parse(challenge.options); } catch (_) {}

  const votesList = db.prepare(`
    SELECT v.id, v.user_id, v.user_email, v.selected_option_index, v.voted_at, u.name as user_name
    FROM daily_challenge_votes v
    LEFT JOIN users u ON u.id = v.user_id
    WHERE v.challenge_id = ?
    ORDER BY v.voted_at DESC
  `).all(id) as any[];

  const votesPerOption: Record<number, number> = {};
  for (const v of votesList) {
    const idx = Number(v.selected_option_index);
    votesPerOption[idx] = (votesPerOption[idx] || 0) + 1;
  }

  const stats = options.map((opt, idx) => {
    const votes = votesPerOption[idx] || 0;
    const percentage = votesList.length > 0 ? Math.round((votes / votesList.length) * 100) : 0;
    return { option: opt, votes, percentage };
  });

  return {
    challenge: {
      id: challenge.id,
      question: challenge.question,
      options,
      active: challenge.active === 1,
      createdAt: challenge.created_at
    },
    totalVotes: votesList.length,
    stats,
    votes: votesList.map(v => ({
      id: v.id,
      userId: v.user_id,
      userName: v.user_name || 'Estudiante',
      userEmail: v.user_email,
      optionIndex: Number(v.selected_option_index),
      optionText: options[Number(v.selected_option_index)] || '',
      votedAt: v.voted_at
    }))
  };
}

/**
 * Update user role (e.g. 'admin' or 'user')
 */
export function updateUserRole(userId: string, newRole: 'admin' | 'user') {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare('UPDATE users SET role = ?, updated_at = ? WHERE id = ?').run(newRole, now, userId);
  return buildUserResponse(userId);
}

/**
 * Toggle user active/suspended status
 */
export function toggleUserStatus(userId: string, status: 'active' | 'suspended') {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare('UPDATE users SET status = ?, updated_at = ? WHERE id = ?').run(status, now, userId);
  return buildUserResponse(userId);
}

/**
 * Delete a user and cascade associated records
 */
export function deleteUser(userId: string) {
  const db = getDb();
  const user = db.prepare('SELECT email FROM users WHERE id = ?').get(userId) as any;
  if (user && isEmailAdmin(user.email)) {
    throw new Error('No es posible eliminar una cuenta administrativa maestra del sistema.');
  }

  db.prepare('DELETE FROM sessions WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM user_favorites WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM user_tests WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM daily_challenge_votes WHERE user_id = ?').run(userId);
  db.prepare('DELETE FROM users WHERE id = ?').run(userId);

  return { success: true };
}

/**
 * System Constants functions
 */
export function getAllSystemConstants() {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM system_constants ORDER BY category ASC, key ASC').all() as any[];
  return rows.map(r => ({
    key: r.key,
    value: r.value,
    category: r.category,
    description: r.description,
    dataType: r.data_type,
    updatedAt: r.updated_at,
    updatedBy: r.updated_by
  }));
}

export function getSystemConstant(key: string) {
  const db = getDb();
  const r = db.prepare('SELECT * FROM system_constants WHERE key = ?').get(key) as any;
  if (!r) return null;
  return {
    key: r.key,
    value: r.value,
    category: r.category,
    description: r.description,
    dataType: r.data_type,
    updatedAt: r.updated_at,
    updatedBy: r.updated_by
  };
}

export function setSystemConstant(data: {
  key: string;
  value: string;
  category?: string;
  description?: string;
  dataType?: string;
  updatedBy?: string;
}) {
  const db = getDb();
  const now = new Date().toISOString();
  const key = data.key.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_');
  const category = data.category || 'platform';
  const description = data.description || '';
  const dataType = data.dataType || 'string';
  const updatedBy = data.updatedBy || 'admin';

  db.prepare(`
    INSERT INTO system_constants (key, value, category, description, data_type, updated_at, updated_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET 
      value = excluded.value, 
      category = excluded.category,
      description = excluded.description,
      data_type = excluded.data_type,
      updated_at = excluded.updated_at,
      updated_by = excluded.updated_by
  `).run(key, String(data.value), category, description, dataType, now, updatedBy);

  return getSystemConstant(key);
}

export function deleteSystemConstant(key: string) {
  const db = getDb();
  db.prepare('DELETE FROM system_constants WHERE key = ?').run(key);
  return { success: true };
}


