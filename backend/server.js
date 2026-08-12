import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { seedAdminIfMissing } from './seedAdmin.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import purohitRoutes from './routes/purohitRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import zonalPurohitRoutes from './routes/zonalPurohitRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MySQL, then ensure the default admin account exists
connectDB()
  .then(seedAdminIfMissing)
  .catch((err) => console.error('Startup DB/seed error:', err.message));

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==================== API ROUTES ====================
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/purohits', purohitRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/zonalpurohits', zonalPurohitRoutes);

// ==================== HEALTH CHECK ====================
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PurohitApp API is running', timestamp: new Date().toISOString() });
});

// ==================== 404 HANDLER ====================
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ==================== GLOBAL ERROR HANDLER ====================
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n  Server running on http://localhost:${PORT}`);
  console.log(`  API Health: http://localhost:${PORT}/api/health\n`);
});

export default app;
