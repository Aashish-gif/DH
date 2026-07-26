require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const leadsRouter = require('./routes/leads');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware — CORS open so any frontend URL can connect
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/leads', leadsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'LeadDesk API is running' });
});

async function start() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('Missing MONGO_URI in environment variables');
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error('Missing JWT_SECRET in environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`LeadDesk API listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
