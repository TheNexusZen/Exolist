import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files from "public" folder
app.use(express.static("public"));

// API endpoint to get levels.json
app.get("/levels", (req, res) => {
  try {
    const levels = JSON.parse(fs.readFileSync("levels.json", "utf8"));
    res.json(levels);
  } catch (err) {
    res.status(500).json({ error: "Could not read levels.json" });
  }
});

// Default route -> serve index.html
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
