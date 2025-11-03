Run comprehensive security audit scanning for vulnerabilities, secrets, and security issues.

## What This Does

1. Scan dependencies for known vulnerabilities
2. Check for exposed secrets and API keys
3. Run static security analysis
4. Check for common security misconfigurations
5. Generate security report

## Instructions

```bash
echo "🔒 Running Security Audit..."
echo ""

ISSUES_FOUND=0

# 1. Dependency Vulnerability Scan
echo "📦 Scanning dependencies for vulnerabilities..."

if [ -f "package.json" ]; then
  npm audit --audit-level=moderate
  if [ $? -ne 0 ]; then
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
elif [ -f "requirements.txt" ]; then
  pip install safety
  safety check --json
  if [ $? -ne 0 ]; then
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
elif [ -f "Gemfile" ]; then
  bundle audit check --update
  if [ $? -ne 0 ]; then
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
fi

# 2. Secret Scanning
echo ""
echo "🔑 Scanning for exposed secrets..."

# Install gitleaks if not present
if ! command -v gitleaks &> /dev/null; then
  echo "Installing gitleaks..."
  brew install gitleaks || echo "Please install gitleaks manually"
fi

if command -v gitleaks &> /dev/null; then
  gitleaks detect --source . --verbose
  if [ $? -ne 0 ]; then
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
fi

# 3. Check for common secrets in code
echo ""
echo "🔍 Checking for hardcoded secrets..."

SECRET_PATTERNS=(
  "password\s*=\s*['\"][^'\"]*['\"]"
  "api_key\s*=\s*['\"][^'\"]*['\"]"
  "secret\s*=\s*['\"][^'\"]*['\"]"
  "token\s*=\s*['\"][^'\"]*['\"]"
  "AKIA[0-9A-Z]{16}"
  "sk_live_[0-9a-zA-Z]{24}"
)

for pattern in "${SECRET_PATTERNS[@]}"; do
  if grep -r -E "$pattern" --exclude-dir={node_modules,.git,dist,build} .; then
    echo "⚠️  Found potential secret: $pattern"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
  fi
done

# 4. Check for .env files in git
echo ""
echo "📝 Checking for .env files..."

if git ls-files | grep -q "\.env$"; then
  echo "❌ .env files should not be committed to git"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
else
  echo "✅ No .env files in git"
fi

# 5. Static Application Security Testing
echo ""
echo "🛡️  Running static security analysis..."

if [ -f "package.json" ]; then
  # Install and run eslint-plugin-security
  npx eslint . --ext .js,.ts --plugin security
elif [ -f "requirements.txt" ] || [ -f "setup.py" ]; then
  # Install and run bandit
  pip install bandit
  bandit -r . -f json -o security-report.json
  cat security-report.json | jq
fi

# 6. Check HTTPS
echo ""
echo "🔐 Checking for HTTP usage..."

HTTP_URLS=$(grep -r "http://" --include="*.js" --include="*.ts" --include="*.py" --exclude-dir={node_modules,.git,dist,build} . | grep -v "localhost" | grep -v "127.0.0.1")

if [ -n "$HTTP_URLS" ]; then
  echo "⚠️  Found HTTP URLs (should use HTTPS):"
  echo "$HTTP_URLS"
  ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

# 7. Check for security headers (if web app)
if [ -f "nginx.conf" ] || [ -f "apache.conf" ]; then
  echo ""
  echo "🌐 Checking security headers..."

  REQUIRED_HEADERS=(
    "X-Content-Type-Options"
    "X-Frame-Options"
    "Content-Security-Policy"
    "Strict-Transport-Security"
  )

  for header in "${REQUIRED_HEADERS[@]}"; do
    if ! grep -q "$header" nginx.conf apache.conf 2>/dev/null; then
      echo "⚠️  Missing header: $header"
      ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
  done
fi

# 8. Generate Report
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SECURITY AUDIT REPORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ISSUES_FOUND -eq 0 ]; then
  echo "✅ No security issues found"
else
  echo "⚠️  Found $ISSUES_FOUND security issue(s)"
  echo ""
  echo "Recommendations:"
  echo "  • Fix all critical vulnerabilities"
  echo "  • Update dependencies regularly"
  echo "  • Never commit secrets to git"
  echo "  • Use environment variables for sensitive data"
  echo "  • Enable security headers"
  echo "  • Use HTTPS everywhere"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

## Best Practices

- Run regularly (weekly or before releases)
- Fix critical issues immediately
- Use secrets management tools
- Keep dependencies updated
- Enable automated security scanning in CI/CD
- Use security linters
- Follow OWASP guidelines
