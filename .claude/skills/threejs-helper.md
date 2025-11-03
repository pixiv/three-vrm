---
name: threejs-helper
description: Expert assistance for Three.js development, scene creation, rendering, and optimization. Activates when working with Three.js objects, scenes, cameras, or renderers.
---

# Three.js Development Helper

You are an expert Three.js developer specializing in WebGL rendering, 3D graphics, and performance optimization.

## When to Activate

- User mentions "Three.js", "scene", "renderer", "camera", "mesh", "geometry", "material"
- User asks to "create a Three.js scene" or "setup renderer"
- User wants to "optimize 3D performance" or "fix rendering issues"
- User is working with WebGL, WebGPU, or 3D graphics
- User asks about lighting, shadows, or post-processing

## Three.js Expertise

### Scene Setup Best Practices

```typescript
import * as THREE from 'three';

// Scene initialization
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);
scene.fog = new THREE.Fog(0xf0f0f0, 10, 50);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75, // FOV
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near plane
  1000 // far plane
);
camera.position.set(0, 1.6, 3);

// Renderer setup with best practices
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

### Animation Loop Pattern

```typescript
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const deltaTime = clock.getDelta();

  // Update logic here
  // e.g., controls.update(), mixer.update(deltaTime)

  renderer.render(scene, camera);
}

animate();
```

### Memory Management

**IMPORTANT: Dispose of resources properly**

```typescript
// Dispose geometry
geometry.dispose();

// Dispose material
material.dispose();

// Dispose texture
texture.dispose();

// Dispose entire mesh
function disposeMesh(mesh: THREE.Mesh) {
  if (mesh.geometry) mesh.geometry.dispose();

  if (mesh.material) {
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(mat => mat.dispose());
    } else {
      mesh.material.dispose();
    }
  }

  // Dispose textures
  if (mesh.material && !Array.isArray(mesh.material)) {
    Object.values(mesh.material).forEach(value => {
      if (value instanceof THREE.Texture) {
        value.dispose();
      }
    });
  }
}
```

### Performance Optimization

**1. Use BufferGeometry (not Geometry)**
```typescript
// ✅ Good - BufferGeometry
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

// ❌ Bad - Deprecated Geometry class
// const geometry = new THREE.Geometry();
```

**2. Reuse geometries and materials**
```typescript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

// Reuse for multiple meshes
const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
```

**3. Use InstancedMesh for many similar objects**
```typescript
const count = 1000;
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const instancedMesh = new THREE.InstancedMesh(geometry, material, count);

const matrix = new THREE.Matrix4();
for (let i = 0; i < count; i++) {
  matrix.setPosition(
    Math.random() * 10 - 5,
    Math.random() * 10 - 5,
    Math.random() * 10 - 5
  );
  instancedMesh.setMatrixAt(i, matrix);
}

scene.add(instancedMesh);
```

**4. Use frustum culling**
```typescript
mesh.frustumCulled = true; // default, but make sure it's on
```

**5. LOD (Level of Detail)**
```typescript
const lod = new THREE.LOD();

// High detail
const highDetailGeometry = new THREE.IcosahedronGeometry(1, 4);
const highDetailMesh = new THREE.Mesh(highDetailGeometry, material);
lod.addLevel(highDetailMesh, 0);

// Medium detail
const mediumDetailGeometry = new THREE.IcosahedronGeometry(1, 2);
const mediumDetailMesh = new THREE.Mesh(mediumDetailGeometry, material);
lod.addLevel(mediumDetailMesh, 10);

// Low detail
const lowDetailGeometry = new THREE.IcosahedronGeometry(1, 0);
const lowDetailMesh = new THREE.Mesh(lowDetailGeometry, material);
lod.addLevel(lowDetailMesh, 20);

scene.add(lod);
```

### Lighting Best Practices

```typescript
// Ambient light for base illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional light for sunlight
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;

// Shadow optimization
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;

scene.add(directionalLight);
```

### Common Patterns

**Loading Models with GLTFLoader**
```typescript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load(
  'path/to/model.gltf',
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Enable shadows
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  },
  (progress) => {
    console.log((progress.loaded / progress.total * 100) + '% loaded');
  },
  (error) => {
    console.error('Error loading model:', error);
  }
);
```

**Raycasting for object picking**
```typescript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event: MouseEvent) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const object = intersects[0].object;
    console.log('Clicked:', object);
  }
}

window.addEventListener('click', onMouseClick);
```

## TypeScript Best Practices

```typescript
// Type your Three.js objects
import * as THREE from 'three';

interface SceneObjects {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  mesh?: THREE.Mesh;
}

// Use proper types for vector operations
function moveObject(object: THREE.Object3D, direction: THREE.Vector3): void {
  object.position.add(direction);
}
```

## WebGPU Support (Three.js r167+)

```typescript
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

const renderer = new WebGPURenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Use with async initialization
await renderer.init();
```

## Debugging Tips

```typescript
// Enable WebGL debugging
import { WebGLRenderer } from 'three';

const renderer = new WebGLRenderer({
  antialias: true,
  // Debug flags
  logarithmicDepthBuffer: false, // Try enabling if z-fighting
  precision: 'highp' // or 'mediump', 'lowp'
});

// Log renderer info
console.log('Renderer info:', renderer.info);

// Check for WebGL errors
const gl = renderer.getContext();
const error = gl.getError();
if (error !== gl.NO_ERROR) {
  console.error('WebGL Error:', error);
}

// Visualize normals
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
const helper = new VertexNormalsHelper(mesh, 1, 0xff0000);
scene.add(helper);
```

## Remember

- Always dispose of geometries, materials, and textures
- Use BufferGeometry, not deprecated Geometry
- Cap pixel ratio at 2x for performance
- Use InstancedMesh for many similar objects
- Enable frustum culling (it's on by default)
- Set proper shadow map sizes (power of 2)
- Use OrbitControls for camera interaction
- Handle window resize events
- Use clock.getDelta() for consistent animations
- Type your Three.js objects with TypeScript
- Consider LOD for distant objects
- Use appropriate lighting (avoid too many dynamic lights)

## Project-Specific Context

This project (three-vrm) uses:
- Three.js r180 as peer dependency
- TypeScript with strict mode
- esbuild for bundling
- WebGPU support via MToonNodeMaterial
- Custom materials (MToon)
- VRM model loading via GLTFLoader plugins

When helping with Three.js in this project:
- Follow the minimal instantiation pattern (use temp instances)
- Use proper TypeScript types
- Consider both WebGL and WebGPU compatibility
- Respect the library's API patterns
