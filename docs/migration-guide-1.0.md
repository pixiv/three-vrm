# Migration Guide `v0.6.x` -> `v1.0.0`

`v0.6.x` -> `v1.0.0`

## Overall

### It’s now a Loader Plugin

three-vrm v1 is implemented as a Loader Plugin of GLTFLoader.

Both `VRM.from` and `VRMImporter` are removed.

You are going to use the new `VRMLoaderPlugin` with the GLTFLoader instead.

See the example code below:

```jsx
const loader = new THREE.GLTFLoader();

loader.register((parser) => new VRMLoaderPlugin(parser)); // here we are installing VRMLoaderPlugin

return loader.loadAsync(modelUrl).then((gltf) => {
  const vrm = gltf.userData.vrm; // `VRM` is loaded inside `gltf.userData.vrm`

  VRMUtils.rotateVRM0(vrm); // rotate the vrm around y axis if the vrm is VRM0.0

  return vrm;
});
```

### Linear Workflows

In VRM1.0, linear workflow is explicitly recommended,

**Starting from Three.js r152, you no longer have to specify the color space explicitly.**
See [three.js#25756](https://github.com/mrdoob/three.js/pull/25756) for details.

<details>
<summary>The previous guide before r152</summary>

You should enable the linear workflow.

```jsx
renderer.outputEncoding = THREE.sRGBEncoding;
```

</details>

### VRMUtils.rotateVRM0

I have already used this in the example above but there is a utility function called `VRMUtils.rotateVRM0`.

In VRM1.0, the facing direction of the model has been changed from Y- to Y+.

`VRMUtils.rotateVRM0` rotates the VRM model if the VRM is VRM0.0 and faces backward.

Use this function to make your app compatible with both VRM0.0 and VRM1.0.

```tsx
VRMUtils.rotateVRM0(eitherVRM0or1);
```

### VRMUtils.deepDispose

We have removed `vrm.dispose` since it does not contain any VRM-specific disposal procedures.

We still have our utility function `VRMUtils.deepDispose`.

Call this before you unload your VRM scene.

```tsx
VRMUtils.deepDispose(vrm.scene);
```

### Helper / Debug

`VRMDebug` has been removed.

You can give `helperRoot` to the options of `VRMLoaderPlugin` instead to enable helpers for VRM components.

We currently have helpers for humanoid, lookAt, springBone, and constraints.

```tsx
const helperRoot = new THREE.Group();
helperRoot.renderOrder = 10000;
scene.add(helperRoot);

loader.register((parser) => {
  // assigning `helperRoot` to options will make helpers appear
  return new THREE_VRM.VRMLoaderPlugin(parser, { helperRoot });
});
```

### VRMSchema

`VRMSchema` has been removed.

Instead, we have a new package `@pixiv/types-vrm-0.0`, which provides the type definition of the VRM0.0 schema.

Also, there are type definition packages of VRM1.0 schema such as `@pixiv/types-vrmc-vrm-1.0`.

```tsx
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';

const extension = json.extensions?.['VRMC_vrm'] as V1VRMSchema.VRMCVRM | undefined;
```

### GLTFSchema

`GLTFSchema` has been removed.

If you are already referring to GLTF schema in your code, we recommend using type definitions provided from `@gltf-transform/core`.

```tsx
import { GLTF as GLTFSchema } from '@gltf-transform/core';

const json = gltf.parser.json as GLTFSchema.IGLTF;
```

## Meta

### VRM1Meta

In VRM1.0, the structure of `meta` has been reworked.

We also have an interface `VRM0Meta` which is compatible with VRM0.0.

`VRM.meta` might have either `VRM1Meta` or `VRM0Meta`.

`VRM0Meta` and `VRM1Meta` have a member `.metaVersion` to distinguish each other.

```tsx
// vrm.meta: VRM0Meta | VRM1Meta

if (vrm.meta.metaVersion === '0') {
  // vrm.meta: VRM0Meta
} else if (vrm.meta.metaVersion === '1') {
  // vrm.meta: VRM1Meta
}
```

### thumbnailImage and VRMUtils.extractThumbnailBlob

In VRM1.0, `meta.texture` is `meta.thumbnailImage` instead, and it is an image instead of a texture.

We have removed `VRMUtils.extractThumbnailBlob` for now due to this change (plus it's buggy).

If public demand is high enough, we will consider having a utility function that handles both VRM0.0 and VRM1.0 and return an appropriate thumbnail image.

## Humanoid

### Normalized Human Bones

From VRM1.0, VRM models can have “non-normalized” orientations for each human bone.

Due to this change, we introduce a feature to access “normalized” human bones to maintain compatibility between models with different bone orientations.

Normalized human bones have identity orientation (`[0, 0, 0; 1]` in quaternion) in its rest pose.

Almost all members of `VRMHumanoid` existed in v0.x were deprecated.

We now have members to access raw (original) human bones and normalized human bones instead.

For example, you can get a `THREE.Object3D` of a human bone by either `VRMHumanoid.getRawBoneNode` or `VRMHumanoid.getNormalizedBoneNode`.

Normalized human bones are proxy objects of raw human bones.

Operations applied to normalized human bones are automatically synced to raw human bones upon `VRM.update` or `VRMHumanoid.update`.

If you don’t need this behavior, set `VRMHumanoid.autoUpdateHumanBones` to `false`.

See the example: `TODO`

See the documentation: `TODO`

### VRMSchema.HumanoidBoneName

There is a union type/const called `VRMHumanBoneName` instead.

### VRMHumanoid.getBones / VRMHumanoid.getBoneNodes

In VRM1.0, VRMs no longer can multiple nodes for a single bone at once.

Due to this change, we have removed `VRMHumanoid.getBones` and `VRMHumanoid.getBoneNodes`.

## Expressions (previously BlendShapeProxy)

### Renamed, BlendShapeProxy → Expressions

In VRM1.0, BlendShapeProxy is renamed to Expressions.

Due to this change, we also renamed our BlendShapeProxy APIs to Expressions.

`VRM.blendShapeProxy` should be renamed to `VRM.expressionManager`, for example.

### VRMSchema.BlendShapePresetName

There is a union type/const called `VRMExpressionPresetName` instead.

The first argument of `VRMExpressionManager.setValue()` is no longer enum; you can use string instead.

```tsx
vrm.expressionManager.setValue('happy', 1.0); // 😄
```

## FirstPerson

### VRMFirstPerson.firstPersonBone

In VRM1.0, FirstPersonBone is removed. You should use the head of Humanoid instead.

### VRMFirstPerson.firstPersonBoneOffset

`VRMFirstPerson.firstPersonBoneOffset` is removed.

You might want to use `VRMLookAt.offsetFromHeadBone` instead.

## MToonMaterial

### `VRM.materials` now only have MToonMaterials

In three-vrm v0.x, we used to have not only `MToonMaterial`s but also other materials glTF supports, such as `MeshStandardMaterial`s and `MeshBasicMaterial`s.

Starting from v1.0, `VRM.materials` only has `MToonMaterial`s.
It's because materials that need to be managed by the class `VRM` are only `MToonMaterial`s, which need to call `MToonMaterial.update()` upon `VRM.update()`.

You can use `gltf.parser.getDependencies('material')` instead, which lists every material loaded by the `GLTFLoader`.

### The interface must have been largely changed

MToon has been largely reworked from the VRM0.0 one.

Think like the VRM1.0 MToon is basically a totally different material.

See the API reference: [https://pixiv.github.io/three-vrm/packages/three-vrm/docs/classes/MToonMaterial.html](https://pixiv.github.io/three-vrm/packages/three-vrm/docs/classes/MToonMaterial.html)

### v0CompatShade

In VRM1.0, how MToon renders shade parts of materials has been changed.

If you want to use the old MToon behavior, change `MToonMaterial.v0CompatShade` to `true`.
