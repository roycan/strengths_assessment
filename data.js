// data.js

// --- Strengths list ---
const STRENGTHS = [
  "Creativity","Curiosity","Judgment","Love of Learning","Perspective",
  "Bravery","Perseverance","Honesty","Zest","Love",
  "Kindness","Social Intelligence","Teamwork","Leadership","Fairness",
  "Forgiveness","Humility","Prudence","Self-Regulation","Humor",
  "Appreciation of Beauty","Gratitude","Hope","Spirituality"
];

// --- Short blurbs for tooltips and mobile cards ---
const STRENGTH_DESCRIPTIONS = {
  "Creativity": "Thinking of new and productive ways to do things.",
  "Curiosity": "Taking an interest in ongoing experience for its own sake.",
  "Judgment": "Thinking things through and examining them from all sides.",
  "Love of Learning": "Mastering new skills, topics, and bodies of knowledge.",
  "Perspective": "Being able to provide wise counsel to others.",
  "Bravery": "Not shrinking from threat, challenge, or difficulty.",
  "Perseverance": "Finishing what one starts; persisting in a course of action.",
  "Honesty": "Speaking the truth and presenting oneself in a genuine way.",
  "Zest": "Approaching life with excitement and energy.",
  "Love": "Valuing close relationships with others.",
  "Kindness": "Doing favors and good deeds for others.",
  "Social Intelligence": "Being aware of the motives and feelings of self and others.",
  "Teamwork": "Working well as a member of a group or team.",
  "Leadership": "Encouraging a group to get things done and maintaining harmony.",
  "Fairness": "Treating all people the same according to notions of fairness.",
  "Forgiveness": "Forgiving those who have done wrong.",
  "Humility": "Letting one’s accomplishments speak for themselves.",
  "Prudence": "Being careful about one’s choices; not taking undue risks.",
  "Self-Regulation": "Regulating what one feels and does; being disciplined.",
  "Humor": "Liking to laugh and tease; bringing smiles to others.",
  "Appreciation of Beauty": "Noticing and appreciating beauty, excellence, and skill.",
  "Gratitude": "Being aware of and thankful for the good things that happen.",
  "Hope": "Expecting the best and working to achieve it.",
  "Spirituality": "Having coherent beliefs about the higher purpose and meaning of life."
};

// // --- Questions array (trimmed for brevity; paste full 96 items here) ---
// const QUESTIONS = [
//   {id:1,aText:"I get excited when I can dive into a new subject and figure it out on my own.",aStrength:"Love of Learning",bText:"I feel most alive when I’m bringing energy and enthusiasm to a group activity.",bStrength:"Zest"},
//   {id:2,aText:"I usually pause to think through the risks before acting.",aStrength:"Prudence",bText:"I believe my life is guided by a deeper purpose.",bStrength:"Spirituality"},
//   // ... continue through all 96 items ...
// ];

// --- Scoring weights ---
const WEIGHTS = {
  strongA: {A:2, B:0},
  slightA: {A:1.5, B:0.5},
  equal:   {A:1, B:1},
  neither: {A:0.5, B:0.5},
  slightB: {A:0.5, B:1.5},
  strongB: {A:0, B:2}
};

// --- LocalStorage key ---
const APP_KEY = "scholars_compass_via_v3";
