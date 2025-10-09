# Strengths Resource Hub – Implementation Plan (Draft)

This document proposes the exact file list, lightweight wireframes, and a minimal working skeleton for the new static pages to help users make sense of their results.

## URL and File Structure

We’ll keep the site static-host friendly. Option A is used (single template for strength profiles via query string), which minimizes file count and avoids rewrite rules.

- /index.html (existing assessment)
- /results/journey/index.html – Hub page after results
- /strength.html – Single template page for a strength profile, selected via `?id=<slug>`
- /guides/
  - strengths-at-work.html – Example guide article
- /content/strengths-content.js – Data for the 24 strengths (start with one: curiosity)
- /js/
  - journey.js – Builds the hub page from localStorage results
  - strength.js – Renders the profile page based on `?id=` and content file

Optional future extensions:
- /guides/*.html for more articles
- /results/journey/style overrides if needed

## Wireframes (ASCII)

### A) Journey Hub – /results/journey/index.html

---------------------------------------------
| H1: Congratulations on Discovering ...     |
| p: You now have a powerful insight ...     |
|                                            |
| H2: What Are Character Strengths?          |
| [static paragraph]                          |
|                                            |
| H2: The Golden Rule: Awareness ...         |
| [static paragraph]                          |
|                                            |
| H2: Your Roadmap                           |
| H3: Step 1: Deep Dive into Your Signatures |
|   [Dynamic list of top 5–10 strengths]     |
|   - Curiosity → /strength.html?id=curiosity|
|   - ...                                    |
|                                            |
| H3: Step 2: Learn the 4-Step Method        |
|   [Spot | Explore | Apply | Reflect]       |
|                                            |
| H3: Step 3: Put Your Strengths in Practice |
|   [links to guides]                        |
---------------------------------------------

Edge: if no results in localStorage → show CTA to take assessment at /index.html

### B) Strength Profile – /strength.html?id=curiosity

---------------------------------------------
| H1: The Explorer's Guide to: CURIOSITY     |
| p: Tagline                                 |
|                                            |
| H2: What is Curiosity?                     |
|   [Definition]                              |
| H2: Signs You Might Have Curiosity ...     |
|   - sign 1                                 |
|   - sign 2                                 |
|   - sign 3                                 |
| H2: Action Plan: Use Curiosity This Week   |
|   Work: ...                                 |
|   Relationships: ...                        |
|   Personal Growth: ...                      |
| H2: The Golden Mean: Watch Outs            |
|   Underuse: ...                             |
|   Overuse: ...                              |
| [Quote]                                     |
---------------------------------------------

Edge: if `?id` not found → show error + index of all strengths.

### C) Guide – /guides/strengths-at-work.html

---------------------------------------------
| H1: Using Your Strengths at Work           |
| Intro                                      |
| H2: Section                                |
|   ...                                      |
| Conclusion                                 |
---------------------------------------------

## Minimal Data Contract

- localStorage: `APP_KEY` (existing) with STATE.scores, STATE.completedAt
- Content file: `STRENGTHS_CONTENT[slug]` object
- Slug helper: derived from strength display names; sample: “Love of Learning” → `love-of-learning`

## Implementation Steps

1) Add new folders and files listed above.
2) Build `content/strengths-content.js` with one sample strength (curiosity).
3) Create hub page and JS that reads localStorage, renders top strengths list, or shows fallback.
4) Create strength template page and JS that reads `?id`, looks up content, and renders sections.
5) Create one guide page to validate navigation.
6) (Nice-to-have) Add CTA link from the results screen to /results/journey/.

## Validation

- Fresh device (no results): Hub shows assessment CTA; Profile shows error + list.
- Completed run: Hub shows dynamic top strengths; profile renders Curiosity.
- SEO: static titles/descriptions per page; can be improved later.

