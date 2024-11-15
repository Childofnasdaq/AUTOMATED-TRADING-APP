# MT5 Deriv Trading App

A simple Node.js app to open trades on a MetaTrader5 account via Deriv's API.

## Endpoints

- **POST** `/mt5-trade`: Opens a trade on MetaTrader5.

### Example Request

```json
{
    "symbol": "R_100",
    "volume": 0.1,
    "action": "buy"
}
