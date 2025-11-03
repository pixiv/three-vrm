# Three-VRM Project Rules and Guidelines

> Complete reference for Claude Code when working on the three-vrm project

## Project Overview

**three-vrm** is a TypeScript library for using VRM (Virtual Reality Model) 3D humanoid avatars in Three.js.

- **Type:** TypeScript monorepo (Lerna + Yarn workspaces)
- **Packages:** 17 packages (main library + core + features + types)
- **Build Tool:** esbuild
- **Test Framework:** Jest
- **Linter:** ESLint + Prettier
- **Target:** Browser (ESM + CommonJS)
- **Peer Dependency:** Three.js r180+

## Core Principles

1. **Minimal Instantiation** - Avoid needless `new` calls, use temp instances
2. **Private Members Convention** - Private/protected members MUST start with `_`
3. **Accessor Preference** - Use getters/setters over methods when appropriate
4. **Type Safety** - Strict TypeScript, no `any` in public APIs
5. **Backward Compatibility** - Semantic versioning strictly followed
6. **Example Completeness** - All features must have working examples

## Code Style

### TypeScript Conventions

#### 1. Private/Protected Members

**MUST** start with underscore:

```typescript
// ✅ CORRECT
class VRM {
  private _scene: THREE.Scene;
  protected _humanoid: VRMHumanoid;

  public get scene(): THREE.Scene {
    return this._scene;
  }
}

// ❌ WRONG
class VRM {
  private scene: THREE.Scene; // Missing underscore!
}
```

**Reason:** Makes adding accessors easier and maintains consistency.

#### 2. Use Accessors (get/set)

Prefer accessors over getter methods:

```typescript
// ✅ CORRECT
class VRMExpression {
  private _weight: number = 0;

  public get weight(): number {
    return this._weight;
  }

  public set weight(value: number) {
    this._weight = Math.max(0, Math.min(1, value));
  }
}

// ❌ WRONG
class VRMExpression {
  private _weight: number = 0;

  public getWeight(): number {
    return this._weight;
  }

  public setWeight(value: number): void {
    this._weight = value;
  }
}
```

**Exception:** When method requires multiple parameters or returns non-property values.

#### 3. Minimal Instantiation Pattern

**Use temporary instances** for calculations:

```typescript
// Declare temp instances at module scope
const _v3 = new THREE.Vector3();
const _quat = new THREE.Quaternion();

class VRMSpringBone {
  public update(deltaTime: number): void {
    // Use temp instances instead of creating new ones
    _v3.copy(this.bone.position).sub(this.tail.position);
    const length = _v3.length();

    // NOT: const v = new THREE.Vector3().copy(...) ❌
  }
}
```

**Use target parameters** when returning complex objects:

```typescript
// ✅ CORRECT
public getWorldPosition(target: THREE.Vector3): THREE.Vector3 {
  return target.setFromMatrixPosition(this.object.matrixWorld);
}

// ❌ WRONG
public getWorldPosition(): THREE.Vector3 {
  return new THREE.Vector3().setFromMatrixPosition(this.object.matrixWorld);
}
```

### ESLint and Prettier

- **Follow ESLint** - Use ESLint rules defined in `eslint.config.mjs`
- **Auto-format with Prettier** - Run `yarn lint-fix` before committing
- **Extensions:** VS Code extensions available for auto-fixing

### Examples Code Style

**Special Rule:** Examples must follow **Mr.doob's Code Style™**

```javascript
// In /examples/ directory:

// ✅ CORRECT - Mr.doob's Code Style™
if ( condition ) {

  doSomething();

}

function myFunction() {

  // Note: padded-blocks is OFF in examples
  const x = 1;

}

// ❌ WRONG - Normal style not allowed in examples
if (condition) {
  doSomething();
}
```

**Reason:** Consistency with Three.js examples.

**Note:** `padded-blocks` ESLint rule is disabled in examples due to auto-formatting issues with inline scripts.

## Project Structure

### Monorepo Organization

```
three-vrm/
├── packages/
│   ├── three-vrm/                # Main package (aggregates all)
│   ├── three-vrm-core/           # Core VRM functionality
│   ├── three-vrm-animation/      # Animation support
│   ├── three-vrm-springbone/     # Physics simulation
│   ├── three-vrm-node-constraint/# Node constraints (VRM 1.0)
│   ├── three-vrm-materials-mtoon/# MToon toon shader
│   ├── three-vrm-materials-*/    # Other material packages
│   ├── types-vrm-0.0/            # VRM 0.0 type definitions
│   ├── types-vrmc-vrm-1.0/       # VRM 1.0 type definitions
│   └── types-vrmc-*/             # Other VRM spec types
├── bin/                          # Build scripts
├── .github/workflows/            # CI/CD workflows
└── guides/                       # User guides
```

### Package Types

1. **Main Package** (`@pixiv/three-vrm`)
   - Aggregates all features
   - User-facing API
   - Re-exports from other packages

2. **Core Package** (`@pixiv/three-vrm-core`)
   - Essential VRM functionality
   - Humanoid, Expressions, LookAt, FirstPerson
   - Foundation for other packages

3. **Feature Packages**
   - Independent features (animation, springbone, etc.)
   - Can be used separately
   - Optional for users

4. **Type Packages**
   - No implementation, only types
   - Manually authored from VRM spec schema
   - Published separately

5. **Material Packages**
   - Material implementations
   - Separate for modularity
   - MToon, HDR Emissive, etc.

## Development Workflow

### Starting Development

```bash
# Install dependencies
yarn install

# Build all packages
yarn build

# Start dev server for a package
cd packages/three-vrm
yarn dev

# View examples at:
# http://localhost:10001/examples/
```

### Working on Multiple Packages

```bash
# Terminal 1: Watch core package
cd packages/three-vrm-core
yarn dev

# Terminal 2: Watch main package (on different port)
cd packages/three-vrm
PORT=10002 yarn dev
```

### Testing

```bash
# Run all tests
yarn test

# Test specific package
lerna run test --scope @pixiv/three-vrm

# Run with coverage
yarn test --coverage
```

### Linting

```bash
# Check linting
yarn lint

# Fix linting issues
yarn lint-fix
```

### Building

```bash
# Build all packages
yarn build

# Build specific package
cd packages/three-vrm
yarn build

# Clean build artifacts
yarn clean
```

## Git Workflow

### Branch Strategy

- **`dev`** - Main development branch
- **`release`** - Production branch (tracks releases)
- **Feature branches** - For new features

### Pull Request Rules

- ✅ **Target `dev` branch** (not `release`)
- ✅ **One feature/patch per PR**
- ✅ **Ensure all examples work** after changes
- ✅ **Update tests** if API changed
- ✅ **Follow code style** (ESLint + Prettier)

### Commit Messages

Use conventional commits format:

```
feat: Add WebGPU support for MToon material
fix: Resolve spring bone collision issue
docs: Update README with new API
refactor: Simplify expression blending logic
test: Add tests for VRM 1.0 loader
chore: Update dependencies
```

### What NOT to Do

- ❌ Force push to `main` or `release` branches
- ❌ Commit `.env` files or secrets
- ❌ Commit large binary files without Git LFS
- ❌ Break backward compatibility without major version bump
- ❌ Skip linting or tests

## API Design Guidelines

### Public API Conventions

1. **Clear Naming**
   ```typescript
   // ✅ Clear and descriptive
   expressionManager.setValue('happy', 0.8);

   // ❌ Unclear
   em.set('h', 0.8);
   ```

2. **Consistent Patterns**
   - Follow Three.js conventions
   - Use established patterns in codebase
   - Maintain consistency across packages

3. **Type Safety**
   ```typescript
   // ✅ Fully typed
   public setExpression(name: string, value: number): void

   // ❌ Using any
   public setExpression(name: any, value: any): void
   ```

4. **Deprecation Strategy**
   ```typescript
   /**
    * @deprecated Use newMethod() instead. Will be removed in v4.0.0
    */
   public oldMethod(): void {
     console.warn('oldMethod() is deprecated. Use newMethod() instead.');
     this.newMethod();
   }
   ```

### Breaking Changes

**Major Version Required** for:
- Removing public API
- Changing function signatures
- Changing behavior significantly
- Removing deprecated APIs
- Updating peer dependencies (major versions)

**NOT Breaking:**
- Adding new optional parameters (with defaults)
- Adding new methods/properties
- Internal implementation changes
- Performance improvements
- Bug fixes
- Deprecation warnings

### Documentation Requirements

Every public API must have:

```typescript
/**
 * Brief description of what this does.
 *
 * @param name - Parameter description
 * @param value - Another parameter description
 * @returns Description of return value
 *
 * @example
 * ```typescript
 * const vrm = await loader.load('model.vrm');
 * vrm.expressionManager.setValue('happy', 1.0);
 * ```
 */
public setValue(name: string, value: number): void {
  // Implementation
}
```

## Package.json Configuration

### Required Fields

```json
{
  "name": "@pixiv/package-name",
  "version": "3.4.4",
  "type": "module",
  "main": "lib/package-name.module.js",
  "types": "types/index.d.ts",
  "exports": {
    ".": {
      "types": "./types/index.d.ts",
      "import": "./lib/package-name.module.js",
      "require": "./lib/package-name.cjs"
    }
  },
  "files": [
    "/lib/",
    "/types/",
    "LICENSE"
  ],
  "peerDependencies": {
    "three": "^0.180.0"
  }
}
```

### Dependency Guidelines

- **Peer Dependencies:** Use for Three.js (not bundled)
- **Dependencies:** Use for internal packages (`workspace:^`)
- **Dev Dependencies:** Build tools, types, testing

## Testing Guidelines

### Test Structure

```typescript
import { VRM } from '../src/VRM';

describe('VRM', () => {
  let vrm: VRM;

  beforeEach(() => {
    vrm = new VRM(/* ... */);
  });

  afterEach(() => {
    // Cleanup
  });

  it('should update expressions', () => {
    vrm.expressionManager.setValue('happy', 0.5);
    expect(vrm.expressionManager.getValue('happy')).toBe(0.5);
  });

  it('should handle edge cases', () => {
    vrm.expressionManager.setValue('happy', -1);
    expect(vrm.expressionManager.getValue('happy')).toBe(0); // Clamped
  });
});
```

### Test Coverage

- Aim for >80% coverage
- Test public API thoroughly
- Include edge cases
- Test error handling

## Examples Guidelines

### Example Requirements

1. **Every feature needs examples**
2. **Examples must be simple** and focused
3. **Follow Mr.doob's Code Style™** for inline scripts
4. **Include error handling**
5. **Test after API changes**

### Example Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VRM Example - Basic</title>
  <style>
    body { margin: 0; }
    canvas { display: block; }
  </style>
</head>
<body>
  <script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/",
      "@pixiv/three-vrm": "../../../lib/three-vrm.module.js"
    }
  }
  </script>

  <script type="module">
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { VRMLoaderPlugin } from '@pixiv/three-vrm';

  // Setup scene, camera, renderer
  // ... (Follow Mr.doob's Code Style™)

  // Load VRM
  const loader = new GLTFLoader();

  loader.register( ( parser ) => {

    return new VRMLoaderPlugin( parser );

  } );

  loader.load(
    '/models/model.vrm',
    ( gltf ) => {

      const vrm = gltf.userData.vrm;
      scene.add( vrm.scene );

    },
    ( progress ) => console.log( 'Loading...', progress ),
    ( error ) => console.error( error )
  );

  // Animation loop
  function animate() {

    requestAnimationFrame( animate );

    if ( vrm ) {

      vrm.update( deltaTime );

    }

    renderer.render( scene, camera );

  }

  animate();
  </script>
</body>
</html>
```

## Release Process

### Versioning

- **Independent versioning** - Each package has own version
- **Semantic versioning** - Strictly follow semver
- **Changelog** - Update for each release

### Publishing Workflow

1. Trigger GitHub Actions workflow (`publish.yml`)
2. Automated version bump and build
3. Publish to npm
4. Merge `dev` into `release`
5. Create GitHub release notes
6. Update milestones

## Performance Considerations

### Three.js Performance

- Use InstancedMesh for repeated objects
- Implement LOD for distant objects
- Limit dynamic lights (2-3 max)
- Optimize shadow maps (1024-2048)
- Share geometries and materials
- Enable frustum culling (default on)
- Dispose resources properly

### VRM-Specific

- **Spring Bones:** Can be expensive, consider reducing update frequency
- **Expressions:** Cache static expressions, only update dynamic ones
- **MToon Materials:** Disable expensive features (outlines) for distant models
- **Model Complexity:** Provide guidance on poly counts

### Memory Management

```typescript
// Always dispose VRM properly
function disposeVRM(vrm: VRM) {
  vrm.scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry?.dispose();
      if (Array.isArray(object.material)) {
        object.material.forEach(mat => mat.dispose());
      } else {
        object.material?.dispose();
      }
    }
  });
  scene.remove(vrm.scene);
}
```

## Common Patterns in This Project

### 1. Plugin Architecture

```typescript
// VRM loader as GLTFLoader plugin
loader.register((parser) => {
  return new VRMLoaderPlugin(parser);
});
```

### 2. Manager Pattern

```typescript
// Centralized management
vrm.expressionManager.setValue('happy', 1.0);
vrm.springBoneManager.update(deltaTime);
vrm.lookAt.target = targetPosition;
```

### 3. Update Pattern

```typescript
// Single update call
vrm.update(deltaTime);

// Internally calls:
// - expressionManager.update()
// - lookAt.update(deltaTime)
// - springBoneManager.update(deltaTime)
```

## Tool Integration

### IDE Setup

**VS Code Extensions:**
- ESLint
- Prettier
- TypeScript and JavaScript Language Features

**Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Summary Checklist

Before committing, ensure:

- [ ] Code follows style guidelines
- [ ] Private members start with `_`
- [ ] Examples follow Mr.doob's Code Style™
- [ ] ESLint and Prettier pass
- [ ] Tests pass
- [ ] Examples work
- [ ] Types are generated
- [ ] Documentation is updated
- [ ] Breaking changes are documented

## Getting Help

- **Code Review Agent:** Use for code review feedback
- **Test Writer Agent:** Generate tests
- **Doc Writer Agent:** Generate documentation
- **Library Maintainer Agent:** Version and release guidance
- **Performance Engineer Agent:** Optimization help
- **Three.js Helper Skill:** Three.js specific questions
- **VRM Model Helper Skill:** VRM specific questions
- **Monorepo Helper Skill:** Lerna and workspace questions

---

**Last Updated:** 2025-11-03
**Version:** 3.4.4
