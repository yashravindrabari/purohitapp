import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { User } from './models/index.js';

dotenv.config();

// Creates the default admin account if no admin exists yet.
// Safe to call on every boot; returns silently when an admin already exists.
export const seedAdminIfMissing = async () => {
  try {
    const existingAdmin = await User.findOne({ where: { role: 'admin' } });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      return existingAdmin;
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
    return admin;
  } catch (error) {
    console.error('Seed error:', error.message);
    throw error;
  }
};

// CLI mode: `npm run seed` — connect, seed, then exit
const isDirectRun = process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  try {
    await connectDB();
    await seedAdminIfMissing();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
}
