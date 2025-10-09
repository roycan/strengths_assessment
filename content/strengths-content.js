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
  }
};

// Helper for display name → slug
function strengthToSlug(name){
  return name.toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
