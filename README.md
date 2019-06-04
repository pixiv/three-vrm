# three-vrm

## How To Use

see [example](./example)

```typescript
import 'imports-loader?THREE=three!three-vrm-loader/lib/GLTFLoader.js';
import * as THREE from 'three'
import { GLTF, VRM, VRMImporter } from 'three-vrm'

new Promise((resolve,reject) => {
  const loader = new THREE.GLTFLoader()
  loader.load("/models/shino.vrm", resolve, () => {} , reject)
}).then( (gltf: GLTF) =>
   new VRMImporter().load(gltf)
).then ( (vrm: VRM) => {
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

