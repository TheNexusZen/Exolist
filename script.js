async function loadLevels() {
  const list = document.getElementById('level-list');
  try {
    const response = await fetch('levels.json');
    const levels = await response.json();
    list.innerHTML = '';

    // Sort levels by ranking (lowest number = highest rank)
    levels.sort((a, b) => a.ranking - b.ranking);

    levels.forEach(lvl => {
      const div = document.createElement('div');
      div.className = 'level';
      div.innerHTML = `
        <img src="${lvl.image}" alt="${lvl.name}">
        <div class="level-info">
          <div class="level-name">#${lvl.ranking} ${lvl.name}</div>
          <div class="level-meta">
            <span class="level-creator">by ${lvl.creator}</span> • 
            <span class="level-rating">${lvl.rating}</span>
          </div>
        </div>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    list.innerHTML = '<p>Failed to load levels.</p>';
    console.error(err);
  }
}

loadLevels();
