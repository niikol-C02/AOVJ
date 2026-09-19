import React from 'react';
import { AccessibilityPreferences, AgeStage, getAgeStage } from '../types';
import { AGE_STAGES_INFO } from '../models/adaptiveTestBank';
import { 
  Eye, 
  Ear, 
  Hand, 
  Brain, 
  BookOpen, 
  Sparkles, 
  Clock, 
  Check, 
  X, 
  Sliders, 
  Smile, 
  RotateCcw,
  CheckCircle2,
  Info
} from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: AccessibilityPreferences;
  onUpdatePreferences: (prefs: AccessibilityPreferences) => void;
  userAge?: number;
  onUpdateAge?: (age: number) => void;
  onShowToast?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
  userAge = 17,
  onUpdateAge,
  onShowToast
}) => {
  if (!isOpen) return null;

  const togglePref = (key: keyof AccessibilityPreferences) => {
    const next = { ...preferences, [key]: !preferences[key] };
    onUpdatePreferences(next);
  };

  const handleApplyPreset = (preset: 'visual' | 'calm' | 'cognitive' | 'reset') => {
    let next: AccessibilityPreferences = {};
    if (preset === 'visual') {
      next = {
        ...preferences,
        visualLargeText: true,
        visualHighContrast: true,
        visualAccessibleFont: true,
        motorLargeButtons: true
      };
      onShowToast?.('Ajuste visual aplicado', 'Texto ampliado, alto contraste y tipografía accesible activados.', 'success');
    } else if (preset === 'calm') {
      next = {
        ...preferences,
        sensoryCalm: true,
        visualReducedSimultaneous: true,
        cognitiveOneQuestionAtATime: true,
        timeUnlimited: true
      };
      onShowToast?.('Modo experiencia tranquila', 'Reducción de estímulos, paso a paso y tiempo ilimitado.', 'success');
    } else if (preset === 'cognitive') {
      next = {
        ...preferences,
        cognitiveClearLanguage: true,
        cognitiveOneQuestionAtATime: true,
        readingAssistance: true,
        timeUnlimited: true,
        motorLargeButtons: true
      };
      onShowToast?.('Lectura y comprensión ágil', 'Preguntas paso a paso, lenguaje sencillo y apoyo visual.', 'success');
    } else {
      next = {};
      onShowToast?.('Ajustes restablecidos', 'Se restauraron los valores estándar de visualización.', 'info');
    }
    onUpdatePreferences(next);
  };

  const currentStage: AgeStage = getAgeStage(userAge);
  const stageInfo = AGE_STAGES_INFO[currentStage];

  // Count active preferences
  const activeCount = Object.values(preferences).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-modal-title"
        className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-white/80 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-purple-50 via-pink-50/50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="a11y-modal-title" className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  Personalizar mi experiencia
                </h2>
                {activeCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                    {activeCount} activo{activeCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Adaptamos la plataforma a tus necesidades visuales, cognitivas, motoras y de aprendizaje.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Cerrar ajustes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="px-6 py-2.5 bg-slate-50/80 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-500 font-medium">Ajustes rápidos sugeridos:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleApplyPreset('visual')}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-700 font-medium transition-colors"
            >
              👁️ Alto Contraste & Grande
            </button>
            <button
              onClick={() => handleApplyPreset('calm')}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-700 font-medium transition-colors"
            >
              🎧 Experiencia Serena
            </button>
            <button
              onClick={() => handleApplyPreset('cognitive')}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-700 font-medium transition-colors"
            >
              🧠 Paso a Paso
            </button>
            {activeCount > 0 && (
              <button
                onClick={() => handleApplyPreset('reset')}
                className="px-2.5 py-1 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 font-medium transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Age Adaptation Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                <Smile className="w-4 h-4 text-purple-600" />
                <span>Etapa de edad actual: {stageInfo.name}</span>
              </div>
              {onUpdateAge && (
                <div className="flex items-center gap-2">
                  <label htmlFor="modal-age-input" className="text-xs text-purple-700 font-medium">
                    Edad:
                  </label>
                  <input
                    id="modal-age-input"
                    type="number"
                    min={8}
                    max={99}
                    value={userAge}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!isNaN(val) && val >= 8 && val <= 99) {
                        onUpdateAge(val);
                      }
                    }}
                    className="w-16 px-2 py-1 bg-white border border-purple-200 rounded-lg text-xs font-bold text-purple-900 text-center"
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-purple-700/90 leading-relaxed">
              <strong>Enfoque adaptado:</strong> {stageInfo.focus}. Los textos, ejemplos y número de preguntas se ajustan automáticamente a tu edad sin limitar tus opciones vocacionales.
            </p>
          </div>

          {/* Accessibility Option Groups */}
          <div className="space-y-4">
            {/* 1. Necesidades visuales */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Eye className="w-4 h-4 text-pink-600" />
                <span>Necesidades visuales</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-purple-300 bg-white hover:bg-purple-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.visualLargeText}
                    onChange={() => togglePref('visualLargeText')}
                    className="mt-0.5 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Texto ampliado</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Aumenta el tamaño de la letra para mayor comodidad de lectura.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-purple-300 bg-white hover:bg-purple-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.visualHighContrast}
                    onChange={() => togglePref('visualHighContrast')}
                    className="mt-0.5 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Alto contraste</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Bordes definidos y contraste nítido entre textos y fondos.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-purple-300 bg-white hover:bg-purple-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.visualAccessibleFont}
                    onChange={() => togglePref('visualAccessibleFont')}
                    className="mt-0.5 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Tipografía accesible</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Fuente clara con espaciado amplio que favorece la legibilidad.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-purple-300 bg-white hover:bg-purple-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.visualReducedSimultaneous}
                    onChange={() => togglePref('visualReducedSimultaneous')}
                    className="mt-0.5 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Menos elementos visuales simultáneos</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Presentación limpia que prioriza el contenido principal.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* 2. Necesidades motoras */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Hand className="w-4 h-4 text-emerald-600" />
                <span>Necesidades motoras y de interacción</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.motorLargeButtons}
                    onChange={() => togglePref('motorLargeButtons')}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Botones grandes y espaciados</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Áreas táctiles amplias que no exigen movimientos de precisión milimétrica.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.motorKeyboardNav}
                    onChange={() => togglePref('motorKeyboardNav')}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Navegación clara por teclado</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Enfoque visual resaltado para recorrer con Tab y Flechas.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* 3. Necesidades cognitivas y de aprendizaje */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Brain className="w-4 h-4 text-indigo-600" />
                <span>Necesidades cognitivas y de aprendizaje</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.cognitiveOneQuestionAtATime}
                    onChange={() => togglePref('cognitiveOneQuestionAtATime')}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Una pregunta a la vez</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Enfoca la atención en un solo ítem por pantalla sin sobrecarga.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.cognitiveClearLanguage}
                    onChange={() => togglePref('cognitiveClearLanguage')}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Lenguaje claro y directo</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Instrucciones paso a paso evitando vocabulario innecesariamente complejo.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* 4. Lectura, comprensión y sentidos */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Lectura, calma sensorial y tiempo</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-amber-300 bg-white hover:bg-amber-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.readingAssistance}
                    onChange={() => togglePref('readingAssistance')}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Textos breves con apoyo visual</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Párrafos concisos acompañados de iconos y emojis explicativos.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-amber-300 bg-white hover:bg-amber-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.sensoryCalm}
                    onChange={() => togglePref('sensoryCalm')}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Experiencia sensorial serena</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Reduce animaciones enérgicas, destellos o elementos visuales distractores.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-amber-300 bg-white hover:bg-amber-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.timeUnlimited}
                    onChange={() => togglePref('timeUnlimited')}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Pausa libre y sin prisa de tiempo</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Sin cronómetros que generen ansiedad; tu progreso se guarda siempre.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:border-amber-300 bg-white hover:bg-amber-50/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={!!preferences.auditoryTextFallback}
                    onChange={() => togglePref('auditoryTextFallback')}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Todo el contenido en texto</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Ninguna actividad depende de sonidos o pistas auditivas.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Philosophy Note */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <p>
              <strong>VocAcción Inclusiva:</strong> La accesibilidad adapta la herramienta a la persona, no la persona a la herramienta. Tus preferencias se guardan de forma permanente y puedes modificarlas en cualquier momento.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {activeCount === 0 ? 'Sin ajustes activos (modo estándar)' : `${activeCount} ajuste(s) personalizado(s) activado(s)`}
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Aplicar y continuar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
