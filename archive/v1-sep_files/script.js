
    // =========================
    // State management
    // =========================

    function loadState() {
      const raw = localStorage.getItem(APP_KEY);
      if (!raw) return null;
      try { return JSON.parse(raw); } catch(e){ return null; }
    }
    function saveState(state) {
      localStorage.setItem(APP_KEY, JSON.stringify(state));
    }
    function clearState() {
      localStorage.removeItem(APP_KEY);
    }

    // Create fresh state
    function initialState() {
      const scores = {};
      STRENGTHS.forEach(s => scores[s] = 0);
      return {
        version: '1.0',
        startedAt: new Date().toISOString(),
        completedAt: null,
        index: 0,               // next question index (0-based)
        scores,                 // strength -> count
        responses: [],          // [{id, choice: 'A'|'B'|null, strength: string|null, timeTakenMs, timeout: boolean, at}]
        timeouts: 0,
      };
    }

    // =========================
    // UI elements
    // =========================

    const elConsent = document.getElementById('screen-consent');
    const elAssessment = document.getElementById('screen-assessment');
    const elResults = document.getElementById('screen-results');

    const elConsentCheck = document.getElementById('consent-check');
    const elBtnStart = document.getElementById('btn-start');
    const elBtnResume = document.getElementById('btn-resume');
    const elBtnClear = document.getElementById('btn-clear');

    const elProgressCount = document.getElementById('progress-count');
    const elProgressBar = document.getElementById('progress-bar');
    const elTimer = document.getElementById('timer');
    const elTimerAria = document.getElementById('aria-live-timer');

    const elQuestionTitle = document.getElementById('question-title');
    const elChoiceAText = document.getElementById('choice-a-text');
    const elChoiceBText = document.getElementById('choice-b-text');
    const elChoiceAStrength = document.getElementById('choice-a-strength');
    const elChoiceBStrength = document.getElementById('choice-b-strength');
    const elBtnChoiceA = document.getElementById('btn-choice-a');
    const elBtnChoiceB = document.getElementById('btn-choice-b');

    const elResultsTableBody = document.getElementById('results-table-body');
    const elBtnDownloadJSON = document.getElementById('btn-download-json');
    const elBtnDownloadCSV = document.getElementById('btn-download-csv');
    const elBtnRestart = document.getElementById('btn-restart');

    // =========================
    // App logic
    // =========================

    let STATE = loadState() || null;
    let timerHandle = null;
    let timerStartMs = null;
    const TIME_LIMIT = 20; // seconds
    let ADMIN_STRENGTHS_VISIBLE = false;

    function applyStrengthVisibility() {
      const method = ADMIN_STRENGTHS_VISIBLE ? 'add' : 'remove';
      elChoiceAStrength.classList[method]('is-visible');
      elChoiceBStrength.classList[method]('is-visible');
    }

    function setStrengthVisibility(visible, { persist = true, silent = false } = {}) {
      ADMIN_STRENGTHS_VISIBLE = visible;
      applyStrengthVisibility();
      if (persist) {
        if (visible) {
          localStorage.setItem(ADMIN_TOGGLE_KEY, '1');
        } else {
          localStorage.removeItem(ADMIN_TOGGLE_KEY);
        }
      }
      if (!silent) {
        notify(visible ? 'Strength labels revealed for debugging.' : 'Strength labels hidden.');
      }
    }

    function initStrengthVisibility() {
      const params = new URLSearchParams(window.location.search);
      const paramSecret = params.get('showStrengths');
      if (paramSecret && paramSecret === ADMIN_SECRET) {
        setStrengthVisibility(true, { silent: true });
        return;
      }
      const stored = localStorage.getItem(ADMIN_TOGGLE_KEY);
      if (stored === '1') {
        setStrengthVisibility(true, { silent: true, persist: false });
      } else {
        setStrengthVisibility(false, { silent: true, persist: false });
      }
    }

    document.addEventListener('keydown', (event) => {
      if (event.altKey && event.shiftKey && event.code === 'KeyS') {
        const input = prompt('Admin password required to toggle strength labels:');
        if (input === null) return;
        if (input === ADMIN_SECRET) {
          setStrengthVisibility(!ADMIN_STRENGTHS_VISIBLE);
        } else {
          notify('Incorrect admin password.');
        }
      }
    });

    // Consent screen enable/disable start
    elConsentCheck.addEventListener('change', () => {
      elBtnStart.disabled = !elConsentCheck.checked;
    });

    // Show resume if saved and not completed
    function syncConsentButtons() {
      const saved = loadState();
      if (saved && saved.index < QUESTIONS.length && !saved.completedAt) {
        elBtnResume.classList.remove('hidden');
      } else {
        elBtnResume.classList.add('hidden');
      }
    }
    syncConsentButtons();

    elBtnClear.addEventListener('click', () => {
      clearState();
      syncConsentButtons();
      notify('Saved data cleared.');
    });

    elBtnStart.addEventListener('click', () => {
      STATE = initialState();
      saveState(STATE);
      showAssessment();
      renderQuestion();
      startTimer();
    });

    elBtnResume.addEventListener('click', () => {
      STATE = loadState();
      if (!STATE) {
        notify('No saved session found.');
        return;
      }
      showAssessment();
      renderQuestion();
      startTimer();
    });

    // Assessment navigation (no back)
    function showAssessment() {
      elConsent.classList.add('hidden');
      elResults.classList.add('hidden');
      elAssessment.classList.remove('hidden');
    }
    function showResults() {
      elConsent.classList.add('hidden');
      elAssessment.classList.add('hidden');
      elResults.classList.remove('hidden');
    }

    function renderQuestion() {
      const idx = STATE.index;
      if (idx >= QUESTIONS.length) {
        finalizeAndShowResults();
        return;
      }
      const q = QUESTIONS[idx];
      elQuestionTitle.textContent = `Question ${idx + 1}`;
      elChoiceAText.textContent = q.aText;
      elChoiceBText.textContent = q.bText;
      elChoiceAStrength.textContent = q.aStrength;
      elChoiceBStrength.textContent = q.bStrength;
  applyStrengthVisibility();

      // Progress
      elProgressCount.textContent = `${idx + 1} / ${QUESTIONS.length}`;
      elProgressBar.value = idx + 1;
      elProgressBar.max = QUESTIONS.length;
      elProgressBar.textContent = Math.round(((idx + 1) / QUESTIONS.length) * 100) + '%';
    }

    function startTimer() {
      stopTimer();
      let remaining = TIME_LIMIT;
      timerStartMs = Date.now();
      updateTimerUI(remaining);
      timerHandle = setInterval(() => {
        remaining--;
        updateTimerUI(remaining);
        if (remaining <= 0) {
          stopTimer();
          recordTimeout();
          advance();
        }
      }, 1000);
    }
    function stopTimer() {
      if (timerHandle) {
        clearInterval(timerHandle);
        timerHandle = null;
      }
    }
    function updateTimerUI(remaining) {
      elTimer.textContent = `${remaining}s`;
      elTimerAria.textContent = `Time remaining ${remaining} seconds`;
      if (remaining <= 5) {
        elTimer.classList.remove('is-warning','is-light');
        elTimer.classList.add('is-danger');
      } else {
        elTimer.classList.remove('is-danger');
        elTimer.classList.add('is-warning','is-light');
      }
    }

    function recordResponse(choice) {
      const idx = STATE.index;
      const q = QUESTIONS[idx];
      const timeTakenMs = Date.now() - timerStartMs;
      const isA = choice === 'A';
      const strength = isA ? q.aStrength : q.bStrength;
      // Increment score
      STATE.scores[strength] = (STATE.scores[strength] || 0) + 1;
      // Push response
      STATE.responses.push({
        id: q.id,
        choice,
        strength,
        timeTakenMs,
        timeout: false,
        at: new Date().toISOString(),
      });
      saveState(STATE);
    }

    function recordTimeout() {
      const idx = STATE.index;
      const q = QUESTIONS[idx];
      STATE.timeouts++;
      STATE.responses.push({
        id: q.id,
        choice: null,
        strength: null,
        timeTakenMs: TIME_LIMIT * 1000,
        timeout: true,
        at: new Date().toISOString(),
      });
      saveState(STATE);
    }

    function advance() {
      STATE.index++;
      saveState(STATE);
      if (STATE.index >= QUESTIONS.length) {
        finalizeAndShowResults();
      } else {
        renderQuestion();
        startTimer();
      }
    }

    elBtnChoiceA.addEventListener('click', () => {
      stopTimer();
      recordResponse('A');
      advance();
    });
    elBtnChoiceB.addEventListener('click', () => {
      stopTimer();
      recordResponse('B');
      advance();
    });

    function finalizeAndShowResults() {
      STATE.completedAt = new Date().toISOString();
      saveState(STATE);
      // Build ranking
      const ranking = Object.entries(STATE.scores)
        .sort((a,b) => b[1] - a[1]); // desc by score
      renderResults(ranking);
      showResults();
    }

    function renderResults(ranking) {
      elResultsTableBody.innerHTML = '';
      ranking.forEach(([strength, score], i) => {
        const tr = document.createElement('tr');
        if (i < 5) tr.classList.add('rank-top');
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${strength}</td>
          <td>${score}</td>
        `;
        elResultsTableBody.appendChild(tr);
      });
    }

    // =========================
    // Export functions
    // =========================

    function download(filename, content, mime='text/plain') {
      const blob = new Blob([content], {type: mime});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    elBtnDownloadJSON.addEventListener('click', () => {
      const data = {
        metadata: {
          version: STATE.version,
          startedAt: STATE.startedAt,
          completedAt: STATE.completedAt,
          totalQuestions: QUESTIONS.length,
          timeouts: STATE.timeouts,
          timeLimitSeconds: TIME_LIMIT,
        },
        scores: STATE.scores,
        responses: STATE.responses,
        ranking: Object.entries(STATE.scores).sort((a,b) => b[1] - a[1]),
      };
      download('scholars_compass_results.json', JSON.stringify(data, null, 2), 'application/json');
    });

    elBtnDownloadCSV.addEventListener('click', () => {
      // CSV of raw responses (id,choice,strength,timeTakenMs,timeout,at)
      const header = ['id','choice','strength','timeTakenMs','timeout','at'].join(',');
      const rows = STATE.responses.map(r => [
        r.id,
        r.choice === null ? '' : r.choice,
        r.strength === null ? '' : `"${r.strength}"`,
        r.timeTakenMs,
        r.timeout,
        `"${r.at}"`
      ].join(','));
      const csv = [header, ...rows].join('\n');
      download('scholars_compass_responses.csv', csv, 'text/csv');
    });

    // Restart function
    elBtnRestart.addEventListener('click', () => {
      clearState();
      STATE = initialState();
      saveState(STATE);
      showAssessment();
      renderQuestion();
      startTimer();
    });

    // =========================
    // Notifications (simple)
    // =========================
    function notify(message) {
      // Lightweight: console + optional alert for now
      console.log('[Notice]', message);
    }

    // Accessibility: if someone reloads mid-assessment, show resume again on consent
    document.addEventListener('visibilitychange', syncConsentButtons);

    // If a completed session exists, offer restart directly
    (function init() {
      const saved = loadState();
      initStrengthVisibility();
      if (saved && saved.completedAt) {
        // Show results immediately for completed session
        STATE = saved;
        renderResults(Object.entries(STATE.scores).sort((a,b) => b[1] - a[1]));
        elConsent.classList.add('hidden');
        elAssessment.classList.add('hidden');
        elResults.classList.remove('hidden');
      } else {
        // Default to consent screen
        elConsent.classList.remove('hidden');
        elAssessment.classList.add('hidden');
        elResults.classList.add('hidden');
      }
    })();

    // Optional dev check: ensure each strength appears 8 times total
    // console.table(countStrengthAppearances());
