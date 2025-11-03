# Claude Code Configuration for three-vrm

This directory contains Claude Code extensibility configuration for the three-vrm project.

## What's Inside

### 📚 Skills (Auto-Activating Capabilities)

Located in `.claude/skills/`

**Core Skills:**
- `bug-finder.md` - Identifies bugs and issues in code
- `code-explainer.md` - Explains complex code sections
- `git-helper.md` - Assists with git operations and commits
- `readme-generator.md` - Generates documentation
- `test-helper.md` - Creates comprehensive tests
- `api-documentation-generator.md` - Generates API docs
- `testing-framework-helper.md` - Advanced testing support

**Three.js/VRM Skills:**
- `threejs-helper.md` - Three.js development expertise
- `vrm-model-helper.md` - VRM model loading and manipulation
- `typescript-monorepo-helper.md` - Monorepo management with Lerna

**How Skills Work:**
Skills automatically activate based on context. For example:
- Mention "VRM" → `vrm-model-helper` activates
- Mention "Three.js scene" → `threejs-helper` activates
- Working with monorepo → `typescript-monorepo-helper` activates

### ⚡ Commands (Manual Shortcuts)

Located in `.claude/commands/`

**Starter Commands:**
- `/explain` - Explain code
- `/test` - Generate tests
- `/commit` - Smart commit with message
- `/review` - Code review
- `/refactor` - Refactoring assistance
- `/docs` - Generate documentation
- `/debug` - Debug assistance
- `/quickfix` - Quick fixes for issues
- `/clean` - Clean build artifacts
- `/deps` - Dependency management
- `/todo` - Task management

**Advanced Commands:**
- `/bundle-analyze` - Analyze bundle size
- `/coverage-report` - Test coverage report
- `/performance-profile` - Profile performance
- `/version-bump` - Version management
- `/changelog-update` - Update changelog
- `/security-audit` - Security check

**Custom Commands:**
- `/dev-server` - Start development server
- `/build-all` - Build all packages
- `/check-examples` - Verify examples work

**Usage:**
```
/dev-server three-vrm
/build-all
/test
/commit
```

### 🤖 Agents (Specialized Assistants)

Located in `.claude/agents/`

**Core Agents:**
- `code-reviewer.md` - Comprehensive code review
- `debug-helper.md` - Advanced debugging assistance
- `doc-writer.md` - Documentation generation
- `test-writer.md` - Test suite creation

**Custom Agents:**
- `library-maintainer.md` - npm library maintenance, versioning, publishing
- `performance-engineer.md` - Three.js/WebGL performance optimization

**How to Use:**
```
"Review my code" → Activates code-reviewer agent
"Help me debug this Three.js issue" → Activates debug-helper agent
"How should I version this change?" → Activates library-maintainer agent
"Optimize this VRM rendering" → Activates performance-engineer agent
```

### 🪝 Hooks (Event-Driven Automation)

Located in `.claude/hooks/`

**Security Hooks:**
- `secret-scanning.json` - Prevents committing secrets
- `env-file-protection.json` - Blocks .env files from git

**Safety Hooks:**
- `prevent-force-push.json` - Stops force pushes to main/release
- `destructive-operation-confirm.json` - Confirms destructive operations
- `large-file-warning.json` - Warns about large files

**Code Quality Hooks:**
- `test-coverage-check.json` - Ensures test coverage
- `lint-before-commit.json` - Lints before commit
- `build-check.json` - Verifies build succeeds

**How Hooks Work:**
Hooks automatically trigger on specific events:
- Before commit → Check for secrets
- Before push → Prevent force push
- After edit → Run linting

You can enable/disable any hook by editing its JSON file:
```json
{
  "enabled": true  // Set to false to disable
}
```

### 📋 Rules (Project Guidelines)

Located in `.claude/rules/`

**Main Rules:**
- `CLAUDE.md` - Complete project guidelines including:
  - Code style conventions
  - TypeScript patterns
  - Monorepo workflow
  - Git practices
  - API design principles
  - Testing guidelines
  - Performance considerations

**Framework Rules:**
- Three.js best practices
- VRM specification compliance
- TypeScript strict mode

### ⚙️ Settings

Located in `.claude/settings.json`

Project configuration including:
- Code style preferences
- Testing configuration
- Build tool settings
- Monorepo structure
- Git workflow
- Publishing configuration

## Quick Start

### Using Skills

Skills activate automatically based on what you're doing:

```
You: "How do I load a VRM model?"
→ vrm-model-helper skill activates

You: "Optimize this Three.js scene"
→ threejs-helper skill activates

You: "Help with the monorepo"
→ typescript-monorepo-helper skill activates
```

### Using Commands

Invoke commands with `/` prefix:

```
/dev-server three-vrm
  → Starts dev server for @pixiv/three-vrm

/build-all
  → Builds all packages in dependency order

/test
  → Generates tests for current file

/commit
  → Reviews changes and creates smart commit message
```

### Using Agents

Request help from specialized agents:

```
"Review my VRM loading code"
  → code-reviewer agent provides detailed review

"How should I version this breaking change?"
  → library-maintainer agent provides guidance

"Why is my Three.js scene running slowly?"
  → performance-engineer agent analyzes and optimizes
```

## Project-Specific Features

### Three.js/VRM Expertise

The configuration includes deep knowledge of:
- Three.js r180+ API
- VRM 0.0 and VRM 1.0 specifications
- MToon material system
- WebGL and WebGPU rendering
- VRM features (humanoid, expressions, spring bones, look-at)
- Performance optimization for 3D graphics

### Monorepo Support

Specialized support for:
- Lerna workflows
- Yarn workspaces
- Independent package versioning
- Cross-package dependencies
- Build orchestration
- Publishing workflows

### Library Development

Expert guidance on:
- npm package configuration
- Semantic versioning
- Breaking change detection
- API design patterns
- Type declaration generation
- Tree-shaking support
- Bundle optimization

## Configuration Customization

### Enable/Disable Skills

Rename skill file:
```bash
mv skills/skill-name.md skills/skill-name.md.disabled
```

### Enable/Disable Hooks

Edit hook JSON:
```json
{
  "enabled": false
}
```

### Modify Commands

Edit command markdown files in `.claude/commands/`

### Update Rules

Edit `.claude/rules/CLAUDE.md` to update project guidelines

## Examples

### Example 1: Start Development

```
You: /dev-server three-vrm

Claude: Starting dev server for @pixiv/three-vrm...

Server available at: http://localhost:10001/examples/

Available examples:
- basic.html
- animations.html
- dnd.html
- webgpu-dnd.html
```

### Example 2: Get Help with VRM

```
You: How do I change a VRM model's facial expression?

Claude: [vrm-model-helper activates]

To change facial expressions in VRM:

const expressionManager = vrm.expressionManager;
expressionManager.setValue('happy', 1.0); // 0.0 to 1.0

Available preset expressions:
- happy, angry, sad, relaxed, surprised
- blink, blinkLeft, blinkRight
- aa, ih, ou, ee, oh (mouth shapes)

[Provides complete example code...]
```

### Example 3: Code Review

```
You: Review this VRM loading code

Claude: [code-reviewer agent activates]

I'll review your VRM loading implementation:

✅ Strengths:
- Proper error handling
- Uses GLTFLoader plugin pattern correctly

⚠️ Issues:
1. Missing VRM disposal on cleanup
2. No deltaTime validation for vrm.update()
3. Spring bones update every frame (consider throttling)

📝 Recommendations:
[Detailed recommendations with code examples...]
```

## Troubleshooting

### Skill Not Activating

- Check file exists in `.claude/skills/`
- Verify filename ends with `.md`
- Try being more explicit: "Use the vrm-model-helper skill"

### Hook Not Working

- Check `"enabled": true` in hook JSON
- Verify hook is in `.claude/hooks/`
- Check event type matches action

### Command Not Found

- Verify file exists in `.claude/commands/`
- Check filename matches command: `command-name.md` for `/command-name`
- Try `/help` to list available commands

## Benefits

### Consistency
- Code follows project conventions automatically
- Examples maintain Mr.doob's Code Style™
- Commit messages follow conventional commits

### Safety
- Prevents accidental secret commits
- Blocks force pushes to protected branches
- Warns about large files and destructive operations

### Productivity
- Quick access to project-specific knowledge
- Automated testing and documentation
- Smart git operations
- Performance optimization guidance

### Quality
- Automated code review
- Test coverage enforcement
- API design validation
- Documentation completeness

## Resources

### Official Documentation
- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/)
- [Skills Documentation](https://docs.claude.com/en/docs/claude-code/skills)
- [Hooks Documentation](https://docs.claude.com/en/docs/claude-code/hooks)

### Project Documentation
- [Three-VRM README](../README.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [VRM Specification](https://vrm.dev/)
- [Three.js Documentation](https://threejs.org/docs/)

## Maintenance

This configuration should be:
- Updated when project conventions change
- Reviewed when new features are added
- Customized based on team preferences
- Versioned in git for team consistency

---

**Configuration Version:** 1.0.0
**Last Updated:** 2025-11-03
**Maintained by:** three-vrm project team
