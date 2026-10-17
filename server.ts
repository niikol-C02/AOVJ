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
  updateUserRole,
  toggleUserStatus,
  deleteUser,
  getAllSystemConstants,
  getSystemConstant,
  setSystemConstant,
  deleteSystemConstant,
  getAdminTestsStats,
  getAdminQuestions,
  addAdminQuestion,
  toggleAdminQuestionActive,
  deleteAdminQuestion,
  getAdminPlatformSettings,
  updateAdminPlatformSettings,
  getAdminAuditLogs,
  addAuditLog,
  isEmailAdmin,
  getActiveDailyChallenge,
  voteDailyChallenge,
  getAllDailyChallenges,
  createDailyChallenge,
  updateDailyChallenge,
  toggleDailyChallengeActive,
  deleteDailyChallenge,
  getDailyChallengeStats,
  createPasswordResetToken,
  verifyPasswordResetToken,
  resetPasswordWithToken
} from './server/db';
import { sendPasswordResetEmailService } from './server/mailer';
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

// 6. Forgot Password (Request recovery link & email)
app.post('/api/auth/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Por favor ingresa un correo electrónico.' });
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      return res.status(400).json({ error: emailCheck.error });
    }

    const cleanEmail = email.trim().toLowerCase();
    const tokenResult = createPasswordResetToken(cleanEmail);

    let mailResult = { sent: false, configured: false, resetUrl: '' };

    const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;

    if (tokenResult.token && tokenResult.user) {
      mailResult = await sendPasswordResetEmailService({
        toEmail: cleanEmail,
        userName: tokenResult.user.name || 'Estudiante VocAcción',
        resetToken: tokenResult.token,
        baseUrl
      });
    }

    // Por seguridad y privacidad: no revelar si el correo existe o no en la plataforma
    return res.json({
      success: true,
      message: 'Si el correo electrónico está registrado en VocAcción, recibirás un mensaje con un enlace seguro para restablecer tu contraseña. Revisa tu bandeja de entrada y carpeta de spam.',
      mailConfigured: mailResult.configured,
      mailSent: mailResult.sent,
      // Solo en entorno de desarrollo / vista previa si no hay SMTP configurado, facilitamos el enlace para pruebas
      previewResetUrl: !mailResult.configured && tokenResult.token ? mailResult.resetUrl : undefined
    });
  } catch (err: any) {
    console.error('API Forgot Password error:', err);
    return res.status(500).json({ error: 'Error interno al procesar la recuperación de contraseña.' });
  }
});

// 6.1 Verify Password Reset Token
app.get('/api/auth/verify-reset-token', (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    if (!token) {
      return res.status(400).json({ valid: false, error: 'Token no especificado.' });
    }

    const result = verifyPasswordResetToken(token);
    if (!result.valid) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (err: any) {
    console.error('API Verify Reset Token error:', err);
    return res.status(500).json({ valid: false, error: 'Error al verificar token de recuperación.' });
  }
});

// 6.2 Reset Password With Token
app.post('/api/auth/reset-password', (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token y nueva contraseña son obligatorios.' });
    }

    const result = resetPasswordWithToken(token, newPassword);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    return res.json({
      success: true,
      message: '¡Tu contraseña ha sido actualizada con éxito! Ahora puedes iniciar sesión con tu nueva contraseña.'
    });
  } catch (err: any) {
    console.error('API Reset Password error:', err);
    return res.status(500).json({ error: 'Error interno al actualizar la contraseña.' });
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

  if (user.role !== 'admin' || !isEmailAdmin(user.email)) {
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

// D1. Cambiar Rol de Usuario (Estudiante <-> Administrador)
app.patch('/api/admin/users/:userId/role', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const { role } = req.body;
    const { userId } = req.params;

    if (!role || (role !== 'admin' && role !== 'user')) {
      return res.status(400).json({ error: 'Rol inválido. Debe ser "admin" o "user".' });
    }

    const updated = updateUserRole(userId, role);
    if (!updated) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    addAuditLog('CHANGE_ROLE', adminUser.email, adminUser.id, `Cambio de rol para usuario ${updated.email}: nuevo rol ${role}`);
    return res.json({ success: true, user: updated });
  } catch (err: any) {
    console.error('Admin change role error:', err);
    return res.status(500).json({ error: 'Error al actualizar rol del usuario.' });
  }
});

// D2. Activar / Desactivar cuenta de usuario
app.patch('/api/admin/users/:userId/status', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const { status } = req.body;
    const { userId } = req.params;

    if (!status || (status !== 'active' && status !== 'suspended')) {
      return res.status(400).json({ error: 'Estado inválido. Debe ser "active" o "suspended".' });
    }

    const updated = toggleUserStatus(userId, status);
    if (!updated) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    addAuditLog('CHANGE_STATUS', adminUser.email, adminUser.id, `Estado de cuenta modificado para ${updated.email}: ${status}`);
    return res.json({ success: true, user: updated });
  } catch (err: any) {
    console.error('Admin change status error:', err);
    return res.status(500).json({ error: 'Error al actualizar estado del usuario.' });
  }
});

// D3. Eliminar usuario registrado
app.delete('/api/admin/users/:userId', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const { userId } = req.params;

    deleteUser(userId);
    addAuditLog('DELETE_USER', adminUser.email, adminUser.id, `Usuario eliminado (ID: ${userId})`);
    return res.json({ success: true, message: 'Usuario eliminado exitosamente de la base de datos.' });
  } catch (err: any) {
    console.error('Admin delete user error:', err);
    return res.status(err.message?.includes('maestra') ? 400 : 500).json({ 
      error: err.message || 'Error al eliminar usuario.' 
    });
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

// J1. Listar todas las Constantes y Parámetros Globales del Sistema
app.get('/api/admin/constants', requireAdmin, (req: Request, res: Response) => {
  try {
    const constants = getAllSystemConstants();
    return res.json({ constants });
  } catch (err: any) {
    console.error('Admin get constants error:', err);
    return res.status(500).json({ error: 'Error al obtener constantes del sistema.' });
  }
});

// J2. Crear o sobrescribir una constante del sistema
app.post('/api/admin/constants', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const { key, value, category, description, dataType } = req.body;

    if (!key || value === undefined) {
      return res.status(400).json({ error: 'La clave (key) y el valor son obligatorios.' });
    }

    const constant = setSystemConstant({
      key,
      value: String(value),
      category,
      description,
      dataType,
      updatedBy: adminUser.email
    });

    addAuditLog('SET_CONSTANT', adminUser.email, adminUser.id, `Constante guardada: ${constant?.key} = "${value}"`);
    return res.status(201).json({ constant });
  } catch (err: any) {
    console.error('Admin set constant error:', err);
    return res.status(500).json({ error: 'Error al guardar la constante.' });
  }
});

// J3. Modificar una constante existente por clave
app.put('/api/admin/constants/:key', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const { key } = req.params;
    const { value, category, description, dataType } = req.body;

    if (value === undefined) {
      return res.status(400).json({ error: 'El valor de la constante es obligatorio.' });
    }

    const constant = setSystemConstant({
      key,
      value: String(value),
      category,
      description,
      dataType,
      updatedBy: adminUser.email
    });

    addAuditLog('UPDATE_CONSTANT', adminUser.email, adminUser.id, `Constante actualizada: ${key} = "${value}"`);
    return res.json({ constant });
  } catch (err: any) {
    console.error('Admin update constant error:', err);
    return res.status(500).json({ error: 'Error al actualizar la constante.' });
  }
});

// J4. Eliminar una constante del sistema
app.delete('/api/admin/constants/:key', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const { key } = req.params;

    deleteSystemConstant(key);
    addAuditLog('DELETE_CONSTANT', adminUser.email, adminUser.id, `Constante eliminada: ${key}`);
    return res.json({ success: true });
  } catch (err: any) {
    console.error('Admin delete constant error:', err);
    return res.status(500).json({ error: 'Error al eliminar la constante.' });
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
// PREGUNTA O DINÁMICA DEL DÍA - PUBLIC & USER ROUTES
// ----------------------------------------------------

// Obtener la pregunta del día activa con sus opciones y estadísticas
app.get('/api/daily-challenge/active', (req: Request, res: Response) => {
  try {
    const token = getAuthToken(req);
    let userId: string | undefined = undefined;
    if (token) {
      const user = getUserByToken(token);
      if (user) userId = user.id;
    }
    const challenge = getActiveDailyChallenge(userId);
    return res.json({ challenge });
  } catch (err: any) {
    console.error('Error fetching active daily challenge:', err);
    return res.status(500).json({ error: 'Error al consultar pregunta del día.' });
  }
});

// Votar o responder a la pregunta del día
app.post('/api/daily-challenge/:id/vote', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { optionIndex, guestId } = req.body;

    if (optionIndex === undefined || typeof optionIndex !== 'number' || optionIndex < 0) {
      return res.status(400).json({ error: 'Debes seleccionar una opción válida.' });
    }

    const token = getAuthToken(req);
    let userId: string = guestId || 'guest-' + (req.ip || 'anon');
    let userEmail: string | undefined = undefined;

    if (token) {
      const user = getUserByToken(token);
      if (user) {
        userId = user.id;
        userEmail = user.email;
      }
    }

    const updatedChallenge = voteDailyChallenge(id, userId, userEmail, optionIndex);
    return res.json({
      success: true,
      challenge: updatedChallenge,
      userVote: optionIndex
    });
  } catch (err: any) {
    console.error('Error voting on daily challenge:', err);
    return res.status(500).json({ error: 'Error al registrar tu respuesta.' });
  }
});

// ----------------------------------------------------
// PREGUNTA O DINÁMICA DEL DÍA - ADMIN MANAGEMENT ROUTES
// ----------------------------------------------------

// L. Listar todas las preguntas del día creadas
app.get('/api/admin/daily-challenges', requireAdmin, (req: Request, res: Response) => {
  try {
    const challenges = getAllDailyChallenges();
    return res.json({ challenges });
  } catch (err: any) {
    console.error('Admin list challenges error:', err);
    return res.status(500).json({ error: 'Error al consultar dinámicas del día.' });
  }
});

// M. Crear nueva pregunta del día
app.post('/api/admin/daily-challenges', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const { question, options, active } = req.body;

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'El texto de la pregunta es obligatorio.' });
    }
    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: 'Debes ingresar al menos 2 opciones de respuesta.' });
    }

    const cleanOptions = options.map((o: any) => String(o).trim()).filter(Boolean);
    if (cleanOptions.length < 2) {
      return res.status(400).json({ error: 'Opciones de respuesta inválidas.' });
    }

    const newChallenge = createDailyChallenge(question.trim(), cleanOptions, active !== false, adminUser.name || adminUser.email);
    addAuditLog('CREATE_DAILY_CHALLENGE', adminUser.email, adminUser.id, `Nueva dinámica: "${question.substring(0, 40)}..."`);

    return res.status(201).json({ challenge: newChallenge });
  } catch (err: any) {
    console.error('Admin create challenge error:', err);
    return res.status(500).json({ error: 'Error al crear la pregunta del día.' });
  }
});

// N. Modificar pregunta del día existente
app.put('/api/admin/daily-challenges/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const { id } = req.params;
    const { question, options, active } = req.body;

    if (!question || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: 'Pregunta y al menos 2 opciones son obligatorias.' });
    }

    const cleanOptions = options.map((o: any) => String(o).trim()).filter(Boolean);
    updateDailyChallenge(id, question.trim(), cleanOptions, active);
    addAuditLog('UPDATE_DAILY_CHALLENGE', adminUser.email, adminUser.id, `Modificada dinámica #${id}`);

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error al actualizar dinámica.' });
  }
});

// O. Alternar estado activo / inactivo de pregunta del día
app.patch('/api/admin/daily-challenges/:id/toggle', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const { id } = req.params;
    const { active } = req.body;

    toggleDailyChallengeActive(id, !!active);
    addAuditLog('TOGGLE_DAILY_CHALLENGE', adminUser.email, adminUser.id, `Dinámica #${id} estado: ${active ? 'activa' : 'inactiva'}`);

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error al cambiar estado de la dinámica.' });
  }
});

// P. Eliminar pregunta del día
app.delete('/api/admin/daily-challenges/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminUser = (req as any).adminUser;
    const { id } = req.params;

    deleteDailyChallenge(id);
    addAuditLog('DELETE_DAILY_CHALLENGE', adminUser.email, adminUser.id, `Dinámica #${id} eliminada`);

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error al eliminar dinámica.' });
  }
});

// Q. Consultar respuestas y estadísticas detalladas de una pregunta del día
app.get('/api/admin/daily-challenges/:id/stats', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stats = getDailyChallengeStats(id);
    if (!stats) return res.status(404).json({ error: 'Dinámica no encontrada.' });
    return res.json(stats);
  } catch (err: any) {
    return res.status(500).json({ error: 'Error al consultar respuestas de la dinámica.' });
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
