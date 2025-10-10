// js/journey.js
(function(){
  const listEl = document.getElementById('top-strengths-list');
  const noResultsEl = document.getElementById('no-results-msg');
  const migrationBanner = document.getElementById('migration-banner');

  // Keys by version (newest first)
  const KEY_V3 = (typeof APP_KEY === 'string' && APP_KEY) ? APP_KEY : 'scholars_compass_via_v3';
  const KEY_V2 = 'scholars_compass_via_v2';
  const KEY_V1 = 'scholars_compass_via_v1';

  function tryParse(raw){
    if(!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  function loadWithFallback(){
    const raw3 = localStorage.getItem(KEY_V3);
    const s3 = tryParse(raw3);
    if(s3 && s3.scores) return { state:s3, from:KEY_V3 };

    const raw2 = localStorage.getItem(KEY_V2);
    const s2 = tryParse(raw2);
    if(s2 && s2.scores) return { state:s2, from:KEY_V2 };

    const raw1 = localStorage.getItem(KEY_V1);
    const s1 = tryParse(raw1);
    if(s1 && s1.scores) return { state:s1, from:KEY_V1 };

    return { state:null, from:null };
  }

  function migrateIfNeeded(payload){
    const { state, from } = payload;
    if(!state) return false;
    if(from === KEY_V3) return false; // already current

    // Shallow migration: stamp version and write to v3 key
    const migrated = { ...state, version: 'v3' };
    try { localStorage.setItem(KEY_V3, JSON.stringify(migrated)); } catch {}
    return true;
  }

  try {
    const payload = loadWithFallback();
    const migrated = migrateIfNeeded(payload);
    const state = payload.state;

    if(!state || !state.scores){ noResultsEl.classList.remove('hidden'); return; }

    if(migrated && migrationBanner){ migrationBanner.classList.remove('hidden'); }

    const ranking = Object.entries(state.scores).sort((a,b)=> b[1]-a[1]);
    const top = ranking.slice(0, 10);

    // Render buttons linking to strength profile (use relative path root)
    top.forEach(([name])=>{
      const slug = strengthToSlug(name);
      const a = document.createElement('a');
      a.className = 'button is-primary is-light';
      a.href = `../../strength.html?id=${encodeURIComponent(slug)}`;
      a.textContent = name;
      listEl.appendChild(a);
    });

    if(top.length === 0){ noResultsEl.classList.remove('hidden'); }
  } catch(err){
    console.error(err);
    noResultsEl.classList.remove('hidden');
  }
})();
