/**
 * SBR CORE - Main Server
 * Handles authentication, AI, database for all 3 projects
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import aiRoutes from './routes/ai.routes.js';
import dbRoutes from './routes/database.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.SBR_PORT || 8080;

// ============================================================================
// MIDDLEWARE
// ============================================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.SBR_CORS_ORIGIN?.split(',') || '*',
  credentials: true,
  methods: process.env.SBR_ALLOWED_METHODS?.split(',') || ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ============================================================================
// HEALTH CHECK
// ============================================================================
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'SBR CORE API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/status', (req, res) => {
  res.json({
    status: 'operational',
    environment: process.env.SBR_NODE_ENV,
    services: {
      firebase: 'connected',
      googleCloud: 'connected',
      ai: 'ready',
      database: 'ready'
    }
  });
});

// ============================================================================
// ROUTES
// ============================================================================
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/db', dbRoutes);

// ============================================================================
// ERROR HANDLING
// ============================================================================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// ============================================================================
// START SERVER
// ============================================================================
app.listen(PORT, () => {
  console.log(`🚀 SBR CORE API running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});

export default app;
