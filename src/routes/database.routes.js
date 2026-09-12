/**
 * Database Routes
 */

import express from 'express';
import {
  createDocument,
  getDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
  queryDocuments
} from '../services/database.service.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create Document
router.post('/:collection', authenticateToken, async (req, res) => {
  const { collection } = req.params;
  const result = await createDocument(collection, req.body);
  res.status(result.success ? 201 : 400).json(result);
});

// Get All Documents
router.get('/:collection', authenticateToken, async (req, res) => {
  const { collection } = req.params;
  const { limit } = req.query;
  const result = await getAllDocuments(collection, parseInt(limit) || 50);
  res.json(result);
});

// Get Single Document
router.get('/:collection/:id', authenticateToken, async (req, res) => {
  const { collection, id } = req.params;
  const result = await getDocument(collection, id);
  res.status(result.success ? 200 : 404).json(result);
});

// Update Document
router.put('/:collection/:id', authenticateToken, async (req, res) => {
  const { collection, id } = req.params;
  const result = await updateDocument(collection, id, req.body);
  res.json(result);
});

// Delete Document
router.delete('/:collection/:id', authenticateToken, async (req, res) => {
  const { collection, id } = req.params;
  const result = await deleteDocument(collection, id);
  res.json(result);
});

export default router;
