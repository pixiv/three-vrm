# three-vrm

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

## Usage

```javascript
import 'imports-loader?THREE=three!three-vrm-loader/lib/GLTFLoader.js';
import * as THREE from 'three'
import { VRM, VRMImporter } from 'three-vrm'

new Promise((resolve,reject) => {
  const loader = new THREE.GLTFLoader()
  loader.load("/models/shino.vrm", resolve, () => {} , reject)
}).then( (gltf ) =>
   new VRMImporter().load(gltf)
).then ( vrm => {
   this.vrm = vrm
})
```

## VRMImporter

## VRM

```
.humanBones: VRMHumanBones
```

```
.blendShapeProxy: VRMBlendShapeProxy
```

```
.lookAt: VRMLookAtHead
```

```
.firstPerson: VRMFirstPerson
```

```
.springBoneManager: VRMSpringBoneManager
```

```
.meta: VRMMeta
```

```
.update(deltaTime: number)
```

## VRMBlendShapeProxy 

```
.setValue(name:string, weight:number)
```

```
.getValue(name:string) : number
```

```
.getController(name:string) : BlendShapeController
```

```
.expressions : AnimationClip[]
```

## VRMLookAtHead

```
.head : THREE.Object3D ( default is Bone.Head )
```

```
.setTarget( THREE.Object3D )
```

```
.getTarget() : THREE.Object3D
```

```
.lookAt(x:number, y:number, z:number)
```

## VRMFirstPersonBone 

```
.setup(cameraLayer?: {
  firstPersonOnlyLayer?: number;
  thirdPersonOnlyLayer?: number;
}) 
```

```
.getFirstPersonBone() : THREE.Object3D (defalut value is Bone.head)
```

```
.getFirstPersonBoneOffset() : THREE.Vector3  (default value is [0,0.06,0])
```

```
.getFirstBonePosition(v3: THREE.Vector3) : THREE.Vector3
```

```
.getFirstPersonOnlyLayer(): number
```

```
.getThirdPersonOnlyLayer(): number
```

