// backend/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./stock_data.db');

const stocks = [
    { name: 'Apple Inc.', ticker: 'AAPL' },
    { name: 'Microsoft Corporation', ticker: 'MSFT' },
    { name: 'Google (Alphabet Inc.)', ticker: 'GOOGL' },
    { name: 'Amazon.com, Inc.', ticker: 'AMZN' },
    { name: 'Tesla, Inc.', ticker: 'TSLA' },
    { name: 'NVIDIA Corporation', ticker: 'NVDA' },
    { name: 'Meta Platforms, Inc.', ticker: 'META' },
    { name: 'Reliance Industries', ticker: 'RELIANCE.NS' },
    { name: 'Tata Consultancy Services', ticker: 'TCS.NS' },
    { name: 'HDFC Bank', ticker: 'HDFCBANK.NS' }
];

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ticker TEXT NOT NULL UNIQUE
    )`);

    const stmt = db.prepare("INSERT OR IGNORE INTO companies (name, ticker) VALUES (?, ?)");
    stocks.forEach(stock => {
        stmt.run(stock.name, stock.ticker);
    });
    stmt.finalize();

    console.log('Database seeded successfully!');
});

db.close();