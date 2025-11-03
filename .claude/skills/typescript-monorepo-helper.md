---
name: typescript-monorepo-helper
description: Expert assistance for TypeScript monorepo development with Lerna, managing multiple packages, dependencies, and builds. Activates when working with monorepo structure or package management.
---

# TypeScript Monorepo Development Helper

You are an expert in TypeScript monorepo management using Lerna, Yarn workspaces, and package orchestration.

## When to Activate

- User mentions "monorepo", "Lerna", "workspaces", "packages"
- User asks about "package dependencies" or "internal packages"
- User needs help with "building multiple packages" or "monorepo structure"
- User works with package publishing or version management
- User asks about "cross-package development" or "local linking"

## This Project's Monorepo Structure

```
three-vrm/
├── package.json                  # Root package (private)
├── lerna.json                    # Lerna configuration
├── packages/
│   ├── three-vrm/               # Main package
│   ├── three-vrm-core/          # Core functionality
│   ├── three-vrm-animation/     # Animation support
│   ├── three-vrm-springbone/    # Physics simulation
│   ├── three-vrm-materials-mtoon/ # MToon materials
│   ├── three-vrm-node-constraint/ # Node constraints
│   ├── types-vrm-0.0/           # VRM 0.0 types
│   ├── types-vrmc-vrm-1.0/      # VRM 1.0 types
│   └── ...                      # Other packages
```

## Lerna Commands

### Common Workflows

```bash
# Install all dependencies
yarn install

# Build all packages (respects dependency order)
yarn build
# or
lerna run build

# Run tests across all packages
yarn test
# or
lerna run test

# Lint all packages
yarn lint
# or
lerna run lint

# Clean build artifacts
yarn clean
# or
lerna run clean

# Run dev server for specific package
cd packages/three-vrm
yarn dev

# Run dev server on different port
PORT=10002 yarn dev
```

### Working with Specific Packages

```bash
# Run command in specific package
lerna run build --scope @pixiv/three-vrm

# Run command in multiple packages
lerna run test --scope @pixiv/three-vrm --scope @pixiv/three-vrm-core

# Run command in packages that changed
lerna run build --since HEAD~1

# List changed packages
lerna changed
```

### Dependency Management

```bash
# Add dependency to specific package
lerna add three --scope @pixiv/three-vrm

# Add dev dependency
lerna add --dev @types/node --scope @pixiv/three-vrm

# Add local package as dependency
lerna add @pixiv/three-vrm-core --scope @pixiv/three-vrm

# Remove dependency
cd packages/three-vrm && yarn remove some-package
```

### Publishing

```bash
# Version and publish (handled by GitHub Actions in this project)
lerna publish

# Version packages without publishing
lerna version

# Publish from specific commit
lerna publish from-package
```

## Package.json Best Practices

### Root package.json

```json
{
  "private": true,
  "type": "module",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "lerna run build",
    "test": "lerna run test",
    "clean": "lerna run clean"
  },
  "devDependencies": {
    "lerna": "^9.0.0",
    "typescript": "^5.4.5"
  }
}
```

### Individual package.json

```json
{
  "name": "@pixiv/three-vrm",
  "version": "3.4.4",
  "type": "module",
  "main": "lib/three-vrm.module.js",
  "types": "types/index.d.ts",
  "exports": {
    ".": {
      "types": "./types/index.d.ts",
      "import": "./lib/three-vrm.module.js",
      "require": "./lib/three-vrm.cjs"
    }
  },
  "files": [
    "/lib/",
    "/types/",
    "LICENSE"
  ],
  "scripts": {
    "build": "node ../../bin/build.mjs",
    "dev": "cross-env NODE_ENV=development SERVE=1 node ../../bin/build.mjs",
    "clean": "rimraf lib types"
  },
  "peerDependencies": {
    "three": "^0.180.0"
  },
  "dependencies": {
    "@pixiv/three-vrm-core": "workspace:^",
    "@pixiv/three-vrm-materials-mtoon": "workspace:^"
  }
}
```

## TypeScript Configuration

### Root tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "incremental": true
  }
}
```

### Package-specific tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./lib",
    "declarationDir": "./types"
  },
  "include": ["src/**/*"],
  "references": [
    { "path": "../three-vrm-core" }
  ]
}
```

## Internal Package Dependencies

### Using Workspace Protocol

```json
{
  "dependencies": {
    "@pixiv/three-vrm-core": "workspace:^",
    "@pixiv/three-vrm-springbone": "workspace:*"
  }
}
```

**workspace:^ ** - Use caret range of current version
**workspace:* ** - Use any version from workspace
**workspace:~ ** - Use tilde range of current version

### Importing from Internal Packages

```typescript
// In @pixiv/three-vrm package
import { VRMCore } from '@pixiv/three-vrm-core';
import { VRMSpringBoneManager } from '@pixiv/three-vrm-springbone';

// TypeScript will resolve these via workspace references
// No need for relative paths!
```

## Build System (esbuild)

### Understanding the Build Script

```javascript
// bin/build.mjs
import esbuild from 'esbuild';

const isProduction = process.env.NODE_ENV === 'production';
const shouldServe = process.env.SERVE === '1';

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'lib',
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  sourcemap: !isProduction,
  minify: isProduction,
  external: ['three'], // Peer dependency
  watch: shouldServe,
  // ... more options
});
```

### Build Output Structure

```
package/
├── lib/
│   ├── package-name.module.js     # ESM bundle
│   ├── package-name.cjs           # CommonJS bundle
│   └── package-name.module.min.js # Minified ESM
└── types/
    ├── index.d.ts                 # Type declarations
    └── index.d.ts.map             # Type source maps
```

## Development Workflow

### 1. Starting Development

```bash
# Install dependencies
yarn install

# Build all packages once
yarn build

# Start dev server for package you're working on
cd packages/three-vrm
yarn dev
```

### 2. Working Across Multiple Packages

```bash
# Terminal 1: Watch core package
cd packages/three-vrm-core
yarn dev

# Terminal 2: Watch main package (depends on core)
cd packages/three-vrm
PORT=10002 yarn dev

# Changes in core will be reflected in main package
```

### 3. Adding a New Package

```bash
# Create package directory
mkdir packages/new-package

# Create package.json
cat > packages/new-package/package.json << EOF
{
  "name": "@pixiv/new-package",
  "version": "0.0.1",
  "type": "module",
  "main": "lib/index.module.js",
  "types": "types/index.d.ts",
  "scripts": {
    "build": "node ../../bin/build.mjs"
  }
}
EOF

# Create tsconfig.json
# Create src/index.ts
# Run yarn install to link
yarn install
```

### 4. Running Examples

```bash
cd packages/three-vrm
yarn dev

# Open browser to:
# http://localhost:10001/examples/
```

## Debugging Monorepo Issues

### Issue: Package not found

```bash
# Re-install and link packages
yarn install

# Check workspace links
ls -la node_modules/@pixiv/

# Verify package.json "name" matches import
```

### Issue: TypeScript can't find types

```typescript
// Check tsconfig.json has correct "references"
{
  "references": [
    { "path": "../other-package" }
  ]
}

// Rebuild with composite mode
tsc --build
```

### Issue: Circular dependencies

```bash
# Detect circular dependencies
npx madge --circular packages/*/src/index.ts

# Refactor to break cycles:
# 1. Extract shared code to new package
# 2. Use dependency injection
# 3. Restructure imports
```

### Issue: Build order problems

```javascript
// Lerna automatically determines build order
// based on package dependencies

// Force specific order in lerna.json:
{
  "npmClient": "yarn",
  "command": {
    "run": {
      "stream": true
    }
  }
}
```

## Testing in Monorepo

### Running Tests

```bash
# All packages
yarn test

# Specific package
lerna run test --scope @pixiv/three-vrm-core

# Changed packages only
lerna run test --since HEAD~1

# With coverage
lerna run test -- --coverage
```

### Jest Configuration

```javascript
// jest.config.mjs (root)
export default {
  projects: ['<rootDir>/packages/*/jest.config.mjs'],
  collectCoverageFrom: [
    'packages/*/src/**/*.ts',
    '!packages/*/src/**/*.test.ts'
  ]
};

// packages/three-vrm/jest.config.mjs
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // For Three.js
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@pixiv/three-vrm-core$': '<rootDir>/../three-vrm-core/src/index.ts'
  }
};
```

## Versioning Strategy

### Independent Versioning (This Project)

```json
// lerna.json
{
  "version": "independent",
  "npmClient": "yarn"
}
```

Each package has its own version. Use when:
- Packages evolve at different rates
- Some packages are stable, others experimental
- Want fine-grained control

### Fixed Versioning (Alternative)

```json
// lerna.json
{
  "version": "3.4.4",
  "npmClient": "yarn"
}
```

All packages share one version. Use when:
- Packages are tightly coupled
- Want unified releases
- Simpler mental model

## Publishing Workflow

### This Project's Approach

1. **Trigger GitHub Action**
   - Workflow: `.github/workflows/publish.yml`
   - Manually triggered from GitHub UI

2. **Automated Steps**
   - Bump versions
   - Update changelogs
   - Build packages
   - Publish to npm
   - Create git tags

3. **Post-Publish**
   - Merge `dev` into `release` branch
   - Create GitHub release notes
   - Update milestones

### Manual Publishing (Alternative)

```bash
# 1. Bump versions
lerna version --conventional-commits

# 2. Build all packages
yarn build

# 3. Publish to npm
lerna publish from-package

# 4. Push tags
git push --follow-tags
```

## Best Practices

### 1. Keep Packages Focused
- Each package should have a single responsibility
- Minimize dependencies between packages
- Use peer dependencies for shared libraries (like three.js)

### 2. Consistent Scripts
```json
{
  "scripts": {
    "build": "...",
    "dev": "...",
    "test": "...",
    "lint": "...",
    "clean": "..."
  }
}
```

### 3. Proper Peer Dependencies
```json
{
  "peerDependencies": {
    "three": "^0.180.0"
  }
}
```

### 4. Use Workspace References
```json
{
  "dependencies": {
    "@pixiv/three-vrm-core": "workspace:^"
  }
}
```

### 5. TypeScript Project References
```json
{
  "references": [
    { "path": "../three-vrm-core" }
  ]
}
```

## Common Patterns in This Project

### 1. Typedef Packages
```
types-vrm-0.0/
types-vrmc-vrm-1.0/
types-vrmc-springbone-1.0/
```
- No implementation, only types
- Manually authored from VRM spec
- Published separately

### 2. Feature Packages
```
three-vrm-animation/
three-vrm-springbone/
three-vrm-node-constraint/
```
- Independent features
- Can be used separately
- Composed in main package

### 3. Material Packages
```
three-vrm-materials-mtoon/
three-vrm-materials-hdr-emissive-multiplier/
three-vrm-materials-v0compat/
```
- Material implementations
- Separate for modularity
- Optional for users

## Remember

- Always run `yarn install` after pulling changes
- Build packages in dependency order (Lerna handles this)
- Use `workspace:` protocol for internal dependencies
- Run `yarn build` before `yarn test`
- Each package can have independent version
- Examples are served from dev server (port 10001)
- Use different ports for multiple dev servers
- TypeScript project references enable incremental builds
- Peer dependencies (like three.js) are not bundled
- Publishing is handled by GitHub Actions workflow
