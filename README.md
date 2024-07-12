# `@pixiv/three-vrm`

[![@pixiv/three-vrm on npm](https://img.shields.io/npm/v/@pixiv/three-vrm)](https://www.npmjs.com/package/@pixiv/three-vrm)

Use [VRM](https://vrm.dev/) on [three.js](https://threejs.org/)

![three-vrm](https://github.com/pixiv/three-vrm/raw/dev/three-vrm.png)

[GitHub Repository](https://github.com/pixiv/three-vrm/)

[Examples](https://pixiv.github.io/three-vrm/packages/three-vrm/examples)

[Documentations](https://github.com/pixiv/three-vrm/tree/dev/docs/README.md)

[API Reference](https://pixiv.github.io/three-vrm/packages/three-vrm/docs)

## v1

**three-vrm v1 has been released!**

three-vrm v1 supports [VRM1.0](https://vrm.dev/vrm1/), which is a new version of VRM format (the previous version of VRM is also supported, don't worry!).
It also adopts the GLTFLoader plugin system which is a relatively new feature of GLTFLoader.

There are a lot of breaking changes!
See [the migration guide](https://github.com/pixiv/three-vrm/blob/dev/docs/migration-guide-1.0.md) for more info.

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

Import

https://github.com/pixiv/three-vrm/blob/9e16c3855a5b441cca0f11480c4003de25d2943c/packages/three-vrm/examples/basic.html#L22-L36

Load VRM

https://github.com/pixiv/three-vrm/blob/9e16c3855a5b441cca0f11480c4003de25d2943c/packages/three-vrm/examples/basic.html#L62-L106

Start render loop
https://github.com/pixiv/three-vrm/blob/9e16c3855a5b441cca0f11480c4003de25d2943c/packages/three-vrm/examples/basic.html#L119-L135


### via npm

Install [`three`](https://www.npmjs.com/package/three) and [`@pixiv/three-vrm`](https://www.npmjs.com/package/@pixiv/three-vrm) :

```sh
npm install three @pixiv/three-vrm
```

Code like this:

```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
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

## Contributing

See: [CONTRIBUTING.md](CONTRIBUTING.md)

## LICENSE

[MIT](LICENSE)
