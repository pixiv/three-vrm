# /build-all

Build all packages in the three-vrm monorepo in the correct dependency order.

## What this command does

1. Cleans previous build artifacts
2. Builds all packages using Lerna
3. Reports build status and any errors
4. Shows build time and statistics

## Usage

```
User: /build-all
User: /build-all clean
```

## Implementation

When this command is invoked:

1. **Clean (optional)**
   ```bash
   yarn clean
   # or
   lerna run clean
   ```

2. **Build all packages**
   ```bash
   yarn build
   # or
   lerna run build
   ```

3. **Report results**
   - Show which packages were built
   - Display build time
   - Report any errors or warnings
   - List generated files (lib/, types/)

## Example Output

```
Building all packages...

✓ @pixiv/types-vrm-0.0
✓ @pixiv/types-vrmc-vrm-1.0
✓ @pixiv/three-vrm-core
✓ @pixiv/three-vrm-materials-mtoon
✓ @pixiv/three-vrm-springbone
✓ @pixiv/three-vrm-node-constraint
✓ @pixiv/three-vrm-animation
✓ @pixiv/three-vrm

Build completed in 12.3s

Generated artifacts:
- packages/three-vrm/lib/three-vrm.module.js
- packages/three-vrm/types/index.d.ts
- ... (other packages)
```

## Flags

- `clean` - Clean before building

## Notes

- Lerna automatically determines correct build order based on dependencies
- Build errors in one package will stop the build
- Use `lerna run build --scope @pixiv/package-name` to build specific package
- TypeScript project references enable incremental builds
