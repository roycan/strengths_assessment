# Motivation Block – Implementation Plan

Goal: Encourage relevance, meaning, and motivation by adding a small, reusable “Why this matters” component to the app.

Scope
- A lightweight, reusable component (HTML + CSS + tiny JS) that can be dropped into multiple pages.
- Includes a qualitative message (no hard numbers by default) and a small "Learn more" link that opens a compact modal with references.
- Two placements to start: Consent screen (index.html) and Journey hub (results/journey/index.html).

Success criteria
- Students see a concise reason to engage before starting and a nudge to keep going after results.
- Component is visually subtle, responsive, and doesn’t push core CTAs below the fold.
- No blocking network calls; minimal script and style weight.
- A11y: correctly labelled, keyboard accessible, focus trapped inside modal while open.

Component API (proposed)
- HTML include (slot-based):
  - Container: <div class="motivation" data-variant="default"> ... </div>
  - Title (optional): <h3 class="motivation-title">Why this matters</h3>
  - Items: <ul class="motivation-list"><li>…</li>…</ul>
  - Learn more trigger: <button class="motivation-learn">Learn more</button>
- CSS classes:
  - .motivation: spacing, subtle card, responsive grid
  - .motivation-list: 3–4 items, wrap on small screens
  - .motivation-icon (optional): small inline SVG per item
  - .motivation-modal: modal container + backdrop
  - .is-hidden: display: none !important;
- JS helper (no framework): motivation.js
  - enhanceMotivationBlocks(): binds Learn more, creates modal lazily on first open
  - focusTrap(modal): tabs inside modal; ESC closes
  - export { enhanceMotivationBlocks }

Qualitative copy (default)
- Title: Why this matters
- Bullets (choose 3):
  - Using your strengths regularly is linked with higher engagement and well‑being.
  - Small, weekly strengths actions help you make progress on meaningful goals.
  - Focusing on strengths can boost confidence and energy.
  - Benefits extend beyond work—into relationships and everyday life.
- Learn more modal: 2–3 sentences + 3–5 references.

Modal content – draft
- Lead-in: 
  "Research in positive psychology and strengths suggests that using your strengths regularly is associated with higher engagement, better well‑being, and steadier progress on goals. Effects vary by person and context."
- References (3–5 from research-motivation.md):
  1) Gallup. How Employees' Strengths Make Your Company Stronger. https://www.gallup.com/workplace/231605/employees-strengths-company-stronger.aspx
  2) Gallup. Employees Who Use Their Strengths Outperform Those Who Don't. https://www.gallup.com/workplace/236561/employees-strengths-outperform-don.aspx
  3) Using signature strengths in pursuit of goals (research summary). https://www.researchgate.net/publication/281424792_Using_signature_strengths_in_pursuit_of_goals_Effects_on_goal_progress_need_satisfaction_and_well-being_and_implications_for_coaching_psychologists
  4) Science of CliftonStrengths (overview). https://www.gallup.com/cliftonstrengths/en/253790/science-of-cliftonstrengths.aspx

Placements
- Consent screen (index.html): place the block beneath the Start/Resume/Clear buttons; keep it compact (title + 3 bullets + Learn more).
- Journey hub (results/journey/index.html): place under hero subtitle or before the Roadmap.

Accessibility
- Learn more opens a dialog role=dialog with aria-modal=true, labelled by the modal title.
- Focus moves into modal on open; returns to trigger on close.
- ESC closes; backdrop click closes (optional).
- Screen readers can read the list items meaningfully.

Performance
- Inline minimal CSS additions in style.css (reuse Bulma where possible).
- One tiny JS file (<2 KB minified). No external network requests.
- Modal markup created on demand when user clicks Learn more.

Acceptance tests
- Desktop and mobile layouts render 3–4 bullets with good spacing.
- Consent screen: Start button remains within first viewport on common laptop sizes.
- Keyboard: TAB/Shift+TAB cycles inside modal; ESC closes.
- Focus restoration to the Learn more button after closing.

Rollout toggles
- Data attribute data-variant (default|compact) to switch between 4‑item and 3‑item variants.
- Optional data-hide to disable on specific pages during pilots.

Integration checklist
- Add block HTML to index.html and results/journey/index.html.
- Add small CSS rules to style.css.
- Add motivation.js and call enhanceMotivationBlocks() at the end of each page.
- Add a minimal test pass (manual) across viewport sizes.

Future enhancements
- Swap in cited quantitative stats behind a feature flag when you finalize sources for your student population.
- Personalize bullets using top strengths (e.g., "With Curiosity and Hope, try…").
- Expand Learn more modal with collapsible sections.
