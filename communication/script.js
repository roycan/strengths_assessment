
document.addEventListener('DOMContentLoaded', () => {
            // =================================================================
            // DATA
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
            const quizProgress = document.getElementById('quiz-progress');
            const questionNumber = document.getElementById('question-number');
            const questionTotal = document.getElementById('question-total');
            const quizOptionsContainer = document.getElementById('quiz-options-container');
            const resultsChart = document.getElementById('results-chart');
            const primaryStyleName = document.getElementById('primary-style-name');
            const primaryStyleSummary = document.getElementById('primary-style-summary');
            const stylesDetailsContainer = document.getElementById('styles-details-container');
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
                // Sync progress max and total count with data
                if (quizProgress && window.appData && Array.isArray(appData.questions)) {
                    quizProgress.max = appData.questions.length;
                    if (questionTotal) questionTotal.textContent = String(appData.questions.length);
                }
                if (localStorage.getItem('communicationResults')) {
                    viewResultsBtn.classList.remove('is-hidden');
                        const reportBtn = document.getElementById('view-report-btn');
                        if (reportBtn) reportBtn.classList.remove('is-hidden');
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
                const question = appData.questions[currentQuestionIndex];
                questionNumber.textContent = currentQuestionIndex + 1;
                quizProgress.value = currentQuestionIndex;
                quizOptionsContainer.innerHTML = ''; // Clear previous options

                ['a', 'b', 'c', 'd'].forEach(key => {
                    const optionHtml = `
                        <div class="column is-half-tablet is-full-mobile">
                            <div class="box quiz-option-card has-text-centered" data-choice="${key.toUpperCase()}">
                                <p class="is-size-5">${question[key]}</p>
                            </div>
                        </div>`;
                    quizOptionsContainer.innerHTML += optionHtml;
                });
                
                // Add event listeners to newly created options
                document.querySelectorAll('.quiz-option-card').forEach(card => {
                    card.addEventListener('click', () => {
                        selectAnswer(card.dataset.choice);
                    });
                });
            };
            
            const selectAnswer = (choice) => {
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
                localStorage.setItem('communicationResults', JSON.stringify(results));
                if (quizProgress) quizProgress.value = appData.questions.length;
                renderResults(results);
                showView('results');
            };

            const calculateResults = () => {
                const scores = { 'A': 0, 'B': 0, 'C': 0, 'D': 0 };
                userAnswers.forEach(answer => {
                    if (scores.hasOwnProperty(answer)) {
                        scores[answer]++;
                    }
                });

                const resultsArray = Object.entries(appData.stylesInfo).map(([name, info]) => ({
                    name: name,
                    score: scores[info.id],
                    ...info
                }));

                resultsArray.sort((a, b) => b.score - a.score);
                return resultsArray;
            };

            const renderResults = (resultsData) => {
                resultsChart.innerHTML = '';
                stylesDetailsContainer.innerHTML = '';
                const maxScore = appData.questions.length;

                // Render bar chart
                resultsData.forEach(style => {
                    const percentage = (style.score / maxScore) * 100;
                    const barHtml = `
                        <div class="result-bar-container">
                            <div class="result-label">${style.name}</div>
                            <div class="result-bar" style="width: ${percentage > 5 ? percentage : 5}%;">
                                ${style.score}
                            </div>
                        </div>`;
                    resultsChart.innerHTML += barHtml;
                });
                
                // Display primary style
                const topScore = resultsData.length ? Math.max(...resultsData.map(s => s.score)) : 0;
                const topStyles = resultsData.filter(s => s.score === topScore);
                if (topStyles.length === 1) {
                    primaryStyleName.textContent = topStyles[0].name;
                    primaryStyleSummary.textContent = topStyles[0].summary || '';
                } else {
                    const names = topStyles.map(s => s.name);
                    const niceJoin = (arr) => {
                        if (arr.length <= 1) return arr.join('');
                        if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
                        return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;
                    };
                    primaryStyleName.textContent = niceJoin(names);
                    primaryStyleSummary.textContent = `You show equally strong preferences for ${niceJoin(names)}. Try combining the approaches below.`;
                }
                
                // Display all style details
                Object.values(appData.stylesInfo).forEach(styleInfo => {
                     const detailHtml = `
                        <div class="message is-info">
                            <div class="message-header"><p>${styleInfo.name}</p></div>
                            <div class="message-body">
                                <strong>Description:</strong> ${styleInfo.description}<br><br>
                                <strong>How to Adapt:</strong> ${styleInfo.adaptation}
                            </div>
                        </div>`;
                    stylesDetailsContainer.innerHTML += detailHtml;
                });
            };

            const downloadResults = () => {
                const resultsJson = localStorage.getItem('communicationResults');
                if (!resultsJson) return;

                const blob = new Blob([resultsJson], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'communication-style-results.json';
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
                        const raw = localStorage.getItem('communicationResults');
                        const saved = raw ? JSON.parse(raw) : null;
                        let normalized = null;
                        if (Array.isArray(saved)) {
                            normalized = saved;
                        } else if (saved && typeof saved === 'object') {
                            // Accept object like {A: n, B: n, C: n, D: n}
                            const byId = ['A','B','C','D']
                                .filter(k => typeof saved[k] === 'number')
                                .map(id => {
                                    const infoEntry = Object.entries(appData.stylesInfo).find(([,info]) => info.id === id);
                                    if (!infoEntry) return null;
                                    const [name, info] = infoEntry;
                                    return { name, score: Number(saved[id] || 0), ...info };
                                })
                                .filter(Boolean)
                                .sort((a,b) => b.score - a.score);
                            normalized = byId.length ? byId : null;
                        }
                        if (normalized && normalized.length) {
                            renderResults(normalized);
                            showView('results');
                        }
                    } catch (_) { /* ignore */ }
                });

                retakeQuizBtn.addEventListener('click', () => {
                    showView('welcome');
                });

                downloadResultsBtn.addEventListener('click', downloadResults);
            };
            
            // =... KICK OFF THE APP ...
            init();
        });