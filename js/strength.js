// js/strength.js
(function(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  const showNotFound = () => {
    document.getElementById('not-found').classList.remove('hidden');
  };

  if(!id || !window.STRENGTHS_CONTENT){
    showNotFound();
    return;
  }

  const data = STRENGTHS_CONTENT[id];
  if(!data){ showNotFound(); return; }

  // Populate
  document.title = `${data.displayName} – Strength Profile`;
  document.getElementById('page-title').textContent = data.thematicTitle || data.displayName;
  document.getElementById('page-tagline').textContent = data.tagline || '';
  document.getElementById('display-name').textContent = data.displayName;
  document.getElementById('display-name-2').textContent = data.displayName;
  document.getElementById('display-name-3').textContent = data.displayName;
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

  document.getElementById('quote').textContent = data.quote || '';
})();
