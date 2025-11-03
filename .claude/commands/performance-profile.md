Run performance profiling and analysis to identify bottlenecks and optimization opportunities.

## What This Does

1. Profile application performance
2. Analyze bundle size (frontend)
3. Check database query performance
4. Measure response times
5. Generate performance report with recommendations

## Instructions

```bash
echo "⚡ Running Performance Analysis..."
echo ""

# 1. Frontend Bundle Analysis
if [ -f "package.json" ]; then
  echo "📦 Analyzing bundle size..."

  # Webpack Bundle Analyzer
  if grep -q "webpack" package.json; then
    npm install --save-dev webpack-bundle-analyzer
    npx webpack-bundle-analyzer dist/stats.json
  fi

  # Vite bundle analysis
  if grep -q "vite" package.json; then
    npm run build -- --mode production
    npx vite-bundle-visualizer
  fi

  # Next.js bundle analysis
  if grep -q "next" package.json; then
    npx @next/bundle-analyzer
  fi
fi

# 2. Lighthouse Performance Audit (if web app)
echo ""
echo "🔦 Running Lighthouse audit..."

if command -v lighthouse &> /dev/null; then
  # Audit local or deployed site
  URL=${1:-http://localhost:3000}

  lighthouse $URL \
    --output html \
    --output-path ./lighthouse-report.html \
    --only-categories=performance

  echo "✅ Lighthouse report: ./lighthouse-report.html"
else
  echo "⚠️  Lighthouse not installed: npm install -g lighthouse"
fi

# 3. Backend Performance
echo ""
echo "⚡ Analyzing backend performance..."

# Python profiling
if [ -f "app.py" ] || [ -f "main.py" ]; then
  cat > profile_app.py << 'EOF'
import cProfile
import pstats
from pstats import SortKey

# Profile the application
cProfile.run('main()', 'profile_stats')

# Print stats
p = pstats.Stats('profile_stats')
p.sort_stats(SortKey.CUMULATIVE)
p.print_stats(20)
EOF

  python profile_app.py
fi

# Node.js profiling
if [ -f "server.js" ] || [ -f "index.js" ]; then
  echo "Run: node --prof server.js"
  echo "Then: node --prof-process isolate-*.log > profile.txt"
fi

# 4. Database Query Analysis
echo ""
echo "🗄️  Analyzing database queries..."

# PostgreSQL slow query log
if command -v psql &> /dev/null; then
  cat << 'EOF'
-- Add to postgresql.conf:
log_min_duration_statement = 100
log_statement = 'all'

-- Then query slow queries:
SELECT
  query,
  calls,
  total_time,
  mean_time,
  max_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
EOF
fi

# 5. Memory Usage Analysis
echo ""
echo "💾 Checking memory usage..."

if [ -f "package.json" ]; then
  # Use clinic.js for Node.js
  npm install -g clinic
  echo "Run: clinic doctor -- node server.js"
fi

# 6. Response Time Testing
echo ""
echo "⏱️  Testing API response times..."

# Create a simple load test
API_URL=${1:-http://localhost:3000/api/health}

if command -v ab &> /dev/null; then
  # Apache Bench
  ab -n 1000 -c 10 $API_URL

elif command -v wrk &> /dev/null; then
  # wrk
  wrk -t4 -c100 -d30s $API_URL

else
  # Simple curl timing
  for i in {1..10}; do
    curl -w "Time: %{time_total}s\n" -o /dev/null -s $API_URL
  done
fi

# 7. Check for N+1 Queries
echo ""
echo "🔍 Checking for N+1 query issues..."

# For Python/Django
if [ -f "manage.py" ]; then
  cat << 'EOF'
# Add to settings.py for debugging:
LOGGING = {
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}
EOF
fi

# 8. Generate Performance Report
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 PERFORMANCE REPORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cat > performance-report.md << 'EOF'
# Performance Analysis Report

## Bundle Size
- Check webpack-bundle-analyzer report
- Target: < 250KB gzipped for initial bundle

## Lighthouse Scores
- Performance: [score]/100
- Target: > 90/100

## API Response Times
- Average: [time]ms
- Target: < 200ms

## Database Queries
- Slow queries: [count]
- N+1 issues: [count]

## Recommendations
1. Code-split large components
2. Optimize images (use WebP, lazy load)
3. Enable caching
4. Optimize database queries
5. Use CDN for static assets
6. Implement pagination
7. Add database indexes
8. Minimize JavaScript bundle
9. Use compression (gzip/brotli)
10. Implement service workers

## Tools Used
- Lighthouse
- webpack-bundle-analyzer
- Chrome DevTools
- Database profiler

## Next Steps
- [ ] Fix critical performance issues
- [ ] Implement lazy loading
- [ ] Optimize database queries
- [ ] Add caching layer
- [ ] Monitor in production
EOF

echo "✅ Report generated: performance-report.md"
echo ""
echo "🎯 Key Metrics to Monitor:"
echo "  • Bundle size < 250KB gzipped"
echo "  • Lighthouse score > 90"
echo "  • API response < 200ms"
echo "  • Time to Interactive < 3.8s"
echo "  • First Contentful Paint < 1.8s"
```

## Best Practices

- Profile regularly
- Set performance budgets
- Monitor in production
- Optimize critical path
- Use lazy loading
- Implement caching
- Optimize images
- Minimize JavaScript
- Use CDN
- Enable compression
