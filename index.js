const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Route for homepage
app.get("/", (req, res) => {
  res.send("Welcome to ExoList API!");
});

// Route to serve levels.json
app.get("/levels", (req, res) => {
  const levelsPath = path.join(__dirname, "levels.json");
  fs.readFile(levelsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading levels.json" });
    }
    res.json(JSON.parse(data));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
