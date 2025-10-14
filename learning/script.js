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
        userAnswers.push(choice);
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
        renderResults(results);
        showView('results');
    };

    const calculateResults = () => {
        const scores = { 'V': 0, 'A': 0, 'R': 0, 'K': 0 };
        userAnswers.forEach(answer => {
            if (scores.hasOwnProperty(answer)) scores[answer]++;
        });

        const resultsArray = Object.values(appData.stylesInfo).map(info => ({
            name: info.id === 'R' ? 'Read/Write' : info.id === 'K' ? 'Kinesthetic' : info.name,
            score: scores[info.id],
            ...info
        }));

        resultsArray.sort((a, b) => b.score - a.score);
        return resultsArray;
    };

    const renderResults = (resultsData) => {
        resultsChart.innerHTML = '';
        studyStrategies.innerHTML = '';
        const maxScore = appData.questions.length;

        resultsData.forEach(style => {
            const displayName = style.name === 'Visual' || style.name === 'Auditory' ? style.name : (style.id === 'R' ? 'Read/Write' : 'Kinesthetic');
            const percentage = (style.score / maxScore) * 100;
            const barHtml = `
                        <div class="result-bar-container">
                            <div class="result-label">${displayName}</div>
                            <div class="result-bar" style="width: ${percentage > 5 ? percentage : 5}%;">
                                ${style.score}
                            </div>
                        </div>`;
            resultsChart.innerHTML += barHtml;
        });

        const primaryStyle = resultsData[0];
        primaryStyleName.textContent = primaryStyle.name === 'Visual' || primaryStyle.name === 'Auditory' ? primaryStyle.name : (primaryStyle.id === 'R' ? 'Read/Write' : 'Kinesthetic');
        primaryStyleSummary.textContent = primaryStyle.summary;

        let strategiesHtml = `<p>${primaryStyle.description}</p><ul>`;
        primaryStyle.strategies.forEach(tip => {
            strategiesHtml += `<li>${tip}</li>`;
        });
        strategiesHtml += '</ul>';
        studyStrategies.innerHTML = strategiesHtml;
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
            const savedResults = JSON.parse(localStorage.getItem('learningStyleResults'));
            if (savedResults) {
                renderResults(savedResults);
                showView('results');
            }
        });
        retakeQuizBtn.addEventListener('click', () => showView('welcome'));
        downloadResultsBtn.addEventListener('click', downloadResults);
    };

    init();
});