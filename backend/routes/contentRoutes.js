import express from 'express';
import { Op } from 'sequelize';
import {
  Puja, Aarti, StotraMantra, UpcomingFestival,
  Review, QuizQuestion, GiftCard, Rashifal,
  User, Product, Order, Purohit, Booking,
} from '../models/index.js';
import { authenticate, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// ==================== PUJA ROUTES ====================
router.get('/pujas', async (req, res) => {
  try {
    const pujas = await Puja.findAll({ where: { status: 'Active' }, order: [['createdAt', 'DESC']] });
    res.json({ pujas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/pujas/all', authenticate, authorize('admin'), async (req, res) => {
  try {
    const pujas = await Puja.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ pujas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/pujas', authenticate, authorize('admin'), async (req, res) => {
  try {
    const puja = await Puja.create(req.body);
    res.status(201).json({ message: 'Puja added', puja });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/pujas/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const [rows] = await Puja.update(req.body, { where: { id: req.params.id } });
    if (!rows) return res.status(404).json({ message: 'Puja not found' });
    const puja = await Puja.findByPk(req.params.id);
    res.json({ message: 'Puja updated', puja });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/pujas/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await Puja.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Puja deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== AARTI ROUTES ====================
router.get('/aartis', async (req, res) => {
  try {
    const aartis = await Aarti.findAll({ where: { status: 'Active' }, order: [['name', 'ASC']] });
    res.json({ aartis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/aartis', authenticate, authorize('admin'), upload.single('pdfFile'), async (req, res) => {
  try {
    const pdfUrl = req.file ? `/uploads/${req.file.filename}` : (req.body.pdfUrl || '');
    const aarti = await Aarti.create({ name: req.body.name, pdfUrl, status: 'Active' });
    res.status(201).json({ message: 'Aarti added', aarti });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/aartis/:id', authenticate, authorize('admin'), upload.single('pdfFile'), async (req, res) => {
  try {
    const updateData = { name: req.body.name };
    if (req.file) updateData.pdfUrl = `/uploads/${req.file.filename}`;
    const [rows] = await Aarti.update(updateData, { where: { id: req.params.id } });
    if (!rows) return res.status(404).json({ message: 'Aarti not found' });
    const aarti = await Aarti.findByPk(req.params.id);
    res.json({ message: 'Aarti updated', aarti });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/aartis/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await Aarti.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Aarti deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== STOTRA MANTRA ROUTES ====================
router.get('/stotras', async (req, res) => {
  try {
    const stotras = await StotraMantra.findAll({ where: { status: 'Active' }, order: [['name', 'ASC']] });
    res.json({ stotras });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/stotras', authenticate, authorize('admin'), upload.single('pdfFile'), async (req, res) => {
  try {
    const pdfUrl = req.file ? `/uploads/${req.file.filename}` : (req.body.pdfUrl || '');
    const stotra = await StotraMantra.create({
      name: req.body.name,
      content: req.body.content || '',
      category: req.body.category || '',
      mp3Link: req.body.mp3Link || '',
      pdfUrl,
    });
    res.status(201).json({ message: 'Stotra added', stotra });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/stotras/:id', authenticate, authorize('admin'), upload.single('pdfFile'), async (req, res) => {
  try {
    const updateData = { name: req.body.name, content: req.body.content, category: req.body.category, mp3Link: req.body.mp3Link };
    if (req.file) updateData.pdfUrl = `/uploads/${req.file.filename}`;
    const [rows] = await StotraMantra.update(updateData, { where: { id: req.params.id } });
    if (!rows) return res.status(404).json({ message: 'Stotra not found' });
    const stotra = await StotraMantra.findByPk(req.params.id);
    res.json({ message: 'Stotra updated', stotra });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/stotras/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await StotraMantra.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Stotra deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== UPCOMING FESTIVALS ROUTES ====================
router.get('/festivals', async (req, res) => {
  try {
    const festivals = await UpcomingFestival.findAll({ where: { status: 'Active' }, order: [['date', 'ASC']] });
    res.json({ festivals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/festivals', authenticate, authorize('admin'), async (req, res) => {
  try {
    const festival = await UpcomingFestival.create(req.body);
    res.status(201).json({ message: 'Festival added', festival });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/festivals/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const [rows] = await UpcomingFestival.update(req.body, { where: { id: req.params.id } });
    if (!rows) return res.status(404).json({ message: 'Festival not found' });
    const festival = await UpcomingFestival.findByPk(req.params.id);
    res.json({ message: 'Festival updated', festival });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/festivals/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await UpcomingFestival.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Festival deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== REVIEW ROUTES ====================
router.get('/reviews', async (req, res) => {
  try {
    const { purohitId } = req.query;
    const where = { status: 'Active' };
    if (purohitId) where.purohitId = purohitId;
    const reviews = await Review.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/reviews', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ message: 'Review added', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/reviews/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await Review.update({ status: 'Hidden' }, { where: { id: req.params.id } });
    res.json({ message: 'Review hidden' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== QUIZ ROUTES ====================
router.get('/quiz', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const where = {};
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;
    const questions = await QuizQuestion.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/quiz', authenticate, authorize('admin'), async (req, res) => {
  try {
    const question = await QuizQuestion.create(req.body);
    res.status(201).json({ message: 'Question added', question });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/quiz/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await QuizQuestion.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== GIFT CARD ROUTES ====================
router.get('/giftcards', authenticate, authorize('admin'), async (req, res) => {
  try {
    const giftCards = await GiftCard.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ giftCards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/giftcards', authenticate, authorize('admin'), async (req, res) => {
  try {
    const giftCard = await GiftCard.create(req.body);
    res.status(201).json({ message: 'Gift card created', giftCard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== RASHIFAL (DAILY HOROSCOPE) ROUTES ====================
router.get('/rashifal', async (req, res) => {
  try {
    const { rashi, date, category } = req.query;
    const where = {};
    if (rashi) where.rashi = rashi;
    if (date) where.date = date;
    if (category) where.category = category;
    const predictions = await Rashifal.findAll({ where, order: [['date', 'DESC']] });
    res.json({ predictions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/rashifal', authenticate, authorize('admin'), async (req, res) => {
  try {
    const prediction = await Rashifal.create(req.body);
    res.status(201).json({ message: 'Rashifal added', prediction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/rashifal/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const [rows] = await Rashifal.update(req.body, { where: { id: req.params.id } });
    if (!rows) return res.status(404).json({ message: 'Rashifal not found' });
    const prediction = await Rashifal.findByPk(req.params.id);
    res.json({ message: 'Rashifal updated', prediction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== FILE UPLOAD ROUTE ====================
router.post('/upload', authenticate, upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl, filename: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== DASHBOARD STATS ====================
router.get('/dashboard/stats', authenticate, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();
    const totalPurohits = await Purohit.count();
    const totalBookings = await Booking.count();
    const pendingPurohits = await Purohit.count({ where: { status: 'pending' } });

    res.json({
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalPurohits,
        totalBookings,
        pendingPurohits,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
