require('dotenv').config();

const FRONTEND_URL = process.env.NODE_ENV === 'production' ? 'https://freegaza.vercel.app' : 'http://localhost:5173';

module.exports = {
  FRONTEND_URL,
  // Add other global constants here as needed
}; 