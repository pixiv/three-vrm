---
name: git-helper
description: Help with git operations, commit messages, branch management, and git workflows. Use when the user asks about git commands, commit messages, branches, merging, or git best practices.
allowed-tools: [Bash, Read]
---

# Git Helper Skill

Comprehensive guidance for working with Git effectively.

## Good Commit Messages

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring (no feature change or bug fix)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, build config)
- **perf**: Performance improvements

### Examples

✅ **Good commit messages:**
```
feat(auth): add password reset functionality

Users can now request a password reset email.
Email contains a secure token valid for 1 hour.

Closes #123
```

```
fix(api): handle null response from user endpoint

Added null check before accessing user properties.
This prevents server crashes when user doesn't exist.
```

```
docs: update installation instructions for Windows

Added section about required Visual C++ build tools.
Clarified Node.js version requirement.
```

❌ **Bad commit messages:**
```
fixed stuff
updated code
changes
asdfasdf
final version
final version 2
really final version now
```

## Branch Naming Conventions

### Common Patterns

**Feature branches:**
```
feature/user-authentication
feature/payment-integration
feat/add-dark-mode
```

**Bug fix branches:**
```
fix/login-error
bugfix/null-pointer-exception
hotfix/critical-security-issue
```

**Experiment branches:**
```
experiment/new-database
spike/performance-testing
```

**Release branches:**
```
release/v1.2.0
release/2024-01-15
```

### Rules for Branch Names
- Use lowercase
- Separate words with hyphens (kebab-case)
- Be descriptive but concise
- Include issue/ticket number if applicable: `feature/123-add-search`

## Common Git Workflows

### Feature Branch Workflow

```bash
# 1. Create a new branch from main
git checkout main
git pull origin main
git checkout -b feature/my-new-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 3. Push to remote
git push -u origin feature/my-new-feature

# 4. Create pull request on GitHub/GitLab

# 5. After review, merge to main
# (Usually done through PR interface)

# 6. Clean up
git checkout main
git pull origin main
git branch -d feature/my-new-feature
```

### Gitflow Workflow

```bash
# Main branches: main (production) and develop (integration)

# Start a feature
git checkout develop
git checkout -b feature/my-feature

# Finish a feature
git checkout develop
git merge feature/my-feature
git branch -d feature/my-feature

# Start a release
git checkout develop
git checkout -b release/1.2.0

# Finish a release
git checkout main
git merge release/1.2.0
git tag -a v1.2.0
git checkout develop
git merge release/1.2.0
git branch -d release/1.2.0

# Hotfix
git checkout main
git checkout -b hotfix/critical-bug
# ... fix the bug ...
git checkout main
git merge hotfix/critical-bug
git tag -a v1.2.1
git checkout develop
git merge hotfix/critical-bug
git branch -d hotfix/critical-bug
```

## Essential Git Commands

### Basic Operations
```bash
# Check status
git status

# View changes
git diff
git diff --staged

# Stage changes
git add <file>
git add .               # All files
git add -p              # Interactive staging

# Commit
git commit -m "message"
git commit              # Opens editor for detailed message

# Push
git push
git push origin <branch-name>
git push -u origin <branch-name>  # Set upstream

# Pull
git pull
git pull origin <branch-name>
```

### Branching
```bash
# List branches
git branch              # Local branches
git branch -r           # Remote branches
git branch -a           # All branches

# Create branch
git branch <branch-name>
git checkout -b <branch-name>       # Create and switch

# Switch branches
git checkout <branch-name>
git switch <branch-name>            # Newer command

# Delete branch
git branch -d <branch-name>         # Safe delete
git branch -D <branch-name>         # Force delete
git push origin --delete <branch-name>  # Delete remote
```

### Merging
```bash
# Merge branch into current branch
git merge <branch-name>

# Abort merge if conflicts
git merge --abort

# Resolve conflicts
# 1. Edit conflicting files
# 2. git add <resolved-files>
# 3. git commit
```

### Viewing History
```bash
# View commit history
git log
git log --oneline
git log --graph --oneline --all
git log -p              # Show diff in each commit
git log --author="name"

# View specific commit
git show <commit-hash>

# View file history
git log --follow <file>
```

### Undoing Changes

```bash
# Discard changes in working directory
git checkout -- <file>
git restore <file>      # Newer command

# Unstage files
git reset <file>
git restore --staged <file>  # Newer command

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) - CAREFUL!
git reset --hard HEAD~1

# Revert a commit (creates new commit)
git revert <commit-hash>
```

### Stashing
```bash
# Save changes temporarily
git stash
git stash save "description"

# List stashes
git stash list

# Apply stash
git stash apply
git stash apply stash@{0}

# Apply and remove stash
git stash pop

# Delete stash
git stash drop stash@{0}
git stash clear  # Delete all stashes
```

### Remote Operations
```bash
# View remotes
git remote -v

# Add remote
git remote add origin <url>

# Change remote URL
git remote set-url origin <new-url>

# Fetch from remote
git fetch origin

# Fetch and prune deleted branches
git fetch -p
```

## Common Scenarios

### Scenario: I committed to the wrong branch

```bash
# If you haven't pushed yet:
# 1. Note the commit hash
git log

# 2. Switch to correct branch
git checkout correct-branch

# 3. Cherry-pick the commit
git cherry-pick <commit-hash>

# 4. Go back to wrong branch and undo
git checkout wrong-branch
git reset --hard HEAD~1
```

### Scenario: I need to change my last commit message

```bash
# If you haven't pushed:
git commit --amend -m "new message"

# If you have pushed (be careful!):
git commit --amend -m "new message"
git push --force-with-lease
```

### Scenario: I want to undo a file I just committed

```bash
git reset HEAD~1 <file>
git commit --amend --no-edit
```

### Scenario: Merge conflicts

```bash
# When you see conflict markers in files:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# 1. Edit the file to resolve conflict
# 2. Remove conflict markers
# 3. Keep the code you want
# 4. Stage and commit
git add <resolved-file>
git commit -m "fix: resolve merge conflict"
```

### Scenario: I need to work on something else urgently

```bash
# Save current work
git stash

# Do urgent work
git checkout hotfix-branch
# ... make changes ...
git commit -m "fix: urgent bug"

# Return to original work
git checkout original-branch
git stash pop
```

## Git Best Practices

### Commits
1. **Commit often** - Small, focused commits are better
2. **Write good messages** - Explain why, not just what
3. **One logical change per commit** - Don't mix unrelated changes
4. **Review before committing** - Use `git diff` to check changes
5. **Don't commit sensitive data** - No passwords, API keys, etc.

### Branches
1. **Branch for each feature** - Don't work directly on main
2. **Keep branches short-lived** - Merge frequently
3. **Delete merged branches** - Clean up after merging
4. **Pull before pushing** - Avoid conflicts
5. **Use descriptive names** - Clear purpose from name

### General
1. **Pull frequently** - Stay up to date with team
2. **Never force push to main** - Protect shared branches
3. **Use .gitignore** - Don't commit build files, dependencies
4. **Review changes before staging** - Know what you're committing
5. **Use tags for releases** - Mark important points in history

## Helpful .gitignore Patterns

```gitignore
# Dependencies
node_modules/
venv/
vendor/

# Build outputs
dist/
build/
*.pyc
*.class
*.o

# Environment files
.env
.env.local
*.key
*.pem

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Temporary files
tmp/
temp/
*.tmp
```

## When to Use What

**git add -p**: When you want to stage only parts of a file

**git commit --amend**: When you forgot to include something in last commit

**git rebase**: When you want to clean up commit history before merging (advanced)

**git cherry-pick**: When you need a specific commit from another branch

**git bisect**: When you need to find which commit introduced a bug (advanced)

**git blame**: When you want to see who last changed each line of a file

**git reflog**: When you need to recover "lost" commits (advanced)

## Teaching Approach

When helping users with git:
1. **Understand their goal** - What are they trying to accomplish?
2. **Suggest the safest approach** - Avoid destructive commands when possible
3. **Explain the commands** - Don't just give commands, explain what they do
4. **Warn about dangers** - Especially with --force, --hard, etc.
5. **Show the full workflow** - Not just one command, show the complete process
6. **Check current state first** - Use git status to understand situation
