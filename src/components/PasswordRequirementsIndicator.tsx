import React from 'react';
import { Check, X, ShieldAlert, ShieldCheck } from 'lucide-react';
import { checkPasswordRequirements, isPasswordValid } from '../utils/authValidation';

interface Props {
  password: string;
  confirmPassword?: string;
  showConfirmMatch?: boolean;
}

export const PasswordRequirementsIndicator: React.FC<Props> = ({
  password,
  confirmPassword = '',
  showConfirmMatch = true
}) => {
  const reqs = checkPasswordRequirements(password);
  const allMet = isPasswordValid(password);
  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  const items = [
    { label: 'Mínimo 8 caracteres', met: reqs.minLength },
    { label: 'Al menos 1 letra mayúscula (A-Z)', met: reqs.hasUpper },
    { label: 'Al menos 1 letra minúscula (a-z)', met: reqs.hasLower },
    { label: 'Al menos 1 número (0-9)', met: reqs.hasNumber },
    { label: 'Al menos 1 carácter especial (@, #, $, %, !, etc.)', met: reqs.hasSpecial }
  ];

  return (
    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2 transition-all">
      <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
        <span className="font-semibold text-slate-700 flex items-center gap-1.5 font-['Outfit',sans-serif]">
          {allMet ? (
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
          )}
          Requisitos de seguridad de la contraseña:
        </span>
        <span className={`text-[11px] font-bold ${allMet ? 'text-emerald-600' : 'text-slate-500'}`}>
          {items.filter(i => i.met).length}/5 cumplidos
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1.5 transition-colors ${
              item.met ? 'text-emerald-700 font-medium' : 'text-slate-500'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                item.met
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-slate-200/70 text-slate-400'
              }`}
            >
              {item.met ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <X className="w-2.5 h-2.5 stroke-[2.5]" />}
            </div>
            <span className="text-[11px] leading-tight">{item.label}</span>
          </div>
        ))}
      </div>

      {showConfirmMatch && confirmPassword.length > 0 && (
        <div
          className={`pt-1.5 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
            passwordsMatch ? 'text-emerald-700' : 'text-rose-600'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
              passwordsMatch
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-rose-100 text-rose-600'
            }`}
          >
            {passwordsMatch ? (
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            ) : (
              <X className="w-2.5 h-2.5 stroke-[2.5]" />
            )}
          </div>
          <span>
            {passwordsMatch ? 'Las contraseñas coinciden correctamente.' : 'Las contraseñas aún no coinciden.'}
          </span>
        </div>
      )}
    </div>
  );
};
