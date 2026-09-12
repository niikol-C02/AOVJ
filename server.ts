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
  buildUserResponse
} from './server/db';

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
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Ingresa un correo electrónico válido.' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
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
