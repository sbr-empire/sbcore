/**
 * Google Cloud Configuration
 * Cloud Run, Firestore, Cloud Storage, Pub/Sub
 */

import { Storage } from '@google-cloud/storage';
import { Firestore } from '@google-cloud/firestore';
import { PubSub } from '@google-cloud/pubsub';

// Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE
});

const bucket = storage.bucket(process.env.GCP_STORAGE_BUCKET);

// Google Cloud Firestore
const firestore = new Firestore({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE
});

// Google Cloud Pub/Sub
const pubsub = new PubSub({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE
});

export { storage, bucket, firestore, pubsub };
