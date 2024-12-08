require('dotenv').config();
const express = require("express");
const app = express();
const sequelize = require('./config/database');
require('./models/associations');
const donorRoutes = require('./routes/donorRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');
const cors = require('cors');

app.use(express.json());

// CORS for local development
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donors', require('./middleware/auth').protect, donorRoutes);
app.use('/api/beneficiaries', require('./middleware/auth').protect, beneficiaryRoutes);
app.use('/api/donations', require('./middleware/auth').protect, donationRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;

// Sync database and start server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
