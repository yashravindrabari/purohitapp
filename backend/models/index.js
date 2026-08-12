import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// ==================== USER ====================
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: true },
  mobile: { type: DataTypes.STRING, defaultValue: '' },
  address: { type: DataTypes.STRING, defaultValue: '' },
  city: { type: DataTypes.STRING, defaultValue: '' },
  role: { type: DataTypes.ENUM('Yajman', 'purohit', 'admin', 'zonalpurohit'), defaultValue: 'Yajman' },
  fcmToken: { type: DataTypes.STRING, defaultValue: '' },
  firstLogin: { type: DataTypes.BOOLEAN, defaultValue: true },
  googleId: { type: DataTypes.STRING, allowNull: true },
  profileImageUrl: { type: DataTypes.STRING, defaultValue: '' },
}, {
  tableName: 'users',
});

// ==================== PRODUCT ====================
const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  productImageUrl: { type: DataTypes.STRING, defaultValue: '' },
  category: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, defaultValue: '' },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
}, {
  tableName: 'products',
});

// ==================== ORDER & ORDER ITEM ====================
const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.STRING, defaultValue: '' },
  title: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  productImageUrl: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
}, {
  tableName: 'order_items',
});

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER, references: { model: 'users', key: 'id' } },
  status: {
    type: DataTypes.ENUM('confirmed', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'confirmed',
  },
  // Address info flattened
  addressName: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  pincode: { type: DataTypes.STRING },
  mobileNumber: { type: DataTypes.STRING },
}, {
  tableName: 'orders',
});

// ==================== PUROHIT ====================
const Purohit = sequelize.define('Purohit', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, references: { model: 'users', key: 'id' } },
  profileImageUrl: { type: DataTypes.STRING, defaultValue: '' },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  mobileNumber: { type: DataTypes.STRING, allowNull: false },
  aboutYou: { type: DataTypes.TEXT, defaultValue: '' },
  country: { type: DataTypes.STRING, defaultValue: '' },
  state: { type: DataTypes.STRING, defaultValue: '' },
  city: { type: DataTypes.STRING, defaultValue: '' },
  yearsOfExperience: { type: DataTypes.INTEGER, defaultValue: 0 },
  panditLanguages: { type: DataTypes.STRING, defaultValue: '' },
  ved: { type: DataTypes.STRING, defaultValue: '' },
  panditQualification: { type: DataTypes.STRING, defaultValue: '' },
  aadharCardUrl: { type: DataTypes.STRING, defaultValue: '' },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
  role: { type: DataTypes.STRING, defaultValue: 'purohit' },
  averageRating: { type: DataTypes.FLOAT, defaultValue: 0 },
}, {
  tableName: 'purohits',
});

// ==================== PUJA ====================
const Puja = sequelize.define('Puja', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pujaName: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, defaultValue: '' },
  imageUrl: { type: DataTypes.STRING, defaultValue: '' },
  type: { type: DataTypes.ENUM('physical', 'online'), defaultValue: 'physical' },
  rate: { type: DataTypes.FLOAT, defaultValue: 0 },
  withSamagriRate: { type: DataTypes.FLOAT, defaultValue: 0 },
  withoutSamagriRate: { type: DataTypes.FLOAT, defaultValue: 0 },
  status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' },
}, {
  tableName: 'pujas',
});

// ==================== BOOKING ====================
const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pujaId: { type: DataTypes.INTEGER, references: { model: 'pujas', key: 'id' } },
  purohitId: { type: DataTypes.INTEGER, references: { model: 'purohits', key: 'id' } },
  pujaName: { type: DataTypes.STRING, allowNull: false },
  pujaType: { type: DataTypes.STRING, defaultValue: '' },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  userName: { type: DataTypes.STRING, allowNull: false },
  userEmail: { type: DataTypes.STRING, allowNull: false },
  userPhone: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, defaultValue: '' },
  address: { type: DataTypes.STRING, defaultValue: '' },
  preferredDate: { type: DataTypes.DATEONLY },
  preferredTime: { type: DataTypes.STRING, defaultValue: '' },
  bookingDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled'), defaultValue: 'Confirmed' },
  paymentStatus: { type: DataTypes.ENUM('Pending', 'Completed', 'Failed', 'Refunded'), defaultValue: 'Completed' },
  razorpayPaymentId: { type: DataTypes.STRING, defaultValue: '' },
  razorpayOrderId: { type: DataTypes.STRING, defaultValue: '' },
  razorpaySignature: { type: DataTypes.STRING, defaultValue: '' },
}, {
  tableName: 'bookings',
});

// ==================== AARTI ====================
const Aarti = sequelize.define('Aarti', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  pdfUrl: { type: DataTypes.STRING, defaultValue: '' },
  status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' },
}, {
  tableName: 'aartis',
});

// ==================== STOTRA MANTRA ====================
const StotraMantra = sequelize.define('StotraMantra', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, defaultValue: '' },
  pdfUrl: { type: DataTypes.STRING, defaultValue: '' },
  mp3Link: { type: DataTypes.STRING, defaultValue: '' },
  category: { type: DataTypes.STRING, defaultValue: '' },
  status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' },
}, {
  tableName: 'stotra_mantras',
});

// ==================== UPCOMING FESTIVAL ====================
const UpcomingFestival = sequelize.define('UpcomingFestival', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  description: { type: DataTypes.TEXT, defaultValue: '' },
  imageUrl: { type: DataTypes.STRING, defaultValue: '' },
  pdfUrl: { type: DataTypes.STRING, defaultValue: '' },
  status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' },
}, {
  tableName: 'upcoming_festivals',
});

// ==================== REVIEW ====================
const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: { type: DataTypes.STRING, allowNull: false },
  userEmail: { type: DataTypes.STRING },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  comment: { type: DataTypes.TEXT, defaultValue: '' },
  purohitId: { type: DataTypes.INTEGER, references: { model: 'purohits', key: 'id' } },
  status: { type: DataTypes.ENUM('Active', 'Hidden'), defaultValue: 'Active' },
}, {
  tableName: 'reviews',
});

// ==================== QUIZ QUESTION ====================
const QuizQuestion = sequelize.define('QuizQuestion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question: { type: DataTypes.TEXT, allowNull: false },
  options: { type: DataTypes.JSON, defaultValue: [] },
  correctAnswer: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, defaultValue: '' },
  difficulty: { type: DataTypes.ENUM('easy', 'medium', 'hard'), defaultValue: 'easy' },
}, {
  tableName: 'quiz_questions',
});

// ==================== GIFT CARD ====================
const GiftCard = sequelize.define('GiftCard', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.STRING, defaultValue: '' },
  expiryDate: { type: DataTypes.DATEONLY },
  isUsed: { type: DataTypes.BOOLEAN, defaultValue: false },
  usedById: { type: DataTypes.INTEGER, references: { model: 'users', key: 'id' } },
  status: { type: DataTypes.ENUM('Active', 'Expired', 'Used'), defaultValue: 'Active' },
}, {
  tableName: 'gift_cards',
});

// ==================== RASHIFAL (DAILY HOROSCOPE) ====================
const Rashifal = sequelize.define('Rashifal', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rashi: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  prediction: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.ENUM('daily', 'weekly', 'monthly'), defaultValue: 'daily' },
}, {
  tableName: 'rashifals',
  indexes: [{ unique: true, fields: ['rashi', 'date', 'category'] }],
});

// ==================== ZONAL PUROHIT ====================
const ZonalPurohit = sequelize.define('ZonalPurohit', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, references: { model: 'users', key: 'id' } },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  mobileNumber: { type: DataTypes.STRING, defaultValue: '' },
  ved: { type: DataTypes.STRING, defaultValue: '' },
  language: { type: DataTypes.STRING, defaultValue: '' },
  country: { type: DataTypes.STRING, defaultValue: '' },
  state: { type: DataTypes.STRING, defaultValue: '' },
  city: { type: DataTypes.STRING, defaultValue: '' },
  profileImageUrl: { type: DataTypes.STRING, defaultValue: '' },
  aadharImageUrl: { type: DataTypes.STRING, defaultValue: '' },
  status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' },
}, {
  tableName: 'zonal_purohits',
});

// ==================== ASSOCIATIONS ====================
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

User.hasOne(Purohit, { foreignKey: 'userId' });
Purohit.belongsTo(User, { foreignKey: 'userId' });

Purohit.hasMany(Booking, { foreignKey: 'purohitId' });
Booking.belongsTo(Purohit, { foreignKey: 'purohitId' });

Puja.hasMany(Booking, { foreignKey: 'pujaId' });
Booking.belongsTo(Puja, { foreignKey: 'pujaId' });

Purohit.hasMany(Review, { foreignKey: 'purohitId' });
Review.belongsTo(Purohit, { foreignKey: 'purohitId' });

User.hasOne(ZonalPurohit, { foreignKey: 'userId' });
ZonalPurohit.belongsTo(User, { foreignKey: 'userId' });

// ==================== EXPORTS ====================
export {
  User,
  Product,
  Order,
  OrderItem,
  Purohit,
  Puja,
  Booking,
  Aarti,
  StotraMantra,
  UpcomingFestival,
  Review,
  QuizQuestion,
  GiftCard,
  Rashifal,
  ZonalPurohit,
};
