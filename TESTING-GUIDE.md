# Quick Reference: Testing Your Enhanced Strengths Profiles

## How to View the Enhanced Profiles

### Option 1: Local Web Server (Recommended)
```bash
cd /home/roy/Documents/Git-projs/strengths_assessment
python3 -m http.server 8765
```

Then open in browser:
- http://localhost:8765/strength.html?id=curiosity
- http://localhost:8765/strength.html?id=creativity
- http://localhost:8765/strength.html?id=leadership
- (Replace with any of the 24 strength IDs below)

### Option 2: Direct File Opening
Open `strength.html` directly in browser and add `?id=STRENGTH_ID` to the URL

## All 24 Strength IDs

### Cognitive Strengths
- `curiosity`
- `creativity`
- `judgment`
- `love-of-learning`
- `perspective`

### Courage Strengths
- `bravery`
- `perseverance`
- `honesty`
- `zest`

### Interpersonal Strengths
- `love`
- `kindness`
- `social-intelligence`

### Collaborative Strengths
- `teamwork`
- `leadership`
- `fairness`

### Temperance Strengths
- `forgiveness`
- `humility`
- `prudence`
- `self-regulation`

### Transcendence Strengths
- `humor`
- `appreciation-of-beauty`
- `gratitude`
- `hope`
- `spirituality`

## What You'll See on Each Profile Page

### Existing Sections (Enhanced)
1. **Hero Banner** - Thematic title and tagline
2. **What is [Strength]?** - Definition
3. **Signs You Might Have [Strength]** - 3 observable signs
4. **Action Plan** - Work, Relationships, Personal Growth
5. **The Golden Mean** - Underuse and Overuse warnings
6. **Quote** - Inspirational closing

### NEW Sections (Just Added) ✨
7. **Blindspots: Patterns to Watch For** - 2-3 cards per strength
   - Each with: Title, Pattern, Watch For, Balance Tip
   - Styled with blue left border
   
8. **[Strength] in Action** - 5 observable behaviors
   - Concrete examples students can recognize
   - Bulleted list format
   
9. **Real-World Example** - 1-2 sentence student story
   - Shows strength in authentic academic context
   - Green-bordered highlight box
   
10. **Complementary Strengths** - 2-3 pairs per strength
    - Shows synergy with other strengths
    - Each with: Pair name, Synergy explanation, Example
    - Purple-accented cards

## Quick Visual Check

### Expected Page Structure
```
[Hero Banner - Blue]

What is Curiosity?
[Definition paragraph]

Signs You Might Have Curiosity
• Sign 1
• Sign 2
• Sign 3

Action Plan: Use Curiosity This Week
• At Work: ...
• In Relationships: ...
• Personal Growth: ...

The Golden Mean: Watch Outs
• Underuse: ...
• Overuse: ...

🆕 Blindspots: Patterns to Watch For
[Card 1 - Blue border]
  Pattern: ...
  Watch For: ...
  Balance Tip: [Light blue box]

[Card 2 - Blue border]
  ...

[Card 3 - Blue border]
  ...

🆕 Curiosity in Action
• Observable behavior 1
• Observable behavior 2
• Observable behavior 3
• Observable behavior 4
• Observable behavior 5

🆕 Real-World Example
[Green-bordered box with italic text]
[1-2 sentence student story]

🆕 Complementary Strengths
[Card 1 - Purple border]
  Curiosity + Love of Learning
  Synergy: ...
  Example: ...

[Card 2 - Purple border]
  Curiosity + Judgment
  Synergy: ...
  Example: ...

[Quote in blockquote format]
```

## Print Preview Test

To check if profiles are 2-3 pages when printed:
1. Open any strength profile
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Check page count in print preview
4. Expected: 2-3 pages per strength

## Content Quality Checklist

For each strength profile, verify:
- ✅ 2-3 blindspots with gentle "you might notice" language
- ✅ 5 strength-in-action items (observable behaviors)
- ✅ 1 real-world student example (1-2 sentences)
- ✅ 2-3 complementary strength pairs with synergy explanations
- ✅ Consistent styling (colored borders, readable fonts)
- ✅ No spelling/grammar errors
- ✅ Student-appropriate language (ages 15-18)

## Common Issues & Solutions

### Issue: "Strength not found"
**Solution:** Check that strength ID exactly matches one of the 24 IDs (lowercase, with hyphens)

### Issue: New sections don't appear
**Solution:** 
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Check browser console for JavaScript errors
3. Verify all files saved correctly

### Issue: Styling looks wrong
**Solution:**
1. Clear browser cache
2. Check that `style.css` loaded correctly
3. Verify Bulma CDN loaded (check Network tab)

## Files You Modified

1. **content/strengths-content.js** - Added all content (most important file)
2. **strength.html** - Added display sections
3. **js/strength.js** - Added rendering logic
4. **style.css** - Added section styling

## Backup Before Deployment

Before sharing with students, create backup:
```bash
cd /home/roy/Documents/Git-projs/strengths_assessment
tar -czf backup-enhanced-$(date +%Y%m%d).tar.gz \
  content/strengths-content.js \
  strength.html \
  js/strength.js \
  style.css
```

## Student Pilot Testing Checklist

Before full rollout, test with 5-10 students:
- [ ] Can they navigate to strength profiles?
- [ ] Do blindspots feel accurate and helpful?
- [ ] Is the tone supportive (not judgmental)?
- [ ] Can they identify 1-2 blindspots in themselves?
- [ ] Do balance tips feel actionable?
- [ ] Are real-world examples relatable?
- [ ] Page length feels right (not too long)?
- [ ] Print version looks good?

## Sample Test URLs

Quick copy-paste for testing:
```
http://localhost:8765/strength.html?id=curiosity
http://localhost:8765/strength.html?id=creativity
http://localhost:8765/strength.html?id=judgment
http://localhost:8765/strength.html?id=bravery
http://localhost:8765/strength.html?id=leadership
http://localhost:8765/strength.html?id=kindness
http://localhost:8765/strength.html?id=gratitude
http://localhost:8765/strength.html?id=hope
```

---

**Ready to test! Open any of the URLs above to see your enhanced strength profiles in action.** 🎉
