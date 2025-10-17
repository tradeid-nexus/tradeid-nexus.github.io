const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./stocks.db');

app.get('/api/search', (req, res) => {
  const { query, exchange } = req.query;
  let sql = `SELECT * FROM stocks WHERE ticker = ? OR isin = ? OR cusip = ? OR sedol = ?`;
  const params = [query, query, query, query];
  if (exchange) {
    sql += ` AND stock_exchange = ?`;
    params.push(exchange);
  }
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(row => ({
      company_name: row.company_name,
      ticker: row.ticker,
      country: row.country,
      stock_exchange: row.stock_exchange,
      isin: row.isin || 'N/A',
      cusip: row.cusip || 'N/A',
      lei: row.lei || 'N/A',
      sedol: row.sedol || 'N/A',
      cfi: row.cfi || 'N/A',
      fisn: row.fisn || 'N/A'
    })));
  });
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));