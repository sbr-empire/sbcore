import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const PASSWORD_SALT_ROUNDS = 12;
const PROTECTED_PROFILE_FIELDS = new Set([
  'uid',
  'email',
  'role',
  'password',
  'passwordHash',
  'createdAt',
  'updatedAt',
  'verified'
]);

export function getJwtSecret() {
  const jwtSecret = process.env.SBR_JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('Missing required env var: SBR_JWT_SECRET');
  }

  return jwtSecret;
}

export function getJwtExpiry() {
  return process.env.SBR_JWT_EXPIRY || '7d';
}

export function getUsersCollectionName() {
  return process.env.SBR_FIRESTORE_USERS_COLLECTION || 'sbr_users';
}

export async function hashPassword(password) {
  return bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
}

export async function verifyPassword(password, passwordHash) {
  if (!passwordHash) {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
}

export function createAuthToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: getJwtExpiry() });
}

export function verifyAuthToken(token) {
  return jwt.verify(token, getJwtSecret());
}

export function sanitizeUser(user = {}) {
  const { passwordHash, ...safeUser } = user || {};
  return safeUser;
}

export function sanitizeProfileUpdates(updates = {}) {
  return Object.fromEntries(
    Object.entries(updates).filter(([key]) => !PROTECTED_PROFILE_FIELDS.has(key))
  );
}
