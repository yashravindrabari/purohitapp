import express from 'express';
import { Booking, Purohit } from '../models/index.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// GET /api/bookings
router.get('/', authenticate, async (req, res) => {
  try {
    const where = {};
    if (req.user.role === 'purohit') {
      const profile = await Purohit.findOne({ where: { userId: req.user.id } });
      where.purohitId = profile ? profile.id : -1;
    } else if (req.user.role !== 'admin') where.userEmail = req.user.email;
    if (req.query.purohitId) where.purohitId = req.query.purohitId;
    if (req.query.status) where.status = req.query.status;

    const bookings = await Booking.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/bookings/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const { pujaId, purohitId, pujaName, pujaType, amount, userName, userEmail, userPhone,
      city, address, preferredDate, preferredTime, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    if (!pujaName || !userName || !userEmail || !userPhone) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const booking = await Booking.create({
      pujaId, purohitId, pujaName, pujaType, amount: amount || 0,
      userName, userEmail, userPhone, city: city || '', address: address || '',
      preferredDate: preferredDate || null, preferredTime: preferredTime || '',
      status: 'Confirmed',
      paymentStatus: razorpayPaymentId ? 'Completed' : 'Pending',
      razorpayPaymentId: razorpayPaymentId || '',
      razorpayOrderId: razorpayOrderId || '',
      razorpaySignature: razorpaySignature || '',
    });

    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/bookings/:id/status
router.put('/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const [updated] = await Booking.update({ status }, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Booking not found' });
    const booking = await Booking.findByPk(req.params.id);
    res.json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/bookings/:id/assign
router.put('/:id/assign', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { purohitId, purohitName, purohitEmail, purohitMobile, purohitCity, purohitExperience } = req.body;
    const [updated] = await Booking.update({
      purohitId,
      purohitName: purohitName || '',
      purohitEmail: purohitEmail || '',
      purohitMobile: purohitMobile || '',
      purohitCity: purohitCity || '',
      purohitExperience: purohitExperience || 0,
      assignedAt: new Date(),
      status: 'Confirmed',
    }, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Booking not found' });
    const booking = await Booking.findByPk(req.params.id);
    res.json({ message: 'Purohit assigned', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/bookings/:id
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const deleted = await Booking.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
