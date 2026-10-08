/**
 * Authentication Service
 * Handles user registration, login, JWT tokens, Firebase Auth
 */

import jwt from 'jsonwebtoken';
import { auth, db } from '../config/firebase.js';
import {
  createAuthToken,
  getUsersCollectionName,
  hashPassword,
  sanitizeProfileUpdates,
  sanitizeUser,
  verifyAuthToken,
  verifyPassword
} from '../utils/auth.js';

const USERS_COLLECTION = getUsersCollectionName();

// ============================================================================
// USER REGISTRATION
// ============================================================================
export async function registerUser(email, password, profile = {}) {
  let userRecord;

  try {
    const passwordHash = await hashPassword(password);

    // Create Firebase Auth User
    userRecord = await auth.createUser({
      email,
      password,
      displayName: profile.name || 'User',
      photoURL: profile.photoURL || null
    });

    // Store User Profile in Firestore
    await db.collection(USERS_COLLECTION).doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: email,
      name: profile.name || 'User',
      phone: profile.phone || null,
      avatar: profile.photoURL || null,
      role: profile.role || 'user',
      passwordHash,
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        language: profile.language || 'en',
        theme: profile.theme || 'dark'
      }
    });

    return {
      success: true,
      uid: userRecord.uid,
      email: userRecord.email,
      message: 'User registered successfully'
    };
  } catch (error) {
    if (userRecord?.uid) {
      await auth.deleteUser(userRecord.uid).catch(() => {});
    }

    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================================
// USER LOGIN
// ============================================================================
export async function loginUser(email, password) {
  try {
    const user = await auth.getUserByEmail(email);
    const userDoc = await db.collection(USERS_COLLECTION).doc(user.uid).get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    const isValidPassword = await verifyPassword(password, userData.passwordHash);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = createAuthToken({
      uid: user.uid,
      email: user.email,
      role: userData.role || user.customClaims?.role || 'user'
    });

    return {
      success: true,
      token,
      user: sanitizeUser(userData)
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Invalid credentials'
    };
  }
}

// ============================================================================
// VERIFY JWT TOKEN
// ============================================================================
export function verifyToken(token) {
  try {
    const decoded = verifyAuthToken(token);
    return { valid: true, data: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// ============================================================================
// GET USER PROFILE
// ============================================================================
export async function getUserProfile(uid) {
  try {
    const userDoc = await db.collection(USERS_COLLECTION).doc(uid).get();
    if (!userDoc.exists) {
      return { success: false, error: 'User not found' };
    }
    return { success: true, user: sanitizeUser(userDoc.data()) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================================================
// UPDATE USER PROFILE
// ============================================================================
export async function updateUserProfile(uid, updates) {
  try {
    await db.collection(USERS_COLLECTION).doc(uid).update({
      ...sanitizeProfileUpdates(updates),
      updatedAt: new Date()
    });
    return { success: true, message: 'Profile updated' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================================================
// LOGOUT
// ============================================================================
export function logoutUser() {
  return { success: true, message: 'User logged out' };
}
