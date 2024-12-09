const express = require("express");
const app = express();
const sequelize = require('./config/database');
require('./models/associations');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const donorRoutes = require('./routes/donorRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const donorBeneficiaryRoutes = require('./routes/donorBeneficiaryRoutes');
const { FRONTEND_URL } = require('./config/constants');
const cors = require('cors');


app.use(express.json());


app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
}));

app.options('*', cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', require('./middleware/auth').protect, taskRoutes);
app.use('/api/donors', require('./middleware/auth').protect, donorRoutes);
app.use('/api/beneficiaries', require('./middleware/auth').protect, beneficiaryRoutes);
app.use('/api/donor-beneficiary', donorBeneficiaryRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
