(function(){
  function loadSaved(){
    try {
      const raw = localStorage.getItem('leadershipResults');
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return data;
      if (data && typeof data === 'object') {
        // convert {Style: score} into array
        return Object.keys(data)
          .filter(k => (window.appData && appData.stylesInfo && appData.stylesInfo[k]))
          .map(k => ({ name: k, score: Number(data[k] || 0), ...appData.stylesInfo[k] }))
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

    // Compute max score dynamically
    const questionsPerStyle = Math.max(...Object.values(appData.scoringMap).map(arr => arr.length));
    const maxScore = questionsPerStyle * 3;

    // Primary style(s)
    const topScore = Math.max(...saved.map(s => s.score));
    const top = saved.filter(s => s.score === topScore);
    const primaryName = document.getElementById('primary-name');
    const primaryDesc = document.getElementById('primary-desc');
    if (top.length === 1){
      primaryName.textContent = top[0].name;
      primaryDesc.textContent = top[0].description || '';
    } else {
      const names = top.map(t => t.name);
      primaryName.textContent = niceJoin(names);
      primaryDesc.textContent = `You show equally high scores in ${niceJoin(names)}. Consider blending the approaches below.`;
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
    saved.forEach(style => {
      const wrap = document.createElement('div');
      wrap.className = 'message is-info';
      wrap.innerHTML = `
        <div class="message-header">
          <p>${style.name} (Score: ${style.score})</p>
        </div>
        <div class="message-body">
          <strong>Description:</strong> ${style.description || ''}<br><br>
          <strong>Effectiveness:</strong> ${style.effectiveness || ''}
        </div>
      `;
      details.appendChild(wrap);
    });
  }

  document.addEventListener('DOMContentLoaded', render);
})();
