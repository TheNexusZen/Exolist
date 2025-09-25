async function loadJSON(url) {
  const response = await fetch(url);
  return await response.json();
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("levels-table")) {
    loadJSON("data/levels.json").then(levels => {
      const tbody = document.querySelector("#levels-table tbody");
      levels.forEach(level => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${level.name}</td>
          <td>${level.creator}</td>
          <td>${level.rating}</td>
          <td>${level.firstVictor}</td>
        `;
        tbody.appendChild(row);
      });
    });
  }

  if (document.getElementById("users-table")) {
    loadJSON("data/users.json").then(users => {
      const tbody = document.querySelector("#users-table tbody");
      users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.bestTime}</td>
          <td>${user.verifiedLevels.join(", ")}</td>
        `;
        tbody.appendChild(row);
      });
    });
  }
});
