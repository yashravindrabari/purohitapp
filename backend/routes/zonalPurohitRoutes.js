import express from 'express';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { ZonalPurohit, User } from '../models/index.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// GET /api/zonalpurohits
router.get('/', authenticate, authorize('admin', 'zonalpurohit'), async (req, res) => {
  try {
    const { country, search } = req.query;
    const where = {};
    if (country) where.country = country;
    if (search) {
      where[Op.or] = [
        { fullName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }
    const zonalPurohits = await ZonalPurohit.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json({ zonalPurohits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/zonalpurohits (admin creates a zonal purohit user + record)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { fullName, email, password, mobileNumber, ved, language, country, state, city,
      profileImageUrl, aadharImageUrl } = req.body;

    if (!fullName || !email || !password || !mobileNumber) {
      return res.status(400).json({ message: 'Full name, email, password, and mobile number are required' });
    }

    const existing = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existing) return res.status(400).json({ message: 'User with this email already exists' });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: fullName,
      email: email.toLowerCase(),
      password: hashed,
      mobile: mobileNumber,
      city: city || '',
      role: 'zonalpurohit',
      profileImageUrl: profileImageUrl || '',
    });

    const zonalPurohit = await ZonalPurohit.create({
      userId: user.id,
      fullName,
      email: email.toLowerCase(),
      mobileNumber,
      ved: ved || '',
      language: language || '',
      country: country || '',
      state: state || '',
      city: city || '',
      profileImageUrl: profileImageUrl || '',
      aadharImageUrl: aadharImageUrl || '',
      status: 'Active',
    });

    res.status(201).json({ message: 'Zonal Purohit created successfully', zonalPurohit });
  } catch (error) {
    console.error('Create zonal purohit error:', error);
    res.status(500).json({ message: error.message || 'Error creating Zonal Purohit' });
  }
});

// PUT /api/zonalpurohits/:id
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { fullName, email, mobileNumber, ved, language, country, state, city, status } = req.body;
    const updates = {};
    if (fullName !== undefined) updates.fullName = fullName;
    if (email !== undefined) updates.email = email;
    if (mobileNumber !== undefined) updates.mobileNumber = mobileNumber;
    if (ved !== undefined) updates.ved = ved;
    if (language !== undefined) updates.language = language;
    if (country !== undefined) updates.country = country;
    if (state !== undefined) updates.state = state;
    if (city !== undefined) updates.city = city;
    if (status !== undefined) updates.status = status;

    const [updated] = await ZonalPurohit.update(updates, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Zonal purohit not found' });

    const zonalPurohit = await ZonalPurohit.findByPk(req.params.id);

    // Keep the linked auth user in sync
    if (zonalPurohit.userId) {
      const userUpdates = {};
      if (fullName) userUpdates.name = fullName;
      if (email) userUpdates.email = email.toLowerCase();
      if (mobileNumber) userUpdates.mobile = mobileNumber;
      if (city) userUpdates.city = city;
      if (Object.keys(userUpdates).length > 0) {
        await User.update(userUpdates, { where: { id: zonalPurohit.userId } });
      }
    }

    res.json({ message: 'Zonal purohit updated', zonalPurohit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/zonalpurohits/:id
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const zonalPurohit = await ZonalPurohit.findByPk(req.params.id);
    if (!zonalPurohit) return res.status(404).json({ message: 'Zonal purohit not found' });

    await ZonalPurohit.destroy({ where: { id: req.params.id } });
    if (zonalPurohit.userId) {
      await User.destroy({ where: { id: zonalPurohit.userId } });
    }
    res.json({ message: 'Zonal purohit deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
