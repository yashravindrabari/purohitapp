import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import { User } from './models/index.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { role: 'admin' } });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      process.exit(0);
    }

    // Create default admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@purohitapp.com',
      password: hashedPassword,
      mobile: '9999999999',
      address: 'Admin Office',
      city: 'Mumbai',
      role: 'admin',
      firstLogin: false,
    });

    console.log('Admin user created successfully!');
    console.log('  Email: admin@purohitapp.com');
    console.log('  Password: admin123');
    console.log('  ID:', admin.id);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
