Generate comprehensive test coverage report with thresholds and recommendations.

## What This Does

1. Runs tests with coverage
2. Generates HTML and text reports
3. Checks against coverage thresholds
4. Identifies untested code
5. Provides recommendations

## Instructions

```bash
echo "📊 Generating Test Coverage Report..."

# Detect testing framework
if [ -f "package.json" ]; then
  # JavaScript/TypeScript
  if grep -q "jest" package.json; then
    npx jest --coverage --coverageDirectory=coverage
  elif grep -q "vitest" package.json; then
    npx vitest run --coverage
  elif grep -q "mocha" package.json; then
    npx nyc mocha
  fi

  COVERAGE_DIR="coverage"

elif [ -f "pytest.ini" ] || [ -f "setup.py" ]; then
  # Python
  pytest --cov=. --cov-report=html --cov-report=term
  COVERAGE_DIR="htmlcov"

elif [ -f "go.mod" ]; then
  # Go
  go test -coverprofile=coverage.out ./...
  go tool cover -html=coverage.out -o coverage.html
  COVERAGE_DIR="."

elif [ -f "Gemfile" ]; then
  # Ruby
  bundle exec rspec --format documentation
  COVERAGE_DIR="coverage"

else
  echo "❌ No testing framework detected"
  exit 1
fi

# Parse coverage results
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 COVERAGE SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# JavaScript/TypeScript coverage summary
if [ -f "$COVERAGE_DIR/coverage-summary.json" ]; then
  # Use jq to parse coverage
  TOTAL_COVERAGE=$(cat $COVERAGE_DIR/coverage-summary.json | jq '.total.lines.pct')
  BRANCH_COVERAGE=$(cat $COVERAGE_DIR/coverage-summary.json | jq '.total.branches.pct')
  FUNCTION_COVERAGE=$(cat $COVERAGE_DIR/coverage-summary.json | jq '.total.functions.pct')
  STATEMENT_COVERAGE=$(cat $COVERAGE_DIR/coverage-summary.json | jq '.total.statements.pct')

  echo "Lines:      $TOTAL_COVERAGE%"
  echo "Branches:   $BRANCH_COVERAGE%"
  echo "Functions:  $FUNCTION_COVERAGE%"
  echo "Statements: $STATEMENT_COVERAGE%"

  # Check thresholds
  THRESHOLD=80

  if (( $(echo "$TOTAL_COVERAGE < $THRESHOLD" | bc -l) )); then
    echo ""
    echo "⚠️  Coverage below threshold ($THRESHOLD%)"
    STATUS="FAILED"
  else
    echo ""
    echo "✅ Coverage meets threshold ($THRESHOLD%)"
    STATUS="PASSED"
  fi
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Find untested files
echo ""
echo "📁 Files with low coverage (<50%):"
echo ""

if [ -f "$COVERAGE_DIR/coverage-summary.json" ]; then
  cat $COVERAGE_DIR/coverage-summary.json | jq -r '
    to_entries |
    map(select(.value.lines.pct < 50 and .key != "total")) |
    .[] |
    "\(.key): \(.value.lines.pct)%"
  ' | head -10
fi

# Generate detailed report
echo ""
echo "📄 Generating detailed report..."

cat > coverage-report.md << EOF
# Test Coverage Report

Generated: $(date)

## Summary

- **Lines:** ${TOTAL_COVERAGE:-N/A}%
- **Branches:** ${BRANCH_COVERAGE:-N/A}%
- **Functions:** ${FUNCTION_COVERAGE:-N/A}%
- **Statements:** ${STATEMENT_COVERAGE:-N/A}%

## Status

${STATUS:-UNKNOWN}

## Coverage Thresholds

- Minimum: 80%
- Target: 90%
- Goal: 95%

## Files Needing Attention

<!-- Low coverage files -->

## Recommendations

1. **Increase coverage for critical paths**
   - Focus on business logic
   - Test error handling
   - Cover edge cases

2. **Add integration tests**
   - Test component interactions
   - Verify data flow
   - Check side effects

3. **Improve test quality**
   - Test behavior, not implementation
   - Use meaningful assertions
   - Add edge case tests

4. **Exclude generated/vendor code**
   - Update coverage config
   - Ignore build artifacts
   - Skip third-party code

## Coverage Trends

| Date | Coverage | Change |
|------|----------|--------|
| $(date +%Y-%m-%d) | ${TOTAL_COVERAGE:-N/A}% | - |

## Next Steps

- [ ] Write tests for uncovered files
- [ ] Increase coverage to 90%
- [ ] Add integration tests
- [ ] Set up coverage CI checks
- [ ] Review and update test strategy

## View Full Report

HTML Report: \`$COVERAGE_DIR/index.html\`

\`\`\`bash
open $COVERAGE_DIR/index.html
\`\`\`
EOF

echo "✅ Report saved: coverage-report.md"
echo "✅ HTML report: $COVERAGE_DIR/index.html"
echo ""
echo "View report:"
echo "  open $COVERAGE_DIR/index.html"
echo ""
echo "Next steps:"
echo "  • Review uncovered code"
echo "  • Add missing tests"
echo "  • Set coverage threshold in CI"
```

## CI Integration

```yaml
# .github/workflows/test.yml
- name: Run tests with coverage
  run: /coverage-report

- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
```

## Best Practices

- Maintain >80% coverage
- Test critical paths first
- Don't chase 100% coverage
- Focus on meaningful tests
- Review coverage regularly
- Exclude generated code
- Track coverage trends
- Fail CI on coverage drop
