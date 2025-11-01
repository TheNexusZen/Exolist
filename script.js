async function loadLevels() {
  const list = document.getElementById('level-list');
  try {
    const response = await fetch('levels.json');
    const levels = await response.json();
    list.innerHTML = '';

    // Sort by ranking
    levels.sort((a, b) => a.ranking - b.ranking);

    levels.forEach(lvl => {
      const div = document.createElement('div');
      div.className = 'level';
      div.innerHTML = `
        <a href="${lvl.image}" target="_blank">
          <img src="${lvl.image}" alt="${lvl.name}" onerror="this.src='IMG_2066.jpeg'">
        </a>
        <div class="level-info">
          <div class="level-name">#${lvl.ranking} ${lvl.name}</div>
          <div class="level-meta">
            <span class="level-creator">by ${lvl.creator}</span> • 
            <span class="level-verifier">verified by ${lvl.verifier}</span> • 
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
