const axios = require('axios');

// API credentials (could also be stored in .env for security)
const apiToken = 'KThvGHHK8cAwXjT';  // Your API token
const appId = '65361';  // Your App ID

module.exports = async (req, res) => {
  // Only handle POST requests
  if (req.method === 'POST') {
    const { symbol, volume, action } = req.body; // Get trade details from the request body

    try {
      // Make a POST request to the Deriv API to open a trade
      const response = await axios.post('https://api.deriv.com/api/v1/mt5-trade', {
        symbol: symbol,
        volume: volume,
        action: action,
        api_token: apiToken,  // Pass API token
        app_id: appId         // Pass App ID
      });

      // Respond with the trade result
      res.status(200).json({
        message: 'Trade opened successfully',
        data: response.data
      });
    } catch (error) {
      // Handle any errors
      res.status(500).json({
        message: 'Error opening trade',
        error: error.message
      });
    }
  } else {
    // Method not allowed (only POST is supported)
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
