---
name: vrm-model-helper
description: Specialized assistance for VRM avatar model development, loading, animation, and the three-vrm library. Activates when working with VRM files, avatars, or humanoid models.
---

# VRM Model Development Helper

You are an expert in VRM (Virtual Reality Model) specification and the @pixiv/three-vrm library.

## When to Activate

- User mentions "VRM", "avatar", "humanoid", "VRMLoaderPlugin"
- User asks about "loading VRM models" or "VRM animation"
- User works with VRM-specific features (expressions, look-at, spring bones)
- User asks about "MToon material" or VRM materials
- User needs help with VRM 0.0 or VRM 1.0 specifications

## VRM Basics

### What is VRM?

VRM is a file format for 3D humanoid avatars, built on top of glTF 2.0.

**Key Features:**
- Humanoid bone structure
- Facial expressions (BlendShapes)
- Look-at (eye/head tracking)
- Spring Bone (physics simulation for hair, clothes)
- MToon material (toon shading)
- First-person view settings

**Supported Versions:**
- **VRM 0.0** - Original specification (legacy)
- **VRM 1.0** - Current specification (recommended)

## Loading VRM Models

### Basic VRM Loading

```typescript
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRM } from '@pixiv/three-vrm';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer();

// Create GLTFLoader with VRM support
const loader = new GLTFLoader();

// Register VRMLoaderPlugin
loader.register((parser) => {
  return new VRMLoaderPlugin(parser);
});

// Load VRM model
loader.load(
  'path/to/model.vrm',
  (gltf) => {
    // Extract VRM instance
    const vrm = gltf.userData.vrm as VRM;

    // Add to scene
    scene.add(vrm.scene);

    // Access VRM features
    console.log('VRM loaded:', vrm);
    console.log('Humanoid:', vrm.humanoid);
    console.log('Expressions:', vrm.expressionManager);
    console.log('LookAt:', vrm.lookAt);
    console.log('SpringBone:', vrm.springBoneManager);

    // Store reference for animation loop
    currentVRM = vrm;
  },
  (progress) => console.log('Loading:', 100 * (progress.loaded / progress.total), '%'),
  (error) => console.error('Error loading VRM:', error)
);
```

### WebGPU Compatible Loading

```typescript
import { MToonMaterialLoaderPlugin, VRMLoaderPlugin } from '@pixiv/three-vrm';
import { MToonNodeMaterial } from '@pixiv/three-vrm/nodes';

const loader = new GLTFLoader();

loader.register((parser) => {
  // Create WebGPU-compatible MToon material plugin
  const mtoonMaterialPlugin = new MToonMaterialLoaderPlugin(parser, {
    materialType: MToonNodeMaterial // Use NodeMaterial for WebGPU
  });

  return new VRMLoaderPlugin(parser, {
    mtoonMaterialPlugin // Pass to VRM plugin
  });
});
```

## VRM Animation Loop

```typescript
const clock = new THREE.Clock();
let currentVRM: VRM | null = null;

function animate() {
  requestAnimationFrame(animate);

  const deltaTime = clock.getDelta();

  if (currentVRM) {
    // Update VRM components
    currentVRM.update(deltaTime);

    // Individual updates (done automatically by vrm.update())
    // currentVRM.springBoneManager?.update(deltaTime);
    // currentVRM.expressionManager?.update();
    // currentVRM.lookAt?.update(deltaTime);
  }

  renderer.render(scene, camera);
}

animate();
```

## VRM Features

### 1. Humanoid Bone Access

```typescript
// Access humanoid bones
const humanoid = vrm.humanoid;

// Get specific bone
const head = humanoid.getNormalizedBoneNode('head');
const leftHand = humanoid.getNormalizedBoneNode('leftHand');
const rightFoot = humanoid.getNormalizedBoneNode('rightFoot');

// Get raw bone node (non-normalized)
const rawHead = humanoid.getRawBoneNode('head');

// Rotate bone
if (head) {
  head.rotation.y = Math.PI / 4; // Turn head 45 degrees
}

// All bone names (VRM 1.0):
// hips, spine, chest, upperChest, neck, head
// leftShoulder, leftUpperArm, leftLowerArm, leftHand
// rightShoulder, rightUpperArm, rightLowerArm, rightHand
// leftUpperLeg, leftLowerLeg, leftFoot
// rightUpperLeg, rightLowerLeg, rightFoot
// leftEye, rightEye, jaw
// leftToes, rightToes
// leftThumbProximal, leftThumbIntermediate, leftThumbDistal
// leftIndexProximal, leftIndexIntermediate, leftIndexDistal
// leftMiddleProximal, leftMiddleIntermediate, leftMiddleDistal
// leftRingProximal, leftRingIntermediate, leftRingDistal
// leftLittleProximal, leftLittleIntermediate, leftLittleDistal
// (same for right hand)
```

### 2. Facial Expressions

```typescript
// Get expression manager
const expressionManager = vrm.expressionManager;

if (expressionManager) {
  // Set expression weight (0.0 to 1.0)
  expressionManager.setValue('happy', 1.0);
  expressionManager.setValue('blink', 0.5);

  // Get current value
  const happyValue = expressionManager.getValue('happy');

  // Common preset expressions:
  // happy, angry, sad, relaxed, surprised
  // aa, ih, ou, ee, oh (mouth shapes)
  // blink, blinkLeft, blinkRight
  // lookUp, lookDown, lookLeft, lookRight
  // neutral

  // Transition between expressions
  function transitionExpression(from: string, to: string, duration: number) {
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 16; // ~60fps
      const t = Math.min(elapsed / duration, 1);

      expressionManager.setValue(from, 1 - t);
      expressionManager.setValue(to, t);

      if (t >= 1) clearInterval(interval);
    }, 16);
  }

  // Example: Transition from happy to surprised
  transitionExpression('happy', 'surprised', 1000);
}
```

### 3. Look-At (Eye/Head Tracking)

```typescript
// Get LookAt
const lookAt = vrm.lookAt;

if (lookAt) {
  // Create a target to look at
  const target = new THREE.Object3D();
  target.position.set(0, 1.5, -2);
  scene.add(target);

  // In animation loop:
  function animate() {
    // Update look-at target
    lookAt.target = target.position;

    // Or look at camera
    lookAt.target = camera.position;

    // Update VRM (includes look-at update)
    vrm.update(deltaTime);
  }

  // Configure look-at behavior
  // lookAt.offsetFromHeadBone - offset from head bone
  // lookAt.autoUpdate - enable/disable auto update
}
```

### 4. Spring Bone (Physics)

```typescript
// Get spring bone manager
const springBoneManager = vrm.springBoneManager;

if (springBoneManager) {
  // Spring bones update automatically via vrm.update()

  // Access individual spring bones
  springBoneManager.springs.forEach((spring) => {
    console.log('Spring:', spring);

    // Adjust spring parameters
    spring.settings.hitRadius = 0.05;
    spring.settings.dragForce = 0.4;
    spring.settings.stiffness = 1.0;
  });

  // Access colliders
  springBoneManager.colliderGroups.forEach((group) => {
    console.log('Collider group:', group);
  });

  // Reset spring bones
  springBoneManager.reset();
}
```

### 5. First Person View

```typescript
// Get first-person configuration
const firstPerson = vrm.firstPerson;

if (firstPerson) {
  // Get mesh annotations (which meshes to hide in first-person)
  firstPerson.meshAnnotations.forEach((annotation) => {
    console.log('Mesh annotation:', annotation);
    // annotation.type: 'auto', 'both', 'thirdPersonOnly', 'firstPersonOnly'
  });

  // Setup first-person camera
  const fpCamera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  // Position camera at first-person offset
  const headBone = vrm.humanoid.getNormalizedBoneNode('head');
  if (headBone) {
    // Apply first-person offset
    fpCamera.position.copy(headBone.position);
    fpCamera.position.add(firstPerson.meshAnnotations[0]?.offset || new THREE.Vector3(0, 0, 0));
  }
}
```

## MToon Material

### Understanding MToon

MToon is a toon shader material designed for VRM models.

```typescript
import { MToonMaterial } from '@pixiv/three-vrm';

// Access MToon materials
vrm.scene.traverse((object) => {
  if ((object as THREE.Mesh).isMesh) {
    const mesh = object as THREE.Mesh;
    const material = mesh.material;

    if (material instanceof MToonMaterial) {
      // Adjust MToon parameters
      material.color.set(0xff0000); // Base color
      material.shadeColor.set(0x880000); // Shadow color
      material.shadeToony = 0.9; // Toon intensity (0-1)
      material.shadingShift = 0.0; // Shift shading (-1 to 1)
      material.rimColor.set(0xffffff); // Rim light color
      material.rimLightingMix = 1.0; // Rim light mix (0-1)
      material.outlineWidth = 0.01; // Outline width
      material.outlineColor.set(0x000000); // Outline color

      // Transparency
      material.transparent = true;
      material.opacity = 0.9;
    }
  }
});
```

## VRM Animation with Mixamo

```typescript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import * as THREE from 'three';

let mixer: THREE.AnimationMixer | null = null;

// Load VRM
loader.load('model.vrm', async (gltf) => {
  const vrm = gltf.userData.vrm as VRM;
  scene.add(vrm.scene);

  // Load Mixamo animation
  const animLoader = new GLTFLoader();
  animLoader.load('animation.gltf', (animGltf) => {
    // Create mixer
    mixer = new THREE.AnimationMixer(vrm.scene);

    // Retarget Mixamo animation to VRM
    const clip = animGltf.animations[0];

    // VRMUtils helps with animation retargeting
    const action = mixer.clipAction(clip);
    action.play();
  });
});

// In animation loop
if (mixer) {
  mixer.update(deltaTime);
}
if (currentVRM) {
  currentVRM.update(deltaTime);
}
```

## VRM Metadata

```typescript
// Access VRM metadata
const meta = vrm.meta;

if (meta) {
  console.log('Name:', meta.name);
  console.log('Version:', meta.version);
  console.log('Author:', meta.authors);
  console.log('License:', meta.licenseUrl);
  console.log('Thumbnail:', meta.thumbnailImage);
  console.log('Allowed users:', meta.allowedUserName);
  console.log('Violent usage:', meta.violentUsageName);
  console.log('Sexual usage:', meta.sexualUsageName);
  console.log('Commercial usage:', meta.commercialUsageName);
}
```

## Best Practices

### 1. Proper VRM Disposal

```typescript
function disposeVRM(vrm: VRM) {
  // Dispose scene hierarchy
  VRMUtils.deepDispose(vrm.scene);

  // Or manually dispose
  vrm.scene.traverse((object) => {
    if ((object as THREE.Mesh).isMesh) {
      const mesh = object as THREE.Mesh;
      mesh.geometry?.dispose();

      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => mat.dispose());
      } else {
        mesh.material?.dispose();
      }
    }
  });
}
```

### 2. Performance Optimization

```typescript
// Reduce spring bone simulation frequency
if (springBoneManager) {
  // Update spring bones every other frame
  let skipFrame = false;
  function animate() {
    skipFrame = !skipFrame;
    if (!skipFrame && springBoneManager) {
      springBoneManager.update(deltaTime);
    }
  }
}

// Use LOD for distant VRM models
const lod = new THREE.LOD();
lod.addLevel(vrm.scene, 0);
lod.addLevel(lowDetailVersion, 10);
```

### 3. Expression Blending

```typescript
// Blend multiple expressions
function setBlendedExpression(expressions: Record<string, number>) {
  const manager = vrm.expressionManager;
  if (!manager) return;

  // Clear all expressions
  manager.getExpressionTrackList().forEach((name) => {
    manager.setValue(name, 0);
  });

  // Set new blend
  Object.entries(expressions).forEach(([name, weight]) => {
    manager.setValue(name, weight);
  });
}

// Usage
setBlendedExpression({
  happy: 0.7,
  blink: 0.3
});
```

## Project-Specific Patterns

This three-vrm library follows these patterns:

**1. Minimal Instantiation**
```typescript
// Use temp instances for calculations
const _v3 = new THREE.Vector3();

function calculateDistance(vrm: VRM, target: THREE.Vector3): number {
  const head = vrm.humanoid.getNormalizedBoneNode('head');
  if (!head) return Infinity;

  return _v3.copy(target).sub(head.position).length();
}
```

**2. Private Member Convention**
```typescript
class VRMHelper {
  private _vrm: VRM | null = null;

  public get vrm(): VRM | null {
    return this._vrm;
  }

  public set vrm(value: VRM | null) {
    if (this._vrm) {
      this.disposeVRM(this._vrm);
    }
    this._vrm = value;
  }
}
```

**3. Plugin Architecture**
```typescript
// VRMLoaderPlugin integrates with GLTFLoader
loader.register((parser) => {
  return new VRMLoaderPlugin(parser, {
    // Optional configurations
    helperRoot: scene, // For debug helpers
    autoUpdateHumanBones: true
  });
});
```

## Common Issues & Solutions

### Issue: VRM model not visible
```typescript
// Check if model is added to scene
console.log('VRM in scene:', scene.children.includes(vrm.scene));

// Check camera position
console.log('Camera:', camera.position);

// Check model bounds
const box = new THREE.Box3().setFromObject(vrm.scene);
console.log('Model bounds:', box);
```

### Issue: Expressions not working
```typescript
// Ensure expressionManager exists
if (!vrm.expressionManager) {
  console.error('No expression manager!');
}

// Update must be called
vrm.update(deltaTime); // This updates expressions

// Check available expressions
console.log('Available expressions:', vrm.expressionManager?.getExpressionTrackList());
```

### Issue: Spring bones not moving
```typescript
// Ensure update is called with deltaTime > 0
if (deltaTime <= 0) {
  console.warn('deltaTime must be > 0 for spring bones');
}

// Check if spring bones exist
console.log('Spring bones:', vrm.springBoneManager?.springs.length);

// Reset if stuck
vrm.springBoneManager?.reset();
```

## Remember

- Always call `vrm.update(deltaTime)` in animation loop
- Dispose VRMs properly using `VRMUtils.deepDispose()`
- VRM 1.0 is the current standard (VRM 0.0 is legacy)
- Expression values range from 0.0 to 1.0
- MToon materials have special toon shading properties
- Spring bones need deltaTime > 0 to simulate
- Use VRMLoaderPlugin with GLTFLoader
- WebGPU requires MToonNodeMaterial
- Follow this project's minimal instantiation pattern
- Private members should start with underscore `_`
