# Three-VRM Claude Code Setup Summary

## ✅ Setup Complete!

A comprehensive Claude Code configuration has been installed for the three-vrm project.

## 📊 Configuration Statistics

### Skills: 10
- 7 Core skills (code explanation, testing, documentation, etc.)
- 3 Custom skills (Three.js, VRM, TypeScript monorepo)

### Commands: 21
- 12 Starter commands (explain, test, commit, review, etc.)
- 6 Intermediate commands (bundle analysis, performance, security)
- 3 Custom commands (dev-server, build-all, check-examples)

### Agents: 6
- 4 Core agents (code reviewer, debug helper, doc writer, test writer)
- 2 Custom agents (library maintainer, performance engineer)

### Hooks: 10
- 3 Security hooks (secret scanning, env protection)
- 3 Safety hooks (force push prevention, destructive operations, large files)
- 4 Code quality hooks (linting, testing, documentation, complexity)

### Rules: 1
- Complete project guidelines (CLAUDE.md)

## 🎯 Key Features

### 1. Three.js/VRM Expertise
- Deep knowledge of Three.js r180+ API
- VRM 0.0 and VRM 1.0 specification support
- MToon material system expertise
- WebGL/WebGPU rendering optimization
- Spring bone physics, expressions, look-at, humanoid bones

### 2. Monorepo Management
- Lerna workflow automation
- Yarn workspace support
- Independent package versioning
- Cross-package dependency management
- Build orchestration

### 3. Library Development
- npm package best practices
- Semantic versioning guidance
- API design patterns
- Type declaration generation
- Tree-shaking support
- Bundle optimization

### 4. Code Quality
- Automated code review
- Test generation and coverage
- Performance profiling
- Security scanning
- Documentation generation

### 5. Safety Features
- Prevents committing secrets (.env files, API keys)
- Blocks force pushes to main/release branches
- Warns about large files
- Confirms destructive operations
- Enforces test coverage
- Validates commit messages

## 🚀 Quick Start Guide

### Using Skills (Auto-Activate)

Skills activate automatically based on context:

\`\`\`
Mention "VRM" → vrm-model-helper activates
Mention "Three.js" → threejs-helper activates
Mention "monorepo" → typescript-monorepo-helper activates
Mention "test" → test-helper activates
\`\`\`

### Using Commands (Manual)

Invoke with \`/\` prefix:

\`\`\`bash
/dev-server three-vrm    # Start development server
/build-all               # Build all packages
/test                    # Generate tests
/commit                  # Smart commit
/review                  # Code review
/bundle-analyze          # Analyze bundle size
/performance-profile     # Profile performance
/check-examples          # Verify examples
\`\`\`

### Using Agents (Specialized Help)

Request specialized assistance:

\`\`\`
"Review my code" → code-reviewer
"Help debug this" → debug-helper
"Generate docs" → doc-writer
"Write tests" → test-writer
"Version guidance" → library-maintainer
"Optimize performance" → performance-engineer
\`\`\`

## 📁 Directory Structure

\`\`\`
.claude/
├── README.md                    # Complete guide
├── SETUP_SUMMARY.md            # This file
├── settings.json               # Project configuration
│
├── skills/                     # Auto-activating capabilities
│   ├── threejs-helper.md       # Three.js expertise
│   ├── vrm-model-helper.md     # VRM model development
│   ├── typescript-monorepo-helper.md
│   ├── code-explainer.md
│   ├── bug-finder.md
│   ├── test-helper.md
│   ├── git-helper.md
│   ├── readme-generator.md
│   ├── api-documentation-generator.md
│   └── testing-framework-helper.md
│
├── commands/                   # Manual shortcuts
│   ├── dev-server.md           # /dev-server
│   ├── build-all.md            # /build-all
│   ├── check-examples.md       # /check-examples
│   ├── test.md                 # /test
│   ├── commit.md               # /commit
│   ├── review.md               # /review
│   ├── bundle-analyze.md       # /bundle-analyze
│   ├── performance-profile.md  # /performance-profile
│   └── ... (21 total)
│
├── agents/                     # Specialized assistants
│   ├── library-maintainer.md   # Library development
│   ├── performance-engineer.md # Performance optimization
│   ├── code-reviewer.md
│   ├── debug-helper.md
│   ├── doc-writer.md
│   └── test-writer.md
│
├── hooks/                      # Event-driven automation
│   ├── secret-scanning.json
│   ├── env-file-protection.json
│   ├── prevent-force-push.json
│   ├── destructive-operation-confirm.json
│   ├── large-file-warning.json
│   ├── test-coverage-enforcement.json
│   ├── linting-enforcement.json
│   └── ... (10 total)
│
└── rules/                      # Project guidelines
    └── CLAUDE.md               # Complete project rules
\`\`\`

## 🎓 Learning Examples

### Example 1: Load VRM Model

\`\`\`
You: "How do I load a VRM model?"

Claude: [vrm-model-helper activates]
Here's how to load a VRM model:

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

const loader = new GLTFLoader();
loader.register((parser) => new VRMLoaderPlugin(parser));

loader.load('model.vrm', (gltf) => {
  const vrm = gltf.userData.vrm;
  scene.add(vrm.scene);
});

[Provides complete example with error handling, animation loop, etc.]
\`\`\`

### Example 2: Start Dev Server

\`\`\`
You: /dev-server three-vrm

Claude: Starting dev server for @pixiv/three-vrm...

Server available at: http://localhost:10001/examples/

Available examples:
- basic.html
- animations.html
- dnd.html
- webgpu-dnd.html

To run multiple servers:
PORT=10002 yarn dev
\`\`\`

### Example 3: Performance Help

\`\`\`
You: "My VRM scene is running slowly"

Claude: [performance-engineer activates]

Let me help optimize your VRM scene. First, let me check:

1. Renderer info for draw calls
2. Spring bone update frequency
3. Material complexity
4. Shadow map settings

[Provides detailed profiling and optimization steps]
\`\`\`

### Example 4: Library Maintenance

\`\`\`
You: "Is removing this method a breaking change?"

Claude: [library-maintainer activates]

Yes, removing a public method is a breaking change requiring a MAJOR version bump.

Current: 3.4.4 → New: 4.0.0

Recommendation:
1. Deprecate in current version:
   /**
    * @deprecated Use newMethod() instead. Will be removed in v4.0.0
    */
   public oldMethod() { ... }

2. Remove in next major version
3. Document in migration guide

[Provides complete versioning and migration guidance]
\`\`\`

## 🔒 Safety Features in Action

### Prevents Secret Commits

\`\`\`
You: /commit

Claude: ⚠️ WARNING: Detected potential secrets in files:
- .env (contains API_KEY)

These files will NOT be committed. Remove them from staging.

Would you like to add .env to .gitignore?
\`\`\`

### Blocks Force Push

\`\`\`
You: "Push --force to release branch"

Claude: 🛑 BLOCKED: Force push to protected branch 'release'

Protected branches:
- release
- main

Force pushing can overwrite team members' work and break CI/CD.

Use 'git push' without --force, or create a new branch.
\`\`\`

### Warns About Large Files

\`\`\`
You: "Add large 3D model file"

Claude: ⚠️ WARNING: Large file detected
- models/large-model.vrm (125 MB)

Large files slow down git operations.

Recommendations:
1. Use Git LFS for binary files
2. Host models externally (CDN)
3. Add to .gitignore if not needed in repo
\`\`\`

## 📈 Benefits

### For Development
- ✅ Faster onboarding (project knowledge built-in)
- ✅ Consistent code style (automated guidance)
- ✅ Better code quality (automated review)
- ✅ Fewer bugs (testing automation)
- ✅ Optimized performance (expert guidance)

### For Library Maintenance
- ✅ Proper versioning (semantic versioning guidance)
- ✅ Complete changelog (automated generation)
- ✅ API consistency (design pattern enforcement)
- ✅ Documentation completeness (automated checks)
- ✅ Backward compatibility (breaking change detection)

### For Team Collaboration
- ✅ Consistent workflows (standardized commands)
- ✅ Prevented mistakes (safety hooks)
- ✅ Knowledge sharing (documented patterns)
- ✅ Quality enforcement (automated checks)
- ✅ Faster reviews (AI-assisted)

## 🛠️ Customization

### Enable/Disable Skills

\`\`\`bash
# Disable a skill
mv .claude/skills/skill-name.md .claude/skills/skill-name.md.disabled

# Re-enable
mv .claude/skills/skill-name.md.disabled .claude/skills/skill-name.md
\`\`\`

### Enable/Disable Hooks

Edit hook JSON file:

\`\`\`json
{
  "enabled": false  // Set to true to enable
}
\`\`\`

### Customize Commands

Edit command markdown files in \`.claude/commands/\`

### Update Project Rules

Edit \`.claude/rules/CLAUDE.md\`

## 📚 Documentation

### Primary Resources
- \`.claude/README.md\` - Complete configuration guide
- \`.claude/rules/CLAUDE.md\` - Project conventions and guidelines
- \`.claude/SETUP_SUMMARY.md\` - This summary

### Project Documentation
- \`../README.md\` - Three-VRM project README
- \`../CONTRIBUTING.md\` - Contributing guidelines
- [Three-VRM Docs](https://pixiv.github.io/three-vrm/)
- [VRM Specification](https://vrm.dev/)

### Claude Code Documentation
- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/)
- [Skills Guide](https://docs.claude.com/en/docs/claude-code/skills)
- [Hooks Guide](https://docs.claude.com/en/docs/claude-code/hooks)
- [Commands Guide](https://docs.claude.com/en/docs/claude-code/commands)

## 🎯 Next Steps

1. **Try Commands**: Run \`/dev-server three-vrm\` to start
2. **Explore Skills**: Ask about VRM or Three.js
3. **Test Hooks**: Try to commit a .env file (it will be blocked)
4. **Read Rules**: Review \`.claude/rules/CLAUDE.md\`
5. **Get Help**: Ask "How do I..." questions

## 💡 Tips

### Make the Most of Skills
- Be specific about what you're working on
- Mention framework names (Three.js, VRM) to activate relevant skills
- Skills provide context-aware help automatically

### Use Commands Efficiently
- Commands are shortcuts for common tasks
- Create custom commands in \`.claude/commands/\`
- Use \`/help\` to see all available commands

### Leverage Agents
- Agents are specialized experts
- Call them by describing what you need help with
- They provide comprehensive, focused assistance

### Work with Hooks
- Hooks prevent common mistakes automatically
- Configure thresholds in hook JSON files
- Disable hooks that don't fit your workflow

## 🙏 Credits

This configuration uses:
- **Claudius Skills** base configurations
- Custom Three.js/VRM expertise
- Project-specific workflows
- Safety best practices

Configuration assembled for the three-vrm project by Claude Code.

---

**Setup Date:** 2025-11-03
**Configuration Version:** 1.0.0
**Project Version:** 3.4.4

For questions or issues, see \`.claude/README.md\` or ask Claude!
