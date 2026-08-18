import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let Icon = CheckCircle2;
        let borderClass = 'border-pink-300/60 bg-white/85 text-slate-800 shadow-xl shadow-pink-500/15';
        let iconColor = 'text-pink-500';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-rose-300/60 bg-white/85 text-slate-800 shadow-xl shadow-rose-500/15';
          iconColor = 'text-rose-500';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-purple-300/60 bg-white/85 text-slate-800 shadow-xl shadow-purple-500/15';
          iconColor = 'text-purple-500';
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${borderClass}`}
          >
            <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColor}`} />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-slate-900 leading-tight">{toast.title}</p>
              {toast.description && (
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              id={`dismiss-toast-${toast.id}`}
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
