import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { admin, db, isFirebaseConnected, projectId } from './firebaseConfig.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load data files
const productsPath = path.join(__dirname, 'data', 'products.json');
const categoriesPath = path.join(__dirname, 'data', 'categories.json');

let products = [];
let categories = [];

try {
  if (fs.existsSync(productsPath)) {
    products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  }
  if (fs.existsSync(categoriesPath)) {
    categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  }
} catch (e) {
  console.error('[Backend] Error reading local data files:', e);
}

// In-memory fallback stores for orders & inquiries
const memoryOrders = new Map();
const memoryInquiries = [];

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    firebaseProjectId: projectId,
    isFirebaseConnected,
    totalProducts: products.length,
    totalCategories: categories.length,
    timestamp: new Date().toISOString()
  });
});

// Categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// Products with filtering, search, sorting & pagination
app.get('/api/products', (req, res) => {
  const { category, q, minPrice, maxPrice, sort, page = 1, limit = 24 } = req.query;

  let filtered = [...products];

  // Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  // Search keyword filter
  if (q) {
    const term = q.toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(term) ||
      (p.description && p.description.toLowerCase().includes(term)) ||
      p.category.toLowerCase().includes(term) ||
      p.handle.toLowerCase().includes(term)
    );
  }

  // Price filters
  if (minPrice) {
    const min = parseFloat(minPrice);
    if (!isNaN(min)) filtered = filtered.filter(p => p.price >= min);
  }
  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) filtered = filtered.filter(p => p.price <= max);
  }

  // Sorting
  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'title-asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'title-desc') {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  const total = filtered.length;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 24;
  const startIndex = (pageNum - 1) * limitNum;
  const paginated = filtered.slice(startIndex, startIndex + limitNum);

  res.json({
    products: paginated,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum)
  });
});

// Product detail by handle
app.get('/api/products/:handle', (req, res) => {
  const { handle } = req.params;
  const product = products.find(p => p.handle === handle || p.id === handle);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Related products from same category
  const related = products
    .filter(p => p.category === product.category && p.handle !== product.handle)
    .slice(0, 4);

  res.json({ product, related });
});

// Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const { items, customer, shippingAddress, paymentMethod, totalAmount, notes } = req.body;
    
    if (!items || !items.length || !customer || !shippingAddress) {
      return res.status(400).json({ error: 'Missing required order details' });
    }

    const orderId = `IP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const orderData = {
      orderId,
      items,
      customer,
      shippingAddress,
      paymentMethod: paymentMethod || 'cash_on_delivery',
      paymentStatus: 'pending',
      orderStatus: 'confirmed',
      totalAmount: parseFloat(totalAmount) || 0,
      currency: 'AED',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await db.collection('orders').doc(orderId).set(orderData);
        console.log(`[Firestore] Order saved: ${orderId}`);
      } catch (dbErr) {
        console.warn(`[Firestore] Cloud write failed (${dbErr.message}), caching locally.`);
        memoryOrders.set(orderId, orderData);
      }
    } else {
      memoryOrders.set(orderId, orderData);
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: orderData
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Internal server error while processing order' });
  }
});

// Get Order by ID
app.get('/api/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  
  if (db) {
    try {
      const doc = await db.collection('orders').doc(orderId).get();
      if (doc.exists) {
        return res.json(doc.data());
      }
    } catch (e) {
      // fallback
    }
  }

  if (memoryOrders.has(orderId)) {
    return res.json(memoryOrders.get(orderId));
  }

  res.status(404).json({ error: 'Order not found' });
});

// Inquiry Submission (Contact, Wholesale, Customization)
app.post('/api/inquiries', async (req, res) => {
  try {
    const { type, name, email, phone, message, details } = req.body;
    const inquiry = {
      id: `INQ-${Date.now()}`,
      type: type || 'contact',
      name,
      email,
      phone,
      message,
      details: details || {},
      createdAt: new Date().toISOString()
    };

    if (db) {
      try {
        await db.collection('inquiries').add(inquiry);
        console.log(`[Firestore] Inquiry saved: ${inquiry.id}`);
      } catch (e) {
        memoryInquiries.push(inquiry);
      }
    } else {
      memoryInquiries.push(inquiry);
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! Our team will contact you shortly.',
      inquiryId: inquiry.id
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

// Admin: only Firebase users with a verified email listed in ADMIN_EMAILS
const adminEmails = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

async function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer /, '');
  if (!token) return res.status(401).json({ error: 'Sign-in required' });

  try {
    const user = await admin.auth().verifyIdToken(token);
    if (!user.email_verified || !adminEmails.includes((user.email || '').toLowerCase())) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  } catch {
    res.status(401).json({ error: 'Invalid sign-in' });
  }
}

async function readRecent(collection, memory) {
  let stored = [];
  if (db) {
    try {
      const query = db.collection(collection).orderBy('createdAt', 'desc').limit(200).get();
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timed out')), 5000));
      stored = (await Promise.race([query, timeout])).docs.map((doc) => doc.data());
    } catch (err) {
      console.warn(`[Firestore] Could not read ${collection}: ${err.message}`);
    }
  }
  return [...memory, ...stored].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 200);
}

app.get('/api/admin/orders', requireAdmin, async (req, res) => {
  res.json(await readRecent('orders', [...memoryOrders.values()]));
});

app.get('/api/admin/inquiries', requireAdmin, async (req, res) => {
  res.json(await readRecent('inquiries', memoryInquiries));
});

// Seed endpoint
app.post('/api/seed', async (req, res) => {
  if (!db) {
    return res.status(400).json({
      error: 'Firebase Firestore not connected. Ensure Firebase credentials or service account are provided.'
    });
  }

  try {
    const batchSize = 100;
    let count = 0;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = db.batch();
      const chunk = products.slice(i, i + batchSize);
      chunk.forEach(p => {
        const ref = db.collection('products').doc(p.handle);
        batch.set(ref, p, { merge: true });
        count++;
      });
      await batch.commit();
      console.log(`[Firestore Seed] Committed ${count}/${products.length} products`);
    }

    // Seed categories
    const catBatch = db.batch();
    categories.forEach(c => {
      const ref = db.collection('categories').doc(c.handle);
      catBatch.set(ref, c, { merge: true });
    });
    await catBatch.commit();

    res.json({
      success: true,
      message: `Successfully seeded ${count} products and ${categories.length} categories to Firebase Firestore project: ${projectId}`
    });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[Ideal Pack Backend] Server running on http://localhost:${PORT}`);
  console.log(`[Ideal Pack Backend] Loaded ${products.length} products & ${categories.length} categories`);
  console.log(`[Ideal Pack Backend] Firebase target project: ${projectId}`);
});
