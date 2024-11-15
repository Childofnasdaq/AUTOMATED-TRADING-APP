require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Load environment variables
const API_TOKEN = process.env.DERIV_API_TOKEN;
const APP_ID = process.env.DERIV_APP_ID;
const BASE_URL = `https://api.deriv.com`;

// Endpoint to open a trade on MetaTrader5
app.post('/mt5-trade', async (req, res) => {
    const { symbol, volume, action } = req.body; // action can be "buy" or "sell"
    
    const tradeData = {
        symbol: symbol || 'R_100', // Example symbol, adjust as needed
        volume: volume || 0.1,     // Volume size for the trade
        action: action || 'buy',   // Buy or sell
        app_id: APP_ID
    };

    try {
        // Make a request to Deriv API to open a trade
        const response = await axios.post(
            `${BASE_URL}/trade`,
            tradeData,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Respond to client with the result
        res.json({
            message: 'Trade executed successfully on MetaTrader5',
            data: response.data
        });
    } catch (error) {
        res.status(400).json({
            error: 'Failed to execute trade on MetaTrader5',
            details: error.response ? error.response.data : error.message
        });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
