// js/strength.js
(function(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  const showNotFound = () => {
    document.getElementById('not-found').classList.remove('hidden');
  };

  if(!id || !window.STRENGTHS_CONTENT){
    console.warn('Strength page: missing id or STRENGTHS_CONTENT', { id, hasContent: !!window.STRENGTHS_CONTENT });
    showNotFound();
    return;
  }

  const data = STRENGTHS_CONTENT[id];
  if(!data){
    console.warn('Strength page: slug not found in content', { id, available: Object.keys(STRENGTHS_CONTENT || {}) });
    showNotFound();
    return;
  }

  // Populate
  document.title = `${data.displayName} – Strength Profile`;
  document.getElementById('page-title').textContent = data.thematicTitle || data.displayName;
  document.getElementById('page-tagline').textContent = data.tagline || '';
  document.getElementById('display-name').textContent = data.displayName;
  document.getElementById('display-name-2').textContent = data.displayName;
  document.getElementById('display-name-3').textContent = data.displayName;
  document.getElementById('display-name-4').textContent = data.displayName;
  document.getElementById('display-name-5').textContent = data.displayName;
  document.getElementById('definition').textContent = data.definition || '';

  const ul = document.getElementById('signs');
  ul.innerHTML = '';
  (data.signs || []).forEach(s=>{
    const li = document.createElement('li');
    li.textContent = s;
    ul.appendChild(li);
  });

  const ap = data.actionPlan || {};
  document.getElementById('ap-work').textContent = ap.work || '';
  document.getElementById('ap-relationships').textContent = ap.relationships || '';
  document.getElementById('ap-personal').textContent = ap.personalGrowth || '';

  const gm = data.goldenMean || {};
  document.getElementById('gm-under').textContent = gm.underuse || '';
  document.getElementById('gm-over').textContent = gm.overuse || '';

  // Blindspots
  const blindspotsContainer = document.getElementById('blindspots-container');
  blindspotsContainer.innerHTML = '';
  (data.blindspots || []).forEach(bs => {
    const card = document.createElement('div');
    card.className = 'box mb-4 blindspot-card';
    card.innerHTML = `
      <h3 class="title is-6 has-text-primary">${bs.title}</h3>
      <p class="mb-2"><strong>Pattern:</strong> ${bs.pattern}</p>
      <p class="mb-2"><strong>Watch For:</strong> ${bs.watchFor}</p>
      <p class="has-background-info-light p-3 mt-2"><strong>Balance Tip:</strong> ${bs.balanceTip}</p>
    `;
    blindspotsContainer.appendChild(card);
  });

  // Strength in Action
  const siaList = document.getElementById('strength-in-action-list');
  siaList.innerHTML = '';
  (data.strengthInAction || []).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    siaList.appendChild(li);
  });

  // Real-World Example
  const exampleBox = document.getElementById('real-world-example');
  exampleBox.textContent = data.realWorldExample || '';

  // Complementary Strengths
  const compContainer = document.getElementById('complementary-strengths-container');
  compContainer.innerHTML = '';
  (data.complementaryStrengths || []).forEach(cs => {
    const card = document.createElement('div');
    card.className = 'box mb-3 complementary-card';
    card.innerHTML = `
      <h3 class="title is-6 has-text-link">${data.displayName} + ${cs.strength}</h3>
      <p class="mb-2"><strong>Synergy:</strong> ${cs.synergy}</p>
      <p class="is-italic">${cs.example}</p>
    `;
    compContainer.appendChild(card);
  });

  document.getElementById('quote').textContent = data.quote || '';
})();
