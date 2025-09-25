// Utility: fetch JSON
async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error("Failed to load " + path);
    return await response.json();
  } catch (err) {
    console.error("Error loading JSON:", err);
    return [];
  }
}

// Render levels on levels.html
async function renderLevels() {
  const container = document.getElementById("levels");
  if (!container) return;

  const levels = await loadJSON("data/levels.json");

  // Sort by ranking (1 = top)
  levels.sort((a, b) => (a.ranking || 9999) - (b.ranking || 9999));

  container.innerHTML = "";

  levels.forEach(level => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${level.image || "https://via.placeholder.com/250"}" alt="${level.name}">
      <h3>${level.name}</h3>
      <p><strong>Created by:</strong> ${level.creator}</p>
      <p><strong>Verified by:</strong> ${level.verifier || "Unverified"}</p>
      <p><strong>Difficulty:</strong> ${level.difficulty || "N/A"}</p>
      <p><strong>Ranking:</strong> ${level.ranking || "—"}</p>
    `;

    container.appendChild(card);
  });
}

// Render users on users.html
async function renderUsers() {
  const container = document.getElementById("users");
  if (!container) return;

  const users = await loadJSON("data/users.json");

  users.sort((a, b) => (a.ranking || 9999) - (b.ranking || 9999));

  container.innerHTML = "<ul>" +
    users.map(user => `<li>#${user.ranking || "—"} ${user.name}</li>`).join("") +
    "</ul>";
}

// Handle Discord button
function setupDiscordButton() {
  const btn = document.getElementById("discord-btn");
  if (!btn) return;

  const link = btn.dataset.link;
  if (link && link !== "soon") {
    btn.addEventListener("click", () => window.open(link, "_blank"));
  } else {
    btn.addEventListener("click", () => alert("Discord server coming soon!"));
  }
}

// Run on page load
window.addEventListener("DOMContentLoaded", () => {
  renderLevels();
  renderUsers();
  setupDiscordButton();
});
