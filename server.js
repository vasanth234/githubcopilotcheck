const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const dbPath = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open database:', err);
    process.exit(1);
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);

  db.get('SELECT COUNT(*) AS count FROM users', (err, row) => {
    if (err) {
      console.error('Failed to query users table:', err);
      return;
    }

    if (!row || row.count === 0) {
      db.run(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        ['user@example.com', 'password123'],
        (insertErr) => {
          if (insertErr) {
            console.error('Failed to insert default user:', insertErr);
          }
        }
      );
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  db.get('SELECT id, email, password FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error.' });
    }

    if (!row || row.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    res.json({ success: true, message: 'Login successful.', user: { id: row.id, email: row.email } });
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mcp-server' });
});

app.post('/mcp', (req, res) => {
  const payload = req.body || {};
  const { request, context } = payload;

  res.json({
    success: true,
    received: {
      request: request || null,
      context: context || null
    },
    message: 'MCP server received the payload.'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MCP server is running at http://localhost:${port}`);
});
