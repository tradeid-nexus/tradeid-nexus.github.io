import { useState } from 'react';
import axios from 'axios';

interface Stock {
  company_name: string;
  ticker: string;
  country: string;
  stock_exchange: string;
  isin: string;
  cusip: string;
  lei: string;
  sedol: string;
  cfi: string;
  fisn: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [exchange, setExchange] = useState('');
  const [stocks, setStocks] = useState<Stock[]>([]);

  const search = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/search`, {
      params: { query, exchange }
    });
    setStocks(response.data);
  };

  const exportToCSV = () => {
    const headers = ['Company', 'Ticker', 'Country', 'Exchange', 'ISIN', 'CUSIP', 'LEI', 'SEDOL', 'CFI', 'FISN'];
    const rows = stocks.map(s => [
      s.company_name, s.ticker, s.country, s.stock_exchange,
      s.isin, s.cusip, s.lei, s.sedol, s.cfi, s.fisn
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stock_identifiers.csv';
    a.click();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>TradeID Nexus</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter Ticker, ISIN, CUSIP, or SEDOL"
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <select value={exchange} onChange={e => setExchange(e.target.value)} style={{ padding: '8px' }}>
        <option value="">All Exchanges</option>
        <option value="Nasdaq">Nasdaq</option>
        <option value="Nasdaq Stockholm">Nasdaq Stockholm</option>
        <option value="Nasdaq Copenhagen">Nasdaq Copenhagen</option>
        <option value="Oslo Børs">Oslo Børs</option>
        <option value="Xetra">Xetra</option>
      </select>
      <button onClick={search} style={{ padding: '8px 16px', marginLeft: '10px' }}>Search</button>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            {['Company', 'Ticker', 'Country', 'Exchange', 'ISIN', 'CUSIP', 'LEI', 'SEDOL', 'CFI', 'FISN'].map(h => (
              <th key={h} style={{ border: '1px solid #ddd', padding: '8px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.isin}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.company_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.ticker}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.country}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.stock_exchange}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.isin}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.cusip}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.lei}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.sedol}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.cfi}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.fisn}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {stocks.length > 0 && (
        <button onClick={exportToCSV} style={{ marginTop: '10px', padding: '8px 16px' }}>
          Export to CSV
        </button>
      )}
    </div>
  );
}