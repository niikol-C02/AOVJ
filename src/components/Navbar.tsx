import React, { useState } from 'react';
import { User, ViewType } from '../types';
import { 
  Compass, 
  Sparkles, 
  BookOpen, 
  Building2, 
  Award, 
  User as UserIcon, 
  BarChart3, 
  LogOut, 
  LogIn, 
  Heart, 
  Layers, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  currentUser: User | null;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onLogout: () => void;
  savedCareersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onOpenAuth,
  onLogout,
  savedCareersCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { id: ViewType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Inicio', icon: Compass },
    { id: 'test', label: 'Test Vocacional', icon: Sparkles },
    { id: 'results', label: 'Resultados', icon: BarChart3 },
    { id: 'careers', label: 'Carreras', icon: BookOpen },
    { id: 'universities', label: 'Universidades', icon: Building2 },
    { id: 'scholarships', label: 'Becas', icon: Award },
    { id: 'profile', label: 'Perfil', icon: UserIcon }
  ];

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-2xl border-b border-white/60 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div 
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-500 p-0.5 shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform backdrop-blur-md">
              <div className="w-full h-full bg-white/90 backdrop-blur-xs rounded-[14px] flex items-center justify-center text-purple-600">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:rotate-45" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Outfit',sans-serif] font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  VocAcción
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200/80 text-pink-700 uppercase tracking-wider hidden sm:inline-block shadow-xs">
                  Juvenil
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium hidden sm:block -mt-0.5">
                Orientación Profesional & Futuro
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white/90 backdrop-blur-md text-purple-950 shadow-xs border border-white/80 ring-1 ring-purple-200/60'
                      : 'text-slate-600 hover:text-purple-800 hover:bg-white/55 hover:backdrop-blur-sm'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right actions: Compare, Favorites, User Profile / Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Career Compare Quick Button */}
            <button
              id="compare-careers-nav-btn"
              onClick={() => handleNavClick('compare')}
              title="Comparar Carreras Profesionales"
              className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                currentView === 'compare'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white border-white/40 shadow-sm backdrop-blur-md'
                  : 'bg-white/60 backdrop-blur-md text-slate-700 border-white/70 hover:border-purple-300 hover:bg-white/85 shadow-xs'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-pink-500" />
              <span>Comparador</span>
            </button>

            {/* Saved Items badge button */}
            <button
              id="saved-items-nav-btn"
              onClick={() => handleNavClick('profile')}
              title="Mis Carreras Guardadas"
              className="relative p-2 sm:px-3 sm:py-2 rounded-xl bg-white/60 backdrop-blur-md border border-white/70 text-slate-700 hover:text-pink-600 hover:border-pink-200 hover:bg-white/85 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Heart className={`w-4 h-4 ${savedCareersCount > 0 ? 'text-pink-500 fill-pink-500' : 'text-slate-400'}`} />
              <span className="hidden sm:inline text-xs font-semibold">Favoritos</span>
              {savedCareersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center -ml-0.5 shadow-xs">
                  {savedCareersCount}
                </span>
              )}
            </button>

            {/* User Session Controller */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="user-menu-dropdown-toggle"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 hover:border-purple-200 hover:bg-white/90 shadow-xs transition-all"
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${currentUser.avatarColor || 'bg-gradient-to-tr from-pink-400 to-purple-500'} text-white flex items-center justify-center font-bold text-xs shadow-xs`}>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-xs font-bold text-slate-800 leading-none">
                      {currentUser.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Estudiante</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserDropdownOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/80 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                      <button
                        id="user-menu-profile-btn"
                        onClick={() => {
                          handleNavClick('profile');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-purple-700 hover:bg-purple-50/80 rounded-xl transition-colors text-left"
                      >
                        <UserIcon className="w-4 h-4 text-purple-500" />
                        <span>Mi Perfil e Historial</span>
                      </button>
                      <button
                        id="user-menu-results-btn"
                        onClick={() => {
                          handleNavClick('results');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-purple-700 hover:bg-purple-50/80 rounded-xl transition-colors text-left"
                      >
                        <BarChart3 className="w-4 h-4 text-pink-500" />
                        <span>Mis Resultados Vocacionales</span>
                      </button>
                      <div className="my-1 border-t border-slate-100" />
                      <button
                        id="user-menu-logout-btn"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50/80 rounded-xl transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-btn"
                  onClick={() => onOpenAuth('login')}
                  className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-purple-700 hover:bg-white/60 backdrop-blur-sm border border-transparent hover:border-white/60 transition-all flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4 text-purple-600" />
                  <span className="hidden sm:inline">Ingresar</span>
                </button>
                <button
                  id="nav-register-btn"
                  onClick={() => onOpenAuth('register')}
                  className="px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-sm hover:shadow-md hover:opacity-95 backdrop-blur-md border border-white/30 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Crear Cuenta</span>
                </button>
              </div>
            )}

            {/* Mobile hamburger menu toggle button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-slate-600 hover:text-slate-900"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile expandable drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/60 bg-white/85 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-100/90 text-purple-900 font-bold border border-purple-200/70'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            id="mobile-nav-compare-btn"
            onClick={() => handleNavClick('compare')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-white/60"
          >
            <Layers className="w-5 h-5 text-pink-500" />
            <span>Comparador de Carreras</span>
          </button>
        </div>
      )}
    </header>
  );
};
