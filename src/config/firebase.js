/**
 * Firebase Configuration & Initialization
 * Used by all SBR projects (HIKMAH, BEAUTY HUB, BIOFORGE)
 */

import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: process.env.GCP_TYPE || 'service_account',
  project_id: process.env.GCP_PROJECT_ID,
  private_key_id: process.env.GCP_PRIVATE_KEY_ID,
  private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GCP_CLIENT_EMAIL,
  client_id: process.env.GCP_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs'
};

const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
  projectId: process.env.GCP_PROJECT_ID,
  storageBucket: process.env.GCP_STORAGE_BUCKET,
  databaseURL: `https://${process.env.GCP_PROJECT_ID}.firebaseio.com`
});

// Initialize Services
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);
const messaging = getMessaging(firebaseApp);

// Export Services
export { firebaseApp, db, storage, auth, messaging };

export default firebaseApp;
