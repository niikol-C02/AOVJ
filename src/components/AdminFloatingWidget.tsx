import React from 'react';
import { ViewType, User } from '../types';
import { ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';

interface AdminFloatingWidgetProps {
  currentUser: User | null;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const AdminFloatingWidget: React.FC<AdminFloatingWidgetProps> = ({
  currentUser,
  currentView,
  onNavigate
}) => {
  // Only display for authorized admins
  if (currentUser?.role !== 'admin') {
    return null;
  }

  const isAdminView = currentView === 'admin';

  return (
    <aside aria-label="Acceso rápido administrativo" className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        id="admin-floating-quick-toggle-btn"
        type="button"
        onClick={() => onNavigate(isAdminView ? 'home' : 'admin')}
        className={`group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-xl border transition-all duration-300 active:scale-95 ${
          isAdminView
            ? 'bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white border-purple-400/40 ring-2 ring-purple-500/30 hover:shadow-purple-500/20'
            : 'bg-white/95 text-purple-950 border-purple-200/80 hover:border-purple-400 hover:bg-white ring-2 ring-purple-600/15'
        }`}
        title={isAdminView ? 'Volver a la vista regular de estudiante' : 'Abrir Panel de Administrador'}
      >
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
          isAdminView ? 'bg-purple-500/30 text-pink-300' : 'bg-purple-100 text-purple-700'
        }`}>
          <ShieldCheck className="w-4 h-4 animate-pulse" />
        </div>

        <div className="text-left text-xs leading-none">
          <p className="font-extrabold flex items-center gap-1">
            <span>{isAdminView ? 'Modo Estudiante' : 'Panel Administrador'}</span>
            {isAdminView ? (
              <ArrowLeft className="w-3 h-3 text-pink-300 group-hover:-translate-x-0.5 transition-transform" />
            ) : (
              <ArrowRight className="w-3 h-3 text-purple-600 group-hover:translate-x-0.5 transition-transform" />
            )}
          </p>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">
            {isAdminView ? 'Salir de gestión' : 'Acceso exclusivo'}
          </p>
        </div>
      </button>
    </aside>
  );
};
