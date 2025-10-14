(function(){
  function loadSaved(){
    try {
      const raw = localStorage.getItem('communicationResults');
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return data;
      if (data && typeof data === 'object') {
        // convert {A: n, B: n, C: n, D: n} into array of {name, score, ...info}
        const idToName = Object.entries(appData.stylesInfo).reduce((acc, [name, info]) => {
          acc[info.id] = name;
          return acc;
        }, {});
        return ['A','B','C','D']
          .filter(id => typeof data[id] === 'number')
          .map(id => {
            const name = idToName[id];
            const info = appData.stylesInfo[name];
            return { name, score: Number(data[id] || 0), ...info };
          })
          .sort((a,b)=>b.score-a.score);
      }
      return null;
    } catch { return null; }
  }

  function niceJoin(arr){
    if (!arr || !arr.length) return '';
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
    return `${arr.slice(0,-1).join(', ')}, and ${arr[arr.length-1]}`;
  }

  function render(){
    const dateEl = document.getElementById('report-date');
    if (dateEl) dateEl.textContent = new Date().toLocaleDateString();

    const saved = loadSaved();
    if (!saved || !saved.length){
      const noRes = document.getElementById('no-results');
      if (noRes) noRes.style.display = '';
      return;
    }

    // Compute max score: number of questions
    const maxScore = appData.questions.length;

    // Primary style(s)
    const topScore = Math.max(...saved.map(s => s.score));
    const top = saved.filter(s => s.score === topScore);
    const primaryName = document.getElementById('primary-name');
    const primarySummary = document.getElementById('primary-summary');
    if (top.length === 1){
      primaryName.textContent = top[0].name;
      primarySummary.textContent = top[0].summary || '';
    } else {
      const names = top.map(t => t.name);
      primaryName.textContent = niceJoin(names);
      primarySummary.textContent = `You show equally strong preferences for ${niceJoin(names)}. Try combining the approaches below.`;
    }

    // Chart
    const chart = document.getElementById('chart');
    chart.innerHTML = '';
    saved.forEach(style => {
      const pct = maxScore > 0 ? (style.score / maxScore) * 100 : 0;
      const row = document.createElement('div');
      row.className = 'chart-row';
      row.innerHTML = `
        <div class="chart-label">${style.name}</div>
        <div class="chart-bar" style="width:${Math.max(5,pct)}%">${style.score}</div>
      `;
      chart.appendChild(row);
    });

    // Details
    const details = document.getElementById('details');
    details.innerHTML = '';
    Object.entries(appData.stylesInfo).forEach(([name, info]) => {
      const wrap = document.createElement('div');
      wrap.className = 'message is-info';
      wrap.innerHTML = `
        <div class="message-header">
          <p>${name}</p>
        </div>
        <div class="message-body">
          <strong>Description:</strong> ${info.description || ''}<br><br>
          <strong>How to Adapt:</strong> ${info.adaptation || ''}
        </div>
      `;
      details.appendChild(wrap);
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();
