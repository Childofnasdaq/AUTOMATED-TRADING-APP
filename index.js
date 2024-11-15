const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Root Route: Displays a welcome message
app.get('/', (req, res) => {
  res.status(200).send("Welcome to the MT5 Deriv Trading App. Use /api/mt5-trade to open trades.");
});

// Endpoint to open a trade on MetaTrader 5 via Deriv API
app.post('/api/mt5-trade', async (req, res) => {
  const { symbol, volume, action } = req.body;

  // Validate input
  if (!symbol || !volume || !action) {
    return res.status(400).send("Missing required fields: symbol, volume, or action.");
  }

  // Ensure action is either 'buy' or 'sell'
  if (!['buy', 'sell'].includes(action)) {
    return res.status(400).send("Invalid action. Action must be 'buy' or 'sell'.");
  }

  try {
    // Make a request to Deriv API to open a trade
    const response = await axios.post(
      'https://api.deriv.com/api/v1/mt5_trade',  // This is an example URL, replace with the actual endpoint
      {
        symbol: symbol,
        volume: volume,
        action: action,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DERIV_API_TOKEN}` // Add the API token to the request header
        }
      }
    );

    // Send back the response from Deriv API
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error opening trade with Deriv API.");
  }
});

// Set the app to listen on the correct port for Vercel
module.exports = app;
