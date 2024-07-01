# @pixiv/three-vrm-materials-mtoon

MToon (toon material) module for @pixiv/three-vrm

[GitHub Repository](https://github.com/pixiv/three-vrm/tree/dev/packages/three-vrm-materials-mtoon)

[Examples](https://pixiv.github.io/three-vrm/packages/three-vrm-materials-mtoon/examples)

[Documentation](https://pixiv.github.io/three-vrm/packages/three-vrm-materials-mtoon/docs)

## WebGPU Support

Starting from v3, we provide [WebGPURenderer](https://github.com/mrdoob/three.js/blob/master/examples/jsm/renderers/webgpu/WebGPURenderer.js) compatibility.
To use MToon with WebGPURenderer, specify the WebGPU-compatible `MToonNodeMaterial` for the `materialType` option of `MToonMaterialLoaderPlugin`.

`MToonNodeMaterial` only supports Three.js r161 or later.
The NodeMaterial system of Three.js is still under development, so we may break compatibility with older versions of Three.js more frequently than other parts of three-vrm.

```js
import { MToonMaterialLoaderPlugin } from '@pixiv/three-vrm-materials-mtoon';
import { MToonNodeMaterial } from '@pixiv/three-vrm-materials-mtoon/nodes';

// ...

// Register a MToonMaterialLoaderPlugin with MToonNodeMaterial
loader.register((parser) => {

  // create a WebGPU compatible MToonMaterialLoaderPlugin
  return new MToonMaterialLoaderPlugin(parser, {

    // set the material type to MToonNodeMaterial
    materialType: MToonNodeMaterial,

  });

});
```
