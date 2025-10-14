# Learning Mini‑App: Results Rendering Fix Plan

Updated: 2025-10-14

## Context
The results view in `learning/index.html` shows label/content mismatches and duplicate labels in the scores list (e.g., primary style says “Kinesthetic” while strategies read as Visual; multiple rows labeled “Kinesthetic”). Root causes are likely:
- Data mapping inconsistency between scoring keys and info/strategies keys.
- Rendering bug where the row label uses a single variable (primary name) instead of each item’s name from the results array.

## Goals
- Correctly compute and render the primary learning style and its matching description/strategies.
- Render the scores list with the correct label per row.
- Ensure progress bar, totals, and tie handling are consistent and predictable.

## Non‑Goals
- Redesign of UI/UX.
- Adding new styles or changing the assessment content.
- Persisting multiple attempts or export formats beyond current JSON.

## Acceptance Criteria (MVP)
- Primary style name matches the description/strategies block (from the same canonical key).
- Scores list renders one row per style with the correct style name and score; no duplicate labels unless scores truly tie for the same style (which should still only appear once).
- Progress bar reflects total items (value increments from 1..N, max = number of questions).
- If there’s a tie for top score, the UI either:
  - Picks a deterministic winner (first in sorted list) and adds a one‑line “tie” note, or
  - Shows “Co‑primary: A and B” (defer if out of scope).
- No console errors on click or render; app works when opened via `file://` and on localhost.

## Implementation Outline
1) Data normalization
- Open `learning/data.js` and ensure a single canonical set of keys is used across:
  - scoring map keys,
  - styles info keys (name, description, strategies),
  - any UI label mapping (if present).
- Canonical keys (example): `Visual`, `Auditory`, `Read/Write`, `Kinesthetic`.

2) Primary style calculation
- After quiz completion, build a scores object (style -> total) using `scoringMap`.
- Convert to array and sort descending; store as `results`.
- Set `primary = results[0]`.
- Fetch info with `stylesInfo[primary.name]` (same key) for the description and strategies.

3) Results rendering fixes
- Primary header: use `primary.name` and its matching `stylesInfo[primary.name]` fields.
- Recommended strategies: render from the same info object as the primary (or a separate `strategies` map keyed identically).
- Scores list: iterate `results` and render `item.name` + computed percentage/score; do not reference `primary.name` when printing row labels.
- Progress bar: set `quizProgress.max = appData.questions.length` and `quizProgress.value = currentQuestionIndex + 1` on each render.

4) Tie handling (simple deterministic)
- If `results.length > 1` and `results[0].score === results[1].score`, show a small note under the primary: “Top scores are tied; showing the first by list order.”

5) Defensive guards
- If `appData` missing or `questions` empty, show a friendly error instead of starting.
- Wrap localStorage JSON parse in try/catch for “View Saved Results.”

## Testing Plan
- Unit‑like manual checks:
  - Force a known set of answers (e.g., select the same option across all items) and verify the expected top style and consistent labels.
  - Simulate a tie by crafting answers that equalize two styles; verify the tie message.
- Browser checks:
  - Chrome/Firefox: run via `file://` and via localhost; check for console errors.
- UX checks:
  - Ensure progress bar advances from 1 to N and completes at N.
  - Confirm layout and colors match `learning/style.css` (accent color variable applied).

## Risks and Mitigations
- Key mismatch across data objects → Add a quick validation snippet during init (log missing keys) and standardize names once.
- Off‑by‑one in progress bar → Use `value = currentQuestionIndex + 1` when displaying the current item.
- Tie complexity → Start with a deterministic note; expand later if needed.

## Effort Estimate
- 1–2 hours including test passes and tie note.

## Rollback Plan
- Keep changes limited to `learning/data.js` and `learning/script.js` rendering logic; no layout changes. Revert these two files if needed.
