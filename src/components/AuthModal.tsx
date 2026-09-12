import React, { useState } from 'react';
import { AuthMode, User } from '../types';
import { StorageController } from '../controllers/StorageController';
import { PasswordRequirementsIndicator } from './PasswordRequirementsIndicator';
import { validateEmail, isPasswordValid, getMissingPasswordRequirements } from '../utils/authValidation';
import { X, Mail, Lock, Eye, EyeOff, User as UserIcon, Sparkles, KeyRound, MapPin, GraduationCap, CheckCircle2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>(17);
  const [educationLevel, setEducationLevel] = useState('Último año de Bachillerato / Secundaria');
  const [city, setCity] = useState('Bogotá');
  const [country, setCountry] = useState('Colombia');

  // Recovery & error states
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setErrorMsg('');
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setIsGoogleLoading(true);
    try {
      const result = await StorageController.loginWithGoogle();
      if (result.user) {
        onShowToast(`¡Bienvenido, ${result.user.name.split(' ')[0]}!`, 'Has iniciado sesión con Google.', 'success');
        onSuccess(result.user);
        onClose();
      } else {
        setErrorMsg(result.error || 'No se pudo conectar con Google.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error al iniciar sesión con Google.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const result = await StorageController.loginUser(email, password);
      if (result.user) {
        onShowToast(`¡Bienvenido de nuevo, ${result.user.name.split(' ')[0]}!`, 'Has iniciado sesión correctamente.', 'success');
        onSuccess(result.user);
        onClose();
      } else {
        setErrorMsg(result.error || 'No se pudo iniciar sesión. Verifica tus credenciales.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error al iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMsg(emailCheck.error || 'Por favor ingresa un correo electrónico con formato válido.');
      return;
    }

    if (!isPasswordValid(password)) {
      const missing = getMissingPasswordRequirements(password);
      setErrorMsg(`Requisitos faltantes en la contraseña: ${missing.join(', ')}.`);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden. Por favor asegúrate de que sean idénticas.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await StorageController.registerUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        age: Number(age) || 17,
        educationLevel,
        city: city.trim(),
        country: country.trim()
      });

      if (result.user) {
        onShowToast(
          `¡Cuenta creada exitosamente!`,
          `Bienvenido a VocAcción, ${result.user.name}. ¡Comienza tu test vocacional!`,
          'success'
        );
        onSuccess(result.user);
        onClose();
      } else {
        setErrorMsg(result.error || 'Error al registrar tu cuenta.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error al registrar la cuenta.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Ingresa tu correo electrónico para enviar el enlace de recuperación.');
      return;
    }

    setIsLoading(true);
    const result = await StorageController.sendPasswordReset(email);
    setIsLoading(false);

    if (result.success) {
      onShowToast(
        'Correo de recuperación enviado',
        `Revisa tu bandeja de entrada en ${email} para restablecer tu contraseña.`,
        'success'
      );
      setMode('login');
    } else {
      setErrorMsg(result.error || 'No pudimos enviar el correo de recuperación.');
    }
  };

  const handleDemoLogin = () => {
    const demoUser = StorageController.setDemoUser();
    onShowToast(`¡Ingresaste como ${demoUser.name}!`, 'Explorando con datos de prueba sincronizables.', 'success');
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
                  <span className="px-3 bg-white/80 backdrop-blur-sm rounded-full border border-white/60 text-slate-500">o accede con otros métodos</span>
                </div>
              </div>

              {/* Google Sign In in modal */}
              <button
                id="modal-google-login-btn"
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading || isLoading}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-xs"
              >
                {isGoogleLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-600" />
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                <span>Continuar con Google</span>
              </button>

              {/* Quick Demo Login */}
              <button
                id="quick-demo-login-btn"
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-4 rounded-xl border border-purple-200/80 bg-purple-50/70 backdrop-blur-sm hover:bg-purple-100/80 text-purple-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs mt-2"
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contraseña *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="register-password-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Crea una contraseña segura"
                    className="w-full pl-10 pr-10 py-2 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Confirmar Contraseña *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="register-confirm-password-input"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    className="w-full pl-10 pr-10 py-2 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:bg-white shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Real-time Visual Password Checklist */}
              {(password.length > 0 || confirmPassword.length > 0) && (
                <PasswordRequirementsIndicator
                  password={password}
                  confirmPassword={confirmPassword}
                />
              )}

              {/* Validation helper status banner */}
              {(name.length > 0 || email.length > 0 || password.length > 0) && (
                (() => {
                  const emailValid = validateEmail(email).isValid;
                  const pwValid = isPasswordValid(password);
                  const match = password.length > 0 && password === confirmPassword;

                  if (!name.trim()) {
                    return (
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                        <span>Por favor ingresa tu nombre completo para continuar.</span>
                      </div>
                    );
                  }
                  if (!emailValid) {
                    return (
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                        <span>Ingresa un correo con formato válido (ej. estudiante@colegio.edu).</span>
                      </div>
                    );
                  }
                  if (!pwValid) {
                    const missing = getMissingPasswordRequirements(password);
                    return (
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                        <div>
                          <span className="font-semibold block">Requisitos faltantes en la contraseña:</span>
                          <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[11px]">
                            {missing.map((m, idx) => (
                              <li key={idx}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  }
                  if (!match) {
                    return (
                      <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                        <span>Las contraseñas no coinciden. Por favor verifícalas.</span>
                      </div>
                    );
                  }
                  return (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>¡Todos los requisitos de registro están cumplidos!</span>
                    </div>
                  );
                })()
              )}

              <button
                id="submit-register-btn"
                type="submit"
                disabled={
                  isLoading || 
                  !name.trim() || 
                  !validateEmail(email).isValid || 
                  !isPasswordValid(password) || 
                  password !== confirmPassword
                }
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:opacity-95 backdrop-blur-sm border border-white/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                Ingresa el correo electrónico asociado a tu cuenta de estudiante. Te enviaremos un enlace oficial seguro para restablecer tu contraseña.
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
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:shadow-lg backdrop-blur-sm border border-white/30 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Enviar Enlace de Recuperación</span>}
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
        </div>
      </div>
    </div>
  );
};
