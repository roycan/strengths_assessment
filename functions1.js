// functions1.js

// --- State ---
let STATE = null;
let timerHandle = null;
let timerRemaining = 20;
let timerStartMs = null;

// --- Elements ---
const elConsent = document.getElementById("screen-consent");
const elAssessment = document.getElementById("screen-assessment");
const elResults = document.getElementById("screen-results");
const elBtnStart = document.getElementById("btn-start");
const elBtnResume = document.getElementById("btn-resume");
const elBtnClear = document.getElementById("btn-clear");
const elConsentCheck = document.getElementById("consent-check");
const elProgressCount = document.getElementById("progress-count");
const elProgressBar = document.getElementById("progress-bar");
const elTimer = document.getElementById("timer");
const elQuestionTitle = document.getElementById("question-title");
const elChoiceAText = document.getElementById("choice-a-text");
const elChoiceBText = document.getElementById("choice-b-text");
const elResultsTableBody = document.getElementById("results-table-body");
const elBtnDownloadJSON = document.getElementById("btn-download-json");
const elBtnDownloadCSV = document.getElementById("btn-download-csv");
const elBtnCopyTop5 = document.getElementById("btn-copy-top5");
const elBtnRestart = document.getElementById("btn-restart");
const elResultsCards = document.getElementById("results-cards");

// --- Initialization (ensure correct first screen) ---
document.addEventListener('DOMContentLoaded', initApp);

function initApp(){
  const saved = loadState();
  if(saved && saved.completedAt){
    STATE = saved;
    renderResults();
    showResults();
    return;
  }
  if(saved && !saved.completedAt && saved.index < QUESTIONS.length){
    // Show consent screen with resume button visible
    STATE = saved; // keep for potential resume
    elBtnResume.classList.remove('hidden');
    elConsent.classList.remove('hidden');
    elAssessment.classList.add('hidden');
    elResults.classList.add('hidden');
  } else {
    // Fresh start
    elConsent.classList.remove('hidden');
    elAssessment.classList.add('hidden');
    elResults.classList.add('hidden');
  }
}

// --- State helpers ---
function initialState() {
  const scores = {}; STRENGTHS.forEach(s => scores[s]=0);
  return {
    version: "v3",
    index: 0,
    scores,
    responses: [],
    timeouts: 0,
    startedAt: new Date().toISOString(),
    completedAt: null
  };
}
function saveState(){ localStorage.setItem(APP_KEY, JSON.stringify(STATE)); }
function loadState(){ const raw=localStorage.getItem(APP_KEY); return raw?JSON.parse(raw):null; }
function clearState(){ localStorage.removeItem(APP_KEY); }

// --- Navigation ---
function showAssessment(){ elConsent.classList.add("hidden"); elResults.classList.add("hidden"); elAssessment.classList.remove("hidden"); }
function showResults(){ elConsent.classList.add("hidden"); elAssessment.classList.add("hidden"); elResults.classList.remove("hidden"); }

// --- Consent screen logic ---
function syncConsentButtons(){
  const saved = loadState();
  if(saved && !saved.completedAt && saved.index < QUESTIONS.length){
    elBtnResume.classList.remove('hidden');
  } else {
    elBtnResume.classList.add('hidden');
  }
}

elConsentCheck.addEventListener("change",()=>{ elBtnStart.disabled=!elConsentCheck.checked; });
elBtnStart.addEventListener("click",()=>{
  STATE = initialState();
  saveState();
  showAssessment();
  renderQuestion();
  startTimer();
});
elBtnResume.addEventListener("click",()=>{
  STATE = loadState();
  if(!STATE){ return; }
  showAssessment();
  renderQuestion();
  startTimer();
});
elBtnClear.addEventListener("click",()=>{
  clearState();
  syncConsentButtons();
  showToast("Saved data cleared","danger");
});

// --- Assessment rendering ---
function renderQuestion(){
  const idx = STATE.index;
  if(idx >= QUESTIONS.length){ finalizeAndShowResults(); return; }
  const q = QUESTIONS[idx];
  elQuestionTitle.textContent = `Question ${idx+1}`;
  elChoiceAText.textContent = q.aText;
  elChoiceBText.textContent = q.bText;
  elProgressCount.textContent = `${idx+1} / ${QUESTIONS.length}`;
  elProgressBar.value = idx+1; elProgressBar.max = QUESTIONS.length;

  document.querySelectorAll('input[name="scale"]').forEach(r=>{
    r.checked=false; r.disabled=false;
    r.onchange = () => { recordSelection(r.value); advance(); };
  });
}

// --- Timer ---
function startTimer(){
  stopTimer();
  timerRemaining = 20;
  timerStartMs = Date.now();
  updateTimerUI();
  timerHandle = setInterval(()=>{
    timerRemaining--;
    updateTimerUI();
    if(timerRemaining <= 0){
      stopTimer();
      recordTimeout();
      advance();
    }
  },1000);
}
function stopTimer(){ if(timerHandle){ clearInterval(timerHandle); timerHandle=null; } }
function updateTimerUI(){
  elTimer.textContent = `${timerRemaining}s`;
  if(timerRemaining <= 5){ elTimer.classList.add("timer-low"); }
  else { elTimer.classList.remove("timer-low"); }
}

// --- Recording responses ---
function recordSelection(val){
  const idx = STATE.index;
  const q = QUESTIONS[idx];
  const w = WEIGHTS[val];
  const timeTakenMs = Date.now() - timerStartMs;

  STATE.scores[q.aStrength] += w.A;
  STATE.scores[q.bStrength] += w.B;

  STATE.responses.push({
    id: q.id, selection: val,
    aStrength: q.aStrength, bStrength: q.bStrength,
    aPoints: w.A, bPoints: w.B,
    timeTakenMs, timeout:false, at:new Date().toISOString()
  });
  saveState();
}
function recordTimeout(){
  const idx = STATE.index;
  const q = QUESTIONS[idx];
  STATE.timeouts++;
  STATE.responses.push({
    id: q.id, selection:null,
    aStrength: q.aStrength, bStrength: q.bStrength,
    aPoints: 0, bPoints: 0,
    timeTakenMs: 20000, timeout:true, at:new Date().toISOString()
  });
  saveState();
}
function advance(){
  STATE.index++;
  saveState();
  renderQuestion();
  startTimer();
}

// --- Results ---
function finalizeAndShowResults(){
  stopTimer();
  STATE.completedAt = new Date().toISOString();
  saveState();
  renderResults();
  showResults();
}

function renderResults(){
  const ranking = Object.entries(STATE.scores).sort((a,b)=> b[1]-a[1]);
  const MAX_PER_STRENGTH = 16;

  // Desktop table
  elResultsTableBody.innerHTML = "";
  ranking.forEach(([strength, score], i)=>{
    const pct = Math.round((score / MAX_PER_STRENGTH) * 100);
    const tr = document.createElement("tr");
    if(i < 5) tr.classList.add("rank-top");
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>
        ${strength}
        <span class="info-icon" tabindex="0">
          ⓘ
          <span class="tooltip-text">${STRENGTH_DESCRIPTIONS[strength] || ""}</span>
        </span>
      </td>
      <td>${score.toFixed(2)}</td>
      <td>${pct}%</td>
    `;
    elResultsTableBody.appendChild(tr);
  });

  // Mobile cards
  elResultsCards.innerHTML = "";
  ranking.forEach(([strength, score], i)=>{
    const pct = Math.round((score / MAX_PER_STRENGTH) * 100);
    const card = document.createElement("div");
    card.className = "result-card" + (i<5 ? " rank-top" : "");
    card.innerHTML = `
      <div class="result-card-header">
        <span>#${i+1} ${strength}</span>
        <span>${pct}%</span>
      </div>
      <div class="result-card-details">
        <div>Score: ${score.toFixed(2)} / ${MAX_PER_STRENGTH}</div>
        <div class="has-text-grey is-size-7 mt-1">${STRENGTH_DESCRIPTIONS[strength] || ""}</div>
      </div>
    `;
    card.querySelector(".result-card-header").addEventListener("click", ()=>{
      card.classList.toggle("open");
    });
    elResultsCards.appendChild(card);
  });

  // Update meta note: add Neither count alongside existing fields if present on page
  const neutrals = STATE.responses.filter(r=>r.selection==="equal").length;
  const neithers = STATE.responses.filter(r=>r.selection==="neither").length;
  const meta = document.getElementById("meta-note");
  if (meta) {
    meta.textContent = `Neutrals: ${neutrals} • Neither: ${neithers} • Timeouts: ${STATE.timeouts} • Total items: ${QUESTIONS.length}`;
  }
}
