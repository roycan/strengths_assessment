// js/report.js
(function(){
  const KEY_V3 = (typeof APP_KEY === 'string' && APP_KEY) ? APP_KEY : 'scholars_compass_via_v3';
  const KEY_V2 = 'scholars_compass_via_v2';
  const KEY_V1 = 'scholars_compass_via_v1';
  const MAX_PER_STRENGTH = 16;

  // Primary category mapping (labels only)
  const PRIMARY_GROUP = {
    'Creativity':'Analytical', 'Curiosity':'Analytical', 'Judgment':'Analytical', 'Love of Learning':'Analytical', 'Perspective':'Analytical',
    'Love':'Interpersonal', 'Kindness':'Interpersonal', 'Social Intelligence':'Interpersonal', 'Humor':'Interpersonal', 'Leadership':'Interpersonal', 'Teamwork':'Interpersonal', 'Fairness':'Interpersonal',
    'Prudence':'Intrapersonal', 'Self-Regulation':'Intrapersonal', 'Perseverance':'Intrapersonal', 'Forgiveness':'Intrapersonal', 'Humility':'Intrapersonal', 'Honesty':'Intrapersonal',
    'Gratitude':'Emotional', 'Hope':'Emotional', 'Spirituality':'Emotional', 'Appreciation of Beauty':'Emotional', 'Zest':'Emotional', 'Bravery':'Emotional'
  };

  function tryParse(raw){ try { return raw ? JSON.parse(raw) : null; } catch { return null; } }
  function loadWithFallback(){
    const s3 = tryParse(localStorage.getItem(KEY_V3)); if(s3 && s3.scores) return s3;
    const s2 = tryParse(localStorage.getItem(KEY_V2)); if(s2 && s2.scores) return s2;
    const s1 = tryParse(localStorage.getItem(KEY_V1)); if(s1 && s1.scores) return s1;
    return null;
  }

  function setText(id, text){ const el = document.getElementById(id); if(el) el.textContent = text; }
  function el(id){ return document.getElementById(id); }

  function render(){
    // Date
    setText('report-date', new Date().toLocaleDateString());

    const state = loadWithFallback();
    if(!state || !state.scores){ const nr = el('no-results'); if(nr) nr.style.display='block'; return; }

    const ranking = Object.entries(state.scores).sort((a,b)=> b[1]-a[1]);

    // Snapshot: balance of categories among Top 5
    const top5 = ranking.slice(0,5).map(([name,score])=>({name,score}));
    const counts = {Analytical:0, Interpersonal:0, Intrapersonal:0, Emotional:0};
    top5.forEach(({name})=>{ const g = PRIMARY_GROUP[name] || '—'; if(counts[g] !== undefined) counts[g]++; });
    const balance = el('balance');
    if(balance){ balance.textContent = `Top 5 by category (for reflection): Analytical ${counts.Analytical} • Interpersonal ${counts.Interpersonal} • Intrapersonal ${counts.Intrapersonal} • Emotional ${counts.Emotional}`; }

    // Top 5 details
    const t5root = el('top5-list');
    t5root.innerHTML = '';
    top5.forEach(({name,score}, idx)=>{
      const pct = Math.round((score / MAX_PER_STRENGTH) * 100);
      const slug = (typeof strengthToSlug === 'function') ? strengthToSlug(name) : name.toLowerCase();
      const content = (window.STRENGTHS_CONTENT && window.STRENGTHS_CONTENT[slug]) ? window.STRENGTHS_CONTENT[slug] : null;
      const group = PRIMARY_GROUP[name] || '—';

      const div = document.createElement('div');
      div.className = 'top5-item';
      const tagline = content && content.tagline ? content.tagline : (STRENGTH_DESCRIPTIONS[name] || '');

      // Spot/Apply/Reflect
      const spotList = content && Array.isArray(content.signs) ? content.signs.slice(0,2) : [];
      const applyList = content && content.actionPlan ? Object.values(content.actionPlan).slice(0,2) : [];
      const reflectText = `Notice one moment this week where ${name} changed your mood, energy, or progress. Jot two sentences.`;

      div.innerHTML = `
        <div class="top5-head">
          <div>
            <strong>#${idx+1} ${name}</strong>
            <span class="badge cat-${group}">${group}</span>
          </div>
          <div>${pct}%</div>
        </div>
        <div class="top5-tagline">${tagline}</div>
        <div class="columns">
          <div class="column">
            <p><strong>Spot</strong></p>
            <ul>${spotList.map(s=>`<li>${s}</li>`).join('') || '<li>Notice where this strength naturally shows up.</li>'}</ul>
          </div>
          <div class="column">
            <p><strong>Apply</strong></p>
            <ul>${applyList.map(s=>`<li>${s}</li>`).join('') || '<li>Pick one 10–20 minute action that uses this strength.</li>'}</ul>
          </div>
          <div class="column">
            <p><strong>Reflect</strong></p>
            <ul><li>${reflectText}</li></ul>
          </div>
        </div>
      `;
      t5root.appendChild(div);
    });

    // Full table
    const tbody = el('full-table');
    tbody.innerHTML = '';
    ranking.forEach(([name,score], i)=>{
      const pct = Math.round((score / MAX_PER_STRENGTH) * 100);
      const group = PRIMARY_GROUP[name] || '—';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${name}</td>
        <td><span class="badge cat-${group}">${group}</span></td>
        <td>${score.toFixed(2)}</td>
        <td>${pct}%</td>
        <td>${STRENGTH_DESCRIPTIONS[name] || ''}</td>
      `;
      tbody.appendChild(tr);
    });

    // Micro-actions per category (2 each)
    const MICRO = {
      Analytical:[
        'Skim a related article and jot 3 questions; pick one to explore this week.',
        'Re-plan a stuck task: list 3 alternative approaches; schedule 15 minutes for the easiest.'
      ],
      Interpersonal:[
        'Send one strengths-based thank-you to a classmate or mentor, naming what they did well and why it helped.',
        'In your next group meeting, ask one clarifying question and summarize agreements in 2 sentences.'
      ],
      Intrapersonal:[
        'Do a 10-minute focused work block, then a 2-minute honest check-in: what worked and what to tweak.',
        'Set a tiny boundary: mute or move one distraction for the next study session; reflect on the difference.'
      ],
      Emotional:[
        'Write one hopeful outcome for the week and the first small step; take that step today.',
        'Do a 3-item gratitude note and share one with someone who’d appreciate it.'
      ]
    };
    const microRoot = el('micro-actions');
    microRoot.innerHTML = '';
    Object.entries(MICRO).forEach(([group, items])=>{
      const h = document.createElement('h4'); h.className='title is-6'; h.textContent = group;
      const ul = document.createElement('ul'); ul.innerHTML = items.map(x=>`<li>${x}</li>`).join('');
      microRoot.appendChild(h); microRoot.appendChild(ul);
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();
