const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Use express.json() to parse incoming JSON requests
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the MT5 Deriv Trading App. Use /api/mt5-trade to open trades.');
});

// POST route to handle trade requests
app.post('/api/mt5-trade', async (req, res) => {
  const { symbol, volume, action } = req.body;

  // Validate incoming request
  if (!symbol || !volume || !action) {
    return res.status(400).send("Missing required fields: symbol, volume, or action.");
  }

  if (!['buy', 'sell'].includes(action)) {
    return res.status(400).send("Invalid action. Action must be 'buy' or 'sell'.");
  }

  try {
    // Replace with your actual Deriv API token
    const derivApiToken = 'KThvGHHK8cAwXjT';

    // Send trade request to Deriv API
    const response = await axios.post(
      'https://api.deriv.com/api/v1/mt5_trade', // Replace with correct API URL
      {
        symbol,
        volume,
        action,
      },
      {
        headers: {
          'Authorization': `Bearer ${derivApiToken}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error opening trade with Deriv API.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
