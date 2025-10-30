// =================================================================
// VARK Learning Style Report - Dynamic Content Population
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Load results from localStorage
    const resultsData = loadResults();
    
    if (!resultsData) {
        showNoResults();
        return;
    }

    // Generate and populate the report
    generateReport(resultsData);
});

// =================================================================
// DATA LOADING
// =================================================================

function loadResults() {
    try {
        const raw = localStorage.getItem('learningStyleResults');
        if (!raw) return null;
        
        const data = JSON.parse(raw);
        
        // Normalize data format
        let normalized = [];
        if (Array.isArray(data)) {
            normalized = data.map(s => ({
                id: String(s.id || '').toUpperCase(),
                score: Number(s.score || 0)
            })).filter(s => ['V', 'A', 'R', 'K'].includes(s.id));
        } else if (data && typeof data === 'object') {
            normalized = ['V', 'A', 'R', 'K']
                .filter(k => typeof data[k] === 'number')
                .map(id => ({ id, score: Number(data[id]) }));
        }
        
        if (normalized.length === 0) return null;
        
        // Sort by score descending
        normalized.sort((a, b) => b.score - a.score);
        
        return normalized;
    } catch (e) {
        console.error('Error loading results:', e);
        return null;
    }
}

function showNoResults() {
    document.getElementById('no-results').style.display = 'block';
}

// =================================================================
// MAIN REPORT GENERATION
// =================================================================

function generateReport(resultsData) {
    document.getElementById('report-content').style.display = 'block';
    
    // Set report date
    const now = new Date();
    document.getElementById('report-date').textContent = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Identify primary style(s)
    const topScore = resultsData[0].score;
    const primaryStyles = resultsData.filter(s => s.score === topScore);
    const isMultiModal = primaryStyles.length > 1;
    
    // Generate each section
    populateProfileSection(resultsData, primaryStyles, isMultiModal);
    populateUnderstandingSection(primaryStyles, isMultiModal);
    populateStrategiesSection(primaryStyles, isMultiModal);
    populateAdaptingSection(primaryStyles);
    populateToolsSection(primaryStyles);
    populateQuickReference();
}

// =================================================================
// SECTION POPULATION FUNCTIONS
// =================================================================

function populateProfileSection(resultsData, primaryStyles, isMultiModal) {
    const idToName = { V: 'Visual', A: 'Auditory', R: 'Read/Write', K: 'Kinesthetic' };
    const styleNames = primaryStyles.map(s => idToName[s.id]);
    
    // Display primary style name
    if (styleNames.length === 1) {
        document.getElementById('primary-style-display').textContent = styleNames[0] + ' Learner';
        const info = window.appData.stylesInfo[styleNames[0]];
        document.getElementById('primary-summary').textContent = info ? info.summary : '';
    } else {
        document.getElementById('primary-style-display').textContent = styleNames.join(' + ') + ' Learner';
        document.getElementById('primary-summary').textContent = 
            `You have a balanced multi-modal learning preference across ${styleNames.join(' and ')} styles.`;
    }
    
    // Score chart
    const chartContainer = document.getElementById('score-chart-container');
    resultsData.forEach(style => {
        const name = idToName[style.id];
        const maxScore = 15;
        const percentage = Math.max((style.score / maxScore) * 100, 5);
        
        const row = document.createElement('div');
        row.className = 'chart-row';
        row.innerHTML = `
            <div class="chart-label">${name}</div>
            <div class="chart-bar" style="width: ${percentage}%">${style.score}/15</div>
        `;
        chartContainer.appendChild(row);
    });
    
    // Multi-modal note
    if (isMultiModal) {
        document.getElementById('multimodal-intro').style.display = 'block';
        document.getElementById('multimodal-text').textContent = 
            `Your scores show you're a multi-modal learner (60-70% of students are!). ` +
            `This is an advantage—you can flexibly combine strategies from both ${styleNames.join(' and ')} approaches.`;
    }
}

function populateUnderstandingSection(primaryStyles, isMultiModal) {
    const container = document.getElementById('style-details-container');
    const idToName = { V: 'Visual', A: 'Auditory', R: 'Read/Write', K: 'Kinesthetic' };
    
    primaryStyles.forEach(style => {
        const name = idToName[style.id];
        const info = window.appData.stylesInfo[name];
        
        const section = document.createElement('div');
        section.className = 'strategy-box';
        section.innerHTML = `
            <h4><i class="fas fa-star"></i> ${name} Learning</h4>
            <p><strong>What it means:</strong> ${info.description}</p>
            <p><strong>Your strengths:</strong></p>
            <ul style="margin-left: 1.5rem;">
                ${getStrengths(style.id).map(s => `<li>${s}</li>`).join('')}
            </ul>
            <p><strong>How you learn best:</strong></p>
            <ul style="margin-left: 1.5rem;">
                ${info.strategies.map(s => `<li>${s}</li>`).join('')}
            </ul>
        `;
        container.appendChild(section);
    });
    
    // Add combo strategies for multi-modal
    if (isMultiModal) {
        const comboSection = document.createElement('div');
        comboSection.className = 'strategy-box';
        comboSection.style.background = '#e8f5e9';
        comboSection.innerHTML = `
            <h4><i class="fas fa-puzzle-piece"></i> Multi-Modal Combination Strategies</h4>
            <p>Since you scored high in multiple styles, try these combo approaches:</p>
            <ul style="margin-left: 1.5rem;">
                ${getComboStrategies(primaryStyles.map(s => s.id)).map(s => `<li>${s}</li>`).join('')}
            </ul>
        `;
        container.appendChild(comboSection);
    }
}

function populateStrategiesSection(primaryStyles, isMultiModal) {
    const container = document.getElementById('subject-strategies-container');
    const subjects = ['Science & Math', 'Languages & Literature', 'History & Social Studies', 'Test Preparation'];
    
    subjects.forEach(subject => {
        const subjectBox = document.createElement('div');
        subjectBox.className = 'strategy-box';
        
        const strategies = primaryStyles.flatMap(s => 
            getSubjectStrategies(s.id, subject)
        );
        
        subjectBox.innerHTML = `
            <h4><i class="fas fa-book"></i> ${subject}</h4>
            <ul style="margin-left: 1.5rem;">
                ${strategies.slice(0, 5).map(s => `<li>${s}</li>`).join('')}
            </ul>
        `;
        container.appendChild(subjectBox);
    });
    
    // Quick wins
    const quickWinsList = document.getElementById('quick-wins-list');
    const quickWins = getQuickWins(primaryStyles.map(s => s.id));
    quickWins.forEach(win => {
        const li = document.createElement('li');
        li.textContent = win;
        quickWinsList.appendChild(li);
    });
}

function populateAdaptingSection(primaryStyles) {
    const envContainer = document.getElementById('environment-strategies-container');
    const environments = [
        { name: 'Lecture-Heavy Classes', icon: 'chalkboard-teacher' },
        { name: 'Textbook-Heavy Classes', icon: 'book' },
        { name: 'Online/Video Learning', icon: 'laptop' },
        { name: 'Lab or Hands-On Classes', icon: 'flask' }
    ];
    
    environments.forEach(env => {
        const envBox = document.createElement('div');
        envBox.className = 'strategy-box';
        
        const tips = primaryStyles.flatMap(s => 
            getEnvironmentAdaptations(s.id, env.name)
        );
        
        envBox.innerHTML = `
            <h4><i class="fas fa-${env.icon}"></i> ${env.name}</h4>
            <ul style="margin-left: 1.5rem;">
                ${tips.slice(0, 3).map(t => `<li>${t}</li>`).join('')}
            </ul>
        `;
        envContainer.appendChild(envBox);
    });
    
    // Pitfalls
    const pitfallsContainer = document.getElementById('pitfalls-container');
    primaryStyles.forEach(style => {
        const pitfalls = getPitfalls(style.id);
        pitfalls.forEach(pitfall => {
            const item = document.createElement('div');
            item.className = 'pitfall-item';
            item.innerHTML = `
                <p><strong>Pitfall:</strong> ${pitfall.problem}</p>
                <p><span class="solution">Solution:</span> ${pitfall.solution}</p>
            `;
            pitfallsContainer.appendChild(item);
        });
    });
}

function populateToolsSection(primaryStyles) {
    const container = document.getElementById('tools-container');
    const allTools = primaryStyles.flatMap(s => getToolsForStyle(s.id));
    
    // Remove duplicates by tool name
    const uniqueTools = [];
    const seen = new Set();
    allTools.forEach(tool => {
        if (!seen.has(tool.name)) {
            seen.add(tool.name);
            uniqueTools.push(tool);
        }
    });
    
    // Group tools by category
    const categories = ['Note-Taking & Organization', 'Visual Learning', 'Audio Learning', 
                       'Practice & Memorization', 'Collaboration'];
    
    categories.forEach(category => {
        const categoryTools = uniqueTools.filter(t => t.category === category);
        if (categoryTools.length === 0) return;
        
        const categorySection = document.createElement('div');
        categorySection.innerHTML = `<h3>${category}</h3>`;
        
        const grid = document.createElement('div');
        grid.className = 'tool-grid';
        
        categoryTools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                <div class="tool-name"><i class="fas fa-${tool.icon || 'star'}"></i> ${tool.name}</div>
                <div class="tool-desc">${tool.description}</div>
            `;
            grid.appendChild(card);
        });
        
        categorySection.appendChild(grid);
        container.appendChild(categorySection);
    });
}

function populateQuickReference() {
    const container = document.getElementById('all-styles-container');
    const allStyles = ['Visual', 'Auditory', 'Read/Write', 'Kinesthetic'];
    
    allStyles.forEach(styleName => {
        const info = window.appData.stylesInfo[styleName];
        const box = document.createElement('div');
        box.className = 'strategy-box';
        box.innerHTML = `
            <h4>${styleName} Learners</h4>
            <p>${info.description}</p>
            <p><strong>Top 3 strategies:</strong></p>
            <ul style="margin-left: 1.5rem;">
                ${info.strategies.slice(0, 3).map(s => `<li>${s}</li>`).join('')}
            </ul>
        `;
        container.appendChild(box);
    });
}

// =================================================================
// CONTENT HELPER FUNCTIONS
// =================================================================

function getStrengths(styleId) {
    const strengths = {
        V: [
            'You can quickly grasp information from charts, graphs, and diagrams',
            'You remember faces better than names',
            'You can visualize concepts in your mind',
            'You notice visual details others might miss'
        ],
        A: [
            'You remember what you hear better than what you read',
            'You can explain concepts clearly to others',
            'You benefit from group discussions and talking through problems',
            'You can focus on audio content (podcasts, lectures) effectively'
        ],
        R: [
            'You excel at taking detailed notes and organizing information',
            'You can process complex written material efficiently',
            'You build a strong written record of your learning',
            'You can articulate ideas precisely through writing'
        ],
        K: [
            'You learn by doing and experiencing',
            'You can stay engaged through hands-on activities',
            'You have good "muscle memory" for procedures',
            'You think while moving and can multitask physically'
        ]
    };
    return strengths[styleId] || [];
}

function getComboStrategies(styleIds) {
    const combos = {
        'V-A': [
            'Watch educational videos with clear narration and visuals',
            'Create concept maps while talking through them out loud',
            'Join study groups where you can draw diagrams while discussing',
            'Use YouTube tutorials that combine visual demonstrations with explanations',
            'Record yourself explaining concepts while drawing them'
        ],
        'V-R': [
            'Create detailed, color-coded notes with diagrams and labels',
            'Use Cornell note-taking with visual sketches in the margin',
            'Make flashcards with images on one side, text on the other',
            'Annotate diagrams with written explanations',
            'Use apps like Notion or OneNote that blend text and visuals'
        ],
        'V-K': [
            'Build physical models or use manipulatives while studying',
            'Create mind maps with movable sticky notes',
            'Use gesture and movement while visualizing concepts',
            'Draw diagrams while walking or pacing',
            'Use interactive simulations and virtual labs'
        ],
        'A-R': [
            'Read your notes aloud and record them as audio',
            'Write summaries while listening to lectures or audiobooks',
            'Use text-to-speech to hear your written notes',
            'Participate in online forums where you write and discuss',
            'Create written study guides and then record yourself reading them'
        ],
        'A-K': [
            'Discuss concepts while doing hands-on activities',
            'Talk through problems while solving them physically',
            'Join lab groups where you can work and talk simultaneously',
            'Use rhythm and movement while reciting information',
            'Record voice memos while conducting experiments'
        ],
        'R-K': [
            'Take notes while doing practice problems',
            'Write step-by-step procedures then immediately practice them',
            'Use active reading: annotate while physically interacting with materials',
            'Create written lab reports during or immediately after experiments',
            'Type notes while building or creating something related'
        ]
    };
    
    // Try all two-way combinations
    const results = [];
    for (let i = 0; i < styleIds.length; i++) {
        for (let j = i + 1; j < styleIds.length; j++) {
            const key1 = `${styleIds[i]}-${styleIds[j]}`;
            const key2 = `${styleIds[j]}-${styleIds[i]}`;
            if (combos[key1]) results.push(...combos[key1]);
            else if (combos[key2]) results.push(...combos[key2]);
        }
    }
    
    return results.length > 0 ? results : [
        'Combine strategies from both your primary styles',
        'Experiment with different approaches for different subjects',
        'Use multi-sensory study sessions that engage multiple modalities'
    ];
}

function getSubjectStrategies(styleId, subject) {
    const strategies = {
        'Science & Math': {
            V: [
                'Use color-coded formulas and equation sheets',
                'Draw diagrams for word problems and chemistry structures',
                'Watch Khan Academy or other visual tutorial videos',
                'Create flowcharts for problem-solving steps',
                'Use graphing tools like Desmos or GeoGebra'
            ],
            A: [
                'Explain solutions out loud to yourself or a study partner',
                'Listen to science podcasts (e.g., Radiolab, Science Vs)',
                'Use mnemonic songs for formulas and constants',
                'Join study groups to discuss problem-solving approaches',
                'Record voice memos explaining concepts in your own words'
            ],
            R: [
                'Rewrite notes from textbooks in your own words',
                'Create formula sheets with written explanations',
                'Summarize each chapter in bullet-point format',
                'Write out step-by-step solutions to practice problems',
                'Keep a science journal with written observations'
            ],
            K: [
                'Do hands-on lab experiments whenever possible',
                'Use physical manipulatives (blocks for algebra, molecular models)',
                'Take frequent breaks to move while memorizing formulas',
                'Build models or demonstrations of scientific concepts',
                'Act out scenarios for physics problems (motion, forces)'
            ]
        },
        'Languages & Literature': {
            V: [
                'Use visual vocabulary apps like Drops or Memrise',
                'Watch foreign language films with subtitles',
                'Create story maps and character relationship diagrams',
                'Use color-coding for grammar rules and vocabulary themes',
                'Draw scenes from stories to remember key plot points'
            ],
            A: [
                'Listen to audiobooks and language-learning podcasts',
                'Read passages aloud with expression to improve fluency',
                'Use language exchange apps like Tandem to practice speaking',
                'Participate in book clubs or class discussions',
                'Record yourself reading and listen back to improve pronunciation'
            ],
            R: [
                'Keep detailed vocabulary lists organized by theme',
                'Write summaries of each chapter as you read',
                'Practice writing essays and short responses regularly',
                'Use flashcard apps like Quizlet with written definitions',
                'Maintain a reading journal with quotes and analysis'
            ],
            K: [
                'Act out scenes from plays or dialogues',
                'Use gesture-based language learning (Total Physical Response)',
                'Create physical flashcards you can sort and manipulate',
                'Type or write while listening to language audio',
                'Use apps like Duolingo that have interactive exercises'
            ]
        },
        'History & Social Studies': {
            V: [
                'Create timelines with color-coded events',
                'Use historical maps and infographics (e.g., Visual Capitalist)',
                'Watch documentaries and historical films',
                'Make concept maps connecting causes and effects',
                'Use tools like Coggle or Lucidchart for mind mapping'
            ],
            A: [
                'Listen to history podcasts like Hardcore History or BackStory',
                'Discuss historical events and debates with classmates',
                'Explain historical causation out loud in your own words',
                'Record yourself summarizing key events and listen back',
                'Attend talks or watch recorded lectures on historical topics'
            ],
            R: [
                'Take Cornell notes from textbook readings',
                'Create written summaries of each historical period',
                'Write comparative essays between different events/eras',
                'Make detailed outlines of causes and consequences',
                'Keep an organized binder with all notes and handouts'
            ],
            K: [
                'Visit historical sites, museums, or virtual tours',
                'Create physical timelines using string and cards',
                'Role-play historical figures or events',
                'Build dioramas or models of historical scenes',
                'Use gesture and movement to remember key dates and facts'
            ]
        },
        'Test Preparation': {
            V: [
                'Create visual study guides with charts and diagrams',
                'Use color-coding to prioritize topics by difficulty',
                'Watch review videos and pause to take visual notes',
                'Make poster-sized summary sheets to hang in your room',
                'Use visual mnemonics (memory palace technique)'
            ],
            A: [
                'Create and listen to recorded review sessions',
                'Form study groups for verbal review and quizzing',
                'Read practice questions aloud and talk through answers',
                'Use text-to-speech to hear study materials',
                'Explain concepts to someone else as if teaching'
            ],
            R: [
                'Write practice essays under timed conditions',
                'Create comprehensive study guides in writing',
                'Rewrite your notes in summary form before the test',
                'Do written practice problems from past exams',
                'Make flashcards with written questions and answers'
            ],
            K: [
                'Do practice problems actively (write, draw, calculate)',
                'Study in short bursts with movement breaks',
                'Use physical flashcards you can sort into "know" and "review" piles',
                'Walk or pace while reciting memorized information',
                'Use stress balls or fidgets during review sessions'
            ]
        }
    };
    
    return strategies[subject]?.[styleId] || [];
}

function getQuickWins(styleIds) {
    const wins = {
        V: [
            'Add one diagram or sketch to your notes today',
            'Use 3 different highlighter colors in your next reading',
            'Watch a 5-minute YouTube video on your hardest topic',
            'Draw a simple mind map of today\'s lesson',
            'Find one infographic related to your current unit'
        ],
        A: [
            'Explain one concept to a friend or family member out loud',
            'Record a 2-minute voice memo summarizing today\'s lesson',
            'Listen to a 10-minute podcast on your subject area',
            'Read your next assignment aloud to yourself',
            'Join or start a study group for one upcoming test'
        ],
        R: [
            'Rewrite your class notes in your own words after school',
            'Create a one-page summary of your latest chapter',
            'Start a bullet journal for organizing assignments',
            'Make 10 flashcards for your next quiz',
            'Write three practice questions about today\'s material'
        ],
        K: [
            'Take a 5-minute walk while reviewing today\'s vocabulary',
            'Build or draw something related to today\'s science lesson',
            'Do 10 practice problems by hand (not just reading)',
            'Study for 25 minutes, then take a movement break',
            'Use a fidget tool during your next study session'
        ]
    };
    
    const allWins = styleIds.flatMap(id => wins[id] || []);
    return allWins.slice(0, 7);
}

function getEnvironmentAdaptations(styleId, environment) {
    const adaptations = {
        'Lecture-Heavy Classes': {
            V: [
                'Ask the teacher if slides will be available; review before/after class',
                'Sketch quick diagrams in your notes as the teacher talks',
                'Sit where you can see the board clearly'
            ],
            A: [
                'Focus intently on listening; resist distractions',
                'Ask clarifying questions during or after class',
                'Record lectures (with permission) and re-listen'
            ],
            R: [
                'Take detailed notes during lecture in your preferred format',
                'Rewrite and expand notes immediately after class',
                'Compare your notes with classmates to fill gaps'
            ],
            K: [
                'Doodle or take notes actively to stay engaged',
                'Take brief stretch breaks between classes',
                'Review notes by rewriting or doing practice problems soon after'
            ]
        },
        'Textbook-Heavy Classes': {
            V: [
                'Highlight and annotate with visual markers',
                'Convert text into diagrams and flowcharts as you read',
                'Use visual apps to supplement dense readings'
            ],
            A: [
                'Read sections aloud or use text-to-speech',
                'Discuss readings with classmates or in study groups',
                'Create verbal summaries after each section'
            ],
            R: [
                'This is your strength! Take detailed notes as you read',
                'Summarize each section in writing',
                'Create outlines of chapters before tests'
            ],
            K: [
                'Take breaks every 15-20 minutes to move',
                'Type notes or write while reading (active engagement)',
                'Apply textbook concepts by doing practice problems immediately'
            ]
        },
        'Online/Video Learning': {
            V: [
                'Use videos with clear visuals and subtitles',
                'Take screenshots of key visuals for later review',
                'Adjust playback speed to match your processing pace'
            ],
            A: [
                'Focus on the audio explanation; minimize visual distractions',
                'Pause frequently to repeat key points out loud',
                'Use video transcripts to supplement listening'
            ],
            R: [
                'Always access transcripts or captions if available',
                'Take written notes while watching',
                'Follow up with written summaries of video content'
            ],
            K: [
                'Pause frequently to try exercises or simulations',
                'Take notes by hand while watching (engages movement)',
                'Immediately apply what you learned in practice problems'
            ]
        },
        'Lab or Hands-On Classes': {
            V: [
                'Take photos of setup and results',
                'Draw diagrams of apparatus and procedures',
                'Watch demo videos before lab to visualize steps'
            ],
            A: [
                'Discuss procedures with lab partners before starting',
                'Verbally confirm each step before performing it',
                'Explain results out loud to solidify understanding'
            ],
            R: [
                'Read the full lab procedure before starting',
                'Take detailed written notes during the lab',
                'Write up lab reports immediately while memory is fresh'
            ],
            K: [
                'This is your strength! Engage fully in hands-on work',
                'Volunteer to demonstrate techniques',
                'Repeat procedures to build muscle memory'
            ]
        }
    };
    
    return adaptations[environment]?.[styleId] || [];
}

function getPitfalls(styleId) {
    const pitfalls = {
        V: [
            {
                problem: 'Relying too heavily on visuals without deeper processing',
                solution: 'After looking at a diagram, close your eyes and try to recall it from memory. Then explain it in words to ensure understanding.'
            },
            {
                problem: 'Struggling with pure lecture or audio-based content',
                solution: 'Sketch visuals as you listen. Even rough drawings help anchor auditory information in your visual memory.'
            },
            {
                problem: 'Getting distracted by visual clutter or irrelevant images',
                solution: 'Create clean, focused study spaces. When reading, use a blank sheet to cover surrounding text.'
            }
        ],
        A: [
            {
                problem: 'Over-relying on study groups and not enough solo review',
                solution: 'Balance group discussions with individual practice. Record group sessions and listen back solo to reinforce.'
            },
            {
                problem: 'Difficulty with silent reading comprehension',
                solution: 'Subvocalize (quietly mouth words) as you read. Use text-to-speech apps for important passages.'
            },
            {
                problem: 'Distraction from background noise',
                solution: 'Use noise-canceling headphones with white noise or instrumental music. Find quiet study spaces when doing focused work.'
            }
        ],
        R: [
            {
                problem: 'Taking too many notes and not enough active practice',
                solution: 'Set a timer: spend 60% of study time on notes, 40% on practice problems or quizzes. Notes are preparation, not the end goal.'
            },
            {
                problem: 'Struggle with visual-spatial tasks (geometry, maps, diagrams)',
                solution: 'Supplement visual materials with written descriptions. Break diagrams into written step-by-step processes.'
            },
            {
                problem: 'Difficulty in hands-on or improvised situations',
                solution: 'Write procedures before labs. Create written scripts for presentations. Over-prepare with written outlines.'
            }
        ],
        K: [
            {
                problem: 'Restlessness during long lectures or reading sessions',
                solution: 'Use the Pomodoro technique (25 min work, 5 min movement break). Doodle or take notes actively to stay engaged.'
            },
            {
                problem: 'Difficulty retaining purely theoretical information',
                solution: 'Always connect theory to concrete examples. Ask "How would I use this?" or "What\'s a real-world example?"'
            },
            {
                problem: 'Rushing through written work or skipping reading',
                solution: 'Build in active breaks during reading/writing. Use fidget tools while reading. Reward reading with hands-on activities.'
            }
        ]
    };
    
    return pitfalls[styleId] || [];
}

function getToolsForStyle(styleId) {
    const tools = {
        V: [
            { name: 'Canva', category: 'Visual Learning', icon: 'paint-brush', 
              description: 'Create visual study guides, infographics, and posters.' },
            { name: 'Coggle', category: 'Visual Learning', icon: 'project-diagram', 
              description: 'Mind mapping tool for visualizing concepts and connections.' },
            { name: 'Lucidchart', category: 'Visual Learning', icon: 'sitemap', 
              description: 'Flowcharts, diagrams, and concept maps for complex processes.' },
            { name: 'Notion', category: 'Note-Taking & Organization', icon: 'sticky-note', 
              description: 'Visual note-taking with embeds, databases, and galleries.' },
            { name: 'Desmos', category: 'Visual Learning', icon: 'chart-line', 
              description: 'Interactive graphing calculator for visualizing math.' },
            { name: 'Khan Academy', category: 'Visual Learning', icon: 'video', 
              description: 'Video lessons with clear visuals across all subjects.' },
            { name: 'YouTube (CrashCourse, Kurzgesagt)', category: 'Visual Learning', icon: 'youtube', 
              description: 'Educational videos with animations and graphics.' },
            { name: 'Miro', category: 'Visual Learning', icon: 'chalkboard', 
              description: 'Digital whiteboard for brainstorming and mapping ideas.' },
            { name: 'Piktochart', category: 'Visual Learning', icon: 'chart-pie', 
              description: 'Create infographics and visual presentations.' }
        ],
        A: [
            { name: 'Otter.ai', category: 'Audio Learning', icon: 'microphone', 
              description: 'Transcribe lectures and record study sessions.' },
            { name: 'Audible / Audiobooks', category: 'Audio Learning', icon: 'book-reader', 
              description: 'Listen to textbooks and literature.' },
            { name: 'Spotify (Podcasts)', category: 'Audio Learning', icon: 'podcast', 
              description: 'Educational podcasts on every subject.' },
            { name: 'Voice Memos (built-in)', category: 'Audio Learning', icon: 'microphone-alt', 
              description: 'Record your own explanations and review audio.' },
            { name: 'Natural Reader', category: 'Audio Learning', icon: 'volume-up', 
              description: 'Text-to-speech for any written material.' },
            { name: 'Discord / Study Together', category: 'Collaboration', icon: 'users', 
              description: 'Voice chat study rooms with classmates.' },
            { name: 'SoundCloud (Study Music)', category: 'Audio Learning', icon: 'music', 
              description: 'Background music or white noise for studying.' }
        ],
        R: [
            { name: 'Notion', category: 'Note-Taking & Organization', icon: 'book', 
              description: 'Comprehensive note-taking and organization system.' },
            { name: 'Evernote', category: 'Note-Taking & Organization', icon: 'file-alt', 
              description: 'Digital notebook for organizing written notes.' },
            { name: 'Microsoft OneNote', category: 'Note-Taking & Organization', icon: 'sticky-note', 
              description: 'Flexible digital notebook with organization features.' },
            { name: 'Google Docs', category: 'Note-Taking & Organization', icon: 'file-word', 
              description: 'Collaborative writing and note-taking.' },
            { name: 'Quizlet', category: 'Practice & Memorization', icon: 'clipboard-list', 
              description: 'Text-based flashcards and study sets.' },
            { name: 'Grammarly', category: 'Note-Taking & Organization', icon: 'spell-check', 
              description: 'Improve your written work with editing suggestions.' },
            { name: 'Zotero', category: 'Note-Taking & Organization', icon: 'bookmark', 
              description: 'Organize research sources and citations.' },
            { name: 'RemNote', category: 'Practice & Memorization', icon: 'brain', 
              description: 'Note-taking with built-in spaced repetition.' }
        ],
        K: [
            { name: 'Anki', category: 'Practice & Memorization', icon: 'layer-group', 
              description: 'Spaced repetition flashcards you actively practice.' },
            { name: 'Quizlet', category: 'Practice & Memorization', icon: 'gamepad', 
              description: 'Interactive games and matching activities.' },
            { name: 'PhET Simulations', category: 'Practice & Memorization', icon: 'flask', 
              description: 'Interactive science and math simulations.' },
            { name: 'Duolingo', category: 'Practice & Memorization', icon: 'language', 
              description: 'Gamified, interactive language learning.' },
            { name: 'Kahoot', category: 'Practice & Memorization', icon: 'trophy', 
              description: 'Interactive quizzes and game-based learning.' },
            { name: 'Forest App', category: 'Practice & Memorization', icon: 'tree', 
              description: 'Stay focused with movement breaks built in.' },
            { name: 'GeoGebra', category: 'Practice & Memorization', icon: 'shapes', 
              description: 'Interactive geometry and algebra tool.' },
            { name: 'Labster', category: 'Practice & Memorization', icon: 'microscope', 
              description: 'Virtual science labs you can interact with.' }
        ]
    };
    
    // Add some universal tools
    const universal = [
        { name: 'Google Calendar', category: 'Note-Taking & Organization', icon: 'calendar', 
          description: 'Schedule study sessions and track deadlines.' },
        { name: 'Todoist', category: 'Note-Taking & Organization', icon: 'tasks', 
          description: 'Task management for assignments and projects.' },
        { name: 'Trello', category: 'Note-Taking & Organization', icon: 'columns', 
          description: 'Visual project board for organizing work.' },
        { name: 'Zoom / Google Meet', category: 'Collaboration', icon: 'video', 
          description: 'Video study sessions with classmates.' },
        { name: 'Slack', category: 'Collaboration', icon: 'comment-dots', 
          description: 'Organize class discussions and group projects.' }
    ];
    
    return [...(tools[styleId] || []), ...universal];
}
