
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
                if (localStorage.getItem('communicationResults')) {
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
                localStorage.setItem('communicationResults', JSON.stringify(results));
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
                const maxScore = 15;

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
                const primaryStyle = resultsData[0];
                primaryStyleName.textContent = primaryStyle.name;
                primaryStyleSummary.textContent = primaryStyle.summary;
                
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
                    const savedResults = JSON.parse(localStorage.getItem('communicationResults'));
                    if (savedResults) {
                        renderResults(savedResults);
                        showView('results');
                    }
                });

                retakeQuizBtn.addEventListener('click', () => {
                    showView('welcome');
                });

                downloadResultsBtn.addEventListener('click', downloadResults);
            };
            
            // =... KICK OFF THE APP ...
            init();
        });