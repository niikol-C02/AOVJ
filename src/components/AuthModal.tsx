import React, { useState } from 'react';
import { AuthMode, User } from '../types';
import { StorageController } from '../controllers/StorageController';
import { X, Mail, Lock, User as UserIcon, Sparkles, KeyRound, MapPin, GraduationCap, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  initialMode?: AuthMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onShowToast,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>(17);
  const [educationLevel, setEducationLevel] = useState('Último año de Bachillerato / Secundaria');
  const [city, setCity] = useState('Ciudad de México / Bogotá');
  const [country, setCountry] = useState('Colombia');

  // Recovery states
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedSimulatedCode, setGeneratedSimulatedCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setErrorMsg('');
    setGeneratedSimulatedCode(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const users = StorageController.getUsers();
      const found = users.find(
        u => u.email.toLowerCase().trim() === email.toLowerCase().trim() && u.password === password
      );

      if (found) {
        StorageController.setActiveUser(found);
        onShowToast(`¡Bienvenido de nuevo, ${found.name.split(' ')[0]}!`, 'Has iniciado sesión correctamente.', 'success');
        onSuccess(found);
        onClose();
      } else {
        setErrorMsg('El correo o la contraseña no coinciden. Verifica tus datos o usa el acceso demo.');
      }
      setIsLoading(false);
    }, 400);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !password) {
      setErrorMsg('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const users = StorageController.getUsers();
    const existing = users.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());
    if (existing) {
      setErrorMsg('Ya existe una cuenta registrada con este correo electrónico.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const avatarGradients = [
        'bg-gradient-to-tr from-pink-400 to-purple-500',
        'bg-gradient-to-tr from-purple-400 to-indigo-500',
        'bg-gradient-to-tr from-rose-400 to-amber-500',
        'bg-gradient-to-tr from-fuchsia-400 to-pink-500'
      ];
      const randomGradient = avatarGradients[Math.floor(Math.random() * avatarGradients.length)];

      const newUser: User = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        age: Number(age) || 17,
        educationLevel,
        city: city.trim(),
        country: country.trim(),
        avatarColor: randomGradient,
        createdAt: new Date().toISOString(),
        savedCareers: [],
        savedUniversities: [],
        savedScholarships: [],
        testHistory: []
      };

      const updatedUsers = [...users, newUser];
      StorageController.saveUsers(updatedUsers);
      StorageController.setActiveUser(newUser);

      onShowToast(
        `¡Cuenta creada exitosamente!`,
        `Bienvenido a VocAcción, ${newUser.name}. ¡Comienza tu test vocacional!`,
        'success'
      );
      onSuccess(newUser);
      onClose();
      setIsLoading(false);
    }, 400);
  };

  const handleRequestCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Ingresa tu correo electrónico para enviar el código.');
      return;
    }

    const users = StorageController.getUsers();
    const found = users.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());

    if (!found) {
      setErrorMsg('No encontramos ninguna cuenta registrada con este correo.');
      return;
    }

    const code = StorageController.createRecoveryCode(email);
    setGeneratedSimulatedCode(code);
    setMode('verify-code');

    onShowToast(
      'Código de recuperación generado',
      `Tu código es: ${code}. Ingrésalo a continuación para restablecer tu contraseña.`,
      'info'
    );
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const isValid = StorageController.verifyRecoveryCode(email, verificationCode);
    if (!isValid) {
      setErrorMsg('El código de 6 dígitos es incorrecto o ha expirado. Inténtalo nuevamente.');
      return;
    }

    setMode('reset-password');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    const success = StorageController.resetUserPassword(email, password);
    if (success) {
      onShowToast(
        'Contraseña restablecida con éxito',
        'Ahora puedes iniciar sesión con tu nueva contraseña.',
        'success'
      );
      setMode('login');
      setPassword('');
      setConfirmPassword('');
      setVerificationCode('');
    } else {
      setErrorMsg('Ocurrió un error al actualizar la contraseña. Vuelve a intentarlo.');
    }
  };

  const handleDemoLogin = () => {
    const users = StorageController.getUsers();
    let demoUser = users[0];
    if (!demoUser) {
      demoUser = {
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
        savedCareers: ['ing-software-ia', 'diseno-digital-ux-ui'],
        savedUniversities: ['uni-nacional'],
        savedScholarships: ['beca-lideres-del-manana'],
        testHistory: []
      };
      StorageController.saveUsers([demoUser]);
    }

    StorageController.setActiveUser(demoUser);
    onShowToast(`¡Ingresaste como ${demoUser.name}!`, 'Explora todas las funciones libremente.', 'success');
    onSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="auth-modal-card"
        className="relative w-full max-w-lg bg-white/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header with pastel background */}
        <div className="p-6 bg-gradient-to-br from-pink-100/80 via-purple-100/70 to-amber-50/80 backdrop-blur-md border-b border-white/60 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xs shadow-xs border border-white/80 flex items-center justify-center text-pink-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                {mode === 'login' && 'Iniciar Sesión'}
                {mode === 'register' && 'Crear Cuenta Estudiantil'}
                {mode === 'forgot-password' && 'Recuperar Contraseña'}
                {mode === 'verify-code' && 'Verificar Código'}
                {mode === 'reset-password' && 'Nueva Contraseña'}
              </h2>
              <p className="text-xs text-slate-600">
                {mode === 'login' && 'Accede a tus tests, carreras y universidades guardadas'}
                {mode === 'register' && 'Descubre tu futuro profesional y vocación'}
                {mode === 'forgot-password' && 'Te enviaremos un código de seguridad a tu correo'}
                {mode === 'verify-code' && `Ingresa el código enviado a ${email}`}
                {mode === 'reset-password' && 'Define tu nueva clave de acceso segura'}
              </p>
            </div>
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 transition-colors shadow-xs border border-white/70"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50/80 backdrop-blur-sm border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <KeyRound className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* MODE: LOGIN */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="estudiante@ejemplo.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:bg-white focus:border-purple-300 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">Contraseña</label>
                  <button
                    type="button"
                    id="link-forgot-password"
                    onClick={() => {
                      resetForm();
                      setMode('forgot-password');
                    }}
                    className="text-xs text-purple-600 hover:text-purple-800 font-medium hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-password-input"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:bg-white focus:border-purple-300 shadow-xs"
                  />
                </div>
              </div>

              <button
                id="submit-login-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:opacity-95 backdrop-blur-sm border border-white/30 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Entrar a VocAcción</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200/60"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white/80 backdrop-blur-sm rounded-full border border-white/60 text-slate-500">o accede al instante</span>
                </div>
              </div>

              {/* Quick Demo Login */}
              <button
                id="quick-demo-login-btn"
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-4 rounded-xl border border-purple-200/80 bg-purple-50/70 backdrop-blur-sm hover:bg-purple-100/80 text-purple-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Ingresar como Usuario Demo (Camila - Bachiller)</span>
              </button>

              <div className="pt-2 text-center text-xs text-slate-600">
                ¿Aún no tienes una cuenta?{' '}
                <button
                  type="button"
                  id="switch-to-register-btn"
                  onClick={() => {
                    resetForm();
                    setMode('register');
                  }}
                  className="font-bold text-pink-600 hover:text-pink-700 hover:underline"
                >
                  Regístrate gratis aquí
                </button>
              </div>
            </form>
          )}

          {/* MODE: REGISTER */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="register-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ej. Sofía Martínez"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="register-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="sofia@colegio.edu"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Edad</label>
                  <input
                    id="register-age-input"
                    type="number"
                    min={12}
                    max={99}
                    value={age}
                    onChange={e => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">País / Ciudad</label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="register-city-input"
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Bogotá / CDMX"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white shadow-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nivel Educativo Actual</label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    id="register-education-level-select"
                    value={educationLevel}
                    onChange={e => setEducationLevel(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white shadow-xs"
                  >
                    <option value="Secundaria / Bachillerato (9°-10°)">Secundaria / Bachillerato (Grados 9°-10°)</option>
                    <option value="Último año de Bachillerato / Secundaria">Último año de Bachillerato / 11°-12°</option>
                    <option value="Graduado de Bachiller / En búsqueda de carrera">Graduado de Bachiller / En búsqueda de carrera</option>
                    <option value="Estudiante Técnico / Tecnológico">Estudiante Técnico / Tecnológico</option>
                    <option value="Estudiante Universitario (Reorientación)">Estudiante Universitario (Cambio de carrera)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contraseña (Mín. 6 caracteres)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="register-password-input"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white shadow-xs"
                  />
                </div>
              </div>

              <button
                id="submit-register-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:opacity-95 backdrop-blur-sm border border-white/30 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Crear Mi Cuenta Vocacional</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-1 text-center text-xs text-slate-600">
                ¿Ya tienes una cuenta?{' '}
                <button
                  type="button"
                  id="switch-to-login-btn"
                  onClick={() => {
                    resetForm();
                    setMode('login');
                  }}
                  className="font-bold text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Inicia sesión aquí
                </button>
              </div>
            </form>
          )}

          {/* MODE: FORGOT PASSWORD */}
          {mode === 'forgot-password' && (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-50/80 backdrop-blur-sm border border-purple-100 text-xs text-purple-800 leading-relaxed">
                Ingresa el correo electrónico asociado a tu cuenta de estudiante. Generaremos un código de verificación de 6 dígitos para que puedas restablecer tu contraseña.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Correo Registrado</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="recovery-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="estudiante@ejemplo.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 shadow-xs"
                  />
                </div>
              </div>

              <button
                id="submit-request-code-btn"
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:shadow-lg backdrop-blur-sm border border-white/30 transition-all"
              >
                Enviar Código de Recuperación
              </button>

              <div className="text-center text-xs">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setMode('login');
                  }}
                  className="text-slate-500 hover:text-slate-800 font-medium"
                >
                  ← Volver a Iniciar Sesión
                </button>
              </div>
            </form>
          )}

          {/* MODE: VERIFY CODE */}
          {mode === 'verify-code' && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              {generatedSimulatedCode && (
                <div className="p-3.5 rounded-2xl bg-amber-50/85 backdrop-blur-sm border border-amber-200/80 text-amber-900 text-xs shadow-xs">
                  <p className="font-semibold mb-1">📨 Código de verificación enviado al correo:</p>
                  <p className="font-mono text-base font-bold tracking-widest text-pink-600 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-amber-200 text-center shadow-inner">
                    {generatedSimulatedCode}
                  </p>
                  <p className="text-[11px] text-amber-700 mt-1">
                    (Simulación de envío por email activa para pruebas en vivo)
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Código de 6 dígitos
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="verification-code-input"
                    type="text"
                    maxLength={6}
                    required
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value.trim())}
                    placeholder="Ej. 654321"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm font-mono tracking-wider text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 shadow-xs"
                  />
                </div>
              </div>

              <button
                id="submit-verify-code-btn"
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg backdrop-blur-sm border border-white/30 transition-all"
              >
                Validar Código
              </button>

              <div className="text-center text-xs">
                <button
                  type="button"
                  onClick={() => setMode('forgot-password')}
                  className="text-purple-600 hover:underline font-medium"
                >
                  ¿No recibiste el código? Solicitar otro
                </button>
              </div>
            </form>
          )}

          {/* MODE: RESET PASSWORD */}
          {mode === 'reset-password' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="reset-new-password-input"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Confirmar Nueva Contraseña
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="reset-confirm-password-input"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repite la contraseña"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 shadow-xs"
                  />
                </div>
              </div>

              <button
                id="submit-reset-password-btn"
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:shadow-lg backdrop-blur-sm border border-white/30 transition-all"
              >
                Guardar Nueva Contraseña e Iniciar Sesión
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
