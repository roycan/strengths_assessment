// content/strengths-content.js
// Extended content for strength profile pages

const STRENGTHS_CONTENT = {
  "curiosity": {
    id: "curiosity",
    displayName: "Curiosity",
    thematicTitle: "The Explorer's Guide to: CURIOSITY",
    tagline: "A hunger of the mind, a love for the unknown.",
    definition: "Curiosity is the engine of exploration and interest. It's the force that compels you to ask 'why?', to investigate new ideas, and to prefer the open road over the familiar path.",
    signs: [
      "You love to learn for the sake of learning.",
      "You have more books than you can read and more browser tabs than you can count.",
      "You're often the one asking questions no one else thought of."
    ],
    actionPlan: {
      work: "Ask a colleague from another department about their work. Pick one routine process you do every day and research a better way to do it.",
      relationships: "Instead of offering advice, ask a friend deeper questions about their experience. Explore a new hobby or type of cuisine with your partner.",
      personalGrowth: "Visit a museum, watch a documentary on a topic you know nothing about, or take a different route on your daily commute just to see what's there."
    },
    goldenMean: {
      underuse: "Can lead to boredom, stagnation, and a lack of growth.",
      overuse: "Can lead to a lack of focus, being nosy, or starting many things without finishing them."
    },
    quote: "The mind is not a vessel to be filled, but a fire to be kindled. — Plutarch"
  },
  "creativity": {
    id: "creativity",
    displayName: "Creativity",
    thematicTitle: "The Maker's Guide to: CREATIVITY",
    tagline: "Seeing possibilities and shaping them into something useful or beautiful.",
    definition: "Creativity is the capacity to generate original ideas and combine existing ones in novel ways. It looks like playful experimentation, and it often starts with the question: 'What if?'.",
    signs: [
      "You naturally brainstorm alternatives when a plan hits a snag.",
      "You enjoy tinkering, prototyping, or remixing ideas.",
      "Constraints energize you rather than shut you down."
    ],
    actionPlan: {
      work: "Ship a small rough draft today instead of waiting for perfect. Propose two options, not one, in your next decision memo.",
      relationships: "Suggest a new micro-adventure this week—a new park, recipe, or game.",
      personalGrowth: "Keep a 'spark list' of ideas. Pick one tiny step and try it within 24 hours."
    },
    goldenMean: { underuse: "Rigid thinking; stale routines.", overuse: "Chasing novelty over follow-through." },
    quote: "Make it small, make it now, make it better next time."
  },
  "judgment": {
    id: "judgment",
    displayName: "Judgment",
    thematicTitle: "The Thinker's Guide to: JUDGMENT",
    tagline: "Looking at things from all sides before deciding.",
    definition: "Judgment (critical thinking) weighs evidence, surfaces assumptions, and tests conclusions. It's curiosity's steady partner that asks, 'What else might be true?'.",
    signs: [
      "You pause to check facts and sources before sharing.",
      "You enjoy mapping pros, cons, and trade-offs.",
      "People ask you to sanity-check their plans."
    ],
    actionPlan: {
      work: "Add a 'pre-mortem' to important tasks: list 3 ways it could fail and one mitigation for each.",
      relationships: "When conflict arises, restate the other person's view to their satisfaction before offering your own.",
      personalGrowth: "Pick one opinion you hold and seek the strongest thoughtful counter-argument."
    },
    goldenMean: { underuse: "Rushed, reactive choices.", overuse: "Analysis paralysis; cold skepticism." },
    quote: "Good judgment is warm clarity, not cold certainty."
  },
  "love-of-learning": {
    id: "love-of-learning",
    displayName: "Love of Learning",
    thematicTitle: "The Student's Guide to: LOVE OF LEARNING",
    tagline: "A steady appetite for mastering new things.",
    definition: "Love of Learning is the enduring desire to acquire knowledge and skill. It delights in progress and turns beginners' steps into momentum.",
    signs: [
      "You collect courses, books, or tutorials for fun.",
      "You feel satisfied when you document what you learned.",
      "You teach others as a way to deepen your own learning."
    ],
    actionPlan: {
      work: "Define a 4-week micro-curriculum tied to an upcoming project. Share a weekly 'what I learned' note.",
      relationships: "Start a paired learning ritual: watch or read something short together and swap takeaways.",
      personalGrowth: "Schedule a 20-minute 'study block' on weekdays with a visible streak tracker."
    },
    goldenMean: { underuse: "Stagnation; boredom.", overuse: "Collecting knowledge without applying it." },
    quote: "Learning compounds when curiosity meets practice."
  },
  "perspective": {
    id: "perspective",
    displayName: "Perspective",
    thematicTitle: "The Guide's Guide to: PERSPECTIVE",
    tagline: "Seeing the bigger picture and offering wise counsel.",
    definition: "Perspective steps back to view context, patterns, and long arcs. It connects present choices to future consequences and shared values.",
    signs: [
      "People seek you out when decisions feel tangled.",
      "You link immediate issues to longer-term themes.",
      "You translate complexity into simple, grounded advice."
    ],
    actionPlan: {
      work: "Open meetings with 'What will matter about this in six months?' to frame decisions.",
      relationships: "During tough moments, name the shared goal and one next gentle step.",
      personalGrowth: "Journal a 'zoom out' paragraph when emotions run high."
    },
    goldenMean: { underuse: "Narrow focus; short-termism.", overuse: "Detached philosophizing; inaction." },
    quote: "Wisdom is perspective put to work."
  },
  "bravery": {
    id: "bravery",
    displayName: "Bravery",
    thematicTitle: "The Courageous Guide to: BRAVERY",
    tagline: "Acting on your values despite fear.",
    definition: "Bravery is taking principled action when stakes or fears are real. It speaks up, starts hard conversations, and chooses the meaningful risk.",
    signs: [
      "You do the right thing even when it's inconvenient.",
      "You initiate hard-but-necessary conversations.",
      "You feel fear and move with it, not away from it."
    ],
    actionPlan: {
      work: "Name the elephant in the room once this week—kindly and specifically.",
      relationships: "Share a vulnerable truth you've been avoiding, paired with a request.",
      personalGrowth: "List one 'courage habit' you want—rehearse it and take a small live rep today."
    },
    goldenMean: { underuse: "Avoidance; silence.", overuse: "Recklessness; thrill-seeking." },
    quote: "Courage grows by reps, not by waiting to feel ready."
  },
  "perseverance": {
    id: "perseverance",
    displayName: "Perseverance",
    thematicTitle: "The Finisher's Guide to: PERSEVERANCE",
    tagline: "Following through—especially after the honeymoon phase fades.",
    definition: "Perseverance stays with important goals through boredom, setbacks, and imperfect days. It converts intention into completion.",
    signs: [
      "You track progress and celebrate small wins.",
      "You return to the task after interruptions.",
      "You prefer done and improved over forever unfinished."
    ],
    actionPlan: {
      work: "Timebox the next step and finish it fully. Publish progress even if it's partial.",
      relationships: "Follow through on one promised check-in or gesture you've delayed.",
      personalGrowth: "Adopt a 'tiny daily' habit for 14 days and protect it like an appointment."
    },
    goldenMean: { underuse: "Drift; abandoned projects.", overuse: "Stubborn persistence on low-value paths." },
    quote: "Consistency turns momentum into mastery."
  },
  "honesty": {
    id: "honesty",
    displayName: "Honesty",
    thematicTitle: "The Integrity Guide to: HONESTY",
    tagline: "Saying the truth and showing the real you.",
    definition: "Honesty aligns words and actions with values. It is candor with care—transparent, not harsh; accountable, not performative.",
    signs: [
      "You admit mistakes quickly and make amends.",
      "You resist spin and say what you actually mean.",
      "People trust your 'yes' and 'no'."
    ],
    actionPlan: {
      work: "Replace one vague update with a precise, observable statement.",
      relationships: "Offer a kind truth paired with curiosity about the other person's view.",
      personalGrowth: "Write a personal 'integrity rule' you can keep under pressure."
    },
    goldenMean: { underuse: "Evasion; image management.", overuse: "Bluntness without empathy." },
    quote: "Truth lands best when carried by care."
  },
  "zest": {
    id: "zest",
    displayName: "Zest",
    thematicTitle: "The Energy Guide to: ZEST",
    tagline: "Bringing vitality and enthusiasm to what you do.",
    definition: "Zest shows up as physical and emotional energy. It animates teams, kickstarts progress, and turns obligation into invitation.",
    signs: [
      "You naturally energize a room or project.",
      "You prefer movement to stagnation.",
      "You recover quickly by changing state—walks, music, fresh air."
    ],
    actionPlan: {
      work: "Open the next meeting with a 60-second energizer or a clear 'why now'.",
      relationships: "Plan one active micro-outing this week.",
      personalGrowth: "Design a morning ramp: light, movement, hydration, intention."
    },
    goldenMean: { underuse: "Low affect; disengagement.", overuse: "Overamplifying; exhausting others or self." },
    quote: "Energy is a skill—build it on purpose."
  },
  "love": {
    id: "love",
    displayName: "Love",
    thematicTitle: "The Connection Guide to: LOVE",
    tagline: "Investing in close, caring relationships.",
    definition: "Love prioritizes warmth, presence, and mutual support. It turns attention into belonging and commitment into safety.",
    signs: [
      "You remember details that matter to your people.",
      "You show care through reliable actions.",
      "You feel strongest when bonds are nurtured."
    ],
    actionPlan: {
      work: "Offer specific appreciation and ask how you can support one person this week.",
      relationships: "Schedule protected time for undistracted presence.",
      personalGrowth: "List the relationships that sustain you and plan one small deposit today."
    },
    goldenMean: { underuse: "Distance; neglect.", overuse: "Smothering; loss of boundaries." },
    quote: "Love is spelled T-I-M-E and A-T-T-E-N-T-I-O-N."
  },
  "kindness": {
    id: "kindness",
    displayName: "Kindness",
    thematicTitle: "The Generous Guide to: KINDNESS",
    tagline: "Doing small things that make life easier for others.",
    definition: "Kindness notices needs and moves to help. It's the everyday glue that makes teams humane and homes warm.",
    signs: [
      "You spot opportunities to help without being asked.",
      "You write thoughtful notes or check in regularly.",
      "You feel fulfilled when others are lifted."
    ],
    actionPlan: {
      work: "Handle one 'invisible task' for your team and don't broadcast it.",
      relationships: "Offer practical help that reduces someone's load by 10%.",
      personalGrowth: "Practice kindness to self: name one thing you did well today."
    },
    goldenMean: { underuse: "Indifference.", overuse: "People-pleasing at the expense of self-care." },
    quote: "Small and sincere beats grand and rare."
  },
  "social-intelligence": {
    id: "social-intelligence",
    displayName: "Social Intelligence",
    thematicTitle: "The Attunement Guide to: SOCIAL INTELLIGENCE",
    tagline: "Reading situations and responding skillfully.",
    definition: "Social Intelligence senses feelings, norms, and power dynamics, then acts with care and tact. It makes collaboration smoother and conflict calmer.",
    signs: [
      "You pick up subtle cues in tone and body language.",
      "You adapt your approach to fit the moment.",
      "People feel understood after talking with you."
    ],
    actionPlan: {
      work: "In your next meeting, name the unspoken goal and invite quiet voices.",
      relationships: "Ask, 'Do you want solutions or just a listener right now?'",
      personalGrowth: "Practice one breath before replying when emotions spike."
    },
    goldenMean: { underuse: "Tone-deaf interactions.", overuse: "Over-monitoring others; losing your own voice." },
    quote: "Understanding is a gift you can give quickly and often."
  },
  "teamwork": {
    id: "teamwork",
    displayName: "Teamwork",
    thematicTitle: "The Collaborator's Guide to: TEAMWORK",
    tagline: "Putting the group’s success ahead of solo glory.",
    definition: "Teamwork aligns effort, communicates clearly, and closes gaps. It honors roles and ensures everyone can contribute.",
    signs: [
      "You notice when someone is blocked and help unblock.",
      "You communicate progress and needs proactively.",
      "You celebrate shared wins more than individual credit."
    ],
    actionPlan: {
      work: "Run a quick roles-and-handshakes check: who owns what, by when?",
      relationships: "Name and appreciate the 'household roles' people quietly carry.",
      personalGrowth: "Ask for feedback on how you can be a better teammate this week."
    },
    goldenMean: { underuse: "Silos; misalignment.", overuse: "Self-erasure; avoiding healthy disagreement." },
    quote: "Great teams make it easy to do the right thing."
  },
  "leadership": {
    id: "leadership",
    displayName: "Leadership",
    thematicTitle: "The Mobilizer's Guide to: LEADERSHIP",
    tagline: "Setting direction and creating conditions for others to succeed.",
    definition: "Leadership clarifies purpose, aligns people, and removes friction. It balances results with relationships.",
    signs: [
      "You volunteer to organize when momentum stalls.",
      "You translate goals into next steps and owners.",
      "You coach others and share the stage."
    ],
    actionPlan: {
      work: "State the purpose, success metric, and first step for a current effort.",
      relationships: "Hold a short 'expectations and needs' conversation before tackling shared tasks.",
      personalGrowth: "Pick a leadership value and demonstrate it publicly today."
    },
    goldenMean: { underuse: "Drift; unclear ownership.", overuse: "Command-and-control; spotlight hoarding." },
    quote: "Lead with clarity, serve with humility."
  },
  "fairness": {
    id: "fairness",
    displayName: "Fairness",
    thematicTitle: "The Justice Guide to: FAIRNESS",
    tagline: "Ensuring rules and resources are applied evenly.",
    definition: "Fairness seeks balanced treatment and equal opportunity. It notices bias and works to correct it with practical adjustments.",
    signs: [
      "You speak up when standards are applied inconsistently.",
      "You build processes that reduce favoritism.",
      "You invite diverse views in decisions."
    ],
    actionPlan: {
      work: "Define transparent criteria for a current decision and publish them.",
      relationships: "Rotate high-effort chores or make trade-offs explicit.",
      personalGrowth: "Audit one habit for hidden bias and redesign it."
    },
    goldenMean: { underuse: "Arbitrariness.", overuse: "Rigid rule-keeping without context." },
    quote: "Fair processes build lasting trust."
  },
  "forgiveness": {
    id: "forgiveness",
    displayName: "Forgiveness",
    thematicTitle: "The Repair Guide to: FORGIVENESS",
    tagline: "Releasing resentment to make room for repair.",
    definition: "Forgiveness acknowledges harm honestly and chooses to let go of the debt. It focuses on repair and future integrity, not erasing the past.",
    signs: [
      "You can hold two truths: real harm and real growth.",
      "You prefer accountability over punishment.",
      "You are able to resume cooperation when amends are made."
    ],
    actionPlan: {
      work: "Name impact, request a concrete repair, then reset expectations.",
      relationships: "Write a short 'clearing the air' note to close a lingering loop.",
      personalGrowth: "Practice self-forgiveness: identify lesson learned and a new commitment."
    },
    goldenMean: { underuse: "Grudges; stalemate.", overuse: "Excusing patterns without boundaries." },
    quote: "Forgiveness is a door to the future, not a rewrite of the past."
  },
  "humility": {
    id: "humility",
    displayName: "Humility",
    thematicTitle: "The Grounded Guide to: HUMILITY",
    tagline: "Letting your work speak while staying open to learn.",
    definition: "Humility holds a realistic self-view—strengths and limits—and centers the mission over the ego. It listens deeply and credits others generously.",
    signs: [
      "You invite critique and change your mind when shown better data.",
      "You share credit and accept blame appropriately.",
      "You keep attention on the work, not the spotlight."
    ],
    actionPlan: {
      work: "Ask, 'What am I missing?' and implement one suggestion this week.",
      relationships: "Express appreciation without deflecting or self-deprecation.",
      personalGrowth: "List your top 3 strengths and 1 growth edge—own both."
    },
    goldenMean: { underuse: "Defensiveness; fragile ego.", overuse: "Self-erasure; not claiming warranted authority." },
    quote: "Be confident in service of the goal, not the image."
  },
  "prudence": {
    id: "prudence",
    displayName: "Prudence",
    thematicTitle: "The Foresight Guide to: PRUDENCE",
    tagline: "Choosing wisely with the future in mind.",
    definition: "Prudence plans ahead, weighs risks, and sets guardrails that keep you on track. It makes freedom sustainable.",
    signs: [
      "You create buffers and backups before you need them.",
      "You consider long-term costs before committing.",
      "You design habits that prevent predictable problems."
    ],
    actionPlan: {
      work: "Add a risk/mitigation row to your next plan; set a decision review date.",
      relationships: "Align on boundaries and routines that protect what matters.",
      personalGrowth: "Automate one good choice (sleep, movement, money) so it happens by default."
    },
    goldenMean: { underuse: "Impulsivity; rework.", overuse: "Over-caution; missed opportunities." },
    quote: "Good guardrails create more room to enjoy the drive."
  },
  "self-regulation": {
    id: "self-regulation",
    displayName: "Self-Regulation",
    thematicTitle: "The Steady Guide to: SELF‑REGULATION",
    tagline: "Keeping impulses aligned with intentions.",
    definition: "Self-Regulation manages attention, emotions, and habits in service of your aims. It's not suppression—it is skillful steering.",
    signs: [
      "You design routines that protect focus.",
      "You recover from setbacks without spiraling.",
      "You can pause between stimulus and response."
    ],
    actionPlan: {
      work: "Create a 90-minute focus block with clear start and stop rituals.",
      relationships: "Use a 'pause phrase' when heated: 'I want to get this right. Give me a moment.'",
      personalGrowth: "Pick one keystone habit and track it visibly for two weeks."
    },
    goldenMean: { underuse: "Impulsivity; inconsistency.", overuse: "Over-control; rigidity." },
    quote: "Discipline is remembering what you want most."
  },
  "humor": {
    id: "humor",
    displayName: "Humor",
    thematicTitle: "The Lightness Guide to: HUMOR",
    tagline: "Bringing levity that lifts, not distracts.",
    definition: "Humor lightens tension and builds connection. Done well, it invites perspective and shared humanity without punching down.",
    signs: [
      "You can help a group exhale in stressful moments.",
      "You use wit to include, not exclude.",
      "You sense when a moment needs lightness versus focus."
    ],
    actionPlan: {
      work: "Open a tough meeting with a gentle, context-appropriate icebreaker.",
      relationships: "Share a funny moment from your day to reconnect.",
      personalGrowth: "Collect 'micro-joys'—small things that make you smile—and revisit them."
    },
    goldenMean: { underuse: "Stiff seriousness.", overuse: "Deflection; undercutting important topics." },
    quote: "Laughter is a shortcut to together."
  },
  "appreciation-of-beauty": {
    id: "appreciation-of-beauty",
    displayName: "Appreciation of Beauty",
    thematicTitle: "The Noticing Guide to: APPRECIATION OF BEAUTY",
    tagline: "Seeing excellence, craft, and wonder—and letting it change you.",
    definition: "Appreciation of Beauty notices the remarkable in nature, people, and work. It slows you down to take in excellence and draws out gratitude.",
    signs: [
      "You point out quality others overlook.",
      "You feel restored by art, nature, or craftsmanship.",
      "You take care to make things a little more beautiful."
    ],
    actionPlan: {
      work: "Curate a 'best-of' gallery for your team—examples of excellent work to model.",
      relationships: "Plan a simple outing to a park, gallery, or service with someone you love.",
      personalGrowth: "Capture one photo a day of something that moved you and note why."
    },
    goldenMean: { underuse: "Rushing past what's good.", overuse: "Aesthetic perfectionism over usefulness." },
    quote: "Attention is the beginning of devotion."
  },
  "gratitude": {
    id: "gratitude",
    displayName: "Gratitude",
    thematicTitle: "The Appreciation Guide to: GRATITUDE",
    tagline: "Noticing and naming the good—and the givers behind it.",
    definition: "Gratitude recognizes benefits received and acknowledges sources beyond the self. It shifts attention from scarcity to sufficiency.",
    signs: [
      "You say 'thank you' specifically and promptly.",
      "You keep tokens or notes of things you appreciate.",
      "You feel richer when you count what's working."
    ],
    actionPlan: {
      work: "Send two specific, credible thank‑yous this week tied to outcomes.",
      relationships: "Start a nightly 'three good things' ritual.",
      personalGrowth: "Write a brief gratitude letter and—if possible—read it to the person."
    },
    goldenMean: { underuse: "Entitlement; overlooking contributions.", overuse: "Toxic positivity; ignoring real problems." },
    quote: "Gratitude turns 'enough' into 'more than enough'."
  },
  "hope": {
    id: "hope",
    displayName: "Hope",
    thematicTitle: "The Future Guide to: HOPE",
    tagline: "Expecting the best—and working toward it.",
    definition: "Hope imagines desirable futures and fuels the actions that make them more likely. It's optimism with a plan.",
    signs: [
      "You redirect conversations toward possibilities.",
      "You set goals that feel inspiring and attainable.",
      "Your confidence lifts others' effort."
    ],
    actionPlan: {
      work: "Frame a project as 'from X to Y by when' and name the first visible step.",
      relationships: "Ask a loved one what future they're excited about and plan one tiny move toward it.",
      personalGrowth: "Create a 30‑day 'hope habit': daily time invested in a meaningful aim."
    },
    goldenMean: { underuse: "Cynicism; drift.", overuse: "Wishful thinking without execution." },
    quote: "Hope is a verb with sleeves rolled up."
  },
  "spirituality": {
    id: "spirituality",
    displayName: "Spirituality",
    thematicTitle: "The Meaning Guide to: SPIRITUALITY",
    tagline: "Connecting daily life to deeper purpose and values.",
    definition: "Spirituality orients life around a larger meaning—through faith, philosophy, or practices that cultivate awe, compassion, and service.",
    signs: [
      "You reflect on what ultimately matters.",
      "You have rituals that ground and guide you.",
      "You seek to align choices with calling or conscience."
    ],
    actionPlan: {
      work: "Begin the day by naming who you serve and how today's work helps.",
      relationships: "Share a value or practice that shapes you, and ask about theirs.",
      personalGrowth: "Set aside 10 minutes for silence, prayer, or journaling."
    },
    goldenMean: { underuse: "Aimlessness; disconnection.", overuse: "Preachiness; bypassing practical care." },
    quote: "Live by a compass, not just a calendar."
  }
};

// Expose to global for non-module scripts
if (typeof window !== 'undefined') {
  window.STRENGTHS_CONTENT = STRENGTHS_CONTENT;
}

// Helper for display name → slug
function strengthToSlug(name){
  return name.toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
