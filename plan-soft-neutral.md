
Goal: Add a "Neither" option to the VIA strengths assessment app
Approach: Implement as a "soft neutral" compromise (not a true skip, not a full equal)

Requirements:
1. Update the WEIGHTS object:
   - Add a new key "neither" that gives small, balanced points to both A and B.
   - Example: { A: 0.5, B: 0.5 } or another low weight that keeps denominator consistent.

2. Update the HTML scale options:
   - Add a new radio button labeled "Neither fits me".
   - Place it visually distinct from the A/B continuum (e.g., below or centered).

3. Update renderQuestion():
   - Ensure the new "neither" radio option is cleared and enabled each time.
   - When selected, call recordSelection("neither").

4. Update recordSelection():
   - Handle the "neither" case by applying WEIGHTS.neither.
   - Still push a response object into STATE.responses with selection = "neither".
   - Mark timeout = false.

5. Update results logic:
   - No change needed to normalization, since "neither" still contributes points.
   - Percentages remain stable because denominator is unchanged.

6. Update UI/UX:
   - Tooltip or help text: "Choose 'Neither' if neither statement resonates. This option contributes lightly to both strengths."
   - Toast feedback when "Neither" is chosen (optional).

7. Testing:
   - Verify that choosing "Neither" increments index and saves state.
   - Verify that scores increase slightly for both strengths.
   - Verify that percentages remain consistent across students.

Outcome:
- Students have an escape hatch without breaking ipsative balance.
- Reliability is preserved because denominator is stable.
- Results remain comparable across students.