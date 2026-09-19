import express, { Request, Response } from 'express';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import {
  getDb,
  registerDbUser,
  loginDbUser,
  getUserByToken,
  removeSession,
  googleDbUser,
  updateDbUser,
  toggleDbFavorite,
  addDbTestResult,
  deleteDbTestResult,
  buildUserResponse,
  getAdminOverviewData,
  getAdminUsersList,
  getAdminUserDetail,
  getAdminTestsStats,
  getAdminQuestions,
  addAdminQuestion,
  toggleAdminQuestionActive,
  deleteAdminQuestion,
  getAdminPlatformSettings,
  updateAdminPlatformSettings,
  getAdminAuditLogs,
  addAuditLog
} from './server/db';
import {
  validateEmail,
  isPasswordValid,
  getMissingPasswordRequirements
} from './src/utils/authValidation';

const app = express();
const PORT = 3000;

// Initialize DB schema on boot
getDb();

// Body parser
app.use(express.json());

// Auth helper middleware
function getAuthToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return null;
}

// ----------------------------------------------------
// API ROUTES (MUST COME BEFORE VITE MIDDLEWARE)
// ----------------------------------------------------

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 1. Register User
app.post('/api/auth/register', (req: Request, res: Response) => {
  try {
    const { name, email, password, age, educationLevel, city, country } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'El nombre es obligatorio.' });
    }
    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      return res.status(400).json({ error: emailCheck.error });
    }
    if (!password || typeof password !== 'string' || !isPasswordValid(password)) {
      const missing = getMissingPasswordRequirements(password || '');
      return res.status(400).json({
        error: `La contraseña no cumple los requisitos obligatorios de seguridad: ${missing.join(', ')}.`
      });
    }

    const result = registerDbUser({
      name,
      email,
      password,
      age: Number(age) || 17,
      educationLevel,
      city,
      country
    });

    if (result.error) {
      const statusCode = result.error.includes('Ya existe una cuenta') ? 409 : 400;
      return res.status(statusCode).json({ error: result.error });
    }

    return res.status(201).json({
      user: result.user,
      token: result.token
    });
  } catch (err: any) {
    console.error('API Register error:', err);
    return res.status(500).json({ error: 'Error interno en el servidor al registrar el usuario.' });
  }
});

// 2. Login User
app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Por favor ingresa tu correo y contraseña.' });
    }

    const result = loginDbUser(email, password);

    if (result.error) {
      return res.status(401).json({ error: result.error });
    }

    return res.json({
      user: result.user,
      token: result.token
    });
  } catch (err: any) {
    console.error('API Login error:', err);
    return res.status(500).json({ error: 'Error interno en el servidor al iniciar sesión.' });
  }
});

// 3. Google Login / Sync
app.post('/api/auth/google', (req: Request, res: Response) => {
  try {
    const { uid, email, displayName } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'No se recibió el correo de la cuenta de Google.' });
    }

    const result = googleDbUser({ uid, email, displayName });
    return res.json({
      user: result.user,
      token: result.token
    });
  } catch (err: any) {
    console.error('API Google auth error:', err);
    return res.status(500).json({ error: 'Error al sincronizar cuenta de Google.' });
  }
});

// 4. Verify Active Session (Me)
app.get('/api/auth/me', (req: Request, res: Response) => {
  try {
    const token = getAuthToken(req);
    if (!token) {
      return res.status(401).json({ error: 'No hay sesión activa.' });
    }

    const user = getUserByToken(token);
    if (!user) {
      return res.status(401).json({ error: 'Sesión expirada o no válida.' });
    }

    return res.json({ user });
  } catch (err: any) {
    console.error('API /auth/me error:', err);
    return res.status(500).json({ error: 'Error al obtener sesión del usuario.' });
  }
});

// 5. Logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  try {
    const token = getAuthToken(req);
    if (token) {
      removeSession(token);
    }
    return res.json({ success: true });
  } catch (err: any) {
    console.error('API Logout error:', err);
    return res.status(500).json({ error: 'Error al cerrar sesión.' });
  }
});

// 6. Forgot Password
app.post('/api/auth/forgot-password', (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Ingresa un correo electrónico.' });
    }
    // Return friendly instructions
    return res.json({
      success: true,
      message: `Si la cuenta existe con el correo ${email}, hemos registrado tu solicitud de restablecimiento.`
    });
  } catch (err: any) {
    console.error('API Forgot Password error:', err);
    return res.status(500).json({ error: 'Error al procesar recuperación de contraseña.' });
  }
});

// 7. Update User Profile
app.put('/api/user/profile', (req: Request, res: Response) => {
  try {
    const token = getAuthToken(req);
    if (!token) return res.status(401).json({ error: 'No autenticado.' });

    const currentUser = getUserByToken(token);
    if (!currentUser) return res.status(401).json({ error: 'Sesión no válida.' });

    const updatedUser = updateDbUser(currentUser.id, req.body);
    return res.json({ user: updatedUser });
  } catch (err: any) {
    console.error('API Profile Update error:', err);
    return res.status(500).json({ error: 'Error al actualizar perfil.' });
  }
});

// 8. Toggle Favorite (Career, University, Scholarship)
app.post('/api/user/favorites/toggle', (req: Request, res: Response) => {
  try {
    const token = getAuthToken(req);
    if (!token) return res.status(401).json({ error: 'No autenticado.' });

    const currentUser = getUserByToken(token);
    if (!currentUser) return res.status(401).json({ error: 'Sesión no válida.' });

    const { type, itemId } = req.body;
    if (!type || !itemId) {
      return res.status(400).json({ error: 'Parámetros incompletos.' });
    }

    const updatedUser = toggleDbFavorite(currentUser.id, type, itemId);
    return res.json({ user: updatedUser });
  } catch (err: any) {
    console.error('API Toggle Favorite error:', err);
    return res.status(500).json({ error: 'Error al guardar elemento favorito.' });
  }
});

// 9. Add Vocational Test Result
app.post('/api/user/tests', (req: Request, res: Response) => {
  try {
    const token = getAuthToken(req);
    if (!token) return res.status(401).json({ error: 'No autenticado.' });

    const currentUser = getUserByToken(token);
    if (!currentUser) return res.status(401).json({ error: 'Sesión no válida.' });

    const testResult = req.body;
    const updatedUser = addDbTestResult(currentUser.id, testResult);
    return res.json({ user: updatedUser });
  } catch (err: any) {
    console.error('API Add Test Result error:', err);
    return res.status(500).json({ error: 'Error al guardar resultado del test.' });
  }
});

// 10. Delete Vocational Test Result
app.delete('/api/user/tests/:testId', (req: Request, res: Response) => {
  try {
    const token = getAuthToken(req);
    if (!token) return res.status(401).json({ error: 'No autenticado.' });

    const currentUser = getUserByToken(token);
    if (!currentUser) return res.status(401).json({ error: 'Sesión no válida.' });

    const { testId } = req.params;
    const updatedUser = deleteDbTestResult(currentUser.id, testId);
    return res.json({ user: updatedUser });
  } catch (err: any) {
    console.error('API Delete Test error:', err);
    return res.status(500).json({ error: 'Error al eliminar resultado del test.' });
  }
});

// 11. Get specific User Profile by ID (fallback)
app.get('/api/user/:userId', (req: Request, res: Response) => {
  try {
    const user = buildUserResponse(req.params.userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
    return res.json({ user });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error al consultar usuario.' });
  }
});

// ----------------------------------------------------
// ADMIN AUTH MIDDLEWARE & SPECIALIZED ROUTES
// ----------------------------------------------------

/**
 * Middleware estricto para validar privilegios de administrador en el servidor.
 * Rechaza peticiones no autorizadas con código 401 o 403.
 */
function requireAdmin(req: Request, res: Response, next: () => void) {
  const token = getAuthToken(req);
  if (!token) {
    return res.status(401).json({
      error: 'Acceso no autorizado: Se requiere token de sesión para el panel de administración.'
    });
  }

  const user = getUserByToken(token);
  if (!user) {
    return res.status(401).json({
      error: 'Acceso no autorizado: Sesión inválida o expirada.'
    });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({
      error: 'Acceso denegado: Tu cuenta no posee permisos de administrador para este recurso.'
    });
  }

  (req as any).adminUser = user;
  next();
}

// A. Verificar estado de Administrador (para validación de rutas y guard)
app.get('/api/admin/verify', requireAdmin, (req: Request, res: Response) => {
  const adminUser = (req as any).adminUser;
  return res.json({
    authorized: true,
    user: adminUser
  });
});

// B. Panel Principal (Overview): Métricas, actividad reciente, RIASEC y carreras
app.get('/api/admin/overview', requireAdmin, (req: Request, res: Response) => {
  try {
    const data = getAdminOverviewData();
    return res.json(data);
  } catch (err: any) {
    console.error('Admin overview error:', err);
    return res.status(500).json({ error: 'Error al obtener métricas del sistema.' });
  }
});

// C. Gestión de Usuarios: Tabla con filtros por búsqueda, edad y nivel educativo
app.get('/api/admin/users', requireAdmin, (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const ageRange = req.query.ageRange as string;
    const educationLevel = req.query.educationLevel as string;

    const users = getAdminUsersList(search, ageRange, educationLevel);
    return res.json({ users });
  } catch (err: any) {
    console.error('Admin users list error:', err);
    return res.status(500).json({ error: 'Error al consultar lista de usuarios.' });
  }
});

// D. Detalle de Usuario específico para Administradores
app.get('/api/admin/users/:userId', requireAdmin, (req: Request, res: Response) => {
  try {
    const user = getAdminUserDetail(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    return res.json({ user });
  } catch (err: any) {
    console.error('Admin user detail error:', err);
    return res.status(500).json({ error: 'Error al consultar detalle del usuario.' });
  }
});

// E. Gestión de Tests y Catálogo de Preguntas
app.get('/api/admin/tests', requireAdmin, (req: Request, res: Response) => {
  try {
    const data = getAdminTestsStats();
    return res.json(data);
  } catch (err: any) {
    console.error('Admin tests stats error:', err);
    return res.status(500).json({ error: 'Error al consultar estadísticas de tests.' });
  }
});

// F. Agregar pregunta al banco
app.post('/api/admin/questions', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const { text, category, area, topic } = req.body;

    if (!text || !category || !area) {
      return res.status(400).json({ error: 'Texto, categoría RIASEC y área son obligatorios.' });
    }

    const newQuestion = addAdminQuestion({ text, category, area, topic });
    addAuditLog('ADD_QUESTION', adminUser.email, adminUser.id, `Pregunta creada: "${text.substring(0, 40)}..."`);

    return res.status(201).json({ question: newQuestion });
  } catch (err: any) {
    console.error('Admin add question error:', err);
    return res.status(500).json({ error: 'Error al guardar la nueva pregunta.' });
  }
});

// G. Activar / Desactivar pregunta
app.patch('/api/admin/questions/:id/active', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const id = Number(req.params.id);
    const { active } = req.body;

    toggleAdminQuestionActive(id, !!active);
    addAuditLog('TOGGLE_QUESTION', adminUser.email, adminUser.id, `Pregunta #${id} estado: ${active ? 'activa' : 'inactiva'}`);

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error al actualizar estado de la pregunta.' });
  }
});

// H. Eliminar pregunta
app.delete('/api/admin/questions/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const id = Number(req.params.id);

    deleteAdminQuestion(id);
    addAuditLog('DELETE_QUESTION', adminUser.email, adminUser.id, `Pregunta eliminada #${id}`);

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error al eliminar la pregunta.' });
  }
});

// I. Configuración de la plataforma
app.get('/api/admin/config', requireAdmin, (req: Request, res: Response) => {
  try {
    const settings = getAdminPlatformSettings();
    const logs = getAdminAuditLogs();
    return res.json({ settings, logs });
  } catch (err: any) {
    console.error('Admin config error:', err);
    return res.status(500).json({ error: 'Error al obtener configuración de la plataforma.' });
  }
});

// J. Actualizar configuración de la plataforma
app.post('/api/admin/config', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const updatedSettings = updateAdminPlatformSettings(req.body);
    addAuditLog('UPDATE_SETTINGS', adminUser.email, adminUser.id, 'Actualización de parámetros del sistema');

    return res.json({ settings: updatedSettings });
  } catch (err: any) {
    console.error('Admin update config error:', err);
    return res.status(500).json({ error: 'Error al actualizar configuración.' });
  }
});

// K. Exportación de reporte resumido
app.get('/api/admin/export', requireAdmin, (req: Request, res: Response) => {
  try {
    const overview = getAdminOverviewData();
    const users = getAdminUsersList();
    const settings = getAdminPlatformSettings();
    const logs = getAdminAuditLogs(50);

    const report = {
      generatedAt: new Date().toISOString(),
      platformVersion: settings.activeVersion || '2.4.0-pro',
      status: settings.platformStatus || 'operational',
      overview,
      usersSummary: {
        total: users.length,
        users: users.map(u => ({
          name: u.name,
          email: u.email,
          role: u.role,
          age: u.age,
          education: u.educationLevel,
          city: u.city,
          testsCount: u.testsCount,
          registeredAt: u.createdAt
        }))
      },
      auditLogs: logs
    };

    return res.json(report);
  } catch (err: any) {
    return res.status(500).json({ error: 'Error al generar reporte descargable.' });
  }
});

// ----------------------------------------------------
// VITE INTEGRATION & SERVER STARTUP
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VocAcción Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
