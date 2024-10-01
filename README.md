# `@pixiv/three-vrm`

[![@pixiv/three-vrm on npm](https://img.shields.io/npm/v/@pixiv/three-vrm)](https://www.npmjs.com/package/@pixiv/three-vrm)

Use [VRM](https://vrm.dev/) on [three.js](https://threejs.org/)

![three-vrm](https://github.com/pixiv/three-vrm/raw/dev/three-vrm.png)

[GitHub Repository](https://github.com/pixiv/three-vrm/)

[Examples](https://pixiv.github.io/three-vrm/packages/three-vrm/examples)

[Documentations](https://github.com/pixiv/three-vrm/tree/dev/docs/README.md)

[API Reference](https://pixiv.github.io/three-vrm/packages/three-vrm/docs)

## How to Use

### from HTML

You will need:

- Three.js build
- GLTFLoader
- A build of @pixiv/three-vrm
  - `.module` ones are ESM, otherwise it's UMD and injects its modules into global `THREE`
  - `.min` ones are minified (for production), otherwise it's not minified and it comes with source maps

You can import all the dependencies via CDN like [jsDelivr](https://www.jsdelivr.com/).

```html
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/",
      "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js"
    }
  }
</script>

<script type="module">
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { VRMLoaderPlugin } from '@pixiv/three-vrm';

  // ... Setup renderer, camera, scene ...

  // Create a GLTFLoader - The loader for loading VRM models
  const loader = new GLTFLoader();

  // Install a GLTFLoader plugin that enables VRM support
  loader.register((parser) => {
    return new VRMLoaderPlugin(parser);
  });

  loader.load(
    // URL of the VRM you want to load
    '/models/VRM1_Constraint_Twist_Sample.vrm',

    // called when the resource is loaded
    (gltf) => {
      // retrieve a VRM instance from gltf
      const vrm = gltf.userData.vrm;

      // add the loaded vrm to the scene
      scene.add(vrm.scene);

      // deal with vrm features
      console.log(vrm);
    },

    // called while loading is progressing
    (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),

    // called when loading has errors
    (error) => console.error(error),
  );

  // ... Perform the render loop ...
</script>
```

See the Three.js document if you are not familiar with Three.js yet: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

See the example for the complete code: https://github.com/pixiv/three-vrm/blob/release/packages/three-vrm/examples/basic.html

### via npm

Install [`three`](https://www.npmjs.com/package/three) and [`@pixiv/three-vrm`](https://www.npmjs.com/package/@pixiv/three-vrm) :

```sh
npm install three @pixiv/three-vrm
```

### Use with WebGPURenderer

Starting from v3, we provide [WebGPURenderer](https://github.com/mrdoob/three.js/blob/master/examples/jsm/renderers/webgpu/WebGPURenderer.js) compatibility.
To use three-vrm with WebGPURenderer, specify the WebGPU-compatible `MToonNodeMaterial` for the `materialType` option of `MToonMaterialLoaderPlugin`.

`MToonNodeMaterial` only supports Three.js r167 or later.
The NodeMaterial system of Three.js is still under development, so we may break compatibility with older versions of Three.js more frequently than other parts of three-vrm.

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MToonMaterialLoaderPlugin, VRMLoaderPlugin } from '@pixiv/three-vrm';
import { MToonNodeMaterial } from '@pixiv/three-vrm/nodes';

// ... Setup renderer, camera, scene ...

// Create a GLTFLoader
const loader = new GLTFLoader();

// Register a VRMLoaderPlugin
loader.register((parser) => {

  // create a WebGPU compatible MToonMaterialLoaderPlugin
  const mtoonMaterialPlugin = new MToonMaterialLoaderPlugin(parser, {

    // set the material type to MToonNodeMaterial
    materialType: MToonNodeMaterial,

  });

  return new VRMLoaderPlugin(parser, {

    // Specify the MToonMaterialLoaderPlugin to use in the VRMLoaderPlugin instance
    mtoonMaterialPlugin,

  });

});

// ... Load the VRM and perform the render loop ...
```

See the example for the complete code: https://github.com/pixiv/three-vrm/blob/release/packages/three-vrm/examples/webgpu-dnd.html

## Contributing

See: [CONTRIBUTING.md](CONTRIBUTING.md)

## LICENSE

[MIT](LICENSE)
