# /dev-server

Start the development server for a specific package in the three-vrm monorepo.

## What this command does

1. Identifies which package to start dev server for
2. Checks if the package exists
3. Starts the dev server with proper configuration
4. Provides the URL to access examples

## Usage

```
User: /dev-server
User: /dev-server three-vrm
User: /dev-server three-vrm-animation
```

## Implementation

When this command is invoked:

1. **Determine package**
   - If package name provided, use it
   - If in a package directory, use that package
   - Otherwise, ask user which package

2. **Verify package exists**
   ```bash
   ls packages/[package-name]
   ```

3. **Start dev server**
   ```bash
   cd packages/[package-name]
   yarn dev
   # Or with custom port:
   PORT=10002 yarn dev
   ```

4. **Provide information**
   - Dev server URL: `http://localhost:10001/examples/`
   - List available examples
   - Mention PORT env var for multiple servers

## Example Output

```
Starting dev server for @pixiv/three-vrm...

Server will be available at:
http://localhost:10001/examples/

Available examples:
- basic.html
- animations.html
- dnd.html
- webgpu-dnd.html

To run multiple dev servers simultaneously, use:
PORT=10002 yarn dev
```

## Notes

- Default port is 10001
- Use PORT env variable to avoid conflicts when running multiple servers
- Examples are served from the package's examples/ directory
- Dev server watches for changes and rebuilds automatically
