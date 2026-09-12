/**
 * AI Routes
 * SBR Aql, SBR Qalam, SBR Safar
 */

import express from 'express';
import { askSBRAql, askSBRQalam, askSBRSafar, processBatchAI } from '../services/ai.service.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// SBR Aql - Islamic Knowledge
router.post('/aql', authenticateToken, async (req, res) => {
  const { question, context } = req.body;
  const result = await askSBRAql(question, context);
  res.json(result);
});

// SBR Qalam - Smart Writing
router.post('/qalam', authenticateToken, async (req, res) => {
  const { text, task, context } = req.body;
  const result = await askSBRQalam(text, task, context);
  res.json(result);
});

// SBR Safar - Travel & Location
router.post('/safar', authenticateToken, async (req, res) => {
  const { question, location } = req.body;
  const result = await askSBRSafar(question, location);
  res.json(result);
});

// Batch AI Processing
router.post('/batch', authenticateToken, async (req, res) => {
  const { requests } = req.body;
  const results = await processBatchAI(requests);
  res.json({ success: true, results });
});

export default router;
