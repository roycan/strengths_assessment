// js/report.js
(function(){
  const KEY_V3 = (typeof APP_KEY === 'string' && APP_KEY) ? APP_KEY : 'scholars_compass_via_v3';
  const KEY_V2 = 'scholars_compass_via_v2';
  const KEY_V1 = 'scholars_compass_via_v1';
  const MAX_PER_STRENGTH = 16;

  // Primary category mapping (labels only)
  const PRIMARY_GROUP = {
    'Creativity':'Analytical', 'Curiosity':'Analytical', 'Judgment':'Analytical', 'Love of Learning':'Analytical', 'Perspective':'Analytical',
    'Love':'Interpersonal', 'Kindness':'Interpersonal', 'Social Intelligence':'Interpersonal', 'Humor':'Interpersonal', 'Leadership':'Interpersonal', 'Teamwork':'Interpersonal', 'Fairness':'Interpersonal',
    'Prudence':'Intrapersonal', 'Self-Regulation':'Intrapersonal', 'Perseverance':'Intrapersonal', 'Forgiveness':'Intrapersonal', 'Humility':'Intrapersonal', 'Honesty':'Intrapersonal',
    'Gratitude':'Emotional', 'Hope':'Emotional', 'Spirituality':'Emotional', 'Appreciation of Beauty':'Emotional', 'Zest':'Emotional', 'Bravery':'Emotional'
  };

  // Domain explanations
  const DOMAIN_INFO = {
    Analytical: {
      name: 'Analytical',
      coreQuestion: 'How do you learn, question, and make sense of the world?',
      description: 'You process ideas, spot patterns, and refine understanding. These strengths help you learn deeply, think critically, and innovate.'
    },
    Interpersonal: {
      name: 'Interpersonal',
      coreQuestion: 'How do you connect with and support others?',
      description: 'You build relationships, foster belonging, and bring out the best in people. These strengths help teams gel, conflicts resolve, and communities thrive.'
    },
    Intrapersonal: {
      name: 'Intrapersonal',
      coreQuestion: 'How do you regulate yourself and stay aligned with your values?',
      description: 'You manage your actions, emotions, and commitments with care. These strengths help you stay grounded, follow through, and grow from setbacks.'
    },
    Emotional: {
      name: 'Emotional',
      coreQuestion: 'How do you find meaning, hope, and energy?',
      description: 'You notice beauty, embrace possibility, and move through life with purpose. These strengths help you sustain momentum, inspire others, and weather challenges.'
    }
  };

  // Archetype definitions
  const ARCHETYPES = {
    deepThinker: {
      name: 'The Deep Thinker',
      pattern: 'Analytical-Dominant (3+ in Top 5)',
      description: 'You bring clarity to complexity. Ideas energize you—you notice patterns, ask sharp questions, and love peeling back layers to understand how things really work.',
      youMightNotice: [
        'You naturally pause to analyze before acting',
        'Friends come to you when they need fresh perspectives',
        'You get excited by learning something that changes how you see a problem'
      ],
      servesWellWhen: 'tackling ambiguous problems, designing solutions, or helping others see possibilities they missed',
      growthEdge: 'Your insights land best when paired with connection. Consider: how might you invite others into your thinking process, or translate complex ideas into shared language?'
    },
    connector: {
      name: 'The Connector',
      pattern: 'Interpersonal-Dominant (3+ in Top 5)',
      description: 'You make people feel seen and supported. Relationships fuel you—you notice what others need, create spaces where everyone belongs, and naturally bring people together.',
      youMightNotice: [
        'Others open up to you quickly',
        'You often find yourself bridging gaps between people or groups',
        'Group energy shifts when you walk into a room'
      ],
      servesWellWhen: 'building teams, resolving tensions, or creating environments where everyone can contribute their best',
      growthEdge: 'Connection is your superpower—and it can drain you if you don\'t set boundaries. Consider: what small practices help you recharge, and when do you need to say no to protect your energy?'
    },
    selfLeader: {
      name: 'The Self-Leader',
      pattern: 'Intrapersonal-Dominant (3+ in Top 5)',
      description: 'You lead from the inside out. Self-awareness grounds you—you know your values, manage your reactions, and follow through even when it\'s hard.',
      youMightNotice: [
        'You recover from setbacks faster than most',
        'You naturally reflect on what\'s working and what needs to change',
        'Others trust you because you do what you say you\'ll do'
      ],
      servesWellWhen: 'navigating pressure, modeling integrity, or staying steady when things get chaotic',
      growthEdge: 'Your steady presence is a gift—but it can feel isolating if you default to handling everything alone. Consider: who could you invite into your process, and what support would help you sustain your momentum?'
    },
    energizer: {
      name: 'The Energizer',
      pattern: 'Emotional-Dominant (3+ in Top 5)',
      description: 'You bring light to the room. Meaning and possibility fuel you—you notice beauty others miss, hold hope when things feel hard, and move through life with contagious energy.',
      youMightNotice: [
        'Your optimism lifts people when they\'re stuck',
        'You find inspiration in everyday moments',
        'Friends describe you as someone who "makes things feel possible"'
      ],
      servesWellWhen: 'rallying people toward a shared goal, reframing setbacks, or sustaining momentum when motivation dips',
      growthEdge: 'Your energy is magnetic—and it can mask real challenges if you default to positivity too quickly. Consider: how might you honor difficulty alongside hope, and when does your optimism need grounding in practical steps?'
    },
    thoughtfulCollaborator: {
      name: 'The Thoughtful Collaborator',
      pattern: 'Analytical + Interpersonal Balance',
      description: 'You bridge ideas and people. You think deeply *and* create space for others—bringing both insight and empathy to every conversation.',
      youMightNotice: [
        'You can translate complex concepts into language everyone understands',
        'Teams value you for both your ideas and your ability to hear everyone',
        'You naturally build consensus without losing the quality of the solution'
      ],
      servesWellWhen: 'facilitating discussions, designing collaborative solutions, or helping groups move from debate to shared understanding',
      growthEdge: 'Your dual strengths are rare—protect both. Consider: when does one eclipse the other, and what practices help you stay balanced between thinking and connecting?'
    },
    strategicAchiever: {
      name: 'The Strategic Achiever',
      pattern: 'Analytical + Intrapersonal Balance',
      description: 'You plan with purpose and follow through with discipline. You combine clear thinking with steady self-management—you see what needs to happen and you make it happen.',
      youMightNotice: [
        'You set goals others find ambitious and quietly achieve them',
        'You can break complex projects into manageable steps',
        'You rarely get derailed—setbacks become data points, not stop signs'
      ],
      servesWellWhen: 'leading long-term projects, navigating uncertainty with a plan, or modeling what focused execution looks like',
      growthEdge: 'Your drive is impressive—but impact grows when others join you. Consider: how might you bring people along in your process, or share leadership in ways that build capacity in others?'
    },
    purposefulLearner: {
      name: 'The Purposeful Learner',
      pattern: 'Analytical + Emotional Balance',
      description: 'You learn with heart. Curiosity meets meaning for you—you don\'t just want to understand, you want understanding that matters.',
      youMightNotice: [
        'You get energized by ideas that connect to bigger questions',
        'Learning isn\'t just intellectual—it shifts how you see the world',
        'You naturally find hope in new insights or perspectives'
      ],
      servesWellWhen: 'exploring big questions, connecting theory to purpose, or inspiring others to see learning as a source of meaning',
      growthEdge: 'Your passion for meaningful learning is a gift—but it can stall progress if you default to exploration over action. Consider: when is "good enough" understanding enough to start experimenting?'
    },
    steadySupporter: {
      name: 'The Steady Supporter',
      pattern: 'Interpersonal + Intrapersonal Balance',
      description: 'You show up with consistency and care. You combine relational warmth with personal responsibility—people trust you because you\'re both present and reliable.',
      youMightNotice: [
        'People feel safe opening up to you',
        'You can hold boundaries without losing connection',
        'Teams depend on you as a stabilizing force'
      ],
      servesWellWhen: 'supporting people through transitions, building trust in teams, or creating sustainable rhythms in relationships',
      growthEdge: 'Your steadiness is a rare gift—but it can lead to invisible burnout if you don\'t name your own needs. Consider: how might you vocalize your limits before you hit them, and who supports *you*?'
    },
    inspiringConnector: {
      name: 'The Inspiring Connector',
      pattern: 'Interpersonal + Emotional Balance',
      description: 'You bring people together *and* lift them up. You combine relational skill with contagious energy—you don\'t just connect people, you help them see what\'s possible.',
      youMightNotice: [
        'Your presence shifts group energy toward possibility',
        'People leave conversations with you feeling more hopeful',
        'You naturally celebrate others in ways that deepen connection'
      ],
      servesWellWhen: 'rallying teams around a vision, helping groups move through discouragement, or creating cultures where people feel both seen and inspired',
      growthEdge: 'Your warmth and optimism are magnetic—but they can mask tension if you avoid hard conversations. Consider: how might you pair encouragement with candor, and when does inspiration need to make space for difficult truths?'
    },
    groundedOptimist: {
      name: 'The Grounded Optimist',
      pattern: 'Intrapersonal + Emotional Balance',
      description: 'You hold hope *and* discipline. You manage yourself with care while staying connected to meaning—your optimism has roots.',
      youMightNotice: [
        'Your hopefulness doesn\'t ignore reality—it works *with* it',
        'You can sustain energy over the long haul',
        'Others describe you as both inspiring and dependable'
      ],
      servesWellWhen: 'persevering through long-term challenges, modeling resilience, or helping others find sustainable sources of motivation',
      growthEdge: 'Your self-sufficiency is a strength—but it can isolate you if you default to solo journeys. Consider: who could walk alongside you, and what would it look like to let others in on both the hope and the hard?'
    },
    versatileContributor: {
      name: 'The Versatile Contributor',
      pattern: 'Balanced Across Domains',
      description: 'You can flex across contexts. No single domain dominates—you bring analytical insight, relational warmth, personal discipline, and energized purpose depending on what\'s needed.',
      youMightNotice: [
        'You adapt your contribution style to fit the team or task',
        'People describe you differently depending on the context',
        'You rarely feel "stuck in one lane"—you can shift as situations evolve'
      ],
      servesWellWhen: 'navigating complex, multi-faceted challenges that require wearing different hats, or bridging diverse groups with different needs',
      growthEdge: 'Your flexibility is a superpower—but it can make it harder to build a clear identity or niche. Consider: what contexts bring out your best, and where do you want to deepen mastery rather than staying broad?'
    },
    bridge: {
      name: 'The Bridge',
      pattern: 'Three-Way Split',
      description: 'You naturally integrate multiple perspectives. Your strengths don\'t cluster—they create bridges between ways of working that often stay separate.',
      youMightNotice: [
        'You can translate between different "languages" (ideas, emotions, actions)',
        'Teams pull you into diverse roles because you can connect across silos',
        'You see patterns others miss because you hold multiple lenses at once'
      ],
      servesWellWhen: 'navigating complexity, integrating diverse viewpoints, or helping groups move beyond either/or thinking',
      growthEdge: 'Your integrative thinking is rare—but it can feel exhausting if you\'re always the translator. Consider: where do you need focused time in one domain, and who else can help carry the bridging work?'
    }
  };

  // Domain combination insights
  const DOMAIN_COMBOS = {
    'Analytical-Interpersonal': {
      name: 'Insight + Connection',
      description: 'You bring ideas *and* people together. This pairing helps you translate complexity into shared understanding—you can think deeply while creating space for others to contribute.',
      synergy: 'Your analytical clarity makes collaboration more productive; your interpersonal warmth makes complex topics accessible.'
    },
    'Analytical-Intrapersonal': {
      name: 'Strategy + Discipline',
      description: 'You plan with purpose and execute with focus. This pairing helps you turn insights into sustained action—you think clearly and manage yourself through the follow-through.',
      synergy: 'Your analytical frameworks give you direction; your intrapersonal steadiness keeps you on track when motivation dips.'
    },
    'Analytical-Emotional': {
      name: 'Meaning + Learning',
      description: 'You learn in ways that matter. This pairing helps you connect ideas to bigger questions—curiosity meets purpose, and understanding feels personally significant.',
      synergy: 'Your analytical curiosity gives you depth; your emotional connection to meaning gives you fuel to keep exploring.'
    },
    'Interpersonal-Intrapersonal': {
      name: 'Care + Consistency',
      description: 'You support others with reliability. This pairing helps you show up for people without losing yourself—you can be present and boundaried at the same time.',
      synergy: 'Your interpersonal warmth builds trust; your intrapersonal self-management protects your capacity to keep showing up.'
    },
    'Interpersonal-Emotional': {
      name: 'Connection + Inspiration',
      description: 'You bring people together *and* lift them up. This pairing helps you create spaces where people feel both seen and energized—belonging meets possibility.',
      synergy: 'Your interpersonal care helps people feel safe; your emotional energy helps them feel hopeful and ready to try new things.'
    },
    'Intrapersonal-Emotional': {
      name: 'Discipline + Purpose',
      description: 'You sustain effort with meaning. This pairing helps you persevere through challenges without burning out—your hope has roots, and your discipline has direction.',
      synergy: 'Your intrapersonal steadiness keeps you grounded; your emotional connection to purpose reminds you why the work matters.'
    }
  };

  // Strength-specific micro-actions (2-3 per strength)
  const STRENGTH_ACTIONS = {
    'Creativity': [
      'Pick one stuck problem and sketch 3 wild solutions in 10 minutes—don\'t filter, just generate.',
      'Remix something: take an existing idea (yours or someone else\'s) and combine it with something unexpected.'
    ],
    'Curiosity': [
      'Pick one topic from today\'s lesson and follow one "why" question for 15 minutes—see where it leads.',
      'Ask someone a question you\'ve been genuinely wondering about—then listen without planning your response.'
    ],
    'Judgment': [
      'Before accepting a claim you encounter, spend 5 minutes testing it: what\'s the evidence? What assumptions does it rely on?',
      'Pick one decision you need to make and list 3 criteria that matter—rank options against those criteria.'
    ],
    'Love of Learning': [
      'Block 20 minutes to dive into one concept you\'ve been curious about—let yourself follow the rabbit hole.',
      'Teach someone something you just learned—explaining it will deepen your own understanding.'
    ],
    'Perspective': [
      'When someone shares a problem, pause and offer one reframe: "Another way to look at this might be..."',
      'Reflect on one current challenge: what would you tell a friend facing this same situation?'
    ],
    'Love': [
      'Send one message to someone you care about, naming something specific you appreciate about them.',
      'Spend 15 minutes one-on-one with someone who matters to you—no agenda, just presence.'
    ],
    'Kindness': [
      'Do one small, unexpected act of service for someone today—something that costs you little but might brighten their day.',
      'Notice one person who seems stressed or overlooked and offer a genuine "How are you doing?"'
    ],
    'Social Intelligence': [
      'In your next group conversation, notice one unspoken dynamic (who\'s quiet, who\'s dominating, what\'s the energy?) and adjust your participation accordingly.',
      'After a group meeting, send one message naming something someone did well that others might have missed.'
    ],
    'Humor': [
      'Find one moment today to lighten the mood—a well-timed joke, a funny observation, or playful banter that makes someone smile.',
      'Share one story that makes people laugh *and* connects you to someone—humor that builds, not divides.'
    ],
    'Leadership': [
      'In your next group project, take 10 minutes to clarify roles: who\'s doing what, and how will you check in?',
      'Notice one area where your group is stuck and propose one concrete next step.'
    ],
    'Teamwork': [
      'In your next collaboration, actively highlight one idea someone else contributed and build on it.',
      'When a group member is struggling, offer: "How can I support you with this?"'
    ],
    'Fairness': [
      'Notice one moment when someone is being excluded or overlooked—speak up or adjust to include them.',
      'Before making a group decision, ask: "Who haven\'t we heard from yet?"'
    ],
    'Prudence': [
      'Before committing to something new, take 5 minutes to assess: what might go wrong, and how would I handle it?',
      'Pause before responding to an email or message that triggered you—draft it, wait 10 minutes, then edit before sending.'
    ],
    'Self-Regulation': [
      'Do a 10-minute focused work block with one distraction removed (phone away, tabs closed)—then reflect on how it felt.',
      'When you notice frustration rising, pause: take 3 deep breaths, name the feeling, then choose your next step.'
    ],
    'Perseverance': [
      'Pick one task you\'ve been avoiding and do just 10 minutes on it—momentum beats motivation.',
      'When you hit a setback, reflect: what\'s one thing I learned, and what\'s the smallest next step?'
    ],
    'Forgiveness': [
      'Think of one small resentment you\'re holding—write 2 sentences releasing it, even if just for yourself.',
      'When someone makes a mistake, pause before reacting: what would compassion look like here?'
    ],
    'Humility': [
      'In your next group discussion, ask one genuine question about something you don\'t understand—model learning over performing.',
      'Acknowledge one mistake you made this week and share what you learned from it.'
    ],
    'Honesty': [
      'Share one hard truth you\'ve been avoiding—kindly and clearly, with care for impact.',
      'Reflect on one area where you\'ve been performing or hiding—what would it look like to show up more authentically?'
    ],
    'Gratitude': [
      'Write 3 things you\'re grateful for today—be specific about why each one matters.',
      'Thank someone for something small they did that helped you—name the impact it had.'
    ],
    'Hope': [
      'Write one hopeful outcome for this week and identify the smallest first step toward it—then take that step today.',
      'When facing a challenge, list 3 possible paths forward—even if you\'re not sure which is right yet.'
    ],
    'Spirituality': [
      'Spend 10 minutes reflecting on one question: what gives my life meaning right now?',
      'Connect one daily task to a bigger purpose—why does this small thing matter in the larger picture?'
    ],
    'Appreciation of Beauty': [
      'Notice one beautiful thing today (a sound, a view, a moment) and spend 2 minutes just experiencing it.',
      'Share one piece of art, music, or nature that moved you recently—tell someone why it mattered.'
    ],
    'Zest': [
      'Bring full energy to one task today—treat it like the most important thing you\'ll do, even if it\'s small.',
      'Find one way to make a routine task more engaging—add music, invite a friend, or gamify it.'
    ],
    'Bravery': [
      'Do one thing today that scares you a little—speak up in class, start a hard conversation, or try something new.',
      'Reflect on one fear that\'s been holding you back—what would taking one small step past it look like?'
    ]
  };

  // Function to match archetype based on top 5 distribution
  function matchArchetype(counts) {
    const { Analytical, Interpersonal, Intrapersonal, Emotional } = counts;
    
    // Single-domain dominant (3+ in top 5)
    if (Analytical >= 3) return ARCHETYPES.deepThinker;
    if (Interpersonal >= 3) return ARCHETYPES.connector;
    if (Intrapersonal >= 3) return ARCHETYPES.selfLeader;
    if (Emotional >= 3) return ARCHETYPES.energizer;
    
    // Two-domain balance (2+2 in top 5)
    if (Analytical >= 2 && Interpersonal >= 2) return ARCHETYPES.thoughtfulCollaborator;
    if (Analytical >= 2 && Intrapersonal >= 2) return ARCHETYPES.strategicAchiever;
    if (Analytical >= 2 && Emotional >= 2) return ARCHETYPES.purposefulLearner;
    if (Interpersonal >= 2 && Intrapersonal >= 2) return ARCHETYPES.steadySupporter;
    if (Interpersonal >= 2 && Emotional >= 2) return ARCHETYPES.inspiringConnector;
    if (Intrapersonal >= 2 && Emotional >= 2) return ARCHETYPES.groundedOptimist;
    
    // Check for three-way split (e.g., 2-2-1-0 or 2-1-1-1)
    const nonZero = [Analytical, Interpersonal, Intrapersonal, Emotional].filter(c => c > 0).length;
    if (nonZero >= 3) return ARCHETYPES.bridge;
    
    // Balanced (1-1-2-1 or similar)
    return ARCHETYPES.versatileContributor;
  }

  // Function to select domain combination
  function selectDomainCombo(counts) {
    const pairs = [];
    if (counts.Analytical >= 2 && counts.Interpersonal >= 2) return DOMAIN_COMBOS['Analytical-Interpersonal'];
    if (counts.Analytical >= 2 && counts.Intrapersonal >= 2) return DOMAIN_COMBOS['Analytical-Intrapersonal'];
    if (counts.Analytical >= 2 && counts.Emotional >= 2) return DOMAIN_COMBOS['Analytical-Emotional'];
    if (counts.Interpersonal >= 2 && counts.Intrapersonal >= 2) return DOMAIN_COMBOS['Interpersonal-Intrapersonal'];
    if (counts.Interpersonal >= 2 && counts.Emotional >= 2) return DOMAIN_COMBOS['Interpersonal-Emotional'];
    if (counts.Intrapersonal >= 2 && counts.Emotional >= 2) return DOMAIN_COMBOS['Intrapersonal-Emotional'];
    
    // Fallback: pick top 2 domains
    const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
    if (sorted[0][1] > 0 && sorted[1][1] > 0) {
      const key = `${sorted[0][0]}-${sorted[1][0]}`;
      return DOMAIN_COMBOS[key] || null;
    }
    return null;
  }

  // Function to get micro-actions for top 5 strengths
  function getMicroActions(top5) {
    const actions = [];
    top5.forEach(({name}) => {
      const strengthActions = STRENGTH_ACTIONS[name];
      if (strengthActions && strengthActions.length > 0) {
        // Pick one random action for variety
        const randomAction = strengthActions[Math.floor(Math.random() * strengthActions.length)];
        actions.push({ strength: name, action: randomAction });
      }
    });
    return actions.slice(0, 5); // Max 5 actions
  }

  function tryParse(raw){ try { return raw ? JSON.parse(raw) : null; } catch { return null; } }
  function loadWithFallback(){
    const s3 = tryParse(localStorage.getItem(KEY_V3)); if(s3 && s3.scores) return s3;
    const s2 = tryParse(localStorage.getItem(KEY_V2)); if(s2 && s2.scores) return s2;
    const s1 = tryParse(localStorage.getItem(KEY_V1)); if(s1 && s1.scores) return s1;
    return null;
  }

  function setText(id, text){ const el = document.getElementById(id); if(el) el.textContent = text; }
  function el(id){ return document.getElementById(id); }

  function render(){
    // Date
    setText('report-date', new Date().toLocaleDateString());

    const state = loadWithFallback();
    if(!state || !state.scores){ const nr = el('no-results'); if(nr) nr.style.display='block'; return; }

    const ranking = Object.entries(state.scores).sort((a,b)=> b[1]-a[1]);

    // Snapshot: balance of categories among Top 5
    const top5 = ranking.slice(0,5).map(([name,score])=>({name,score}));
    const counts = {Analytical:0, Interpersonal:0, Intrapersonal:0, Emotional:0};
    top5.forEach(({name})=>{ const g = PRIMARY_GROUP[name] || '—'; if(counts[g] !== undefined) counts[g]++; });
    const balance = el('balance');
    if(balance){ balance.textContent = `Top 5 by category (for reflection): Analytical ${counts.Analytical} • Interpersonal ${counts.Interpersonal} • Intrapersonal ${counts.Intrapersonal} • Emotional ${counts.Emotional}`; }

    // Domain Profile Section
    const domainSection = el('domain-profile');
    if(domainSection) {
      let html = '';
      
      // Domain explanations
      html += '<div class="domain-explanations">';
      ['Analytical', 'Interpersonal', 'Intrapersonal', 'Emotional'].forEach(domain => {
        const info = DOMAIN_INFO[domain];
        const count = counts[domain];
        html += `<div class="domain-card cat-${domain}">
          <div class="domain-header">
            <strong>${info.name}</strong>
            <span class="domain-count">${count} in Top 5</span>
          </div>
          <p class="domain-question"><em>${info.coreQuestion}</em></p>
          <p class="domain-desc">${info.description}</p>
        </div>`;
      });
      html += '</div>';
      
      // Distribution visualization
      const total = 5;
      const bars = ['Analytical', 'Interpersonal', 'Intrapersonal', 'Emotional'].map(d => {
        const width = (counts[d] / total) * 100;
        return `<div class="dist-bar cat-${d}" style="width: ${width}%;" title="${d}: ${counts[d]}">
          <span>${d.slice(0,4)} ${counts[d]}</span>
        </div>`;
      }).join('');
      html += `<div class="domain-distribution">
        <h4 class="title is-6">Your Domain Distribution</h4>
        <div class="dist-bars">${bars}</div>
      </div>`;
      
      // Archetype
      const archetype = matchArchetype(counts);
      html += `<div class="archetype-insight">
        <h4 class="title is-6">Your Strengths Archetype: <span class="archetype-name">${archetype.name}</span></h4>
        <p class="archetype-pattern"><em>${archetype.pattern}</em></p>
        <p>${archetype.description}</p>
        <div class="archetype-details">
          <p><strong>You might notice:</strong></p>
          <ul>${archetype.youMightNotice.map(item => `<li>${item}</li>`).join('')}</ul>
          <p><strong>This serves you well when:</strong> ${archetype.servesWellWhen}</p>
          <p><strong>Growth edge:</strong> ${archetype.growthEdge}</p>
        </div>
      </div>`;
      
      // Domain combination (if applicable)
      const combo = selectDomainCombo(counts);
      if (combo) {
        html += `<div class="combo-card">
          <h4 class="title is-6">Domain Synergy: ${combo.name}</h4>
          <p>${combo.description}</p>
          <p class="combo-synergy"><strong>The synergy:</strong> ${combo.synergy}</p>
        </div>`;
      }
      
      domainSection.innerHTML = html;
    }

    // Top 5 details
    const t5root = el('top5-list');
    t5root.innerHTML = '';
    top5.forEach(({name,score}, idx)=>{
      const pct = Math.round((score / MAX_PER_STRENGTH) * 100);
      const slug = (typeof strengthToSlug === 'function') ? strengthToSlug(name) : name.toLowerCase();
      const content = (window.STRENGTHS_CONTENT && window.STRENGTHS_CONTENT[slug]) ? window.STRENGTHS_CONTENT[slug] : null;
      const group = PRIMARY_GROUP[name] || '—';

      const div = document.createElement('div');
      div.className = 'top5-item';
      const tagline = content && content.tagline ? content.tagline : (STRENGTH_DESCRIPTIONS[name] || '');

      // Spot/Apply/Reflect
      const spotList = content && Array.isArray(content.signs) ? content.signs.slice(0,2) : [];
      const applyList = content && content.actionPlan ? Object.values(content.actionPlan).slice(0,2) : [];
      const reflectText = `Notice one moment this week where ${name} changed your mood, energy, or progress. Jot two sentences.`;

      div.innerHTML = `
        <div class="top5-head">
          <div>
            <strong>#${idx+1} ${name}</strong>
            <span class="badge cat-${group}">${group}</span>
          </div>
          <div>${pct}%</div>
        </div>
        <div class="top5-tagline">${tagline}</div>
        <div class="columns">
          <div class="column">
            <p><strong>Spot</strong></p>
            <ul>${spotList.map(s=>`<li>${s}</li>`).join('') || '<li>Notice where this strength naturally shows up.</li>'}</ul>
          </div>
          <div class="column">
            <p><strong>Apply</strong></p>
            <ul>${applyList.map(s=>`<li>${s}</li>`).join('') || '<li>Pick one 10–20 minute action that uses this strength.</li>'}</ul>
          </div>
          <div class="column">
            <p><strong>Reflect</strong></p>
            <ul><li>${reflectText}</li></ul>
          </div>
        </div>
      `;
      t5root.appendChild(div);
    });

    // Full table
    const tbody = el('full-table');
    tbody.innerHTML = '';
    ranking.forEach(([name,score], i)=>{
      const pct = Math.round((score / MAX_PER_STRENGTH) * 100);
      const group = PRIMARY_GROUP[name] || '—';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${name}</td>
        <td><span class="badge cat-${group}">${group}</span></td>
        <td>${score.toFixed(2)}</td>
        <td>${pct}%</td>
        <td>${STRENGTH_DESCRIPTIONS[name] || ''}</td>
      `;
      tbody.appendChild(tr);
    });

    // Strength-specific micro-actions
    const microRoot = el('micro-actions');
    if(microRoot) {
      microRoot.innerHTML = '';
      const actions = getMicroActions(top5);
      if (actions.length > 0) {
        const ul = document.createElement('ul');
        actions.forEach(({strength, action}) => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${strength}:</strong> ${action}`;
          ul.appendChild(li);
        });
        microRoot.appendChild(ul);
      } else {
        microRoot.innerHTML = '<p class="note">No specific actions available. Focus on using your top strengths in new contexts this week.</p>';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', render);
})();
