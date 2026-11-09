import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, projectId } from './firebaseConfig.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seed() {
  if (!db) {
    console.error('Firebase Firestore instance is not initialized. Please ensure FIREBASE_PROJECT_ID or service account is configured.');
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8'));
  const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'categories.json'), 'utf8'));

  console.log(`Starting Firestore seed for project "${projectId}"...`);
  console.log(`Found ${products.length} products and ${categories.length} categories.`);

  // Seed Categories
  console.log('Seeding categories...');
  const catBatch = db.batch();
  categories.forEach(cat => {
    const ref = db.collection('categories').doc(cat.handle);
    catBatch.set(ref, cat, { merge: true });
  });
  await catBatch.commit();
  console.log(`Seeded ${categories.length} categories.`);

  // Seed Products in batches of 100
  const BATCH_SIZE = 100;
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const slice = products.slice(i, i + BATCH_SIZE);
    slice.forEach(prod => {
      const ref = db.collection('products').doc(prod.handle);
      batch.set(ref, prod, { merge: true });
    });
    await batch.commit();
    console.log(`Seeded batch ${i + 1} to ${Math.min(i + BATCH_SIZE, products.length)} of ${products.length} products.`);
  }

  console.log('Firestore seed completed successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Error during seed:', err);
  process.exit(1);
});
