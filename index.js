// Import necessary libraries
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// Initialize dotenv to use environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the MT5 Deriv Trading App. Use /api/mt5-trade to open trades.');
});

// POST route to open a trade on MetaTrader5 via Deriv API
app.post('/api/mt5-trade', async (req, res) => {
  const { symbol, volume, action } = req.body;

  // Validate incoming data
  if (!symbol || !volume || !action) {
    return res.status(400).send("Missing required fields: symbol, volume, or action.");
  }

  if (!['buy', 'sell'].includes(action)) {
    return res.status(400).send("Invalid action. Action must be 'buy' or 'sell'.");
  }

  try {
    // Send trade request to Deriv API (change URL if necessary)
    const response = await axios.post(
      'https://api.deriv.com/api/v1/mt5_trade', // Ensure this is the correct Deriv API endpoint
      {
        symbol: symbol,
        volume: volume,
        action: action,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DERIV_API_TOKEN}`
        }
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error opening trade with Deriv API.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
