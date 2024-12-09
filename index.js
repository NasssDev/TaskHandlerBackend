const express = require("express");
const app = express();
const sequelize = require('./config/database');
require('./models/associations');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const donorBeneficiaryRoutes = require('./routes/donorBeneficiaryRoutes');


app.use(express.json());


app.use(cors({
  origin: ['https://freegaza.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.options('*', cors());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', require('./middleware/auth').protect, taskRoutes);
app.use('/api/donor-beneficiary', donorBeneficiaryRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
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
