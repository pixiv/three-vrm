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

- [Three.js build](https://github.com/mrdoob/three.js/blob/master/build/three.js)
- [GLTFLoader](https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/GLTFLoader.js)
- [A build of @pixiv/three-vrm](https://www.jsdelivr.com/package/npm/@pixiv/three-vrm?tab=files&path=lib)
  - `.module` ones are ESM, otherwise it's UMD and injects its modules into global `THREE`
  - `.min` ones are minified (for production), otherwise it's not minified and it comes with source maps

You can import all of them via CDN. See the example below.

Code like this:

```html
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/",
      "@pixiv/three-vrm": "three-vrm.module.js"
    }
  }
</script>

<script type="module">
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { VRMLoaderPlugin } from '@pixiv/three-vrm';

  const scene = new THREE.Scene();

  const loader = new GLTFLoader();

  // Install GLTFLoader plugin
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
</script>
```

### via npm

Install [`three`](https://www.npmjs.com/package/three) and [`@pixiv/three-vrm`](https://www.npmjs.com/package/@pixiv/three-vrm) :

```sh
npm install three @pixiv/three-vrm
```

Code like this:

```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

const scene = new THREE.Scene();

const loader = new GLTFLoader();

// Install GLTFLoader plugin
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
```

### Use with WebGPURenderer

Starting from v3, we provide [WebGPURenderer](https://github.com/mrdoob/three.js/blob/master/examples/jsm/renderers/webgpu/WebGPURenderer.js) compatibility.
To use three-vrm with WebGPURenderer, specify the WebGPU-compatible `MToonNodeMaterial` for the `materialType` option of `MToonMaterialLoaderPlugin`.

`MToonNodeMaterial` only supports Three.js r161 or later.
The NodeMaterial system of Three.js is still under development, so we may break compatibility with older versions of Three.js more frequently than other parts of three-vrm.

```js
import { VRMLoaderPlugin } from '@pixiv/three-vrm';
import { MToonNodeMaterial } from '@pixiv/three-vrm/nodes';

// ...

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
```

## Contributing

See: [CONTRIBUTING.md](CONTRIBUTING.md)

## LICENSE

[MIT](LICENSE)
