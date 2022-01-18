# `@pixiv/three-vrm`

Use [VRM](https://vrm.dev/) on [three.js](https://threejs.org/)

![three-vrm](https://github.com/pixiv/three-vrm/raw/dev/three-vrm.png)

[GitHub Repository](https://github.com/pixiv/three-vrm/)

[Examples](https://pixiv.github.io/three-vrm/packages/three-vrm/examples)

[Documentation](https://pixiv.github.io/three-vrm/packages/three-vrm/docs)

## How to Use

### from HTML

You will need:

- [Three.js build](https://github.com/mrdoob/three.js/blob/master/build/three.js)
- [GLTFLoader](https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/GLTFLoader.js)
- [A build of @pixiv/three-vrm](https://unpkg.com/browse/@pixiv/three-vrm/lib/)
	- `.module` ones are ESM, otherwise it's UMD and injects its modules into global `THREE`
	- `.min` ones are minified (for production), otherwise it's not minified and it comes with source maps

Code like this:

```html
<script src="three.js"></script>
<script src="GLTFLoader.js"></script>
<script src="three-vrm.js"></script>

<script>
const scene = new THREE.Scene();

const loader = new THREE.GLTFLoader();

// Install GLTFLoader plugin
loader.register( ( parser ) => {

	return new THREE_VRM.VRMLoaderPlugin( parser );

} );

loader.load(

	// URL of the VRM you want to load
	'/models/three-vrm-girl.vrm',

	// called when the resource is loaded
	( gltf ) => {

		// retrieve a VRM instance from gltf
		const vrm = gltf.userData.vrm;

		// add the loaded vrm to the scene
		scene.add( vrm.scene );

		// deal with vrm features
		console.log( vrm );

	},

	// called while loading is progressing
	( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),

	// called when loading has errors
	( error ) => console.error( error )

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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

const scene = new THREE.Scene();

const loader = new GLTFLoader();

// Install GLTFLoader plugin
loader.register( ( parser ) => {

	return new VRMLoaderPlugin( parser );

} );

loader.load(

	// URL of the VRM you want to load
	'/models/three-vrm-girl.vrm',

	// called when the resource is loaded
	( gltf ) => {

		// retrieve a VRM instance from gltf
		const vrm = gltf.userData.vrm;

		// add the loaded vrm to the scene
		scene.add( vrm.scene );

		// deal with vrm features
		console.log( vrm );

	},

	// called while loading is progressing
	( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),

	// called when loading has errors
	( error ) => console.error( error )

);
```

## Contributing

See: [CONTRIBUTING.md](CONTRIBUTING.md)

## LICENSE

[MIT](LICENSE)
