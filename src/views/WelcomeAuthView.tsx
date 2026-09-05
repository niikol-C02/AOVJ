import React, { useState } from 'react';
import { StorageController } from '../controllers/StorageController';
import { User, AuthMode } from '../types';
import { 
  Compass, 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User as UserIcon, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  MapPin, 
  ShieldCheck,
  Award
} from 'lucide-react';

interface WelcomeAuthViewProps {
  onAuthSuccess: (user: User) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const WelcomeAuthView: React.FC<WelcomeAuthViewProps> = ({
  onAuthSuccess,
  onShowToast
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  
  // Login / Register fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [educationLevel, setEducationLevel] = useState('Último año de Bachillerato / Secundaria');
  const [city, setCity] = useState('');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const clearMessages = () => {
    setErrorMsg('');
    setSuccessMsg('');
  };

  // 1. Google Authentication
  const handleGoogleLogin = async () => {
    clearMessages();
    setIsGoogleLoading(true);
    try {
      const result = await StorageController.loginWithGoogle();
      if (result.user) {
        onShowToast(
          `¡Bienvenido, ${result.user.name.split(' ')[0]}!`,
          'Has iniciado sesión con tu cuenta de Google.',
          'success'
        );
        onAuthSuccess(result.user);
      } else {
        setErrorMsg(result.error || 'No se pudo iniciar sesión con Google.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error inesperado al conectar con Google.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // 2. Email & Password Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!email.trim() || !password) {
      setErrorMsg('Ingresa tu correo electrónico y contraseña.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await StorageController.loginUser(email, password);
      if (result.user) {
        onShowToast(
          `¡Bienvenido de nuevo, ${result.user.name.split(' ')[0]}!`,
          'Sesión iniciada correctamente en tu cuenta.',
          'success'
        );
        onAuthSuccess(result.user);
      } else {
        setErrorMsg(result.error || 'Correo o contraseña incorrectos.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error al iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Register New Student Account
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!name.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Por favor ingresa tu correo electrónico.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('La contraseña debe contener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await StorageController.registerUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        educationLevel,
        city: city.trim(),
        country: 'Colombia'
      });

      if (result.user) {
        onShowToast(
          `¡Cuenta creada con éxito!`,
          `Bienvenido a VocAcción, ${result.user.name}. Tu perfil nuevo está listo para comenzar.`,
          'success'
        );
        onAuthSuccess(result.user);
      } else {
        setErrorMsg(result.error || 'No pudimos registrar tu cuenta.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error al crear la cuenta en Firebase.');
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Password Recovery
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!email.trim()) {
      setErrorMsg('Ingresa tu correo electrónico registrado.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await StorageController.sendPasswordReset(email);
      if (result.success) {
        setSuccessMsg(`Te hemos enviado un correo a ${email} con el enlace oficial para restablecer tu contraseña. Revisa tu bandeja de entrada.`);
        onShowToast(
          'Correo de recuperación enviado',
          `Revisa tu bandeja de entrada en ${email}.`,
          'success'
        );
      } else {
        setErrorMsg(result.error || 'No encontramos una cuenta con este correo.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'No se pudo enviar el correo de recuperación.');
    } finally {
      setIsLoading(false);
    }
  };

  // Optional Demo access for quick preview testing
  const handleDemoAccess = () => {
    const demoUser = StorageController.setDemoUser();
    onShowToast(`Modo Demostración Activado`, `Explorando VocAcción con el perfil de ${demoUser.name}.`, 'info');
    onAuthSuccess(demoUser);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] relative flex flex-col justify-between overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Pastel Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-10 w-[28rem] h-[28rem] bg-purple-300/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-600 shadow-md flex items-center justify-center text-white">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Voc<span className="text-pink-600">Acción</span>
            </span>
            <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider">
              Orientación Vocacional Juvenil
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 text-[11px] font-semibold text-slate-600 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Acceso Seguro con Firebase</span>
          </div>
        </div>
      </header>

      {/* Main Center Stage */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-lg">
          {/* Brand Welcome Presentation */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 text-pink-700 text-xs font-semibold mb-3 border border-pink-200/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Tu futuro empieza con una decisión informada</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Bienvenido a Voc<span className="text-pink-600">Acción</span>
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Descubre tu vocación con el test RIASEC, explora carreras profesionales y universidades ideales para tu perfil.
            </p>
          </div>

          {/* Auth Card */}
          <div 
            id="welcome-auth-card"
            className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8 relative overflow-hidden"
          >
            {/* Ambient inner soft sheen */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl pointer-events-none"></div>

            {/* Error Message */}
            {errorMsg && (
              <div 
                id="auth-error-banner"
                className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="flex-1 leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div 
                id="auth-success-banner"
                className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="flex-1 leading-relaxed">{successMsg}</span>
              </div>
            )}

            {/* 1. GOOGLE AUTH BUTTON (Available in both Login and Register modes) */}
            {mode !== 'forgot-password' && (
              <div className="mb-5">
                <button
                  id="google-signin-btn"
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading || isLoading}
                  className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-3 group active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isGoogleLoading ? (
                    <RefreshCw className="w-4 h-4 text-slate-600 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  )}
                  <span className="font-['Outfit',sans-serif] tracking-wide text-slate-800 font-bold">
                    {isGoogleLoading ? 'Conectando con Google...' : 'Continuar con Google'}
                  </span>
                </button>

                {/* Divider */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-slate-500 font-medium">
                      o con tu correo electrónico
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. MODE: LOGIN FORM */}
            {mode === 'login' && (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 font-['Outfit',sans-serif]">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="login-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="tu.correo@estudiante.edu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 font-['Outfit',sans-serif]">
                      Contraseña
                    </label>
                    <button
                      type="button"
                      id="btn-forgot-password"
                      onClick={() => {
                        clearMessages();
                        setMode('forgot-password');
                      }}
                      className="text-xs font-semibold text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  id="btn-submit-login"
                  type="submit"
                  disabled={isLoading || isGoogleLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 font-['Outfit',sans-serif] tracking-wide"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Iniciar Sesión</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Clearly visible option to switch to Register */}
                <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-600">
                  <span>¿No tienes una cuenta? </span>
                  <button
                    id="switch-to-register-link"
                    type="button"
                    onClick={() => {
                      clearMessages();
                      setMode('register');
                    }}
                    className="font-bold text-pink-600 hover:text-pink-700 hover:underline transition-colors"
                  >
                    Regístrate
                  </button>
                </div>
              </form>
            )}

            {/* 3. MODE: REGISTER FORM */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div className="pb-1">
                  <h3 className="text-sm font-bold text-slate-800 font-['Outfit',sans-serif]">
                    Crea tu cuenta nueva
                  </h3>
                  <p className="text-xs text-slate-500">
                    Comenzarás con tu perfil individual, listo para realizar tests y guardar carreras.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-['Outfit',sans-serif]">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="register-name"
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ej. Mateo Gómez"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-['Outfit',sans-serif]">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="register-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="mateo@colegio.edu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-['Outfit',sans-serif]">
                    Contraseña * (mínimo 6 caracteres)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-['Outfit',sans-serif]">
                      Nivel Escolar
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        id="register-education"
                        value={educationLevel}
                        onChange={e => setEducationLevel(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 shadow-xs"
                      >
                        <option value="Grado 9 o 10 (Secundaria)">Grado 9 o 10 (Secundaria)</option>
                        <option value="Último año de Bachillerato / Secundaria">Último año de Bachillerato</option>
                        <option value="Bachiller graduado">Bachiller graduado</option>
                        <option value="Estudiante universitario">Estudiante universitario</option>
                        <option value="Explorando nuevas carreras">Explorando nuevas carreras</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-['Outfit',sans-serif]">
                      Ciudad / Región
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="register-city"
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Ej. Bogotá / Medellín"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                <button
                  id="btn-submit-register"
                  type="submit"
                  disabled={isLoading || isGoogleLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 font-['Outfit',sans-serif] tracking-wide"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Crear Cuenta e Ingresar</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Back to Login link */}
                <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-600">
                  <span>¿Ya tienes una cuenta registrada? </span>
                  <button
                    id="switch-to-login-link"
                    type="button"
                    onClick={() => {
                      clearMessages();
                      setMode('login');
                    }}
                    className="font-bold text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                  >
                    Inicia sesión
                  </button>
                </div>
              </form>
            )}

            {/* 4. MODE: FORGOT PASSWORD */}
            {mode === 'forgot-password' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Recuperar tu Contraseña
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Escribe el correo electrónico asociado a tu cuenta de VocAcción. Te enviaremos un enlace seguro para restablecerla.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 font-['Outfit',sans-serif]">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="forgot-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="tu.correo@estudiante.edu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all shadow-xs"
                    />
                  </div>
                </div>

                <button
                  id="btn-submit-forgot"
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 font-['Outfit',sans-serif] tracking-wide"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Enviar enlace de recuperación</span>
                  )}
                </button>

                <div className="pt-2 text-center text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      clearMessages();
                      setMode('login');
                    }}
                    className="font-bold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    ← Volver a Iniciar Sesión
                  </button>
                </div>
              </form>
            )}

            {/* Optional Fast Demo Preview Button (for quick testing/evaluation) */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col items-center">
              <button
                id="btn-demo-mode-access"
                type="button"
                onClick={handleDemoAccess}
                className="text-[11px] font-semibold text-slate-500 hover:text-purple-600 transition-colors flex items-center gap-1.5 py-1 px-3 rounded-full hover:bg-slate-100"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>¿Solo deseas una prueba rápida? Modo Invitado Demo</span>
              </button>
            </div>
          </div>

          {/* Bottom Security & Privacy Footnote */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Cuenta 100% individual y privada</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-pink-500" />
              <span>Metodología RIASEC (John Holland)</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-slate-400">
        VocAcción © 2026 — Plataforma de Orientación Vocacional para Jóvenes y Estudiantes
      </footer>
    </div>
  );
};
