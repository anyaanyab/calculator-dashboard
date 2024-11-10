// Express.js server
// Connects to database, handles CORS, provides API endpoints

// Variables from .env loaded
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./config/db');

// Express app initialization
const app = express();

connectDB();

// Allows requests; HTTP headers and methods specified
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization']
}));

// JSON parsing middleware
app.use(express.json());

// Route definitions
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));

// API key for accessing the currency exchange rates API
// Attention!!! It is missing. Please insert it (for example, from ExchangeRate-API)
const API_KEY = '123456';

// Currency exchange rates endpoint
app.get('/api/exchange-rates', async (req, res) => {
    try {
      // Axios used to fetch latest currency exchange rates
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
      res.json(response.data);
    } catch (error) {
      console.log('API Error:', error.message);
      res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
  });
  
  // Server listens on port 8000
  const PORT = 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

// CORS options redefined
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
  exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOptions));