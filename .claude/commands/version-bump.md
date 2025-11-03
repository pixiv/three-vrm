Automatically bump semantic version (major.minor.patch) and update all relevant files.

## What This Does

1. Determines current version
2. Bumps version based on type (major/minor/patch)
3. Updates package.json, pyproject.toml, or other version files
4. Creates git commit and tag
5. Generates changelog entry

## Usage

```bash
/version-bump [major|minor|patch]
# Examples:
#   /version-bump patch  # 1.2.3 -> 1.2.4
#   /version-bump minor  # 1.2.3 -> 1.3.0
#   /version-bump major  # 1.2.3 -> 2.0.0
```

## Instructions

### 1. Parse Arguments

```bash
BUMP_TYPE=${1:-patch}

case $BUMP_TYPE in
  major|minor|patch)
    echo "📦 Bumping $BUMP_TYPE version..."
    ;;
  *)
    echo "❌ Invalid bump type: $BUMP_TYPE"
    echo "Usage: /version-bump [major|minor|patch]"
    exit 1
    ;;
esac
```

### 2. Detect Version File

```bash
VERSION_FILE=""
CURRENT_VERSION=""

# Check for package.json (Node.js)
if [ -f "package.json" ]; then
  VERSION_FILE="package.json"
  CURRENT_VERSION=$(node -p "require('./package.json').version")

# Check for pyproject.toml (Python)
elif [ -f "pyproject.toml" ]; then
  VERSION_FILE="pyproject.toml"
  CURRENT_VERSION=$(grep "^version" pyproject.toml | sed 's/version = "\(.*\)"/\1/')

# Check for Cargo.toml (Rust)
elif [ -f "Cargo.toml" ]; then
  VERSION_FILE="Cargo.toml"
  CURRENT_VERSION=$(grep "^version" Cargo.toml | sed 's/version = "\(.*\)"/\1/')

# Check for version.txt
elif [ -f "version.txt" ]; then
  VERSION_FILE="version.txt"
  CURRENT_VERSION=$(cat version.txt)

else
  echo "❌ No version file found"
  echo "Supported: package.json, pyproject.toml, Cargo.toml, version.txt"
  exit 1
fi

echo "Current version: $CURRENT_VERSION"
```

### 3. Calculate New Version

```bash
# Split version into parts
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

# Remove any pre-release suffix
PATCH=$(echo $PATCH | sed 's/-.*//')

# Bump version
case $BUMP_TYPE in
  major)
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
    ;;
  minor)
    MINOR=$((MINOR + 1))
    PATCH=0
    ;;
  patch)
    PATCH=$((PATCH + 1))
    ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"
echo "New version: $NEW_VERSION"
```

### 4. Update Version Files

```bash
# Update package.json
if [ "$VERSION_FILE" = "package.json" ]; then
  npm version $NEW_VERSION --no-git-tag-version
  echo "✅ Updated package.json"

  # Also update package-lock.json
  if [ -f "package-lock.json" ]; then
    npm install --package-lock-only
    echo "✅ Updated package-lock.json"
  fi
fi

# Update pyproject.toml
if [ "$VERSION_FILE" = "pyproject.toml" ]; then
  sed -i '' "s/^version = \".*\"/version = \"$NEW_VERSION\"/" pyproject.toml
  echo "✅ Updated pyproject.toml"
fi

# Update Cargo.toml
if [ "$VERSION_FILE" = "Cargo.toml" ]; then
  sed -i '' "s/^version = \".*\"/version = \"$NEW_VERSION\"/" Cargo.toml
  cargo build --release
  echo "✅ Updated Cargo.toml"
fi

# Update version.txt
if [ "$VERSION_FILE" = "version.txt" ]; then
  echo "$NEW_VERSION" > version.txt
  echo "✅ Updated version.txt"
fi

# Update additional version files
if [ -f "version.h" ]; then
  sed -i '' "s/#define VERSION \".*\"/#define VERSION \"$NEW_VERSION\"/" version.h
  echo "✅ Updated version.h"
fi

if [ -f "gradle.properties" ]; then
  sed -i '' "s/version=.*/version=$NEW_VERSION/" gradle.properties
  echo "✅ Updated gradle.properties"
fi
```

### 5. Update Changelog

```bash
DATE=$(date +"%Y-%m-%d")

if [ -f "CHANGELOG.md" ]; then
  # Create temp file with new entry
  cat > /tmp/changelog_entry << EOF
## [$NEW_VERSION] - $DATE

### Added
- (Add new features here)

### Changed
- (Add changes here)

### Fixed
- (Add bug fixes here)

EOF

  # Insert at line 3 (after title and empty line)
  sed -i '' "3r /tmp/changelog_entry" CHANGELOG.md
  echo "✅ Updated CHANGELOG.md (please fill in details)"

  # Open CHANGELOG for editing
  ${EDITOR:-vim} CHANGELOG.md
else
  # Create new CHANGELOG
  cat > CHANGELOG.md << EOF
# Changelog

All notable changes to this project will be documented in this file.

## [$NEW_VERSION] - $DATE

### Added
- Initial release

EOF
  echo "✅ Created CHANGELOG.md"
fi
```

### 6. Git Commit and Tag

```bash
echo "📝 Creating git commit..."

# Stage files
git add $VERSION_FILE CHANGELOG.md

if [ -f "package-lock.json" ]; then
  git add package-lock.json
fi

if [ -f "Cargo.lock" ]; then
  git add Cargo.lock
fi

# Commit
git commit -m "chore: bump version to $NEW_VERSION"

# Create tag
git tag -a "v$NEW_VERSION" -m "Version $NEW_VERSION"

echo "✅ Created commit and tag v$NEW_VERSION"
```

### 7. Summary

```bash
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 VERSION BUMPED SUCCESSFULLY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Old version: $CURRENT_VERSION"
echo "New version: $NEW_VERSION"
echo "Bump type: $BUMP_TYPE"
echo "Tag: v$NEW_VERSION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "  1. Review CHANGELOG.md"
echo "  2. Push changes: git push && git push --tags"
echo "  3. Create release: /create-release v$NEW_VERSION"
echo "  4. Publish package: npm publish (or equivalent)"
```

## Automation Tips

For automated version bumps in CI/CD:

```yaml
# .github/workflows/release.yml
- name: Bump version
  run: |
    git config user.name "github-actions"
    git config user.email "github-actions@github.com"
    /version-bump ${{ github.event.inputs.bump_type }}
```

## Best Practices

- Follow semantic versioning
- Update CHANGELOG with meaningful entries
- Create annotated git tags
- Push tags to trigger CI/CD releases
- Test before bumping major versions
- Document breaking changes
- Keep version consistent across files
