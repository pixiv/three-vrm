# @pixiv/three-vrm-materials-mtoon

MToon (toon material) module for @pixiv/three-vrm

[GitHub Repository](https://github.com/pixiv/three-vrm/tree/dev/packages/three-vrm-materials-mtoon)

[Examples](https://pixiv.github.io/three-vrm/packages/three-vrm-materials-mtoon/examples)

[Documentation](https://pixiv.github.io/three-vrm/packages/three-vrm-materials-mtoon/docs)

## WebGPU Support

Starting from v3, we provide [WebGPURenderer](https://github.com/mrdoob/three.js/blob/master/examples/jsm/renderers/webgpu/WebGPURenderer.js) compatibility.
To use three-vrm with WebGPURenderer, specify the WebGPU-compatible `MToonNodeMaterialLoaderPlugin` for the `mtoonMaterialPlugin` option of `VRMLoaderPlugin`.

`MToonNodeMaterial` only supports Three.js r161 or later.
The NodeMaterial system of Three.js is still under development, so we may break compatibility with older versions of Three.js more frequently than other parts of three-vrm.

```js
import { VRMLoaderPlugin, MToonNodeMaterialLoaderPlugin } from '@pixiv/three-vrm';

// ...

// Register a VRMLoaderPlugin
loader.register((parser) => {

  // create a WebGPU compatible MToon loader plugin
  const mtoonMaterialPlugin = new MToonNodeMaterialLoaderPlugin(parser);

  return new VRMLoaderPlugin(parser, {

    // Specify the MToon loader plugin to use in the VRMLoaderPlugin instance
    mtoonMaterialPlugin,

  });

});
```
