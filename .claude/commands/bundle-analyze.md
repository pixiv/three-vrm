Analyze JavaScript bundle size and provide optimization recommendations.

## Instructions

```bash
echo "📦 Analyzing bundle size..."

if [ -f "package.json" ]; then
  if grep -q "webpack" package.json; then
    npm run build -- --profile --json > stats.json
    npx webpack-bundle-analyzer stats.json
  elif grep -q "vite" package.json; then
    npm run build
    npx vite-bundle-visualizer
  elif grep -q "next" package.json; then
    ANALYZE=true npm run build
  fi
fi

echo "💡 Optimization tips:"
echo "  • Code-split large components"
echo "  • Tree-shake unused code"
echo "  • Use dynamic imports"
echo "  • Optimize images"
echo "  • Enable compression"
```
