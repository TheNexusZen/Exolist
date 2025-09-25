// Utility to load JSON
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

// Render Levels
async function renderLevels() {
  const container = document.getElementById("levels");
  if (!container) return;

  const levels = await loadJSON("data/levels.json");

  // Sort by ranking
  levels.sort((a, b) => (a.ranking || 9999) - (b.ranking || 9999));

  container.innerHTML = "";

  levels.forEach(level => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${level.image || 'https://via.placeholder.com/250'}" alt="${level.name}">
      <h3>#${level.ranking || '—'} - ${level.name}</h3>
      <p><strong>Created by:</strong> ${level.creator}</p>
      <p><strong>Verified by:</strong> ${level.firstVictor || "Unverified"}</p>
      <p><strong>Difficulty:</strong> ${level.rating || "N/A"}</p>
    `;

    container.appendChild(card);
  });
}

// Render Users
async function renderUsers() {
  const container = document.getElementById("users");
  if (!container) return;

  const users = await loadJSON("data/users.json");

  // Sort by ranking
  users.sort((a, b) => (a.ranking || 9999) - (b.ranking || 9999));

  container.innerHTML = "";

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>#${user.ranking || '—'} - ${user.name}</h3>
      <p><strong>Country:</strong> ${user.country || "Unknown"}</p>
      <p><strong>Levels Verified:</strong> ${user.verifiedLevels ? user.verifiedLevels.length : 0}</p>
    `;

    container.appendChild(card);
  });
}

// Setup Discord button
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

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  renderLevels();
  renderUsers();
  setupDiscordButton();
});
