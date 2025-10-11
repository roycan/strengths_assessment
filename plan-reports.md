# Reports Plan: Student-Friendly Reports for VIA Strengths Assessment

Updated: 2025-10-11

## Goals
- Provide clear, printable, student-friendly reports that translate assessment results into action.
- Keep all computation and file generation on-device (privacy-first, static hosting friendly).
- Avoid proprietary content; use our own VIA strengths content and original copy.
 - Introduce an optional, evidence-aligned lens to organize strengths into four functional groups without changing scoring.

## Non-goals
- Server-side rendering or storage of student data.
- Replicating proprietary wording, layouts, or trademarks from third-party assessments.
- Full PDF/UA compliance at MVP (target high-quality print CSS first; revisit PDF/UA later).

## Audience and use cases
- Students who completed the VIA assessment and want a take-away report.
- Instructors/coaches who encourage reflective action plans.
- Situations requiring a printable artifact (advising sessions, portfolios, coursework).

## Deliverables (report types)
1) Top 5 Quick Report (1–3 pages)
- Purpose: Lightweight summary + immediate actions.
- Sections: Cover → Top 5 overview (with 4-group context: Analytical, Interpersonal, Intrapersonal, Emotional) → Per-strength quick guidance (Spot/Apply/Reflect) → “Next week’s action” checklist.

2) Full Profile Report (3–6 pages)
- Purpose: Deeper context for the full set of 24 strengths.
- Sections: Cover → Motivation/why → Four Groupings overview (optional: Analytical, Interpersonal, Intrapersonal, Emotional) → Top 5 details → Full 24 ranking table (scores + % of max) with group tags → Selected focus strengths (student-chosen) with deeper prompts → Reflection page.

3) Action Plan Worksheet (1 page)
- Purpose: A printable worksheet to convert insight into action.
- Sections: Goal for this week → Strength(s) I’ll use → New ways I’ll apply → Anticipated obstacles → Supports → Reflection prompts.

4) (Future) Instructor/Coach Summary (opt-in only)
- Purpose: Enable coaching conversations. Local-only generation; sharing is student-controlled.
- Sections: Strengths profile snapshot (no personal data unless entered) → Student-stated goals → Suggested discussion prompts.

## Inputs and data mapping
- Results source: localStorage under `APP_KEY` (current: `scholars_compass_via_v3`).
  - Fields: strength scores, rank order, percent of max, counts for Equal/Neither, timestamps.
- Content source: `content/strengths-content.js` (24 strengths, with structured sections: title/tagline/intro/spot/apply/reflect, etc.).
- Optional user inputs: name/initials, program/course, date (default today), focus goals (entered on report page, not stored unless user exports JSON/CSV).

## Information architecture (per report)
- Cover
  - Title, optional name/initials, date, privacy note (“Generated locally; nothing uploaded”), optional school logo.
- Motivation (short)
  - Why strengths matter (original copy; references list as links/footnotes).
- Results summary
  - Top 5 list with rank numbers and percent of max.
  - Four Groupings snapshot (optional): show which of Analytical, Interpersonal, Intrapersonal, Emotional your Top 5 fall into; emphasize this is a helpful lens, not a rule.
- Per-strength guidance (Top 5)
  - For each: short tagline, 2–3 bullets each for Spot / Apply / Reflect (from our content; concise variants).
- Full ranking
  - Table of 24 strengths with score and % of max; brief one-line description; include primary group tag for orientation.
- Action plan
  - One-page checklist with fillable fields (print-friendly; optional to include).
- References and acknowledgments
  - Our sources for motivation claims (links only; no copyrighted text), VIA framework acknowledgment (descriptive, not adopting third-party marks).

## Four functional groupings (lens)
We will use a practical, research-aligned lens to organize strengths. This lens does not change scores; it simply aids reflection and planning. Some strengths plausibly span more than one domain; we assign a primary group and may note a secondary when helpful.

- Analytical (Cognitive/Analytical)
  - Creativity, Curiosity, Judgment, Love of Learning, Perspective
  - Student-friendly framing: How you understand, analyze, and generate ideas.
  - Coaching prompts: Where does analytical work energize you? Where could an analytical strength remove friction this week?
  - One-paragraph description (student-facing): Analytical strengths help you work with ideas—asking better questions, connecting patterns, and making sense of what you’re learning. When you lean into these, you notice insights sooner, plan more clearly, and create useful options when you’re stuck. They’re especially powerful when paired with a small, concrete next step.

- Interpersonal (Social/Interpersonal)
  - Love, Kindness, Social Intelligence, Humor, Leadership, Teamwork, Fairness
  - Framing: How you connect, communicate, and build trust.
  - Prompts: What relationship or team outcome could benefit from these strengths now?
  - One-paragraph description (student-facing): Interpersonal strengths help you build trust and move with others—tuning into people, creating safety, and guiding a group toward better outcomes. Using them intentionally can transform study groups, projects, and friendships. Start by asking, “What does this person or team need from me at my best today?”

- Intrapersonal (Self‑Management/Regulatory)
  - Prudence, Self‑Regulation, Perseverance, Forgiveness, Humility, Honesty
  - Framing: How you steer yourself—habits, follow-through, integrity.
  - Prompts: Which habit or challenge could improve with one small self‑mastery experiment?
  - One-paragraph description (student-facing): Intrapersonal strengths help you steer your attention and actions—choosing wisely, following through, and recovering when plans go sideways. Small wins compound here: one calm reset, one honest check-in, or one thoughtful boundary can shift a whole week.

- Emotional (Transcendent/Emotional)
  - Gratitude, Hope, Spirituality, Appreciation of Beauty, Zest, Bravery
  - Framing: How you find purpose, energy, and perspective under stress.
  - Prompts: What would feel more meaningful this week, and which strength could create that?
  - One-paragraph description (student-facing): Emotional strengths fuel your “why”—they lift energy, widen perspective, and help you act in line with your values, especially under pressure. When you use them, effort feels more purposeful and sustainable. A tiny ritual (gratitude, a hopeful plan, a moment of courage) often changes the whole day.

Notes on overlap (for internal consistency and messaging):
- Humor: primary Interpersonal; often boosts Emotional through positive emotion.
- Zest: primary Emotional; relates to Intrapersonal via energy regulation.
- Bravery: primary Emotional (values-driven courage); relates to Intrapersonal (approach under fear).
- Leadership: primary Interpersonal; relates to Intrapersonal (modeling, self-regulation).
- Perspective: primary Analytical; aids Interpersonal (counsel, advice).
- Honesty: primary Intrapersonal (integrity); supports Interpersonal (trust).
- Forgiveness: primary Intrapersonal (emotion regulation); supports Interpersonal (repair).
- Gratitude: primary Emotional; strengthens Interpersonal (bonding).

Student-facing disclaimer (to reuse in report/journey):
“These groups are helpful lenses, not hard categories. Strengths often overlap and can show up differently by person, culture, and context. Use the lens if it helps; ignore it if it doesn’t.”

## Technical approaches
- A) Print-ready HTML (recommended MVP)
  - Implement `results/report.html` that reads local results and renders the report.
  - Strong print CSS for A4/Letter, margins, page breaks, colors, page numbers.
  - "Print / Save as PDF" button using `window.print()`; consistent across platforms.

- B) Client-side PDF export (enhancement)
  - Use `html2pdf.js` (html2canvas + jsPDF) to produce a downloadable PDF entirely client-side.
  - Pros: single-click PDF; more uniform across browsers. Cons: larger JS, some rasterization.

- C) Server-side PDF (out-of-scope for privacy)
  - Tools like Puppeteer/wkhtmltopdf require a server; conflicts with static/privacy-first goals.

## Feasibility assessment
- Data availability: ✅ We have full scores, ranks, and structured content for all 24 strengths.
- Architecture fit: ✅ Static HTML/JS with localStorage suits on-device generation and printing.
- Print CSS: ✅ Straightforward; we already control the layout and assets.
- Client-only PDF: ✅ Feasible with `html2pdf.js`; optional and can be deferred.
- Accessibility: ⚠️ HTML is accessible; print-to-PDF won’t be PDF/UA. If required later, investigate specialized tooling.
- Legal/ethics: ✅ Use our own wording and VIA framework names; do not copy third-party content. Add disclaimers where needed.
 - School alignment: ✅ The four labels (Analytical, Interpersonal, Intrapersonal, Emotional) map cleanly to existing school lenses; we’ll use them as labels only, not scores.
 - Faculty review: ✅ Only a handful of placements need confirmation (Humor, Zest, Bravery, Perseverance, Leadership, Perspective); safe defaults exist meanwhile.

## Accessibility and UX
- Semantics: Proper headings hierarchy, tables with headers, landmark roles.
- Print colors and contrast: High contrast, 11–12 pt base size, avoid text over dark backgrounds.
- Page breaks: Use `page-break-before/after` (or `break-before/after`) for clean sections.
- Links: Show URLs in print via `content: attr(href)` for references.
- Forms: Use large, lined areas for handwritten notes on the worksheet.

## Privacy and security
- All generation on-device; no network calls for report creation.
- Optional name/initials; default is anonymous.
- Clear privacy note on the cover and report page.

## Branding and visuals
- Minimal academic styling; optional small logo slot (student-provided or school-provided asset).
- Consistent typography with Bulma base + print overrides.
- Non-intrusive colors; rely on weight/spacing for hierarchy.

## Acceptance criteria (MVP)
- Report page loads offline and renders correct Top 5 and full 24 with accurate numbers.
- Print to PDF produces a clean, legible document with proper page breaks.
- No outbound network requests are required to generate the report.
- No proprietary text from third-party assessments is present.
- Action plan section is included and printable.
 - Group tags are displayed as an optional lens (no group scoring), and messaging clarifies they are descriptive, not diagnostic.
 - The four category labels (Analytical, Interpersonal, Intrapersonal, Emotional) are applied as primary-only tags; secondary “supports” tags are not shown in MVP.
 - The optional “balance snapshot” (count of Top 5 per category) is clearly labeled as “for reflection,” not evaluation (can be toggled off if needed).

## Success metrics
- Time-to-first-report (under 2 seconds on a typical laptop).
- Print-to-PDF with < 1MB size for Top 5 report (typical case; images minimal).
- Student qualitative feedback: “useful,” “clear,” “actionable.”

## Rollout plan and effort
- MVP (0.5–1.5 days)
  - `results/report.html` template and print CSS.
  - Compose report from localStorage + `strengths-content.js`.
  - Add CTAs from results and journey pages.

- v2 polish (0.5–1 day)
  - Configurable sections (include/exclude), optional name/initials, course/program fields.
  - Improved table styling and reference formatting.

- v3 enhancement (0.5–1 day)
  - One-click client-side PDF via `html2pdf.js` with progress indicator.
  - Optional small logo support (stored in memory; never uploaded).

## Risks and mitigations
- PDF fidelity across devices → Start with print CSS; add client-side PDF export for consistency.
- Overly long reports → Keep Top 5 concise; move deeper descriptions to strength pages if needed.
- Content drift/maintenance → Source copy from our single `strengths-content.js` to avoid duplication.
- Confusion with other brands → Use original copy; neutral visual design; disclaimers.
 - Reification of group labels → Use soft language and a disclaimer; avoid group “scores” at MVP; allow students to choose focus areas irrespective of groups.
  - Faculty alignment lag → Ship with primary-only tags; keep a tiny internal mapping for “supports”; revisit after targeted faculty review of six flagged strengths.

## Coaching guidance (for copy tone and calls-to-action)
- Normalize variability: “Different weeks call on different strengths. Start where there’s energy.”
- Make it tiny: “Pick one 10-minute action that uses a strength in a new way.”
- Close the loop: “Reflect briefly—what changed in mood, energy, or progress?”
- Protect autonomy: “These groupings are optional lenses—use what helps, ignore what doesn’t.”

## Micro-actions library (optional, swappable)
Use these as examples on the Action Plan page; students can replace them with their own. Keep each action 10–20 minutes and concrete.

- Analytical
  - Skim a related article and jot 3 questions you’re curious about; pick one to explore this week.
  - Re-plan a stuck task: list 3 alternative approaches; choose the easiest and schedule 15 minutes.

- Interpersonal
  - Send one strengths-based thank-you message to a classmate or mentor, naming what they did well and why it helped.
  - In your next group meeting, ask one clarifying question and summarize agreements at the end in 2 sentences.

- Intrapersonal
  - Do a 10-minute focused work block (timer on), then a 2-minute honest check-in: what worked, what to tweak.
  - Set a tiny boundary: pick one distraction to mute or move for the next study session; reflect on the difference.

- Emotional
  - Write down one hopeful outcome for the week and the first small step; take that step today.
  - Do a 3-item gratitude note (people, moments, or places) and share one with someone who’d appreciate it.

### How to use micro‑actions (blurb)
Start tiny and keep it real. Pick one 10–20 minute action that uses a top strength in a new way. Put it on your calendar, do it, and jot a 2‑sentence reflection: what changed in mood, energy, or progress? Each week, keep what helped and swap what didn’t. Small wins compound.

## Open questions
- Do we want a name field by default, or keep anonymous unless the student opts in?
- Should we include course/program info in the cover for class submissions?
- Do we want a short appendix explaining Equal vs Neither and timeouts?
- Should the instructor summary be part of this scope or tracked separately?
 - Do we want to display secondary group tags for ambiguous strengths, or keep them internal for consistency?
 - Should the report include a brief “balance snapshot” (count of Top 5 by group) as a reflection aid?

## MVP decision locks (for implementation)
- Use category labels Analytical, Interpersonal, Intrapersonal, Emotional in reports (labels only).
- Show primary tag only for each strength; hide secondary “supports” tags in MVP.
- Include: Top 5 with taglines + Spot/Apply/Reflect; full 24 table with % of max + primary tag; Action Plan with micro‑actions + usage blurb; short motivation + references; privacy note.
- Exclude (MVP): group/category scores, one‑click PDF export, logos/branding, instructor summary, secondary tags in UI.
- CTAs: Link to the report from Results and Journey pages.

## Faculty review targets
- Humor, Zest, Bravery, Perseverance, Leadership, Perspective (confirm primary/“supports” usage and any context notes).

## Reference: 24-strength crosswalk (primary + supports)
This crosswalk provides a pragmatic lens for organization and reflection. Each strength has one primary group and optional “supports” tags where it commonly shows up in another domain. Use in reports as labels only (no group scoring). Items flagged “Faculty confirm” are worth validating with your school context.

| Strength | Primary group | Supports | Notes |
|---|---|---|---|
| Creativity | Analytical | Interpersonal | Ideation in teams |
| Curiosity | Analytical | Emotional | Energy/enthusiasm for inquiry |
| Judgment (Critical Thinking) | Analytical | Intrapersonal | Wise choices, discernment |
| Love of Learning | Analytical | Intrapersonal | Persistence with learning routines |
| Perspective | Analytical | Interpersonal | Counsel/advice; Faculty confirm |
| Love | Interpersonal | Emotional | Meaning/purpose in relationships |
| Kindness | Interpersonal | Emotional | Warmth, compassion |
| Social Intelligence | Interpersonal | Intrapersonal | Self-awareness/regulation socially |
| Humor | Interpersonal | Emotional | Positive emotion/morale; Faculty confirm |
| Leadership | Interpersonal | Intrapersonal, Analytical | Modeling/self-reg; strategy; Faculty confirm |
| Teamwork | Interpersonal | Intrapersonal | Reliability, follow-through |
| Fairness | Interpersonal | Analytical | Principled reasoning |
| Prudence | Intrapersonal | Analytical | Planning, foresight |
| Self‑Regulation | Intrapersonal | Emotional | Mood/energy regulation |
| Perseverance | Intrapersonal | Analytical, Emotional | Plan execution; grit under stress; Faculty confirm |
| Forgiveness | Intrapersonal | Interpersonal | Relationship repair |
| Humility | Intrapersonal | Interpersonal | Trust, collaboration |
| Honesty | Intrapersonal | Interpersonal | Credibility, trust |
| Gratitude | Emotional | Interpersonal, Intrapersonal | Bonding; resilience |
| Hope | Emotional | Analytical, Intrapersonal | Goal pathways; self‑talk |
| Spirituality | Emotional | Intrapersonal | Values-aligned choices |
| Appreciation of Beauty & Excellence | Emotional | Analytical | Aesthetic standards/judgment |
| Zest | Emotional | Intrapersonal, Interpersonal | Energy habits; group morale; Faculty confirm |
| Bravery | Emotional | Intrapersonal, Interpersonal | Approach behavior; speaking up; Faculty confirm |

## Next steps (no code yet)
1) Approve the structure and MVP scope above.
2) Finalize the short blurbs per strength (Top 5) derived from our content file.
3) Define the cover’s optional fields (name/initials, program, date).
4) Decide whether to include the Equal/Neither explanation in the report.
5) After approval, implement `results/report.html` with print CSS and add CTAs.

## Implementation checklist (when approved)
- Report page
  - Read results from localStorage (v3→v2→v1 fallback).
  - Render: cover, motivation note, Top 5 with taglines + Spot/Apply/Reflect, full 24 table with % max + primary category tag, Action Plan with micro‑actions + usage blurb, references, privacy note.
  - Optional: balance snapshot (count of Top 5 per category) labeled “for reflection.”
- Print CSS
  - `@media print` styles: margins, font sizes, high-contrast, avoid background colors.
  - Page breaks before major sections; sticky table headers via `thead { display: table-header-group; }`.
  - Ensure legibility in grayscale.
- CTAs
  - Add buttons/links to the report from Results and Journey pages.
- Data absence/migration
  - Show a friendly “no results” message with link to assessment if local results are missing.
- Accessibility
  - Headings hierarchy, table headers, landmarks, link URLs visible in print.

## Content preflight checklist
- Taglines: 24 strengths have ≤120‑character taglines.
- Table blurbs: ≤80‑character one-liners or omit if tight.
- Micro‑actions: 1–2 per category reviewed for clarity and 10–20 minute scope.
- Group disclaimer and micro‑actions blurb included.
- References: links present; no proprietary text.
- Privacy note finalized.

## Testing matrix (print readiness)
- Browsers: Chrome (Linux/Windows/Mac), Firefox (Linux/Windows/Mac), Edge (Windows).
- Print checks: page breaks between sections; table header repeats; legibility in black & white; margins sane on A4/Letter; Save-as-PDF size.
- Offline: open via `file://` using relative paths; verify no external fetch required beyond CDN CSS (or host Bulma locally if strictly offline needed).

## Faculty review checklist (targeted)
- Review the six flagged strengths for primary/supports: Humor, Zest, Bravery, Perseverance, Leadership, Perspective.
- Confirm student-facing labels (Analytical, Interpersonal, Intrapersonal, Emotional).
- Decide if the balance snapshot should be visible by default.
- Approve the Action Plan micro‑actions list and the usage blurb.

## Future enhancements backlog
- One‑click client-side PDF export (html2pdf.js) with progress indicator.
- Optional logo/branding (local only).
- Instructor/coach summary report (opt-in only).
- Secondary “supports” tags UI (tooltips or appendix) after faculty alignment.
- Export of report as JSON with student-added fields (name, goals) kept local.
