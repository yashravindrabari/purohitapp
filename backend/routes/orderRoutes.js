import express from 'express';
import { Order, OrderItem } from '../models/index.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// GET /api/orders
router.get('/', authenticate, async (req, res) => {
  try {
    const where = {};
    if (req.user.role !== 'admin') where.userId = req.user.id;
    if (req.query.userid) where.userId = req.query.userid;

    const orders = await Order.findAll({
      where,
      include: [{ model: OrderItem, as: 'items' }],
      order: [['createdAt', 'DESC']],
    });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: 'items' }],
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (req.user.role !== 'admin' && order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/orders
router.post('/', authenticate, async (req, res) => {
  try {
    const { cartItems, addressInfo } = req.body;
    if (!cartItems || cartItems.length === 0) return res.status(400).json({ message: 'Cart is empty' });
    if (!addressInfo) return res.status(400).json({ message: 'Address info is required' });

    const order = await Order.create({
      email: req.user.email,
      userId: req.user.id,
      status: 'confirmed',
      addressName: addressInfo.name,
      address: addressInfo.address,
      pincode: addressInfo.pincode,
      mobileNumber: addressInfo.mobileNumber,
    });

    // Create order items
    const items = cartItems.map(item => ({
      orderId: order.id,
      productId: item.id || '',
      title: item.title,
      price: item.price,
      productImageUrl: item.productImageUrl || '',
      category: item.category || '',
      quantity: item.quantity || 1,
    }));
    await OrderItem.bulkCreate(items);

    const fullOrder = await Order.findByPk(order.id, { include: [{ model: OrderItem, as: 'items' }] });
    res.status(201).json({ message: 'Order placed successfully', order: fullOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/orders/:id/status
router.put('/:id/status', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const [updated] = await Order.update({ status }, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    const order = await Order.findByPk(req.params.id);
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/orders/:id
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await OrderItem.destroy({ where: { orderId: req.params.id } });
    const deleted = await Order.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
