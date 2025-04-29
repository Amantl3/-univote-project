const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const votesFile = path.join(__dirname, 'votes.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Make sure votes.json exists
if (!fs.existsSync(votesFile)) {
  fs.writeFileSync(votesFile, '[]');
}

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

// Submit a vote
app.post('/api/vote', (req, res) => {
  const { username, password, party } = req.body;

  if (!username || !password || !party) {
    return res.json({ success: false, message: 'Missing fields.' });
  }

  // Read current votes
  let votes = JSON.parse(fs.readFileSync(votesFile));

  // Check if this user has already voted
  const existingVote = votes.find(v => v.username === username);
  if (existingVote) {
    return res.json({ success: false, message: 'You have already voted.' });
  }

  // Add new vote
  votes.push({ username, password, party });
  fs.writeFileSync(votesFile, JSON.stringify(votes, null, 2));

  res.json({ success: true });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
