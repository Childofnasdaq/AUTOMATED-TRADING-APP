# MT5 Deriv Trading App

A simple Node.js app to open trades on MetaTrader5 via Deriv’s API.

### Endpoints
- **POST /api/mt5-trade**: Opens a trade on MetaTrader5.

### Example Request Body:
```json
{
  "symbol": "R_100",
  "volume": 0.1,
  "action": "buy"
}
