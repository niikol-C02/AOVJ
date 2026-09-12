export interface PasswordRequirements {
  minLength: boolean;    // >= 8 caracteres
  hasUpper: boolean;     // al menos 1 mayúscula
  hasLower: boolean;     // al menos 1 minúscula
  hasNumber: boolean;    // al menos 1 número
  hasSpecial: boolean;   // al menos 1 carácter especial
}

/**
 * Check real-time requirements as the user types their password
 */
export function checkPasswordRequirements(password: string): PasswordRequirements {
  const p = password || '';
  return {
    minLength: p.length >= 8,
    hasUpper: /[A-Z]/.test(p),
    hasLower: /[a-z]/.test(p),
    hasNumber: /[0-9]/.test(p),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(p)
  };
}

/**
 * Returns true only if all 5 password rules are satisfied
 */
export function isPasswordValid(password: string): boolean {
  const reqs = checkPasswordRequirements(password);
  return reqs.minLength && reqs.hasUpper && reqs.hasLower && reqs.hasNumber && reqs.hasSpecial;
}

/**
 * Returns a list of readable Spanish descriptions for requirements that are still missing
 */
export function getMissingPasswordRequirements(password: string): string[] {
  const reqs = checkPasswordRequirements(password);
  const missing: string[] = [];
  if (!reqs.minLength) missing.push('Mínimo 8 caracteres (actual: ' + (password?.length || 0) + ')');
  if (!reqs.hasUpper) missing.push('Al menos 1 letra mayúscula (A-Z)');
  if (!reqs.hasLower) missing.push('Al menos 1 letra minúscula (a-z)');
  if (!reqs.hasNumber) missing.push('Al menos 1 número (0-9)');
  if (!reqs.hasSpecial) missing.push('Al menos 1 carácter especial (@, #, $, %, !, etc.)');
  return missing;
}

/**
 * Validate email address format strictly
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const clean = (email || '').trim().toLowerCase();
  if (!clean) {
    return { isValid: false, error: 'El correo electrónico es obligatorio.' };
  }
  // Standard format validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(clean) || !clean.includes('.') || clean.endsWith('.')) {
    return { 
      isValid: false, 
      error: 'Por favor ingresa un correo electrónico con formato válido (ejemplo: estudiante@colegio.edu).' 
    };
  }
  return { isValid: true };
}
