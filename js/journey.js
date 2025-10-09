// js/journey.js
(function(){
  const listEl = document.getElementById('top-strengths-list');
  const noResultsEl = document.getElementById('no-results-msg');

  try {
    const raw = localStorage.getItem(APP_KEY);
    if(!raw){ noResultsEl.classList.remove('hidden'); return; }
    const state = JSON.parse(raw);
    if(!state || !state.scores){ noResultsEl.classList.remove('hidden'); return; }

    const ranking = Object.entries(state.scores).sort((a,b)=> b[1]-a[1]);
    const top = ranking.slice(0, 10);

    // Render buttons linking to strength profile
    top.forEach(([name])=>{
      const slug = strengthToSlug(name);
      const a = document.createElement('a');
      a.className = 'button is-primary is-light';
      a.href = `/strength.html?id=${encodeURIComponent(slug)}`;
      a.textContent = name;
      listEl.appendChild(a);
    });

    if(top.length === 0){ noResultsEl.classList.remove('hidden'); }
  } catch(err){
    console.error(err);
    noResultsEl.classList.remove('hidden');
  }
})();
