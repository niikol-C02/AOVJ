/**
 * Servicio universal y resiliente de síntesis de voz (Text-to-Speech)
 * Optimizado para compatibilidad total en:
 * - Celulares y tablets Android (Chrome, Edge, Samsung Internet)
 * - iPhone y iPad (Safari iOS, WebViews)
 * - Computadores Windows y Mac (Chrome, Safari, Firefox, Edge)
 */

interface SpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

class SpeechService {
  private static instance: SpeechService;
  private isSpeakingState = false;
  private voices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private keepAliveInterval: any = null;

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  public static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  private initVoices() {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        this.voices = window.speechSynthesis.getVoices() || [];
      }
    } catch (e) {
      console.warn('SpeechService: Error getting voices', e);
    }
  }

  private getBestSpanishVoice(): SpeechSynthesisVoice | null {
    if (!this.voices || this.voices.length === 0) {
      this.initVoices();
    }

    // 1. Look for localized Spanish (Colombia, Latin America, Mexico, Spain)
    const preferredLang = ['es-CO', 'es-419', 'es-MX', 'es-US', 'es-ES', 'es'];
    for (const code of preferredLang) {
      const match = this.voices.find(v => v.lang.toLowerCase().startsWith(code.toLowerCase()));
      if (match) return match;
    }

    // 2. Any Spanish voice
    const anyEs = this.voices.find(v => v.lang.toLowerCase().includes('es'));
    if (anyEs) return anyEs;

    // 3. Fallback to default
    return this.voices.find(v => v.default) || (this.voices.length > 0 ? this.voices[0] : null);
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState || (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking);
  }

  public stop(): void {
    if (typeof window === 'undefined') return;

    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }

    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch (_) {}

    this.isSpeakingState = false;
    this.currentUtterance = null;
    (window as any).__currentUtterance = null;
  }

  public speak(text: string, options: SpeechOptions = {}): boolean {
    if (typeof window === 'undefined' || !text.trim()) {
      return false;
    }

    // Always stop any ongoing speech first
    this.stop();

    if (!this.isSupported()) {
      options.onError?.(new Error('Navegador sin soporte de voz'));
      return false;
    }

    try {
      // Chrome/Safari requirement: resume context if paused
      window.speechSynthesis.resume();

      // Clean text for clearer pronunciation
      const cleanText = text
        .replace(/[*_#`]/g, '') // remove markdown marks
        .replace(/¿|\?|¡|!/g, '$& ') // slight pause on punctuation
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voice = this.getBestSpanishVoice();

      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = options.lang || 'es-ES';
      }

      utterance.rate = options.rate ?? 0.95; // Slightly slower than 1.0 for high clarity
      utterance.pitch = options.pitch ?? 1.0;

      utterance.onstart = () => {
        this.isSpeakingState = true;
        options.onStart?.();
      };

      const cleanup = () => {
        if (this.keepAliveInterval) {
          clearInterval(this.keepAliveInterval);
          this.keepAliveInterval = null;
        }
        this.isSpeakingState = false;
        this.currentUtterance = null;
        (window as any).__currentUtterance = null;
      };

      utterance.onend = () => {
        cleanup();
        options.onEnd?.();
      };

      utterance.onerror = (e) => {
        cleanup();
        // Ignore interrupted cancel errors
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          options.onError?.(e);
        } else {
          options.onEnd?.();
        }
      };

      // Fix Chrome bug: Garbage collection cancels speech after ~15s
      this.currentUtterance = utterance;
      (window as any).__currentUtterance = utterance;

      // Keepalive ping for long utterances on Chrome / Android
      this.keepAliveInterval = setInterval(() => {
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        } else {
          if (this.keepAliveInterval) {
            clearInterval(this.keepAliveInterval);
            this.keepAliveInterval = null;
          }
        }
      }, 10000);

      // Synchronous speak to strictly satisfy iOS Safari and mobile user-gesture requirements
      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        cleanup();
        options.onError?.(err);
        return false;
      }

      return true;
    } catch (err) {
      this.stop();
      options.onError?.(err);
      return false;
    }
  }
}

export const speechService = SpeechService.getInstance();
