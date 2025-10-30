#!/bin/bash

# VARK Learning Styles Assessment - Quick Test Script
# This script helps you test the complete implementation

echo "========================================="
echo "VARK Learning Styles Assessment"
echo "Quick Test & Verification Script"
echo "========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "learning/index.html" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   (the directory containing the 'learning' folder)"
    exit 1
fi

echo "✅ Found learning assessment directory"
echo ""

# Check all required files exist
echo "Checking required files..."
files=(
    "learning/index.html"
    "learning/data.js"
    "learning/script.js"
    "learning/style.css"
    "learning/report.html"
    "learning/report.js"
)

all_good=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ Missing: $file"
        all_good=false
    fi
done

echo ""

if [ "$all_good" = false ]; then
    echo "❌ Some files are missing. Please check the implementation."
    exit 1
fi

# Count questions in data.js
question_count=$(grep -c '"q":' learning/data.js)
echo "📊 Assessment Statistics:"
echo "  • Total questions: $question_count"

if [ "$question_count" -eq 15 ]; then
    echo "  ✅ Correct number of questions (15)"
else
    echo "  ⚠️  Expected 15 questions, found $question_count"
fi

echo ""

# Check for key content in report.html
echo "📄 Report Content Verification:"

checks=(
    "Your Learning Profile:page-profile"
    "Understanding Your Style:page-understanding"
    "Subject-Specific:page-strategies"
    "Adapting to Different:page-adapting"
    "Tools & Resources:page-tools"
    "2-Week Action Plan:page-action-plan"
    "Quick Reference:page-quick-reference"
    "Research Background:page-research"
)

for check in "${checks[@]}"; do
    IFS=':' read -r label id <<< "$check"
    if grep -q "$id" learning/report.html; then
        echo "  ✅ $label section"
    else
        echo "  ❌ Missing: $label"
    fi
done

echo ""

# Check for print styles
if grep -q "@media print" learning/report.html; then
    echo "✅ Print-optimized CSS found"
else
    echo "⚠️  Print styles not found"
fi

echo ""

# File sizes
echo "📦 File Sizes:"
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        size=$(wc -c < "$file" | awk '{print int($1/1024)"KB"}')
        echo "  • $file: $size"
    fi
done

echo ""
echo "========================================="
echo "🚀 Testing Instructions"
echo "========================================="
echo ""
echo "To test the complete implementation:"
echo ""
echo "1. Open learning/index.html in a browser:"
echo "   • Chrome: Right-click → Open with → Google Chrome"
echo "   • Or use a local server (see option 2)"
echo ""
echo "2. (Optional) Start a local server:"
echo "   cd $(pwd)"
echo "   python3 -m http.server 8000"
echo "   # Then visit: http://localhost:8000/learning/"
echo ""
echo "3. Take the assessment:"
echo "   • Answer all 15 questions"
echo "   • Check that results display correctly"
echo "   • Verify multi-modal detection (if applicable)"
echo ""
echo "4. View the full report:"
echo "   • Click 'View Full Report' button"
echo "   • Verify all 8 sections load with content"
echo "   • Check that your scores appear correctly"
echo ""
echo "5. Test print functionality:"
echo "   • Click 'Print / Save as PDF'"
echo "   • Check preview looks good"
echo "   • Try black & white mode"
echo "   • Verify page breaks are reasonable"
echo ""
echo "6. Test on mobile (if available):"
echo "   • Open on phone/tablet browser"
echo "   • Verify responsive layout"
echo "   • Test touch interactions"
echo ""
echo "========================================="
echo "📋 UAT Checklist Reference"
echo "========================================="
echo ""
echo "For comprehensive testing, see:"
echo "  • learning/user-stories.md"
echo "  • learning/uat-general.md"
echo "  • learning/uat-step-by-step.md"
echo ""
echo "✅ Setup complete! Ready for testing."
echo ""
