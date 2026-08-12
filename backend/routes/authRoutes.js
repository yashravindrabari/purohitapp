import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, Purohit } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });
};

// Helper: format user for response
const formatUser = (user) => ({
  id: user.id,
  uid: user.id,
  name: user.name,
  email: user.email,
  mobile: user.mobile,
  address: user.address,
  city: user.city,
  role: user.role,
  firstLogin: user.firstLogin,
  profileImageUrl: user.profileImageUrl,
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, mobile, address, city, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existing = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existing) return res.status(400).json({ message: 'User with this email already exists' });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name, email: email.toLowerCase(), password: hashed,
      mobile: mobile || '', address: address || '', city: city || '', role: role || 'Yajman',
    });

    res.status(201).json({ message: 'Registration successful', token: generateToken(user.id), user: formatUser(user) });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user || !user.password) return res.status(401).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    await user.update({ firstLogin: false });
    res.json({ message: 'Login successful', token: generateToken(user.id), user: formatUser(user) });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
});

// POST /api/auth/google
router.post('/google', async (req, res) => {
  try {
    const { googleId, email, name, profileImageUrl } = req.body;
    if (!googleId || !email) return res.status(400).json({ message: 'Google ID and email are required' });

    let user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      user = await User.create({ name: name || '', email, googleId, profileImageUrl: profileImageUrl || '', role: 'Yajman', firstLogin: true });
    } else {
      await user.update({ googleId, ...(profileImageUrl && { profileImageUrl }), firstLogin: false });
      user = await User.findByPk(user.id);
    }

    res.json({ message: 'Google login successful', token: generateToken(user.id), user: formatUser(user) });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: error.message || 'Google authentication failed' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
  res.json({ user: req.user });
});

// PUT /api/auth/profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, mobile, address, city, fcmToken, profileImageUrl } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (mobile) updates.mobile = mobile;
    if (address) updates.address = address;
    if (city) updates.city = city;
    if (fcmToken !== undefined) updates.fcmToken = fcmToken;
    if (profileImageUrl) updates.profileImageUrl = profileImageUrl;

    await User.update(updates, { where: { id: req.user.id } });
    const user = await User.findByPk(req.user.id);
    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/purohit-register
router.post('/purohit-register', async (req, res) => {
  try {
    const { name, email, password, mobileNumber, aboutYou, country, state, city,
      yearsOfExperience, panditLanguages, ved, panditQualification, profileImageUrl, aadharCardUrl } = req.body;

    if (!name || !email || !password || !mobileNumber) {
      return res.status(400).json({ message: 'Name, email, password, and mobile number are required' });
    }

    const existing = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existing) return res.status(400).json({ message: 'User with this email already exists' });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name, email: email.toLowerCase(), password: hashed,
      mobile: mobileNumber, address: `${city}, ${state}, ${country}`, city, role: 'purohit',
    });

    const purohit = await Purohit.create({
      userId: user.id, name, email, mobileNumber,
      aboutYou: aboutYou || '', country: country || '', state: state || '', city: city || '',
      yearsOfExperience: parseInt(yearsOfExperience) || 0,
      panditLanguages: panditLanguages || '', ved: ved || '',
      panditQualification: panditQualification || '',
      profileImageUrl: profileImageUrl || '', aadharCardUrl: aadharCardUrl || '',
      status: 'pending',
    });

    res.status(201).json({
      message: 'Purohit registration submitted. Awaiting approval.',
      token: generateToken(user.id),
      user: { id: user.id, uid: user.id, name: user.name, email: user.email, role: user.role },
      purohit,
    });
  } catch (error) {
    console.error('Purohit registration error:', error);
    res.status(500).json({ message: error.message || 'Purohit registration failed' });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Password reset link sent to your email (implement email service)' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
