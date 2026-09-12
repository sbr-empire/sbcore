/**
 * Database Service - Firestore Operations
 * Collections: users, posts, products, bookings, transactions
 */

import { db } from '../config/firebase.js';

// ============================================================================
// COLLECTION MANAGEMENT
// ============================================================================

export async function createDocument(collection, data, documentId = null) {
  try {
    const docRef = documentId
      ? await db.collection(collection).doc(documentId).set(data)
      : await db.collection(collection).add(data);
    
    return {
      success: true,
      id: documentId || docRef.id,
      data: data
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getDocument(collection, documentId) {
  try {
    const doc = await db.collection(collection).doc(documentId).get();
    if (!doc.exists) {
      return { success: false, error: 'Document not found' };
    }
    return { success: true, id: doc.id, data: doc.data() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAllDocuments(collection, limit = 50) {
  try {
    const snapshot = await db.collection(collection).limit(limit).get();
    const docs = [];
    snapshot.forEach(doc => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, count: docs.length, data: docs };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateDocument(collection, documentId, updates) {
  try {
    await db.collection(collection).doc(documentId).update({
      ...updates,
      updatedAt: new Date()
    });
    return { success: true, message: 'Document updated' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteDocument(collection, documentId) {
  try {
    await db.collection(collection).doc(documentId).delete();
    return { success: true, message: 'Document deleted' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================================================
// QUERY OPERATIONS
// ============================================================================

export async function queryDocuments(collection, whereClause, limit = 50) {
  try {
    let query = db.collection(collection);
    
    if (whereClause) {
      query = query.where(whereClause.field, whereClause.operator, whereClause.value);
    }
    
    const snapshot = await query.limit(limit).get();
    const docs = [];
    snapshot.forEach(doc => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, count: docs.length, data: docs };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================================================
// BATCH OPERATIONS
// ============================================================================

export async function batchWrite(operations) {
  try {
    const batch = db.batch();
    
    operations.forEach(op => {
      const docRef = db.collection(op.collection).doc(op.id);
      if (op.type === 'set') {
        batch.set(docRef, op.data);
      } else if (op.type === 'update') {
        batch.update(docRef, op.data);
      } else if (op.type === 'delete') {
        batch.delete(docRef);
      }
    });
    
    await batch.commit();
    return { success: true, message: 'Batch operations completed' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
