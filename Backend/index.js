// backend/index.js
const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const yahooFinance = require('yahoo-finance2').default;
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes

let db;
(async () => {
    db = await open({
        filename: './stock_data.db',
        driver: sqlite3.Database
    });
})();

// API Endpoint to get the list of companies
app.get('/api/companies', async (req, res) => {
    try {
        const companies = await db.all('SELECT name, ticker FROM companies');
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve companies.' });
    }
});

// API Endpoint to get historical data for a specific stock
app.get('/api/historical/:ticker', async (req, res) => {
    const { ticker } = req.params;
    const queryOptions = {
        period1: '2024-01-01', // Fetch data for the last year or so
        interval: '1d'
    };
    try {
        const result = await yahooFinance.historical(ticker, queryOptions);
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: `Could not find data for ticker: ${ticker}` });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});