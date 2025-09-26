const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/levels', (req, res) => {
  const levels = JSON.parse(fs.readFileSync('./levels.json'));
  res.json(levels);
});

app.post('/submit', (req, res) => {
  const { name, creator } = req.body;
  if (!name || !creator) return res.status(400).json({ error: 'Missing fields' });

  const levels = JSON.parse(fs.readFileSync('./levels.json'));
  levels.push({ name, creator, submittedAt: Date.now() });
  fs.writeFileSync('./levels.json', JSON.stringify(levels, null, 2));
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
