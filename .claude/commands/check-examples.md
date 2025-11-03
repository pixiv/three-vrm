# /check-examples

Verify that all examples work correctly across all packages.

## What this command does

1. Finds all HTML examples in the monorepo
2. Checks for broken links or missing resources
3. Validates that examples follow the project's code style
4. Optionally starts dev servers to manually test examples

## Usage

```
User: /check-examples
User: /check-examples three-vrm
User: /check-examples --start-server
```

## Implementation

When this command is invoked:

1. **Find all examples**
   ```bash
   find packages/*/examples -name "*.html"
   ```

2. **Validate each example**
   - Check for required imports (three.js, GLTFLoader, VRM modules)
   - Verify code follows Mr.doob's Code Style™ in inline scripts
   - Check for proper error handling
   - Validate that models/assets exist

3. **List examples by package**
   ```
   @pixiv/three-vrm:
   - examples/basic.html
   - examples/animations.html
   - examples/dnd.html
   - examples/webgpu-dnd.html

   @pixiv/three-vrm-animation:
   - examples/index.html
   - examples/loader-plugin.html
   - examples/dnd.html

   @pixiv/three-vrm-node-constraint:
   - examples/index.html
   - examples/rotation.html
   - examples/upper-arm.html
   - examples/roll.html
   - examples/aim.html
   - examples/importer.html
   ```

4. **Optionally start dev server**
   If `--start-server` flag provided:
   ```bash
   cd packages/three-vrm
   yarn dev
   ```
   Then provide URLs to test each example.

## Example Output

```
Checking examples across all packages...

Found 15 examples:

✓ packages/three-vrm/examples/basic.html
✓ packages/three-vrm/examples/animations.html
✓ packages/three-vrm/examples/dnd.html
✓ packages/three-vrm/examples/webgpu-dnd.html
✓ packages/three-vrm-animation/examples/index.html
✓ packages/three-vrm-animation/examples/loader-plugin.html
✓ packages/three-vrm-animation/examples/dnd.html
✓ packages/three-vrm-node-constraint/examples/index.html
✓ packages/three-vrm-node-constraint/examples/rotation.html
✓ packages/three-vrm-node-constraint/examples/upper-arm.html
✓ packages/three-vrm-node-constraint/examples/roll.html
✓ packages/three-vrm-node-constraint/examples/aim.html
✓ packages/three-vrm-node-constraint/examples/importer.html

All examples validated successfully!

To test manually:
cd packages/three-vrm && yarn dev
Open: http://localhost:10001/examples/
```

## Validation Checklist

- [ ] Imports are correct (three.js, GLTFLoader, VRM modules)
- [ ] Error handling is present
- [ ] Code follows Mr.doob's Code Style™ for inline scripts
- [ ] No padded-blocks (eslint rule disabled in examples)
- [ ] Model paths are correct
- [ ] Renderer setup is correct
- [ ] Animation loop is implemented
- [ ] Window resize handler is present

## Notes

- Examples must follow Mr.doob's Code Style™ for inline scripts
- padded-blocks eslint rule is disabled in examples
- After API changes, ensure ALL examples still work
- Examples serve as documentation for users
- Examples should be simple and focused on one feature
