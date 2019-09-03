# three-vrm

Use [VRM](https://vrm.dev/) on [three.js](https://threejs.org/)

[Examples](https://pixiv.github.io/three-vrm/examples)

[Documentation](https://pixiv.github.io/three-vrm/docs)

## Usage

### from HTML

You will need:

- [Three.js build](https://github.com/mrdoob/three.js/blob/master/build/three.js)
- [GLTFLoader](https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/GLTFLoader.js)
- [A build of @pixiv/three-vrm](https://github.com/pixiv/three-vrm/releases)

Code like this:

```html
<script src="three.js"></script>
<script src="GLTFLoader.js"></script>
<script src="three-vrm.js"></script>

<script>
const scene = new THREE.Scene();

const loader = new THREE.GLTFLoader();
loader.load(

	// URL of the VRM you want to load
	'/models/shino.vrm',

	// called when the resource is loaded
	( gltf ) => {

		// generate a VRM instance from gltf
		THREE.VRM.from( gltf ).then( ( vrm ) => {

			// add the loaded vrm to the scene
			scene.add( vrm.scene );

			// deal with vrm features
			console.log( vrm );

		} );

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
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM, VRMLoader } from '@pixiv/three-vrm';

const scene = new THREE.Scene();

const loader = new THREE.GLTFLoader();
loader.load(

	// URL of the VRM you want to load
	'/models/shino.vrm',

	// called when the resource is loaded
	( gltf ) => {

		// generate a VRM instance from gltf
		THREE.VRM.from( gltf ).then( ( vrm ) => {

			// add the loaded vrm to the scene
			scene.add( vrm.scene );

			// deal with vrm features
			console.log( vrm );

		} );

	},

	// called while loading is progressing
	( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),

	// called when loading has errors
	( error ) => console.error( error )

);
```

## Contributing

See: [CONTRIBUTING.md](CONTRIBUTING.md)
