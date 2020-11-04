# `@pixiv/three-vrm`

Use [VRM](https://vrm.dev/) on [three.js](https://threejs.org/)

![three-vrm](https://github.com/pixiv/three-vrm/raw/dev/three-vrm.png)

[GitHub Repository](https://github.com/pixiv/three-vrm/)

[Examples](https://pixiv.github.io/three-vrm/examples)

[Documentation](https://pixiv.github.io/three-vrm/docs)

## Usage

### from HTML

From v0.6.0, You have to use [import maps](https://github.com/WICG/import-maps) to refer a Three.js from three-vrm.
Since import map is still a draft, we are going to use [`es-module-shims`](https://github.com/guybedford/es-module-shims) to achieve this.
For more information, please refer the "Import maps" section of this three.js document:
https://threejs.org/docs/#manual/en/introduction/Installation

In the example below, we are going to use the cdn [unpkg](https://unpkg.com). If you want to use either local or other cdns, please interpret them accordingly.

Code like this:

```html
<script defer src="https://unpkg.com/es-module-shims@0.7.1/dist/es-module-shims.js"></script>
<script type="importmap-shim">
	{
		"imports": {
			"three": "https://unpkg.com/three@0.120.1/build/three.module.js",
			"three/examples/jsm/": "https://unpkg.com/three@0.120.1/examples/jsm/"
		}
	}
</script>
<script type="module-shim">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRM } from '../lib/three-vrm.js';

const scene = new THREE.Scene();

const loader = new GLTFLoader();
loader.load(

	// URL of the VRM you want to load
	'/models/three-vrm-girl.vrm',

	// called when the resource is loaded
	( gltf ) => {

		// generate a VRM instance from gltf
		VRM.from( gltf ).then( ( vrm ) => {

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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM } from '@pixiv/three-vrm';

const scene = new THREE.Scene();

const loader = new GLTFLoader();
loader.load(

	// URL of the VRM you want to load
	'/models/three-vrm-girl.vrm',

	// called when the resource is loaded
	( gltf ) => {

		// generate a VRM instance from gltf
		VRM.from( gltf ).then( ( vrm ) => {

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

## LICENSE

[MIT](LICENSE)
