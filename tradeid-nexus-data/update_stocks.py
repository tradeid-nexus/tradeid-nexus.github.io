import sqlite3

def update_stocks():
    conn = sqlite3.connect('../tradeid-nexus-api/stocks.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS stocks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_name TEXT,
            ticker TEXT,
            country TEXT,
            stock_exchange TEXT,
            isin TEXT,
            cusip TEXT,
            lei TEXT,
            sedol TEXT,
            cfi TEXT,
            fisn TEXT
        )
    ''')
    # Insert static data from artifact
    cursor.executescript('''
        INSERT OR REPLACE INTO stocks (company_name, ticker, country, stock_exchange, isin, cusip, lei, sedol, cfi, fisn)
        VALUES
          ('Telefonaktiebolaget LM Ericsson', 'ERIC', 'Sweden', 'Nasdaq Stockholm', 'SE0000108656', '294821608', '5493000J5CGZR9H9P803', '5959378', 'ESVUFR', 'ERICSSON/COM'),
          ('Novo Nordisk A/S', 'NVO', 'Denmark', 'Nasdaq Copenhagen', 'DK0060534915', '670100401', '549300DAQ1CV8LFXCN05', 'BHC8X90', 'ESVUFR', 'NOVO NORDISK/COM'),
          ('Equinor ASA', 'EQNR', 'Norway', 'Oslo Børs', 'NO0010096985', '294466304', 'OW6OFBNCKXC4US5C7520', '7133608', 'ESVUFR', 'EQUINOR/COM'),
          ('Siemens AG', 'SIE', 'Germany', 'Xetra', 'DE0007236101', '806200100', 'W38RBJ1NYSDTK0NXW109', '5727973', 'ESVUFR', 'SIEMENS/COM'),
          ('Apple Inc.', 'AAPL', 'United States', 'Nasdaq', 'US0378331005', '037833100', 'HWUPKR0MPOU8FGXBT394', '2046251', 'ESVUFR', 'APPLE INC/COM');
    ''')
    conn.commit()
    conn.close()
    print("Database initialized with static data")

if __name__ == '__main__':
    update_stocks()