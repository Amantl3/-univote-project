const express = require('express');
const bodyParser = require('body-parser');
// const sqlite3 = require('sqlite3').verbose(); // Removed for now
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Important for Render.com!

// Middleware
app.use(bodyParser.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// =======================
// PAGES (Routes)
// =======================

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Registration page
app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

// Voting page
app.get('/vote', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'vote.html'));
});

// =======================
// API Endpoints
// =======================

// Temporarily disable voting until DB is restored
app.post('/api/vote', (req, res) => {
  return res.json({ success: false, message: 'Voting is currently disabled (no database).' });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
