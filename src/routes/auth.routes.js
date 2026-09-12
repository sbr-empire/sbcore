/**
 * Authentication Routes
 */

import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, logoutUser } from '../services/auth.service.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password, profile } = req.body;
  const result = await registerUser(email, password, profile);
  res.status(result.success ? 201 : 400).json(result);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  res.status(result.success ? 200 : 401).json(result);
});

// Get Profile
router.get('/profile', authenticateToken, async (req, res) => {
  const result = await getUserProfile(req.user.uid);
  res.status(result.success ? 200 : 404).json(result);
});

// Update Profile
router.put('/profile', authenticateToken, async (req, res) => {
  const result = await updateUserProfile(req.user.uid, req.body);
  res.status(result.success ? 200 : 400).json(result);
});

// Logout
router.post('/logout', authenticateToken, (req, res) => {
  const result = logoutUser();
  res.json(result);
});

export default router;
