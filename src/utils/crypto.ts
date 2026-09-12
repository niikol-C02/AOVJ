/**
 * Cryptographic utilities using the standard Web Cryptography API (SubtleCrypto)
 * Fully supported in all modern web browsers (Vercel, preview, production) and Node.js
 */

export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const subtle = typeof window !== 'undefined' && window.crypto?.subtle 
    ? window.crypto.subtle 
    : (globalThis as any).crypto?.subtle;

  if (!subtle) {
    throw new Error('Web Cryptography API is not available in this environment');
  }

  const keyMaterial = await subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: enc.encode(salt),
      iterations: 50000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(derivedBits));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function generateSalt(): string {
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const arr = new Uint8Array(16);
    window.crypto.getRandomValues(arr);
    return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  if ((globalThis as any).crypto?.getRandomValues) {
    const arr = new Uint8Array(16);
    (globalThis as any).crypto.getRandomValues(arr);
    return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  const chars = '0123456789abcdef';
  let res = '';
  for (let i = 0; i < 32; i++) {
    res += chars[Math.floor(Math.random() * chars.length)];
  }
  return res;
}

/**
 * Deterministic safe document key derived from user email
 */
export async function hashEmailToDocId(email: string): Promise<string> {
  const clean = (email || '').trim().toLowerCase();
  const enc = new TextEncoder();
  const subtle = typeof window !== 'undefined' && window.crypto?.subtle 
    ? window.crypto.subtle 
    : (globalThis as any).crypto?.subtle;

  if (!subtle) {
    // Deterministic fallback if subtle is unavailable
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
      hash = ((hash << 5) - hash) + clean.charCodeAt(i);
      hash |= 0;
    }
    return 'user_' + Math.abs(hash).toString(16) + '_' + clean.replace(/[^a-z0-9]/g, '_');
  }

  const digest = await subtle.digest('SHA-256', enc.encode(clean));
  const hashArray = Array.from(new Uint8Array(digest));
  return 'usr_' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 48);
}
