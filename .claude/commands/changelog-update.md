Update CHANGELOG.md with latest changes following Keep a Changelog format.

## Instructions

```bash
VERSION=${1:-Unreleased}
DATE=$(date +"%Y-%m-%d")

if [ ! -f "CHANGELOG.md" ]; then
  cat > CHANGELOG.md << EOF
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- Initial release

EOF
  echo "✅ Created CHANGELOG.md"
else
  # Get commits since last tag
  LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")

  if [ -n "$LAST_TAG" ]; then
    COMMITS=$(git log $LAST_TAG..HEAD --oneline)
  else
    COMMITS=$(git log --oneline)
  fi

  # Categorize commits
  ADDED=$(echo "$COMMITS" | grep -i "^[a-f0-9]* feat:" || true)
  CHANGED=$(echo "$COMMITS" | grep -i "^[a-f0-9]* refactor:\|change:" || true)
  FIXED=$(echo "$COMMITS" | grep -i "^[a-f0-9]* fix:" || true)

  # Insert new section
  cat > /tmp/changelog_entry << EOF

## [$VERSION] - $DATE

### Added
$(echo "$ADDED" | sed 's/^[a-f0-9]* feat: /- /' || echo "- No new features")

### Changed
$(echo "$CHANGED" | sed 's/^[a-f0-9]* .*/- &/' || echo "- No changes")

### Fixed
$(echo "$FIXED" | sed 's/^[a-f0-9]* fix: /- /' || echo "- No fixes")

EOF

  sed -i '' "3r /tmp/changelog_entry" CHANGELOG.md
  echo "✅ Updated CHANGELOG.md"
fi

${EDITOR:-vim} CHANGELOG.md
```
