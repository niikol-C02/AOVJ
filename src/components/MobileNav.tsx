import React from 'react';
import { ViewType } from '../types';
import { Compass, Sparkles, BookOpen, Building2, User as UserIcon } from 'lucide-react';

interface MobileNavProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, onNavigate }) => {
  const items = [
    { id: 'home' as ViewType, label: 'Inicio', icon: Compass },
    { id: 'test' as ViewType, label: 'Test', icon: Sparkles },
    { id: 'careers' as ViewType, label: 'Carreras', icon: BookOpen },
    { id: 'universities' as ViewType, label: 'U-Directorio', icon: Building2 },
    { id: 'profile' as ViewType, label: 'Perfil', icon: UserIcon },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/75 backdrop-blur-2xl border-t border-white/60 px-2 py-1.5 shadow-[0_-8px_32px_rgba(148,163,184,0.15)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
                isActive
                  ? 'text-purple-700 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-white/90 backdrop-blur-md shadow-xs border border-white/80 text-purple-700' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
