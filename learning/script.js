document.addEventListener('DOMContentLoaded', () => {


    // =================================================================
    // APPLICATION STATE & DOM ELEMENTS
    // =================================================================
    let currentQuestionIndex = 0;
    let userAnswers = [];
    const views = { welcome: document.getElementById('welcome-view'), quiz: document.getElementById('quiz-view'), results: document.getElementById('results-view') };
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const viewResultsBtn = document.getElementById('view-results-btn');
    const quizProgress = document.getElementById('quiz-progress');
    const questionNumber = document.getElementById('question-number');
    const questionTotal = document.getElementById('question-total');
    const questionText = document.getElementById('question-text');
    const quizOptionsContainer = document.getElementById('quiz-options-container');
    const resultsChart = document.getElementById('results-chart');
    const primaryStyleName = document.getElementById('primary-style-name');
    const primaryStyleSummary = document.getElementById('primary-style-summary');
    const studyStrategies = document.getElementById('study-strategies');
    const downloadResultsBtn = document.getElementById('download-results-btn');
    const retakeQuizBtn = document.getElementById('retake-quiz-btn');

    // =================================================================
    // CORE APP LOGIC
    // =================================================================

    const showView = (viewName) => {
        Object.values(views).forEach(view => view.classList.remove('is-active'));
        if (views[viewName]) views[viewName].classList.add('is-active');
    };

    const init = () => {
        // Ensure progress bar max aligns with number of questions
        if (quizProgress && window.appData && Array.isArray(appData.questions)) {
            quizProgress.max = appData.questions.length;
            if (questionTotal) questionTotal.textContent = String(appData.questions.length);
        }
        if (localStorage.getItem('learningStyleResults')) {
            viewResultsBtn.classList.remove('is-hidden');
        }
        setupEventListeners();
        showView('welcome');
    };

    const startQuiz = () => {
        currentQuestionIndex = 0;
        userAnswers = [];
        renderQuestion();
        showView('quiz');
    };

    const renderQuestion = () => {
        const questionData = appData.questions[currentQuestionIndex];
        questionNumber.textContent = currentQuestionIndex + 1;
        // Progress shows how many questions have been answered so far
        quizProgress.value = currentQuestionIndex;
        questionText.textContent = questionData.q;
        quizOptionsContainer.innerHTML = '';

        Object.entries(questionData.o).forEach(([key, value]) => {
            const optionHtml = `
                        <div class="column is-half-tablet is-full-mobile">
                            <div class="box quiz-option-card has-text-centered" data-choice="${key}">
                                <p class="is-size-5">${value}</p>
                            </div>
                        </div>`;
            quizOptionsContainer.innerHTML += optionHtml;
        });

        document.querySelectorAll('.quiz-option-card').forEach(card => {
            card.addEventListener('click', () => selectAnswer(card.dataset.choice));
        });
    };

    const selectAnswer = (choice) => {
        // Normalize to uppercase keys (V, A, R, K)
        userAnswers.push(String(choice || '').toUpperCase());
        currentQuestionIndex++;
        if (currentQuestionIndex < appData.questions.length) {
            renderQuestion();
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        const results = calculateResults();
        localStorage.setItem('learningStyleResults', JSON.stringify(results));
        // Set progress to full on finish
        if (quizProgress) quizProgress.value = appData.questions.length;
        renderResults(results);
        showView('results');
    };

    const calculateResults = () => {
        const scores = { V: 0, A: 0, R: 0, K: 0 };
        userAnswers.forEach(answer => {
            if (scores.hasOwnProperty(answer)) scores[answer]++;
        });
        const resultsArray = Object.keys(scores).map(id => ({ id, score: scores[id] }));
        resultsArray.sort((a, b) => b.score - a.score);
        return resultsArray;
    };

    const renderResults = (resultsData) => {
        resultsChart.innerHTML = '';
        studyStrategies.innerHTML = '';
        const maxScore = appData.questions.length;

        // Helper maps
        const idToDisplayName = { V: 'Visual', A: 'Auditory', R: 'Read/Write', K: 'Kinesthetic' };
        const idToInfo = Object.values(appData.stylesInfo || {}).reduce((acc, info) => {
            if (info && info.id) acc[info.id] = info;
            return acc;
        }, {});

        // Chart bars
        resultsData.forEach(style => {
            const id = style.id;
            const displayName = idToDisplayName[id] || id;
            const percentage = maxScore > 0 ? (style.score / maxScore) * 100 : 0;
            const barHtml = `
                        <div class="result-bar-container">
                            <div class="result-label">${displayName}</div>
                            <div class="result-bar" style="width: ${percentage > 5 ? percentage : 5}%;">
                                ${style.score}
                            </div>
                        </div>`;
            resultsChart.innerHTML += barHtml;
        });

        // Primary style(s) and strategies
    const topScore = resultsData.length ? Math.max(...resultsData.map(s => s.score)) : 0;
        const topIds = resultsData.filter(s => s.score === topScore).map(s => s.id);
        const topNames = topIds.map(id => idToDisplayName[id] || id);

        // Render primary name (handle ties gracefully)
        if (topNames.length === 1) {
            primaryStyleName.textContent = topNames[0];
            const info = idToInfo[topIds[0]] || {};
            primaryStyleSummary.textContent = info.summary || '';
            const strategies = Array.isArray(info.strategies) ? info.strategies : [];
            let strategiesHtml = `<p>${info.description || ''}</p><ul>`;
            strategies.forEach(tip => { strategiesHtml += `<li>${tip}</li>`; });
            strategiesHtml += '</ul>';
            studyStrategies.innerHTML = strategiesHtml;
        } else {
            // Tie scenario: combine strategies and provide a helpful note
            const combinedStrategies = [];
            const seen = new Set();
            topIds.forEach(id => {
                const info = idToInfo[id];
                if (info && Array.isArray(info.strategies)) {
                    info.strategies.forEach(tip => {
                        const key = `${id}:${tip}`;
                        if (!seen.has(key)) { seen.add(key); combinedStrategies.push(tip); }
                    });
                }
            });

            const niceJoin = (arr) => {
                if (arr.length <= 1) return arr.join('');
                if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
                return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;
            };

            primaryStyleName.textContent = niceJoin(topNames);
            primaryStyleSummary.textContent = `You show equally strong preferences for ${niceJoin(topNames)}. Try combining the strategies below.`;

            let strategiesHtml = '<ul>';
            combinedStrategies.forEach(tip => { strategiesHtml += `<li>${tip}</li>`; });
            strategiesHtml += '</ul>';
            studyStrategies.innerHTML = strategiesHtml;
        }
    };

    const downloadResults = () => {
        const resultsJson = localStorage.getItem('learningStyleResults');
        if (!resultsJson) return;
        const blob = new Blob([resultsJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'learning-style-results.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const setupEventListeners = () => {
        startQuizBtn.addEventListener('click', startQuiz);
        viewResultsBtn.addEventListener('click', () => {
            try {
                const raw = localStorage.getItem('learningStyleResults');
                const savedResults = raw ? JSON.parse(raw) : null;
                // Normalize saved results into [{id, score}] shape
                let normalized = null;
                if (Array.isArray(savedResults)) {
                    normalized = savedResults.map(s => ({ id: s.id || s?.style || s?.key, score: Number(s.score || 0) }))
                        .filter(s => s.id && ['V','A','R','K'].includes(String(s.id).toUpperCase()))
                        .map(s => ({ id: String(s.id).toUpperCase(), score: s.score }));
                } else if (savedResults && typeof savedResults === 'object') {
                    const maybeIds = ['V','A','R','K'].filter(k => typeof savedResults[k] === 'number');
                    if (maybeIds.length) {
                        normalized = maybeIds.map(id => ({ id, score: Number(savedResults[id] || 0) }));
                    }
                }
                if (normalized && normalized.length) {
                    renderResults(normalized);
                    showView('results');
                }
            } catch (_) {
                // Ignore parse errors; keep user on welcome view
            }
        });
        retakeQuizBtn.addEventListener('click', () => showView('welcome'));
        downloadResultsBtn.addEventListener('click', downloadResults);
    };

    init();
});