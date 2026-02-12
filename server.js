const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const vitalsRoutes = require('./routes/vitalsRoutes');
app.use('/api/vitals', vitalsRoutes);
const reportsRoutes = require('./routes/reportsRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');

app.use('/api/reports', reportsRoutes);
app.use('/api/emergency', emergencyRoutes);

const ocrRoutes = require('./routes/ocrRoutes');
app.use('/api/ocr', ocrRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Arogyapath Backend is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});