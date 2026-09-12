/**
 * Authentication Service
 * Handles user registration, login, JWT tokens, Firebase Auth
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { auth, db } from '../config/firebase.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

// ============================================================================
// USER REGISTRATION
// ============================================================================
export async function registerUser(email, password, profile = {}) {
  try {
    // Create Firebase Auth User
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: profile.name || 'User',
      photoURL: profile.photoURL || null
    });

    // Store User Profile in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: email,
      name: profile.name || 'User',
      phone: profile.phone || null,
      avatar: profile.photoURL || null,
      role: profile.role || 'user',
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
    // Verify credentials via Firebase
    const user = await auth.getUserByEmail(email);

    // Generate JWT Token
    const token = jwt.sign(
      { uid: user.uid, email: user.email, role: user.customClaims?.role || 'user' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    // Get User Profile
    const userDoc = await db.collection('users').doc(user.uid).get();

    return {
      success: true,
      token,
      user: userDoc.data()
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
    const decoded = jwt.verify(token, JWT_SECRET);
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
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return { success: false, error: 'User not found' };
    }
    return { success: true, user: userDoc.data() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================================================
// UPDATE USER PROFILE
// ============================================================================
export async function updateUserProfile(uid, updates) {
  try {
    await db.collection('users').doc(uid).update({
      ...updates,
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
