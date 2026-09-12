/**
 * Authentication Middleware
 * JWT verification and user authentication
 */

import { verifyToken } from '../services/auth.service.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const verification = verifyToken(token);
  
  if (!verification.valid) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  req.user = verification.data;
  next();
}

export function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}
