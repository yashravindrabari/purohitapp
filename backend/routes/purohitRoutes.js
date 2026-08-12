import express from 'express';
import { Op } from 'sequelize';
import { Purohit, User } from '../models/index.js';
import { authenticate, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// GET /api/purohits
router.get('/', async (req, res) => {
  try {
    const { status, city, search } = req.query;
    const where = {};
    if (status) where.status = status;
    if (city) where.city = city;
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { city: { [Op.like]: `%${search}%` } },
      ];
    }
    const purohits = await Purohit.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json({ purohits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/purohits/:id
router.get('/:id', async (req, res) => {
  try {
    const purohit = await Purohit.findByPk(req.params.id);
    if (!purohit) return res.status(404).json({ message: 'Purohit not found' });
    res.json({ purohit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/purohits/user/:userId
router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    const purohit = await Purohit.findOne({ where: { userId: req.params.userId } });
    if (!purohit) return res.status(404).json({ message: 'Purohit profile not found' });
    res.json({ purohit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/purohits/:id
router.put('/:id', authenticate, authorize('admin', 'purohit'), async (req, res) => {
  try {
    const [updated] = await Purohit.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Purohit not found' });
    const purohit = await Purohit.findByPk(req.params.id);
    res.json({ message: 'Purohit updated', purohit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/purohits/:id/status
router.put('/:id/status', authenticate, authorize('admin', 'zonalpurohit'), async (req, res) => {
  try {
    const { status } = req.body;
    const [updated] = await Purohit.update({ status }, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Purohit not found' });

    const purohit = await Purohit.findByPk(req.params.id);
    if (status === 'approved' && purohit.userId) {
      await User.update({ role: 'purohit' }, { where: { id: purohit.userId } });
    }
    res.json({ message: `Purohit ${status}`, purohit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/purohits/upload
// Public: purohit registration uploads files before the user has a token
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/purohits/:id
router.delete('/:id', authenticate, authorize('admin', 'zonalpurohit'), async (req, res) => {
  try {
    const purohit = await Purohit.findByPk(req.params.id);
    if (!purohit) return res.status(404).json({ message: 'Purohit not found' });

    await Purohit.destroy({ where: { id: req.params.id } });
    if (purohit.userId) {
      await User.destroy({ where: { id: purohit.userId } });
    }
    res.json({ message: 'Purohit deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
