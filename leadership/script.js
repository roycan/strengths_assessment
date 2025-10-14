document.addEventListener('DOMContentLoaded', () => {


    // =================================================================
    // APPLICATION STATE
    // =================================================================
    let currentQuestionIndex = 0;
    let userAnswers = [];

    // =================================================================
    // DOM ELEMENTS
    // =================================================================
    const views = {
        welcome: document.getElementById('welcome-view'),
        quiz: document.getElementById('quiz-view'),
        results: document.getElementById('results-view')
    };
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const viewResultsBtn = document.getElementById('view-results-btn');
    const viewReportBtn = document.getElementById('view-report-btn');
    const quizProgress = document.getElementById('quiz-progress');
    const questionNumber = document.getElementById('question-number');
    const questionTotal = document.getElementById('question-total');
    const questionText = document.getElementById('question-text');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const resultsChart = document.getElementById('results-chart');
    const primaryStyleName = document.getElementById('primary-style-name');
    const primaryStyleDescription = document.getElementById('primary-style-description');
    const stylesDetailsContainer = document.getElementById('styles-details-container');
    const downloadResultsBtn = document.getElementById('download-results-btn');
    const retakeQuizBtn = document.getElementById('retake-quiz-btn');

    // =================================================================
    // CORE APP LOGIC
    // =================================================================

    /**
     * Controls which view (section) is visible to the user.
     * @param {string} viewName - The key of the view to show ('welcome', 'quiz', 'results').
     */
    const showView = (viewName) => {
        Object.values(views).forEach(view => view.classList.remove('is-active'));
        if (views[viewName]) {
            views[viewName].classList.add('is-active');
        }
    };

    /**
     * Initializes the application on page load.
     */
    const init = () => {
        // Align progress bar and total count with the data length
        if (quizProgress && window.appData && Array.isArray(appData.questions)) {
            quizProgress.max = appData.questions.length;
            if (questionTotal) questionTotal.textContent = String(appData.questions.length);
        }
        if (localStorage.getItem('leadershipResults')) {
            viewResultsBtn.classList.remove('is-hidden');
            if (viewReportBtn) viewReportBtn.classList.remove('is-hidden');
        }
        setupEventListeners();
        showView('welcome');
    };

    /**
     * Starts the quiz, resets state, and shows the first question.
     */
    const startQuiz = () => {
        currentQuestionIndex = 0;
        userAnswers = [];
        renderQuestion();
        showView('quiz');
    };

    /**
     * Renders the current question and updates the progress bar.
     */
    const renderQuestion = () => {
        const question = appData.questions[currentQuestionIndex];
        questionText.textContent = question.text;
        questionNumber.textContent = currentQuestionIndex + 1;
        // Progress shows how many questions have been answered so far
        quizProgress.value = currentQuestionIndex;
    };

    /**
     * Handles the user selecting an answer.
     * @param {number} value - The value of the selected option (0-3).
     */
    const selectAnswer = (value) => {
        userAnswers.push(value);
        currentQuestionIndex++;
        if (currentQuestionIndex < appData.questions.length) {
            renderQuestion();
        } else {
            finishQuiz();
        }
    };

    /**
     * Finishes the quiz, calculates scores, and renders the results.
     */
    const finishQuiz = () => {
        const results = calculateResults();
        localStorage.setItem('leadershipResults', JSON.stringify(results));
        if (quizProgress) quizProgress.value = appData.questions.length;
        renderResults(results);
        showView('results');
    };

    /**
     * Calculates the scores for each leadership style based on user answers.
     * @returns {Array} An array of style objects, sorted by score.
     */
    const calculateResults = () => {
        const scores = {};
        // Initialize scores
        for (const style in appData.stylesInfo) {
            scores[style] = 0;
        }

        // Calculate scores based on the scoring map
        for (const style in appData.scoringMap) {
            appData.scoringMap[style].forEach(qIndex => {
                // qIndex is 1-based, userAnswers is 0-based
                if (userAnswers[qIndex - 1] !== undefined) {
                    scores[style] += userAnswers[qIndex - 1];
                }
            });
        }

        // Convert to array and sort
        const sortedResults = Object.keys(scores).map(style => ({
            name: style,
            score: scores[style],
            ...appData.stylesInfo[style]
        })).sort((a, b) => b.score - a.score);

        return sortedResults;
    };

    /**
     * Renders the results page with charts and descriptions.
     * @param {Array} resultsData - The sorted array of style objects.
     */
    const renderResults = (resultsData) => {
        // Clear previous results
        resultsChart.innerHTML = '';
        stylesDetailsContainer.innerHTML = '';

    // Compute max score dynamically from scoring map (questions per style * max per question 3)
    const questionsPerStyle = Math.max(...Object.values(appData.scoringMap).map(arr => arr.length));
    const maxScore = questionsPerStyle * 3;

        // Render the bar chart
        resultsData.forEach(style => {
            const percentage = (style.score / maxScore) * 100;
            const barHtml = `
                        <div class="result-bar-container">
                            <div class="result-label">${style.name}</div>
                            <div class="result-bar" style="width: ${percentage}%;">
                                ${style.score}
                            </div>
                        </div>
                    `;
            resultsChart.innerHTML += barHtml;
        });

        // Display the primary style (handle ties)
        const topScore = resultsData.length ? Math.max(...resultsData.map(s => s.score)) : 0;
        const topStyles = resultsData.filter(s => s.score === topScore);
        if (topStyles.length === 1) {
            primaryStyleName.textContent = topStyles[0].name;
            primaryStyleDescription.textContent = topStyles[0].description;
        } else {
            const names = topStyles.map(s => s.name);
            const niceJoin = (arr) => {
                if (arr.length <= 1) return arr.join('');
                if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
                return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;
            };
            primaryStyleName.textContent = niceJoin(names);
            primaryStyleDescription.textContent = `You show equally high scores in ${niceJoin(names)}. Consider blending the approaches described below.`;
        }

        // Display all style details in an accordion-like fashion
        resultsData.forEach(style => {
            const detailHtml = `
                        <div class="message is-info">
                            <div class="message-header">
                                <p>${style.name} (Score: ${style.score})</p>
                            </div>
                            <div class="message-body">
                                <strong>Description:</strong> ${style.description}<br><br>
                                <strong>Effectiveness:</strong> ${style.effectiveness}
                            </div>
                        </div>
                    `;
            stylesDetailsContainer.innerHTML += detailHtml;
        });
    };

    /**
     * Allows the user to download their results as a JSON file.
     */
    const downloadResults = () => {
        const resultsJson = localStorage.getItem('leadershipResults');
        if (!resultsJson) return;

        const blob = new Blob([resultsJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leadership-style-results.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // =================================================================
    // EVENT LISTENERS
    // =================================================================
    const setupEventListeners = () => {
        startQuizBtn.addEventListener('click', startQuiz);

        viewResultsBtn.addEventListener('click', () => {
            try {
                const raw = localStorage.getItem('leadershipResults');
                const saved = raw ? JSON.parse(raw) : null;
                if (!saved) return;
                // Accept both saved array of objects and score objects keyed by style name
                let normalized = null;
                if (Array.isArray(saved)) {
                    normalized = saved;
                } else if (typeof saved === 'object') {
                    normalized = Object.keys(saved)
                        .filter(k => appData.stylesInfo[k])
                        .map(k => ({ name: k, score: Number(saved[k] || 0), ...appData.stylesInfo[k] }))
                        .sort((a,b) => b.score - a.score);
                }
                if (normalized && normalized.length) {
                    renderResults(normalized);
                    showView('results');
                }
            } catch (_) { /* ignore */ }
        });

        quizOptions.forEach(button => {
            button.addEventListener('click', () => {
                const value = parseInt(button.dataset.value);
                selectAnswer(value);
            });
        });

        retakeQuizBtn.addEventListener('click', () => {
            showView('welcome');
        });

        downloadResultsBtn.addEventListener('click', downloadResults);
    };

    // =================================================================
    // INITIALIZE THE APP
    // =================================================================
    init();
});
