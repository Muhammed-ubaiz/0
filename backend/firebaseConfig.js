import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectId = process.env.FIREBASE_PROJECT_ID || 'idealpack-store';

let db = null;
let isFirebaseConnected = false;

try {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || path.join(__dirname, 'serviceAccountKey.json');
  
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id || projectId
    });
    db = admin.firestore();
    isFirebaseConnected = true;
    console.log(`[Firebase] Initialized with service account for project: ${projectId}`);
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: projectId
    });
    db = admin.firestore();
    isFirebaseConnected = true;
    console.log(`[Firebase] Initialized with application default credentials for project: ${projectId}`);
  } else {
    // Initialize with project ID default
    try {
      admin.initializeApp({
        projectId: projectId
      });
      db = admin.firestore();
      isFirebaseConnected = true;
      console.log(`[Firebase] Initialized with projectId: ${projectId}`);
    } catch (err) {
      console.warn(`[Firebase] Cloud connection fallback: local mode enabled (${err.message})`);
    }
  }
} catch (error) {
  console.warn(`[Firebase] Notice: ${error.message}. Running in local storage fallback mode.`);
}

export { admin, db, isFirebaseConnected, projectId };
