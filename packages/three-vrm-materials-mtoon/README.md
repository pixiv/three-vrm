# @pixiv/three-vrm-materials-mtoon

MToon (toon material) module for @pixiv/three-vrm

[GitHub Repository](https://github.com/pixiv/three-vrm/tree/dev/packages/three-vrm-materials-mtoon)

[Examples](https://pixiv.github.io/three-vrm/packages/three-vrm-materials-mtoon/examples)

[Documentation](https://pixiv.github.io/three-vrm/packages/three-vrm-materials-mtoon/docs)

## WebGPU Support

This module supports [WebGPURenderer](https://github.com/mrdoob/three.js/blob/master/examples/jsm/renderers/webgpu/WebGPURenderer.js).

To use MToon with `VRMLoaderPlugin` in WebGPURenderer, specify the WebGPU-compatible `MToonNodeMaterialLoaderPlugin` for the `mtoonMaterialPlugin` option of `VRMLoaderPlugin`.

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
