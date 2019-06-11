# three-vrm

[VRM](https://vrm.dev/) utilities for [three.js](https://threejs.org/).

## Dependencies

```
yarn add three
```

## Usage

```
yarn add @pixiv/three-vrm
```

```html
<script src="js/GLTFLoader.js"></script>
<script src="js/three-vrm.js"></script>
<script>
  const loader = new THREE.GLTFLoader();
  loader.load('/models/shino.vrm',( gltf ) => { 
        THREE.VRM.from(gltf).then( ( vrm ) => { 
            scene.add( vrm.scene );  
        }); 
    },
  	( progress ) => {},
  	( error ) =>  {}
  );
</script>	
```

or you can import as modules. 
currently three-vrm/lib/GLTFLoader.js is required.

```javascript
import { GLTFLoader } from "three-vrm/lib/three/jsm/GLTFLoader";
import * as THREE from 'three'
import { VRM } from '@pixiv/three-vrm'

const scene = new THREE.Scene();
new Promise((resolve,reject) => {
  const loader = new GLTFLoader()
  loader.load("/models/shino.vrm", resolve, () => {} , reject)
}).then( (gltf ) => {
   const vrm = VRM.from(gltf)
   scene.add(vrm.scene)
})
```

```javascript

```

## Examples

### Load from Html

```
three-vrm$ yarn build
three-vrm$ yarn global add http-server && http-server
```

* <http://localhost:8080/examples/html/basic.html>
* <http://localhost:8080/examples/html/dnd.html>
* <http://localhost:8080/exmaples/html/mouse.html>

### Use with React

```
three-vrm$ yarn build
three-vrm/examples/react$ yarn
three-vrm/examples/react$ yarn dev
```

* <http://localhost:4000>