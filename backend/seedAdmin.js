require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const ADMIN_EMAIL = 'admin@leaddesk.com';
const ADMIN_PASSWORD = 'AdminPassword123!';

async function seedAdmin() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('Missing MONGO_URI in environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log('Admin user already exists — skipping seed');
      await mongoose.disconnect();
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await User.create({ email: ADMIN_EMAIL, password: hashedPassword });

    console.log('Admin user created successfully');
    console.log(`  Email:    ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin();
