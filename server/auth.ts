import crypto from 'node:crypto';

/**
 * Hash a password using crypto.scrypt with a unique random salt
 * Stored as "salt:hexHash"
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

/**
 * Verify a plain-text password against a stored "salt:hexHash"
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split(':');
    if (parts.length !== 2) return false;
    const [salt, expectedHash] = parts;
    if (!salt || !expectedHash) return false;

    const derivedKey = crypto.scryptSync(password, salt, 64);
    const expectedBuffer = Buffer.from(expectedHash, 'hex');
    
    if (expectedBuffer.length !== derivedKey.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, derivedKey);
  } catch (err) {
    console.error('Password verification error:', err);
    return false;
  }
}

/**
 * Generate a cryptographically secure session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
