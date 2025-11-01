async function loadLevels() {
  const list = document.getElementById('level-list');
  try {
    const response = await fetch('levels.json');
    const levels = await response.json();
    list.innerHTML = '';

    levels.forEach((lvl, i) => {
      const div = document.createElement('div');
      div.className = 'level';
      div.innerHTML = `
        <img src="${lvl.thumbnail}" alt="${lvl.name}">
        <div class="level-info">
          <div class="level-name">#${i + 1} ${lvl.name}</div>
          <div class="level-creator">by ${lvl.creator}</div>
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
